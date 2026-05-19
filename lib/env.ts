export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const openaiApiKey = process.env.OPENAI_API_KEY ?? "";
export const openaiModel = process.env.OPENAI_MODEL ?? "gpt-5.5-mini";
export const geminiApiKey = process.env.GEMINI_API_KEY ?? "";
export const geminiModel = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
export const openrouterApiKey = process.env.OPENROUTER_API_KEY ?? "";
export const openrouterModel = process.env.OPENROUTER_MODEL ?? "openrouter/auto";
export const groqApiKey = process.env.GROQ_API_KEY ?? "";
export const groqModel = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

export const aiPrimaryProvider = process.env.AI_PRIMARY_PROVIDER ?? "openai";
export const aiSecondaryProvider = process.env.AI_SECONDARY_PROVIDER ?? "gemini";
export const aiSupportPrimaryProvider = process.env.AI_SUPPORT_PRIMARY_PROVIDER ?? "openrouter";
export const aiSupportSecondaryProvider = process.env.AI_SUPPORT_SECONDARY_PROVIDER ?? "groq";

export const allowFreeAIForSupport = process.env.ALLOW_FREE_AI_FOR_SUPPORT !== "false";
export const allowFreeAIForDocumentReview = process.env.ALLOW_FREE_AI_FOR_DOCUMENT_REVIEW === "true";
export const openrouterZdrRequired = process.env.OPENROUTER_ZDR_REQUIRED !== "false";

export const aiMaxRetries = Number(process.env.AI_MAX_RETRIES ?? "2");
export const aiTimeoutMs = Number(process.env.AI_TIMEOUT_MS ?? "25000");
export const aiDailyFreeSupportLimit = Number(process.env.AI_DAILY_FREE_SUPPORT_LIMIT ?? "10");
export const aiDailyDocumentReviewLimit = Number(process.env.AI_DAILY_DOCUMENT_REVIEW_LIMIT ?? "3");
export const debugAILogging = process.env.DEBUG_AI_LOGGING === "true";

export const isSupabaseConfigured = Boolean(supabaseUrl) && Boolean(supabasePublishableKey);
export const isSupabaseAdminConfigured = Boolean(supabaseUrl) && Boolean(supabaseServiceRoleKey);
export const isOpenAIConfigured = Boolean(openaiApiKey);
export const isGeminiConfigured = Boolean(geminiApiKey);
export const isOpenRouterConfigured = Boolean(openrouterApiKey);
export const isGroqConfigured = Boolean(groqApiKey);
export const isProduction = process.env.NODE_ENV === "production";
