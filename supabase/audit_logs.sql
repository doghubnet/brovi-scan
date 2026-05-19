create table if not exists public.audit_logs (
 id uuid primary key default gen_random_uuid(),
 actor_user_id uuid references auth.users(id) on delete set null,
 target_user_id uuid references auth.users(id) on delete set null,
 entity_type text not null,
 entity_id uuid,
 action text not null,
 metadata jsonb default '{}'::jsonb,
 ip_address text,
 user_agent text,
 created_at timestamptz default now()
);
alter table public.audit_logs enable row level security;
create policy if not exists "audit_insert_actor" on public.audit_logs for insert with check (auth.uid() = actor_user_id or actor_user_id is null);
create policy if not exists "audit_select_own" on public.audit_logs for select using (auth.uid() = actor_user_id or auth.uid() = target_user_id);
