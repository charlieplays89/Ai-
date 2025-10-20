import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Play, Pause, Trash2, Settings } from "lucide-react"
import Link from "next/link"

export default function ModelsPage() {
  const models = [
    {
      id: 1,
      name: "customer-support-v2",
      status: "Active",
      type: "GPT-4",
      requests: "45.2K",
      accuracy: "94.2%",
      lastUsed: "2 hours ago",
    },
    {
      id: 2,
      name: "content-generator",
      status: "Active",
      type: "GPT-3.5",
      requests: "32.1K",
      accuracy: "91.8%",
      lastUsed: "5 hours ago",
    },
    {
      id: 3,
      name: "sentiment-analyzer",
      status: "Training",
      type: "Custom",
      requests: "—",
      accuracy: "—",
      lastUsed: "—",
    },
    {
      id: 4,
      name: "code-assistant",
      status: "Active",
      type: "GPT-4",
      requests: "28.5K",
      accuracy: "96.1%",
      lastUsed: "1 hour ago",
    },
    {
      id: 5,
      name: "translation-model",
      status: "Paused",
      type: "Custom",
      requests: "12.3K",
      accuracy: "89.4%",
      lastUsed: "3 days ago",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Models</h1>
          <p className="text-muted-foreground">Manage and deploy your AI models</p>
        </div>
        <Link href="/dashboard/models/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Model
          </Button>
        </Link>
      </div>

      {/* Models Grid */}
      <div className="grid gap-4">
        {models.map((model) => (
          <Card key={model.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{model.name}</h3>
                  <Badge
                    variant={
                      model.status === "Active" ? "default" : model.status === "Training" ? "secondary" : "outline"
                    }
                  >
                    {model.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium">{model.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Requests</p>
                    <p className="font-medium">{model.requests}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                    <p className="font-medium">{model.accuracy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Used</p>
                    <p className="font-medium">{model.lastUsed}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  {model.status === "Paused" ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
