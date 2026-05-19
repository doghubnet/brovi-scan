import { NextResponse } from "next/server";
import { analyzeProgramMatchLocally } from "@/lib/program-match";

export async function POST(req: Request) {
  const input = await req.json();
  const result = analyzeProgramMatchLocally(input);
  return NextResponse.json({ provider: "local", usedExternalAI: false, localScoreSource: true, ...result });
}
