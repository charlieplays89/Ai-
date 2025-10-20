import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const days = Number.parseInt(searchParams.get("days") || "30")

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  // Get API usage by model
  const { data: apiLogs } = await supabase
    .from("api_logs")
    .select(
      `
      *,
      api_keys!inner(user_id),
      models(name)
    `,
    )
    .eq("api_keys.user_id", user.id)
    .gte("created_at", startDate.toISOString())

  // Group by model
  const usageByModel: Record<string, { requests: number; tokens: number; cost: number }> = {}

  apiLogs?.forEach((log) => {
    const modelName = log.models?.name || "Unknown"
    if (!usageByModel[modelName]) {
      usageByModel[modelName] = { requests: 0, tokens: 0, cost: 0 }
    }
    usageByModel[modelName].requests++
    usageByModel[modelName].tokens += log.tokens_used || 0
    usageByModel[modelName].cost += Number(log.cost) || 0
  })

  // Get daily usage for chart
  const dailyUsage: Record<string, { requests: number; cost: number }> = {}

  apiLogs?.forEach((log) => {
    const date = new Date(log.created_at).toISOString().split("T")[0]
    if (!dailyUsage[date]) {
      dailyUsage[date] = { requests: 0, cost: 0 }
    }
    dailyUsage[date].requests++
    dailyUsage[date].cost += Number(log.cost) || 0
  })

  return NextResponse.json({
    usageByModel,
    dailyUsage,
    totalRequests: apiLogs?.length || 0,
    totalTokens: apiLogs?.reduce((sum, log) => sum + (log.tokens_used || 0), 0) || 0,
    totalCost: apiLogs?.reduce((sum, log) => sum + (Number(log.cost) || 0), 0) || 0,
  })
}
