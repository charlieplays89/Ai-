import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, Zap, Clock } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your AI workspace overview.</p>
        </div>
        <Link href="/dashboard/models/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Model
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Active Models</span>
            <Zap className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">+2 from last month</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">API Requests</span>
            <TrendingUp className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-bold">1.2M</div>
          <p className="text-xs text-muted-foreground">+18% from last month</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Fine-Tuning Jobs</span>
            <Clock className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">2 in progress</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Total Cost</span>
            <TrendingUp className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-bold">$248</div>
          <p className="text-xs text-muted-foreground">This month</p>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Recent Models</h2>
          <div className="space-y-4">
            {[
              { name: "customer-support-v2", status: "Active", requests: "45.2K" },
              { name: "content-generator", status: "Active", requests: "32.1K" },
              { name: "sentiment-analyzer", status: "Training", requests: "—" },
            ].map((model) => (
              <div key={model.name} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{model.name}</p>
                  <p className="text-sm text-muted-foreground">{model.status}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{model.requests}</p>
                  <p className="text-sm text-muted-foreground">requests</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/dashboard/models">
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Models
            </Button>
          </Link>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/dashboard/playground">
              <Button variant="outline" className="justify-start w-full gap-2 bg-transparent">
                <Zap className="w-4 h-4" />
                Open AI Playground
              </Button>
            </Link>
            <Link href="/dashboard/fine-tune">
              <Button variant="outline" className="justify-start w-full gap-2 bg-transparent">
                <TrendingUp className="w-4 h-4" />
                Start Fine-Tuning
              </Button>
            </Link>
            <Link href="/dashboard/models">
              <Button variant="outline" className="justify-start w-full gap-2 bg-transparent">
                <Plus className="w-4 h-4" />
                Deploy New Model
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
