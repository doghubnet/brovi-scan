import { DashboardShell } from "@/components/layout/DashboardShell";
import { ReadinessReportActions } from "@/components/reports/ReadinessReportActions";
import { ReportPreview } from "@/components/reports/ReportPreview";
import { ScoreBarChart } from "@/components/reports/ScoreBarChart";
import { ScoreCard } from "@/components/scores/ScoreCard";
import { scores } from "@/lib/constants/copy";

const moduleScores = [
  { name: "Program", score: scores.program },
  { name: "Docs", score: scores.documents },
  { name: "Finance", score: scores.financial },
  { name: "Interview", score: scores.interview },
];

export default function Page() {
  return (
    <DashboardShell>
      <h1 className="section-title">Brovi Scan Readiness Report</h1>
      <ReportPreview score={scores.overall} />
      <div className="grid gap-4 md:grid-cols-4">
        <ScoreCard title="Program Match" score={scores.program} detail="25% weight" />
        <ScoreCard title="Document Scan" score={scores.documents} detail="25% weight" />
        <ScoreCard title="Financial Scan" score={scores.financial} detail="25% weight" />
        <ScoreCard title="Interview" score={scores.interview} detail="25% weight" />
      </div>
      <div className="card">
        <h2 className="text-xl font-bold">Module score chart</h2>
        <div className="mt-4">
          <ScoreBarChart data={moduleScores} />
        </div>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold">Report actions</h2>
        <ReadinessReportActions />
        <p className="mt-4 muted">
          Estimated preparation timeline: 2–6 weeks depending on document corrections and interview practice needs.
        </p>
      </div>
    </DashboardShell>
  );
}
