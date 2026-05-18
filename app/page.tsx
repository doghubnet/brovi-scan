import { ArrowRight, CheckCircle2, FileText, Globe2, Landmark, MessageSquare, Route, ShieldCheck } from "lucide-react";
import { DisclaimerBanner } from "@/components/layout/DisclaimerBanner";
import { TopNav } from "@/components/layout/TopNav";
import { ButtonLink } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { ScoreRing } from "@/components/scores/ScoreRing";
import { featureCards, scores } from "@/lib/constants/copy";

const featureIcons = [Globe2, FileText, Landmark, MessageSquare, ShieldCheck, Route] as const;

export default function Home() {
  return (
    <>
      <TopNav />
      <main>
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(6,182,212,.25),_transparent_35%),linear-gradient(135deg,#F8FAFC,#EAF2FF)] py-16 dark:bg-[radial-gradient(circle_at_top_right,_rgba(6,182,212,.18),_transparent_35%),linear-gradient(135deg,#08111F,#10213A)]">
          <div className="container-page grid items-center gap-10 lg:grid-cols-2">
            <div>
              <DisclaimerBanner />
              <h1 className="mt-8 text-5xl font-black tracking-tight text-navy dark:text-white md:text-7xl">Scan your visa readiness before you submit.</h1>
              <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-200">Brovi Scan reviews your program fit, documents, bank statement details, and interview preparation, then gives you a clear readiness score and step-by-step recommendations.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/program-match-scan">Start Free Scan <ArrowRight className="ml-2 h-4 w-4" /></ButtonLink>
                <ButtonLink href="/interview-practice" variant="secondary">Practice Interview</ButtonLink>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between"><h2 className="text-xl font-bold">Dashboard Preview</h2><span className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-bold text-cyan">Sample preview</span></div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <ScoreRing score={scores.overall} label="Overall Brovi Scan Score" />
                <div className="space-y-3">
                  {[["Program Match", scores.program], ["Document Scan", scores.documents], ["Financial Scan", scores.financial], ["Interview Readiness", scores.interview]].map(([label, score]) => (
                    <div key={label} className="rounded-2xl bg-white/70 p-4 dark:bg-white/5">
                      <div className="flex justify-between text-sm font-semibold"><span>{label}</span><span>{score}%</span></div>
                      <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-white/10"><div className="h-2 rounded-full bg-gradient-to-r from-royal to-cyan" style={{ width: `${score}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container-page py-10"><div className="grid gap-3 sm:grid-cols-5">{["Program fit", "Document checklist", "Financial review", "Interview practice", "Step-by-step guidance"].map((text) => <div key={text} className="flex items-center gap-2 rounded-2xl bg-white p-4 font-semibold shadow-sm dark:bg-white/5"><CheckCircle2 className="h-5 w-5 text-success" />{text}</div>)}</div></section>
        <FadeIn className="container-page py-16">
          <h2 className="section-title">Free-first preparation tools</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map(([title, copy], index) => {
              const Icon = featureIcons[index];
              return <div key={title} className="card transition hover:-translate-y-1"><Icon className="h-8 w-8 text-royal" /><h3 className="mt-4 text-xl font-bold">{title}</h3><p className="mt-2 muted">{copy}</p></div>;
            })}
          </div>
        </FadeIn>
        <FadeIn className="container-page py-16"><h2 className="section-title">How Brovi Scan Works</h2><div className="mt-8 grid gap-4 md:grid-cols-5">{["Enter your applicant profile.", "Upload or fill key details.", "Get readiness scores.", "Follow recommendations.", "Practice before submission."].map((step, index) => <div key={step} className="card"><p className="text-3xl font-black text-royal">{index + 1}</p><p className="mt-3 font-semibold">{step}</p></div>)}</div></FadeIn>
        <section className="container-page pb-20"><div className="card flex flex-col items-start justify-between gap-5 md:flex-row md:items-center"><div><h2 className="text-3xl font-black">Start your free Brovi Scan</h2><p className="mt-2 muted">One free report, 10 interview questions, one program match, and one basic document checklist.</p></div><ButtonLink href="/program-match-scan">Start Free Scan</ButtonLink></div></section>
      </main>
    </>
  );
}
