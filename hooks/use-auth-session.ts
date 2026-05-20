"use client";

import { useAuthSessionContext } from "@/components/auth/auth-provider";

export function useAuthSession() {
  return useAuthSessionContext();
}
