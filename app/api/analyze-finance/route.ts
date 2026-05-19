import { NextResponse } from "next/server";
import { runAI } from "@/lib/ai/router";

export async function POST(req: Request) {
  const input = await req.json();
  const text = JSON.stringify(input).toLowerCase();
  if (text.includes("password") || text.includes("otp") || text.includes("card number")) return NextResponse.json({ warning: "Remove private credentials and retry." }, { status: 400 });
  const result = await runAI({ taskType: "bank_statement_review", sensitivity: "high", metadata: input, messages: [{ role: "user", content: JSON.stringify(input) }], requireJson: true });
  return NextResponse.json(result.outputJson ?? { warning: result.warning ?? "Unavailable" });
}
