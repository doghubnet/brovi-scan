"use client";

import Link from "next/link";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { useAuthSession } from "@/hooks/use-auth-session";

export function UserMenu({ mobile = false }: { mobile?: boolean }) {
  const { user, loading } = useAuthSession();
  const email = user?.email ?? null;

  if (loading) return <div className={mobile ? "btn-secondary w-full animate-pulse" : "hidden h-9 w-24 animate-pulse rounded-2xl bg-slate-200/70 sm:inline-flex dark:bg-white/10"} />;
  if (!email) return <Link className={mobile ? "btn-secondary w-full" : "btn-secondary hidden sm:inline-flex"} href="/login">Sign In</Link>;
  if (mobile) return <div className="grid gap-2 rounded-2xl bg-white/70 p-3 text-sm font-semibold dark:bg-white/10"><Link href="/dashboard" className="truncate">{email}</Link><SignOutButton className="btn-secondary w-full" email={email} /></div>;
  return <div className="hidden items-center gap-2 rounded-2xl bg-white/70 px-3 py-2 text-xs font-semibold dark:bg-white/10 md:flex"><Link href="/dashboard" className="max-w-40 truncate">{email}</Link><SignOutButton email={email} /></div>;
}
