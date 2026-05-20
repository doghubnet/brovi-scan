"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { toTableInsert } from "@/lib/db-mapping";
import type { AIReport } from "@/types";
import { RecommendationList } from "@/components/reports/RecommendationList";
import { ScoreRing } from "@/components/scores/ScoreRing";

type Field = {
  title?: string;
  ariaLabel?: string;
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  placeholder?: string;
  helper?: string;
  options?: string[];
  numeric?: boolean;
};

export function ScanForm({
  fields,
  endpoint,
  submitLabel = "Analyze readiness",
  tableName,
}: {
  fields: Field[];
  endpoint: string;
  submitLabel?: string;
  tableName?: string;
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<Record<string, string>>();
  const [report, setReport] = useState<AIReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const mode = endpoint.includes("program") ? "program" : endpoint.includes("documents") ? "document" : endpoint.includes("finance") ? "finance" : "generic";

  const schema = useMemo(() => {
    const shape: z.ZodRawShape = {};
    fields.forEach((field) => {
      shape[field.name] = field.numeric ? z.coerce.number().nonnegative(`$<span title={field.title} aria-label={field.ariaLabel ?? field.label}>{field.label}</span> cannot be negative`) : z.string().min(1, `$<span title={field.title} aria-label={field.ariaLabel ?? field.label}>{field.label}</span> is required`);
    });
    return z.object(shape);
  }, [fields]);

  async function saveToSupabase(data: Record<string, unknown>, result: AIReport) {
    if (!tableName) return;
    const supabase = createClient();
    if (!supabase) { setSaveMessage("Database connection is not configured."); return; }
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) { setSaveMessage("Sign in to save this result to your Brovi Scan account."); return; }
    const { error } = await supabase.from(tableName).insert(toTableInsert(tableName, auth.user.id, data, result));
    setSaveMessage(error ? "We could not save this result. Please try again." : "Saved to your Brovi Scan account.");
  }

  async function generateTasks() {
    if (!report) return;
    const supabase = createClient();
    if (!supabase) { setSaveMessage("Database connection is not configured."); return; }
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) { setSaveMessage("Sign in to save tasks from recommendations."); return; }
    const rows = report.recommendations.slice(0, 5).map((title) => ({ user_id: auth.user!.id, title, description: "Generated from Brovi Scan recommendations.", priority: report.score < 60 ? "High" : "Medium", status: "To Do", source_module: tableName ?? "Brovi Scan" }));
    const { error } = await supabase.from("tasks").insert(rows);
    setSaveMessage(error ? "Tasks could not be generated. Please try again." : "Tasks generated from recommendations.");
  }

  async function onSubmit(rawData: Record<string, string>) {
    const parsed = schema.safeParse(rawData);
    if (!parsed.success) {
      setReport({ score: 0, riskLevel: "High Risk", strengths: [], weaknesses: parsed.error.issues.map((issue) => issue.message), recommendations: ["Fix the highlighted fields and scan again."], stepByStepPlan: [], warning: "Please complete all required fields before generating a readiness score." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const result = await res.json() as Partial<AIReport>;
      setReport({ score: Number(result.score ?? 0), riskLevel: result.riskLevel ?? "High Risk", strengths: result.strengths ?? [], weaknesses: result.weaknesses ?? [], recommendations: result.recommendations ?? ["Review required documents and try again."], stepByStepPlan: result.stepByStepPlan ?? [], warning: result.warning ?? "Official verification is still required before submission.", confidence: result.confidence });
    } catch {
      setReport({ score: 0, riskLevel: "High Risk", strengths: [], weaknesses: ["Document scan could not be completed."], recommendations: ["Refresh and submit again."], stepByStepPlan: [], warning: "Official verification is still required before submission." });
    }
    await saveToSupabase(parsed.data, result);
    setLoading(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <form onSubmit={handleSubmit(onSubmit)} className="card grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className={`label ${field.textarea ? "md:col-span-2" : ""}`}>
            <span title={field.title} aria-label={field.ariaLabel ?? field.label}>{field.label}</span>
            {field.options ? (
              <select className="input mt-2" {...register(field.name, { required: true })} defaultValue="">
                <option value="" disabled>Select {field.label.toLowerCase()}</option>
                {field.options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            ) : field.textarea ? (
              <textarea className="input mt-2 min-h-28" placeholder={field.placeholder} {...register(field.name, { required: true })} />
            ) : (
              <input className="input mt-2" type={field.numeric ? "number" : field.type || "text"} min={field.numeric ? 0 : undefined} step={field.numeric ? "0.01" : undefined} placeholder={field.placeholder} {...register(field.name, { required: true })} />
            )}
            {field.helper ? <span className="helper">{field.helper}</span> : null}
            {errors[field.name] ? <span className="mt-1 block text-xs text-risk"><span title={field.title} aria-label={field.ariaLabel ?? field.label}>{field.label}</span> is required.</span> : null}
          </label>
        ))}
        <button className="btn-primary md:col-span-2" type="submit" disabled={loading}>{loading ? "Scanning..." : submitLabel}</button>
      </form>
      <aside className="card h-fit">
        {report ? (
          <>
            <ScoreRing score={report.score} label={mode === "program" ? "Program Match Score" : mode === "document" ? "Document Scan Score" : mode === "finance" ? "Financial Scan Score" : "Readiness Score"} />
            <p className="mt-2 text-center text-sm muted">Risk level: {report.riskLevel}</p>
            <h3 className="mt-6 text-lg font-bold">Strengths</h3><RecommendationList items={report.strengths.length ? report.strengths : ["Basic scan completed."]} />
            <h3 className="mt-6 text-lg font-bold">Weak points and recommendations</h3><RecommendationList items={[...report.weaknesses, ...report.recommendations]} />
            {mode === "program" ? <><h3 className="mt-6 text-lg font-bold">Best-fit directions and safer categories</h3><RecommendationList items={report.strengths.slice(0,2).concat(["Review ambitious options carefully and verify entry rules officially.", "Questions to verify officially: language threshold, required prerequisites, fee structure."])} /><h3 className="mt-6 text-lg font-bold">Next 5 tasks</h3><RecommendationList items={report.recommendations.slice(0,5)} /></> : null}
            {mode === "document" ? <><h3 className="mt-6 text-lg font-bold">Document verification focus</h3><RecommendationList items={["Critical missing documents", "Expired documents", "Translation/legalization needs", "Name/date consistency checks", "Country-specific verification notes"]} /><h3 className="mt-6 text-lg font-bold">Next 5 tasks</h3><RecommendationList items={report.recommendations.slice(0,5)} /></> : null}
            {mode === "finance" ? <><h3 className="mt-6 text-lg font-bold">Financial red flags and sponsor checks</h3><RecommendationList items={["Large deposits without explanation", "Low closing balance vs tuition/living need", "Missing sponsor relation proof", "Short statement period", "Income-expense mismatch"]} /><div className="mt-4 rounded-xl bg-slate-100 p-3 text-sm dark:bg-white/5"><strong>Sponsor explanation template:</strong> The sponsor is my [relationship]. Funds come from [income source]. Evidence attached: [bank statements, income proof, relationship documents].</div><h3 className="mt-6 text-lg font-bold">Next 5 tasks</h3><RecommendationList items={report.recommendations.slice(0,5)} /></> : null}
            <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-400/10 dark:text-amber-100">{report.warning}</p>
            {saveMessage ? <p className="mt-3 text-xs muted">{saveMessage}</p> : null}
            <button className="btn-secondary mt-4 w-full" type="button" onClick={generateTasks}>Generate tasks from recommendations</button>
          </>
        ) : <p className="muted">Submit the form to receive percentage-based readiness scoring and step-by-step recommendations.</p>}
      </aside>
    </div>
  );
}
