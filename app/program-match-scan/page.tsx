import { DashboardShell } from "@/components/layout/DashboardShell";
import { ProgressStepper } from "@/components/forms/ProgressStepper";
import { ProgramMatchCard } from "@/components/forms/ProgramMatchCard";
import { ScanForm } from "@/components/forms/ScanForm";
import { getActiveCountryOptions } from "@/lib/country-data";

export const dynamic = "force-dynamic";
const countryOptions = getActiveCountryOptions().map((c) => c.label);
const fields = [
  { label: "Full name", name: "fullName", helper: "Use the name shown on your passport or official identity document." },
  { label: "Country of origin", name: "countryOfOrigin" },
  { label: "Target country", name: "targetCountry", options: countryOptions, helper: "Verify official program entry rules before submission." },
  { label: "Education level", name: "educationLevel", options: ["High school", "Diploma", "Bachelor", "Master", "PhD"] },
  { label: "Field of study", name: "field" },
  { label: "GPA or average mark", name: "gpa", helper: "Enter GPA, percentage, or average mark as listed in your records." },
  { label: "English level", name: "englishLevel", options: ["No proof yet", "A2", "B1", "B2", "C1", "IELTS/TOEFL/PTE available"] },
  { label: "Budget range", name: "budget", options: ["Under $10,000", "$10,000 - $20,000", "$20,000 - $35,000", "$35,000+"] },
  { label: "Preferred intake", name: "preferredIntake", options: ["Fall", "Spring", "Summer", "Flexible"] },
  { label: "Preferred degree level", name: "preferredDegreeLevel", options: ["Bachelor", "Master", "Diploma", "Foundation", "PhD"] },
  { label: "Scholarship need", name: "scholarshipNeed", options: ["Required", "Helpful", "Not needed"] },
  { label: "Previous refusal", name: "previousRefusal", options: ["No", "Yes"] },
  { label: "Work preference", name: "workPreference", options: ["Part-time work important", "Internship important", "Study only", "Flexible"] },
  { label: "Available documents", name: "availableDocuments", helper: "Example: passport, transcript, English proof, CV, motivation letter." },
  { label: "Study gap", name: "studyGap", helper: "Summarize gaps briefly and truthfully." },
  { label: "Career goal", name: "careerGoal", textarea: true, helper: "Explain target role and how your degree supports your career pathway." },
];

export default function Page() {
  return <DashboardShell><h1 className="section-title">Program Match Scan</h1><p className="muted">Get a readiness score with best-fit directions, safer categories, ambitious-option cautions, missing profile items, official verification questions, and your next 5 tasks.</p><ProgressStepper steps={["Profile", "Preferences", "Scoring", "Recommendations"]} current={1} /><ProgramMatchCard /><ScanForm fields={fields} endpoint="/api/analyze-program" submitLabel="Get match score" tableName="program_profiles" /></DashboardShell>;
}
