import { DashboardShell } from "@/components/layout/DashboardShell";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const supabase = await createServerSupabaseClient();
  const auth = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  if (!auth.data.user) return <DashboardShell><EmptyState title="Sign in required" description="Sign in to view your saved Brovi Scan dashboard." /><ButtonLink href="/login">Sign in</ButtonLink></DashboardShell>;

  return <DashboardShell><h1 className="section-title">Welcome to Brovi Scan</h1><p className="muted">Live saved records will appear here after database tables are connected.</p><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"><div className="card"><h2 className="font-bold">Program Match</h2><p className="muted">Start with program-fit and readiness alignment.</p><ButtonLink href="/program-match-scan">Open</ButtonLink></div><div className="card"><h2 className="font-bold">Document Scan</h2><p className="muted">Track document status, gaps, and verification notes.</p><ButtonLink href="/document-scan">Open</ButtonLink></div><div className="card"><h2 className="font-bold">Bank Statement</h2><p className="muted">Review financial readiness and red flags.</p><ButtonLink href="/bank-statement-scan">Open</ButtonLink></div><div className="card"><h2 className="font-bold">Interview</h2><p className="muted">Practice answers with readiness feedback.</p><ButtonLink href="/interview-practice">Open</ButtonLink></div><div className="card"><h2 className="font-bold">Readiness Report</h2><p className="muted">Combine modules into one action plan.</p><ButtonLink href="/readiness-report">Open</ButtonLink></div><div className="card"><h2 className="font-bold">Recent activity</h2><p className="muted">Your latest scan history will appear here.</p></div></div></DashboardShell>;
}
