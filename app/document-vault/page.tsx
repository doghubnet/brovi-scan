import { DashboardShell } from "@/components/layout/DashboardShell";
import { DocumentVaultClient } from "@/components/inventory/DocumentVaultClient";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { isSupabaseConfigured } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DocumentVaultPage() {
  if (!isSupabaseConfigured) return <DashboardShell><h1 className="section-title">Document Vault</h1><EmptyState title="Document Vault" description="Document vault will be available after BROVI database connection is configured." /></DashboardShell>;
  const supabase = await createServerSupabaseClient();
  const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  if (!data.user) return <DashboardShell><h1 className="section-title">Document Vault</h1><EmptyState title="Sign in required" description="Sign in to manage private document records." /><ButtonLink href="/login">Sign in</ButtonLink></DashboardShell>;
  return <DashboardShell><h1 className="section-title">Document Vault</h1><p className="muted">Track required documents across identity, academic, financial, admission, visa, sponsor, and other categories.</p><DocumentVaultClient /></DashboardShell>;
}
