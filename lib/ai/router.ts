import { allowFreeAIForSupport } from "@/lib/env";
import { fallbackBankStatementReview, fallbackDocumentReview, fallbackInterviewPractice, fallbackProgramMatch, fallbackReadinessReport, fallbackSupportChat } from "@/lib/ai/fallbacks";
import { runGemini } from "@/lib/ai/providers/gemini";
import { runGroq } from "@/lib/ai/providers/groq";
import { runOpenAI } from "@/lib/ai/providers/openai";
import { runOpenRouter } from "@/lib/ai/providers/openrouter";
import { classifyTaskSensitivity } from "@/lib/ai/safety-classifier";
import { recordAIUsage } from "@/lib/ai/usage-limits";
import type { AIRouterRequest, AIRouterResponse } from "@/lib/ai/types";

export async function runAI(request: AIRouterRequest): Promise<AIRouterResponse> {
  const sensitivity = classifyTaskSensitivity(request.taskType, request.metadata ?? request.messages);
  const tryProviders = async (fns: Array<() => Promise<AIRouterResponse | null>>) => { for (const fn of fns){ const out = await fn(); if (out?.outputText) return out; } return null; };

  let out: AIRouterResponse | null = null;
  if (["document_review","bank_statement_review"].includes(request.taskType)) out = await tryProviders([() => runOpenAI({ ...request, sensitivity }), () => runGemini({ ...request, sensitivity })]);
  else if (request.taskType === "interview_practice") out = await tryProviders([() => runGemini({ ...request, sensitivity }), () => runOpenAI({ ...request, sensitivity }), () => sensitivity === "high" ? Promise.resolve(null) : runGroq({ ...request, sensitivity })]);
  else if (request.taskType === "program_match" || request.taskType === "readiness_report") out = await tryProviders([() => runOpenAI({ ...request, sensitivity }), () => runGemini({ ...request, sensitivity }), () => runOpenRouter({ ...request, sensitivity })]);
  else out = await tryProviders(allowFreeAIForSupport && sensitivity === "low" ? [() => runOpenRouter({ ...request, sensitivity }), () => runGroq({ ...request, sensitivity }), () => runGemini({ ...request, sensitivity }), () => runOpenAI({ ...request, sensitivity })] : [() => runOpenAI({ ...request, sensitivity }), () => runGemini({ ...request, sensitivity })]);

  if (out) { await recordAIUsage(request.userId, request.taskType, out.provider, true); return out; }

  const fb = request.taskType === "document_review" ? fallbackDocumentReview(request.metadata ?? {}) : request.taskType === "bank_statement_review" ? fallbackBankStatementReview(request.metadata ?? {}) : request.taskType === "interview_practice" ? fallbackInterviewPractice(request.metadata ?? {}) : request.taskType === "program_match" ? fallbackProgramMatch(request.metadata ?? {}) : request.taskType === "readiness_report" ? fallbackReadinessReport(request.metadata ?? {}) : fallbackSupportChat();
  await recordAIUsage(request.userId, request.taskType, "fallback", false);
  return { provider: "fallback", usedFallback: true, outputJson: fb as unknown as Record<string, unknown>, outputText: "reply" in fb ? fb.reply : undefined, warning: "Full AI review is temporarily unavailable. We prepared a basic checklist review for you." };
}
