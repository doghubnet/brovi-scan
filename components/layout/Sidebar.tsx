"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/constants/copy";

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="card h-fit w-full lg:sticky lg:top-24 lg:w-60">
      <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition ${pathname === href ? "bg-blue-50 text-royal dark:bg-white/10" : "text-slate-600 hover:bg-blue-50 hover:text-royal dark:text-slate-300 dark:hover:bg-white/10"}`}>
            <Icon className="h-4 w-4" />
            <span className="truncate">{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
