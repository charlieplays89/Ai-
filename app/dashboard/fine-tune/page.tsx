import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Play, Pause, XCircle } from "lucide-react"

export default function FineTunePage() {
  const jobs = [
    {
      id: 1,
      name: "customer-support-v3",
      baseModel: "GPT-4",
      status: "In Progress",
      progress: 65,
      epochs: "3/5",
      started: "2 hours ago",
      eta: "1 hour",
    },
    {
      id: 2,
      name: "sentiment-analyzer-v2",
      baseModel: "GPT-3.5",
      status: "In Progress",
      progress: 42,
      epochs: "2/5",
      started: "4 hours ago",
      eta: "3 hours",
    },
    {
      id: 3,
      name: "content-generator-v4",
      baseModel: "GPT-4",
      status: "Completed",
      progress: 100,
      epochs: "5/5",
      started: "1 day ago",
      eta: "—",
    },
    {
      id: 4,
      name: "translation-model-v1",
      baseModel: "Custom",
      status: "Failed",
      progress: 28,
      epochs: "1/5",
      started: "3 days ago",
      eta: "—",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Fine-Tuning</h1>
          <p className="text-muted-foreground">Train and customize your AI models</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Fine-Tuning Job
        </Button>
      </div>

      {/* Jobs Grid */}
      <div className="grid gap-4">
        {jobs.map((job) => (
          <Card key={job.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{job.name}</h3>
                    <Badge
                      variant={
                        job.status === "Completed" ? "default" : job.status === "Failed" ? "destructive" : "secondary"
                      }
                    >
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Base Model: {job.baseModel}</p>
                </div>
                <div className="flex gap-2">
                  {job.status === "In Progress" && (
                    <>
                      <Button variant="ghost" size="icon">
                        <Pause className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                  {job.status === "Failed" && (
                    <Button variant="ghost" size="icon">
                      <Play className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              {job.status !== "Failed" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{job.progress}%</span>
                  </div>
                  <Progress value={job.progress} />
                </div>
              )}

              {/* Job Details */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Epochs</p>
                  <p className="font-medium">{job.epochs}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Started</p>
                  <p className="font-medium">{job.started}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ETA</p>
                  <p className="font-medium">{job.eta}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
