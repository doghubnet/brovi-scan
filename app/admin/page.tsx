import { ExportCsvButton } from "@/components/admin/ExportCsvButton";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ScoreCard } from "@/components/scores/ScoreCard";

const isSupabaseConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Admin() {
  const isAdmin = process.env.BROVI_DEMO_ADMIN === "true" || !isSupabaseConfigured;
  return <DashboardShell><h1 className="section-title">Admin Dashboard</h1>{!isAdmin ? <div className="card border-risk/30"><p className="font-semibold text-risk">Admin access required.</p></div> : <><div className="card border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100"><p className="font-semibold">Admin sample mode is active when Supabase roles are not configured. Private document links are never exported.</p></div><div className="grid gap-4 md:grid-cols-4"><ScoreCard title="Total users" score={64} detail="sample" /><ScoreCard title="Submitted reports" score={42} detail="sample" /><ScoreCard title="Consultant requests" score={18} detail="sample" /><ScoreCard title="High-risk applicants" score={23} detail="sample" /></div><div className="grid gap-4 lg:grid-cols-2"><div className="card"><h2 className="text-xl font-bold">Recent application tracker entries</h2><ul className="mt-3 space-y-2 muted"><li>University of Milan · MSc Data Science · Preparing Documents</li><li>University of Manitoba · MBA · Researching</li></ul></div><div className="card"><h2 className="text-xl font-bold">Country and program interest</h2><p className="mt-3 muted">Italy, Canada, Germany · Data Science, MBA, Public Health</p><ExportCsvButton /></div></div></>}</DashboardShell>;
}
