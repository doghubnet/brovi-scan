import "server-only";
import { openaiApiKey } from "@/lib/env";

export async function getOpenAIClient() {
  if (!openaiApiKey) return null;
  const runtimeRequire = eval("require") as NodeRequire;
  const OpenAI = runtimeRequire("openai").default;
  return new OpenAI({ apiKey: openaiApiKey });
}
