"use client";

import { Loader2 } from "lucide-react";
import { PasswordInput } from "@/components/auth/password-input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EmailOtpForm } from "@/components/auth/email-otp-form";
import { createClient } from "@/lib/supabase/client";

export function SignInOptions({ initialEmail = "", initialMode = "password" }: { initialEmail?: string; initialMode?: "password" | "email-link" }) {
  const router = useRouter();
  const [mode, setMode] = useState<"password" | "email-link">(initialMode);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");

  async function continueWithGoogle() {
    setGoogleLoading(true); setError("");
    const supabase = createClient();
    if (!supabase) return setError("Supabase authentication is not configured for this deployment.");
    const { error: oauthError } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${siteUrl}/auth/callback?next=/dashboard` } });
    if (oauthError) { setError("Google sign-in could not start. Check Supabase Google provider and redirect URLs."); setGoogleLoading(false); }
  }

  async function signInPassword(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError("");
    const supabase = createClient();
    if (!supabase) { setError("Supabase authentication is not configured for this deployment."); setLoading(false); return; }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError("Email or password is incorrect, or this account uses Google sign-in.");
    else { router.push("/dashboard"); router.refresh(); }
    setLoading(false);
  }

  return <div className="space-y-4"><button className="btn-secondary w-full justify-center" type="button" onClick={continueWithGoogle} disabled={googleLoading}><img src="https://thumbs.dreamstime.com/b/google-logo-vector-format-white-background-illustration-407571048.jpg" alt="Google" className="mr-2 h-5 w-5 rounded-full object-cover" loading="lazy" />{googleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Continue with Google</button><div className="flex items-center gap-3 py-1"><div className="h-px flex-1 bg-slate-200 dark:bg-white/10" /><span className="text-xs font-black tracking-widest text-slate-400">OR</span><div className="h-px flex-1 bg-slate-200 dark:bg-white/10" /></div><div className="flex gap-2 text-sm"><button type="button" className={mode === "password" ? "font-bold text-royal" : "muted"} onClick={() => setMode("password")}>Password sign in</button><button type="button" className={mode === "email-link" ? "font-bold text-royal" : "muted"} onClick={() => setMode("email-link")}>Email link/code</button></div>{mode === "password" ? <form className="space-y-3" onSubmit={signInPassword}><input className="input" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required /><PasswordInput placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" /><button className="btn-primary w-full" type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button></form> : <EmailOtpForm initialEmail={email} onEmailChange={setEmail} />}{error ? <p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-risk dark:bg-red-500/10">{error}</p> : null}</div>;
}
