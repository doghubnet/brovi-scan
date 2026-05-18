import { DashboardShell } from "@/components/layout/DashboardShell";
import { ConsultantReviewForm } from "@/components/inventory/ConsultantReviewForm";

export default function ConsultantReviewPage() {
  return <DashboardShell><h1 className="section-title">Consultant Review Requests</h1><p className="muted">Request BROVI human review for your file after using AI preparation scans.</p><ConsultantReviewForm /></DashboardShell>;
}
