import { calculateConfidence, scoreToReadinessLabel, scoreToRiskLevel, type AnalysisResult } from "@/lib/local-intelligence";
import { inferCategory } from "./field-alignment";
import { scoreProfile } from "./profile-score";
export function analyzeProgramMatchLocally(input:any): AnalysisResult & { saferDirections:string[]; ambitiousDirections:string[]; officialVerificationQuestions:string[]; academicBand:string } {
 const p=scoreProfile(input); const score=Math.max(0,Math.min(100,p.academic+p.language+p.budget+p.docs+p.career+p.country));
 const category=inferCategory(String(input.field??""));
 const confidence=calculateConfidence({structuredFieldCount:[input.field,input.gpa,input.englishLevel,input.budget,input.targetCountry,input.careerGoal].filter(Boolean).length,requiredFieldCount:8,hasExtractedText:false,hasAttachments:false});
 const safer=[category,"Business and Management","Social Sciences"].slice(0,3); const ambitious=["Engineering","Data Science and AI"].filter((c)=>c!==category);
 return {score,readinessLabel:scoreToReadinessLabel(score),riskLevel:scoreToRiskLevel(score),summary:"Program match generated using local deterministic rules.",evidence:[],recommendations:[{id:"p-1",priority:"High",title:"Verify program requirements",action:"Verify program requirements on the official university website.",reason:"Requirements differ by institution.",module:"program_match"}],missingItems:[],warnings:[],confidence,officialVerificationRequired:true,saferDirections:safer,ambitiousDirections:ambitious,officialVerificationQuestions:["Are prerequisite courses required?","What is the language threshold?","What are tuition and living estimates?"],academicBand: input.gpa?"Provided":"Not clear"};
}
