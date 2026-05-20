import { createFileRoute, Link } from "@tanstack/react-router";
import { TopNav } from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — Brovi Scan" }] }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl font-semibold">Free first. Upgrade when you're ready.</h1>
          <p className="text-muted-foreground mt-2">Run your first scan and report at no cost. No card needed in preview mode.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Plan
            title="Free"
            price="$0"
            cta={<Button asChild className="w-full"><Link to="/app/program-match">Start Free Scan</Link></Button>}
            features={[
              "1 program match scan",
              "1 document checklist",
              "1 financial scan",
              "10 interview practice questions",
              "1 final readiness report",
            ]}
          />
          <Plan
            title="Premium preview"
            price="Coming soon"
            highlight
            cta={<WaitlistButton />}
            features={[
              "Unlimited scans & reports",
              "Country-specific checklists",
              "Consultant review priority",
              "Priority support",
              "Re-scan history & tracking",
            ]}
          />
        </div>
        <div className="text-center mt-8">
          <Button asChild variant="outline"><Link to="/app/consultant">Request Consultant Review</Link></Button>
        </div>
      </div>
    </div>
  );
}

function Plan({ title, price, features, cta, highlight }: { title: string; price: string; features: string[]; cta: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border bg-card p-6 ${highlight ? "ring-2 ring-primary" : ""}`}>
      {highlight && <div className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary mb-3"><Sparkles className="h-3 w-3" />Most popular</div>}
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-3xl font-semibold mt-2">{price}</p>
      <ul className="mt-4 space-y-2 text-sm">
        {features.map((f) => (
          <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-success mt-0.5" />{f}</li>
        ))}
      </ul>
      <div className="mt-6">{cta}</div>
    </div>
  );
}

function WaitlistButton() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button className="w-full" variant="secondary">Join Waitlist</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Join the Premium waitlist</DialogTitle></DialogHeader>
        <Input placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <DialogFooter>
          <Button onClick={() => { toast.success("You're on the waitlist (preview)"); setOpen(false); }}>Join</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}