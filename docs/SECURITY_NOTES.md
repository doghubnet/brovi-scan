# Security Notes

- `SUPABASE_SERVICE_ROLE_KEY` is server-only and used only by `lib/supabase/admin.ts`.
- Private documents are stored in `brovi-private-documents`.
- Storage paths must use `{user_id}/{module}/{timestamp}-{safe_filename}`.
- RLS restricts users to their own rows.
- Admin access is controlled through `users_profile.role = 'admin'`.
- Brovi Scan must never request card numbers, bank passwords, bank login details, or private credentials.
- AI routes must not send raw uploaded files to Gemini.
