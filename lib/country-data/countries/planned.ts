import type { CountryData } from "../types";

const mk = (countryCode: string, countryName: string): CountryData => ({
  countryCode,
  countrySlug: countryName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  countryName,
  status: "planned",
  lastReviewed: "2026-05-19",
  officialSourceNotes: [],
  requiredVerificationMessage: "This country pack is planned. Brovi Scan must verify official documents before activating this destination.",
  admissionNotes: [],
  visaRouteNotes: [],
  documentGroups: [],
  interviewQuestionGroups: [],
  financialReviewNotes: [],
  commonRiskFlags: [],
  recommendedTasks: [],
  disclaimer: "This destination is not yet active. Do not use it as official guidance.",
  researchTodo: ["Confirm official visa/residence authority page.", "Confirm university admission evidence list.", "Confirm financial evidence categories and conditions.", "Confirm interview-focused risk patterns from official guidance."],
  officialSourceCandidates: ["National immigration authority website", "Official embassy/consulate visa page", "Official higher-education ministry or recognition portal"],
  riskNotePlaceholders: ["Outdated checklist risk", "Unverified translation/legalization risk", "Financial evidence mismatch risk"],
  activationChecklist: ["Verify at least two official sources", "Set lastReviewed date", "Create 5+ document groups", "Add 20+ document items", "Add 3+ financial notes", "Add 6+ interview groups", "Add 6+ recommended tasks", "Add clear verification warning"],
});

export const plannedCountryPacks: CountryData[] = [
  mk("KR", "South Korea"), mk("SA", "Saudi Arabia"), mk("QA", "Qatar"), mk("MY", "Malaysia"), mk("SG", "Singapore"), mk("RU", "Russia"), mk("CH", "Switzerland"), mk("PT", "Portugal"), mk("LT", "Lithuania"), mk("LV", "Latvia"), mk("EE", "Estonia"), mk("RO", "Romania"), mk("CY", "Cyprus"), mk("MT", "Malta"), mk("ZA", "South Africa"), mk("IN", "India"),
];
