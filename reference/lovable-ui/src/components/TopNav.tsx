import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/app", label: "Dashboard" },
  { to: "/app/program-match", label: "Program Match" },
  { to: "/app/documents", label: "Document Scan" },
  { to: "/app/bank", label: "Bank Statement" },
  { to: "/app/interview", label: "Interview" },
  { to: "/app/report", label: "Report" },
  { to: "/pricing", label: "Pricing" },
];

export function TopNav() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur no-print">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="grid place-items-center h-8 w-8 rounded-md brovi-gradient text-white">
            <GraduationCap className="h-4 w-4" />
          </span>
          <span>Brovi Scan</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.to} to={l.to}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${path.startsWith(l.to) && l.to !== "/" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"}`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex"><Link to="/login">Sign in</Link></Button>
          <button className="md:hidden p-2 rounded-md hover:bg-secondary" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-2 flex flex-col">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2 text-sm">{l.label}</Link>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="py-2 text-sm font-medium text-primary">Sign in</Link>
          </div>
        </div>
      )}
    </header>
  );
}