import type { ReadinessLabel } from "./types";
import { scoreToRiskBand } from "./risk-level";
export const clampScore = (value: number) => Math.max(0, Math.min(100, Math.round(value)));
export const weightedAverage = (items: Array<{ value: number; weight: number }>) => {
  const total = items.reduce((s, i) => s + i.weight, 0) || 1;
  return clampScore(items.reduce((s, i) => s + i.value * i.weight, 0) / total);
};
export const scoreToReadinessLabel = (score: number): ReadinessLabel => score < 60 ? "Needs Work" : score < 75 ? "Moderate" : score < 90 ? "Strong" : "Very Strong";
export const scoreToRiskLevel = scoreToRiskBand;
export const normalizePercentage = (value: unknown) => clampScore(typeof value === "number" ? value : Number(value ?? 0));
export const parseNumericGrade = (value: unknown) => {
  const n = Number(String(value ?? "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : null;
};
