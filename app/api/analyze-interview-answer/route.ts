import { NextResponse } from "next/server";
import { analyzeInterviewAnswerLocally } from "@/lib/interview-analysis";

export async function POST(req: Request) {
  const input = await req.json();
  const result = analyzeInterviewAnswerLocally(input);
  return NextResponse.json({ provider: "local", usedExternalAI: false, ...result });
}
