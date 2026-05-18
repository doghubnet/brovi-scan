"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton({ className = "text-royal" }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function signOut() {
    setLoading(true);
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    router.refresh();
    router.push("/login");
  }
  return <button className={className} type="button" onClick={signOut} disabled={loading}>{loading ? "Signing out..." : "Logout"}</button>;
}
