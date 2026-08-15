-- Bao Money Manager: initial authenticated data model
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  name text not null check (char_length(name) between 1 and 120),
  category text not null check (char_length(category) between 1 and 60),
  amount numeric(12,2) not null check (amount > 0),
  type text not null check (type in ('income', 'expense')),
  transaction_date date not null default current_date,
  created_at timestamptz not null default now()
);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade default auth.uid(),
  savings_goal numeric(12,2) not null check (savings_goal > 0),
  updated_at timestamptz not null default now()
);

alter table public.transactions enable row level security;
alter table public.goals enable row level security;

create policy "Users manage only their own transactions"
  on public.transactions for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users manage only their own goals"
  on public.goals for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
