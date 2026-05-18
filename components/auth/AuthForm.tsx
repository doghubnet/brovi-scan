"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export function AuthForm() {
  const [message, setMessage] = useState(configured ? "Use your email and password to continue." : "Demo mode active. Add Supabase variables for real accounts.");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(mode: "signIn" | "signUp") {
    if (!configured) { setMessage("Demo mode active. Add Supabase variables for real accounts."); return; }
    const supabase = createClient();
    const response = mode === "signIn" ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password });
    setMessage(response.error ? response.error.message : mode === "signIn" ? "Signed in successfully." : "Account created. Check email confirmation settings in Supabase.");
  }

  async function logout() {
    if (!configured) return setMessage("Demo mode active. Add Supabase variables for real accounts.");
    await createClient().auth.signOut();
    setMessage("Signed out.");
  }

  return <div className="space-y-4"><div className="rounded-2xl bg-blue-50 p-4 text-sm font-semibold text-royal dark:bg-white/10">{message}</div><label className="label">Email<input className="input mt-2" type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><label className="label">Password<input className="input mt-2" type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label><div className="grid gap-3 sm:grid-cols-3"><button className="btn-primary" type="button" onClick={() => submit("signIn")}>Sign in</button><button className="btn-secondary" type="button" onClick={() => submit("signUp")}>Create account</button><button className="btn-secondary" type="button" onClick={logout}>Logout</button></div></div>;
}
