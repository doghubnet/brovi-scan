"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function CreateAccountForm({ onSignupNeedsSignIn }: { onSignupNeedsSignIn?: (email: string) => void }) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setError(""); setMessage(""); const supabase=createClient(); if(!supabase) return setError("Account creation is temporarily unavailable."); const response=await supabase.auth.signUp({email,password,options:{data:{full_name:fullName}}}); if(response.error) return setError("Account could not be created. Please check your details and try again."); if(response.data.user) await supabase.from("users_profile").upsert({ user_id: response.data.user.id, full_name: fullName || null }, { onConflict: "user_id" }); if(response.data.session){ router.push('/dashboard'); router.refresh(); return; } setMessage("Account created. Please confirm your email, then sign in with your email and password."); onSignupNeedsSignIn?.(email);} 
  return <form className="space-y-4" onSubmit={submit}><label className="label">Full name<input className="input mt-2" value={fullName} onChange={(e)=>setFullName(e.target.value)} /></label><label className="label">Email<input className="input mt-2" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required /></label><label className="label">Password<input className="input mt-2" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required minLength={6} /></label>{message?<p className="rounded-2xl bg-green-50 p-3 text-sm font-semibold text-success dark:bg-green-500/10">{message}</p>:null}{error?<p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-risk dark:bg-red-500/10">{error}</p>:null}<button className="btn-primary w-full" type="submit">Create account</button></form>;
}
