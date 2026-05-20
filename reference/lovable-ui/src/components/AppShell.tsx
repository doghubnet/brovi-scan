import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { TopNav } from "@/components/TopNav";
import { LayoutDashboard, User, GraduationCap, FileCheck2, Wallet, MessageSquareQuote, FileBarChart, Users2, Settings, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/profile", label: "Profile", icon: User },
  { to: "/app/program-match", label: "Program Match Scan", icon: GraduationCap },
  { to: "/app/documents", label: "Document Scan", icon: FileCheck2 },
  { to: "/app/bank", label: "Bank Statement Scan", icon: Wallet },
  { to: "/app/interview", label: "Interview Practice", icon: MessageSquareQuote },
  { to: "/app/report", label: "Readiness Report", icon: FileBarChart },
  { to: "/app/consultant", label: "Consultant Review", icon: Users2 },
  { to: "/app/admin", label: "Admin Preview", icon: Shield },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function AppShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNav />
      <div className="flex-1 container mx-auto px-4 py-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <nav className="sticky top-20 space-y-1">
            {items.map((i) => {
              const active = i.exact ? path === i.to : path.startsWith(i.to);
              return (
                <Link key={i.to} to={i.to}
                  className={cn("flex items-center gap-2 px-3 py-2 rounded-md text-sm",
                    active ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground")}>
                  <i.icon className="h-4 w-4" />{i.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}