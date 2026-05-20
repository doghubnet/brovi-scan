"use client";

import { useState } from "react";
import { CreateAccountForm } from "@/components/auth/create-account-form";
import { SignInOptions } from "@/components/auth/sign-in-options";
import { Reveal } from "@/components/motion/reveal";

export function AuthCard() {
  const [tab, setTab] = useState<"signIn" | "create">("signIn");
  const [prefillEmail, setPrefillEmail] = useState("");
  const [preferredMode, setPreferredMode] = useState<"password" | "email-link">("email-link");

  return <Reveal className="card w-full max-w-md p-6 sm:p-8"><div className="text-center"><h1 className="text-3xl font-black tracking-tight">Log in to Brovi Scan</h1></div><div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1 dark:bg-white/10"><button className={`rounded-xl px-4 py-2 text-sm font-bold transition ${tab === "signIn" ? "bg-white text-royal shadow-sm dark:bg-navy" : "muted"}`} type="button" onClick={() => setTab("signIn")}>Sign in</button><button className={`rounded-xl px-4 py-2 text-sm font-bold transition ${tab === "create" ? "bg-white text-royal shadow-sm dark:bg-navy" : "muted"}`} type="button" onClick={() => setTab("create")}>Create account</button></div><div className="mt-6">{tab === "signIn" ? <SignInOptions initialEmail={prefillEmail} initialMode={preferredMode} /> : <CreateAccountForm onSignupNeedsSignIn={(email) => { setPrefillEmail(email); setPreferredMode("password"); setTab("signIn"); }} />}</div></Reveal>;
}
