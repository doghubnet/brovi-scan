import { NextResponse } from "next/server"; import { analyzeWithGemini } from "@/lib/ai/gemini"; import { programFallback } from "@/lib/scoring";
export async function POST(req:Request){ const input=await req.json(); return NextResponse.json(await analyzeWithGemini("program match readiness", input, programFallback)); }
