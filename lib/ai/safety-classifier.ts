import type { AISensitivity, AITaskType } from "@/lib/ai/types";

const sensitivePatterns = ["passport", "bank statement", "account number", "card number", "password", "otp", "transcript", "diploma", "birth certificate", "sponsor income", "financial proof", "embassy document", "visa refusal", "private address", "phone number", "national id"];

export function containsSensitiveStudentData(text: string): boolean {
  const lower = text.toLowerCase();
  return sensitivePatterns.some((pattern) => lower.includes(pattern));
}

export function classifyTaskSensitivity(taskType: AITaskType, payload?: unknown): AISensitivity {
  if (taskType === "document_review" || taskType === "bank_statement_review") return "high";
  if (["program_match", "interview_practice", "university_match", "scholarship_match"].includes(taskType)) return "medium";
  if (taskType === "readiness_report") return containsSensitiveStudentData(JSON.stringify(payload ?? "")) ? "high" : "medium";
  if (taskType === "support_chat") return containsSensitiveStudentData(JSON.stringify(payload ?? "")) ? "high" : "low";
  return "low";
}
