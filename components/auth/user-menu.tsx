"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoutButton } from "@/components/auth/logout-button";
import { createClient } from "@/lib/supabase/client";

export function UserMenu({ mobile = false }: { mobile?: boolean }) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  if (!email) {
    return <Link className={mobile ? "btn-secondary w-full" : "btn-secondary hidden sm:inline-flex"} href="/login">Sign In</Link>;
  }

  if (mobile) {
    return (
      <div className="grid gap-2 rounded-2xl bg-white/70 p-3 text-sm font-semibold dark:bg-white/10">
        <Link href="/dashboard" className="truncate">{email}</Link>
        <LogoutButton className="btn-secondary w-full" email={email} />
      </div>
    );
  }

  return <div className="hidden items-center gap-2 rounded-2xl bg-white/70 px-3 py-2 text-xs font-semibold dark:bg-white/10 md:flex"><Link href="/dashboard" className="max-w-40 truncate">{email}</Link><LogoutButton email={email} /></div>;
}
