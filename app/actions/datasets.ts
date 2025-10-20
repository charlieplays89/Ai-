"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createDataset(formData: {
  name: string
  description?: string
  type: string
  sizeBytes?: number
  rowCount?: number
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
    .from("datasets")
    .insert({
      name: formData.name,
      description: formData.description || null,
      type: formData.type,
      size_bytes: formData.sizeBytes || 0,
      row_count: formData.rowCount || 0,
      tags: formData.tags || [],
      user_id: user.id,
      team_id: formData.teamId || null,
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error creating dataset:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/datasets")
  return { data }
}

export async function updateDataset(
  datasetId: string,
  updates: {
    name?: string
    description?: string
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
    .from("datasets")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", datasetId)
    .eq("user_id", user.id)
    .select()
    .single()

  if (error) {
    console.error("[v0] Error updating dataset:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/datasets")
  return { data }
}

export async function deleteDataset(datasetId: string) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase.from("datasets").delete().eq("id", datasetId).eq("user_id", user.id)

  if (error) {
    console.error("[v0] Error deleting dataset:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/datasets")
  return { success: true }
}

export async function getDatasets() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { data, error } = await supabase
    .from("datasets")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching datasets:", error)
    return { error: error.message }
  }

  return { data }
}
