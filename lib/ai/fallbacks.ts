import { finalFallback, documentFallback, financeFallback, interviewFallback, programFallback } from "@/lib/scoring";
import type { ScoreInput } from "@/types";

const warn = "Full AI review is temporarily unavailable. We prepared a basic checklist review for you.";
export const fallbackSupportChat = () => ({ reply: "I can still help with a checklist: gather truthful profile details, document status, and financial explanations before submission.", warning: warn });
export const fallbackFAQ = fallbackSupportChat;
export const fallbackInterviewPractice = (input: ScoreInput) => ({ ...interviewFallback(input), warning: warn });
export const fallbackDocumentReview = (input: ScoreInput) => ({ ...documentFallback(input), warning: warn });
export const fallbackBankStatementReview = (input: ScoreInput) => ({ ...financeFallback(input), warning: warn });
export const fallbackProgramMatch = (input: ScoreInput) => ({ ...programFallback(input), warning: warn });
export const fallbackReadinessReport = (input: ScoreInput) => ({ ...finalFallback(input), warning: warn });
