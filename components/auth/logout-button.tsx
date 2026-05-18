"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogoutConfirmDialog } from "@/components/auth/logout-confirm-dialog";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton({ className = "text-royal", email }: { className?: string; email?: string | null }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  async function signOut() {
    setLoading(true);
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  }
  return (
    <>
      <button className={className} type="button" onClick={() => setOpen(true)}>Logout</button>
      {open ? <LogoutConfirmDialog email={email} loading={loading} onCancel={() => setOpen(false)} onConfirm={signOut} /> : null}
    </>
  );
}
