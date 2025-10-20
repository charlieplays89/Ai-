import { type NextRequest, NextResponse } from "next/server"
import { getAPILogs } from "@/app/actions/analytics"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const limit = Number.parseInt(searchParams.get("limit") || "100")

  const result = await getAPILogs(limit)

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  return NextResponse.json({ logs: result.data })
}
