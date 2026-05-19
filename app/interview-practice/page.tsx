import { DashboardShell } from "@/components/layout/DashboardShell";
import { InterviewPracticeClient } from "@/components/forms/InterviewPracticeClient";
import { InterviewQuestionCard } from "@/components/forms/InterviewQuestionCard";
import { interviewQuestions } from "@/lib/constants/copy";

export const dynamic = "force-dynamic";

export default function Page() {
  return <DashboardShell><h1 className="section-title">Interview Practice Scan</h1><div className="grid gap-4 md:grid-cols-2">{interviewQuestions.slice(0, 2).map((question, index) => <InterviewQuestionCard key={question} question={question} index={index} />)}</div><div className="card"><h2 className="text-xl font-bold">Interview quality dimensions</h2><p className="mt-2 muted">Feedback dimensions: clarity, specificity, consistency, honest explanation, financial clarity, program knowledge, and future plan. Question groups include study plan, university choice, program choice, sponsor and finance, academic background, future plan, refusal or gap explanation, country knowledge, and return plan.</p></div><InterviewPracticeClient /></DashboardShell>;
}
