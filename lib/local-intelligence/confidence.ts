export function calculateConfidence({ structuredFieldCount, requiredFieldCount, hasExtractedText, hasAttachments }: { structuredFieldCount: number; requiredFieldCount: number; hasExtractedText: boolean; hasAttachments: boolean; }) {
  const completeness = requiredFieldCount > 0 ? structuredFieldCount / requiredFieldCount : 0;
  let score = 35 + completeness * 45 + (hasExtractedText ? 10 : 0) + (hasAttachments ? 8 : 0);
  return Math.max(20, Math.min(95, Math.round(score)));
}
