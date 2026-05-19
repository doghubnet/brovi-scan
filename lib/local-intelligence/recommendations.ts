import type { RecommendationItem, RecommendationPriority } from "./types";
export const makeRecommendation = (id: string, priority: RecommendationPriority, title: string, action: string, reason: string, module: string): RecommendationItem => ({ id, priority, title, action, reason, module });
