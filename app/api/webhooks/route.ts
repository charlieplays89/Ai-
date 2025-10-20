import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { createWebhook } from "@/app/actions/analytics"

export async function GET() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("webhooks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ webhooks: data })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const { name, url, events, secret, teamId } = body

  if (!name || !url || !events || !secret) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const result = await createWebhook({
    name,
    url,
    events,
    secret,
    teamId,
  })

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  return NextResponse.json(result.data, { status: 201 })
}
