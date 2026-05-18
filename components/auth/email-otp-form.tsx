"use client";

import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { friendlyAuthMessage } from "@/lib/auth/messages";
import { createClient } from "@/lib/supabase/client";

export function EmailOtpForm() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function sendOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const supabase = createClient();
    if (!supabase) {
      setError("Sign in is temporarily unavailable. Please try again later.");
      setLoading(false);
      return;
    }
    const origin = window.location.origin;
    const { error: otpError } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${origin}/auth/callback` } });
    if (otpError) setError(friendlyAuthMessage(otpError));
    else setMessage("Check your email for the secure sign-in link.");
    setLoading(false);
  }

  async function verifyToken() {
    if (!token.trim()) return;
    setVerifying(true);
    setError("");
    const supabase = createClient();
    if (!supabase) {
      setError("Sign in is temporarily unavailable. Please try again later.");
      setVerifying(false);
      return;
    }
    const { error: verifyError } = await supabase.auth.verifyOtp({ email, token, type: "email" });
    if (verifyError) setError(friendlyAuthMessage(verifyError));
    else window.location.href = "/dashboard";
    setVerifying(false);
  }

  return (
    <div className="space-y-3">
      <form className="space-y-3" onSubmit={sendOtp}>
        <label className="sr-only" htmlFor="email-otp">Email address</label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input id="email-otp" className="input pl-11" type="email" placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
        </div>
        <button className="btn-primary w-full" type="submit" disabled={loading}>{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</> : "Continue"}</button>
      </form>
      {message ? <div className="rounded-2xl bg-green-50 p-3 text-sm font-semibold text-success dark:bg-green-500/10">{message}</div> : null}
      {message ? <div className="grid gap-2 sm:grid-cols-[1fr_auto]"><input className="input" inputMode="numeric" maxLength={6} placeholder="6-digit code" value={token} onChange={(event) => setToken(event.target.value.replace(/\D/g, ""))} /><button className="btn-secondary" type="button" onClick={verifyToken} disabled={verifying}>{verifying ? "Verifying..." : "Verify code"}</button></div> : null}
      {error ? <p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-risk dark:bg-red-500/10">{error}</p> : null}
    </div>
  );
}
