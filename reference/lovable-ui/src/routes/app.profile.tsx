import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { loadJSON, saveJSON, STORAGE_KEYS } from "@/lib/storage";
import { completenessPct } from "@/lib/scoring";
import { useState } from "react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/app/profile")({
  head: () => ({ meta: [{ title: "Profile — Brovi Scan" }] }),
  component: ProfilePage,
});

const FIELDS: { key: string; label: string; type?: string; long?: boolean }[] = [
  { key: "fullName", label: "Full name" },
  { key: "phone", label: "Phone (optional)" },
  { key: "originCountry", label: "Country of origin" },
  { key: "residenceCountry", label: "Current residence country" },
  { key: "targetCountry", label: "Target country" },
  { key: "targetVisaType", label: "Target visa type" },
  { key: "educationLevel", label: "Education level" },
  { key: "fieldOfStudy", label: "Field of study" },
  { key: "gpa", label: "GPA or average mark" },
  { key: "englishLevel", label: "English level" },
  { key: "intake", label: "Preferred intake" },
  { key: "degreeLevel", label: "Preferred degree level" },
  { key: "budget", label: "Budget range" },
  { key: "scholarship", label: "Scholarship need" },
  { key: "workPreference", label: "Work preference" },
  { key: "careerGoal", label: "Career goal", long: true },
  { key: "availableDocuments", label: "Available documents", long: true },
  { key: "sponsorRelation", label: "Sponsor relation" },
  { key: "notes", label: "Notes", long: true },
];

function ProfilePage() {
  const [data, setData] = useState<Record<string, string>>(() => loadJSON(STORAGE_KEYS.profile, {} as Record<string, string>));
  const pct = completenessPct(data, FIELDS.map((f) => f.key));
  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }));
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => { e.preventDefault(); saveJSON(STORAGE_KEYS.profile, data); toast.success("Profile saved"); }}
    >
      <div className="rounded-xl border bg-card p-5">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">Your profile</h1>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Completeness</p>
            <p className="font-semibold">{pct}%</p>
          </div>
        </div>
        <Progress value={pct} className="mt-3" />
      </div>
      <div className="rounded-xl border bg-card p-5 grid sm:grid-cols-2 gap-4">
        {FIELDS.map((f) => (
          <div key={f.key} className={f.long ? "sm:col-span-2 space-y-1.5" : "space-y-1.5"}>
            <Label>{f.label}</Label>
            {f.long ? (
              <Textarea value={data[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} rows={3} />
            ) : (
              <Input value={data[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} />
            )}
          </div>
        ))}
      </div>
      <Button type="submit">Save profile</Button>
    </form>
  );
}