import { createFileRoute, Link } from "@tanstack/react-router";
import { ScoreCard, ScoreRing } from "@/components/Score";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Button } from "@/components/ui/button";
import { loadJSON, STORAGE_KEYS } from "@/lib/storage";
import { finalReport } from "@/lib/scoring";
import { CheckCircle2, Circle, ArrowRight, GraduationCap, FileCheck2, Wallet, MessageSquareQuote } from "lucide-react";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Dashboard — Brovi Scan" }] }),
  component: Dashboard,
});

function Dashboard() {
  const profile = loadJSON<{ fullName?: string }>(STORAGE_KEYS.profile, {});
  const program = loadJSON<{ score?: number }>(STORAGE_KEYS.program, {});
  const doc = loadJSON<{ score?: number }>(STORAGE_KEYS.document, {});
  const fin = loadJSON<{ score?: number }>(STORAGE_KEYS.financial, {});
  const itv = loadJSON<{ score?: number }>(STORAGE_KEYS.interview, {});
  const any = program.score || doc.score || fin.score || itv.score;
  const { overall, risk } = finalReport({ program: program.score, document: doc.score, financial: fin.score, interview: itv.score });

  const checklist = [
    { ok: !!profile.fullName, label: "Complete profile", to: "/app/profile" },
    { ok: !!program.score, label: "Run program match scan", to: "/app/program-match" },
    { ok: !!doc.score, label: "Complete document checklist", to: "/app/documents" },
    { ok: !!fin.score, label: "Complete financial readiness scan", to: "/app/bank" },
    { ok: !!itv.score, label: "Practice interview", to: "/app/interview" },
    { ok: !!any, label: "Generate final report", to: "/app/report" },
  ];
  const nextAction = checklist.find((c) => !c.ok);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-card p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Welcome{profile.fullName ? `, ${profile.fullName}` : ""}</p>
          <h1 className="text-2xl font-semibold">Your study visa readiness</h1>
          <p className="text-sm text-muted-foreground mt-1">Run scans, fix gaps, and generate your readiness report.</p>
        </div>
        <div className="flex items-center gap-4">
          <ScoreRing value={overall} />
          <div>
            <p className="text-sm text-muted-foreground">Overall</p>
            <p className="text-lg font-semibold">{risk}</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Link to="/app/program-match"><ScoreCard title="Program match" score={program.score ?? 0} icon={<GraduationCap className="h-4 w-4" />} /></Link>
        <Link to="/app/documents"><ScoreCard title="Documents" score={doc.score ?? 0} icon={<FileCheck2 className="h-4 w-4" />} /></Link>
        <Link to="/app/bank"><ScoreCard title="Financial" score={fin.score ?? 0} icon={<Wallet className="h-4 w-4" />} /></Link>
        <Link to="/app/interview"><ScoreCard title="Interview" score={itv.score ?? 0} icon={<MessageSquareQuote className="h-4 w-4" />} /></Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-card p-5">
          <h2 className="font-semibold mb-3">{any ? "Missing actions" : "Onboarding checklist"}</h2>
          <ul className="space-y-2">
            {checklist.map((c) => (
              <li key={c.label}>
                <Link to={c.to} className="flex items-center justify-between gap-2 p-2 rounded-md hover:bg-secondary/60">
                  <span className="flex items-center gap-2 text-sm">
                    {c.ok ? <CheckCircle2 className="h-4 w-4 text-success" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
                    {c.label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border bg-card p-5 flex flex-col">
          <h2 className="font-semibold">Recommended next action</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {nextAction ? nextAction.label : "Re-scan to keep your readiness fresh."}
          </p>
          <div className="mt-auto pt-4">
            <Button asChild><Link to={nextAction?.to ?? "/app/report"}>Continue <ArrowRight className="h-4 w-4 ml-1" /></Link></Button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h2 className="font-semibold mb-3">Recent scans</h2>
        {any ? (
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {program.score ? <Item label="Program Match" score={program.score} to="/app/program-match" /> : null}
            {doc.score ? <Item label="Documents" score={doc.score} to="/app/documents" /> : null}
            {fin.score ? <Item label="Financial" score={fin.score} to="/app/bank" /> : null}
            {itv.score ? <Item label="Interview" score={itv.score} to="/app/interview" /> : null}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No scans yet. Start with the program match scan.</p>
        )}
      </div>

      <DisclaimerBanner />
    </div>
  );
}

function Item({ label, score, to }: { label: string; score: number; to: string }) {
  return (
    <Link to={to} className="flex items-center justify-between rounded-md border p-3 hover:bg-secondary/60">
      <span>{label}</span>
      <span className="font-medium">{score}/100</span>
    </Link>
  );
}