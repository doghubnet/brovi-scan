import { DashboardShell } from "@/components/layout/DashboardShell";
import { ProgressStepper } from "@/components/forms/ProgressStepper";
import { ProgramMatchCard } from "@/components/forms/ProgramMatchCard";
import { ScanForm } from "@/components/forms/ScanForm";

const fields = [
  { label: "Full name", name: "fullName", helper: "Use the name that appears on your passport." },
  { label: "Country of origin", name: "countryOfOrigin" },
  { label: "Target country", name: "targetCountry" },
  { label: "Highest education level", name: "educationLevel", options: ["High school", "Diploma", "Bachelor", "Master", "PhD"] },
  { label: "Field of study", name: "field" },
  { label: "GPA or average mark", name: "gpa", helper: "Enter GPA, percentage, or average grade." },
  { label: "English level", name: "englishLevel", options: ["No proof yet", "A2", "B1", "B2", "C1", "IELTS/TOEFL/PTE available"] },
  { label: "Budget range", name: "budget", options: ["Under $10,000", "$10,000 - $20,000", "$20,000 - $35,000", "$35,000+"] },
  { label: "Preferred city type", name: "preferredCityType", options: ["Major city", "Mid-size city", "Small student town", "Flexible"] },
  { label: "Preferred intake", name: "preferredIntake" },
  { label: "Preferred degree level", name: "preferredDegreeLevel", options: ["Bachelor", "Master", "Diploma", "Foundation", "PhD"] },
  { label: "Work preference", name: "workPreference", options: ["Part-time work important", "Internship important", "Study only", "Flexible"] },
  { label: "Scholarship need", name: "scholarshipNeed", options: ["Required", "Helpful", "Not needed"] },
  { label: "Available documents", name: "availableDocuments", helper: "Example: passport, transcript, English proof, CV." },
  { label: "Career goal", name: "careerGoal", textarea: true, helper: "Explain how the program connects to your future work plan." },
];

export default function Page() {
  return <DashboardShell><h1 className="section-title">Program Match Scan</h1><ProgressStepper steps={["Profile", "Preferences", "Scoring", "Recommendations"]} current={1} /><ProgramMatchCard /><ScanForm fields={fields} endpoint="/api/analyze-program" submitLabel="Get match score" tableName="program_profiles" /></DashboardShell>;
}
