"use client";
import { Info } from "lucide-react";

export function InfoTooltip({ text }: { text: string }) {
  return <span className="group relative inline-flex"><button type="button" className="rounded-full p-0.5 text-slate-500 hover:text-royal focus:outline-none focus:ring-2 focus:ring-royal" aria-label={text} title={text}><Info className="h-3.5 w-3.5" /></button><span className="pointer-events-none absolute left-1/2 top-full z-20 mt-1 hidden w-56 -translate-x-1/2 rounded-md bg-navy px-2 py-1 text-xs text-white group-hover:block group-focus-within:block">{text}</span></span>;
}
