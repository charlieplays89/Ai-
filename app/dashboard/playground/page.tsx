"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Play, Copy, Trash2 } from "lucide-react"
import { useState } from "react"

export default function PlaygroundPage() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [temperature, setTemperature] = useState([0.7])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">AI Playground</h1>
        <p className="text-muted-foreground">Test and experiment with your AI models</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Settings Panel */}
        <Card className="p-6 lg:col-span-1">
          <h2 className="mb-4 text-lg font-semibold">Settings</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Model</Label>
              <Select defaultValue="gpt-4">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="custom-1">customer-support-v2</SelectItem>
                  <SelectItem value="custom-2">content-generator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Temperature</Label>
                <span className="text-sm text-muted-foreground">{temperature[0]}</span>
              </div>
              <Slider value={temperature} onValueChange={setTemperature} min={0} max={2} step={0.1} />
            </div>

            <div className="space-y-2">
              <Label>Max Tokens</Label>
              <Select defaultValue="2048">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="512">512</SelectItem>
                  <SelectItem value="1024">1024</SelectItem>
                  <SelectItem value="2048">2048</SelectItem>
                  <SelectItem value="4096">4096</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>System Prompt</Label>
              <Textarea placeholder="You are a helpful assistant..." className="min-h-[100px]" />
            </div>
          </div>
        </Card>

        {/* Playground Panel */}
        <Card className="p-6 lg:col-span-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Prompt</Label>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  Clear
                </Button>
              </div>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                className="min-h-[200px]"
              />
            </div>

            <Button className="w-full gap-2">
              <Play className="w-4 h-4" />
              Generate Response
            </Button>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Response</Label>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>
              <Card className="p-4 min-h-[200px] bg-muted/50">
                {response ? (
                  <p className="text-sm">{response}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">Response will appear here...</p>
                )}
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
