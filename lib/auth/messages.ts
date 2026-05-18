export function friendlyAuthMessage(error: unknown) {
  const message = String((error as { message?: string })?.message ?? error ?? "").toLowerCase();
  if (!message) return "Something went wrong. Please try again.";
  if (message.includes("email")) return "Please enter a valid email address.";
  if (message.includes("phone")) return "Please enter a valid phone number.";
  if (message.includes("expired")) return "This verification code has expired. Please request a new one.";
  if (message.includes("invalid") || message.includes("token")) return "The verification code is invalid. Please check it and try again.";
  if (message.includes("provider") || message.includes("oauth")) return "This sign-in provider is not available yet. Please try another option.";
  if (message.includes("network") || message.includes("fetch")) return "Network error. Please check your connection and try again.";
  return "Sign in is temporarily unavailable. Please try again later.";
}
