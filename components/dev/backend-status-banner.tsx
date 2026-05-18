import { isProduction, isSupabaseConfigured } from "@/lib/env";

export function BackendStatusBanner() {
  if (isProduction || isSupabaseConfigured) return null;
  return (
    <div className="no-print border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-semibold text-amber-900">
      Developer notice: Supabase env vars are missing. Backend features are disabled locally.
    </div>
  );
}
