"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Users, Plus, Search, MoreVertical, Crown, Shield, User, Cpu } from "lucide-react"

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Owner",
      joinedAt: "2024-01-15",
      avatar: "JD",
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Chen",
      email: "sarah@example.com",
      role: "Admin",
      joinedAt: "2024-02-20",
      avatar: "SC",
      status: "active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Member",
      joinedAt: "2024-03-10",
      avatar: "MJ",
      status: "active",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "Member",
      joinedAt: "2024-03-25",
      avatar: "ED",
      status: "invited",
    },
  ]

  const workspaces = [
    {
      id: 1,
      name: "Production Models",
      description: "Live models serving customer traffic",
      members: 4,
      models: 8,
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      name: "Research & Development",
      description: "Experimental models and fine-tuning",
      members: 3,
      models: 12,
      lastActivity: "1 day ago",
    },
    {
      id: 3,
      name: "Customer Support AI",
      description: "Chatbot models for support automation",
      members: 2,
      models: 3,
      lastActivity: "3 hours ago",
    },
  ]

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Owner":
        return <Crown className="w-4 h-4 text-yellow-500" />
      case "Admin":
        return <Shield className="w-4 h-4 text-blue-500" />
      default:
        return <User className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground">Manage team members and workspaces</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <Tabs defaultValue="members" className="space-y-6">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="workspaces">Workspaces</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          {/* Search */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Team Members Table */}
          <Card>
            <CardHeader>
              <CardTitle>Team Members ({teamMembers.length})</CardTitle>
              <CardDescription>Manage your team members and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/20">
                            <span className="text-sm font-semibold text-accent">{member.avatar}</span>
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getRoleIcon(member.role)}
                          <span>{member.role}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={member.status === "active" ? "default" : "secondary"}>{member.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{member.joinedAt}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Change Role</DropdownMenuItem>
                            <DropdownMenuItem>View Activity</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workspaces" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Organize your models and datasets into shared workspaces</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Workspace
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workspaces.map((workspace) => (
              <Card key={workspace.id} className="transition-colors cursor-pointer hover:border-accent">
                <CardHeader>
                  <CardTitle className="text-lg">{workspace.name}</CardTitle>
                  <CardDescription>{workspace.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{workspace.members} members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-muted-foreground" />
                      <span>{workspace.models} models</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-xs text-muted-foreground">Active {workspace.lastActivity}</span>
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>Configure what each role can do in your workspace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {["Owner", "Admin", "Member", "Viewer"].map((role) => (
                  <div key={role} className="pb-6 border-b last:border-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getRoleIcon(role)}
                        <div>
                          <h3 className="font-semibold">{role}</h3>
                          <p className="text-sm text-muted-foreground">
                            {role === "Owner" && "Full access to all resources and settings"}
                            {role === "Admin" && "Manage models, datasets, and team members"}
                            {role === "Member" && "Create and manage own models and datasets"}
                            {role === "Viewer" && "Read-only access to shared resources"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-2 pl-7">
                      {["Deploy models", "Fine-tune models", "Manage datasets", "Invite members", "Manage billing"].map(
                        (permission) => (
                          <div key={permission} className="flex items-center gap-2 text-sm">
                            <div
                              className={`w-4 h-4 rounded border ${
                                (role === "Owner" ||
                                  (role === "Admin" && permission !== "Manage billing") ||
                                  (role === "Member" && !["Invite members", "Manage billing"].includes(permission))) &&
                                "bg-accent border-accent"
                              }`}
                            />
                            <span className="text-muted-foreground">{permission}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
