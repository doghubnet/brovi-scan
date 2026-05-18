"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { friendlyAuthMessage } from "@/lib/auth/messages";
import { createClient } from "@/lib/supabase/client";

export function CreateAccountForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const supabase = createClient();
    if (!supabase) {
      setError("Account creation is temporarily unavailable. Please try again later.");
      setLoading(false);
      return;
    }
    const response = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
    if (response.error) {
      if (process.env.NODE_ENV !== "production") console.error(response.error);
      setError(friendlyAuthMessage(response.error));
      setLoading(false);
      return;
    }
    const user = response.data.user;
    if (user) await supabase.from("users_profile").upsert({ user_id: user.id, full_name: fullName || null }, { onConflict: "user_id" });
    setMessage("Account created. Please check your email or continue to your dashboard.");
    setLoading(false);
    router.refresh();
  }

  return (
    <form className="space-y-4" onSubmit={submit}>
      <label className="label">Full name<input className="input mt-2" value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" /></label>
      <label className="label">Email<input className="input mt-2" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></label>
      <label className="label">Password<input className="input mt-2" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" required minLength={6} /></label>
      {message ? <p className="rounded-2xl bg-green-50 p-3 text-sm font-semibold text-success dark:bg-green-500/10">{message}</p> : null}
      {error ? <p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-risk dark:bg-red-500/10">{error}</p> : null}
      <button className="btn-primary w-full" type="submit" disabled={loading}>{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating account...</> : "Create account"}</button>
    </form>
  );
}
