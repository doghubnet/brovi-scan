import { ClipboardCheck, FileText, FolderKanban, Landmark, ListTodo, MessageSquare, PieChart, ShieldCheck, UserCheck, UserCog } from "lucide-react";

export const DISCLAIMER = "Brovi Scan provides preparation guidance only. The readiness score is not a visa guarantee. Final decisions are made by official embassies, consulates, universities, and immigration authorities.";
export const scores = { program: 84, documents: 72, financial: 68, interview: 79, overall: 76 };
export const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: PieChart },
  { label: "Program Match", href: "/program-match-scan", icon: PieChart },
  { label: "Document Scan", href: "/document-scan", icon: FileText },
  { label: "Bank Statement", href: "/bank-statement-scan", icon: Landmark },
  { label: "Interview", href: "/interview-practice", icon: MessageSquare },
  { label: "Readiness Report", href: "/readiness-report", icon: ShieldCheck },
  { label: "Applications", href: "/applications", icon: FolderKanban },
  { label: "Document Vault", href: "/document-vault", icon: ClipboardCheck },
  { label: "Tasks", href: "/tasks", icon: ListTodo },
  { label: "Consultant Review", href: "/consultant-review", icon: UserCheck },
  { label: "Admin", href: "/admin", icon: UserCog },
];
export const headerNavItems = navItems.filter((item) => ["Program Match", "Document Scan", "Bank Statement", "Interview", "Readiness Report"].includes(item.label));
export const featureCards = [
  ["Program Match Scan", "Match your academic profile, budget, target country, and career goal with safer program directions."],
  ["Document Scan", "Check passport, transcripts, admission documents, sponsor letters, translations, and missing items."],
  ["Bank Statement Scan", "Review financial preparation, source of funds, sponsor relation, large deposits, and coverage gaps."],
  ["Interview Practice Scan", "Practice common visa questions and receive answer feedback based on clarity, consistency, and financial explanation."],
  ["Brovi Scan Readiness Report", "Combine program, document, finance, and interview scores into one clear readiness report."],
  ["Recommendation Roadmap", "Turn weak areas into tasks, deadlines, and step-by-step preparation actions."],
] as const;
export const interviewQuestions = ["Why this country?","Why this university?","Why this program?","Who sponsors you?","What does your sponsor do?","Why should the visa officer trust your financial documents?","What are your plans after graduation?","Why not study in your home country?","Do you have relatives abroad?","What will you do if your visa is refused?","Explain your academic gap.","Explain low grades, when applicable.","Explain source of funds.","What do you know about your course?","How does this course connect with your future career?"];
export const documentStatuses = ["Available", "Missing", "Unclear", "Expired", "Needs Translation", "Needs Legalization", "Ready"];
export const currencies = ["USD", "EUR", "GBP", "CAD", "AUD", "NGN", "GHS", "KES", "INR", "Other"];
export const difficultyLevels = ["Beginner", "Normal", "Strict"];
