import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { loadJSON, saveJSON, STORAGE_KEYS } from "@/lib/storage";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/app/consultant")({
  head: () => ({ meta: [{ title: "Consultant Review — Brovi Scan" }] }),
  component: ConsultantPage,
});

function ConsultantPage() {
  const initial = loadJSON<Record<string, string>>(STORAGE_KEYS.consultant, {});
  const [data, setData] = useState<Record<string, string>>(initial);
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));

  if (done) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center brovi-fade-up">
        <CheckCircle2 className="h-10 w-10 text-success mx-auto" />
        <h2 className="text-xl font-semibold mt-3">Request received</h2>
        <p className="text-sm text-muted-foreground mt-1">Your consultant review request has been saved in preview mode.</p>
        <Button className="mt-5" onClick={() => setDone(false)}>Send another</Button>
      </div>
    );
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (!consent) { toast.error("Please confirm the consent checkbox."); return; }
        saveJSON(STORAGE_KEYS.consultant, data);
        toast.success("Request saved in preview mode");
        setDone(true);
      }}
    >
      <header>
        <h1 className="text-2xl font-semibold">Consultant Review</h1>
        <p className="text-sm text-muted-foreground">Send your preparation summary to a Brovi consultant for human review.</p>
      </header>
      <div className="rounded-xl border bg-card p-5 grid sm:grid-cols-2 gap-4">
        <Field label="Full name"><Input required value={data.fullName ?? ""} onChange={(e) => set("fullName", e.target.value)} /></Field>
        <Field label="Email"><Input required type="email" value={data.email ?? ""} onChange={(e) => set("email", e.target.value)} /></Field>
        <Field label="WhatsApp or Telegram"><Input value={data.contact ?? ""} onChange={(e) => set("contact", e.target.value)} /></Field>
        <Field label="Country of origin"><Input value={data.origin ?? ""} onChange={(e) => set("origin", e.target.value)} /></Field>
        <Field label="Target country"><Input value={data.target ?? ""} onChange={(e) => set("target", e.target.value)} /></Field>
        <Field label="Visa type"><Input value={data.visa ?? ""} onChange={(e) => set("visa", e.target.value)} /></Field>
        <Field label="Current stage">
          <SimpleSelect value={data.stage ?? ""} onChange={(v) => set("stage", v)} options={["Exploring","Applied to university","Admission received","Preparing visa","Appointment booked","Refused before"]} />
        </Field>
        <Field label="Preferred support type">
          <SimpleSelect value={data.support ?? ""} onChange={(v) => set("support", v)} options={["Document review","Interview preparation","University selection","Scholarship guidance","Full application guidance","Emergency review"]} />
        </Field>
        <Field label="Main concern" full><Textarea rows={3} value={data.concern ?? ""} onChange={(e) => set("concern", e.target.value)} /></Field>
        <label className="sm:col-span-2 flex items-start gap-2 text-sm">
          <Checkbox checked={consent} onCheckedChange={(c) => setConsent(!!c)} />
          <span>I consent to my information being saved for the purpose of a consultant review.</span>
        </label>
        <div className="sm:col-span-2"><Button type="submit">Send request</Button></div>
      </div>
    </form>
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