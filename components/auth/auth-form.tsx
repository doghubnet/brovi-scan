"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Mode = "signIn" | "signUp";

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signIn");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const supabase = createClient();
    if (!supabase) { setMessage("Database connection is not configured."); setLoading(false); return; }
    const response = mode === "signIn"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
    if (response.error) {
      setMessage(response.error.message);
      setLoading(false);
      return;
    }
    const user = response.data.user;
    if (mode === "signUp" && user) {
      await supabase.from("users_profile").upsert({ user_id: user.id, full_name: fullName || null }, { onConflict: "user_id" });
    }
    router.refresh();
    router.push("/dashboard");
  }

  return (
    <form className="space-y-4" onSubmit={submit}>
      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1 dark:bg-white/10">
        <button className={`rounded-xl px-4 py-2 text-sm font-bold ${mode === "signIn" ? "bg-white text-royal dark:bg-navy" : "muted"}`} type="button" onClick={() => setMode("signIn")}>Sign in</button>
        <button className={`rounded-xl px-4 py-2 text-sm font-bold ${mode === "signUp" ? "bg-white text-royal dark:bg-navy" : "muted"}`} type="button" onClick={() => setMode("signUp")}>Create account</button>
      </div>
      {mode === "signUp" ? <label className="label">Full name<input className="input mt-2" value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" /></label> : null}
      <label className="label">Email<input className="input mt-2" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></label>
      <label className="label">Password<input className="input mt-2" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === "signIn" ? "current-password" : "new-password"} required minLength={6} /></label>
      {message ? <p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-risk dark:bg-red-500/10">{message}</p> : null}
      <button className="btn-primary w-full" type="submit" disabled={loading}>{loading ? "Please wait..." : mode === "signIn" ? "Sign in" : "Create account"}</button>
    </form>
  );
}
