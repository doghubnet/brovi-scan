import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { runAI } from "@/lib/ai/router";

export async function POST(req: Request) {
  const { message, sessionId } = await req.json();
  const supabase = await createServerSupabaseClient();
  if (!supabase) return NextResponse.json({ error: "Database connection is not configured." }, { status: 503 });
  const { data: auth } = await supabase.auth.getUser();
  let activeSessionId = sessionId as string | undefined;
  if (auth.user && !activeSessionId) {
    const { data } = await supabase.from("chat_sessions").insert({ user_id: auth.user.id }).select("id").single();
    activeSessionId = data?.id;
  }
  if (auth.user && activeSessionId) await supabase.from("chat_messages").insert({ session_id: activeSessionId, user_id: auth.user.id, role: "user", content: message });
  const ai = await runAI({ taskType: "support_chat", sensitivity: "low", userId: auth.user?.id, messages: [{ role: "system", content: "You are Brovi Scan AI. Use readiness score language only." }, { role: "user", content: String(message ?? "") }] });
  const reply = ai.outputText ?? "I can help with a checklist approach right now.";
  if (auth.user && activeSessionId) await supabase.from("chat_messages").insert({ session_id: activeSessionId, user_id: auth.user.id, role: "assistant", content: reply });
  return NextResponse.json({ reply, sessionId: activeSessionId, usedFallback: ai.usedFallback });
}
