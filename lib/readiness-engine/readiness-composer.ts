import { clampScore, scoreToReadinessLabel, scoreToRiskLevel } from "@/lib/local-intelligence";
import { buildActionPlan } from "./action-plan";
export function composeReadinessLocally(input:any){
 const m={program:input.programScore,document:input.documentScore,financial:input.financialScore,interview:input.interviewScore};
 const present=Object.entries(m).filter(([,v])=>typeof v==="number") as Array<[string,number]>;
 const missing=Object.entries(m).filter(([,v])=>typeof v!=="number").map(([k])=>k);
 const overall=present.length?clampScore(present.reduce((s,[,v])=>s+v,0)/present.length):0;
 return { overallScore:overall, reportStatus:missing.length?"partial":"full", missingModules:missing, summary:missing.length?"Complete all modules for full report":"Full readiness report generated", topStrengths: overall>=75?["Balanced readiness across completed modules"]:["Core modules completed"], topRisks: overall<60?["High readiness gaps remain"]:["Continue official verification"], criticalMissingItems:missing, officialVerificationReminders:["Official requirements must be verified before submission."], nextActions:buildActionPlan(missing), timelineRecommendation:overall>=75?"2-4 weeks":"4-8 weeks", confidence:Math.min(95, 55+present.length*10), readinessLabel:scoreToReadinessLabel(overall), riskLevel:scoreToRiskLevel(overall) };
}
