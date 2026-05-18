"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { LogoutButton } from "@/components/auth/logout-button";

export function UserMenu() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    const supabase = createClient(); if (!supabase) return; supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);
  if (!email) return <Link className="btn-secondary hidden sm:inline-flex" href="/login">Sign In</Link>;
  return <div className="hidden items-center gap-2 rounded-2xl bg-white/70 px-3 py-2 text-xs font-semibold dark:bg-white/10 md:flex"><Link href="/dashboard" className="max-w-40 truncate">{email}</Link><LogoutButton /></div>;
}
