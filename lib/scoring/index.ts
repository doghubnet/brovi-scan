import type { AIReport, RiskLevel, ScoreInput } from "@/types";

export function clampScore(score: number) { return Math.max(0, Math.min(100, Math.round(score))); }
export function riskLevel(score: number): RiskLevel { if (score < 40) return "High Risk"; if (score < 60) return "Needs Work"; if (score < 75) return "Moderate"; if (score < 90) return "Strong"; return "Very Strong"; }
const filled = (value: unknown) => Array.isArray(value) ? value.length > 0 : value !== undefined && value !== null && String(value).trim().length > 0;
const goodStatus = (value: unknown) => ["available", "ready", "not required yet"].includes(String(value).toLowerCase());
export function scoreByCompleteness(input: ScoreInput, weights: Record<string, number>) { return clampScore(Object.entries(weights).reduce((score, [key, weight]) => score + (filled(input[key]) ? weight : 0), 0)); }

export function programFallback(input: ScoreInput): AIReport {
  const score = scoreByCompleteness(input, { educationLevel: 15, field: 10, gpa: 15, englishLevel: 15, budget: 15, targetCountry: 10, availableDocuments: 10, careerGoal: 10 });
  return base(score, ["Profile details were reviewed with deterministic scoring.", "Career and study preferences are captured."], ["AI feedback is unavailable until GEMINI_API_KEY is configured.", "Improve any missing academic, language, budget, or document details."]);
}

export function documentFallback(input: ScoreInput): AIReport {
  const weights = { passportStatus: 10, transcriptStatus: 20, translationStatus: 15, admissionStatus: 20, cvStatus: 15, financialDocsStatus: 10, otherStatus: 10 };
  const score = clampScore(Object.entries(weights).reduce((sum, [key, weight]) => sum + (goodStatus(input[key]) ? weight : filled(input[key]) ? Math.floor(weight / 2) : 0), 0));
  const missing = Object.entries(input).filter(([, value]) => ["missing", "expired", "needs translation", "needs legalization", "unclear"].includes(String(value).toLowerCase())).map(([key, value]) => `${key.replace(/([A-Z])/g, " $1")}: ${value}`);
  return base(score, ["Document checklist is organized.", "Missing and risky documents are prioritized first."], missing.length ? missing : ["Keep checking expiry, translation, legalization, and country-specific requirements."]);
}

export function financeFallback(input: ScoreInput): AIReport {
  const opening = Number(input.openingBalance || 0), closing = Number(input.closingBalance || 0), avg = Number(input.averageBalance || 0), need = Number(input.tuitionFeeAmount || 0) + Number(input.livingCostAmount || 0);
  const source = String(input.sourceOfFunds || "");
  const largeDeposit = String(input.largeDeposits || "");
  const period = String(input.statementPeriod || "").toLowerCase();
  const redFlags: string[] = [];
  let score = 0;
  if (avg >= need && need > 0) score += 30; else { if (avg > 0) score += 15; redFlags.push("Closing or average balance may not fully cover tuition and living cost."); }
  if (opening > 0 && closing > 0 && closing >= opening * 0.5) score += 20; else redFlags.push("Transaction history or closing balance stability needs review.");
  if (source.length >= 40) score += 20; else redFlags.push("Source-of-funds explanation is too short or unclear.");
  if (filled(input.sponsorRelation)) score += 10; else redFlags.push("Sponsor relationship proof is missing.");
  if (filled(input.sponsorJobProof) && String(input.sponsorJobProof).toLowerCase() !== "missing") score += 15; else redFlags.push("Sponsor business or job proof is missing.");
  if (!largeDeposit || largeDeposit.length >= 30) score += 5; else redFlags.push("Large deposit exists without a clear explanation.");
  if (period.includes("1 month") || period.includes("2 month")) redFlags.push("Statement period appears short; many applications need longer history.");
  return base(clampScore(score), ["Safe financial fields were collected without bank logins or card details.", "Coverage and source-of-funds fields were checked."], redFlags.length ? redFlags : ["Keep sponsor proof, tuition coverage, and source-of-funds documents consistent."]);
}

export function interviewFallback(input: ScoreInput): AIReport {
  const answer = String(input.answer || "");
  const score = clampScore(Math.min(88, 30 + answer.split(/\s+/).filter(Boolean).length * 2 + (answer.toLowerCase().includes("because") ? 10 : 0) + (answer.length > 180 ? 10 : 0)));
  return base(score, ["Answer submitted for clarity, relevance, and consistency review."], ["Add specific program, sponsor, study plan, return-plan, and honest financial details."]);
}

export function finalFallback(input: ScoreInput): AIReport {
  const score = clampScore((Number(input.programScore || 0) + Number(input.documentScore || 0) + Number(input.financialScore || 0) + Number(input.interviewScore || 0)) / 4);
  return base(score, ["Scores are consolidated evenly across the four scan modules."], ["Complete weaker modules before submission."]);
}

function base(score: number, strengths: string[], weaknesses: string[]): AIReport {
  return { score, riskLevel: riskLevel(score), strengths, weaknesses, recommendations: ["Review all missing fields and supporting documents.", "Practice concise, truthful answers before submission.", "Request BROVI Consultant Review for human preparation support."], stepByStepPlan: ["Complete profile and target-country details.", "Resolve missing or unclear documents.", "Prepare financial explanations and proof.", "Practice interview answers and regenerate readiness report."], warning: "AI feedback is unavailable. Basic scoring mode is active." };
}
