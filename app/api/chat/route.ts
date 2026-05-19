import { NextResponse } from "next/server";
import { BROVI_ASSISTANT_SYSTEM_PROMPT } from "@/lib/ai/brovi-assistant-prompt";
import { fallbackChatReply } from "@/lib/ai/fallback-chat";
import { chatWithOpenAI } from "@/lib/ai/openai-analysis";
import { geminiApiKey } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

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
  let reply = (await chatWithOpenAI({ message: `${BROVI_ASSISTANT_SYSTEM_PROMPT}
User message: ${message}` })) || fallbackChatReply(message);
  if (reply === fallbackChatReply(message) && geminiApiKey) {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: `${BROVI_ASSISTANT_SYSTEM_PROMPT}
User message: ${message}` }] }] }) });
    if (res.ok) {
      const data = await res.json();
      reply = String(data?.candidates?.[0]?.content?.parts?.[0]?.text || reply);
    }
  }
  if (auth.user && activeSessionId) await supabase.from("chat_messages").insert({ session_id: activeSessionId, user_id: auth.user.id, role: "assistant", content: reply });
  return NextResponse.json({ reply, sessionId: activeSessionId });
}
