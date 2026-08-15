"use client";

import { Download, Share, X } from "lucide-react";
import { useEffect, useState } from "react";

type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> };
export function InstallBao() {
  const [prompt, setPrompt] = useState<InstallEvent | null>(null); const [showIos, setShowIos] = useState(false); const [dismissed, setDismissed] = useState(true);
  useEffect(() => { const ios = /iphone|ipad|ipod/i.test(navigator.userAgent); const standalone = window.matchMedia("(display-mode: standalone)").matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone); setDismissed(window.localStorage.getItem("bao-install-dismissed") === "true" || standalone); setShowIos(ios && !standalone); const capture = (event: Event) => { event.preventDefault(); setPrompt(event as InstallEvent); }; window.addEventListener("beforeinstallprompt", capture); return () => window.removeEventListener("beforeinstallprompt", capture); }, []);
  function close() { window.localStorage.setItem("bao-install-dismissed", "true"); setDismissed(true); }
  async function install() { if (!prompt) return; await prompt.prompt(); await prompt.userChoice; setPrompt(null); close(); }
  if (dismissed || (!prompt && !showIos)) return null;
  return <section className="rounded-[20px] border border-[#B8D0C8] bg-soft-sage p-4"><div className="flex gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-green text-white"><Download size={18}/></span><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><div><p className="text-sm font-semibold text-green">Keep Bao on your home screen</p><p className="mt-1 text-xs leading-5 text-[#315A50]">{prompt ? "Install Bao for a calmer, app-like experience." : <>In Safari, tap <Share className="inline" size={13}/> then choose <strong>Add to Home Screen</strong>.</>}</p></div><button onClick={close} aria-label="Dismiss install prompt" className="grid h-8 w-8 place-items-center rounded-lg text-green hover:bg-white/50"><X size={17}/></button></div>{prompt && <button onClick={install} className="mt-3 min-h-10 rounded-xl bg-forest px-3 text-xs font-semibold text-white">Install Bao</button>}</div></div></section>;
}
