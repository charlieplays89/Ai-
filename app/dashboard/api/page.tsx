"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Copy, MoreVertical, Eye, EyeOff, Trash2, CheckCircle2, XCircle, AlertCircle } from "lucide-react"

export default function APIPage() {
  const [showKey, setShowKey] = useState<{ [key: string]: boolean }>({})

  const apiKeys = [
    {
      id: 1,
      name: "Production API Key",
      key: "mf_prod_1a2b3c4d5e6f7g8h9i0j",
      created: "2024-01-15",
      lastUsed: "2 hours ago",
      requests: 45234,
      status: "active",
    },
    {
      id: 2,
      name: "Development Key",
      key: "mf_dev_9z8y7x6w5v4u3t2s1r0q",
      created: "2024-02-20",
      lastUsed: "1 day ago",
      requests: 12456,
      status: "active",
    },
    {
      id: 3,
      name: "Testing Key",
      key: "mf_test_p0o9i8u7y6t5r4e3w2q1",
      created: "2024-03-10",
      lastUsed: "Never",
      requests: 0,
      status: "inactive",
    },
  ]

  const webhooks = [
    {
      id: 1,
      name: "Model Deployment Webhook",
      url: "https://api.example.com/webhooks/deploy",
      events: ["model.deployed", "model.failed"],
      status: "active",
      lastTriggered: "2 hours ago",
      successRate: 99.8,
    },
    {
      id: 2,
      name: "Training Complete Webhook",
      url: "https://api.example.com/webhooks/training",
      events: ["training.completed", "training.failed"],
      status: "active",
      lastTriggered: "1 day ago",
      successRate: 100,
    },
    {
      id: 3,
      name: "Error Notification",
      url: "https://api.example.com/webhooks/errors",
      events: ["error.critical"],
      status: "paused",
      lastTriggered: "5 days ago",
      successRate: 95.2,
    },
  ]

  const logs = [
    {
      id: 1,
      timestamp: "2024-03-20 14:30:45",
      method: "POST",
      endpoint: "/v1/models/gpt-4/completions",
      status: 200,
      latency: 1234,
      tokens: 456,
    },
    {
      id: 2,
      timestamp: "2024-03-20 14:29:12",
      method: "GET",
      endpoint: "/v1/models",
      status: 200,
      latency: 89,
      tokens: 0,
    },
    {
      id: 3,
      timestamp: "2024-03-20 14:28:33",
      method: "POST",
      endpoint: "/v1/fine-tuning/jobs",
      status: 201,
      latency: 234,
      tokens: 0,
    },
    {
      id: 4,
      timestamp: "2024-03-20 14:27:56",
      method: "POST",
      endpoint: "/v1/models/claude-3/completions",
      status: 429,
      latency: 45,
      tokens: 0,
    },
  ]

  const toggleKeyVisibility = (id: number) => {
    setShowKey((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const maskKey = (key: string) => {
    return key.slice(0, 12) + "•".repeat(12)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">API & Developer Tools</h1>
          <p className="text-muted-foreground">Manage API keys, webhooks, and monitor usage</p>
        </div>
      </div>

      <Tabs defaultValue="keys" className="space-y-6">
        <TabsList>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="logs">API Logs</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Manage API keys for programmatic access to your models</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create API Key
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Your API keys for accessing ModelForge services</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requests</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((apiKey) => (
                    <TableRow key={apiKey.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{apiKey.name}</p>
                          <p className="text-xs text-muted-foreground">Created {apiKey.created}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="px-2 py-1 text-xs rounded bg-muted">
                            {showKey[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-6 h-6"
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                          >
                            {showKey[apiKey.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </Button>
                          <Button variant="ghost" size="icon" className="w-6 h-6">
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={apiKey.status === "active" ? "default" : "secondary"}>{apiKey.status}</Badge>
                      </TableCell>
                      <TableCell>{apiKey.requests.toLocaleString()}</TableCell>
                      <TableCell className="text-muted-foreground">{apiKey.lastUsed}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Name</DropdownMenuItem>
                            <DropdownMenuItem>View Usage</DropdownMenuItem>
                            <DropdownMenuItem>Rotate Key</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Revoke
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Total Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">57,690</p>
                <p className="text-sm text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">99.2%</p>
                <p className="text-sm text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Avg Latency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">234ms</p>
                <p className="text-sm text-muted-foreground">-12ms from last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Configure webhooks to receive real-time notifications</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Webhook
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>Receive notifications when events occur</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Events</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webhooks.map((webhook) => (
                    <TableRow key={webhook.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{webhook.name}</p>
                          <p className="text-xs text-muted-foreground">Last triggered {webhook.lastTriggered}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs text-muted-foreground">{webhook.url}</code>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {webhook.events.map((event) => (
                            <Badge key={event} variant="outline" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={webhook.status === "active" ? "default" : "secondary"} className="gap-1">
                          {webhook.status === "active" ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <AlertCircle className="w-3 h-3" />
                          )}
                          {webhook.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{webhook.successRate}%</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Test Webhook</DropdownMenuItem>
                            <DropdownMenuItem>View Logs</DropdownMenuItem>
                            <DropdownMenuItem>{webhook.status === "active" ? "Pause" : "Activate"}</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Available Events */}
          <Card>
            <CardHeader>
              <CardTitle>Available Events</CardTitle>
              <CardDescription>Events you can subscribe to with webhooks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { event: "model.deployed", description: "When a model is successfully deployed" },
                  { event: "model.failed", description: "When a model deployment fails" },
                  { event: "training.started", description: "When fine-tuning begins" },
                  { event: "training.completed", description: "When fine-tuning completes" },
                  { event: "training.failed", description: "When fine-tuning fails" },
                  { event: "error.critical", description: "When a critical error occurs" },
                ].map((item) => (
                  <div key={item.event} className="p-3 border rounded-lg">
                    <code className="text-sm font-semibold">{item.event}</code>
                    <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Request Logs</CardTitle>
              <CardDescription>Monitor your API requests in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Latency</TableHead>
                    <TableHead>Tokens</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-xs text-muted-foreground">{log.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {log.method}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs">{log.endpoint}</code>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={log.status === 200 || log.status === 201 ? "default" : "destructive"}
                          className="gap-1"
                        >
                          {log.status === 200 || log.status === 201 ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.latency}ms</TableCell>
                      <TableCell>{log.tokens > 0 ? log.tokens : "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>Get started with the ModelForge API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Include your API key in the Authorization header of every request:
                </p>
                <pre className="p-4 overflow-x-auto rounded-lg bg-muted">
                  <code className="text-sm">
                    {`curl https://api.modelforge.ai/v1/models \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                  </code>
                </pre>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Generate Completion</h3>
                <p className="text-sm text-muted-foreground">Send a prompt to a model and get a completion:</p>
                <pre className="p-4 overflow-x-auto rounded-lg bg-muted">
                  <code className="text-sm">
                    {`curl https://api.modelforge.ai/v1/models/gpt-4/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Explain quantum computing",
    "max_tokens": 100
  }'`}
                  </code>
                </pre>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">List Models</h3>
                <p className="text-sm text-muted-foreground">Get a list of all available models:</p>
                <pre className="p-4 overflow-x-auto rounded-lg bg-muted">
                  <code className="text-sm">
                    {`curl https://api.modelforge.ai/v1/models \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                  </code>
                </pre>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                View Full Documentation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
