"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createModel(formData: {
  name: string
  description: string
  provider: string
  modelType: string
  baseModel: string
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
    .from("models")
    .insert({
      name: formData.name,
      description: formData.description,
      provider: formData.provider,
      model_type: formData.modelType,
      base_model: formData.baseModel,
      status: "deploying",
      user_id: user.id,
      team_id: formData.teamId || null,
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error creating model:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/models")
  return { data }
}

export async function updateModelStatus(modelId: string, status: "active" | "paused" | "failed") {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { data, error } = await supabase
    .from("models")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", modelId)
    .eq("user_id", user.id)
    .select()
    .single()

  if (error) {
    console.error("[v0] Error updating model:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/models")
  revalidatePath(`/dashboard/models/${modelId}`)
  return { data }
}

export async function deleteModel(modelId: string) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase.from("models").delete().eq("id", modelId).eq("user_id", user.id)

  if (error) {
    console.error("[v0] Error deleting model:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/models")
  return { success: true }
}

export async function getModel(modelId: string) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { data, error } = await supabase.from("models").select("*").eq("id", modelId).eq("user_id", user.id).single()

  if (error) {
    console.error("[v0] Error fetching model:", error)
    return { error: error.message }
  }

  return { data }
}
