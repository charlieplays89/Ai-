"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Plus,
  Search,
  MoreVertical,
  Star,
  Copy,
  Edit,
  Trash2,
  TrendingUp,
  Clock,
  Tag,
  Share2,
  History,
} from "lucide-react"

export default function PromptsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const prompts = [
    {
      id: 1,
      title: "Customer Support Response",
      content: "You are a helpful customer support agent. Respond to the following inquiry with empathy and clarity...",
      category: "Support",
      tags: ["customer-service", "empathy"],
      starred: true,
      uses: 1247,
      avgScore: 9.2,
      lastUsed: "2 hours ago",
      versions: 3,
    },
    {
      id: 2,
      title: "Code Review Assistant",
      content: "Review the following code for best practices, potential bugs, and suggest improvements...",
      category: "Development",
      tags: ["code", "review"],
      starred: false,
      uses: 892,
      avgScore: 8.8,
      lastUsed: "1 day ago",
      versions: 5,
    },
    {
      id: 3,
      title: "Marketing Copy Generator",
      content:
        "Create compelling marketing copy for the following product, focusing on benefits and emotional appeal...",
      category: "Marketing",
      tags: ["copywriting", "marketing"],
      starred: true,
      uses: 634,
      avgScore: 9.0,
      lastUsed: "3 hours ago",
      versions: 2,
    },
    {
      id: 4,
      title: "Data Analysis Summary",
      content: "Analyze the following dataset and provide key insights, trends, and actionable recommendations...",
      category: "Analytics",
      tags: ["data", "analysis"],
      starred: false,
      uses: 421,
      avgScore: 8.5,
      lastUsed: "5 days ago",
      versions: 1,
    },
  ]

  const categories = ["All", "Support", "Development", "Marketing", "Analytics"]

  const promptHistory = [
    {
      id: 1,
      prompt: "Customer Support Response",
      model: "GPT-4",
      timestamp: "2024-03-20 14:30",
      score: 9.5,
      tokens: 234,
    },
    {
      id: 2,
      prompt: "Code Review Assistant",
      model: "Claude 3 Opus",
      timestamp: "2024-03-20 12:15",
      score: 8.8,
      tokens: 456,
    },
    {
      id: 3,
      prompt: "Marketing Copy Generator",
      model: "GPT-4",
      timestamp: "2024-03-20 10:45",
      score: 9.2,
      tokens: 189,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Prompt Library</h1>
          <p className="text-muted-foreground">Organize and optimize your AI prompts</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Prompt
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Prompt</DialogTitle>
              <DialogDescription>Save a reusable prompt template to your library</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="e.g., Customer Support Response" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input placeholder="e.g., Support, Development, Marketing" />
              </div>
              <div className="space-y-2">
                <Label>Tags</Label>
                <Input placeholder="Add tags separated by commas" />
              </div>
              <div className="space-y-2">
                <Label>Prompt Content</Label>
                <Textarea placeholder="Enter your prompt template..." rows={8} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateOpen(false)}>Save Prompt</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="library" className="space-y-6">
        <TabsList>
          <TabsTrigger value="library">My Library</TabsTrigger>
          <TabsTrigger value="history">Usage History</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button key={category} variant="outline" size="sm">
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Prompts Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {prompts.map((prompt) => (
              <Card key={prompt.id} className="transition-colors hover:border-accent">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{prompt.title}</CardTitle>
                        {prompt.starred && <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{prompt.category}</Badge>
                        {prompt.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="gap-1">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <History className="w-4 h-4 mr-2" />
                          View Versions
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed line-clamp-2 text-muted-foreground">{prompt.content}</p>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="w-3 h-3" />
                        Uses
                      </div>
                      <p className="text-sm font-semibold">{prompt.uses.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3 h-3" />
                        Avg Score
                      </div>
                      <p className="text-sm font-semibold">{prompt.avgScore}/10</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        Last Used
                      </div>
                      <p className="text-sm font-semibold">{prompt.lastUsed}</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    Use Prompt
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Usage</CardTitle>
              <CardDescription>Track how your prompts are being used</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {promptHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{item.prompt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Model: {item.model}</span>
                        <span>•</span>
                        <span>{item.timestamp}</span>
                        <span>•</span>
                        <span>{item.tokens} tokens</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="gap-1">
                      <Star className="w-3 h-3" />
                      {item.score}/10
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Total Prompts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{prompts.length}</p>
                <p className="text-sm text-muted-foreground">Across {categories.length - 1} categories</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Total Uses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">3,194</p>
                <p className="text-sm text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Avg Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">8.9/10</p>
                <p className="text-sm text-muted-foreground">Quality score</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Prompts</CardTitle>
              <CardDescription>Based on usage and quality scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {prompts
                  .sort((a, b) => b.avgScore - a.avgScore)
                  .slice(0, 3)
                  .map((prompt, index) => (
                    <div key={prompt.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/20">
                        <span className="font-bold text-accent">#{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{prompt.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {prompt.uses.toLocaleString()} uses • {prompt.avgScore}/10 score
                        </p>
                      </div>
                      <Badge variant="outline">{prompt.category}</Badge>
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
