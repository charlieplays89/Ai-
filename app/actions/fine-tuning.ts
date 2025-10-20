"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createFineTuningJob(formData: {
  name: string
  baseModel: string
  datasetId?: string
  epochs: number
  learningRate?: number
  batchSize?: number
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
    .from("fine_tuning_jobs")
    .insert({
      name: formData.name,
      base_model: formData.baseModel,
      dataset_id: formData.datasetId || null,
      epochs: formData.epochs,
      learning_rate: formData.learningRate || 0.0001,
      batch_size: formData.batchSize || 32,
      status: "queued",
      user_id: user.id,
      team_id: formData.teamId || null,
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error creating fine-tuning job:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/fine-tune")
  return { data }
}

export async function updateFineTuningJobStatus(
  jobId: string,
  status: "queued" | "running" | "completed" | "failed" | "cancelled",
  progress?: number,
  errorMessage?: string,
) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const updateData: any = {
    status,
    progress: progress !== undefined ? progress : undefined,
    error_message: errorMessage || null,
  }

  if (status === "running" && !progress) {
    updateData.started_at = new Date().toISOString()
  }

  if (status === "completed" || status === "failed") {
    updateData.completed_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from("fine_tuning_jobs")
    .update(updateData)
    .eq("id", jobId)
    .eq("user_id", user.id)
    .select()
    .single()

  if (error) {
    console.error("[v0] Error updating fine-tuning job:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/fine-tune")
  revalidatePath(`/dashboard/fine-tune/${jobId}`)
  return { data }
}

export async function cancelFineTuningJob(jobId: string) {
  return updateFineTuningJobStatus(jobId, "cancelled")
}

export async function deleteFineTuningJob(jobId: string) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase.from("fine_tuning_jobs").delete().eq("id", jobId).eq("user_id", user.id)

  if (error) {
    console.error("[v0] Error deleting fine-tuning job:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/fine-tune")
  return { success: true }
}
