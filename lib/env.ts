export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
export const geminiApiKey = process.env.GEMINI_API_KEY ?? "";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
export const isProduction = process.env.NODE_ENV === "production";
export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);
export const isSupabaseAdminConfigured = Boolean(supabaseUrl && supabaseServiceRoleKey);
export const isGeminiConfigured = Boolean(geminiApiKey);

export function warnIfMissingProductionEnv() {
  if (!isProduction && !isSupabaseConfigured) {
    console.warn("Brovi Scan developer warning: Supabase public variables are missing. Production data features require BROVI Supabase credentials.");
  }
}
