export type AnalysisRiskLevel = "low" | "moderate" | "high" | "critical";
export type ReadinessLabel = "Not Started" | "Needs Work" | "Moderate" | "Strong" | "Very Strong";
export type EvidenceSeverity = "info" | "warning" | "risk" | "critical" | "success";
export type RecommendationPriority = "Low" | "Medium" | "High" | "Critical";
export type EvidenceItem = { id: string; source: string; label: string; value: string; severity: EvidenceSeverity; explanation: string };
export type RecommendationItem = { id: string; priority: RecommendationPriority; title: string; action: string; reason: string; module: string };
export type AnalysisResult = { score: number; readinessLabel: ReadinessLabel; riskLevel: AnalysisRiskLevel; summary: string; evidence: EvidenceItem[]; recommendations: RecommendationItem[]; missingItems: string[]; warnings: string[]; confidence: number; officialVerificationRequired: boolean };
