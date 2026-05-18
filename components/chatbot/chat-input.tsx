"use client";

export function ChatInput({ value, loading, onChange, onSend }: { value: string; loading: boolean; onChange: (value: string) => void; onSend: () => void }) {
  return <div className="flex gap-2"><input className="input" value={value} onChange={(event) => onChange(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") onSend(); }} placeholder="Ask Brovi Assistant..." /><button className="btn-primary px-4" type="button" onClick={onSend} disabled={loading}>{loading ? "..." : "Send"}</button></div>;
}
