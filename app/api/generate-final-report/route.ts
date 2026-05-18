import { NextResponse } from "next/server"; import { analyzeWithGemini } from "@/lib/ai/gemini"; import { finalFallback } from "@/lib/scoring";
export async function POST(req:Request){ const input=await req.json(); return NextResponse.json(await analyzeWithGemini("final Brovi Scan readiness report", input, finalFallback)); }
