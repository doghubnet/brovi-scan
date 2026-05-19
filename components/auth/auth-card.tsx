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
      <div className="mx-auto mb-5 flex h-14 w-32 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-sm dark:bg-white/10"><img src="https://i.imgur.com/uxlbTeM.png" alt="Brovi logo" className="h-full w-full object-contain" onError={(e)=>{(e.currentTarget.style.display="none"); const n=e.currentTarget.nextElementSibling as HTMLElement | null; if(n) n.style.display="block";}}/><span style={{display:"none"}} className="text-sm font-black text-royal">BROVI</span></div>
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
