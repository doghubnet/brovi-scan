import { z } from "zod";

const riskLevel = z.string().min(1);
const textList = z.array(z.string().min(1)).default([]);

export const programReviewSchema = z.object({
  score: z.number().min(0).max(100),
  riskLevel,
  summary: z.string().min(1),
  strengths: textList,
  weaknesses: textList,
  recommendedPrograms: textList,
  recommendedCountries: textList,
  nextSteps: textList,
  disclaimer: z.string().min(1),
});

export const documentReviewSchema = z.object({ score: z.number().min(0).max(100), riskLevel, summary: z.string().min(1), missingDocuments: textList, weakDocuments: textList, consistencyIssues: textList, translationLegalizationIssues: textList, nextSteps: textList, disclaimer: z.string().min(1) });
export const financialReviewSchema = z.object({ score: z.number().min(0).max(100), riskLevel, summary: z.string().min(1), strengths: textList, redFlags: textList, sourceOfFundsIssues: textList, sponsorProofIssues: textList, recommendedImprovements: textList, sponsorExplanationTemplate: z.string().min(1), disclaimer: z.string().min(1) });
export const interviewReviewSchema = z.object({ score: z.number().min(0).max(100), riskLevel, answerFeedback: z.string().min(1), weaknesses: textList, improvedAnswer: z.string().min(1), practiceAdvice: textList, disclaimer: z.string().min(1) });
export const finalReportSchema = z.object({ overallScore: z.number().min(0).max(100), riskLevel, summary: z.string().min(1), topStrengths: textList, topWeaknesses: textList, priorityActions: textList, estimatedPreparationTimeline: z.string().min(1), disclaimer: z.string().min(1) });

export type ProgramReview = z.infer<typeof programReviewSchema>;
export type DocumentReview = z.infer<typeof documentReviewSchema>;
export type FinancialReview = z.infer<typeof financialReviewSchema>;
export type InterviewReview = z.infer<typeof interviewReviewSchema>;
export type FinalReportReview = z.infer<typeof finalReportSchema>;
