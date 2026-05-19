import { aiDailyDocumentReviewLimit, aiDailyFreeSupportLimit } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { AIProviderName, AITaskType } from "@/lib/ai/types";

export async function checkAIUsageLimit(userId: string | undefined, taskType: AITaskType) {
  if (!userId) return { allowed: true };
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { allowed: true };
  const since = new Date(); since.setUTCHours(0,0,0,0);
  const { count } = await supabase.from("ai_usage_logs").select("id", { count: "exact", head: true }).eq("user_id", userId).eq("task_type", taskType).gte("created_at", since.toISOString());
  const limit = taskType === "document_review" ? aiDailyDocumentReviewLimit : aiDailyFreeSupportLimit;
  return { allowed: (count ?? 0) < limit };
}

export async function recordAIUsage(userId: string | undefined, taskType: AITaskType, provider: AIProviderName, success: boolean) {
  if (!userId) return;
  const supabase = await createServerSupabaseClient();
  if (!supabase) return;
  await supabase.from("ai_usage_logs").insert({ user_id: userId, task_type: taskType, provider, success });
}
