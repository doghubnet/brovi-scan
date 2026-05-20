import { toRisk, riskTone } from "@/lib/scoring";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ScoreRing({ value, size = 140, label = "Overall" }: { value: number; size?: number; label?: string }) {
  const v = Math.max(0, Math.min(100, value));
  const r = (size - 16) / 2;
  const c = 2 * Math.PI * r;
  const dash = (v / 100) * c;
  const tone = riskTone(toRisk(v));
  const stroke =
    tone === "risk" ? "var(--risk)" : tone === "warning" ? "var(--warning)" : tone === "info" ? "var(--cyan)" : "var(--success)";
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} stroke="var(--color-muted)" strokeWidth="10" fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={stroke} strokeWidth="10" fill="none"
          strokeDasharray={`${dash} ${c - dash}`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-semibold">{v}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}

export function RiskBadge({ score }: { score: number }) {
  const level = toRisk(score);
  const tone = riskTone(level);
  const cls = {
    risk: "bg-risk/15 text-risk border-risk/30",
    warning: "bg-warning/15 text-warning border-warning/30",
    info: "bg-cyan-brand/15 text-cyan-brand border-cyan-brand/30",
    success: "bg-success/15 text-success border-success/30",
  }[tone];
  return <Badge variant="outline" className={cn("border font-medium", cls)}>{level}</Badge>;
}

export function ScoreCard({ title, score, subtitle, icon }: { title: string; score: number; subtitle?: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-4 flex items-center gap-4 brovi-fade-up">
      <ScoreRing value={score} size={88} label="" />
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">{icon}{title}</div>
        <div className="text-2xl font-semibold leading-tight">{score}<span className="text-sm text-muted-foreground">/100</span></div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        <div className="mt-2"><RiskBadge score={score} /></div>
      </div>
    </div>
  );
}

export function ScoreBarChart({ data }: { data: { name: string; score: number }[] }) {
  const max = 100;
  return (
    <div className="space-y-3">
      {data.map((d) => {
        const tone = riskTone(toRisk(d.score));
        const color = tone === "risk" ? "var(--risk)" : tone === "warning" ? "var(--warning)" : tone === "info" ? "var(--cyan)" : "var(--success)";
        return (
          <div key={d.name}>
            <div className="flex justify-between text-sm mb-1"><span>{d.name}</span><span className="text-muted-foreground">{d.score}</span></div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${(d.score/max)*100}%`, background: color }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}