"use client";

import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { CreateAccountForm } from "@/components/auth/create-account-form";
import { SignInOptions } from "@/components/auth/sign-in-options";
import { Reveal } from "@/components/motion/reveal";

export function AuthCard() {
  const [tab, setTab] = useState<"signIn" | "create">("signIn");
  return (
    <Reveal className="card w-full max-w-md p-6 sm:p-8">
      <div className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-royal text-white shadow-lg shadow-blue-500/20"><ShieldCheck className="h-6 w-6" /></div>
      <div className="text-center">
        <h1 className="text-3xl font-black tracking-tight">Log in to Brovi Scan</h1>
        <p className="mt-2 muted">Save scans, reports, applications, tasks, documents, and consultant review requests.</p>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1 dark:bg-white/10">
        <button className={`rounded-xl px-4 py-2 text-sm font-bold transition ${tab === "signIn" ? "bg-white text-royal shadow-sm dark:bg-navy" : "muted"}`} type="button" onClick={() => setTab("signIn")}>Sign in</button>
        <button className={`rounded-xl px-4 py-2 text-sm font-bold transition ${tab === "create" ? "bg-white text-royal shadow-sm dark:bg-navy" : "muted"}`} type="button" onClick={() => setTab("create")}>Create account</button>
      </div>
      <div className="mt-6">{tab === "signIn" ? <SignInOptions /> : <CreateAccountForm />}</div>
    </Reveal>
  );
}
