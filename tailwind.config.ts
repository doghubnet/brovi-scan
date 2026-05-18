import type { Config } from "tailwindcss";
const config: Config = { darkMode: ["class"], content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: { colors: { navy: "#08111F", royal: "#2563EB", cyan: "#06B6D4", soft: "#F8FAFC", slateText: "#334155", success: "#16A34A", warning: "#F59E0B", risk: "#DC2626" }, borderRadius: { "2xl": "1rem" }, boxShadow: { glow: "0 24px 70px rgba(37,99,235,.18)" } } }, plugins: [require("tailwindcss-animate")] };
export default config;
