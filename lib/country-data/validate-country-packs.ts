import type { CountryData } from "./types";

export function validateCountryPack(pack: CountryData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const text = JSON.stringify(pack).toLowerCase();
  if (["guarantee", "success chance", "approved"].some((w) => text.includes(w))) errors.push("Contains prohibited certainty wording.");
  if (pack.status === "active") {
    if (pack.documentGroups.length < 5) errors.push("Active pack must include at least 5 document groups.");
    const docs = pack.documentGroups.flatMap((g) => g.documents);
    if (docs.length < 20) errors.push("Active pack must include at least 20 document items.");
    if (pack.interviewQuestionGroups.length < 6) errors.push("Active pack must include at least 6 interview groups.");
    if (!pack.lastReviewed) errors.push("Active pack must include lastReviewed.");
    if (!pack.requiredVerificationMessage) errors.push("Active pack must include requiredVerificationMessage.");
    const keys = new Set<string>();
    for (const d of docs) {
      if (keys.has(d.key)) errors.push(`Duplicate document key: ${d.key}`);
      keys.add(d.key);
      if (!d.label || !d.notes) errors.push(`Document ${d.key} must include label and notes.`);
    }
  }
  return { valid: errors.length === 0, errors };
}
