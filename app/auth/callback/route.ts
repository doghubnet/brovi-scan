import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { siteUrl } from "@/lib/env";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectBase = requestUrl.origin || siteUrl;
  if (!code) return NextResponse.redirect(`${redirectBase}/login?error=auth-callback`);
  const supabase = await createServerSupabaseClient();
  if (!supabase) return NextResponse.redirect(`${redirectBase}/login?error=auth-callback`);
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(`${redirectBase}/login?error=auth-callback`);
  return NextResponse.redirect(`${redirectBase}/dashboard`);
}
