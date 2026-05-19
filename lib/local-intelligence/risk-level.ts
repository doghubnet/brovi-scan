import type { AnalysisRiskLevel } from "./types";
export const scoreToRiskBand = (score: number): AnalysisRiskLevel => score < 40 ? "critical" : score < 60 ? "high" : score < 75 ? "moderate" : "low";
