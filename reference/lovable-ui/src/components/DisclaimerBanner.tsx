import { ShieldAlert } from "lucide-react";

export function DisclaimerBanner({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-start gap-2 rounded-md border border-warning/40 bg-warning/10 text-foreground ${compact ? "p-2 text-xs" : "p-3 text-sm"}`}>
      <ShieldAlert className="h-4 w-4 mt-0.5 text-warning shrink-0" />
      <p className="leading-snug">
        Brovi Scan provides preparation guidance only. Final decisions are made by official universities,
        embassies, consulates, immigration offices, visa centers, and scholarship bodies.
      </p>
    </div>
  );
}