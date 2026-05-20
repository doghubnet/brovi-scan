import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { TopNav } from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — Brovi Scan" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [consent, setConsent] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <div className="flex-1 grid place-items-center px-4 py-10">
        <form
          className="w-full max-w-md rounded-xl border bg-card p-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!consent) { toast.error("Please acknowledge the disclaimer to continue."); return; }
            toast.success("Account created (preview mode)");
            navigate({ to: "/app" });
          }}
        >
          <h1 className="text-xl font-semibold">Create your account</h1>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Full name"><Input required defaultValue="Aisha Demir" /></Field>
            <Field label="Email"><Input type="email" required defaultValue="aisha@example.com" /></Field>
            <Field label="Password"><Input type="password" required defaultValue="preview1234" /></Field>
            <Field label="Country of origin"><Input required defaultValue="Türkiye" /></Field>
            <Field label="Target country"><Input required defaultValue="Italy" /></Field>
          </div>
          <label className="flex items-start gap-2 text-sm">
            <Checkbox checked={consent} onCheckedChange={(c) => setConsent(!!c)} />
            <span>I understand Brovi Scan provides preparation guidance only and does not guarantee official decisions.</span>
          </label>
          <Button type="submit" className="w-full">Create account</Button>
          <p className="text-sm text-center text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}