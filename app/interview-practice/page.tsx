import { DashboardShell } from "@/components/layout/DashboardShell";
import { InterviewPracticeClient } from "@/components/forms/InterviewPracticeClient";
import { InterviewQuestionCard } from "@/components/forms/InterviewQuestionCard";
import { interviewQuestions } from "@/lib/constants/copy";

export const dynamic = "force-dynamic";

export default function Page() {
  return <DashboardShell><h1 className="section-title">Interview Practice Scan</h1><div className="grid gap-4 md:grid-cols-2">{interviewQuestions.slice(0, 2).map((question, index) => <InterviewQuestionCard key={question} question={question} index={index} />)}</div><div className="card"><h2 className="text-xl font-bold">Common weak answers</h2><p className="mt-2 muted">Avoid vague, memorized, inconsistent, exaggerated, or financially unclear answers. Be truthful and specific.</p></div><InterviewPracticeClient /></DashboardShell>;
}
