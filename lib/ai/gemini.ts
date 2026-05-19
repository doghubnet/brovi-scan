import { prompts } from "@/lib/ai/prompts";
import { parseAIReport } from "@/lib/ai/json-safe-legacy";
import type { AIReport, ScoreInput } from "@/types";

function promptFor(kind: string, input: ScoreInput) {
  if (kind === "program") return prompts.program(input);
  if (kind === "documents") return prompts.documents(input);
  if (kind === "finance") return prompts.finance(input);
  if (kind === "interview") return prompts.interview(input);
  return prompts.report(input);
}

export async function analyzeWithGemini(kind: string, input: ScoreInput, fallback: (input: ScoreInput) => AIReport): Promise<AIReport> {
  const fallbackReport = fallback(input);
  if (!process.env.GEMINI_API_KEY) return fallbackReport;
  const prompt = promptFor(kind, input);
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) });
  if (!res.ok) return fallbackReport;
  const data = await res.json();
  return parseAIReport(String(data?.candidates?.[0]?.content?.parts?.[0]?.text || ""), fallbackReport);
}
