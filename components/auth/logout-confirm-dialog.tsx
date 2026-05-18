"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

export function LogoutConfirmDialog({ email, loading, onCancel, onConfirm }: { email?: string | null; loading: boolean; onCancel: () => void; onConfirm: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !loading) onCancel();
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])");
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [loading, onCancel]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy/60 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="logout-title" aria-describedby="logout-description">
      <div ref={dialogRef} className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-glow dark:border-white/10 dark:bg-navy">
        <h2 id="logout-title" className="text-xl font-black">Are you sure you want to log out?</h2>
        <p id="logout-description" className="mt-2 muted">{loading ? "Please wait" : `Log out of Brovi Scan${email ? ` as ${email}` : ""}?`}</p>
        {loading ? <div className="mt-5 flex items-center gap-3 rounded-2xl bg-blue-50 p-4 text-royal dark:bg-white/10"><Loader2 className="h-5 w-5 animate-spin" /><div><p className="font-bold">Logging out</p><p className="text-sm">Please wait</p></div></div> : null}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button className="btn-primary" type="button" onClick={onConfirm} disabled={loading}>{loading ? "Logging out" : "Log out"}</button>
          <button ref={cancelRef} className="btn-secondary" type="button" onClick={onCancel} disabled={loading}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
