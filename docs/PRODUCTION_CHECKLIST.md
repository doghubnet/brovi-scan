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


## Vercel Environment Variables

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
- SUPABASE_SERVICE_ROLE_KEY
- GEMINI_API_KEY
- NEXT_PUBLIC_SITE_URL

After adding or changing variables, deploy again.


OpenAI/Vercel founder setup: set OPENAI_API_KEY and optional OPENAI_MODEL in Vercel environment variables, then redeploy.
Required vars: OPENAI_API_KEY, OPENAI_MODEL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SITE_URL.
