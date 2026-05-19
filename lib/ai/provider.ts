import { analyzeWithGemini } from "@/lib/ai/gemini";
import { analyzeDocumentsWithOpenAI, analyzeFinanceWithOpenAI, analyzeInterviewAnswerWithOpenAI, analyzeProgramWithOpenAI, generateFinalReportWithOpenAI } from "@/lib/ai/openai-analysis";
import { isGeminiConfigured, isOpenAIConfigured } from "@/lib/env";
import type { AIReport, ScoreInput } from "@/types";

export type AIProvider = "openai" | "gemini" | "fallback";
export function getActiveAIProvider(): AIProvider { if (isOpenAIConfigured) return "openai"; if (isGeminiConfigured) return "gemini"; return "fallback"; }
export function canUseAI() { return isOpenAIConfigured || isGeminiConfigured; }

export async function analyzeWithAI(kind: "program"|"documents"|"finance"|"interview"|"final", input: ScoreInput, fallback: (input: ScoreInput)=>AIReport): Promise<AIReport> {
  const provider = getActiveAIProvider();
  if (provider === "openai") {
    if (kind === "program") return analyzeProgramWithOpenAI(input);
    if (kind === "documents") return analyzeDocumentsWithOpenAI(input);
    if (kind === "finance") return analyzeFinanceWithOpenAI(input);
    if (kind === "interview") return analyzeInterviewAnswerWithOpenAI(input);
    return generateFinalReportWithOpenAI(input);
  }
  if (provider === "gemini") {
    return analyzeWithGemini(kind, input, fallback);
  }
  return fallback(input);
}
