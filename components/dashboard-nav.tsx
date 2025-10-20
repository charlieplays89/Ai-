"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Cpu,
  Sparkles,
  Zap,
  Settings,
  Terminal,
  LogOut,
  Database,
  Users,
  GitCompare,
  FileText,
  Code,
  DollarSign,
  Store,
} from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Models",
    href: "/dashboard/models",
    icon: Cpu,
  },
  {
    title: "Datasets",
    href: "/dashboard/datasets",
    icon: Database,
  },
  {
    title: "Fine-Tuning",
    href: "/dashboard/fine-tune",
    icon: Sparkles,
  },
  {
    title: "Playground",
    href: "/dashboard/playground",
    icon: Zap,
  },
  {
    title: "Prompts",
    href: "/dashboard/prompts",
    icon: FileText,
  },
  {
    title: "Compare & Evaluate",
    href: "/dashboard/compare",
    icon: GitCompare,
  },
  {
    title: "API & Developers",
    href: "/dashboard/api",
    icon: Code,
  },
  {
    title: "Cost Analytics",
    href: "/dashboard/costs",
    icon: DollarSign,
  },
  {
    title: "Marketplace",
    href: "/dashboard/marketplace",
    icon: Store,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col w-64 border-r border-border bg-card">
      {/* Logo */}
      <div className="flex items-center gap-2 p-6 border-b border-border">
        <Terminal className="w-6 h-6" />
        <span className="text-xl font-bold">ModelForge</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isActive && "bg-accent/10 text-accent hover:bg-accent/20 hover:text-accent",
                )}
              >
                <Icon className="w-4 h-4" />
                {item.title}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 p-3 mb-2 rounded-lg bg-muted/50">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/20">
            <span className="text-sm font-semibold text-accent">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs truncate text-muted-foreground">john@example.com</p>
          </div>
        </div>
        <Link href="/">
          <Button variant="ghost" className="justify-start w-full gap-3">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </Link>
      </div>
    </aside>
  )
}
