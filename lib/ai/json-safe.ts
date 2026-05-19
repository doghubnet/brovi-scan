import type { ZodType } from "zod";

export function extractJsonObject(text: string) {
  const cleaned = text.replace(/```json|```/gi, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start < 0 || end < 0 || end <= start) return null;
  return cleaned.slice(start, end + 1);
}

export function safeParseJsonSchema<T>(text: string, schema: ZodType<T>) {
  const source = extractJsonObject(text);
  if (!source) return null;
  try {
    const parsed = JSON.parse(source) as unknown;
    const validated = schema.safeParse(parsed);
    return validated.success ? validated.data : null;
  } catch {
    return null;
  }
}
