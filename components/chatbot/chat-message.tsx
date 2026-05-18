export function ChatMessage({ role, content }: { role: "user" | "assistant"; content: string }) {
  return <div className={`rounded-2xl p-3 text-sm ${role === "user" ? "ml-8 bg-royal text-white" : "mr-8 bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-slate-100"}`}>{content}</div>;
}
