"use client";

import { MessageCircle } from "lucide-react";

export function ChatLauncher({ onClick }: { onClick: () => void }) {
  return <button className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-royal text-white shadow-glow" type="button" onClick={onClick} aria-label="Open Brovi Assistant"><MessageCircle className="h-6 w-6" /></button>;
}
