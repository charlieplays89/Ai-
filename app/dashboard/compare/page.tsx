"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Play, Plus, X, Clock, Zap, DollarSign, CheckCircle2, AlertCircle } from "lucide-react"

export default function ComparePage() {
  const [prompt, setPrompt] = useState("Explain quantum computing in simple terms")
  const [selectedModels, setSelectedModels] = useState(["gpt-4", "claude-3-opus"])

  const availableModels = [
    { id: "gpt-4", name: "GPT-4", provider: "OpenAI" },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "OpenAI" },
    { id: "claude-3-opus", name: "Claude 3 Opus", provider: "Anthropic" },
    { id: "claude-3-sonnet", name: "Claude 3 Sonnet", provider: "Anthropic" },
    { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
    { id: "llama-3-70b", name: "Llama 3 70B", provider: "Meta" },
  ]

  const comparisonResults = [
    {
      model: "GPT-4",
      response:
        "Quantum computing is like having a super-powered calculator that can explore many solutions simultaneously...",
      latency: 1.2,
      tokens: 156,
      cost: 0.0234,
      quality: 9.2,
    },
    {
      model: "Claude 3 Opus",
      response: "Think of quantum computing as a fundamentally different approach to processing information...",
      latency: 0.9,
      tokens: 142,
      cost: 0.0189,
      quality: 9.0,
    },
  ]

  const benchmarks = [
    {
      id: 1,
      name: "Customer Support Accuracy",
      description: "Evaluate response quality for support queries",
      models: 4,
      tests: 100,
      status: "completed",
      topModel: "Claude 3 Opus",
      accuracy: 94.5,
      runDate: "2024-03-15",
    },
    {
      id: 2,
      name: "Code Generation Quality",
      description: "Test code completion and generation",
      models: 5,
      tests: 50,
      status: "running",
      topModel: "GPT-4",
      accuracy: 89.2,
      runDate: "2024-03-20",
    },
    {
      id: 3,
      name: "Latency Benchmark",
      description: "Measure response time across models",
      models: 6,
      tests: 200,
      status: "completed",
      topModel: "Gemini Pro",
      accuracy: null,
      runDate: "2024-03-18",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Compare & Evaluate</h1>
          <p className="text-muted-foreground">Test models side-by-side and run automated benchmarks</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Benchmark
        </Button>
      </div>

      <Tabs defaultValue="compare" className="space-y-6">
        <TabsList>
          <TabsTrigger value="compare">Side-by-Side Comparison</TabsTrigger>
          <TabsTrigger value="benchmarks">Automated Benchmarks</TabsTrigger>
          <TabsTrigger value="history">Comparison History</TabsTrigger>
        </TabsList>

        <TabsContent value="compare" className="space-y-6">
          {/* Model Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Models to Compare</CardTitle>
              <CardDescription>Choose 2-4 models to test with the same prompt</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {selectedModels.map((modelId) => {
                  const model = availableModels.find((m) => m.id === modelId)
                  return (
                    <Badge key={modelId} variant="secondary" className="gap-2 px-3 py-1.5">
                      {model?.name}
                      <button
                        onClick={() => setSelectedModels(selectedModels.filter((id) => id !== modelId))}
                        className="hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )
                })}
                {selectedModels.length < 4 && (
                  <Select
                    onValueChange={(value) => {
                      if (!selectedModels.includes(value)) {
                        setSelectedModels([...selectedModels, value])
                      }
                    }}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Add model..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableModels
                        .filter((m) => !selectedModels.includes(m.id))
                        .map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Test Prompt</label>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter a prompt to test across all selected models..."
                  rows={4}
                />
              </div>

              <Button className="w-full" disabled={selectedModels.length < 2}>
                <Play className="w-4 h-4 mr-2" />
                Run Comparison
              </Button>
            </CardContent>
          </Card>

          {/* Comparison Results */}
          <div className="grid gap-6 md:grid-cols-2">
            {comparisonResults.map((result, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{result.model}</CardTitle>
                    <Badge variant="outline" className="gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {result.quality}/10
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm leading-relaxed">{result.response}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        Latency
                      </div>
                      <p className="text-sm font-semibold">{result.latency}s</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Zap className="w-3 h-3" />
                        Tokens
                      </div>
                      <p className="text-sm font-semibold">{result.tokens}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <DollarSign className="w-3 h-3" />
                        Cost
                      </div>
                      <p className="text-sm font-semibold">${result.cost}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automated Benchmarks</CardTitle>
              <CardDescription>Run comprehensive tests across multiple models</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Benchmark</TableHead>
                    <TableHead>Models</TableHead>
                    <TableHead>Tests</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Top Performer</TableHead>
                    <TableHead>Run Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {benchmarks.map((benchmark) => (
                    <TableRow key={benchmark.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <p className="font-medium">{benchmark.name}</p>
                          <p className="text-sm text-muted-foreground">{benchmark.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>{benchmark.models} models</TableCell>
                      <TableCell>{benchmark.tests} tests</TableCell>
                      <TableCell>
                        <Badge variant={benchmark.status === "completed" ? "default" : "secondary"} className="gap-1">
                          {benchmark.status === "completed" ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <AlertCircle className="w-3 h-3" />
                          )}
                          {benchmark.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{benchmark.topModel}</p>
                          {benchmark.accuracy && (
                            <p className="text-sm text-muted-foreground">{benchmark.accuracy}% accuracy</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{benchmark.runDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Benchmark Templates */}
          <div className="grid gap-4 md:grid-cols-3">
            {["Accuracy Test", "Latency Benchmark", "Cost Analysis"].map((template) => (
              <Card key={template} className="transition-colors cursor-pointer hover:border-accent">
                <CardHeader>
                  <CardTitle className="text-base">{template}</CardTitle>
                  <CardDescription>Quick start template</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Comparisons</CardTitle>
              <CardDescription>View your past model comparisons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">GPT-4 vs Claude 3 Opus vs Gemini Pro</p>
                      <p className="text-sm text-muted-foreground">Tested with 5 prompts • 2 hours ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Results
                    </Button>
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
