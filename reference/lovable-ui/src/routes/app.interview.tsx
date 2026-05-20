import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScoreRing, RiskBadge, ScoreBarChart } from "@/components/Score";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { scoreInterview, type InterviewInput } from "@/lib/scoring";
import { loadJSON, saveJSON, STORAGE_KEYS } from "@/lib/storage";
import { useState } from "react";
import { toast } from "sonner";

const QUESTIONS = [
  "Why did you choose this country?",
  "Why did you choose this university?",
  "Why did you choose this program?",
  "Who is sponsoring your studies?",
  "What does your sponsor do?",
  "Why not study in your home country?",
  "What will you do after graduation?",
  "How will this program help your career?",
  "Do you have relatives abroad?",
  "Why should the embassy believe you will return?",
  "Explain your education gap.",
  "Explain your low grade.",
  "Explain your bank statement.",
  "What is your study plan?",
  "What do you know about the city?",
  "How much is your tuition?",
  "How much is your living cost?",
  "What documents did you prepare?",
  "What will you do if your visa is refused?",
  "Why should your application be approved?",
];

export const Route = createFileRoute("/app/interview")({
  head: () => ({ meta: [{ title: "Interview Practice — Brovi Scan" }] }),
  component: InterviewPage,
});

function InterviewPage() {
  const initial = loadJSON<InterviewInput & { score?: number; result?: ReturnType<typeof scoreInterview> }>(STORAGE_KEYS.interview, { mode: "Normal", question: QUESTIONS[0], answer: "" });
  const [data, setData] = useState<InterviewInput>({ mode: initial.mode ?? "Normal", question: initial.question ?? QUESTIONS[0], answer: initial.answer ?? "", targetCountry: initial.targetCountry, visaType: initial.visaType, program: initial.program, university: initial.university, sponsorRelation: initial.sponsorRelation });
  const [result, setResult] = useState(initial.result ?? null);
  const set = <K extends keyof InterviewInput>(k: K, v: InterviewInput[K]) => setData((d) => ({ ...d, [k]: v }));

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        const r = scoreInterview(data);
        setResult(r);
        saveJSON(STORAGE_KEYS.interview, { ...data, score: r.score, result: r });
        toast.success(`Answer score: ${r.score}/100`);
      }}
    >
      <header>
        <h1 className="text-2xl font-semibold">Interview Practice</h1>
        <p className="text-sm text-muted-foreground">Practice truthful visa interview answers. Use placeholders instead of inventing personal facts.</p>
      </header>
      <DisclaimerBanner compact />

      <div className="rounded-xl border bg-card p-5 grid sm:grid-cols-2 gap-4">
        <Field label="Mode">
          <Select value={data.mode} onValueChange={(v) => set("mode", v as InterviewInput["mode"])}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Beginner","Normal","Strict"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Target country"><Input value={data.targetCountry ?? ""} onChange={(e) => set("targetCountry", e.target.value)} /></Field>
        <Field label="Visa type"><Input value={data.visaType ?? ""} onChange={(e) => set("visaType", e.target.value)} placeholder="Student visa" /></Field>
        <Field label="Program name"><Input value={data.program ?? ""} onChange={(e) => set("program", e.target.value)} /></Field>
        <Field label="University name"><Input value={data.university ?? ""} onChange={(e) => set("university", e.target.value)} /></Field>
        <Field label="Sponsor relation"><Input value={data.sponsorRelation ?? ""} onChange={(e) => set("sponsorRelation", e.target.value)} /></Field>
        <Field label="Question" full>
          <Select value={data.question} onValueChange={(v) => set("question", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{QUESTIONS.map((q) => <SelectItem key={q} value={q}>{q}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <Field label="Your answer" full>
          <Textarea rows={6} value={data.answer} onChange={(e) => set("answer", e.target.value)} placeholder="Use placeholders like [relation], [job/business], [amount] if you want to test structure without personal facts." />
        </Field>
        <div className="sm:col-span-2"><Button type="submit">Score my answer</Button></div>
      </div>

      {result && (
        <div className="rounded-xl border bg-card p-5 grid md:grid-cols-[auto_1fr] gap-5 brovi-fade-up">
          <div className="flex flex-col items-center gap-2">
            <ScoreRing value={result.score} />
            <RiskBadge score={result.score} />
          </div>
          <div className="space-y-4">
            <ScoreBarChart data={[
              { name: "Clarity", score: result.clarity },
              { name: "Specificity", score: result.specificity },
              { name: "Consistency", score: result.consistency },
              { name: "Financial explanation", score: result.financial },
              { name: "Return plan", score: result.returnPlan },
            ]} />
            <Block title="Strong points" items={result.strong} tone="success" />
            <Block title="Weak points" items={result.weak} tone="risk" />
            <div>
              <h3 className="font-medium">Better answer structure</h3>
              <p className="mt-1 text-sm bg-secondary/60 rounded-md p-3">{result.betterStructure}</p>
            </div>
            <Block title="Next questions to practice" items={result.nextQuestions} />
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
function Block({ title, items, tone }: { title: string; items: string[]; tone?: "success" | "risk" }) {
  if (!items.length) return null;
  const dot = tone === "risk" ? "bg-risk" : tone === "success" ? "bg-success" : "bg-primary";
  return (
    <div>
      <h3 className="font-medium mb-1">{title}</h3>
      <ul className="space-y-1 text-sm text-muted-foreground">
        {items.map((s, i) => <li key={s + i} className="flex items-start gap-2"><span className={`h-1.5 w-1.5 rounded-full mt-2 ${dot}`} />{s}</li>)}
      </ul>
    </div>
  );
}