"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/use-reduced-motion-safe";
import { ChatInput } from "./chat-input";
import { ChatLauncher } from "./chat-launcher";
import { ChatMessage } from "./chat-message";

type Message = { role: "user" | "assistant"; content: string };
const quickPrompts = ["Ask about my report", "Help me prepare interview", "What document is missing?", "Explain my financial scan"];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: "Hi, I’m Brovi Assistant. I can help with readiness scores, documents, finances, interviews, and next tasks." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>();
  const reduced = useReducedMotionSafe();
  async function send(text = input) {
    if (!text.trim()) return;
    setInput("");
    setMessages((current) => [...current, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text, sessionId }) });
      const data = await res.json();
      setSessionId(data.sessionId);
      setMessages((current) => [...current, { role: "assistant", content: data.reply ?? "Hello! I'm Brovi Assistant. I can help you understand Brovi Scan, prepare your document checklist, practice interview answers, and explain readiness results." }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "Hello! I'm Brovi Assistant. I can help you understand Brovi Scan, prepare your document checklist, practice interview answers, and explain readiness results." }]);
    } finally {
      setLoading(false);
    }
  }
  return <AnimatePresence>{!open ? <ChatLauncher onClick={() => setOpen(true)} /> : <motion.div initial={reduced ? undefined : { opacity: 0, y: 14, scale: 0.98 }} animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }} exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: reduced ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }} className="fixed bottom-5 right-5 z-40 flex h-[620px] max-h-[calc(100vh-2rem)] w-[min(420px,calc(100vw-2rem))] flex-col rounded-2xl border border-slate-200 bg-white shadow-glow dark:border-white/10 dark:bg-navy"><div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-white/10"><div><h2 className="font-black">Brovi Assistant</h2><p className="text-xs muted">Preparation guidance only</p></div><button className="btn-secondary px-3 py-2" type="button" onClick={() => setOpen(false)}>Close</button></div><div className="flex-1 space-y-3 overflow-y-auto p-4">{messages.map((message, index) => <ChatMessage key={index} {...message} />)}{loading ? <ChatMessage role="assistant" content="Thinking..." /> : null}</div><div className="space-y-3 border-t border-slate-200 p-4 dark:border-white/10"><div className="flex flex-wrap gap-2">{quickPrompts.map((prompt) => <button key={prompt} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-royal dark:bg-white/10" type="button" onClick={() => send(prompt)}>{prompt}</button>)}<button className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold dark:bg-white/10" type="button" onClick={() => setMessages([])}>Clear chat</button></div><ChatInput value={input} loading={loading} onChange={setInput} onSend={() => send()} /></div></motion.div>}</AnimatePresence>;
}
