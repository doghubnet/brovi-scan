import "server-only";

import { createClient } from "@supabase/supabase-js";
import { supabaseServiceRoleKey, supabaseUrl } from "@/lib/env";

export function createAdminClient() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("BROVI Supabase admin credentials are not configured on the server.");
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey, { auth: { persistSession: false } });
}
