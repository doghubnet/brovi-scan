import { NextResponse } from "next/server";
import { composeReadinessLocally } from "@/lib/readiness-engine";

export async function POST(req: Request) {
  const input = await req.json();
  const result = composeReadinessLocally(input);
  return NextResponse.json({ provider: "local", usedExternalAI: false, confidence: result.confidence, result });
}
