import { ExportCsvButton } from "@/components/admin/ExportCsvButton";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ScoreCard } from "@/components/scores/ScoreCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { allowFreeAIForDocumentReview, allowFreeAIForSupport, isGeminiConfigured, isGroqConfigured, isOpenAIConfigured, isOpenRouterConfigured, openrouterZdrRequired } from "@/lib/env";

async function countRows(table: string) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return 0;
  const { count } = await supabase.from(table).select("id", { count: "exact", head: true });
  return count ?? 0;
}

export const dynamic = "force-dynamic";

export default async function Admin() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return <DashboardShell><EmptyState title="Admin Dashboard" description="Admin operations will be available after BROVI database connection is configured." /></DashboardShell>;
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return <DashboardShell><EmptyState title="Admin access required" description="Sign in with a BROVI administrator account to continue." /></DashboardShell>;
  const { data: profile } = await supabase.from("users_profile").select("role").eq("user_id", auth.user.id).maybeSingle();
  if (profile?.role !== "admin") return <DashboardShell><EmptyState title="Admin access required" description="This area is restricted to BROVI administrators." /></DashboardShell>;
  const [users, program, docs, finance, interviews, reports, requests, uploads, attachments, audits] = await Promise.all([countRows("users_profile"), countRows("program_profiles"), countRows("document_reviews"), countRows("financial_reviews"), countRows("interview_sessions"), countRows("final_reports"), countRows("consultant_review_requests"), countRows("uploads"), countRows("document_attachments"), countRows("audit_logs")]);
  const { data: recentRequests } = await supabase.from("consultant_review_requests").select("request_type,status,created_at").order("created_at", { ascending: false }).limit(5);
  const { data: highRisk } = await supabase.from("final_reports").select("overall_score,risk_level,created_at").lt("overall_score", 60).order("created_at", { ascending: false }).limit(5);
  return <DashboardShell><h1 className="section-title">Admin Dashboard</h1><div className="grid gap-4 md:grid-cols-4"><ScoreCard title="Total users" score={users} detail="accounts" /><ScoreCard title="Total scans" score={program + docs + finance + interviews} detail="all modules" /><ScoreCard title="Consultant requests" score={requests} detail="requests" /><ScoreCard title="Uploads metadata" score={uploads} detail="private files" /></div><div className="grid gap-4 lg:grid-cols-2"><div className="card"><h2 className="text-xl font-bold">Recent consultant requests</h2><ul className="mt-3 space-y-2 muted">{recentRequests?.length ? recentRequests.map((row) => <li key={`${row.request_type}-${row.created_at}`}>{row.request_type} · {row.status}</li>) : <li>No requests yet.</li>}</ul></div><div className="card"><h2 className="text-xl font-bold">High-risk reports</h2><ul className="mt-3 space-y-2 muted">{highRisk?.length ? highRisk.map((row) => <li key={`${row.overall_score}-${row.created_at}`}>{row.overall_score}% · {row.risk_level}</li>) : <li>No high-risk reports found.</li>}</ul><ExportCsvButton /></div><div className="card"><h2 className="text-xl font-bold">AI Provider Status</h2><ul className="mt-3 space-y-1 text-sm muted"><li>OpenAI configured: {isOpenAIConfigured ? "yes" : "no"}</li><li>Gemini configured: {isGeminiConfigured ? "yes" : "no"}</li><li>OpenRouter configured: {isOpenRouterConfigured ? "yes" : "no"}</li><li>Groq configured: {isGroqConfigured ? "yes" : "no"}</li><li>Free support AI enabled: {allowFreeAIForSupport ? "yes" : "no"}</li><li>Free document AI enabled: {allowFreeAIForDocumentReview ? "yes" : "no"}</li><li>ZDR required: {openrouterZdrRequired ? "yes" : "no"}</li></ul></div><div className="card"><h2 className="text-xl font-bold">Document Operations</h2><ul className="mt-3 space-y-1 text-sm muted"><li>Total uploaded documents: {attachments}</li><li>Recent audit actions: {audits}</li><li>High-sensitivity documents: tracked in document_attachments metadata.</li><li>Failed uploads: review status = Failed entries.</li><li>Private bucket status: expected `brovi-private-documents` (private).</li></ul></div></div></DashboardShell>;
}
