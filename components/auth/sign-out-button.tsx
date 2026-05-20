"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogoutConfirmDialog } from "@/components/auth/logout-confirm-dialog";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton({ className = "text-royal", email }: { className?: string; email?: string | null }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    router.push("/");
    router.refresh();
    setLoading(false);
    setOpen(false);
  }

  return <><button className={className} type="button" onClick={() => setOpen(true)}>Sign out</button>{open ? <LogoutConfirmDialog email={email} loading={loading} onCancel={() => setOpen(false)} onConfirm={signOut} /> : null}</>;
}
