"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function EmailOtpForm({
  initialEmail = "",
  onEmailChange,
}: {
  initialEmail?: string;
  onEmailChange?: (value: string) => void;
}) {
  const [email, setEmail] = useState(initialEmail);
  const [token, setToken] = useState("");
  const [useOtp, setUseOtp] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");

  async function send(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const supabase = createClient();
    if (!supabase) return setError("Sign in is temporarily unavailable. Please try again later.");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${siteUrl}/auth/callback?next=/dashboard`,
        shouldCreateUser: false,
      },
    });
    if (error) setError("Could not send sign-in email. Please try again.");
    else setMessage("Check your email and open the secure sign-in link.");
  }

  async function verify() {
    const supabase = createClient();
    if (!supabase) return;
    const { error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
    if (error) setError("6-digit code verification failed.");
    else window.location.href = "/dashboard";
  }

  return (
    <div className="space-y-3">
      <form className="space-y-3" onSubmit={send}>
        <input
          className="input"
          type="email"
          value={email}
          placeholder="Email address"
          onChange={(e) => {
            setEmail(e.target.value);
            onEmailChange?.(e.target.value);
          }}
          required
        />
        <button className="btn-primary w-full" type="submit">
          Continue
        </button>
      </form>

      {message ? <div className="rounded-2xl bg-green-50 p-3 text-sm font-semibold text-success dark:bg-green-500/10">{message}</div> : null}

      <button type="button" className="text-sm text-royal underline" onClick={() => setUseOtp((v) => !v)}>
        Use 6-digit code instead
      </button>

      {useOtp ? (
        <div className="space-y-2">
          <p className="text-xs muted">
            This works only if your Supabase email template sends <code>{"{{ .Token }}"}</code>.
          </p>
          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <input
              className="input"
              inputMode="numeric"
              maxLength={6}
              placeholder="6-digit code"
              value={token}
              onChange={(e) => setToken(e.target.value.replace(/\D/g, ""))}
            />
            <button className="btn-secondary" type="button" onClick={verify}>
              Verify code
            </button>
          </div>
        </div>
      ) : null}

      {error ? <p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-risk dark:bg-red-500/10">{error}</p> : null}
    </div>
  );
}
