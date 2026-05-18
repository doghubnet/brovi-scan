alter table public.applications enable row level security;
alter table public.document_vault_items enable row level security;
alter table public.tasks enable row level security;
alter table public.consultant_review_requests enable row level security;
alter table public.user_settings enable row level security;

do $$ declare t text; begin
  foreach t in array array['applications','document_vault_items','tasks','consultant_review_requests','user_settings'] loop
    execute format('drop policy if exists "Users manage own %1$s" on public.%1$I', t);
    execute format('create policy "Users manage own %1$s" on public.%1$I for all using (auth.uid() = user_id or public.is_admin()) with check (auth.uid() = user_id or public.is_admin())', t);
  end loop;
end $$;

-- Private document files must remain in the existing private bucket with paths scoped by auth.uid().
-- Do not create public select policies for storage.objects.
