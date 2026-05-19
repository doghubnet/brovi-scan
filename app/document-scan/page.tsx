"use client";
import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { ScanForm } from "@/components/forms/ScanForm";
import { AttachmentUploadPanel } from "@/components/documents/attachment-upload-panel";
import { DocumentUploadRules } from "@/components/documents/document-upload-rules";
import { documentStatuses } from "@/lib/constants/copy";
import { getCountryPack } from "@/lib/country-data";
import { CountrySelector } from "@/components/country/country-selector";
import { CountryChecklistGroups } from "@/components/country/country-checklist-groups";
import { OfficialVerificationAlert } from "@/components/country/official-verification-alert";

export const dynamic = "force-dynamic";
const docs = [["Identity document status (passport/national ID)","passportStatus"],["Academic transcript status","transcriptStatus"],["Grade 12 or previous certificate status","grade12Certificate"],["Entrance exam result status when applicable","entranceExamResult"],["CV status","cvStatus"],["Motivation letter status","motivationLetterStatus"],["Recommendation letter status","recommendationLetterStatus"],["Language proof status","englishStatus"],["Declaration of Value status when applicable","declarationOfValueStatus"],["CIMEA status when applicable","cimeaStatus"],["Admission document status","admissionStatus"],["Pre-enrolment or admission portal proof status","preEnrollmentStatus"],["Sponsor letter status","sponsorshipLetterStatus"],["Birth certificate status when required","birthCertificateStatus"],["Police clearance status when required","policeClearanceStatus"],["Travel insurance status when required","travelInsuranceStatus"],["Translation status","translationStatus"],["Financial support document status","financialDocsStatus"],["Country-specific document status","otherStatus"]];
const fields = docs.map(([label,name]) => ({ label, name, options: documentStatuses, helper: "Select current status. Verify official requirements before submission." }));
export default function Page() {
  const [country, setCountry] = useState("");
  const pack = useMemo(() => getCountryPack(country), [country]);
  return <DashboardShell><h1 className="section-title">Document Scan</h1><p className="muted">Sections: Identity, Academic, Admission, Financial/Sponsor, Translation/Legalization, and country-specific checks.</p><CountrySelector value={country} onChange={setCountry} includePlanned />{pack ? <div className="space-y-3"><OfficialVerificationAlert message={pack.requiredVerificationMessage} />{pack.status === "active" ? <CountryChecklistGroups pack={pack} /> : <div className="card text-sm">Country pack planned, verify official source.</div>}</div> : <div className="card text-sm">No country selected yet. Generic checklist is shown below.</div>}<AttachmentUploadPanel /><DocumentUploadRules /><ScanForm fields={fields} endpoint="/api/analyze-documents" submitLabel="Review documents" tableName="document_reviews" /></DashboardShell>;
}
