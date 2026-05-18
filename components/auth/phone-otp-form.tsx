"use client";

import { Loader2, Phone } from "lucide-react";
import { useState } from "react";
import { friendlyAuthMessage } from "@/lib/auth/messages";
import { defaultPhoneCountry, isValidPhoneNumber, normalizePhoneNumber, phoneCountries } from "@/lib/auth/phone";
import { createClient } from "@/lib/supabase/client";

export function PhoneOtpForm({ onUseEmail }: { onUseEmail: () => void }) {
  const [countryCode, setCountryCode] = useState(defaultPhoneCountry.code);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const fullPhoneNumber = normalizePhoneNumber(countryCode, phone);

  async function sendOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!isValidPhoneNumber(fullPhoneNumber)) return setError("Please enter a valid phone number.");
    setLoading(true);
    const supabase = createClient();
    if (!supabase) {
      setError("Sign in is temporarily unavailable. Please try again later.");
      setLoading(false);
      return;
    }
    const { error: otpError } = await supabase.auth.signInWithOtp({ phone: fullPhoneNumber });
    if (otpError) setError(friendlyAuthMessage(otpError));
    else setSent(true);
    setLoading(false);
  }

  async function verifyOtp() {
    setVerifying(true);
    setError("");
    const supabase = createClient();
    if (!supabase) {
      setError("Sign in is temporarily unavailable. Please try again later.");
      setVerifying(false);
      return;
    }
    const { error: verifyError } = await supabase.auth.verifyOtp({ phone: fullPhoneNumber, token: otp, type: "sms" });
    if (verifyError) setError(friendlyAuthMessage(verifyError));
    else window.location.href = "/dashboard";
    setVerifying(false);
  }

  return (
    <div className="space-y-4">
      <button className="btn-secondary w-full" type="button" onClick={onUseEmail}>Continue with email</button>
      <form className="space-y-3" onSubmit={sendOtp}>
        <label className="label">Country</label>
        <select className="input" value={countryCode} onChange={(event) => setCountryCode(event.target.value)}>
          {phoneCountries.map((country) => <option key={`${country.iso}-${country.code}`} value={country.code}>{country.name} ({country.code})</option>)}
        </select>
        <label className="label">Phone number</label>
        <div className="relative">
          <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <span className="absolute left-11 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">{countryCode}</span>
          <input className="input pl-24" inputMode="tel" placeholder="911 234 567" value={phone} onChange={(event) => setPhone(event.target.value)} required />
        </div>
        <button className="btn-primary w-full" type="submit" disabled={loading}>{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</> : "Continue"}</button>
      </form>
      {sent ? <div className="rounded-2xl bg-green-50 p-3 text-sm font-semibold text-success dark:bg-green-500/10">We sent a verification code to your phone.</div> : null}
      {sent ? <div className="grid gap-2 sm:grid-cols-[1fr_auto]"><input className="input" inputMode="numeric" maxLength={6} placeholder="6-digit code" value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))} /><button className="btn-secondary" type="button" onClick={verifyOtp} disabled={verifying}>{verifying ? "Verifying..." : "Verify code"}</button></div> : null}
      {error ? <p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-risk dark:bg-red-500/10">{error}</p> : null}
    </div>
  );
}
