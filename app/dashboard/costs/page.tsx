"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Cpu,
  Sparkles,
  Zap,
  Calendar,
  Download,
} from "lucide-react"

export default function CostsPage() {
  const costsByModel = [
    { model: "GPT-4", requests: 12456, cost: 234.56, percentage: 45 },
    { model: "Claude 3 Opus", requests: 8932, cost: 178.23, percentage: 34 },
    { model: "Gemini Pro", requests: 5621, cost: 67.89, percentage: 13 },
    { model: "Llama 3 70B", requests: 3245, cost: 41.32, percentage: 8 },
  ]

  const costsByService = [
    { service: "Model Inference", icon: Cpu, cost: 345.67, change: 12 },
    { service: "Fine-Tuning", icon: Sparkles, cost: 123.45, change: -5 },
    { service: "API Calls", icon: Zap, cost: 52.88, change: 8 },
  ]

  const recentTransactions = [
    {
      id: 1,
      date: "2024-03-20",
      description: "GPT-4 API Usage",
      model: "GPT-4",
      requests: 1234,
      cost: 23.45,
    },
    {
      id: 2,
      date: "2024-03-20",
      description: "Fine-Tuning Job #4521",
      model: "Claude 3 Opus",
      requests: 1,
      cost: 45.67,
    },
    {
      id: 3,
      date: "2024-03-19",
      description: "Gemini Pro API Usage",
      model: "Gemini Pro",
      requests: 892,
      cost: 8.92,
    },
    {
      id: 4,
      date: "2024-03-19",
      description: "Llama 3 70B API Usage",
      model: "Llama 3 70B",
      requests: 456,
      cost: 5.67,
    },
  ]

  const budgetAlerts = [
    {
      id: 1,
      type: "warning",
      message: "GPT-4 usage is at 85% of monthly budget",
      budget: 250,
      current: 212.5,
    },
    {
      id: 2,
      type: "info",
      message: "Fine-tuning costs decreased by 15% this month",
      budget: null,
      current: null,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cost Analytics</h1>
          <p className="text-muted-foreground">Track spending and optimize your AI costs</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Budget Alerts */}
      {budgetAlerts.length > 0 && (
        <div className="space-y-2">
          {budgetAlerts.map((alert) => (
            <Card key={alert.id} className={alert.type === "warning" ? "border-yellow-500/50" : ""}>
              <CardContent className="flex items-center gap-4 p-4">
                <AlertTriangle
                  className={`w-5 h-5 ${alert.type === "warning" ? "text-yellow-500" : "text-blue-500"}`}
                />
                <div className="flex-1">
                  <p className="font-medium">{alert.message}</p>
                  {alert.budget && <Progress value={(alert.current! / alert.budget) * 100} className="mt-2 h-2" />}
                </div>
                {alert.budget && (
                  <div className="text-right">
                    <p className="text-sm font-semibold">${alert.current?.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">of ${alert.budget}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$522.00</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-green-500">+12%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$234.56</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingDown className="w-3 h-3 text-red-500" />
              <span className="text-red-500">-5%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Avg Daily Cost</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$17.40</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Budget Remaining</CardTitle>
            <AlertTriangle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$265.44</div>
            <Progress value={47} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="breakdown" className="space-y-6">
        <TabsList>
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="budgets">Budgets & Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Costs by Model */}
            <Card>
              <CardHeader>
                <CardTitle>Costs by Model</CardTitle>
                <CardDescription>Spending breakdown across AI models</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {costsByModel.map((item) => (
                  <div key={item.model} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.model}</span>
                      <span className="font-semibold">${item.cost.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={item.percentage} className="flex-1 h-2" />
                      <span className="text-xs text-muted-foreground">{item.percentage}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.requests.toLocaleString()} requests</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Costs by Service */}
            <Card>
              <CardHeader>
                <CardTitle>Costs by Service</CardTitle>
                <CardDescription>Spending across different services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {costsByService.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.service} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/20">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium">{item.service}</p>
                          <div className="flex items-center gap-1 text-xs">
                            {item.change > 0 ? (
                              <>
                                <TrendingUp className="w-3 h-3 text-green-500" />
                                <span className="text-green-500">+{item.change}%</span>
                              </>
                            ) : (
                              <>
                                <TrendingDown className="w-3 h-3 text-red-500" />
                                <span className="text-red-500">{item.change}%</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-lg font-bold">${item.cost.toFixed(2)}</p>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Cost Optimization Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Optimization Tips</CardTitle>
              <CardDescription>Recommendations to reduce your spending</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    tip: "Switch to GPT-3.5 Turbo for simple tasks",
                    savings: "Save up to $120/month",
                  },
                  {
                    tip: "Enable response caching for repeated queries",
                    savings: "Save up to $45/month",
                  },
                  {
                    tip: "Use batch processing for non-urgent requests",
                    savings: "Save up to $30/month",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <p className="text-sm">{item.tip}</p>
                    <Badge variant="secondary">{item.savings}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Detailed view of your spending history</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Requests</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                      <TableCell className="font-medium">{transaction.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{transaction.model}</Badge>
                      </TableCell>
                      <TableCell>{transaction.requests.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-semibold">${transaction.cost.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budgets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Management</CardTitle>
              <CardDescription>Set spending limits and receive alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  { name: "Monthly Budget", current: 234.56, limit: 500, percentage: 47 },
                  { name: "GPT-4 Budget", current: 212.5, limit: 250, percentage: 85 },
                  { name: "Fine-Tuning Budget", current: 123.45, limit: 200, percentage: 62 },
                ].map((budget) => (
                  <div key={budget.name} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{budget.name}</h3>
                      <Badge variant={budget.percentage > 80 ? "destructive" : "secondary"}>
                        {budget.percentage}% used
                      </Badge>
                    </div>
                    <Progress value={budget.percentage} className="h-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">${budget.current.toFixed(2)} spent</span>
                      <span className="font-semibold">${budget.limit} limit</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full">Configure Budget Alerts</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
