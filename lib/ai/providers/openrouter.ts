import "server-only";
import { debugAILogging, openrouterApiKey, openrouterModel, openrouterZdrRequired } from "@/lib/env";
import type { AIRouterRequest, AIRouterResponse } from "@/lib/ai/types";

export async function runOpenRouter(request: AIRouterRequest): Promise<AIRouterResponse | null> {
  if (!openrouterApiKey) return null;
  try {
    const OpenAI = (eval("require") as NodeRequire)("openai").default;
    const client = new OpenAI({ apiKey: openrouterApiKey, baseURL: "https://openrouter.ai/api/v1" });
    const res = await client.chat.completions.create({ model: openrouterModel, messages: request.messages, provider: request.sensitivity !== "low" && openrouterZdrRequired ? { zdr: true } : undefined });
    return { provider: "openrouter", model: openrouterModel, outputText: res.choices?.[0]?.message?.content || "", usedFallback: false };
  } catch (error) {
    if (debugAILogging) console.error("OpenRouter provider error", error);
    return null;
  }
}
