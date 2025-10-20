import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and API configuration</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="Acme Inc." className="mt-2" />
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates about your models</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Usage Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when approaching limits</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">API Keys</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Use these keys to authenticate your API requests. Keep them secure and never share them publicly.
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Production Key</span>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <code className="text-sm">mf_prod_abc123xyz789def456ghi012jkl345</code>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Development Key</span>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <code className="text-sm">mf_dev_xyz789abc123def456ghi012jkl345</code>
              </div>
            </div>
            <Button className="mt-4">Generate New Key</Button>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Current Plan</h2>
            <div className="flex items-center justify-between p-4 rounded-lg bg-accent/5">
              <div>
                <p className="text-lg font-semibold">Pro Plan</p>
                <p className="text-sm text-muted-foreground">$99/month</p>
              </div>
              <Button variant="outline" className="bg-transparent">
                Upgrade
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Usage This Month</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">API Requests</span>
                  <span className="text-sm font-medium">1.2M / 2M</span>
                </div>
                <div className="w-full h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-accent" style={{ width: "60%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Storage</span>
                  <span className="text-sm font-medium">45GB / 100GB</span>
                </div>
                <div className="w-full h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-accent" style={{ width: "45%" }} />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Team Members</h2>
              <Button>Invite Member</Button>
            </div>
            <div className="space-y-3">
              {[
                { name: "John Doe", email: "john@example.com", role: "Owner" },
                { name: "Jane Smith", email: "jane@example.com", role: "Admin" },
                { name: "Bob Johnson", email: "bob@example.com", role: "Member" },
              ].map((member) => (
                <div key={member.email} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                  <span className="text-sm font-medium">{member.role}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
