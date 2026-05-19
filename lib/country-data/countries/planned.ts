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
});

export const plannedCountryPacks: CountryData[] = [
  mk("ES", "Spain"), mk("BE", "Belgium"), mk("TR", "Turkey"), mk("AE", "United Arab Emirates"), mk("IE", "Ireland"), mk("SE", "Sweden"), mk("FI", "Finland"), mk("NO", "Norway"), mk("DK", "Denmark"), mk("PL", "Poland"), mk("CZ", "Czech Republic"), mk("HU", "Hungary"),
  mk("KR", "South Korea"), mk("SA", "Saudi Arabia"), mk("QA", "Qatar"), mk("MY", "Malaysia"), mk("SG", "Singapore"), mk("RU", "Russia"), mk("CH", "Switzerland"), mk("PT", "Portugal"), mk("LT", "Lithuania"), mk("LV", "Latvia"), mk("EE", "Estonia"), mk("RO", "Romania"), mk("CY", "Cyprus"), mk("MT", "Malta"), mk("ZA", "South Africa"), mk("IN", "India"),
];
