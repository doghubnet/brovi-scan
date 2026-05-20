import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { runAI } from "@/lib/ai/router";

const SENSITIVE = /(passport|bank statement|transcript|diploma|sponsor income|card number|password|otp|account number|private document|bank login)/i;
const GREET = /^(hello|hi|hey)\b/i;

function localIntentReply(message: string) {
  const lower = message.toLowerCase();
  if (GREET.test(lower)) return "Hello! I’m Brovi Assistant. I can help you understand Brovi Scan, prepare your document checklist, practice interview answers, and explain readiness results.";
  if (lower.includes("what is brovi")) return "Brovi Scan is a preparation platform for readiness scoring, document checks, interview practice, and planning. It does not guarantee visa approval.";
  if (lower.includes("document scan")) return "Use Document Scan to mark each checklist item and review missing, expired, or verification-required items.";
  if (lower.includes("bank statement")) return "Use Bank Statement Scan to review balance coverage, sponsor clarity, and financial red flags.";
  if (lower.includes("interview")) return "Use Interview Practice to analyze your answer clarity, structure, and confidence.";
  if (lower.includes("readiness report")) return "Readiness Report combines scan outcomes into one score, risk level, and action plan.";
  if (lower.includes("official")) return "Always verify official embassy or university requirements before submission.";
  return null;
}

export async function POST(req: Request) {
  const { message, sessionId } = await req.json();
  const text = String(message ?? "").trim();
  const supabase = await createServerSupabaseClient();
  if (!supabase) return NextResponse.json({ error: "Database connection is not configured." }, { status: 503 });
  const { data: auth } = await supabase.auth.getUser();
  let activeSessionId = sessionId as string | undefined;
  if (auth.user && !activeSessionId) {
    const { data } = await supabase.from("chat_sessions").insert({ user_id: auth.user.id }).select("id").single();
    activeSessionId = data?.id;
  }
  if (auth.user && activeSessionId) await supabase.from("chat_messages").insert({ session_id: activeSessionId, user_id: auth.user.id, role: "user", content: text });

  let reply = localIntentReply(text);
  let usedFallback = Boolean(reply);
  if (!reply && SENSITIVE.test(text)) {
    reply = "For sensitive files, use the scan module. I cannot process private document details in chat.";
    usedFallback = true;
  }
  if (!reply) {
    try {
      const ai = await runAI({ taskType: "support_chat", sensitivity: "low", userId: auth.user?.id, messages: [{ role: "system", content: "You are Brovi Assistant. Give concise practical guidance." }, { role: "user", content: text }] });
      reply = ai.outputText ?? "I can help with checklist guidance. Tell me which scan you want help with.";
      usedFallback = ai.usedFallback;
    } catch {
      reply = "I can help with checklist guidance. Tell me which scan you want help with.";
      usedFallback = true;
    }
  }

  if (auth.user && activeSessionId) await supabase.from("chat_messages").insert({ session_id: activeSessionId, user_id: auth.user.id, role: "assistant", content: reply });
  return NextResponse.json({ reply, sessionId: activeSessionId, usedFallback });
}
