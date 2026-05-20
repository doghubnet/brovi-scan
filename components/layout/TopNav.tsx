"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { useAuthSession } from "@/hooks/use-auth-session";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { headerNavItems, navItems } from "@/lib/constants/copy";

export function TopNav() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const lastScroll = useRef(0);
  const { scrollY } = useScroll();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { user, loading } = useAuthSession();

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = lastScroll.current;
    setScrolled(current > 12);
    if (current < 80) setVisible(true);
    else if (current > previous) setVisible(false);
    else setVisible(true);
    lastScroll.current = current;
  });

  return (
    <motion.header animate={{ y: visible || open ? 0 : -96 }} transition={{ duration: reduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }} className={`sticky top-0 z-30 border-b transition-colors duration-300 ${scrolled ? "border-slate-200/70 bg-soft/90 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-navy/90" : "border-transparent bg-soft/80 backdrop-blur dark:bg-navy/80"}`}>
      <div className="container-page flex min-h-[76px] items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3 font-black tracking-tight">
          <img src="https://i.imgur.com/vwUJlqR.jpeg" alt="BROVI Scan" className="h-9 w-9 rounded-lg object-cover" />
          <span>BROVI <span className="text-royal">Scan</span></span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300 lg:flex">
          {headerNavItems.map((item) => <Link className={pathname === item.href ? "text-royal" : "hover:text-royal"} key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {loading ? <div className="hidden h-10 w-24 animate-pulse rounded-2xl bg-slate-200/70 sm:block dark:bg-white/10" /> : !user ? <ButtonLink href="/login">Sign In</ButtonLink> : <div className="hidden items-center gap-2 sm:flex"><ButtonLink href="/dashboard">Dashboard</ButtonLink><SignOutButton className="btn-secondary px-3 py-2" email={user.email} /></div>}
          <div className="hidden sm:flex"><ButtonLink href="/program-match-scan">Start Free Scan</ButtonLink></div>
          <button className="rounded-2xl border border-slate-200 p-2 dark:border-white/10 lg:hidden" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {open ? <nav className="container-page grid gap-2 pb-4 lg:hidden">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`rounded-2xl px-4 py-3 text-sm font-semibold ${pathname === item.href ? "bg-blue-50 text-royal dark:bg-white/10" : "text-slate-700 dark:text-slate-200"}`}>{item.label}</Link>)}<div className="grid gap-2 border-t border-slate-200 pt-3 dark:border-white/10">{!loading && !user ? <ButtonLink href="/login">Sign In</ButtonLink> : null}{!loading && user ? <ButtonLink href="/dashboard">Dashboard</ButtonLink> : null}{!loading && user ? <SignOutButton className="btn-secondary w-full px-3 py-2" email={user.email} /> : null}<ButtonLink href="/program-match-scan">Start Free Scan</ButtonLink></div></nav> : null}
    </motion.header>
  );
}
