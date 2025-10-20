import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get model count
  const { count: modelCount } = await supabase
    .from("models")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  // Get API request count (last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const { data: apiLogs } = await supabase
    .from("api_logs")
    .select(
      `
      *,
      api_keys!inner(user_id)
    `,
    )
    .eq("api_keys.user_id", user.id)
    .gte("created_at", thirtyDaysAgo.toISOString())

  const totalRequests = apiLogs?.length || 0
  const successfulRequests = apiLogs?.filter((log) => log.status_code >= 200 && log.status_code < 300).length || 0
  const successRate = totalRequests > 0 ? (successfulRequests / totalRequests) * 100 : 0

  // Calculate average latency
  const avgLatency =
    apiLogs && apiLogs.length > 0 ? apiLogs.reduce((sum, log) => sum + (log.latency_ms || 0), 0) / apiLogs.length : 0

  // Get fine-tuning job count
  const { count: fineTuningCount } = await supabase
    .from("fine_tuning_jobs")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("status", "running")

  return NextResponse.json({
    metrics: {
      activeModels: modelCount || 0,
      totalRequests,
      successRate: Math.round(successRate * 10) / 10,
      avgLatency: Math.round(avgLatency),
      activeFineTuningJobs: fineTuningCount || 0,
    },
  })
}
