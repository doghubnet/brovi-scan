"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PasswordInput } from "@/components/auth/password-input";

export function CreateAccountForm({ onSignupNeedsSignIn }: { onSignupNeedsSignIn?: (email: string) => void }) {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("English");
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setMessage("");
    if (!firstName || !lastName) return setError("First name and last name are required.");
    if (email !== confirmEmail) return setError("Email and confirm email must match.");
    if (password !== confirmPassword) return setError("Password and confirm password must match.");
    if (!agree) return setError("You must accept the preparation guidance and privacy notice.");
    const supabase = createClient();
    if (!supabase) return setError("Supabase authentication is not configured for this deployment.");
    const response = await supabase.auth.signUp({ email, password, options: { data: { first_name: firstName, last_name: lastName, full_name: `${firstName} ${lastName}`, preferred_language: preferredLanguage }, emailRedirectTo: `${siteUrl}/auth/callback?next=/dashboard` } });
    if (response.error) return setError("Account could not be created. Please check your details and try again.");
    if (response.data.user) await supabase.from("users_profile").upsert({ user_id: response.data.user.id, full_name: `${firstName} ${lastName}` }, { onConflict: "user_id" });
    if (response.data.session) { router.push("/dashboard"); router.refresh(); return; }
    setMessage("Account created. Please confirm your email, then sign in with your email and password.");
    onSignupNeedsSignIn?.(email);
  }

  return <form className="space-y-4" onSubmit={submit}><div className="grid gap-3 sm:grid-cols-2"><label className="label">First name<input className="input mt-2" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required /></label><label className="label">Last name<input className="input mt-2" value={lastName} onChange={(e)=>setLastName(e.target.value)} required /></label></div><label className="label">Email<input className="input mt-2" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required /></label><label className="label">Confirm email<input className="input mt-2" type="email" value={confirmEmail} onChange={(e)=>setConfirmEmail(e.target.value)} required /></label><label className="label">Password<PasswordInput className="mt-2" value={password} onChange={(e)=>setPassword(e.target.value)} required minLength={6} autoComplete="new-password" /></label><label className="label">Confirm password<PasswordInput className="mt-2" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required minLength={6} autoComplete="new-password" /></label><label className="label">Preferred language<select className="input mt-2" value={preferredLanguage} onChange={(e)=>setPreferredLanguage(e.target.value)}><option>English</option><option>French</option><option>Spanish</option></select></label><label className="flex items-start gap-2 text-sm"><input type="checkbox" className="mt-1" checked={agree} onChange={(e)=>setAgree(e.target.checked)} required/>I understand Brovi Scan provides preparation guidance only and I agree to the privacy notice.</label>{message?<p className="rounded-2xl bg-green-50 p-3 text-sm font-semibold text-success dark:bg-green-500/10">{message}</p>:null}{error?<p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-risk dark:bg-red-500/10">{error}</p>:null}<button className="btn-primary w-full" type="submit">Create account</button></form>;
}
