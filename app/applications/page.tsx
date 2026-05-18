import { DashboardShell } from "@/components/layout/DashboardShell";
import { ApplicationsBoard } from "@/components/inventory/ApplicationsBoard";

export default function ApplicationsPage() {
  return <DashboardShell><h1 className="section-title">Application Tracker</h1><p className="muted">Manage university and program applications like an applicant inventory board with statuses, deadlines, priority, fees, scholarship notes, and portal reminders.</p><ApplicationsBoard /></DashboardShell>;
}
