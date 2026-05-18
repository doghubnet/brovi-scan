import type { AIReport, ScoreInput } from "@/types";
export const outputInstruction = `Return only strict JSON with this shape: {"score": number, "riskLevel": "High Risk" | "Needs Work" | "Moderate" | "Strong" | "Very Strong", "strengths": string[], "weaknesses": string[], "recommendations": string[], "stepByStepPlan": string[], "warning": string}. Do not promise visa approval. State that readiness is preparation guidance only.`;
export async function analyzeWithGemini(kind:string,input:ScoreInput,fallback:(input:ScoreInput)=>AIReport):Promise<AIReport>{
 if(!process.env.GEMINI_API_KEY) return fallback(input);
 const prompt = `You are Brovi Scan, a careful visa preparation and study-abroad readiness assistant. Analyze ${kind}. ${outputInstruction}\nInput:${JSON.stringify(input)}`;
 const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ contents:[{ parts:[{ text: prompt }] }] }) });
 if(!res.ok) return fallback(input);
 const data = await res.json();
 const text = String(data?.candidates?.[0]?.content?.parts?.[0]?.text || "").replace(/```json|```/g,"").trim();
 try { const parsed = JSON.parse(text) as AIReport; return { ...parsed, warning: parsed.warning || "Brovi Scan provides preparation guidance only. The readiness score is not a visa guarantee." }; } catch { return fallback(input); }
}
