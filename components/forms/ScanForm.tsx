"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import type { AIReport } from "@/types";
import { RecommendationList } from "@/components/reports/RecommendationList";
import { ScoreRing } from "@/components/scores/ScoreRing";

type Field = {
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
  const [saveMessage, setSaveMessage] = useState("Results are kept locally in demo mode until Supabase Auth is configured.");

  const schema = useMemo(() => {
    const shape: z.ZodRawShape = {};
    fields.forEach((field) => {
      shape[field.name] = field.numeric ? z.coerce.number().nonnegative(`${field.label} cannot be negative`) : z.string().min(1, `${field.label} is required`);
    });
    return z.object(shape);
  }, [fields]);

  async function saveToSupabase(data: Record<string, unknown>, result: AIReport) {
    if (!tableName || !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return;
    const supabase = createClient();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;
    await supabase.from(tableName).insert({ user_id: auth.user.id, score: result.score, report_json: result, ...data });
    setSaveMessage("Saved to your Brovi Scan account.");
  }

  async function onSubmit(rawData: Record<string, string>) {
    const parsed = schema.safeParse(rawData);
    if (!parsed.success) {
      setReport({ score: 0, riskLevel: "High Risk", strengths: [], weaknesses: parsed.error.issues.map((issue) => issue.message), recommendations: ["Fix the highlighted fields and scan again."], stepByStepPlan: [], warning: "Please complete all required fields before generating a readiness score." });
      return;
    }
    setLoading(true);
    const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
    const result = await res.json() as AIReport;
    setReport(result);
    await saveToSupabase(parsed.data, result);
    setLoading(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <form onSubmit={handleSubmit(onSubmit)} className="card grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className={`label ${field.textarea ? "md:col-span-2" : ""}`}>
            {field.label}
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
            {errors[field.name] ? <span className="mt-1 block text-xs text-risk">{field.label} is required.</span> : null}
          </label>
        ))}
        <button className="btn-primary md:col-span-2" type="submit" disabled={loading}>{loading ? "Scanning..." : submitLabel}</button>
      </form>
      <aside className="card h-fit">
        {report ? (
          <>
            <ScoreRing score={report.score} label="Readiness Score" />
            <h3 className="mt-6 text-lg font-bold">Strengths</h3><RecommendationList items={report.strengths.length ? report.strengths : ["Basic scan completed."]} />
            <h3 className="mt-6 text-lg font-bold">Weak points and recommendations</h3><RecommendationList items={[...report.weaknesses, ...report.recommendations]} />
            <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-400/10 dark:text-amber-100">{report.warning}</p>
            <p className="mt-3 text-xs muted">{saveMessage}</p>
          </>
        ) : <p className="muted">Submit the form to receive percentage-based readiness scoring and step-by-step recommendations.</p>}
      </aside>
    </div>
  );
}
