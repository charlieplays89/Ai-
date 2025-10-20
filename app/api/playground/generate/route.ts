import { streamText } from "ai"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { prompt, model, temperature, maxTokens, topP, frequencyPenalty } = await request.json()

  try {
    const result = await streamText({
      model: model || "openai/gpt-4o-mini",
      prompt,
      temperature: temperature || 0.7,
      maxTokens: maxTokens || 500,
      topP: topP || 1,
      frequencyPenalty: frequencyPenalty || 0,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("[v0] Error generating text:", error)
    return new Response("Error generating text", { status: 500 })
  }
}
