"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";

const statuses = ["Researching", "Preparing Documents", "Applied", "Waiting Result", "Accepted", "Rejected", "Deferred", "Visa Stage"];
const sample = [
  { id: 1, university: "University of Milan", program: "MSc Data Science", country: "Italy", status: "Preparing Documents", deadline: "2026-07-15", priority: "High", intake: "Fall 2026", fee: "€30", scholarship: "Yes", notes: "Need Declaration of Value." },
  { id: 2, university: "University of Manitoba", program: "MBA", country: "Canada", status: "Researching", deadline: "2026-09-01", priority: "Medium", intake: "Winter 2027", fee: "$120", scholarship: "No", notes: "Compare living cost." },
];

export function ApplicationsBoard() {
  const [items, setItems] = useState(sample);
  const [filter, setFilter] = useState("All");
  const filtered = useMemo(() => filter === "All" ? items : items.filter((item) => item.status === filter || item.country === filter || item.priority === filter), [filter, items]);

  return <div className="space-y-5"><div className="card grid gap-3 md:grid-cols-4"><select className="input" value={filter} onChange={(event) => setFilter(event.target.value)}><option>All</option>{statuses.map((status) => <option key={status}>{status}</option>)}{["Italy", "Canada", "High", "Medium", "Low"].map((value) => <option key={value}>{value}</option>)}</select><button className="btn-primary" type="button" onClick={() => setItems((current) => [...current, { id: Date.now(), university: "New University", program: "New Program", country: "Target country", status: "Researching", deadline: "2026-12-01", priority: "Medium", intake: "Next intake", fee: "TBD", scholarship: "TBD", notes: "Add notes." }])}>Add sample application</button></div>{filtered.length ? <div className="grid gap-4 xl:grid-cols-4">{statuses.map((status) => <section key={status} className="rounded-2xl border border-slate-200 bg-white/60 p-3 dark:border-white/10 dark:bg-white/5"><h2 className="mb-3 text-sm font-black uppercase tracking-wide">{status}</h2><div className="space-y-3">{filtered.filter((item) => item.status === status).map((item) => <article key={item.id} className="rounded-2xl bg-white p-4 shadow-sm dark:bg-navy/60"><div className="flex items-start justify-between gap-2"><div><h3 className="font-bold">{item.university}</h3><p className="text-sm muted">{item.program}</p></div><span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-bold text-royal dark:bg-white/10">{item.priority}</span></div><p className="mt-3 text-sm muted">{item.country} · {item.intake}</p><p className="mt-1 text-sm muted">Deadline: {item.deadline}</p><p className="mt-1 text-sm muted">Fee: {item.fee} · Scholarship: {item.scholarship}</p><p className="mt-3 text-xs muted">{item.notes}</p><div className="mt-3 flex gap-2"><button className="btn-secondary px-3 py-2 text-xs" type="button" onClick={() => setItems((current) => current.map((row) => row.id === item.id ? { ...row, notes: `${row.notes} Updated.` } : row))}>Edit</button><button className="btn-secondary px-3 py-2 text-xs" type="button" onClick={() => setItems((current) => current.filter((row) => row.id !== item.id))}>Delete</button></div></article>)}</div></section>)}</div> : <EmptyState title="No applications yet" description="Add universities and programs to start tracking deadlines, documents, and visa-stage progress." />}</div>;
}
