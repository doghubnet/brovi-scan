"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "@/components/motion/use-reduced-motion-safe";

export function AnimatedProgress({ value, className = "h-2 rounded-full bg-gradient-to-r from-royal to-cyan" }: { value: number; className?: string }) {
  const reduced = useReducedMotionSafe();
  return <motion.div className={className} initial={{ width: reduced ? `${value}%` : 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 0.82, ease: [0.22, 1, 0.36, 1] }} />;
}
