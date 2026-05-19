"use client";

import { Loader2, Smartphone } from "lucide-react";
import { useState } from "react";
import { EmailOtpForm } from "@/components/auth/email-otp-form";
import { PhoneOtpForm } from "@/components/auth/phone-otp-form";
import { friendlyAuthMessage } from "@/lib/auth/messages";
import { createClient } from "@/lib/supabase/client";

export function SignInOptions() {
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  async function continueWithGoogle() {
    setGoogleLoading(true);
    setError("");
    const supabase = createClient();
    if (!supabase) {
      setError("Sign in is temporarily unavailable. Please try again later.");
      setGoogleLoading(false);
      return;
    }
    const { error: oauthError } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/auth/callback` } });
    if (oauthError) {
      if (process.env.NODE_ENV !== "production") console.error(oauthError);
      setError("Google sign-in is temporarily unavailable. Please try email sign-in.");
      setGoogleLoading(false);
    }
  }

  if (mode === "phone") return <PhoneOtpForm onUseEmail={() => setMode("email")} />;

  return (
    <div className="space-y-4">
      <button className="btn-secondary w-full justify-center" type="button" onClick={continueWithGoogle} disabled={googleLoading}>
        {googleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <span className="mr-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-white text-sm font-black text-royal shadow-sm"><img src="https://img.favpng.com/20/20/18/google-logo-google-logo-design-E6V0vj5m.jpg" alt="Google logo" className="h-full w-full object-cover" onError={(e)=>{(e.currentTarget.style.display="none"); const n=e.currentTarget.nextElementSibling as HTMLElement | null; if(n) n.style.display="block";}}/><span style={{display:"none"}}>G</span></span>}
        Continue with Google
      </button>
      <button className="btn-secondary w-full justify-center" type="button" onClick={() => setMode("phone")}>
        <Smartphone className="mr-2 h-4 w-4" />
        Continue with phone number
      </button>
      {error ? <p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-risk dark:bg-red-500/10">{error}</p> : null}
      <div className="flex items-center gap-3 py-1"><div className="h-px flex-1 bg-slate-200 dark:bg-white/10" /><span className="text-xs font-black tracking-widest text-slate-400">OR</span><div className="h-px flex-1 bg-slate-200 dark:bg-white/10" /></div>
      <EmailOtpForm />
    </div>
  );
}
