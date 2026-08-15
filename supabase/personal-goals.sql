-- Run once in the Supabase SQL editor to enable multiple named goals.
create table if not exists public.personal_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  name text not null check (char_length(name) between 1 and 80),
  amount numeric(12,2) not null check (amount > 0),
  created_at timestamptz not null default now()
);

alter table public.personal_goals enable row level security;

drop policy if exists "Users manage only their own personal goals" on public.personal_goals;
create policy "Users manage only their own personal goals"
  on public.personal_goals for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
