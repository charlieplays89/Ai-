"use client"

import type React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload, FileText } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { createFineTuningJob } from "@/app/actions/fine-tuning"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"

const baseModels = [
  { id: "gpt-5", name: "GPT-5", description: "Best for complex reasoning tasks" },
  { id: "claude-4.5", name: "Claude 4.5 Sonnet", description: "Balanced performance" },
  { id: "gemini-2.5", name: "Gemini 2.5 Flash", description: "Fast and cost-effective" },
]

export default function NewFineTuneJobPage() {
  const [selectedModel, setSelectedModel] = useState("")
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [jobName, setJobName] = useState("")
  const [epochs, setEpochs] = useState(3)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!selectedModel) {
      setError("Please select a base model")
      setLoading(false)
      return
    }

    const result = await createFineTuningJob({
      name: jobName,
      baseModel: selectedModel,
      epochs,
    })

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      router.push("/dashboard/fine-tune")
    }
  }

  return (
    <div className="max-w-3xl space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/fine-tune">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Create Fine-Tuning Job</h1>
        <p className="text-muted-foreground">Train a custom model with your dataset</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Job Configuration</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="job-name">Job Name</Label>
              <Input
                id="job-name"
                placeholder="my-fine-tuned-model"
                className="mt-2"
                value={jobName}
                onChange={(e) => setJobName(e.target.value)}
                required
              />
              <p className="mt-1 text-xs text-muted-foreground">Choose a descriptive name for this training job</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Select Base Model</h2>
          <div className="space-y-3">
            {baseModels.map((model) => (
              <button
                key={model.id}
                type="button"
                onClick={() => setSelectedModel(model.id)}
                className={`w-full p-4 text-left border rounded-lg transition-colors ${
                  selectedModel === model.id ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{model.name}</h3>
                    <p className="text-sm text-muted-foreground">{model.description}</p>
                  </div>
                  {selectedModel === model.id && (
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Training Dataset</h2>
          <div className="space-y-4">
            <div className="p-8 text-center border-2 border-dashed rounded-lg border-border hover:border-accent/50 transition-colors">
              {uploadedFile ? (
                <div className="flex flex-col items-center gap-3">
                  <FileText className="w-12 h-12 text-accent" />
                  <div>
                    <p className="font-medium">{uploadedFile}</p>
                    <p className="text-sm text-muted-foreground">Ready to upload</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setUploadedFile(null)}>
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Upload className="w-12 h-12 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Upload training data</p>
                    <p className="text-sm text-muted-foreground">JSONL format, max 100MB</p>
                  </div>
                  <Button variant="outline" onClick={() => setUploadedFile("training-data.jsonl")}>
                    Choose File
                  </Button>
                </div>
              )}
            </div>

            <div className="p-4 rounded-lg bg-muted/50">
              <h3 className="mb-2 text-sm font-semibold">Dataset Format</h3>
              <p className="mb-3 text-xs text-muted-foreground">
                Your dataset should be in JSONL format with prompt-completion pairs:
              </p>
              <pre className="p-3 overflow-x-auto text-xs rounded bg-background">
                <code>{`{"prompt": "What is AI?", "completion": "AI stands for..."}
{"prompt": "Explain ML", "completion": "Machine learning is..."}`}</code>
              </pre>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Training Parameters</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="epochs">Number of Epochs</Label>
              <Input
                id="epochs"
                type="number"
                value={epochs}
                onChange={(e) => setEpochs(Number.parseInt(e.target.value))}
                min="1"
                max="10"
                className="mt-2"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                More epochs = better learning but higher cost (recommended: 3-5)
              </p>
            </div>

            <div>
              <Label htmlFor="learning-rate">Learning Rate</Label>
              <select
                id="learning-rate"
                className="w-full px-3 py-2 mt-2 border rounded-lg border-border bg-background"
              >
                <option>Auto (Recommended)</option>
                <option>0.0001</option>
                <option>0.0002</option>
                <option>0.0005</option>
              </select>
            </div>

            <div>
              <Label htmlFor="batch-size">Batch Size</Label>
              <select id="batch-size" className="w-full px-3 py-2 mt-2 border rounded-lg border-border bg-background">
                <option>Auto (Recommended)</option>
                <option>4</option>
                <option>8</option>
                <option>16</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-muted/30">
          <h2 className="mb-2 text-lg font-semibold">Estimated Cost</h2>
          <p className="mb-4 text-sm text-muted-foreground">Based on your configuration</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">$12.50</span>
            <span className="text-muted-foreground">estimated</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Final cost may vary based on actual training time and dataset size
          </p>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" size="lg" disabled={!selectedModel || !jobName || loading}>
            {loading ? "Creating Job..." : "Start Training"}
          </Button>
          <Link href="/dashboard/fine-tune">
            <Button type="button" variant="outline" size="lg">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
