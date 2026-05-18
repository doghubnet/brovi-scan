import { AnimatedCounter } from "@/components/motion/animated-counter";
import { RiskBadge } from "./RiskBadge";

export function ScoreRing({ score, label }: { score: number; label: string }) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="relative h-36 w-36" aria-label={`${label}: ${score}%`}>
        <svg className="h-full w-full -rotate-90">
          <circle cx="72" cy="72" r={radius} stroke="currentColor" strokeWidth="12" fill="none" className="text-slate-200 dark:text-white/10" />
          <circle cx="72" cy="72" r={radius} stroke="url(#scoreGradient)" strokeWidth="12" fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000 motion-safe:animate-[scoreDraw_.9s_ease-out]" />
          <defs><linearGradient id="scoreGradient"><stop stopColor="#2563EB" /><stop offset="1" stopColor="#06B6D4" /></linearGradient></defs>
        </svg>
        <div className="absolute inset-0 grid place-items-center"><div className="text-4xl font-black leading-none"><AnimatedCounter value={score} suffix="%" /></div></div>
      </div>
      <div className="max-w-40 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</div>
      <RiskBadge score={score} />
    </div>
  );
}
