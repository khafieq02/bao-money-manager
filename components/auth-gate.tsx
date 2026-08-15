"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, WalletCards } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useFinance } from "./finance-store";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useFinance();
  if (loading) return <main className="grid min-h-dvh place-items-center bg-canvas"><LoaderCircle className="animate-spin text-green" aria-label="Loading Bao" /></main>;
  if (!user) return <AuthScreen />;
  return <>{children}</>;
}

function AuthScreen() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const normalizedUsername = username.trim().toLowerCase();
    if (mode === "signup") {
      const response = await supabase.auth.signUp({ email, password, options: { data: { username: normalizedUsername } } });
      setBusy(false);
      if (response.error) return setMessage(response.error.message);
      setMessage(!response.data.session ? "Check your email to confirm your account, then sign in." : "You’re in — loading Bao.");
      return;
    }
    try {
      const response = await fetch("/api/auth/username-login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: normalizedUsername, password }) });
      const data = await response.json();
      if (!response.ok || !data.session) throw new Error(data.error);
      const { error } = await supabase.auth.setSession(data.session);
      if (error) throw error;
    } catch {
      setMessage("Your username or password is incorrect.");
      setBusy(false);
      return;
    }
    setBusy(false);
  }

  const usernameField = <label className="mt-5 block text-xs font-semibold tracking-[.08em] text-muted">USERNAME<input required minLength={3} maxLength={24} pattern="[A-Za-z0-9_]+" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value.replace(/[^a-zA-Z0-9_]/g, ""))} placeholder="your_username" className="mt-2 h-12 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none focus:border-sage" /></label>;

  return <main className="auth-marble min-h-dvh overflow-hidden px-5 py-[max(24px,env(safe-area-inset-top))]"><div className="relative mx-auto flex min-h-[calc(100dvh-48px)] max-w-5xl items-center"><section className="hidden max-w-md pr-20 text-white md:block"><span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/25 bg-white/10"><WalletCards size={23} /></span><p className="font-display mt-8 text-3xl font-semibold tracking-tight">bao</p><h1 className="font-display mt-5 text-5xl font-medium leading-[1.08] tracking-tight">A gentler way<br />to manage money.</h1><p className="mt-5 max-w-sm text-sm leading-6 text-soft-sage">Simple tools for everyday spending, saving, and the plans that matter most.</p><div className="mt-12 h-px w-24 bg-sage" /></section><div className="ml-auto flex w-full max-w-sm flex-col justify-end"><div className="mb-8 text-white md:hidden"><span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/25 bg-white/10"><WalletCards size={21} /></span><p className="font-display mt-5 text-3xl font-semibold tracking-tight">bao</p><h1 className="font-display mt-3 max-w-[290px] text-[31px] font-medium leading-[1.08] tracking-tight">Take care of your money, gently.</h1><p className="mt-3 max-w-[275px] text-xs leading-5 text-soft-sage">A quieter, clearer place for everyday decisions.</p><div className="mt-7 h-px w-16 bg-white/50" /></div><form onSubmit={submit} className="rounded-[28px] border border-white/70 bg-white/95 p-5 shadow-2xl shadow-black/25 backdrop-blur sm:p-6"><p className="font-display text-xl font-semibold text-ink">{mode === "signup" ? "Begin with Bao" : "Welcome back"}</p><p className="mt-1 text-sm text-muted">{mode === "signup" ? "Your private space for everyday money." : "Sign in with your username and password."}</p><div className="mt-5 grid grid-cols-2 rounded-xl bg-canvas p-1"><button type="button" onClick={() => { setMode("signup"); setMessage(""); }} className={`min-h-10 rounded-lg text-sm font-semibold ${mode === "signup" ? "bg-white text-ink shadow-sm" : "text-muted"}`}>Create account</button><button type="button" onClick={() => { setMode("login"); setMessage(""); }} className={`min-h-10 rounded-lg text-sm font-semibold ${mode === "login" ? "bg-white text-ink shadow-sm" : "text-muted"}`}>Sign in</button></div>{usernameField}{mode === "signup" && <label className="mt-4 block text-xs font-semibold tracking-[.08em] text-muted">EMAIL<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="mt-2 h-12 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none focus:border-sage" /></label>}<label className="mt-4 block text-xs font-semibold tracking-[.08em] text-muted">PASSWORD<input required minLength={6} type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" className="mt-2 h-12 w-full rounded-xl border border-line bg-white px-3 text-sm text-ink outline-none focus:border-sage" /></label>{message && <p className="mt-4 flex gap-2 rounded-xl bg-soft-sage p-3 text-xs leading-5 text-green"><CheckCircle2 size={16} className="mt-0.5 shrink-0" />{message}</p>}<button disabled={busy} className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-forest text-sm font-semibold text-white shadow-lg shadow-forest/20 disabled:opacity-60">{busy ? <LoaderCircle className="animate-spin" size={18} /> : <>{mode === "signup" ? "Open your money space" : "Sign in"}<ArrowRight size={17} /></>}</button><p className="mt-4 text-center text-[11px] leading-5 text-muted">Your information is private and protected by your account.</p></form></div></div></main>;
}
