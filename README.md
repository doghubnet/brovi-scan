# Brovi Scan

**Brovi Scan: AI Visa Readiness & Program Match Tool** is a free-first Next.js application for international students to review program fit, document readiness, bank statement preparation, interview answers, and an overall readiness report.

> Brovi Scan provides preparation guidance only. The readiness score is not a visa guarantee. Final decisions are made by official embassies, consulates, universities, and immigration authorities.

## Install

```bash
npm install
npm run dev
```

## Environment variables

Copy `.env.example` to `.env.local` and fill:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
```

If `GEMINI_API_KEY` is missing, API routes use deterministic fallback scoring and return: “AI feedback is unavailable. Basic scoring mode is active.”

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Run `supabase/rls.sql` after schema creation.
4. Confirm `brovi-private-uploads` is private.
5. Store uploads under a user-id folder path, for example: `{user_id}/document-scan/passport.pdf`.
6. Promote an admin by setting `users_profile.role = 'admin'` for the admin user.

## Gemini setup

1. Create a Gemini API key in Google AI Studio.
2. Add it as `GEMINI_API_KEY` in `.env.local` and Vercel.
3. AI prompt and JSON enforcement are controlled in `lib/ai/gemini.ts`.

## Vercel deployment

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add all environment variables.
4. Deploy with the default Next.js build command: `npm run build`.

## Important files

- Scoring: `lib/scoring/index.ts`
- AI prompts: `lib/ai/gemini.ts`
- Validation schemas: `lib/validators/schemas.ts`
- Shared copy and seed interview questions: `lib/constants/copy.ts`
- Supabase schema: `supabase/schema.sql`
- RLS policies: `supabase/rls.sql`
- Main UI components: `components/layout`, `components/scores`, `components/forms`, `components/reports`, `components/ui`
- API routes: `app/api/*/route.ts`

## Free-first model

- 1 full report
- 10 interview questions
- 1 program match
- 1 basic document checklist
- Premium placeholder only; no payment integration in version one.
