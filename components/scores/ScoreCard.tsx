import { ArrowUpRight } from "lucide-react";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { RiskBadge } from "./RiskBadge";

export function ScoreCard({ title, score, detail }: { title: string; score: number; detail: string }) {
  return (
    <div className="card card-hover">
      <div className="flex items-start justify-between">
        <div><p className="text-sm font-semibold muted">{title}</p><p className="mt-2 text-4xl font-black"><AnimatedCounter value={score} suffix="%" /></p></div>
        <ArrowUpRight className="h-5 w-5 text-royal" />
      </div>
      <div className="mt-4 flex items-center justify-between"><RiskBadge score={score} /><span className="text-xs muted">{detail}</span></div>
    </div>
  );
}
