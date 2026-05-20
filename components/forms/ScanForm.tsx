"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { createClient } from "@/lib/supabase/client";
import { toTableInsert } from "@/lib/db-mapping";
import type { AIReport } from "@/types";
import { RecommendationList } from "@/components/reports/RecommendationList";
import { ScoreRing } from "@/components/scores/ScoreRing";

type Field = { name: string; label: string; type?: string; textarea?: boolean; placeholder?: string; options?: string[]; numeric?: boolean; };

export function ScanForm({ fields, endpoint, submitLabel = "Analyze readiness", tableName }: { fields: Field[]; endpoint: string; submitLabel?: string; tableName?: string; }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Record<string, string>>();
  const [report, setReport] = useState<AIReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const mode = endpoint.includes("program") ? "program" : endpoint.includes("documents") ? "document" : endpoint.includes("finance") ? "finance" : "generic";
  const schema = useMemo(() => z.object(Object.fromEntries(fields.map((f) => [f.name, f.numeric ? z.coerce.number().nonnegative(`${f.label} cannot be negative`) : z.string().min(1, `${f.label} is required`)]))), [fields]);

  async function saveToSupabase(data: Record<string, unknown>, result: AIReport) {
    if (!tableName) return;
    const supabase = createClient();
    if (!supabase) return setSaveMessage("Database connection is not configured.");
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return setSaveMessage("Sign in to save this result to your Brovi Scan account.");
    const { error } = await supabase.from(tableName).insert(toTableInsert(tableName, auth.user.id, data, result));
    setSaveMessage(error ? "We could not save this result. Please try again." : "Saved to your Brovi Scan account.");
  }

  async function onSubmit(rawData: Record<string, string>) {
    const parsed = schema.safeParse(rawData);
    if (!parsed.success) return setReport({ score: 0, riskLevel: "High Risk", strengths: [], weaknesses: parsed.error.issues.map((issue) => issue.message), recommendations: ["Fix the highlighted fields and scan again."], stepByStepPlan: [], warning: "Please complete all required fields before generating a readiness score." });
    setLoading(true);
    let normalized: AIReport;
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const result = await res.json() as Partial<AIReport>;
      normalized = { score: Number(result.score ?? 0), riskLevel: result.riskLevel ?? "High Risk", strengths: result.strengths ?? [], weaknesses: result.weaknesses ?? [], recommendations: result.recommendations ?? ["Review required documents and try again."], stepByStepPlan: result.stepByStepPlan ?? [], warning: result.warning ?? "Official verification is still required before submission." };
    } catch {
      normalized = { score: 0, riskLevel: "High Risk", strengths: [], weaknesses: ["Scan could not be completed."], recommendations: ["Refresh and submit again."], stepByStepPlan: [], warning: "Official verification is still required before submission." };
    }
    setReport(normalized);
    await saveToSupabase(parsed.data, normalized);
    setLoading(false);
  }

  return <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"><form onSubmit={handleSubmit(onSubmit)} className="card grid gap-4 md:grid-cols-2">{fields.map((field) => <label key={field.name} className={`label ${field.textarea ? "md:col-span-2" : ""}`}><span className="inline-flex items-center gap-2">{field.label}<InfoTooltip text="Select current status. Verify official requirements before submission." /></span>{field.options ? <select className="input mt-2" {...register(field.name, { required: true })} defaultValue=""><option value="" disabled>Select {field.label.toLowerCase()}</option>{field.options.map((option) => <option key={option} value={option}>{option}</option>)}</select> : field.textarea ? <textarea className="input mt-2 min-h-28" placeholder={field.placeholder} {...register(field.name, { required: true })} /> : <input className="input mt-2" type={field.numeric ? "number" : field.type || "text"} placeholder={field.placeholder} {...register(field.name, { required: true })} />}{errors[field.name] ? <span className="mt-1 block text-xs text-risk">{field.label} is required.</span> : null}</label>)}<button className="btn-primary md:col-span-2" type="submit" disabled={loading}>{loading ? "Scanning..." : submitLabel}</button></form><aside className="card h-fit">{report ? <><ScoreRing score={report.score} label={mode === "program" ? "Program Match Score" : mode === "document" ? "Document Scan Score" : mode === "finance" ? "Financial Scan Score" : "Readiness Score"} /><p className="mt-2 text-center text-sm muted">Risk level: {report.riskLevel}</p><h3 className="mt-6 text-lg font-bold">Strengths</h3><RecommendationList items={report.strengths.length ? report.strengths : ["Basic scan completed."]} /><h3 className="mt-6 text-lg font-bold">Weak points and recommendations</h3><RecommendationList items={[...report.weaknesses, ...report.recommendations]} /><p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-400/10 dark:text-amber-100">{report.warning}</p>{saveMessage ? <p className="mt-3 text-xs muted">{saveMessage}</p> : null}</> : <p className="muted">Submit the form to receive percentage-based readiness scoring and step-by-step recommendations.</p>}</aside></div>;
}
