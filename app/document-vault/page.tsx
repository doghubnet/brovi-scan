import { DashboardShell } from "@/components/layout/DashboardShell";
import { DocumentVaultClient } from "@/components/inventory/DocumentVaultClient";

export default function DocumentVaultPage() {
  return <DashboardShell><h1 className="section-title">Document Vault</h1><p className="muted">Track required documents across identity, academic, financial, admission, visa, sponsor, and other categories.</p><DocumentVaultClient /></DashboardShell>;
}
