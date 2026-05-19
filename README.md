# Brovi Scan

**Brovi Scan: AI Visa Readiness & Program Match Tool** is BROVI's production SaaS platform for program matching, document readiness, financial preparation, interview practice, application tracking, task planning, consultant review requests, and AI guidance.

> Brovi Scan provides preparation guidance only. The readiness score is not a visa guarantee. Final decisions are made by official embassies, consulates, universities, and immigration authorities.

## Founder Production Setup

1. Create the Supabase project under the BROVI founder account.
2. Run `supabase/production_schema.sql` in Supabase SQL editor.
3. Run `supabase/production_rls.sql` in Supabase SQL editor.
4. Confirm the private storage bucket `brovi-private-documents` exists and is not public.
5. Add Vercel environment variables from `.env.example`.
6. Deploy to Vercel with `npm run build`.
7. Connect the BROVI custom domain.
8. Create the founder user account at `/login`.
9. Promote founder to admin in Supabase SQL:

```sql
update public.users_profile set role = 'admin' where user_id = '<founder-auth-user-id>';
```

10. Test all production routes and RLS policies.

## Environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
NEXT_PUBLIC_SITE_URL=
```

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` is preferred. `NEXT_PUBLIC_SUPABASE_ANON_KEY` remains supported for legacy compatibility. Never expose `SUPABASE_SERVICE_ROLE_KEY` in client components.

## Local development

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Production data model

Use:
- `supabase/production_schema.sql`
- `supabase/production_rls.sql`

Legacy phase files remain for migration reference only.

## Key files

- Supabase browser client: `lib/supabase/client.ts`
- Supabase server client: `lib/supabase/server.ts`
- Supabase admin client: `lib/supabase/admin.ts`
- Environment validation: `lib/env.ts`
- Scoring: `lib/scoring/index.ts`
- Gemini analysis: `lib/ai/gemini.ts`
- Brovi Assistant prompt: `lib/ai/brovi-assistant-prompt.ts`
- Fallback chat: `lib/ai/fallback-chat.ts`
- Chat API: `app/api/chat/route.ts`
- Chat UI: `components/chatbot/*`

## Acceptance routes

`/`, `/login`, `/dashboard`, `/program-match-scan`, `/document-scan`, `/bank-statement-scan`, `/interview-practice`, `/readiness-report`, `/applications`, `/document-vault`, `/tasks`, `/consultant-review`, `/admin`, `/privacy`, `/terms`.


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

- Country-pack architecture guide: `docs/COUNTRY_DATA_PACKS.md`.
