# Brovi Assistant

Brovi Assistant is the floating AI assistant in Brovi Scan. It helps with program match results, document checklist questions, financial readiness preparation, interview practice, and next tasks.

Rules:
- Provide preparation guidance only.
- Never guarantee visa approval.
- Use readiness score language only.
- Never ask for passwords, card numbers, bank login details, or private credentials.
- Guide users to the correct scan module when needed.
- Save authenticated chat history to `chat_sessions` and `chat_messages`.


OpenAI/Vercel founder setup: set OPENAI_API_KEY and optional OPENAI_MODEL in Vercel environment variables, then redeploy.
Required vars: OPENAI_API_KEY, OPENAI_MODEL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SITE_URL.
