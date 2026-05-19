import "server-only";
import { debugAILogging, openaiApiKey, openaiModel } from "@/lib/env";
import type { AIRouterRequest, AIRouterResponse } from "@/lib/ai/types";

export async function runOpenAI(request: AIRouterRequest): Promise<AIRouterResponse | null> {
  if (!openaiApiKey) return null;
  try {
    const OpenAI = (eval("require") as NodeRequire)("openai").default;
    const client = new OpenAI({ apiKey: openaiApiKey });
    const res = await client.responses.create({ model: openaiModel, input: request.messages.map((m) => `${m.role}: ${m.content}`).join("\n"), temperature: 0.2 });
    return { provider: "openai", model: openaiModel, outputText: res.output_text || "", usedFallback: false };
  } catch (error) {
    if (debugAILogging) console.error("OpenAI provider error", error);
    return null;
  }
}
