import { NextResponse } from "next/server"; import { analyzeWithGemini } from "@/lib/ai/gemini"; import { financeFallback } from "@/lib/scoring";
export async function POST(req:Request){ const input=await req.json(); return NextResponse.json(await analyzeWithGemini("safe bank statement and financial support readiness", input, financeFallback)); }
