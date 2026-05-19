import "server-only";
import { safeParseJsonSchema } from "@/lib/ai/json-safe";
import { finalReportSchema, documentReviewSchema, financialReviewSchema, interviewReviewSchema, programReviewSchema } from "@/lib/ai/json-schema";
import { prompts } from "@/lib/ai/prompts";
import { getOpenAIClient } from "@/lib/ai/openai";
import { finalFallback, documentFallback, financeFallback, interviewFallback, programFallback } from "@/lib/scoring";
import type { AIReport, ScoreInput } from "@/types";

const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

async function ask(prompt: string) {
  const client = await getOpenAIClient();
  if (!client) return null;
  const response = await client.responses.create({ model, input: prompt, temperature: 0.2 });
  return response.output_text || "";
}

function toReport(score: number, riskLevel: string, strengths: string[], weaknesses: string[], recommendations: string[], warning: string): AIReport {
  return { score, riskLevel: riskLevel as AIReport["riskLevel"], strengths, weaknesses, recommendations, stepByStepPlan: recommendations.slice(0, 4), warning };
}

export async function analyzeProgramWithOpenAI(input: ScoreInput): Promise<AIReport> { const fallback = programFallback(input); const raw = await ask(prompts.program(input)); if (!raw) return fallback; const parsed = safeParseJsonSchema(raw, programReviewSchema); return parsed ? toReport(parsed.score, parsed.riskLevel, parsed.strengths ?? [], parsed.weaknesses ?? [], parsed.nextSteps ?? [], parsed.disclaimer) : fallback; }
export async function analyzeDocumentsWithOpenAI(input: ScoreInput): Promise<AIReport> { const fallback = documentFallback(input); const raw = await ask(prompts.documents(input)); if (!raw) return fallback; const parsed = safeParseJsonSchema(raw, documentReviewSchema); return parsed ? toReport(parsed.score, parsed.riskLevel, parsed.missingDocuments ?? [], [...(parsed.weakDocuments ?? []), ...(parsed.consistencyIssues ?? [])], parsed.nextSteps ?? [], parsed.disclaimer) : fallback; }
export async function analyzeFinanceWithOpenAI(input: ScoreInput): Promise<AIReport> { const fallback = financeFallback(input); const raw = await ask(prompts.finance(input)); if (!raw) return fallback; const parsed = safeParseJsonSchema(raw, financialReviewSchema); return parsed ? toReport(parsed.score, parsed.riskLevel, parsed.strengths ?? [], [...(parsed.redFlags ?? []), ...(parsed.sourceOfFundsIssues ?? []), ...(parsed.sponsorProofIssues ?? [])], parsed.recommendedImprovements ?? [], parsed.disclaimer) : fallback; }
export async function analyzeInterviewAnswerWithOpenAI(input: ScoreInput): Promise<AIReport> { const fallback = interviewFallback(input); const raw = await ask(prompts.interview(input)); if (!raw) return fallback; const parsed = safeParseJsonSchema(raw, interviewReviewSchema); return parsed ? toReport(parsed.score, parsed.riskLevel, [parsed.answerFeedback], parsed.weaknesses ?? [], parsed.practiceAdvice ?? [], parsed.disclaimer) : fallback; }
export async function generateFinalReportWithOpenAI(input: ScoreInput): Promise<AIReport> { const fallback = finalFallback(input); const raw = await ask(prompts.report(input)); if (!raw) return fallback; const parsed = safeParseJsonSchema(raw, finalReportSchema); return parsed ? toReport(parsed.overallScore, parsed.riskLevel, parsed.topStrengths ?? [], parsed.topWeaknesses ?? [], parsed.priorityActions ?? [], parsed.disclaimer) : fallback; }
export async function chatWithOpenAI(input: { message: string }) { const raw = await ask(prompts.chat(input)); return raw || null; }
