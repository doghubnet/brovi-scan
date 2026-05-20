"use client";

import Link from "next/link";
import { Menu, ScanLine, X } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuthSession } from "@/hooks/use-auth-session";
import { UserMenu } from "@/components/auth/user-menu";
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
  const appRoute = pathname?.startsWith("/dashboard") || pathname?.startsWith("/document") || pathname?.startsWith("/program") || pathname?.startsWith("/bank") || pathname?.startsWith("/interview") || pathname?.startsWith("/readiness") || pathname?.startsWith("/applications") || pathname?.startsWith("/tasks") || pathname?.startsWith("/consultant");
  const startHref = user ? "/dashboard" : "/login";

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
      <div className="container-page flex min-h-20 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3 font-black tracking-tight">
          <span className="rounded-2xl bg-royal p-2 text-white"><ScanLine className="h-5 w-5" /></span>
          <span>BROVI <span className="text-royal">Scan</span></span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300 lg:flex">
          {headerNavItems.map((item) => <Link className={pathname === item.href ? "text-royal" : "hover:text-royal"} key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserMenu />
          <div className="hidden gap-2 sm:flex">{loading ? <div className="h-10 w-32 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-white/10" /> : <ButtonLink href={startHref}>{user && appRoute ? "Dashboard" : "Start Free Scan"}</ButtonLink>}</div>
          <button className="rounded-2xl border border-slate-200 p-2 dark:border-white/10 lg:hidden" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open ? <nav className="container-page grid gap-2 pb-4 lg:hidden">{navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`rounded-2xl px-4 py-3 text-sm font-semibold ${pathname === item.href ? "bg-blue-50 text-royal dark:bg-white/10" : "text-slate-700 dark:text-slate-200"}`}>{item.label}</Link>)}<div className="grid gap-2 border-t border-slate-200 pt-3 dark:border-white/10"><UserMenu mobile />{!loading ? <ButtonLink href={startHref}>{user && appRoute ? "Dashboard" : "Start Free Scan"}</ButtonLink> : null}</div></nav> : null}
    </motion.header>
  );
}
