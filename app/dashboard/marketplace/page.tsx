"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Star, Download, DollarSign, Cpu, Database, FileText, TrendingUp, Award, Users } from "lucide-react"

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const featuredModels = [
    {
      id: 1,
      name: "Customer Support GPT",
      description: "Fine-tuned model for customer service conversations with 95% accuracy",
      author: "Sarah Chen",
      authorAvatar: "SC",
      price: 49.99,
      rating: 4.8,
      downloads: 1234,
      category: "Support",
      verified: true,
    },
    {
      id: 2,
      name: "Code Review Assistant",
      description: "Specialized model for reviewing Python, JavaScript, and TypeScript code",
      author: "Mike Johnson",
      authorAvatar: "MJ",
      price: 79.99,
      rating: 4.9,
      downloads: 892,
      category: "Development",
      verified: true,
    },
    {
      id: 3,
      name: "Legal Document Analyzer",
      description: "Extract key information from legal contracts and documents",
      author: "Emily Davis",
      authorAvatar: "ED",
      price: 99.99,
      rating: 4.7,
      downloads: 567,
      category: "Legal",
      verified: false,
    },
  ]

  const templates = [
    {
      id: 1,
      name: "Chatbot Starter Kit",
      description: "Complete setup for building conversational AI with pre-configured prompts",
      author: "John Doe",
      authorAvatar: "JD",
      price: 0,
      rating: 4.6,
      downloads: 2341,
      category: "Template",
    },
    {
      id: 2,
      name: "Image Classification Pipeline",
      description: "End-to-end workflow for training and deploying image classifiers",
      author: "Sarah Chen",
      authorAvatar: "SC",
      price: 29.99,
      rating: 4.8,
      downloads: 1456,
      category: "Template",
    },
    {
      id: 3,
      name: "Sentiment Analysis System",
      description: "Ready-to-use sentiment analysis with fine-tuning examples",
      author: "Mike Johnson",
      authorAvatar: "MJ",
      price: 0,
      rating: 4.5,
      downloads: 1823,
      category: "Template",
    },
  ]

  const communityDatasets = [
    {
      id: 1,
      name: "E-commerce Product Reviews",
      description: "100K product reviews with sentiment labels and categories",
      author: "Emily Davis",
      authorAvatar: "ED",
      size: "2.4 GB",
      rating: 4.7,
      downloads: 892,
      category: "Text",
    },
    {
      id: 2,
      name: "Medical Image Dataset",
      description: "Annotated medical images for diagnostic AI training",
      author: "John Doe",
      authorAvatar: "JD",
      size: "15.8 GB",
      rating: 4.9,
      downloads: 456,
      category: "Image",
    },
    {
      id: 3,
      name: "Financial News Corpus",
      description: "10 years of financial news articles with market data",
      author: "Sarah Chen",
      authorAvatar: "SC",
      size: "5.2 GB",
      rating: 4.6,
      downloads: 678,
      category: "Text",
    },
  ]

  const topCreators = [
    {
      name: "Sarah Chen",
      avatar: "SC",
      items: 12,
      downloads: 5432,
      rating: 4.8,
    },
    {
      name: "Mike Johnson",
      avatar: "MJ",
      items: 8,
      downloads: 3421,
      rating: 4.7,
    },
    {
      name: "Emily Davis",
      avatar: "ED",
      items: 6,
      downloads: 2156,
      rating: 4.6,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <p className="text-muted-foreground">Discover and share AI models, templates, and datasets</p>
        </div>
        <Button>Publish Your Work</Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Cpu className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">Models, templates & datasets</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
            <p className="text-xs text-muted-foreground">+12% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Creators</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">Active contributors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-xs text-muted-foreground">Out of 5.0</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
          <Input
            placeholder="Search models, templates, and datasets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Models", "Templates", "Datasets"].map((filter) => (
            <Button key={filter} variant="outline" size="sm">
              {filter}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="models" className="space-y-6">
        <TabsList>
          <TabsTrigger value="models">Fine-Tuned Models</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="datasets">Community Datasets</TabsTrigger>
          <TabsTrigger value="creators">Top Creators</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredModels.map((model) => (
              <Card key={model.id} className="transition-colors hover:border-accent">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary">{model.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-semibold">{model.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{model.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{model.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">{model.authorAvatar}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{model.author}</span>
                    {model.verified && (
                      <Badge variant="outline" className="gap-1 text-xs">
                        <Award className="w-3 h-3" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Download className="w-4 h-4" />
                      <span>{model.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {model.price === 0 ? (
                        <Badge variant="secondary">Free</Badge>
                      ) : (
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span className="font-semibold">{model.price}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button className="w-full">{model.price === 0 ? "Download" : "Purchase"}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.id} className="transition-colors hover:border-accent">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary">{template.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-semibold">{template.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">{template.authorAvatar}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{template.author}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Download className="w-4 h-4" />
                      <span>{template.downloads.toLocaleString()}</span>
                    </div>
                    {template.price === 0 ? (
                      <Badge variant="secondary">Free</Badge>
                    ) : (
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-semibold">{template.price}</span>
                      </div>
                    )}
                  </div>

                  <Button className="w-full">{template.price === 0 ? "Use Template" : "Purchase"}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="datasets" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {communityDatasets.map((dataset) => (
              <Card key={dataset.id} className="transition-colors hover:border-accent">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary">{dataset.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-semibold">{dataset.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{dataset.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{dataset.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">{dataset.authorAvatar}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{dataset.author}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Download className="w-4 h-4" />
                      <span>{dataset.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Database className="w-4 h-4" />
                      <span className="font-semibold">{dataset.size}</span>
                    </div>
                  </div>

                  <Button className="w-full">Download Dataset</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="creators" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
              <CardDescription>Community members sharing the most valuable resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCreators.map((creator, index) => (
                  <div key={creator.name} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/20">
                      <span className="font-bold text-accent">#{index + 1}</span>
                    </div>
                    <Avatar className="w-12 h-12">
                      <AvatarFallback>{creator.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{creator.name}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{creator.items} items</span>
                        <span>•</span>
                        <span>{creator.downloads.toLocaleString()} downloads</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold">{creator.rating}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Your Contributions */}
          <Card>
            <CardHeader>
              <CardTitle>Your Contributions</CardTitle>
              <CardDescription>Share your work with the community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-5 h-5 text-accent" />
                    <span className="font-semibold">0 Models</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Published fine-tuned models</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-accent" />
                    <span className="font-semibold">0 Templates</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Shared project templates</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-5 h-5 text-accent" />
                    <span className="font-semibold">0 Datasets</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Community datasets</p>
                </div>
              </div>
              <Button className="w-full gap-2">
                <TrendingUp className="w-4 h-4" />
                Start Contributing
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
