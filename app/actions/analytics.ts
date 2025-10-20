"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function trackCost(formData: {
  modelId?: string
  serviceType: string
  amount: number
  description?: string
  metadata?: Record<string, any>
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
    .from("cost_records")
    .insert({
      model_id: formData.modelId || null,
      service_type: formData.serviceType,
      amount: formData.amount,
      description: formData.description || null,
      metadata: formData.metadata || {},
      user_id: user.id,
      team_id: formData.teamId || null,
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error tracking cost:", error)
    return { error: error.message }
  }

  return { data }
}

export async function getCostAnalytics(timeRange: "day" | "week" | "month" | "year" = "month") {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const now = new Date()
  const startDate = new Date()

  switch (timeRange) {
    case "day":
      startDate.setDate(now.getDate() - 1)
      break
    case "week":
      startDate.setDate(now.getDate() - 7)
      break
    case "month":
      startDate.setMonth(now.getMonth() - 1)
      break
    case "year":
      startDate.setFullYear(now.getFullYear() - 1)
      break
  }

  const { data, error } = await supabase
    .from("cost_records")
    .select("*")
    .eq("user_id", user.id)
    .gte("created_at", startDate.toISOString())
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching cost analytics:", error)
    return { error: error.message }
  }

  const totalCost = data.reduce((sum, record) => sum + Number(record.amount), 0)

  const costByService = data.reduce(
    (acc, record) => {
      acc[record.service_type] = (acc[record.service_type] || 0) + Number(record.amount)
      return acc
    },
    {} as Record<string, number>,
  )

  return {
    data: {
      totalCost,
      costByService,
      records: data,
    },
  }
}

export async function logAPIRequest(formData: {
  apiKeyId: string
  modelId?: string
  endpoint: string
  method: string
  statusCode: number
  latencyMs?: number
  tokensUsed?: number
  cost?: number
}) {
  const supabase = await getSupabaseServerClient()

  const { error } = await supabase.from("api_logs").insert({
    api_key_id: formData.apiKeyId,
    model_id: formData.modelId || null,
    endpoint: formData.endpoint,
    method: formData.method,
    status_code: formData.statusCode,
    latency_ms: formData.latencyMs || null,
    tokens_used: formData.tokensUsed || null,
    cost: formData.cost || null,
  })

  if (error) {
    console.error("[v0] Error logging API request:", error)
    return { error: error.message }
  }

  await supabase.from("api_keys").update({ last_used_at: new Date().toISOString() }).eq("id", formData.apiKeyId)

  return { success: true }
}

export async function getAPILogs(limit = 100) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { data, error } = await supabase
    .from("api_logs")
    .select(
      `
      *,
      api_keys!inner(user_id)
    `,
    )
    .eq("api_keys.user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("[v0] Error fetching API logs:", error)
    return { error: error.message }
  }

  return { data }
}

export async function createWebhook(formData: {
  name: string
  url: string
  events: string[]
  secret: string
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
    .from("webhooks")
    .insert({
      name: formData.name,
      url: formData.url,
      events: formData.events,
      secret: formData.secret,
      user_id: user.id,
      team_id: formData.teamId || null,
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error creating webhook:", error)
    return { error: error.message }
  }

  return { data }
}

export async function toggleWebhook(webhookId: string, isActive: boolean) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase
    .from("webhooks")
    .update({ is_active: isActive })
    .eq("id", webhookId)
    .eq("user_id", user.id)

  if (error) {
    console.error("[v0] Error toggling webhook:", error)
    return { error: error.message }
  }

  return { success: true }
}

export async function deleteWebhook(webhookId: string) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase.from("webhooks").delete().eq("id", webhookId).eq("user_id", user.id)

  if (error) {
    console.error("[v0] Error deleting webhook:", error)
    return { error: error.message }
  }

  return { success: true }
}
