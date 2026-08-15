import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { forest: "#071F1A", "dark-green": "#0D332B", green: "#123E35", sage: "#8FAFA5", "soft-sage": "#DCE7E3", canvas: "#F7F7F5", ink: "#17201D", muted: "#7A8581", line: "#E3E9E6" } } },
  plugins: []
} satisfies Config;
