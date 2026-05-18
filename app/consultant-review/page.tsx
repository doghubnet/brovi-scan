import { DashboardShell } from "@/components/layout/DashboardShell";
import { ConsultantReviewForm } from "@/components/inventory/ConsultantReviewForm";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ConsultantReviewPage() {
  if (!isSupabaseConfigured) return <DashboardShell><h1 className="section-title">Consultant Review Requests</h1><EmptyState title="Consultant Review" description="Consultant review requests will be available after BROVI database connection is configured." /></DashboardShell>;
  const supabase = await createServerSupabaseClient();
  const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  if (!data.user) return <DashboardShell><h1 className="section-title">Consultant Review Requests</h1><EmptyState title="Sign in required" description="Sign in to request a BROVI consultant review." /><ButtonLink href="/login">Sign in</ButtonLink></DashboardShell>;
  return <DashboardShell><h1 className="section-title">Consultant Review Requests</h1><p className="muted">Request BROVI human review for your file after using AI preparation scans.</p><ConsultantReviewForm /></DashboardShell>;
}
