"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline";

function buttonClass(variant: ButtonVariant = "primary") {
  return variant === "primary" ? "btn-primary" : "btn-secondary";
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link href={href} className={cn(buttonClass(variant), "w-full sm:w-auto", className)}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  type = "button",
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
}) {
  return (
    <button type={type} className={cn(buttonClass(variant), "w-full sm:w-auto", className)} {...props}>
      {children}
    </button>
  );
}
