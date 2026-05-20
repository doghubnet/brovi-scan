import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { TopNav } from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { ScoreRing, ScoreCard } from "@/components/Score";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import {
  GraduationCap, FileCheck2, Wallet, MessageSquareQuote, FileBarChart, Users2,
  ShieldCheck, Sparkles, CheckCircle2, ArrowRight
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brovi Scan — Check your study visa readiness" },
      { name: "description", content: "Free-first AI tools to scan your program fit, documents, financials, and interview answers before you apply." },
    ],
  }),
  component: Index,
});

const features = [
  { icon: GraduationCap, title: "Program Match Scan", desc: "Check country, program, GPA, English, and budget alignment." },
  { icon: FileCheck2, title: "Document Scan", desc: "Review readiness across passport, transcripts, English proof, and more." },
  { icon: Wallet, title: "Bank Statement Scan", desc: "Safe financial preparation checks — no logins, no passwords." },
  { icon: MessageSquareQuote, title: "Interview Practice", desc: "Practice truthful visa answers in beginner, normal, or strict mode." },
  { icon: FileBarChart, title: "Final Readiness Report", desc: "Combined score and step-by-step action plan." },
  { icon: Users2, title: "Consultant Review Request", desc: "Send your prep to a human reviewer when you're ready." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 brovi-gradient opacity-[0.06] pointer-events-none" />
        <div className="container mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div className="brovi-fade-up">
            <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground mb-5">
              <Sparkles className="h-3 w-3" /> Free-first preparation tools
            </div>
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">
              Scan your study visa readiness before you submit.
            </h1>
            <p className="mt-4 text-base lg:text-lg text-muted-foreground max-w-xl">
              Brovi Scan checks your program fit, documents, financial preparation, interview answers, and overall
              readiness, then gives clear scores and next steps.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/app/program-match">Start Free Scan <ArrowRight className="h-4 w-4 ml-1" /></Link></Button>
              <Button asChild size="lg" variant="secondary"><Link to="/app/interview">Practice Interview</Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/app/report" search={{ sample: "1" } as never}>View Sample Report</Link></Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">No credit card. No upload of bank logins. Preview-mode only.</p>
          </div>

          {/* Dashboard preview */}
          <div className="rounded-2xl border bg-card p-5 shadow-sm brovi-fade-up">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Readiness preview</p>
                <h3 className="font-semibold">Aisha — MSc in Italy</h3>
              </div>
              <ScoreRing value={78} label="Overall" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <MiniScore label="Program" v={82} />
              <MiniScore label="Documents" v={71} />
              <MiniScore label="Financial" v={74} />
              <MiniScore label="Interview" v={85} />
            </div>
            <div className="mt-4 rounded-lg bg-secondary/60 p-3 text-sm">
              <p className="font-medium mb-1">Action plan</p>
              <ul className="text-muted-foreground space-y-1">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" /> Translate transcripts (IT)</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" /> Add sponsor employment proof</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-success mt-0.5" /> Practice 5 more interview questions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What we check */}
      <Section title="What Brovi Scan checks" subtitle="Five focused scans, one clear readiness picture.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow brovi-fade-up">
              <div className="h-9 w-9 rounded-lg grid place-items-center brovi-gradient text-white mb-3">
                <f.icon className="h-4 w-4" />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section title="How Brovi Scan works" subtitle="A simple, transparent flow.">
        <ol className="grid md:grid-cols-4 gap-4">
          {["Fill your profile","Run your scans","Get scores and gaps","Fix and re-scan"].map((s, i) => (
            <li key={s} className="rounded-xl border bg-card p-5">
              <div className="text-xs text-muted-foreground">Step {i + 1}</div>
              <p className="font-medium mt-1">{s}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Why students use Brovi Scan">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["Free first","Run your first scan and report at no cost."],
            ["Truth-based","No fake documents, no shortcuts. We help you tell your real story well."],
            ["Clear next steps","Each scan returns an action plan, not just a score."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border bg-card p-5">
              <h3 className="font-semibold">{t}</h3>
              <p className="text-sm text-muted-foreground mt-1">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Privacy and safety">
        <div className="rounded-xl border bg-card p-6 flex items-start gap-4">
          <ShieldCheck className="h-6 w-6 text-success mt-0.5" />
          <div className="text-sm text-muted-foreground">
            We never ask for bank passwords, card numbers, CVV, or online banking logins. In preview mode, your
            inputs stay on your device using local storage. See our <Link to="/privacy" className="text-primary underline-offset-2 hover:underline">Privacy</Link> and <Link to="/terms" className="text-primary underline-offset-2 hover:underline">Terms</Link>.
          </div>
        </div>
      </Section>

      <Section title="Sample readiness report">
        <div className="rounded-xl border bg-card p-6 grid md:grid-cols-[auto_1fr] items-center gap-6">
          <ScoreRing value={74} />
          <div className="space-y-3">
            <p className="font-medium">Moderate readiness — improvements recommended before submission.</p>
            <p className="text-sm text-muted-foreground">Strong English score and clear career goal. Documents need 2 translations. Financial source-of-funds needs more detail.</p>
            <Button asChild variant="outline" size="sm"><Link to="/app/report" search={{ sample: "1" } as never}>View full sample</Link></Button>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-2xl brovi-gradient text-white p-8 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-semibold">Run your first free scan in minutes.</h2>
          <p className="mt-2 opacity-90">Find your gaps, fix them early, and submit with confidence.</p>
          <div className="mt-5 flex justify-center gap-3 flex-wrap">
            <Button asChild size="lg" variant="secondary"><Link to="/app/program-match">Start Free Scan</Link></Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white"><Link to="/app/consultant">Request Consultant Review</Link></Button>
          </div>
        </div>
        <div className="mt-6"><DisclaimerBanner /></div>
      </section>

      <footer className="border-t py-8 text-sm text-muted-foreground">
        <div className="container mx-auto px-4 flex flex-wrap justify-between gap-3">
          <span>© {new Date().getFullYear()} Brovi Scan — preview build</span>
          <div className="flex gap-4">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/pricing">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function MiniScore({ label, v }: { label: string; v: number }) {
  return (
    <div className="rounded-lg border bg-background p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold">{v}<span className="text-xs text-muted-foreground">/100</span></p>
    </div>
  );
}
