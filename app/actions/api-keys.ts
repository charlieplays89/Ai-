"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import crypto from "crypto"

export async function createAPIKey(formData: {
  name: string
  permissions?: string[]
  expiresAt?: string
  teamId?: string
}) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const apiKey = `mf_${crypto.randomBytes(32).toString("hex")}`
  const keyHash = crypto.createHash("sha256").update(apiKey).digest("hex")
  const keyPrefix = apiKey.substring(0, 10)

  const { data, error } = await supabase
    .from("api_keys")
    .insert({
      name: formData.name,
      key_hash: keyHash,
      key_prefix: keyPrefix,
      permissions: formData.permissions || [],
      expires_at: formData.expiresAt || null,
      user_id: user.id,
      team_id: formData.teamId || null,
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error creating API key:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/api")
  return { data: { ...data, key: apiKey } }
}

export async function revokeAPIKey(keyId: string) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase.from("api_keys").update({ is_active: false }).eq("id", keyId).eq("user_id", user.id)

  if (error) {
    console.error("[v0] Error revoking API key:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/api")
  return { success: true }
}

export async function deleteAPIKey(keyId: string) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase.from("api_keys").delete().eq("id", keyId).eq("user_id", user.id)

  if (error) {
    console.error("[v0] Error deleting API key:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/api")
  return { success: true }
}
