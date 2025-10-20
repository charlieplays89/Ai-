import { type NextRequest, NextResponse } from "next/server"
import { getCostAnalytics } from "@/app/actions/analytics"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const timeRange = (searchParams.get("timeRange") as "day" | "week" | "month" | "year") || "month"

  const result = await getCostAnalytics(timeRange)

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  return NextResponse.json(result.data)
}
