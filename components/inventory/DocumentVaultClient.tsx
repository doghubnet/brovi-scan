"use client";

import { UploadBox } from "@/components/forms/UploadBox";
import { RiskBadge } from "@/components/scores/RiskBadge";

const documents = [
  { name: "Passport", category: "Identity", status: "Ready", expiry: "2028-10-01", translation: "No", legalization: "No", app: "All", notes: "Check 6-month validity rule." },
  { name: "Transcript", category: "Academic", status: "Needs Legalization", expiry: "", translation: "Yes", legalization: "Yes", app: "Italy MSc", notes: "Legalization pending." },
  { name: "Sponsor letter", category: "Sponsor", status: "Missing", expiry: "", translation: "No", legalization: "No", app: "Visa file", notes: "Draft and sign." },
];
const riskScore: Record<string, number> = { Missing: 25, Expired: 20, "Needs Translation": 55, "Needs Legalization": 55, Available: 75, Ready: 92 };

export function DocumentVaultClient() {
  return <div className="space-y-5"><div className="card border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">Do not upload passwords, card numbers, or bank login details. Files must stay in private Supabase Storage and should never be exposed through public URLs.</div><UploadBox label="Upload to private document vault" /><div className="card overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead><tr className="border-b border-slate-200 dark:border-white/10"><th className="py-3">Document</th><th>Category</th><th>Status</th><th>Risk</th><th>Expiry</th><th>Translation</th><th>Legalization</th><th>Linked application</th><th>Notes</th></tr></thead><tbody>{documents.map((doc) => <tr key={doc.name} className="border-b border-slate-100 dark:border-white/5"><td className="py-3 font-semibold">{doc.name}</td><td>{doc.category}</td><td>{doc.status}</td><td><RiskBadge score={riskScore[doc.status] ?? 60} /></td><td>{doc.expiry || "—"}</td><td>{doc.translation}</td><td>{doc.legalization}</td><td>{doc.app}</td><td className="muted">{doc.notes}</td></tr>)}</tbody></table></div></div>;
}
