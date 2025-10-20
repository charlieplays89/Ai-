import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Pause, Settings, Copy, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function ModelDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/models">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">customer-support-v2</h1>
            <Badge className="bg-accent/10 text-accent hover:bg-accent/20">Active</Badge>
          </div>
          <p className="text-muted-foreground">Fine-tuned GPT-5 model for customer support</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Pause className="w-4 h-4" />
            Pause
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <p className="mb-1 text-sm text-muted-foreground">Total Requests</p>
          <p className="text-2xl font-bold">45.2K</p>
          <p className="text-xs text-muted-foreground">+12% from last week</p>
        </Card>
        <Card className="p-6">
          <p className="mb-1 text-sm text-muted-foreground">Avg Latency</p>
          <p className="text-2xl font-bold">120ms</p>
          <p className="text-xs text-muted-foreground">-5ms from last week</p>
        </Card>
        <Card className="p-6">
          <p className="mb-1 text-sm text-muted-foreground">Success Rate</p>
          <p className="text-2xl font-bold">99.8%</p>
          <p className="text-xs text-muted-foreground">+0.2% from last week</p>
        </Card>
        <Card className="p-6">
          <p className="mb-1 text-sm text-muted-foreground">Total Cost</p>
          <p className="text-2xl font-bold">$89.50</p>
          <p className="text-xs text-muted-foreground">This month</p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Model Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Base Model</p>
                <p className="font-medium">GPT-5</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Model ID</p>
                <p className="font-medium font-mono text-sm">model_abc123xyz</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Created</p>
                <p className="font-medium">January 15, 2025</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Last Deployed</p>
                <p className="font-medium">2 hours ago</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Training Dataset</p>
                <p className="font-medium">customer-support-data-v2.jsonl</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Training Epochs</p>
                <p className="font-medium">3</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Performance Metrics</h2>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">Performance chart placeholder</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">API Endpoint</h2>
            <div className="p-4 mb-4 rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <code className="text-sm">https://api.modelforge.ai/v1/models/customer-support-v2</code>
                <Button variant="ghost" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Link href="#">
              <Button variant="outline" className="gap-2 bg-transparent">
                <ExternalLink className="w-4 h-4" />
                View API Documentation
              </Button>
            </Link>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Example Request</h2>
            <div className="p-4 overflow-x-auto rounded-lg bg-muted/50">
              <pre className="text-sm">
                <code>{`curl https://api.modelforge.ai/v1/models/customer-support-v2 \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "How do I reset my password?",
    "max_tokens": 150
  }'`}</code>
              </pre>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Recent Requests</h2>
            <div className="space-y-3">
              {[
                { time: "2 minutes ago", status: "200", latency: "115ms" },
                { time: "5 minutes ago", status: "200", latency: "122ms" },
                { time: "8 minutes ago", status: "200", latency: "118ms" },
                { time: "12 minutes ago", status: "429", latency: "—" },
                { time: "15 minutes ago", status: "200", latency: "125ms" },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={log.status === "200" ? "default" : "destructive"}
                      className={log.status === "200" ? "bg-accent/10 text-accent hover:bg-accent/20" : ""}
                    >
                      {log.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{log.time}</span>
                  </div>
                  <span className="text-sm font-medium">{log.latency}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Model Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Model Name</label>
                <input
                  type="text"
                  defaultValue="customer-support-v2"
                  className="w-full px-3 py-2 border rounded-lg border-border bg-background"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Description</label>
                <textarea
                  defaultValue="Fine-tuned GPT-5 model for customer support"
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg border-border bg-background"
                />
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>

          <Card className="p-6 border-destructive/50">
            <h2 className="mb-2 text-lg font-semibold text-destructive">Danger Zone</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Irreversible actions that will permanently affect your model
            </p>
            <Button variant="destructive">Delete Model</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
