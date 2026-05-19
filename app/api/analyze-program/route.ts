import { NextResponse } from "next/server";
import { runAI } from "@/lib/ai/router";

export async function POST(req: Request) {
  const input = await req.json();
  const result = await runAI({ taskType: "program_match", sensitivity: "medium", metadata: input, messages: [{ role: "user", content: JSON.stringify(input) }], requireJson: true });
  return NextResponse.json(result.outputJson ?? { warning: result.warning ?? "Unavailable" });
}
