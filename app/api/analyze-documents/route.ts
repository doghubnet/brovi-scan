import { NextResponse } from "next/server";
import { runAI } from "@/lib/ai/router";

export async function POST(req: Request) {
  const input = await req.json();
  if (JSON.stringify(input).toLowerCase().includes("password") || JSON.stringify(input).toLowerCase().includes("otp")) return NextResponse.json({ warning: "Remove private credentials and retry." }, { status: 400 });
  const result = await runAI({ taskType: "document_review", sensitivity: "high", metadata: input, messages: [{ role: "user", content: JSON.stringify(input) }], requireJson: true });
  return NextResponse.json(result.outputJson ?? { warning: result.warning ?? "Unavailable" });
}
