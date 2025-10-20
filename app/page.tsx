import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Cpu, Zap, Shield, Code2, Sparkles, Terminal } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6" />
            <span className="text-xl font-bold">ModelForge</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#models" className="text-sm text-muted-foreground hover:text-foreground">
              Models
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-24 mx-auto md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm rounded-full bg-accent/10 text-accent">
            <Sparkles className="w-4 h-4" />
            <span>Now supporting GPT-5, Claude 4.5, and Gemini 2.5</span>
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl text-balance">
            The fastest platform for building AI products
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground md:text-xl text-balance">
            Host, fine-tune, and deploy your personal AI models with enterprise-grade infrastructure. Build
            transformative AI experiences powered by industry-leading models and tools.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Start Building <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="#models">
              <Button size="lg" variant="outline">
                View Models
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="container px-4 mx-auto">
          <p className="mb-8 text-sm text-center uppercase text-muted-foreground">Trusted by AI teams at</p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            {["TechCorp", "DataLabs", "AI Systems", "CloudAI", "NeuralNet", "DeepMind Co"].map((company) => (
              <div key={company} className="flex items-center justify-center">
                <span className="text-lg font-semibold text-muted-foreground">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container px-4 py-24 mx-auto">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Everything you need to build AI</h2>
          <p className="text-lg text-muted-foreground">Professional tools for developers and teams</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-accent/10">
              <Cpu className="w-6 h-6 text-accent" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Model Hosting</h3>
            <p className="leading-relaxed text-muted-foreground">
              Deploy and host your AI models with automatic scaling, load balancing, and 99.9% uptime guarantee.
            </p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-accent/10">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Fine-Tuning Studio</h3>
            <p className="leading-relaxed text-muted-foreground">
              Customize models with your data using our intuitive fine-tuning interface. No ML expertise required.
            </p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-accent/10">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Enterprise Security</h3>
            <p className="leading-relaxed text-muted-foreground">
              SOC 2 compliant infrastructure with end-to-end encryption and private model deployments.
            </p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-accent/10">
              <Code2 className="w-6 h-6 text-accent" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Developer API</h3>
            <p className="leading-relaxed text-muted-foreground">
              RESTful API with SDKs for Python, JavaScript, and Go. Integrate AI into your apps in minutes.
            </p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-accent/10">
              <Terminal className="w-6 h-6 text-accent" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">AI Playground</h3>
            <p className="leading-relaxed text-muted-foreground">
              Test and experiment with models in real-time. Compare outputs and optimize parameters instantly.
            </p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-accent/10">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Version Control</h3>
            <p className="leading-relaxed text-muted-foreground">
              Track model versions, rollback changes, and manage deployments with Git-like version control.
            </p>
          </Card>
        </div>
      </section>

      {/* Models Section */}
      <section id="models" className="py-24 border-t border-border bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Flagship Models</h2>
            <p className="text-lg text-muted-foreground">Access the most powerful AI models</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 bg-card">
              <h3 className="mb-2 text-2xl font-bold">GPT-5</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Most capable model for complex reasoning and creative tasks
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Advanced reasoning</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>128K context window</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Multimodal support</span>
                </li>
              </ul>
            </Card>
            <Card className="p-6 bg-card">
              <h3 className="mb-2 text-2xl font-bold">Claude 4.5 Sonnet</h3>
              <p className="mb-4 text-sm text-muted-foreground">Balanced model optimizing speed and intelligence</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Fast responses</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>200K context window</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Vision capabilities</span>
                </li>
              </ul>
            </Card>
            <Card className="p-6 bg-card">
              <h3 className="mb-2 text-2xl font-bold">Gemini 2.5 Flash</h3>
              <p className="mb-4 text-sm text-muted-foreground">Fastest model for low-latency applications</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Ultra-fast inference</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Cost-effective</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>Real-time streaming</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-24 mx-auto">
        <Card className="p-12 text-center bg-accent/5">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to build the future?</h2>
          <p className="mb-8 text-lg text-muted-foreground">Join thousands of developers building with ModelForge</p>
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5" />
                <span className="font-bold">ModelForge</span>
              </div>
              <p className="text-sm text-muted-foreground">The complete platform for AI development</p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 text-sm text-center border-t border-border text-muted-foreground">
            © 2025 ModelForge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
