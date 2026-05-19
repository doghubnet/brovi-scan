import { DashboardShell } from "@/components/layout/DashboardShell";
import { ProgressStepper } from "@/components/forms/ProgressStepper";
import { ProgramMatchCard } from "@/components/forms/ProgramMatchCard";
import { ScanForm } from "@/components/forms/ScanForm";

export const dynamic = "force-dynamic";

const fields = [
  { label: "Full name", name: "fullName", helper: "Use the name shown on your passport or official identity document." },
  { label: "Country of origin", name: "countryOfOrigin" },
  { label: "Target country", name: "targetCountry", helper: "Select where you plan to study first. Verify program entry rules on official university websites." },
  { label: "Highest education level", name: "educationLevel", options: ["High school", "Diploma", "Bachelor", "Master", "PhD"] },
  { label: "Field of study", name: "field" },
  { label: "GPA or average mark", name: "gpa", helper: "Enter GPA, percentage, or average mark exactly as in academic records." },
  { label: "English level", name: "englishLevel", options: ["No proof yet", "A2", "B1", "B2", "C1", "IELTS/TOEFL/PTE available"] },
  { label: "Budget range", name: "budget", options: ["Under $10,000", "$10,000 - $20,000", "$20,000 - $35,000", "$35,000+"], helper: "Use realistic tuition + living cost range for one academic year." },
  { label: "Preferred city type", name: "preferredCityType", options: ["Major city", "Mid-size city", "Small student town", "Flexible"] },
  { label: "Preferred intake", name: "preferredIntake", helper: "Example: Fall 2027, Spring 2028. Check official intake windows before applying." },
  { label: "Preferred degree level", name: "preferredDegreeLevel", options: ["Bachelor", "Master", "Diploma", "Foundation", "PhD"] },
  { label: "Work preference", name: "workPreference", options: ["Part-time work important", "Internship important", "Study only", "Flexible"] },
  { label: "Scholarship need", name: "scholarshipNeed", options: ["Required", "Helpful", "Not needed"], helper: "State how critical scholarship support is for your plan." },
  { label: "Available documents", name: "availableDocuments", helper: "Example: passport, transcript, English proof, CV, motivation letter." },
  { label: "Career goal", name: "careerGoal", textarea: true, helper: "Explain target role and how the degree supports your career pathway." },
];

export default function Page() {
  return <DashboardShell><h1 className="section-title">Program Match Scan</h1><p className="muted">Results highlight best-fit direction, safer program categories, key weak points, documents to prepare next, and questions to verify on official university websites.</p><ProgressStepper steps={["Profile", "Preferences", "Scoring", "Recommendations"]} current={1} /><ProgramMatchCard /><ScanForm fields={fields} endpoint="/api/analyze-program" submitLabel="Get match score" tableName="program_profiles" /></DashboardShell>;
}
