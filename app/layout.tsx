import type { Metadata } from "next";
import { ChatWidget } from "@/components/chatbot/chat-widget";
import { BackendStatusBanner } from "@/components/dev/backend-status-banner";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brovi Scan: AI Visa Readiness & Program Match Tool",
  description: "Free-first visa readiness, document, finance, interview, and program match preparation for international students.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen overflow-x-hidden bg-soft font-sans antialiased text-navy dark:bg-navy dark:text-white">
        <ThemeProvider><MotionProvider><BackendStatusBanner />{children}<ChatWidget /></MotionProvider></ThemeProvider>
      </body>
    </html>
  );
}
