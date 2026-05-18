"use client";

import Link from "next/link";
import { Menu, ScanLine, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { UserMenu } from "@/components/auth/user-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { headerNavItems, navItems } from "@/lib/constants/copy";

export function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [startHref, setStartHref] = useState("/login");
  useEffect(() => { createClient().auth.getUser().then(({ data }) => setStartHref(data.user ? "/dashboard" : "/login")); }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-soft/85 backdrop-blur dark:border-white/10 dark:bg-navy/85">
      <div className="container-page flex min-h-20 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3 font-black tracking-tight">
          <span className="rounded-2xl bg-royal p-2 text-white"><ScanLine className="h-5 w-5" /></span>
          <span>BROVI <span className="text-royal">Scan</span></span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300 lg:flex">
          {headerNavItems.map((item) => (
            <Link className={pathname === item.href ? "text-royal" : "hover:text-royal"} key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserMenu />
          <div className="hidden gap-2 sm:flex">
            <ButtonLink href={startHref}>Start Free Scan</ButtonLink>
          </div>
          <button className="rounded-2xl border border-slate-200 p-2 dark:border-white/10 lg:hidden" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="container-page grid gap-2 pb-4 lg:hidden">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`rounded-2xl px-4 py-3 text-sm font-semibold ${pathname === item.href ? "bg-blue-50 text-royal dark:bg-white/10" : "text-slate-700 dark:text-slate-200"}`}>{item.label}</Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
