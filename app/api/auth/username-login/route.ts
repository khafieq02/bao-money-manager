import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  if (typeof username !== "string" || !/^[a-z0-9_]{3,24}$/.test(username) || typeof password !== "string") return NextResponse.json({ error: "Invalid credentials." }, { status: 400 });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !publishableKey || !serviceRoleKey) return NextResponse.json({ error: "Username sign-in has not been configured." }, { status: 503 });
  const admin = createClient(url, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: profile } = await admin.from("profiles").select("id").eq("username", username).maybeSingle();
  if (!profile) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  const { data: userResult, error: userError } = await admin.auth.admin.getUserById(profile.id);
  if (userError || !userResult.user?.email) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  const auth = createClient(url, publishableKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await auth.auth.signInWithPassword({ email: userResult.user.email, password });
  if (error || !data.session) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  return NextResponse.json({ session: { access_token: data.session.access_token, refresh_token: data.session.refresh_token } });
}
