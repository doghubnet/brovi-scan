import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { loadJSON, saveJSON, STORAGE_KEYS } from "@/lib/storage";
import { scoreFinancial, type FinancialInput } from "@/lib/scoring";
import { useState } from "react";
import { toast } from "sonner";
import { ScoreRing, RiskBadge } from "@/components/Score";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/app/bank")({
  head: () => ({ meta: [{ title: "Bank Statement Scan — Brovi Scan" }] }),
  component: BankPage,
});

function BankPage() {
  const initial = loadJSON<FinancialInput & { score?: number; result?: ReturnType<typeof scoreFinancial> }>(STORAGE_KEYS.financial, {} as FinancialInput);
  const [data, setData] = useState<FinancialInput>(initial);
  const [result, setResult] = useState(initial.result ?? null);
  const set = <K extends keyof FinancialInput>(k: K, v: FinancialInput[K]) => setData((d) => ({ ...d, [k]: v }));
  const num = (v: string) => (v === "" ? undefined : Number(v));

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        const r = scoreFinancial(data);
        setResult(r);
        saveJSON(STORAGE_KEYS.financial, { ...data, score: r.score, result: r });
        toast.success(`Financial readiness: ${r.score}/100`);
      }}
    >
      <header>
        <h1 className="text-2xl font-semibold">Bank Statement Scan</h1>
        <p className="text-sm text-muted-foreground">Safe financial preparation review — no banking credentials required.</p>
      </header>
      <div className="flex items-start gap-2 rounded-md border border-risk/30 bg-risk/5 p-3 text-sm">
        <ShieldAlert className="h-4 w-4 text-risk mt-0.5 shrink-0" />
        <p>Never enter bank passwords, card numbers, CVV, online banking login, or private account access. Brovi Scan only reviews safe preparation details.</p>
      </div>

      <div className="rounded-xl border bg-card p-5 grid sm:grid-cols-2 gap-4">
        <Field label="Sponsor name"><Input value={data.sponsorName ?? ""} onChange={(e) => set("sponsorName", e.target.value)} /></Field>
        <Field label="Sponsor relation"><Input value={data.sponsorRelation ?? ""} onChange={(e) => set("sponsorRelation", e.target.value)} /></Field>
        <Field label="Bank name"><Input value={data.bankName ?? ""} onChange={(e) => set("bankName", e.target.value)} /></Field>
        <Field label="Statement period"><Input placeholder="e.g. Jan–Jun 2026" value={data.statementPeriod ?? ""} onChange={(e) => set("statementPeriod", e.target.value)} /></Field>
        <Field label="Currency"><Input value={data.currency ?? ""} onChange={(e) => set("currency", e.target.value)} placeholder="EUR" /></Field>
        <Field label="Opening balance"><Input type="number" value={data.openingBalance ?? ""} onChange={(e) => set("openingBalance", num(e.target.value))} /></Field>
        <Field label="Closing balance"><Input type="number" value={data.closingBalance ?? ""} onChange={(e) => set("closingBalance", num(e.target.value))} /></Field>
        <Field label="Average balance"><Input type="number" value={data.averageBalance ?? ""} onChange={(e) => set("averageBalance", num(e.target.value))} /></Field>
        <Field label="Tuition fee amount"><Input type="number" value={data.tuitionFee ?? ""} onChange={(e) => set("tuitionFee", num(e.target.value))} /></Field>
        <Field label="Living cost amount"><Input type="number" value={data.livingCost ?? ""} onChange={(e) => set("livingCost", num(e.target.value))} /></Field>
        <Field label="Monthly income estimate"><Input type="number" value={data.monthlyIncome ?? ""} onChange={(e) => set("monthlyIncome", num(e.target.value))} /></Field>
        <Field label="Monthly expenses estimate"><Input type="number" value={data.monthlyExpenses ?? ""} onChange={(e) => set("monthlyExpenses", num(e.target.value))} /></Field>
        <Field label="Large deposit notes" full><Textarea rows={2} value={data.largeDepositNotes ?? ""} onChange={(e) => set("largeDepositNotes", e.target.value)} /></Field>
        <Field label="Source of funds explanation" full><Textarea rows={3} value={data.sourceOfFunds ?? ""} onChange={(e) => set("sourceOfFunds", e.target.value)} /></Field>
        <Field label="Sponsor job proof status"><YesNoSelect value={data.sponsorJobProof} onChange={(v) => set("sponsorJobProof", v)} /></Field>
        <Field label="Sponsor business proof status"><YesNoSelect value={data.sponsorBusinessProof} onChange={(v) => set("sponsorBusinessProof", v)} /></Field>
        <Field label="Accommodation proof"><YesNoSelect value={data.accommodationProof} onChange={(v) => set("accommodationProof", v)} /></Field>
        <Field label="Family support explanation" full><Textarea rows={2} value={data.familySupport ?? ""} onChange={(e) => set("familySupport", e.target.value)} /></Field>
        <Field label="Country-specific notes" full><Textarea rows={2} value={data.countryNotes ?? ""} onChange={(e) => set("countryNotes", e.target.value)} /></Field>
        <div className="sm:col-span-2"><Button type="submit">Run financial scan</Button></div>
      </div>

      {result && (
        <div className="rounded-xl border bg-card p-5 grid md:grid-cols-[auto_1fr] gap-5 brovi-fade-up">
          <div className="flex flex-col items-center gap-2">
            <ScoreRing value={result.score} />
            <RiskBadge score={result.score} />
          </div>
          <div className="space-y-3 text-sm">
            <Row label="Funding gap estimate" value={result.gap ? `${result.gap.toLocaleString()} ${data.currency ?? ""}` : "None"} />
            <Row label="Balance consistency" value={result.consistency} />
            <Row label="Large deposit explanation" value={result.depositQuality} />
            <Row label="Sponsor relationship clarity" value={result.sponsorClarity} />
            <Row label="Source of funds clarity" value={result.sourceClarity} />
            {result.missing.length > 0 && (
              <div>
                <p className="font-medium">Missing financial evidence</p>
                <ul className="mt-1 list-disc list-inside text-muted-foreground">{result.missing.map((m) => <li key={m}>{m}</li>)}</ul>
              </div>
            )}
            <div>
              <p className="font-medium">Safe next steps</p>
              <ol className="mt-1 space-y-1 text-muted-foreground">
                {result.nextSteps.map((s, i) => <li key={s} className="flex gap-2"><span className="h-5 w-5 rounded-full bg-primary/10 text-primary text-xs grid place-items-center">{i + 1}</span>{s}</li>)}
              </ol>
            </div>
            <DisclaimerBanner />
          </div>
        </div>
      )}
    </form>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return <div className={`space-y-1.5 ${full ? "sm:col-span-2" : ""}`}><Label>{label}</Label>{children}</div>;
}
function YesNoSelect({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
  return (
    <Select value={value ?? ""} onValueChange={onChange}>
      <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
      <SelectContent>
        <SelectItem value="available">Available</SelectItem>
        <SelectItem value="missing">Missing</SelectItem>
        <SelectItem value="unclear">Unclear</SelectItem>
      </SelectContent>
    </Select>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-3 border-b py-1.5 last:border-b-0"><span className="text-muted-foreground">{label}</span><span className="font-medium text-right">{value}</span></div>;
}