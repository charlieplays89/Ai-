import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Upload, Download, Trash2 } from "lucide-react"

export default function DatasetsPage() {
  const datasets = [
    {
      id: 1,
      name: "customer-conversations",
      size: "2.4 GB",
      records: "125,000",
      format: "JSONL",
      uploaded: "2 days ago",
      status: "Ready",
    },
    {
      id: 2,
      name: "product-reviews",
      size: "1.8 GB",
      records: "89,500",
      format: "CSV",
      uploaded: "1 week ago",
      status: "Ready",
    },
    {
      id: 3,
      name: "training-data-v3",
      size: "3.2 GB",
      records: "200,000",
      format: "JSONL",
      uploaded: "3 days ago",
      status: "Processing",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Datasets</h1>
          <p className="text-muted-foreground">Manage your training and evaluation datasets</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Upload Dataset
        </Button>
      </div>

      {/* Datasets Grid */}
      <div className="grid gap-4">
        {datasets.map((dataset) => (
          <Card key={dataset.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{dataset.name}</h3>
                  <Badge variant={dataset.status === "Ready" ? "default" : "secondary"}>{dataset.status}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Size</p>
                    <p className="font-medium">{dataset.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Records</p>
                    <p className="font-medium">{dataset.records}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Format</p>
                    <p className="font-medium">{dataset.format}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Uploaded</p>
                    <p className="font-medium">{dataset.uploaded}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Upload className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="w-4 h-4" />
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
