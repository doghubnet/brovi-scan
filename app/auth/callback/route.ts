import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function safeNextPath(value: string | null) {
  if (!value) return "/dashboard";
  return value.startsWith("/") && !value.startsWith("//") ? value : "/dashboard";
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const nextPath = safeNextPath(requestUrl.searchParams.get("next"));
  const base = requestUrl.origin;
  if (!code) return NextResponse.redirect(`${base}/login?error=auth_callback_failed`);

  const supabase = await createServerSupabaseClient();
  if (!supabase) return NextResponse.redirect(`${base}/login?error=auth_callback_failed`);

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(`${base}/login?error=auth_callback_failed`);
  return NextResponse.redirect(`${base}${nextPath}`);
}
