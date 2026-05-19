"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useReducedMotionSafe } from "@/components/motion/use-reduced-motion-safe";

export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const reduced = useReducedMotionSafe();
  const count = useMotionValue(reduced ? value : 0);
  const rounded = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`);
  useEffect(() => {
    if (reduced) return;
    const controls = animate(count, value, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [count, reduced, value]);
  if (reduced) return <span>{value}{suffix}</span>;
  return <motion.span>{rounded}</motion.span>;
}
