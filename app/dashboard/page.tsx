import { DashboardShell } from "@/components/layout/DashboardShell";
import { ReportPreview } from "@/components/reports/ReportPreview";
import { ScoreCard } from "@/components/scores/ScoreCard";
import { ScoreRing } from "@/components/scores/ScoreRing";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { riskLevel } from "@/lib/scoring";
import { createServerSupabaseClient } from "@/lib/supabase/server";

async function latestScore(table: string, userId: string) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;
  const { data } = await supabase.from(table).select("score").eq("user_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle();
  return typeof data?.score === "number" ? data.score : null;
}

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return <DashboardShell><EmptyState title="Dashboard" description="Your dashboard will be available after BROVI database connection is configured." /></DashboardShell>;
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return <DashboardShell><EmptyState title="Sign in required" description="Sign in to view your saved Brovi Scan dashboard." /><ButtonLink href="/login">Sign in</ButtonLink></DashboardShell>;
  const [program, documents, financial, interview] = await Promise.all([latestScore("program_profiles", auth.user.id), latestScore("document_reviews", auth.user.id), latestScore("financial_reviews", auth.user.id), latestScore("interview_sessions", auth.user.id)]);
  const completed = [program, documents, financial, interview].filter((score): score is number => typeof score === "number");
  const overall = completed.length ? Math.round(completed.reduce((sum, score) => sum + score, 0) / completed.length) : null;
  return <DashboardShell><h1 className="section-title">Welcome to Brovi Scan</h1>{overall === null ? <div className="space-y-4"><EmptyState title="No scan completed yet" description="Start with Program Match Scan to build your readiness report." /><ButtonLink href="/program-match-scan">Start Program Match Scan</ButtonLink></div> : <><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><ScoreCard title="Program Match Score" score={program ?? 0} detail={program === null ? "Not completed" : "Saved"} /><ScoreCard title="Document Scan Score" score={documents ?? 0} detail={documents === null ? "Not completed" : "Saved"} /><ScoreCard title="Financial Scan Score" score={financial ?? 0} detail={financial === null ? "Not completed" : "Saved"} /><ScoreCard title="Interview Readiness Score" score={interview ?? 0} detail={interview === null ? "Not completed" : "Saved"} /></div><div className="grid gap-6 lg:grid-cols-[320px_1fr]"><div className="card"><ScoreRing score={overall} label="Overall Readiness Score" /><p className="mt-4 text-center muted">Current level: {riskLevel(overall)}</p></div><ReportPreview score={overall} /></div></>}</DashboardShell>;
}
