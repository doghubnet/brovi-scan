import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { loadJSON, saveJSON, STORAGE_KEYS } from "@/lib/storage";
import { scoreProgram, type ProgramScanInput } from "@/lib/scoring";
import { useState } from "react";
import { toast } from "sonner";
import { ScoreRing, RiskBadge } from "@/components/Score";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/app/program-match")({
  head: () => ({ meta: [{ title: "Program Match Scan — Brovi Scan" }] }),
  component: ProgramMatchPage,
});

function ProgramMatchPage() {
  const [data, setData] = useState<ProgramScanInput>(() => loadJSON(STORAGE_KEYS.program, {} as ProgramScanInput & { score?: number; result?: ReturnType<typeof scoreProgram> }));
  const [result, setResult] = useState<ReturnType<typeof scoreProgram> | null>((data as any).result ?? null);
  const set = <K extends keyof ProgramScanInput>(k: K, v: ProgramScanInput[K]) => setData((d) => ({ ...d, [k]: v }));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Program Match Scan</h1>
        <p className="text-sm text-muted-foreground">Check whether your target country, program, and background align.</p>
      </header>
      <DisclaimerBanner compact />
      <form
        className="rounded-xl border bg-card p-5 grid sm:grid-cols-2 gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const r = scoreProgram(data);
          setResult(r);
          saveJSON(STORAGE_KEYS.program, { ...data, score: r.score, result: r });
          toast.success(`Program match score: ${r.score}/100`);
        }}
      >
        <Field label="Full name"><Input value={data.fullName ?? ""} onChange={(e) => set("fullName", e.target.value)} /></Field>
        <Field label="Country of origin"><Input value={data.originCountry ?? ""} onChange={(e) => set("originCountry", e.target.value)} /></Field>
        <Field label="Education level">
          <SimpleSelect value={data.educationLevel ?? ""} onChange={(v) => set("educationLevel", v)} options={["High school","Bachelor","Master","PhD"]} />
        </Field>
        <Field label="Field of study"><Input value={data.fieldOfStudy ?? ""} onChange={(e) => set("fieldOfStudy", e.target.value)} /></Field>
        <Field label="Target country"><Input value={data.targetCountry ?? ""} onChange={(e) => set("targetCountry", e.target.value)} /></Field>
        <Field label="Preferred program"><Input value={data.preferredProgram ?? ""} onChange={(e) => set("preferredProgram", e.target.value)} /></Field>
        <Field label="Preferred degree level">
          <SimpleSelect value={data.degreeLevel ?? ""} onChange={(v) => set("degreeLevel", v)} options={["Bachelor","Master","PhD"]} />
        </Field>
        <Field label="GPA / average"><Input value={data.gpa ?? ""} onChange={(e) => set("gpa", e.target.value)} /></Field>
        <Field label="English level">
          <SimpleSelect value={data.englishLevel ?? ""} onChange={(v) => set("englishLevel", v)} options={["A2","B1","B2","C1","C2","IELTS 6.0","IELTS 6.5","IELTS 7+"]} />
        </Field>
        <Field label="Budget range">
          <SimpleSelect value={data.budget ?? ""} onChange={(v) => set("budget", v)} options={["< 5,000","5,000–10,000","10,000–20,000","20,000+"]} />
        </Field>
        <Field label="Scholarship need">
          <SimpleSelect value={data.scholarship ?? ""} onChange={(v) => set("scholarship", v)} options={["none","preferred","required"]} />
        </Field>
        <Field label="Preferred intake">
          <SimpleSelect value={data.intake ?? ""} onChange={(v) => set("intake", v)} options={["Fall","Spring","Summer"]} />
        </Field>
        <Field label="Preferred city type">
          <SimpleSelect value={data.cityType ?? ""} onChange={(v) => set("cityType", v)} options={["Capital","Big city","Mid-size","Small town"]} />
        </Field>
        <Field label="Work preference">
          <SimpleSelect value={data.workPreference ?? ""} onChange={(v) => set("workPreference", v)} options={["No work","Part-time","Internship","Post-study work"]} />
        </Field>
        <Field label="Career goal" full><Textarea value={data.careerGoal ?? ""} onChange={(e) => set("careerGoal", e.target.value)} rows={3} /></Field>
        <Field label="Available documents (comma separated)" full>
          <Input value={(data.availableDocuments ?? []).join(", ")} onChange={(e) => set("availableDocuments", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} />
        </Field>
        <Field label="Prior visa refusal?">
          <SimpleSelect value={data.priorRefusal ?? ""} onChange={(v) => set("priorRefusal", v)} options={["no","yes"]} />
        </Field>
        <Field label="Notes" full><Textarea value={data.notes ?? ""} onChange={(e) => set("notes", e.target.value)} rows={2} /></Field>
        <div className="sm:col-span-2"><Button type="submit">Run scan</Button></div>
      </form>

      {result && (
        <div className="rounded-xl border bg-card p-5 grid md:grid-cols-[auto_1fr] gap-5 brovi-fade-up">
          <div className="flex flex-col items-center gap-2">
            <ScoreRing value={result.score} />
            <RiskBadge score={result.score} />
          </div>
          <div className="space-y-4">
            <Block title="Strengths" items={result.strengths} tone="success" />
            <Block title="Weaknesses" items={result.weaknesses} tone="risk" />
            <Block title="Recommended alternatives" items={result.alternatives} />
            <Block title="Step-by-step action plan" items={result.actionPlan} numbered />
            <DisclaimerBanner />
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return <div className={`space-y-1.5 ${full ? "sm:col-span-2" : ""}`}><Label>{label}</Label>{children}</div>;
}
function SimpleSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
      <SelectContent>{options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
    </Select>
  );
}
function Block({ title, items, tone, numbered }: { title: string; items: string[]; tone?: "success" | "risk"; numbered?: boolean }) {
  if (!items.length) return null;
  const dot = tone === "risk" ? "bg-risk" : tone === "success" ? "bg-success" : "bg-primary";
  return (
    <div>
      <h3 className="font-medium mb-2">{title}</h3>
      <ol className="space-y-1 text-sm text-muted-foreground">
        {items.map((s, i) => (
          <li key={s + i} className="flex items-start gap-2">
            {numbered ? <span className="h-5 w-5 rounded-full bg-primary/10 text-primary text-xs grid place-items-center shrink-0">{i + 1}</span> : <span className={`h-1.5 w-1.5 rounded-full mt-2 ${dot}`} />}
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}