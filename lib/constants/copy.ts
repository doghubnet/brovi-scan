import { ClipboardCheck, FileText, FolderKanban, Landmark, ListTodo, MessageSquare, PieChart, ShieldCheck, UserCheck, UserCog } from "lucide-react";

export const DISCLAIMER = "Brovi Scan provides preparation guidance only. The readiness score is not a guarantee of admission, visa, or scholarship outcomes. Final decisions are made by universities, embassies, consulates, immigration authorities, and scholarship providers.";
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
  ["Program Match Scan", "Compare academic background, budget, language level, target country, and career goal to find safer program directions."],
  ["Document Scan", "Review passport, transcripts, certificates, CV, motivation letter, sponsor files, translations, legalization, and missing items."],
  ["Bank Statement Scan", "Check financial preparation, source of funds, sponsor relation, statement period, large deposits, and budget coverage."],
  ["Interview Practice", "Practice real embassy-style questions and improve answers for clarity, honesty, study plan, finance explanation, and return plan."],
  ["Readiness Report", "Combine program, document, finance, and interview scores into one report with strengths, risks, and next steps."],
  ["Recommendation Roadmap", "Turn weak areas into tasks, deadlines, priorities, and consultant review requests."],
] as const;
export const interviewQuestions = ["Why did you choose this country for study?","Why did you choose this university?","Why is this program the right fit for your career plan?","Who is sponsoring your studies?","How will tuition and living costs be covered?","Explain any large deposit in your statements.","What will you do after graduation?","Why not continue study in your home country?","Do you have relatives in the destination country?","What will you do if your visa is refused?","Explain your academic gap if any.","Explain low grades if applicable.","How can the visa officer verify your source of funds?","What do you know about your course modules?","How does this course connect to your future role?"];
export const documentStatuses = ["Available", "Missing", "Needs Translation", "Needs Legalization", "Expired", "Unclear", "Ready"];
export const currencies = ["USD", "EUR", "GBP", "CAD", "AUD", "NGN", "GHS", "KES", "INR", "Other"];
export const difficultyLevels = ["Beginner", "Normal", "Strict"];
