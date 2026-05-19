import "server-only";
import { debugAILogging, geminiApiKey, geminiModel } from "@/lib/env";
import type { AIRouterRequest, AIRouterResponse } from "@/lib/ai/types";

// Do not use unpaid Gemini API for sensitive student documents. Use paid/private settings for document review.
export async function runGemini(request: AIRouterRequest): Promise<AIRouterResponse | null> {
  if (!geminiApiKey) return null;
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiApiKey}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: request.messages.map((m) => `${m.role}: ${m.content}`).join("\n") }] }] }) });
    if (!res.ok) return null;
    const data = await res.json();
    return { provider: "gemini", model: geminiModel, outputText: String(data?.candidates?.[0]?.content?.parts?.[0]?.text || ""), usedFallback: false };
  } catch (error) {
    if (debugAILogging) console.error("Gemini provider error", error);
    return null;
  }
}
