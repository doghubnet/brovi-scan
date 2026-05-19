create table if not exists public.ai_usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  task_type text not null,
  provider text not null,
  success boolean default false,
  created_at timestamptz default now()
);
alter table public.ai_usage_logs enable row level security;
create policy if not exists ai_usage_owner on public.ai_usage_logs for select using (auth.uid() = user_id);
create policy if not exists ai_usage_owner_insert on public.ai_usage_logs for insert with check (auth.uid() = user_id);
