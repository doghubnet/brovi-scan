import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ScoreRing, RiskBadge, ScoreBarChart } from "@/components/Score";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { loadJSON, saveJSON, STORAGE_KEYS } from "@/lib/storage";
import { finalReport } from "@/lib/scoring";
import { toast } from "sonner";
import { Printer, Copy, Users2, Share2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/report")({
  head: () => ({ meta: [{ title: "Readiness Report — Brovi Scan" }] }),
  validateSearch: (s: Record<string, unknown>) => ({ sample: typeof s.sample === "string" ? s.sample : undefined }),
  component: ReportPage,
});

const SAMPLE = {
  profile: { fullName: "Aisha Demir", targetCountry: "Italy", program: "MSc Computer Engineering" },
  program: { score: 82, weaknesses: ["Add a backup university", "Confirm intake deadline"] },
  document: { score: 71, missing: ["Police clearance"], translation: ["Transcript"] },
  financial: { score: 74, gap: 1500, missing: ["Sponsor business proof"] },
  interview: { score: 85, weak: ["Add a clear return plan"] },
};

function ReportPage() {
  const { sample } = useSearch({ from: "/app/report" });
  const useSample = sample === "1";

  const profile = useSample ? SAMPLE.profile : loadJSON<any>(STORAGE_KEYS.profile, {});
  const program = useSample ? SAMPLE.program : loadJSON<any>(STORAGE_KEYS.program, {});
  const doc = useSample ? SAMPLE.document : loadJSON<any>(STORAGE_KEYS.document, {});
  const fin = useSample ? SAMPLE.financial : loadJSON<any>(STORAGE_KEYS.financial, {});
  const itv = useSample ? SAMPLE.interview : loadJSON<any>(STORAGE_KEYS.interview, {});

  const { overall, risk } = finalReport({ program: program.score, document: doc.score, financial: fin.score, interview: itv.score });

  const actionPlan = [
    ...(program.result?.actionPlan ?? program.weaknesses ?? []),
    ...(doc.result?.actionPlan ?? doc.missing ?? []),
    ...(fin.result?.nextSteps ?? fin.missing ?? []),
    ...(itv.result?.weak ?? itv.weak ?? []),
  ].slice(0, 8);

  const [shareLink, setShareLink] = useState<string | null>(null);

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text).then(() => toast.success("Copied to clipboard")).catch(() => toast.error("Copy failed"));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 no-print">
        <div>
          <h1 className="text-2xl font-semibold">Readiness Report{useSample && <span className="ml-2 text-sm text-muted-foreground">(sample)</span>}</h1>
          <p className="text-sm text-muted-foreground">Combined view of all scans, weighted 25% each.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}><Printer className="h-4 w-4 mr-1" />Print / Save PDF</Button>
          <Button variant="outline" size="sm" onClick={() => copy(actionPlan.join("\n• "))}><Copy className="h-4 w-4 mr-1" />Copy action plan</Button>
          <Button variant="outline" size="sm" onClick={() => {
            const link = `${typeof window !== "undefined" ? window.location.origin : ""}/share/brovi-${Math.random().toString(36).slice(2, 8)}`;
            setShareLink(link);
            saveJSON(STORAGE_KEYS.report, { overall, link });
            copy(link);
          }}><Share2 className="h-4 w-4 mr-1" />Share link</Button>
          <Button asChild size="sm"><Link to="/app/consultant"><Users2 className="h-4 w-4 mr-1" />Request BROVI Consultant Review</Link></Button>
        </div>
      </div>

      {shareLink && (
        <div className="rounded-md border bg-secondary/40 p-3 text-sm flex items-center justify-between gap-2 no-print">
          <span className="truncate">Preview share link: <code className="text-primary">{shareLink}</code></span>
          <Button size="sm" variant="ghost" onClick={() => copy(shareLink)}>Copy</Button>
        </div>
      )}

      <div className="rounded-xl border bg-card p-6 grid md:grid-cols-[auto_1fr] gap-6">
        <ScoreRing value={overall} />
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Applicant</div>
          <div className="font-semibold">{profile.fullName || "—"} {profile.targetCountry && <span className="text-muted-foreground font-normal">→ {profile.targetCountry}</span>}</div>
          <div className="flex items-center gap-2"><RiskBadge score={overall} /><span className="text-sm text-muted-foreground">{risk}</span></div>
          <p className="text-sm text-muted-foreground mt-2">Final scores are weighted equally across program, documents, financial, and interview readiness.</p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h2 className="font-semibold mb-3">Module breakdown</h2>
        <ScoreBarChart data={[
          { name: "Program match", score: program.score ?? 0 },
          { name: "Documents", score: doc.score ?? 0 },
          { name: "Financial", score: fin.score ?? 0 },
          { name: "Interview", score: itv.score ?? 0 },
        ]} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Analysis title="Program match analysis" score={program.score ?? 0} items={program.result?.weaknesses ?? program.weaknesses ?? []} />
        <Analysis title="Document readiness analysis" score={doc.score ?? 0} items={[...(doc.result?.missing ?? doc.missing ?? []), ...(doc.result?.translation ?? doc.translation ?? [])]} />
        <Analysis title="Financial readiness analysis" score={fin.score ?? 0} items={fin.result?.missing ?? fin.missing ?? []} />
        <Analysis title="Interview readiness analysis" score={itv.score ?? 0} items={itv.result?.weak ?? itv.weak ?? []} />
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h2 className="font-semibold mb-3">Recommended action plan</h2>
        {actionPlan.length === 0 ? (
          <p className="text-sm text-muted-foreground">Run scans to generate your personalized action plan.</p>
        ) : (
          <ol className="space-y-2 text-sm">
            {actionPlan.map((s, i) => (
              <li key={s + i} className="flex items-start gap-2"><span className="h-5 w-5 rounded-full bg-primary/10 text-primary text-xs grid place-items-center shrink-0">{i + 1}</span>{s}</li>
            ))}
          </ol>
        )}
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h2 className="font-semibold mb-2">Suggested timeline</h2>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li><strong className="text-foreground">Week 1–2:</strong> Fix critical missing documents and translations.</li>
          <li><strong className="text-foreground">Week 3:</strong> Refine financial preparation and source-of-funds note.</li>
          <li><strong className="text-foreground">Week 4:</strong> Practice 10–15 interview answers in strict mode.</li>
          <li><strong className="text-foreground">Week 5:</strong> Re-scan and request consultant review.</li>
        </ul>
      </div>

      <DisclaimerBanner />
    </div>
  );
}

function Analysis({ title, score, items }: { title: string; score: number; items: string[] }) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{title}</h3>
        <span className="text-sm">{score}/100</span>
      </div>
      {items.length ? (
        <ul className="text-sm text-muted-foreground space-y-1">
          {items.slice(0, 5).map((s, i) => <li key={s + i} className="flex gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary mt-2" />{s}</li>)}
        </ul>
      ) : <p className="text-sm text-muted-foreground">No issues detected for this module.</p>}
    </div>
  );
}