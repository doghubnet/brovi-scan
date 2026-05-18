import { DashboardShell } from "@/components/layout/DashboardShell";
import { TasksClient } from "@/components/inventory/TasksClient";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  if (!isSupabaseConfigured) return <DashboardShell><h1 className="section-title">Task Roadmap</h1><EmptyState title="Task Roadmap" description="Task management will be available after BROVI database connection is configured." /></DashboardShell>;
  const supabase = await createServerSupabaseClient();
  const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  if (!data.user) return <DashboardShell><h1 className="section-title">Task Roadmap</h1><EmptyState title="Sign in required" description="Sign in to manage your preparation tasks." /><ButtonLink href="/login">Sign in</ButtonLink></DashboardShell>;
  return <DashboardShell><h1 className="section-title">Task Roadmap</h1><p className="muted">Turn Brovi Scan recommendations into deadlines, priorities, and clear preparation actions.</p><TasksClient /></DashboardShell>;
}
