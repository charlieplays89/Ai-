import { type NextRequest, NextResponse } from "next/server"
import { toggleWebhook, deleteWebhook } from "@/app/actions/analytics"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json()
  const { isActive } = body

  if (typeof isActive !== "boolean") {
    return NextResponse.json({ error: "isActive must be a boolean" }, { status: 400 })
  }

  const result = await toggleWebhook(params.id, isActive)

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const result = await deleteWebhook(params.id)

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
