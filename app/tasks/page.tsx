import { DashboardShell } from "@/components/layout/DashboardShell";
import { TasksClient } from "@/components/inventory/TasksClient";

export default function TasksPage() {
  return <DashboardShell><h1 className="section-title">Task Roadmap</h1><p className="muted">Turn Brovi Scan recommendations into deadlines, priorities, and clear preparation actions.</p><TasksClient /></DashboardShell>;
}
