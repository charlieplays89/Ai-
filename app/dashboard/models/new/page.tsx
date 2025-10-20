"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { createModel } from "@/app/actions/models"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"

const baseModels = [
  { id: "gpt-5", name: "GPT-5", provider: "OpenAI", description: "Most capable model for complex reasoning" },
  {
    id: "claude-4.5",
    name: "Claude 4.5 Sonnet",
    provider: "Anthropic",
    description: "Balanced speed and intelligence",
  },
  { id: "gemini-2.5", name: "Gemini 2.5 Flash", provider: "Google", description: "Fastest model for low-latency" },
]

export default function NewModelPage() {
  const [selectedModel, setSelectedModel] = useState("")
  const [modelName, setModelName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const baseModel = baseModels.find((m) => m.id === selectedModel)
    if (!baseModel) {
      setError("Please select a base model")
      setLoading(false)
      return
    }

    const result = await createModel({
      name: modelName,
      description,
      provider: baseModel.provider,
      modelType: "text",
      baseModel: baseModel.name,
    })

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      router.push("/dashboard/models")
    }
  }

  return (
    <div className="max-w-3xl space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/models">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Deploy New Model</h1>
        <p className="text-muted-foreground">Choose a base model and configure your deployment</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Model Configuration</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="model-name">Model Name</Label>
              <Input
                id="model-name"
                placeholder="my-custom-model"
                className="mt-2"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                required
              />
              <p className="mt-1 text-xs text-muted-foreground">Choose a unique name for your model deployment</p>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                placeholder="Describe what this model does..."
                rows={3}
                className="w-full px-3 py-2 mt-2 border rounded-lg border-border bg-background"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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
          <h2 className="mb-4 text-lg font-semibold">Deployment Settings</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="region">Region</Label>
              <select id="region" className="w-full px-3 py-2 mt-2 border rounded-lg border-border bg-background">
                <option>US East (N. Virginia)</option>
                <option>US West (Oregon)</option>
                <option>EU (Frankfurt)</option>
                <option>Asia Pacific (Tokyo)</option>
              </select>
            </div>

            <div>
              <Label htmlFor="scaling">Auto-scaling</Label>
              <select id="scaling" className="w-full px-3 py-2 mt-2 border rounded-lg border-border bg-background">
                <option>Enabled (Recommended)</option>
                <option>Disabled</option>
              </select>
              <p className="mt-1 text-xs text-muted-foreground">Automatically scale based on request volume</p>
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" size="lg" disabled={!selectedModel || !modelName || loading}>
            {loading ? "Deploying..." : "Deploy Model"}
          </Button>
          <Link href="/dashboard/models">
            <Button type="button" variant="outline" size="lg">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
