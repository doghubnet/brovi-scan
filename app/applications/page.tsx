import { DashboardShell } from "@/components/layout/DashboardShell";
import { ApplicationsBoard } from "@/components/inventory/ApplicationsBoard";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage() {
  if (!isSupabaseConfigured) return <DashboardShell><h1 className="section-title">Applications</h1><EmptyState title="Applications" description="Application tracking will be available after BROVI database connection is configured." /></DashboardShell>;
  const supabase = await createServerSupabaseClient();
  const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  if (!data.user) return <DashboardShell><h1 className="section-title">Applications</h1><EmptyState title="Sign in required" description="Sign in to manage your university and program applications." /><ButtonLink href="/login">Sign in</ButtonLink></DashboardShell>;
  return <DashboardShell><h1 className="section-title">Application Tracker</h1><p className="muted">Manage university and program applications like an applicant inventory board with statuses, deadlines, priority, fees, scholarship notes, and portal reminders.</p><ApplicationsBoard /></DashboardShell>;
}
