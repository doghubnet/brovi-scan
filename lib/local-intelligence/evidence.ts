import type { EvidenceItem, EvidenceSeverity } from "./types";
export const makeEvidence = (id: string, source: string, label: string, value: string, severity: EvidenceSeverity, explanation: string): EvidenceItem => ({ id, source, label, value, severity, explanation });
