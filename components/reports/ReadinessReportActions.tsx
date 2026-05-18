"use client";

import { Download, Printer, Save, Share2, UserCheck } from "lucide-react";
import { useState } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { riskLevel } from "@/lib/scoring";

export function ReadinessReportActions({ programScore, documentScore, financialScore, interviewScore, overallScore }: { programScore?: number | null; documentScore?: number | null; financialScore?: number | null; interviewScore?: number | null; overallScore?: number | null }) {
  const [message, setMessage] = useState("");
  const handlePrint = () => window.print();
  const handleCopyLink = async () => { try { await navigator.clipboard.writeText(window.location.href); setMessage("Report link copied."); } catch { setMessage("Unable to copy link."); } };
  async function saveReport() {
    if (overallScore === null || overallScore === undefined) return;
    const supabase = createClient();
    if (!supabase) return setMessage("Database connection is not configured.");
    const { data } = await supabase.auth.getUser();
    if (!data.user) return setMessage("Sign in to save your report.");
    const { error } = await supabase.from("final_reports").insert({ user_id: data.user.id, program_score: programScore, document_score: documentScore, financial_score: financialScore, interview_score: interviewScore, overall_score: overallScore, risk_level: riskLevel(overallScore), report_json: { programScore, documentScore, financialScore, interviewScore, overallScore } });
    setMessage(error ? "Report could not be saved. Please try again." : "Readiness report saved.");
  }
  return <div><div className="mt-4 flex flex-col gap-3 sm:flex-row"><Button type="button" onClick={handlePrint}><Printer className="mr-2 h-4 w-4" />Print Report</Button><Button type="button" variant="outline" onClick={handleCopyLink}><Share2 className="mr-2 h-4 w-4" />Copy Link</Button><Button type="button" variant="outline" onClick={handlePrint}><Download className="mr-2 h-4 w-4" />Download PDF</Button><Button type="button" variant="outline" onClick={saveReport}><Save className="mr-2 h-4 w-4" />Save Report</Button><ButtonLink href="/consultant-review" variant="secondary"><UserCheck className="mr-2 h-4 w-4" />Request BROVI Consultant Review</ButtonLink></div>{message ? <p className="mt-3 text-sm muted">{message}</p> : null}</div>;
}
