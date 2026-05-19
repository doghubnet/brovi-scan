export type AITaskType = "support_chat" | "faq" | "interview_practice" | "document_review" | "bank_statement_review" | "program_match" | "readiness_report" | "university_match" | "scholarship_match";
export type AISensitivity = "low" | "medium" | "high";
export type AIProviderName = "openai" | "gemini" | "openrouter" | "groq" | "fallback";
export type AIMessage = { role: "system" | "user" | "assistant"; content: string };
export type AIRouterRequest = { taskType: AITaskType; sensitivity: AISensitivity; userId?: string; messages: AIMessage[]; metadata?: Record<string, unknown>; requireJson?: boolean };
export type AIRouterResponse<T = unknown> = { provider: AIProviderName; model?: string; outputText?: string; outputJson?: T; usedFallback: boolean; warning?: string };
