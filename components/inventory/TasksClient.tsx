"use client";

import { useMemo, useState } from "react";

const seed = [
  { title: "Legalize academic transcript", description: "Prepare notarized/legalized copy for target country.", due: "2026-06-15", priority: "High", status: "To Do", source: "Document Scan", app: "Italy MSc" },
  { title: "Rewrite source-of-funds explanation", description: "Explain sponsor income and large deposits clearly.", due: "2026-06-05", priority: "High", status: "In Progress", source: "Bank Statement Scan", app: "Visa file" },
  { title: "Practice sponsor questions", description: "Complete 5 strict-mode interview answers.", due: "2026-06-20", priority: "Medium", status: "Done", source: "Readiness Report", app: "All" },
];

export function TasksClient() {
  const [tasks, setTasks] = useState(seed);
  const done = tasks.filter((task) => task.status === "Done").length;
  const progress = useMemo(() => Math.round((done / tasks.length) * 100), [done, tasks.length]);
  return <div className="space-y-5"><div className="card"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">Roadmap progress</h2><span className="font-black text-royal">{progress}%</span></div><div className="mt-3 h-3 rounded-full bg-slate-200 dark:bg-white/10"><div className="h-3 rounded-full bg-gradient-to-r from-royal to-cyan" style={{ width: `${progress}%` }} /></div><button className="btn-primary mt-5" type="button" onClick={() => setTasks((current) => [...current, { title: "Suggested task from report", description: "Resolve a weak readiness area before submission.", due: "2026-07-01", priority: "Medium", status: "To Do", source: "Readiness Report", app: "All" }])}>Add suggested task</button></div><div className="grid gap-3">{tasks.map((task) => <article key={`${task.title}-${task.due}`} className="card flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><div><div className="flex flex-wrap gap-2"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-royal dark:bg-white/10">{task.priority}</span><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold dark:bg-white/10">{task.status}</span>{new Date(task.due) < new Date("2026-06-10") && task.status !== "Done" ? <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">Due soon</span> : null}</div><h3 className="mt-3 text-lg font-bold">{task.title}</h3><p className="muted">{task.description}</p><p className="mt-1 text-xs muted">Due {task.due} · {task.source} · {task.app}</p></div><select className="input md:w-44" value={task.status} onChange={(event) => setTasks((current) => current.map((row) => row.title === task.title ? { ...row, status: event.target.value } : row))}>{["To Do", "In Progress", "Done"].map((status) => <option key={status}>{status}</option>)}</select></article>)}</div></div>;
}
