import { NextResponse } from "next/server";
import { analyzeWithAI, canUseAI } from "@/lib/ai/provider";
import { documentFallback } from "@/lib/scoring";

export async function POST(req: Request) {
  const input = await req.json();
  const result = await analyzeWithAI("documents", input, documentFallback);
  if (!canUseAI()) return NextResponse.json({ ...result, warning: "AI review is temporarily unavailable. Basic scoring mode was used." });
  return NextResponse.json(result);
}
