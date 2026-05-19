"use client";
import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { InterviewPracticeClient } from "@/components/forms/InterviewPracticeClient";
import { CountrySelector } from "@/components/country/country-selector";
import { getCountryPack } from "@/lib/country-data";
import { CountryInterviewGroups } from "@/components/country/country-interview-groups";

export const dynamic = "force-dynamic";

export default function Page() {
  const [country, setCountry] = useState("");
  const pack = useMemo(() => getCountryPack(country), [country]);
  return <DashboardShell><h1 className="section-title">Interview Practice Scan</h1><CountrySelector value={country} onChange={setCountry} includePlanned />{pack?.status === "active" ? <CountryInterviewGroups pack={pack} /> : <div className="card">General questions are available. Select an active country for country-specific groups.</div>}<InterviewPracticeClient /></DashboardShell>;
}
