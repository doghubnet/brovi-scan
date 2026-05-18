"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AnimatedProgress({ value, className = "h-2 rounded-full bg-gradient-to-r from-royal to-cyan" }: { value: number; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{ width: reduced ? `${value}%` : 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} />;
}
