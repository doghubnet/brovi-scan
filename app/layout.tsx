import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Brovi Scan: AI Visa Readiness & Program Match Tool", description: "Free-first visa readiness, document, finance, interview, and program match preparation for international students." };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en" suppressHydrationWarning><body className="min-h-screen overflow-x-hidden font-sans antialiased">{children}</body></html>; }
