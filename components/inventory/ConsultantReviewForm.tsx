"use client";

import { useState } from "react";

const requestTypes = ["Full visa file review", "Program choice review", "Bank statement review", "Interview preparation", "Document checklist review"];

export function ConsultantReviewForm() {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return <div className="card"><h2 className="text-2xl font-bold text-success">Request received</h2><p className="mt-2 muted">A BROVI consultant review request has been recorded in demo mode. Connect Supabase to store requests for admin review.</p></div>;
  return <form className="card grid gap-4 md:grid-cols-2" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label className="label">Request type<select className="input mt-2" required>{requestTypes.map((type) => <option key={type}>{type}</option>)}</select></label><label className="label">Contact preference<select className="input mt-2" required>{["Email", "Phone", "WhatsApp", "BROVI portal"].map((type) => <option key={type}>{type}</option>)}</select></label><label className="label md:col-span-2">Message<textarea className="input mt-2 min-h-36" placeholder="Tell BROVI what you want reviewed. Do not include passwords or bank login details." required /></label><button className="btn-primary md:col-span-2" type="submit">Request BROVI Consultant Review</button></form>;
}
