import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { isSupabaseAdminConfigured, supabaseServiceRoleKey, supabaseUrl } from "@/lib/env";

export function createAdminClient() {
  if (!isSupabaseAdminConfigured) return null;
  return createSupabaseClient(supabaseUrl, supabaseServiceRoleKey, { auth: { persistSession: false } });
}
