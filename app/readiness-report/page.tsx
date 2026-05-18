import { DashboardShell } from "@/components/layout/DashboardShell";
import { ReadinessReportActions } from "@/components/reports/ReadinessReportActions";
import { ReportPreview } from "@/components/reports/ReportPreview";
import { ScoreBarChart } from "@/components/reports/ScoreBarChart";
import { ScoreCard } from "@/components/scores/ScoreCard";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { createServerSupabaseClient } from "@/lib/supabase/server";

async function latestScore(table: string, userId: string) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;
  const { data } = await supabase.from(table).select("score").eq("user_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle();
  return typeof data?.score === "number" ? data.score : null;
}

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return <DashboardShell><h1 className="section-title">Brovi Scan Readiness Report</h1><EmptyState title="Readiness Report" description="Readiness reports will be available after BROVI database connection is configured." /></DashboardShell>;
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return <DashboardShell><EmptyState title="Sign in required" description="Sign in to generate your readiness report from saved scans." /><ButtonLink href="/login">Sign in</ButtonLink></DashboardShell>;
  const [program, documents, financial, interview] = await Promise.all([latestScore("program_profiles", auth.user.id), latestScore("document_reviews", auth.user.id), latestScore("financial_reviews", auth.user.id), latestScore("interview_sessions", auth.user.id)]);
  const completed = [program, documents, financial, interview].filter((score): score is number => typeof score === "number");
  if (!completed.length) return <DashboardShell><h1 className="section-title">Brovi Scan Readiness Report</h1><EmptyState title="No completed scans yet" description="Complete at least one scan before generating your readiness report." /><ButtonLink href="/program-match-scan">Start Free Scan</ButtonLink></DashboardShell>;
  const overall = Math.round(completed.reduce((sum, score) => sum + score, 0) / completed.length);
  const moduleScores = [{ name: "Program", score: program ?? 0 }, { name: "Docs", score: documents ?? 0 }, { name: "Finance", score: financial ?? 0 }, { name: "Interview", score: interview ?? 0 }];
  return <DashboardShell><h1 className="section-title">Brovi Scan Readiness Report</h1><ReportPreview score={overall} /><div className="grid gap-4 md:grid-cols-4"><ScoreCard title="Program Match" score={program ?? 0} detail="25% weight" /><ScoreCard title="Document Scan" score={documents ?? 0} detail="25% weight" /><ScoreCard title="Financial Scan" score={financial ?? 0} detail="25% weight" /><ScoreCard title="Interview" score={interview ?? 0} detail="25% weight" /></div><div className="card"><h2 className="text-xl font-bold">Module score chart</h2><div className="mt-4"><ScoreBarChart data={moduleScores} /></div></div><div className="card"><h2 className="text-xl font-bold">Report actions</h2><ReadinessReportActions programScore={program} documentScore={documents} financialScore={financial} interviewScore={interview} overallScore={overall} /><p className="mt-4 muted">Estimated preparation timeline: 2–6 weeks depending on document corrections and interview practice needs.</p></div></DashboardShell>;
}
