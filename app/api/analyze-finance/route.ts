import { NextResponse } from "next/server";
import { analyzeFinancialLocally } from "@/lib/financial-analysis";
import { containsForbiddenSensitiveSecret } from "@/lib/local-intelligence";

export async function POST(req: Request) {
  const input = await req.json();
  if (containsForbiddenSensitiveSecret(JSON.stringify(input))) return NextResponse.json({ warning: "Remove private credentials and retry." }, { status: 400 });
  const result = analyzeFinancialLocally(input);
  return NextResponse.json({ provider: "local", usedExternalAI: false, ...result });
}
