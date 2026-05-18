"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import type { AIReport } from "@/types";
import { difficultyLevels, interviewQuestions } from "@/lib/constants/copy";
import { RecommendationList } from "@/components/reports/RecommendationList";
import { ScoreRing } from "@/components/scores/ScoreRing";

type FormValues = { targetCountry: string; visaType: string; difficulty: string; question: string; answer: string };

export function InterviewPracticeClient() {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<AIReport | null>(null);
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormValues>({ defaultValues: { difficulty: "Normal", question: interviewQuestions[0] } });
  const question = watch("question") || interviewQuestions[index];

  async function submit(values: FormValues) {
    const res = await fetch("/api/analyze-interview-answer", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    setFeedback(await res.json());
  }

  function nextQuestion() {
    const next = (index + 1) % interviewQuestions.length;
    setIndex(next);
    setValue("question", interviewQuestions[next]);
    setValue("answer", "");
    setFeedback(null);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <form className="card space-y-4" onSubmit={handleSubmit(submit)}>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="label">Country selection<input className="input mt-2" {...register("targetCountry", { required: true })} />{errors.targetCountry ? <span className="text-xs text-risk">Country is required.</span> : null}</label>
          <label className="label">Visa type selection<input className="input mt-2" {...register("visaType", { required: true })} />{errors.visaType ? <span className="text-xs text-risk">Visa type is required.</span> : null}</label>
          <label className="label">Difficulty level<select className="input mt-2" {...register("difficulty")}>{difficultyLevels.map((level) => <option key={level}>{level}</option>)}</select></label>
        </div>
        <label className="label">Question selector<select className="input mt-2" {...register("question")} onChange={(event) => { setValue("question", event.target.value); setIndex(interviewQuestions.indexOf(event.target.value)); }}>{interviewQuestions.map((item) => <option key={item}>{item}</option>)}</select></label>
        <div className="rounded-2xl bg-blue-50 p-4 dark:bg-white/5"><p className="text-xs font-bold uppercase tracking-widest text-royal">One question at a time</p><h2 className="mt-2 text-2xl font-bold">{question}</h2></div>
        <label className="label">Text answer<textarea className="input mt-2 min-h-40" placeholder="Answer truthfully with specific study, sponsor, finance, and future-plan details." {...register("answer", { required: true, minLength: 20 })} />{errors.answer ? <span className="text-xs text-risk">Write at least 20 characters.</span> : null}</label>
        <div className="rounded-2xl bg-slate-100 p-4 text-sm muted dark:bg-white/5">Voice answer placeholder UI: microphone recording can be connected in a later release.</div>
        <div className="flex flex-col gap-3 sm:flex-row"><button className="btn-primary" disabled={isSubmitting} type="submit">{isSubmitting ? "Checking..." : "Get answer feedback"}</button><button className="btn-secondary" type="button" onClick={nextQuestion}>Next question</button></div>
      </form>
      <aside className="card h-fit">{feedback ? <><ScoreRing score={feedback.score} label="Interview Readiness Score" /><h3 className="mt-6 text-lg font-bold">Feedback</h3><RecommendationList items={[...feedback.strengths, ...feedback.weaknesses, ...feedback.recommendations]} /><p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-400/10 dark:text-amber-100">{feedback.warning}</p></> : <p className="muted">Practice history is saved when Supabase Auth is configured. Demo mode keeps the latest answer feedback locally.</p>}</aside>
    </div>
  );
}
