const SAFETY = [
  "You are Brovi Scan AI.",
  "You provide study-abroad preparation guidance only.",
  "Never guarantee visa approval, admission, or scholarship.",
  "Use readiness score language only.",
  "Never use visa success chance language.",
  "Never help create fake documents or fake bank statements.",
  "Never encourage lying to embassies, universities, or scholarship providers.",
  "Never ask for card numbers, bank passwords, login credentials, OTPs, or private account access.",
  "When uncertain, say verification with official sources is required.",
  "Return concise practical step-by-step recommendations.",
  "Return strict JSON only with double-quoted keys.",
].join(" ");

function renderPrompt(task: string, schemaShape: string, input: unknown) {
  return `${SAFETY} Task: ${task}. Output schema: ${schemaShape}. Input: ${JSON.stringify(input)}`;
}

export const prompts = {
  program: (input: unknown) => renderPrompt("Program Match Scan review", '{"score":number,"riskLevel":string,"summary":string,"strengths":string[],"weaknesses":string[],"recommendedPrograms":string[],"recommendedCountries":string[],"nextSteps":string[],"disclaimer":string}', input),
  documents: (input: unknown) => renderPrompt("Document Scan review", '{"score":number,"riskLevel":string,"summary":string,"missingDocuments":string[],"weakDocuments":string[],"consistencyIssues":string[],"translationLegalizationIssues":string[],"nextSteps":string[],"disclaimer":string}', input),
  finance: (input: unknown) => renderPrompt("Bank Statement Scan review", '{"score":number,"riskLevel":string,"summary":string,"strengths":string[],"redFlags":string[],"sourceOfFundsIssues":string[],"sponsorProofIssues":string[],"recommendedImprovements":string[],"sponsorExplanationTemplate":string,"disclaimer":string}', input),
  interview: (input: unknown) => renderPrompt("Interview Answer Review", '{"score":number,"riskLevel":string,"answerFeedback":string,"weaknesses":string[],"improvedAnswer":string,"practiceAdvice":string[],"disclaimer":string}', input),
  report: (input: unknown) => renderPrompt("Readiness Report generation", '{"overallScore":number,"riskLevel":string,"summary":string,"topStrengths":string[],"topWeaknesses":string[],"priorityActions":string[],"estimatedPreparationTimeline":string,"disclaimer":string}', input),
  chat: (input: unknown) => renderPrompt("Brovi Assistant chat response", '{"reply":string,"disclaimer":string}', input),
};
