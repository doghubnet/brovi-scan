create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$ select exists (select 1 from public.users_profile where user_id = auth.uid() and role = 'admin') $$;

do $$ declare t text; begin
  foreach t in array array['users_profile','program_profiles','document_reviews','financial_reviews','interview_sessions','final_reports','applications','document_vault_items','tasks','consultant_review_requests','uploads','chat_sessions','chat_messages','user_settings'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "own select %1$s" on public.%1$I', t);
    execute format('drop policy if exists "own insert %1$s" on public.%1$I', t);
    execute format('drop policy if exists "own update %1$s" on public.%1$I', t);
    execute format('drop policy if exists "own delete %1$s" on public.%1$I', t);
    execute format('create policy "own select %1$s" on public.%1$I for select using (auth.uid() = user_id or public.is_admin())', t);
    execute format('create policy "own insert %1$s" on public.%1$I for insert with check (auth.uid() = user_id)', t);
    execute format('create policy "own update %1$s" on public.%1$I for update using (auth.uid() = user_id or public.is_admin()) with check (auth.uid() = user_id or public.is_admin())', t);
    execute format('create policy "own delete %1$s" on public.%1$I for delete using (auth.uid() = user_id or public.is_admin())', t);
  end loop;
end $$;

drop policy if exists "private documents insert" on storage.objects;
drop policy if exists "private documents select" on storage.objects;
drop policy if exists "private documents update" on storage.objects;
drop policy if exists "private documents delete" on storage.objects;
create policy "private documents insert" on storage.objects for insert with check (bucket_id = 'brovi-private-documents' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "private documents select" on storage.objects for select using (bucket_id = 'brovi-private-documents' and (auth.uid()::text = (storage.foldername(name))[1] or public.is_admin()));
create policy "private documents update" on storage.objects for update using (bucket_id = 'brovi-private-documents' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "private documents delete" on storage.objects for delete using (bucket_id = 'brovi-private-documents' and auth.uid()::text = (storage.foldername(name))[1]);
