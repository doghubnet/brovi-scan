import type { AIReport } from "@/types";

const columnMap: Record<string, Record<string, string>> = {
  program_profiles: { fullName: "full_name", countryOfOrigin: "country_of_origin", targetCountry: "target_country", educationLevel: "education_level", field: "field_of_study", gpa: "gpa", englishLevel: "english_level", budget: "budget_range", preferredCityType: "preferred_city_type", preferredIntake: "preferred_intake", preferredDegreeLevel: "preferred_degree_level", workPreference: "work_preference", scholarshipNeed: "scholarship_need", availableDocuments: "available_documents", careerGoal: "career_goal" },
  document_reviews: { passportStatus: "passport_status", transcriptStatus: "transcript_status", grade12Certificate: "grade_12_status", entranceExamResult: "national_exam_status", cvStatus: "cv_status", motivationLetterStatus: "motivation_letter_status", recommendationLetterStatus: "recommendation_letter_status", englishStatus: "english_proof_status", declarationOfValueStatus: "declaration_of_value_status", cimeaStatus: "cimea_status", admissionStatus: "admission_status", preEnrollmentStatus: "pre_enrollment_status", sponsorshipLetterStatus: "sponsorship_letter_status", birthCertificateStatus: "birth_certificate_status", policeClearanceStatus: "police_clearance_status", travelInsuranceStatus: "travel_insurance_status", translationStatus: "translation_status", financialDocsStatus: "financial_docs_status", otherStatus: "other_docs_status" },
  financial_reviews: { sponsorName: "sponsor_name", sponsorRelation: "sponsor_relation", bankName: "bank_name", statementPeriod: "statement_period", currency: "currency", openingBalance: "opening_balance", closingBalance: "closing_balance", averageBalance: "average_balance", largeDeposits: "large_deposits", monthlyIncome: "monthly_income_estimate", monthlyExpenses: "monthly_expenses_estimate", sourceOfFunds: "source_of_funds", tuitionFeeAmount: "tuition_fee_amount", livingCostAmount: "living_cost_amount", accommodationProof: "accommodation_proof", sponsorJobProof: "sponsor_business_or_job_proof" },
};

export function toTableInsert(tableName: string, userId: string, data: Record<string, unknown>, report: AIReport) {
  const mapped: Record<string, unknown> = { user_id: userId, score: report.score, risk_level: report.riskLevel, report_json: report };
  const map = columnMap[tableName] ?? {};
  Object.entries(data).forEach(([key, value]) => {
    if (map[key]) mapped[map[key]] = value;
  });
  return mapped;
}
