export type RiskLevel = "High Risk" | "Needs Work" | "Moderate" | "Strong" | "Very Strong";

export function toRisk(score: number): RiskLevel {
  if (score < 40) return "High Risk";
  if (score < 60) return "Needs Work";
  if (score < 75) return "Moderate";
  if (score < 90) return "Strong";
  return "Very Strong";
}

export function riskTone(level: RiskLevel): "risk" | "warning" | "info" | "success" {
  if (level === "High Risk") return "risk";
  if (level === "Needs Work") return "warning";
  if (level === "Moderate") return "info";
  return "success";
}

export function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

export function completenessPct(values: Record<string, unknown>, keys: string[]): number {
  if (!keys.length) return 0;
  const filled = keys.filter((k) => {
    const v = values[k];
    if (v == null) return false;
    if (typeof v === "string") return v.trim().length > 0;
    if (Array.isArray(v)) return v.length > 0;
    return true;
  }).length;
  return Math.round((filled / keys.length) * 100);
}

export interface ProgramScanInput {
  fullName?: string; originCountry?: string; educationLevel?: string;
  fieldOfStudy?: string; targetCountry?: string; preferredProgram?: string;
  degreeLevel?: string; gpa?: string; englishLevel?: string; budget?: string;
  scholarship?: string; intake?: string; cityType?: string; workPreference?: string;
  careerGoal?: string; availableDocuments?: string[]; priorRefusal?: string; notes?: string;
}

export function scoreProgram(i: ProgramScanInput) {
  let score = 30;
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  if (i.targetCountry) { score += 8; strengths.push("Target country selected"); } else weaknesses.push("Missing target country");
  if (i.preferredProgram) { score += 6; strengths.push("Specific program named"); } else weaknesses.push("No specific program chosen");
  if (i.fieldOfStudy) score += 4;
  if (i.gpa) { score += 6; strengths.push("Academic record provided"); } else weaknesses.push("GPA missing");
  if (i.englishLevel) { score += 8; strengths.push("English level documented"); } else weaknesses.push("English level not stated");
  if (i.budget) { score += 6; strengths.push("Budget defined"); } else weaknesses.push("Budget not estimated");
  if (i.careerGoal && i.careerGoal.length > 30) { score += 8; strengths.push("Clear career goal"); }
  if ((i.availableDocuments ?? []).length >= 3) { score += 8; strengths.push("Core documents available"); }
  if (i.priorRefusal === "yes") { score -= 10; weaknesses.push("Prior refusal — explanation required"); }
  if (i.scholarship === "required" && !i.budget) weaknesses.push("Scholarship needed but no budget plan");
  score = clamp(score);
  return {
    score,
    risk: toRisk(score),
    strengths,
    weaknesses,
    alternatives: [
      "Consider similar programs in 2 backup countries",
      "Shortlist 3 universities at different selectivity levels",
      "Explore part-time/work-study eligible options",
    ],
    actionPlan: [
      "Confirm program eligibility on official university page",
      "Prepare English proof certificate if not ready",
      "Draft a strong statement of purpose",
      "Verify intake deadlines on official sources",
    ],
  };
}

export type DocStatus = "Available" | "Missing" | "Unclear" | "Expired" | "Needs translation" | "Needs legalization" | "Not applicable";
export const DOC_STATUSES: DocStatus[] = ["Available","Missing","Unclear","Expired","Needs translation","Needs legalization","Not applicable"];

export const DOCUMENT_LIST = [
  "Passport","Transcript","Degree certificate / Grade 12 certificate","National entrance exam result",
  "CV","Motivation letter","Recommendation letter","English proof","Admission letter",
  "Pre-enrollment receipt","Declaration of Value","CIMEA statement",
  "Translation status","Legalization status","Family sponsorship letter","Bank statement",
  "Sponsor employment proof","Sponsor business proof","Birth certificate","Police clearance",
  "Travel insurance","Accommodation proof","Visa application form","Appointment confirmation","Other country-specific files",
];

export function scoreDocuments(items: Record<string, DocStatus>) {
  const entries = Object.entries(items);
  let total = 0, applicable = 0;
  const missing: string[] = [], urgent: string[] = [], translation: string[] = [], legalization: string[] = [];
  entries.forEach(([name, s]) => {
    if (s === "Not applicable") return;
    applicable++;
    switch (s) {
      case "Available": total += 100; break;
      case "Needs translation": total += 60; translation.push(name); break;
      case "Needs legalization": total += 60; legalization.push(name); break;
      case "Unclear": total += 40; urgent.push(name); break;
      case "Expired": total += 20; urgent.push(name); break;
      case "Missing": total += 0; missing.push(name); break;
    }
  });
  const score = applicable ? Math.round(total / applicable) : 0;
  return {
    score,
    risk: toRisk(score),
    missing, urgent, translation, legalization,
    actionPlan: [
      missing.length ? `Obtain ${missing.length} missing document(s)` : "All required documents present",
      translation.length ? `Translate: ${translation.slice(0,3).join(", ")}` : "Translations complete",
      legalization.length ? `Legalize/apostille: ${legalization.slice(0,3).join(", ")}` : "Legalizations complete",
      "Keep originals + scanned copies organized by category",
    ],
  };
}

export interface FinancialInput {
  sponsorName?: string; sponsorRelation?: string; bankName?: string;
  statementPeriod?: string; currency?: string;
  openingBalance?: number; closingBalance?: number; averageBalance?: number;
  tuitionFee?: number; livingCost?: number;
  monthlyIncome?: number; monthlyExpenses?: number;
  largeDepositNotes?: string; sourceOfFunds?: string;
  sponsorJobProof?: string; sponsorBusinessProof?: string;
  accommodationProof?: string; familySupport?: string; countryNotes?: string;
}

export function scoreFinancial(i: FinancialInput) {
  const required = (i.tuitionFee ?? 0) + (i.livingCost ?? 0);
  const have = i.averageBalance ?? 0;
  const gap = Math.max(0, required - have);
  let score = 25;
  if (required > 0 && have >= required) score += 30;
  else if (required > 0 && have >= required * 0.7) score += 18;
  else if (have > 0) score += 8;
  if (i.sourceOfFunds && i.sourceOfFunds.length > 40) score += 12;
  if (i.sponsorRelation) score += 8;
  if (i.sponsorJobProof === "available" || i.sponsorBusinessProof === "available") score += 10;
  if (i.accommodationProof === "available") score += 5;
  if (i.largeDepositNotes && i.largeDepositNotes.length > 30) score += 10;
  if ((i.openingBalance ?? 0) > 0 && (i.closingBalance ?? 0) > 0) score += 5;
  score = clamp(score);
  const missing: string[] = [];
  if (!i.sponsorJobProof || i.sponsorJobProof !== "available") missing.push("Sponsor job/business proof");
  if (!i.sourceOfFunds) missing.push("Source of funds explanation");
  if (!i.accommodationProof) missing.push("Accommodation proof");
  return {
    score, risk: toRisk(score), gap,
    consistency: have && i.openingBalance && Math.abs(i.openingBalance - have) > have * 0.5
      ? "Large fluctuation — be ready to explain"
      : "Balance appears reasonably consistent",
    depositQuality: i.largeDepositNotes && i.largeDepositNotes.length > 30 ? "Explained" : "Needs clearer explanation",
    sponsorClarity: i.sponsorRelation ? "Clear" : "Unclear",
    sourceClarity: i.sourceOfFunds && i.sourceOfFunds.length > 40 ? "Clear" : "Vague",
    missing,
    nextSteps: [
      gap > 0 ? `Close funding gap of ~${gap.toLocaleString()} ${i.currency ?? ""}` : "Funding target met on paper",
      "Keep statement period continuous (typically last 3–6 months)",
      "Prepare a written, truthful source-of-funds note",
      "Attach sponsor employment / business documents",
    ],
  };
}

export interface InterviewInput {
  mode: "Beginner" | "Normal" | "Strict";
  targetCountry?: string; visaType?: string; program?: string; university?: string;
  sponsorRelation?: string; question: string; answer: string;
}

export function scoreInterview(i: InterviewInput) {
  const a = i.answer.toLowerCase();
  const len = i.answer.trim().split(/\s+/).filter(Boolean).length;
  const has = (re: RegExp) => re.test(a);
  const clarity = clamp(40 + Math.min(40, len)); // longer = clearer (up to a point)
  const specificity = clamp(
    (has(/program|course|major/) ? 25 : 0) +
    (has(/university|college|school/) ? 25 : 0) +
    (i.university && a.includes(i.university.toLowerCase()) ? 20 : 0) +
    (has(/\d/) ? 15 : 0) + 15
  );
  const consistency = clamp(has(/sponsor|father|mother|parent|family|self/) ? 75 : 45);
  const financial = clamp(has(/tuition|cost|budget|fund|bank|scholarship|sponsor/) ? 80 : 35);
  const returnPlan = clamp(has(/return|home|after graduation|career|job in/) ? 80 : 35);
  let avg = (clarity + specificity + consistency + financial + returnPlan) / 5;
  if (i.mode === "Strict") avg *= 0.85;
  if (i.mode === "Beginner") avg = clamp(avg + 8);
  const score = clamp(Math.round(avg));
  const strong: string[] = [], weak: string[] = [];
  if (specificity >= 70) strong.push("Specific program/university references"); else weak.push("Add specific university & program names");
  if (financial >= 70) strong.push("Financial plan addressed"); else weak.push("Mention tuition, living cost, and sponsor");
  if (returnPlan >= 70) strong.push("Return plan implied"); else weak.push("Explain career & return plan after studies");
  if (clarity < 60) weak.push("Answer is too short — aim for 3–5 clear sentences");
  return {
    score, risk: toRisk(score),
    clarity, specificity, consistency, financial, returnPlan,
    strong, weak,
    betterStructure: `I chose [program] at [university] in ${i.targetCountry || "[country]"} because [specific reason]. My sponsor is [relation], who works as [job/business]. My planned budget is [amount] covering tuition and living costs. After graduation, I plan to [career goal] in [country], which is why I will return home.`,
    nextQuestions: [
      "Who is sponsoring your studies?",
      "How will this program help your career?",
      "Why should the embassy believe you will return?",
    ],
  };
}

export function finalReport(scores: { program?: number; document?: number; financial?: number; interview?: number }) {
  const vals = [scores.program ?? 0, scores.document ?? 0, scores.financial ?? 0, scores.interview ?? 0];
  const overall = Math.round(vals.reduce((a, b) => a + b, 0) / 4);
  return { overall, risk: toRisk(overall) };
}