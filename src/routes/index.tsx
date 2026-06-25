import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, ExternalLink, Shield, Boxes, Activity, Workflow, GitBranch, Eye, Cog } from "lucide-react";
import { useState, useEffect } from "react";
import logoUrl from "../logo.png";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Optylize — Enterprise AI Agent Platform" },
      { name: "description", content: "Take your AI agents to production, faster. Governed, reliable, and running at scale." },
      { property: "og:title", content: "Optylize — Enterprise AI Agent Platform" },
      { property: "og:description", content: "Take your AI agents to production, faster." },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "85%", label: "Agent projects reach production" },
  { value: "1,000+", label: "Agents live in production" },
  { value: "500+", label: "Enterprises building on the platform" },
  { value: "4 Weeks", label: "Avg time from build to production" },
  { value: "99.9%", label: "Uptime across deployments" },
];

const adlcStages = [
  { num: "01", title: "Design", icon: Workflow, items: ["Agent Canvas", "Architect AI", "Workflow Designer", "Blueprint Library"] },
  { num: "02", title: "Build", icon: Boxes, items: ["Agent Studio", "Python SDK", "Memory + RAG", "Tool Integrations"] },
  { num: "03", title: "Evaluate", icon: Activity, items: ["Simulation Engine", "Six Sigma Scoring", "Domain Test Suites", "Regression Tests"] },
  { num: "04", title: "Deploy", icon: GitBranch, items: ["Bedrock-native", "One-click VPC", "Git Agents", "CI/CD Integration"] },
  { num: "05", title: "Observe", icon: Eye, items: ["Full Trace Logs", "Hallucination Mgr", "Cost Monitoring", "Performance Alerts"] },
  { num: "06", title: "Govern", icon: Shield, items: ["Control Plane", "SSO + RBAC", "PII Detection", "Audit Trail"] },
];

const reasons = [
  {
    kicker: "Build",
    title: "Architect: build any agent, no code needed.",
    body: "Describe what you need in plain language. Architect builds the full agent — logic, integrations, access controls, UI — and delivers something your team can use from day one.",
    points: ["Conversation to application", "Connects to existing systems", "Governed from the start"],
    badge: "No code needed",
  },
  {
    kicker: "Deploy",
    title: "Platform + People: live in weeks, not quarters.",
    body: "Our engineers embed with your team. They handle governance, integrations, and compliance sign-off, and stay until your agents are running in production.",
    points: ["Engineers embedded with your team", "8-week average to production", "Compliance handled alongside you"],
    badge: "85% ship rate",
  },
  {
    kicker: "Start faster",
    title: "Pre-built Agents: start from what already works.",
    body: "200+ agents already proven in environments like yours — across BFSI, healthcare, HR, and operations. Customize for your context. Deploy in days, not months.",
    points: ["Production-tested across industries", "Customizable to your environment", "Validated before it reaches you"],
    badge: "200+ blueprints",
  },
  {
    kicker: "Evaluate",
    title: "Simulation + Improvement: catch failures before customers do.",
    body: "Every agent runs through thousands of real-world scenarios before going live. Once live, it monitors itself and improves automatically.",
    points: ["1,000s of scenarios before deployment", "Domain-specific test suites", "Self-improving after launch"],
    badge: "Six Sigma scoring",
  },
  {
    kicker: "Own",
    title: "No Lock-in: your agents, your IP, always.",
    body: "Everything you build lives in your environment, on open protocols, under your control. If you ever move, it all moves with you. No exit penalty.",
    points: ["Open-source orchestration", "Deployed in your own VPC", "You own every agent you build"],
    badge: "Your IP",
  },
];

const blueprintCats: Record<string, { title: string; desc: string }[]> = {
  HR: [
    { title: "HR Helpdesk Agent", desc: "Handles repetitive HR queries so teams can focus on strategic work." },
    { title: "Employee Onboarding", desc: "Guides new hires through workflows, docs and tasks automatically." },
    { title: "AI Hiring Assistant", desc: "Screens candidates, ranks applicants and schedules interviews." },
    { title: "AI Performance Review", desc: "Streamlines review cycles with AI-driven feedback and scoring." },
  ],
  Sales: [
    { title: "AI SDR Agent", desc: "Prospects, qualifies and engages leads at scale with personalized outreach." },
    { title: "Lead Enrichment", desc: "Adds firmographics, intent signals and tech stack data to every lead." },
    { title: "AI Deal Nurturer", desc: "Keeps deals warm with context-aware follow-ups and next-best-action." },
    { title: "Meeting Prep Agent", desc: "Pulls together calendar, notes and reports before every meeting." },
  ],
  Support: [
    { title: "Cross Channel Support", desc: "Handles tickets uniformly across email, chat, voice and social." },
    { title: "Email Triage", desc: "Sorts, prioritizes and routes inbound emails by urgency and topic." },
    { title: "AI Phone Support", desc: "Resolves voice calls with conversational AI and smooth human handoff." },
    { title: "CRM Case Generator", desc: "Auto-creates accurate CRM cases with smart field population." },
  ],
  Banking: [
    { title: "KYC Compliance", desc: "Automates identity verification and compliance checks at onboarding." },
    { title: "Fraud Detection", desc: "Monitors transactions in real-time with explainable AI reasoning." },
    { title: "AI Loan Origination", desc: "Streamlines end-to-end application intake, validation and decisioning." },
    { title: "AML Agent", desc: "Detects and prevents financial crimes with real-time monitoring." },
  ],
  Insurance: [
    { title: "Claims Processing", desc: "Automates intake, validation, assessment and settlement workflows." },
    { title: "Policy Underwriting", desc: "Accelerates risk assessment with AI-driven applicant analysis." },
    { title: "Regulatory Audit", desc: "Continuous policy compliance checks against evolving frameworks." },
    { title: "Claims Analysis", desc: "Identifies anomalies in claims data and accelerates decisions." },
  ],
};

const diamondLayers = [
  { kicker: "LAYER 01", title: "Your Live Product", desc: "Deliver agent-powered experiences inside your apps, portals and workflows.", tags: ["Web SDK", "Mobile", "Embeds"] },
  { kicker: "LAYER 02", title: "Connect Anywhere", desc: "Bring agents into Slack, Teams, email, CRM, ticketing and voice channels.", tags: ["Slack", "Teams", "Voice", "CRM"] },
  { kicker: "LAYER 03", title: "Any LLM", desc: "Route to OpenAI, Anthropic, Bedrock, Gemini or your own private models.", tags: ["OpenAI", "Anthropic", "Bedrock", "Open-source"] },
  { kicker: "LAYER 04", title: "Simulation Engine", desc: "Test every agent against thousands of scenarios before it reaches production.", tags: ["1,000s of scenarios", "Adversarial testing", "Six Sigma scoring"] },
  { kicker: "LAYER 05", title: "Agent Studio", desc: "Design, build and orchestrate agents with no-code canvas or Python SDK.", tags: ["Canvas", "SDK", "Memory + RAG"] },
  { kicker: "LAYER 06", title: "Audit & Compliance", desc: "Full trace logs, PII detection, SSO + RBAC and policy enforcement.", tags: ["SOC 2", "HIPAA", "GDPR"] },
  { kicker: "LAYER 07", title: "Control Plane", desc: "Deploy in your VPC with governance, cost monitoring and observability built in.", tags: ["VPC", "Observability", "Cost controls"] },
];

function Index() {
  const [persona, setPersona] = useState<"business" | "developer">("business");
  const [cat, setCat] = useState<keyof typeof blueprintCats>("HR");
  const [activeLayer, setActiveLayer] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % diamondLayers.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const navItems = [
    { name: "Solutions", link: "#" },
    { name: "Platform", link: "#platform" },
    { name: "Customers", link: "#" },
    { name: "Pricing", link: "#" },
    { name: "Partners", link: "#" },
    { name: "Resources", link: "#" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo href="#">
            <img src={logoUrl} alt="Optylize Logo" className="w-7 h-7 object-contain group-hover:scale-105 transition-transform" />
            <span className="text-serif text-xl tracking-tight">Optylize</span>
          </NavbarLogo>

          <NavItems items={navItems} />

          <div className="flex items-center gap-3 relative z-20">
            <a href="#" className="hidden md:inline text-sm text-muted-foreground hover:text-foreground transition-colors mr-2">
              Agent Studio
            </a>
            <NavbarButton href="#contact" variant="ember">
              Talk to Us
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader className="px-4 py-1">
            <NavbarLogo href="#">
              <img src={logoUrl} alt="Optylize Logo" className="w-7 h-7 object-contain" />
              <span className="text-serif text-xl tracking-tight font-medium text-foreground">Optylize</span>
            </NavbarLogo>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors py-1 w-full"
              >
                {item.name}
              </a>
            ))}
            <div className="flex w-full flex-col gap-3 pt-4 border-t border-border/40">
              <a
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors py-1 text-center"
              >
                Agent Studio
              </a>
              <NavbarButton
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                variant="ember"
                className="w-full py-2.5"
              >
                Talk to Us
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* HERO */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-8 p-1 bg-card border border-border rounded-full text-xs">
              <button onClick={() => setPersona("business")} className={`px-4 py-1.5 rounded-full transition ${persona === "business" ? "bg-ember-gradient text-primary-foreground" : "text-muted-foreground"}`}>I'm a Business</button>
              <button onClick={() => setPersona("developer")} className={`px-4 py-1.5 rounded-full transition ${persona === "developer" ? "bg-ember-gradient text-primary-foreground" : "text-muted-foreground"}`}>I'm a Developer</button>
            </div>
            <p className="text-ember tracking-[0.2em] text-xs uppercase mb-6">Enterprise AI Agent Platform</p>
            <h1 className="text-5xl md:text-7xl leading-[1.05] mb-8">
              Take your AI agents
              <br />
              <em className="text-ember">to production, faster.</em>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Most enterprise AI agent projects stall between proof of concept and production. Optylize is the platform and the team that gets your agents across that line. Governed, reliable, and running at scale.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ember-gradient text-primary-foreground font-medium hover:shadow-ember transition">
                Talk to Us <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#platform" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-foreground hover:bg-card transition">
                See the platform
              </a>
            </div>
          </div>

          {/* DIAMOND STACK & INFO PANEL */}
          <div className="relative flex flex-col items-center justify-center gap-8 lg:gap-12 xl:flex-row xl:items-start xl:justify-center min-h-[560px] lg:min-h-0 xl:h-[560px]">
            {/* Diamond Stack */}
            <div
              className="relative w-72 h-[480px] flex-shrink-0"
              style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {diamondLayers.map((layer, i) => {
                const active = i === activeLayer;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={layer.title}
                    onClick={() => setActiveLayer(i)}
                    className={`absolute left-1/2 w-44 h-44 rounded-[28px] transition-all duration-500 cursor-pointer focus:outline-none ${active ? "shadow-[0_0_60px_rgba(255,110,60,0.85)]" : "hover:brightness-125"}`}
                    style={{
                      top: "260px",
                      transform: `translateX(-50%) translateY(${-(6 - i) * (isHovered ? 48 : 38) +
                        (i < activeLayer ? (isHovered ? -36 : -28) : i > activeLayer ? (isHovered ? 36 : 28) : 0)
                        }px) rotateX(60deg) rotateZ(-45deg) ${active ? "translateZ(44px)" : "translateZ(0px)"}`,
                      transformOrigin: "center center",
                      background: active
                        ? "#ffffff"
                        : "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06))",
                      border: active ? "1.5px solid rgba(255,255,255,0.9)" : "1px solid rgba(255,255,255,0.15)",
                      backdropFilter: "blur(4px)",
                      zIndex: active ? 50 : 20 - i,
                    }}
                  />
                );
              })}
              <p className="absolute left-1/2 -translate-x-1/2 -top-6 w-64 text-center text-[10px] uppercase tracking-widest text-muted-foreground xl:hidden">
                Click any layer to explore
              </p>
            </div>

            {/* Info Panel */}
            <div
              className="relative w-full max-w-sm xl:w-72 xl:mt-0 xl:[transform:translateY(var(--info-y))] transition-all duration-500 ease-out"
              style={{
                "--info-y": `${-28 + activeLayer * (isHovered ? 48 : 38)}px`,
              } as React.CSSProperties}
            >
              <p className="hidden xl:block absolute -top-6 left-0 w-64 text-[10px] uppercase tracking-widest text-muted-foreground">
                Click any layer to explore
              </p>
              <div
                key={activeLayer}
                className="p-5 rounded-xl bg-card border border-border shadow-ember animate-in fade-in slide-in-from-bottom-2 duration-300 xl:slide-in-from-right-2"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-0.5 h-3 bg-ember rounded-full" />
                  <p className="text-[10px] tracking-widest text-ember uppercase font-semibold">{diamondLayers[activeLayer].kicker}</p>
                </div>
                <p className="text-serif text-2xl mb-2">{diamondLayers[activeLayer].title}</p>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{diamondLayers[activeLayer].desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {diamondLayers[activeLayer].tags.map((t) => (
                    <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-ember/10 text-ember border border-ember/15 font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-serif text-4xl md:text-5xl text-ember">{s.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-10">Trusted by enterprises across industries</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
            {["Northwind", "Acme Corp", "Helix", "Vantage", "Orbital", "Meridian"].map((b) => (
              <div key={b} className="text-center text-serif text-xl text-muted-foreground">{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ADLC */}
      <section id="platform" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-ember text-xs tracking-[0.2em] uppercase mb-4">Agent Development Lifecycle</p>
          <h2 className="text-5xl md:text-6xl max-w-4xl mb-6">
            Everything across <em className="text-ember">the ADLC cycle.</em>
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-16 text-lg">
            From first design session to governed production deployment — six stages, one platform. No external tools stitched in. No gaps where agents go to die.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {adlcStages.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.num} className="group relative p-7 rounded-2xl bg-card border border-border hover:border-ember/50 transition overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 rotate-45 bg-ember-gradient opacity-[0.06] group-hover:opacity-20 transition rounded-2xl" />
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-serif text-3xl text-muted-foreground">{s.num}</span>
                    <Icon className="w-5 h-5 text-ember" />
                  </div>
                  <h3 className="text-2xl mb-5">{s.title}</h3>
                  <ul className="space-y-2">
                    {s.items.map((i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-ember" /> {i}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-10 p-6 rounded-2xl border border-border bg-card/50 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <span className="text-ember">Framework agnostic</span>
            {["LangChain", "CrewAI", "AutoGen", "Custom stacks", "Any LLM", "Any cloud"].map((t) => (
              <span key={t} className="text-muted-foreground flex items-center gap-2"><Check className="w-4 h-4 text-ember" /> {t}</span>
            ))}
            <span className="text-muted-foreground ml-auto">No rewrite required</span>
          </div>
        </div>
      </section>

      {/* BLUEPRINTS */}
      <section className="py-32 bg-card/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-ember text-xs tracking-[0.2em] uppercase mb-4">Agent Blueprints</p>
          <h2 className="text-5xl md:text-6xl max-w-4xl mb-6">
            100+ usecases live <em className="text-ember">from week one.</em>
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-12 text-lg">
            Pre-built, pre-tested, and pre-governed agents across every enterprise function. Pick a blueprint, configure for your environment, and deploy.
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {Object.keys(blueprintCats).map((k) => (
              <button
                key={k}
                onClick={() => setCat(k as keyof typeof blueprintCats)}
                className={`px-5 py-2 rounded-full text-sm transition ${cat === k ? "bg-ember-gradient text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`}
              >
                {k}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {blueprintCats[cat].map((b) => (
              <a key={b.title} href="#" className="group p-6 rounded-2xl bg-background border border-border hover:border-ember/50 transition">
                <h4 className="text-lg mb-3 group-hover:text-ember transition">{b.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                <div className="mt-5 text-xs text-ember inline-flex items-center gap-1">
                  Explore <ArrowRight className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* REASONS */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-ember text-xs tracking-[0.2em] uppercase mb-4">Why Enterprises Choose Optylize</p>
          <h2 className="text-5xl md:text-6xl mb-20 max-w-3xl">
            Five reasons enterprises <em className="text-ember">pick Optylize.</em>
          </h2>

          <div className="space-y-6">
            {reasons.map((r, i) => (
              <div key={r.title} className="grid lg:grid-cols-12 gap-8 p-8 md:p-12 rounded-3xl bg-card border border-border hover:border-ember/40 transition">
                <div className="lg:col-span-1 text-serif text-5xl text-ember/60">0{i + 1}</div>
                <div className="lg:col-span-7">
                  <p className="text-xs uppercase tracking-widest text-ember mb-3">{r.kicker}</p>
                  <h3 className="text-3xl md:text-4xl mb-5">{r.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{r.body}</p>
                </div>
                <div className="lg:col-span-4 space-y-3">
                  {r.points.map((p) => (
                    <div key={p} className="flex items-start gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-ember/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-ember" />
                      </div>
                      <span>{p}</span>
                    </div>
                  ))}
                  <div className="pt-4 inline-flex items-center gap-2 text-xs text-ember">
                    <Cog className="w-3 h-3" /> {r.badge}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PATHS */}
      <section className="py-32 bg-card/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-ember text-xs tracking-[0.2em] uppercase mb-4">How to Get Started</p>
          <h2 className="text-5xl md:text-6xl mb-16 max-w-3xl">
            Three paths to <em className="text-ember">agents in production.</em>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Platform + Your Team", body: "Build custom agents with Agent Studio and Architect. Full control, any LLM, modular Blocks. Your engineers own the IP and the roadmap.", tags: ["Agent Studio", "Blocks", "Architect"], cta: "Start Building" },
              { num: "02", title: "Platform + Our Engineers", body: "Our Applied AI architects co-build your first 3 agents, productionize the complex ones, and transfer full ownership to you.", tags: ["Co-build", "No Lock-in"], cta: "Talk to Us" },
              { num: "03", title: "Through Expert Partners", body: "Work with our certified solution partners. They bring domain depth; we bring the platform. You get agents in production faster.", tags: ["SI Partners", "Vertical depth"], cta: "Find a Partner" },
            ].map((p) => (
              <div key={p.num} className="p-8 rounded-3xl bg-background border border-border hover:border-ember/50 transition flex flex-col">
                <span className="text-serif text-4xl text-ember/60 mb-6">{p.num}</span>
                <h3 className="text-2xl mb-4">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-1">{p.body}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map((t) => <span key={t} className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground">{t}</span>)}
                </div>
                <a href="#" className="text-sm text-ember inline-flex items-center gap-1">{p.cta} <ArrowRight className="w-3 h-3" /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl mb-8 leading-[1.05]">
            Ready to ship agents <em className="text-ember">that actually run?</em>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Bring us your hardest agent problem. We'll show you a path to production in weeks, not quarters.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ember-gradient text-primary-foreground font-medium hover:shadow-ember transition">
              Talk to Us <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-foreground hover:bg-card transition">
              <ExternalLink className="w-4 h-4" /> Explore Agent Studio
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logoUrl} alt="Optylize Logo" className="w-7 h-7 object-contain" />
              <span className="text-serif text-xl">Optylize</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">Enterprise AI agent platform for teams that ship.</p>
          </div>
          {[
            { h: "Platform", l: ["Agent Studio", "Architect", "Blueprints", "Simulation"] },
            { h: "Company", l: ["About", "Customers", "Careers", "Partners"] },
            { h: "Resources", l: ["Docs", "Blog", "Pricing", "Contact"] },
          ].map((c) => (
            <div key={c.h}>
              <p className="text-sm mb-4">{c.h}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {c.l.map((i) => <li key={i}><a href="#" className="hover:text-foreground">{i}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-border flex flex-wrap justify-between text-xs text-muted-foreground gap-4">
          <span>© 2026 Optylize. All rights reserved.</span>
          <span>SOC 2 · HIPAA · GDPR · ISO 27001</span>
        </div>
      </footer>
    </div>
  );
}
