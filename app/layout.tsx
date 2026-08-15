import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FinanceProvider } from "@/components/finance-store";
import { AuthGate } from "@/components/auth-gate";

export const metadata: Metadata = { title: "Bao — Money Manager", description: "A calm view of your money.", manifest: "/manifest.webmanifest", appleWebApp: { capable: true, statusBarStyle: "default", title: "Bao" }, icons: { icon: "/icon.svg" } };
export const viewport: Viewport = { themeColor: "#071F1A", width: "device-width", initialScale: 1, viewportFit: "cover" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><FinanceProvider><AuthGate>{children}</AuthGate></FinanceProvider></body></html>; }
