import { createFileRoute } from "@tanstack/react-router";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/admin")({
  head: () => ({ meta: [{ title: "Admin Preview — Brovi Scan" }] }),
  component: AdminPage,
});

type Req = { id: string; name: string; target: string; support: string; status: string; note: string };
const SAMPLE: Req[] = [
  { id: "REQ-001", name: "Aisha Demir", target: "Italy", support: "Document review", status: "New", note: "" },
  { id: "REQ-002", name: "Kofi Asante", target: "Germany", support: "Interview preparation", status: "Contacted", note: "Booked call" },
  { id: "REQ-003", name: "Linh Pham", target: "Canada", support: "Full application guidance", status: "In Review", note: "Awaiting docs" },
  { id: "REQ-004", name: "Diego Martínez", target: "Spain", support: "Scholarship guidance", status: "Completed", note: "Done" },
  { id: "REQ-005", name: "Sara Khan", target: "UK", support: "Emergency review", status: "Rejected", note: "Out of scope" },
];
const STATUS = ["New","Contacted","In Review","Completed","Rejected"];

function AdminPage() {
  const [rows, setRows] = useState<Req[]>(SAMPLE);
  const setStatus = (id: string, v: string) => setRows((r) => r.map((x) => x.id === id ? { ...x, status: v } : x));
  const setNote = (id: string, v: string) => setRows((r) => r.map((x) => x.id === id ? { ...x, note: v } : x));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Admin Preview</h1>
        <p className="text-sm text-muted-foreground">Sample admin view — no real auth or data.</p>
      </header>
      <div className="grid sm:grid-cols-4 gap-3">
        <Stat label="Total scans" value="1,284" />
        <Stat label="Users (preview)" value="312" />
        <Stat label="Open requests" value="2" />
        <Stat label="Completed" value="1" />
      </div>
      <div className="rounded-xl border bg-card overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-secondary/60 text-muted-foreground">
            <tr><th className="text-left p-3">ID</th><th className="text-left p-3">Name</th><th className="text-left p-3">Target</th><th className="text-left p-3">Support type</th><th className="text-left p-3">Status</th><th className="text-left p-3">Admin note</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-3"><Badge variant="outline">{r.id}</Badge></td>
                <td className="p-3 font-medium">{r.name}</td>
                <td className="p-3">{r.target}</td>
                <td className="p-3">{r.support}</td>
                <td className="p-3">
                  <Select value={r.status} onValueChange={(v) => setStatus(r.id, v)}>
                    <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                    <SelectContent>{STATUS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </td>
                <td className="p-3"><Input value={r.note} onChange={(e) => setNote(r.id, e.target.value)} className="min-w-[160px]" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border bg-card p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="text-2xl font-semibold">{value}</p></div>;
}