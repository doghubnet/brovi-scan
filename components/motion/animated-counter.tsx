"use client";

import { animate, useMotionValue, useReducedMotion, useTransform, motion } from "framer-motion";
import { useEffect } from "react";

export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const reduced = useReducedMotion();
  const count = useMotionValue(reduced ? value : 0);
  const rounded = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`);
  useEffect(() => {
    if (reduced) return;
    const controls = animate(count, value, { duration: 0.9, ease: "easeOut" });
    return () => controls.stop();
  }, [count, reduced, value]);
  if (reduced) return <span>{value}{suffix}</span>;
  return <motion.span>{rounded}</motion.span>;
}
