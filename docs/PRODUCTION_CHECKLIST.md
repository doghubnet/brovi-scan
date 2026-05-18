# BROVI Production Checklist

- Create Supabase project under the BROVI founder account.
- Run `supabase/production_schema.sql`.
- Run `supabase/production_rls.sql`.
- Verify `brovi-private-documents` is private.
- Add Vercel environment variables.
- Deploy to Vercel.
- Connect custom domain.
- Create founder account from `/login`.
- Promote founder to admin.
- Test auth, scans, report generation, applications, document vault uploads, tasks, consultant requests, assistant chat, and admin dashboard.
