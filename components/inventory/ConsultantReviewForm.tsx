"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const requestTypes = ["Full visa file review", "Program choice review", "Bank statement review", "Interview preparation", "Document checklist review"];

export function ConsultantReviewForm() {
  const [submitted, setSubmitted] = useState(false);
  const [requestType, setRequestType] = useState(requestTypes[0]);
  const [contactPreference, setContactPreference] = useState("Email");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) return setError("Sign in to request a BROVI consultant review.");
    const response = await supabase.from("consultant_review_requests").insert({ user_id: data.user.id, request_type: requestType, contact_preference: contactPreference, message });
    if (response.error) return setError("Your request could not be saved. Please try again.");
    setSubmitted(true);
  }
  if (submitted) return <div className="card"><h2 className="text-2xl font-bold text-success">Request received</h2><p className="mt-2 muted">A BROVI consultant will review your request and follow up through your selected contact preference.</p></div>;
  return <form className="card grid gap-4 md:grid-cols-2" onSubmit={submit}><label className="label">Request type<select className="input mt-2" required value={requestType} onChange={(e) => setRequestType(e.target.value)}>{requestTypes.map((type) => <option key={type}>{type}</option>)}</select></label><label className="label">Contact preference<select className="input mt-2" required value={contactPreference} onChange={(e) => setContactPreference(e.target.value)}>{["Email", "Phone", "WhatsApp", "BROVI portal"].map((type) => <option key={type}>{type}</option>)}</select></label><label className="label md:col-span-2">Message<textarea className="input mt-2 min-h-36" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell BROVI what you want reviewed. Do not include passwords or bank login details." required /></label>{error ? <p className="text-sm text-risk md:col-span-2">{error}</p> : null}<button className="btn-primary md:col-span-2" type="submit">Request BROVI Consultant Review</button></form>;
}
