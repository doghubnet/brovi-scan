# AI Providers

Brovi Scan supports OpenAI, Gemini, OpenRouter, and Groq via server-only routing.

## Sensitive-task policy
- Document and bank-statement review use paid/private providers first.
- Free-provider routing is for support chat and FAQ only.
- Never expose provider keys in `NEXT_PUBLIC_*` variables.

## Vercel env variables
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
