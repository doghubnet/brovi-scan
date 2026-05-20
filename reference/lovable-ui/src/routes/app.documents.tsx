import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DOC_STATUSES, DOCUMENT_LIST, scoreDocuments, type DocStatus } from "@/lib/scoring";
import { loadJSON, saveJSON, STORAGE_KEYS } from "@/lib/storage";
import { useState } from "react";
import { toast } from "sonner";
import { ScoreRing, RiskBadge } from "@/components/Score";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { UploadCloud, X, FileText, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/app/documents")({
  head: () => ({ meta: [{ title: "Document Scan — Brovi Scan" }] }),
  component: DocumentsPage,
});

type Saved = { statuses: Record<string, DocStatus>; files: string[]; score?: number; result?: ReturnType<typeof scoreDocuments> };

function DocumentsPage() {
  const initial = loadJSON<Saved>(STORAGE_KEYS.document, { statuses: {}, files: [] });
  const [statuses, setStatuses] = useState<Record<string, DocStatus>>(initial.statuses ?? {});
  const [files, setFiles] = useState<string[]>(initial.files ?? []);
  const [result, setResult] = useState(initial.result ?? null);

  const setStatus = (name: string, s: DocStatus) => setStatuses((p) => ({ ...p, [name]: s }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = scoreDocuments(statuses);
    setResult(r);
    saveJSON(STORAGE_KEYS.document, { statuses, files, score: r.score, result: r });
    toast.success(`Document readiness: ${r.score}/100`);
  };

  const onFile = (list: FileList | null) => {
    if (!list) return;
    const names = Array.from(list).map((f) => f.name);
    setFiles((p) => Array.from(new Set([...p, ...names])));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Document Scan</h1>
        <p className="text-sm text-muted-foreground">Review your readiness across all common study-visa documents.</p>
      </header>
      <DisclaimerBanner compact />
      <div className="flex items-start gap-2 rounded-md border border-risk/30 bg-risk/5 p-3 text-sm">
        <AlertTriangle className="h-4 w-4 text-risk mt-0.5 shrink-0" />
        <p>Do not upload bank passwords, card numbers, CVV, online banking login details, or private access codes.</p>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h2 className="font-semibold mb-3">Upload preview</h2>
        <label
          className="block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-secondary/40 transition-colors"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); onFile(e.dataTransfer.files); }}
        >
          <UploadCloud className="h-8 w-8 mx-auto text-muted-foreground" />
          <p className="mt-2 text-sm">Drag & drop files here, or click to select</p>
          <p className="text-xs text-muted-foreground">Preview only — files are not uploaded anywhere</p>
          <input type="file" multiple className="hidden" onChange={(e) => onFile(e.target.files)} />
        </label>
        {files.length > 0 && (
          <ul className="mt-4 divide-y rounded-md border">
            {files.map((f) => (
              <li key={f} className="flex items-center justify-between p-2 text-sm">
                <span className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" />{f}</span>
                <button type="button" className="p-1 rounded hover:bg-secondary" onClick={() => setFiles((p) => p.filter((x) => x !== f))}><X className="h-4 w-4" /></button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h2 className="font-semibold mb-3">Document checklist</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {DOCUMENT_LIST.map((name) => (
            <div key={name} className="flex items-center justify-between gap-3 p-2 rounded-md border">
              <span className="text-sm">{name}</span>
              <Select value={statuses[name] ?? ""} onValueChange={(v) => setStatus(name, v as DocStatus)}>
                <SelectTrigger className="w-[170px]"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  {DOC_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit">Run document scan</Button>

      {result && (
        <div className="rounded-xl border bg-card p-5 grid md:grid-cols-[auto_1fr] gap-5 brovi-fade-up">
          <div className="flex flex-col items-center gap-2">
            <ScoreRing value={result.score} />
            <RiskBadge score={result.score} />
          </div>
          <div className="space-y-4">
            <ListBlock title="Missing documents" items={result.missing} tone="risk" />
            <ListBlock title="Urgent issues" items={result.urgent} tone="risk" />
            <ListBlock title="Translation notes" items={result.translation} />
            <ListBlock title="Legalization notes" items={result.legalization} />
            <ListBlock title="Step-by-step correction plan" items={result.actionPlan} numbered />
            <DisclaimerBanner />
          </div>
        </div>
      )}
    </form>
  );
}

function ListBlock({ title, items, tone, numbered }: { title: string; items: string[]; tone?: "risk"; numbered?: boolean }) {
  if (!items.length) return null;
  return (
    <div>
      <h3 className="font-medium mb-2">{title}</h3>
      <ol className="space-y-1 text-sm text-muted-foreground">
        {items.map((s, i) => (
          <li key={s + i} className="flex items-start gap-2">
            {numbered ? <span className="h-5 w-5 rounded-full bg-primary/10 text-primary text-xs grid place-items-center shrink-0">{i + 1}</span> : <span className={`h-1.5 w-1.5 rounded-full mt-2 ${tone === "risk" ? "bg-risk" : "bg-primary"}`} />}
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}