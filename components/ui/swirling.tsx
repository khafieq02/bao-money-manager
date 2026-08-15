import type { SVGProps } from "react";

export function Swirling({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 64 64" fill="none" className={`animate-[spin_1.1s_linear_infinite] ${className}`} aria-hidden="true" {...props}>
    <path d="M32 7a25 25 0 0 1 21.7 12.5" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    <path d="M57 32a25 25 0 0 1-12.5 21.7" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity=".72" />
    <path d="M32 57A25 25 0 0 1 10.3 44.5" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity=".44" />
    <path d="M7 32A25 25 0 0 1 19.5 10.3" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity=".2" />
  </svg>;
}
