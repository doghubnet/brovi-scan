create table if not exists public.document_attachments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  module text not null default 'document_scan',
  attachment_type_key text not null,
  attachment_label text not null,
  file_name text not null,
  file_type text,
  file_size_bytes bigint,
  storage_path text not null,
  status text not null default 'Uploaded',
  sensitivity text not null default 'medium',
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_document_attachments_user_id on public.document_attachments(user_id);
create index if not exists idx_document_attachments_type on public.document_attachments(attachment_type_key);
create index if not exists idx_document_attachments_created_at on public.document_attachments(created_at);
alter table public.document_attachments enable row level security;
create policy if not exists "document_attachments_select_own" on public.document_attachments for select using (auth.uid() = user_id);
create policy if not exists "document_attachments_insert_own" on public.document_attachments for insert with check (auth.uid() = user_id);
create policy if not exists "document_attachments_update_own" on public.document_attachments for update using (auth.uid() = user_id);
create policy if not exists "document_attachments_delete_own" on public.document_attachments for delete using (auth.uid() = user_id);
-- Founder note: keep bucket private and ensure storage path starts with auth.uid().
