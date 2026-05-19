import { calculateConfidence, makeEvidence, makeRecommendation, scoreToReadinessLabel, scoreToRiskLevel, type AnalysisResult } from "@/lib/local-intelligence";
import { attachmentRules } from "./attachment-rules";
import { computeDocumentScore } from "./document-score";
import { documentRecommendations } from "./document-recommendations";

export function analyzeDocumentsLocally(input:any): AnalysisResult & { uploadedAttachmentCount:number; highSensitivityCount:number } {
  const attachments=(input.attachments??[]) as Array<{attachment_type_key?:string;sensitivity?:string;status?:string}>;
  const statusEntries=Object.values(input.statuses??input??{}).map((v)=>String(v).toLowerCase());
  const uploadedKeys=new Set(attachments.map((a)=>a.attachment_type_key).filter(Boolean));
  const missingCritical=attachmentRules.filter((r)=>r.requiredLevel==="critical"&&!uploadedKeys.has(r.key)).map((r)=>r.label);
  const missingImportant=attachmentRules.filter((r)=>r.requiredLevel==="important"&&!uploadedKeys.has(r.key)).map((r)=>r.label);
  const score=computeDocumentScore({missingCritical:missingCritical.length,missingImportant:missingImportant.length,unclear:statusEntries.filter((s)=>s.includes("unclear")).length,expired:statusEntries.filter((s)=>s.includes("expired")).length,needsTranslation:statusEntries.filter((s)=>s.includes("translation")).length,needsLegalization:statusEntries.filter((s)=>s.includes("legalization")).length,duplicate:0,noCountry:!input.selectedCountry,noAttachments:attachments.length===0});
  const confidence=calculateConfidence({structuredFieldCount:statusEntries.length,requiredFieldCount:8,hasExtractedText:false,hasAttachments:attachments.length>0});
  const missing=[...missingCritical,...missingImportant];
  return {score,readinessLabel:scoreToReadinessLabel(score),riskLevel:scoreToRiskLevel(score),summary:attachments.length?"Document checklist analyzed with deterministic rules.":"No documents attached yet. Start by selecting an attachment type.",evidence:[makeEvidence("doc_uploaded","document_scan","Uploaded attachments",String(attachments.length),attachments.length?"info":"critical","Attachment list used for local checklist analysis."),makeEvidence("doc_missing","document_scan","Missing recommended attachments",String(missing.length),missing.length?"warning":"success","Missing items reduce readiness score.")],recommendations:documentRecommendations(missing).slice(0,5).map((a,i)=>makeRecommendation(`doc-${i}`,i<2?"High":"Medium","Document action",a,"Checklist improvement","document_scan")),missingItems:missing,warnings:[],confidence,officialVerificationRequired:true,uploadedAttachmentCount:attachments.length,highSensitivityCount:attachments.filter((a)=>a.sensitivity==="high").length};
}
