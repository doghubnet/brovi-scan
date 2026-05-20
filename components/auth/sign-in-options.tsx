"use client";
import { Loader2, Smartphone } from "lucide-react";
import { useState } from "react";
import { EmailOtpForm } from "@/components/auth/email-otp-form";
import { PhoneOtpForm } from "@/components/auth/phone-otp-form";
import { createClient } from "@/lib/supabase/client";

export function SignInOptions({ initialEmail = "", initialMode = "email-link" }: { initialEmail?: string; initialMode?: "password" | "email-link" }) {
  const [mode, setMode] = useState<"password" | "email-link" | "phone">(initialMode);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");
  async function continueWithGoogle() { setGoogleLoading(true); setError(""); const supabase = createClient(); if(!supabase){setError("Sign in is temporarily unavailable. Please try again later."); setGoogleLoading(false); return;} const { error: oauthError } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${siteUrl}/auth/callback?next=/dashboard` } }); if (oauthError) { setError("Google sign-in is temporarily unavailable. Please check auth configuration or use email sign-in."); setGoogleLoading(false);} }
  async function signInPassword(e: React.FormEvent){e.preventDefault(); setLoading(true); setError(""); const supabase=createClient(); if(!supabase){setError("Sign in is temporarily unavailable. Please try again later."); setLoading(false); return;} const {error}=await supabase.auth.signInWithPassword({email,password}); if(error){setError("Sign in failed. Please verify your email and password.");} else {window.location.href="/dashboard";} setLoading(false);} 

  if (mode === "phone") return <PhoneOtpForm onUseEmail={() => setMode("email-link")} />;
  return <div className="space-y-4"><button className="btn-secondary w-full justify-center" type="button" onClick={continueWithGoogle} disabled={googleLoading}>{googleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Continue with Google</button><button className="btn-secondary w-full justify-center" type="button" onClick={() => setMode("phone")}><Smartphone className="mr-2 h-4 w-4" />Continue with phone number</button><div className="flex items-center gap-3 py-1"><div className="h-px flex-1 bg-slate-200 dark:bg-white/10" /><span className="text-xs font-black tracking-widest text-slate-400">OR</span><div className="h-px flex-1 bg-slate-200 dark:bg-white/10" /></div><div className="flex gap-2 text-sm"><button type="button" className={mode==="password"?"font-bold text-royal":"muted"} onClick={()=>setMode("password")}>Password</button><button type="button" className={mode==="email-link"?"font-bold text-royal":"muted"} onClick={()=>setMode("email-link")}>Email link/code</button></div>{mode==="password" ? <form className="space-y-3" onSubmit={signInPassword}><input className="input" type="email" placeholder="Email address" value={email} onChange={(e)=>setEmail(e.target.value)} required/><input className="input" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/><button className="btn-primary w-full" type="submit" disabled={loading}>{loading?"Signing in...":"Sign in"}</button></form> : <EmailOtpForm initialEmail={email} onEmailChange={setEmail} />}{error ? <p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-risk dark:bg-red-500/10">{error}</p> : null}</div>;
}
