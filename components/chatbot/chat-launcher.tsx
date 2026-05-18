"use client";

import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

export function ChatLauncher({ onClick }: { onClick: () => void }) {
  const reduced = useReducedMotion();
  const [touched, setTouched] = useState(false);
  return <motion.button initial={reduced ? false : { opacity: 0, scale: 0.88, y: 12 }} animate={reduced ? undefined : { opacity: 1, scale: touched ? 1 : [1, 1.04, 1], y: 0 }} transition={{ duration: touched ? 0.2 : 1.8, repeat: touched || reduced ? 0 : Infinity, repeatDelay: 3 }} className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-royal text-white shadow-glow" type="button" onClick={() => { setTouched(true); onClick(); }} aria-label="Open Brovi Assistant"><MessageCircle className="h-6 w-6" /></motion.button>;
}
