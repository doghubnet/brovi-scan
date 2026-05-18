"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export function AuthStatus() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    if (!configured) return;
    createClient().auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);
  async function logout() {
    if (!configured) return;
    await createClient().auth.signOut();
    setEmail(null);
  }
  if (!configured) return <span className="hidden rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-royal dark:bg-white/10 sm:inline-flex">Demo mode</span>;
  if (!email) return null;
  return <div className="hidden items-center gap-2 rounded-2xl bg-white/70 px-3 py-2 text-xs font-semibold dark:bg-white/10 md:flex"><span className="max-w-36 truncate">{email}</span><button className="text-royal" type="button" onClick={logout}>Logout</button></div>;
}
