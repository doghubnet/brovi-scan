import { DashboardShell } from "@/components/layout/DashboardShell";
import { ScanForm } from "@/components/forms/ScanForm";
import { UploadBox } from "@/components/forms/UploadBox";
import { documentStatuses } from "@/lib/constants/copy";

const docs = [
  ["Passport status", "passportStatus"], ["Transcript status", "transcriptStatus"], ["Grade 12 certificate", "grade12Certificate"], ["National entrance exam result", "entranceExamResult"], ["CV status", "cvStatus"], ["Motivation letter", "motivationLetterStatus"], ["Recommendation letter", "recommendationLetterStatus"], ["English proof", "englishStatus"], ["Declaration of Value", "declarationOfValueStatus"], ["CIMEA when applicable", "cimeaStatus"], ["Admission status", "admissionStatus"], ["Pre-enrollment receipt", "preEnrollmentStatus"], ["Family sponsorship letter", "sponsorshipLetterStatus"], ["Birth certificate when needed", "birthCertificateStatus"], ["Police clearance when needed", "policeClearanceStatus"], ["Travel insurance when needed", "travelInsuranceStatus"], ["Translation status", "translationStatus"], ["Financial docs status", "financialDocsStatus"], ["Other country-specific documents", "otherStatus"],
];
const fields = docs.map(([label, name]) => ({ label, name, options: documentStatuses, helper: "Select the most accurate status so missing and risky items can be prioritized." }));

export default function Page() {
  return <DashboardShell><h1 className="section-title">Document Scan</h1><UploadBox label="Optional private document upload" /><ScanForm fields={fields} endpoint="/api/analyze-documents" submitLabel="Review documents" tableName="document_reviews" /></DashboardShell>;
}
