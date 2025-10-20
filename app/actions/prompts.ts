"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createPrompt(formData: {
  name: string
  content: string
  category?: string
  tags?: string[]
  teamId?: string
}) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { data, error } = await supabase
    .from("prompts")
    .insert({
      name: formData.name,
      content: formData.content,
      category: formData.category || null,
      tags: formData.tags || [],
      user_id: user.id,
      team_id: formData.teamId || null,
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error creating prompt:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/prompts")
  return { data }
}

export async function updatePrompt(
  promptId: string,
  updates: {
    name?: string
    content?: string
    category?: string
    tags?: string[]
  },
) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { data, error } = await supabase
    .from("prompts")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", promptId)
    .eq("user_id", user.id)
    .select()
    .single()

  if (error) {
    console.error("[v0] Error updating prompt:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/prompts")
  return { data }
}

export async function deletePrompt(promptId: string) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase.from("prompts").delete().eq("id", promptId).eq("user_id", user.id)

  if (error) {
    console.error("[v0] Error deleting prompt:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/prompts")
  return { success: true }
}

export async function trackPromptUsage(
  promptId: string,
  modelId: string,
  metrics: {
    qualityScore?: number
    latencyMs?: number
    tokensUsed?: number
    cost?: number
  },
) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase.from("prompt_usage").insert({
    prompt_id: promptId,
    model_id: modelId,
    user_id: user.id,
    quality_score: metrics.qualityScore || null,
    latency_ms: metrics.latencyMs || null,
    tokens_used: metrics.tokensUsed || null,
    cost: metrics.cost || null,
  })

  if (error) {
    console.error("[v0] Error tracking prompt usage:", error)
    return { error: error.message }
  }

  await supabase.rpc("increment_prompt_usage", { prompt_id: promptId })

  return { success: true }
}
