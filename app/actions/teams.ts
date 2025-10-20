"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createTeam(formData: { name: string; description?: string }) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { data: team, error: teamError } = await supabase
    .from("teams")
    .insert({
      name: formData.name,
      description: formData.description || null,
      created_by: user.id,
    })
    .select()
    .single()

  if (teamError) {
    console.error("[v0] Error creating team:", teamError)
    return { error: teamError.message }
  }

  const { error: memberError } = await supabase.from("team_members").insert({
    team_id: team.id,
    user_id: user.id,
    role: "owner",
  })

  if (memberError) {
    console.error("[v0] Error adding team member:", memberError)
    return { error: memberError.message }
  }

  revalidatePath("/dashboard/team")
  return { data: team }
}

export async function inviteTeamMember(teamId: string, email: string, role: "admin" | "member" | "viewer") {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { data: membership } = await supabase
    .from("team_members")
    .select("role")
    .eq("team_id", teamId)
    .eq("user_id", user.id)
    .single()

  if (!membership || (membership.role !== "owner" && membership.role !== "admin")) {
    return { error: "Insufficient permissions" }
  }

  revalidatePath("/dashboard/team")
  return { success: true, message: "Invitation sent" }
}

export async function updateTeamMemberRole(
  teamId: string,
  memberId: string,
  role: "owner" | "admin" | "member" | "viewer",
) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { data: membership } = await supabase
    .from("team_members")
    .select("role")
    .eq("team_id", teamId)
    .eq("user_id", user.id)
    .single()

  if (!membership || membership.role !== "owner") {
    return { error: "Only team owners can change roles" }
  }

  const { error } = await supabase.from("team_members").update({ role }).eq("id", memberId).eq("team_id", teamId)

  if (error) {
    console.error("[v0] Error updating member role:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/team")
  return { success: true }
}

export async function removeTeamMember(teamId: string, memberId: string) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { data: membership } = await supabase
    .from("team_members")
    .select("role")
    .eq("team_id", teamId)
    .eq("user_id", user.id)
    .single()

  if (!membership || (membership.role !== "owner" && membership.role !== "admin")) {
    return { error: "Insufficient permissions" }
  }

  const { error } = await supabase.from("team_members").delete().eq("id", memberId).eq("team_id", teamId)

  if (error) {
    console.error("[v0] Error removing team member:", error)
    return { error: error.message }
  }

  revalidatePath("/dashboard/team")
  return { success: true }
}
