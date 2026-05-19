import "server-only";
import { debugAILogging, groqApiKey, groqModel } from "@/lib/env";
import type { AIRouterRequest, AIRouterResponse } from "@/lib/ai/types";

export async function runGroq(request: AIRouterRequest): Promise<AIRouterResponse | null> {
  if (!groqApiKey) return null;
  try {
    const Groq = (eval("require") as NodeRequire)("groq-sdk").default;
    const client = new Groq({ apiKey: groqApiKey });
    const res = await client.chat.completions.create({ model: groqModel, messages: request.messages });
    return { provider: "groq", model: groqModel, outputText: res.choices?.[0]?.message?.content || "", usedFallback: false };
  } catch (error) {
    if (debugAILogging) console.error("Groq provider error", error);
    return null;
  }
}
