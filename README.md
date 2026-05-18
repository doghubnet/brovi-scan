# Brovi Scan

**Brovi Scan: AI Visa Readiness & Program Match Tool** is a free-first Next.js application for international students to review program fit, document readiness, bank statement preparation, interview answers, application inventory, document vault items, task roadmap, and an overall readiness report.

> Brovi Scan provides preparation guidance only. The readiness score is not a visa guarantee. Final decisions are made by official embassies, consulates, universities, and immigration authorities.

## Install and run

```bash
npm install
npm run dev
npm run build
```

## Environment variables

Copy `.env.example` to `.env.local` and fill:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
BROVI_DEMO_ADMIN=true
```

If `GEMINI_API_KEY` is missing, API routes use deterministic fallback scoring and return: “AI feedback is unavailable. Basic scoring mode is active.” If Supabase variables are missing, auth and persistence screens show demo mode.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` and `supabase/rls.sql` for phase 1 tables.
3. Run `supabase/schema_phase2.sql` and `supabase/rls_phase2.sql` for applications, document vault, tasks, consultant requests, and user settings.
4. Confirm `brovi-private-uploads` is private.
5. Store uploads under a user-id folder path, for example: `{user_id}/document-vault/transcript.pdf`.
6. Promote an admin by setting `users_profile.role = 'admin'` for the admin user.

## Gemini setup

1. Create a Gemini API key in Google AI Studio.
2. Add it as `GEMINI_API_KEY` in `.env.local` and Vercel.
3. AI prompt rules live in `lib/ai/prompts.ts`, JSON parsing lives in `lib/ai/json-safe.ts`, and Gemini transport lives in `lib/ai/gemini.ts`.
4. Version two sends user-entered summaries and form fields only, not raw private files.

## Vercel deployment

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add all environment variables.
4. Deploy with the default Next.js build command: `npm run build`.

## Important files

- Scoring: `lib/scoring/index.ts`
- AI prompts: `lib/ai/prompts.ts`
- Gemini integration: `lib/ai/gemini.ts`
- Safe AI JSON parsing: `lib/ai/json-safe.ts`
- Validation schemas: `lib/validators/schemas.ts`
- Shared copy, navigation, and seed interview questions: `lib/constants/copy.ts`
- Theme provider: `components/providers/theme-provider.tsx`
- Theme switcher: `components/theme-toggle.tsx`
- Supabase schema: `supabase/schema.sql`, `supabase/schema_phase2.sql`
- RLS policies: `supabase/rls.sql`, `supabase/rls_phase2.sql`
- Main UI components: `components/layout`, `components/scores`, `components/forms`, `components/reports`, `components/ui`, `components/inventory`
- API routes: `app/api/*/route.ts`

## Pages to test

- `/` landing page with dark/light theme switch and meaningful feature copy.
- `/login` email sign in, sign up, logout, and demo-mode banner.
- `/dashboard` score cards, recommendations, and sidebar navigation.
- `/program-match-scan` validated program readiness scan.
- `/document-scan` dropdown-based document checklist.
- `/bank-statement-scan` safe financial summary scan with numeric validation.
- `/interview-practice` one-question-at-a-time practice and deterministic feedback fallback.
- `/readiness-report` report, chart, print/copy actions, and print-safe CSS.
- `/applications` application tracker board.
- `/document-vault` private-storage document inventory table.
- `/tasks` recommendation roadmap checklist.
- `/consultant-review` BROVI human review request form.
- `/admin` admin sample dashboard and client-safe CSV export.

## Free-first model

- 1 full report
- 10 interview questions
- 1 program match
- 1 basic document checklist
- Premium placeholder only; no payment integration in version one.

## Safety rules

Brovi Scan does not ask for card numbers, bank passwords, bank login details, or private account access. Scores are readiness scores only and must not be described as approval probabilities.
