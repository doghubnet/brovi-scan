import { NextResponse } from "next/server";
import { analyzeDocumentsLocally } from "@/lib/document-rules";
import { containsForbiddenSensitiveSecret } from "@/lib/local-intelligence";

export async function POST(req: Request) {
  const input = await req.json();
  if (containsForbiddenSensitiveSecret(JSON.stringify(input))) return NextResponse.json({ warning: "Remove private credentials and retry." }, { status: 400 });
  const result = analyzeDocumentsLocally(input);
  return NextResponse.json({ provider: "local", usedExternalAI: false, ...result });
}
