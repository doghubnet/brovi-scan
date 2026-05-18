export function fallbackChatReply(message: string) {
  const text = message.toLowerCase();
  if (text.includes("interview")) return "For interview preparation, answer clearly, honestly, and specifically. Include why this country, why this program, who sponsors you, and how your study plan connects to your future career. Use the Interview Practice Scan for scored feedback.";
  if (text.includes("document") || text.includes("missing")) return "Open Document Scan or Document Vault to check passport, transcripts, admission items, sponsor letters, translations, legalization, and expiry dates. Prioritize missing, expired, translation, and legalization issues first.";
  if (text.includes("financial") || text.includes("bank")) return "For financial readiness, review balance coverage, statement period, sponsor relationship proof, source of funds, and large deposit explanations. Never share bank passwords, card numbers, or login credentials.";
  if (text.includes("report") || text.includes("score")) return "Your readiness score is preparation guidance only. Complete program, document, financial, and interview scans to generate a balanced readiness report with next steps.";
  return "I can help with program match, document checklist, financial preparation, interview practice, and next tasks. What would you like to improve first?";
}
