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


Multi-provider AI founder setup:
1. Add API keys in Vercel Environment Variables.
2. Do not add provider keys to NEXT_PUBLIC variables.
3. Redeploy after adding variables.
4. Use OpenAI for sensitive document review.
5. Use OpenRouter/Groq/Gemini free only for support chat and FAQ.
6. Keep Supabase document bucket private.
7. Enable RLS.
8. Test all API routes.

Vercel env list:
OPENAI_API_KEY
OPENAI_MODEL
GEMINI_API_KEY
GEMINI_MODEL
OPENROUTER_API_KEY
OPENROUTER_MODEL
GROQ_API_KEY
GROQ_MODEL
AI_PRIMARY_PROVIDER
AI_SECONDARY_PROVIDER
AI_SUPPORT_PRIMARY_PROVIDER
AI_SUPPORT_SECONDARY_PROVIDER
ALLOW_FREE_AI_FOR_SUPPORT
ALLOW_FREE_AI_FOR_DOCUMENT_REVIEW
OPENROUTER_ZDR_REQUIRED
AI_MAX_RETRIES
AI_TIMEOUT_MS
AI_DAILY_FREE_SUPPORT_LIMIT
AI_DAILY_DOCUMENT_REVIEW_LIMIT
DEBUG_AI_LOGGING
