import { DashboardShell } from "@/components/layout/DashboardShell";
import { ButtonLink } from "@/components/ui/button";

export default function FreePlan() {
  return <DashboardShell><h1 className="section-title">Free Plan</h1><div className="card"><ul className="space-y-3 muted"><li>• 1 full readiness report</li><li>• 10 interview practice questions</li><li>• 1 program match scan</li><li>• 1 basic document checklist</li><li>• Upgrade options will be announced by BROVI.</li></ul><ButtonLink className="mt-6" href="/consultant-review">Request BROVI Consultant Review</ButtonLink></div></DashboardShell>;
}
