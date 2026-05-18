export type RiskLevel = "High Risk" | "Needs Work" | "Needs Major Improvement" | "Moderate" | "Strong" | "Very Strong";
export type AIReport = { score: number; riskLevel: RiskLevel; strengths: string[]; weaknesses: string[]; recommendations: string[]; stepByStepPlan: string[]; warning: string };
export type ScoreInput = Record<string, unknown>;
