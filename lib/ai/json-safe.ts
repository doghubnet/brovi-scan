import type { AIReport } from "@/types";

export function parseAIReport(text: string, fallback: AIReport): AIReport {
  try {
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim()) as Partial<AIReport>;
    return {
      score: Number(parsed.score ?? fallback.score),
      riskLevel: parsed.riskLevel ?? fallback.riskLevel,
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : fallback.strengths,
      weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : fallback.weaknesses,
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : fallback.recommendations,
      stepByStepPlan: Array.isArray(parsed.stepByStepPlan) ? parsed.stepByStepPlan : fallback.stepByStepPlan,
      warning: parsed.warning || "Brovi Scan provides preparation guidance only. The readiness score is not a visa guarantee.",
    };
  } catch {
    return fallback;
  }
}
