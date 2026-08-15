import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Pill({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "green" }) {
  return <span className={tone === "green" ? "rounded-full bg-soft-sage px-2.5 py-1 text-[11px] font-semibold text-green" : "rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white"}>{children}</span>;
}
export function IconButton({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink ${className}`} {...props}>{children}</button>;
}
