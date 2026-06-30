import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, ExternalLink, Shield, Boxes, Activity, Workflow, GitBranch, Eye, Cog } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import { Footer } from "@/components/ui/footer";

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
  const [isDesktop, setIsDesktop] = useState(false);

  const [adlcHovered, setAdlcHovered] = useState<number | null>(null);
  const [blueprintHovered, setBlueprintHovered] = useState<number | null>(null);
  const [pathsHovered, setPathsHovered] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1280);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % diamondLayers.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isHovered]);

  const navItems = [
    { name: "About Us", link: "#" },
    { name: "Industry", link: "#" },
    { name: "Capabilities", link: "/capabilities" },
    { name: "Products", link: "#" },
    { name: "Blogs", link: "#" },
    { name: "Contact us", link: "/contact" },
  ];

  return (
    <div className="min-h-screen text-foreground" style={{ background: "#16142E" }}>
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo href="#">
            <img src={logoUrl} alt="Optylize Logo" className="w-7 h-7 object-contain rounded-full group-hover:scale-105 transition-transform" />
            <span className="font-sans font-bold text-lg tracking-tight bg-gradient-to-r from-white via-white to-violet-300 bg-clip-text text-transparent">Optylize</span>
          </NavbarLogo>

          <NavItems items={navItems} />
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader className="px-4 py-1">
            <NavbarLogo href="#">
              <img src={logoUrl} alt="Optylize Logo" className="w-7 h-7 object-contain rounded-full" />
              <span className="font-sans font-bold text-lg tracking-tight text-white">Optylize</span>
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
            {navItems.map((item, idx) => {
              if (item.name === "Capabilities") {
                return (
                  <div key={`mobile-link-${idx}`} className="w-full flex flex-col gap-2">
                    <a
                      href={item.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white text-sm font-semibold tracking-wider uppercase"
                    >
                      — {item.name}
                    </a>
                    <div className="pl-4 flex flex-col gap-3 border-l border-violet-500/20">
                      <div>
                        <p className="text-[10px] uppercase text-[#3B82F6] font-bold tracking-widest mb-1">Technology</p>
                        <div className="flex flex-col gap-1">
                          {["BI & Insights", "GenAI Tuning", "Agentic AI", "Roadmaps (ML)", "Roadmaps (Agentic)", "Predictive Analytics", "AI Consulting"].map((f) => (
                            <a key={f} href="/capabilities?category=technology" onClick={() => setIsMobileMenuOpen(false)} className="text-xs text-muted-foreground hover:text-white transition-colors">{f}</a>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-[#10B981] font-bold tracking-widest mb-1">Strategy</p>
                        <div className="flex flex-col gap-1">
                          {["Cost Opt Strategy", "Biz & Product Strategy", "Insights Framework", "Pricing Consulting", "Operational Performance", "GTM Revenue", "Research Consulting"].map((ind) => (
                            <a key={ind} href="/capabilities?category=strategy" onClick={() => setIsMobileMenuOpen(false)} className="text-xs text-muted-foreground hover:text-white transition-colors">{ind}</a>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-[#06B6D4] font-bold tracking-widest mb-1">Advisory</p>
                        <div className="flex flex-col gap-1">
                          {["Automation Integration", "Risk Analytics", "Market Research", "Financial Analytics", "Advisory Capability"].map((oth) => (
                            <a key={oth} href="/capabilities?category=advisory" onClick={() => setIsMobileMenuOpen(false)} className="text-xs text-muted-foreground hover:text-white transition-colors">{oth}</a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors py-1 w-full"
                >
                  {item.name}
                </a>
              );
            })}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* HERO */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(98,70,234,0.18) 0%, rgba(124,92,255,0.08) 40%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(155,127,255,1) 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 mb-8 p-1 rounded-full text-xs" style={{ background: "rgba(124,92,255,0.08)", border: "1px solid rgba(124,92,255,0.2)" }}>
              <button onClick={() => setPersona("business")} className="px-4 py-1.5 rounded-full transition" style={persona === "business" ? { background: "linear-gradient(135deg, #7C5CFF, #6246EA)", color: "#fff" } : { color: "rgba(255,255,255,0.5)" }}>I'm a Business</button>
              <button onClick={() => setPersona("developer")} className="px-4 py-1.5 rounded-full transition" style={persona === "developer" ? { background: "linear-gradient(135deg, #7C5CFF, #6246EA)", color: "#fff" } : { color: "rgba(255,255,255,0.5)" }}>I'm a Developer</button>
            </div>
            <p className="tracking-[0.2em] text-xs uppercase mb-6" style={{ color: "#9B7FFF" }}>Enterprise AI Agent Platform</p>
            <h1 className="text-5xl md:text-7xl leading-[1.05] mb-8">
              Take your AI agents
              <br />
              <em style={{ color: "#9B7FFF" }}>to production, faster.</em>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Most enterprise AI agent projects stall between proof of concept and production. Optylize is the platform and the team that gets your agents across that line. Governed, reliable, and running at scale.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium transition" style={{ background: "linear-gradient(135deg, #7C5CFF, #6246EA)", color: "#fff", boxShadow: "0 4px 24px rgba(124,92,255,0.4)" }}>
                Talk to Us <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#platform" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-foreground hover:bg-card transition">
                See the platform
              </a>
            </div>
          </div>

          {/* DIAMOND STACK — clean side-by-side layout */}
          <div
            className="relative flex flex-col xl:flex-row items-center justify-center gap-6 xl:gap-8 min-h-[560px] xl:min-h-0 xl:w-[620px] xl:h-[380px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Top badge */}
            <div
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-white self-center xl:absolute xl:-top-12 xl:left-[80px] xl:-translate-x-1/2"
              style={{
                background: "rgba(124,92,255,0.15)",
                border: "1px solid rgba(124,92,255,0.4)",
                backdropFilter: "blur(8px)",
              }}
            >
              Your Live Product
            </div>

            {/* Stack + Labels row */}
            <div className="flex items-center gap-0 w-full max-w-[360px] xl:w-[320px] xl:absolute xl:left-0 xl:top-0" style={{ height: "380px" }}>

              {/* Isometric tile stack */}
              <div
                className="relative flex-shrink-0"
                style={{
                  width: "160px",
                  height: "380px",
                  perspective: "900px",
                  transformStyle: "preserve-3d",
                }}
              >
                {diamondLayers.map((layer, i) => {
                  const active = i === activeLayer;
                  const GAP = isHovered ? 46 : 38;
                  // Stack from top (i=0) to bottom (i=last)
                  // Center the stack vertically: middle tile at 190px
                  const mid = (diamondLayers.length - 1) / 2;
                  const tileY = 190 + (i - mid) * GAP;
                  return (
                    <button
                      key={i}
                      type="button"
                      aria-label={layer.title}
                      onClick={() => setActiveLayer(i)}
                      className="absolute focus:outline-none cursor-pointer transition-all duration-500"
                      style={{
                        width: "140px",
                        height: "140px",
                        left: "10px",
                        top: `${tileY}px`,
                        transform: `translateY(-50%) rotateX(52deg) rotateZ(-45deg) ${active ? "translateZ(28px) scale(1.05)" : "translateZ(0px)"}`,
                        transformOrigin: "center center",
                        borderRadius: "18px",
                        background: active
                          ? "linear-gradient(135deg, #ffffff 0%, #ede9ff 100%)"
                          : i === activeLayer - 1 || i === activeLayer + 1
                            ? "linear-gradient(135deg, rgba(124,92,255,0.32) 0%, rgba(98,70,234,0.14) 100%)"
                            : "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)",
                        border: active
                          ? "1.5px solid rgba(255,255,255,0.9)"
                          : "1px solid rgba(124,92,255,0.22)",
                        boxShadow: active
                          ? "0 0 40px rgba(124,92,255,0.85), 0 0 70px rgba(124,92,255,0.35)"
                          : "none",
                        backdropFilter: "blur(4px)",
                        zIndex: active ? 50 : diamondLayers.length + 1 - i,
                      }}
                    />
                  );
                })}
              </div>

              {/* Right-side callout labels — matched to tile vertical positions */}
              <div className="relative flex-shrink-0 w-[200px] xl:w-[160px]" style={{ height: "380px" }}>
                {diamondLayers.map((layer, i) => {
                  const active = i === activeLayer;
                  const GAP = isHovered ? 46 : 38;
                  const mid = (diamondLayers.length - 1) / 2;
                  // Labels use same Y math as tiles so they align
                  const labelY = 190 + (i - mid) * GAP;
                  return (
                    <div
                      key={i}
                      className="absolute flex items-center gap-2 cursor-pointer transition-all duration-500"
                      style={{ top: `${labelY}px`, transform: "translateY(-50%)", left: 0 }}
                      onClick={() => setActiveLayer(i)}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                        style={{ background: active ? "#9B7FFF" : "rgba(255,255,255,0.2)" }}
                      />
                      <div
                        className="flex-shrink-0 transition-all duration-300"
                        style={{
                          width: active ? "28px" : "16px",
                          height: "1px",
                          background: active ? "rgba(155,127,255,0.7)" : "rgba(255,255,255,0.12)",
                        }}
                      />
                      <span
                        className="text-xs whitespace-nowrap transition-all duration-300"
                        style={{
                          color: active ? "#ffffff" : "rgba(255,255,255,0.32)",
                          fontWeight: active ? 600 : 400,
                        }}
                      >
                        {layer.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detail card — slides up and down on desktop, sits below on mobile */}
            <div
              className="w-full max-w-sm xl:w-[280px] xl:absolute xl:left-[340px] transition-all duration-500 ease-out z-[60]"
              style={isDesktop ? { top: `${190 + (activeLayer - (diamondLayers.length - 1) / 2) * (isHovered ? 46 : 38)}px`, transform: "translateY(-50%)" } : {}}
            >
              <div
                key={activeLayer}
                className="p-4 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-300"
                style={{
                  background: "rgba(14,12,35,0.90)",
                  border: "1px solid rgba(124,92,255,0.28)",
                  backdropFilter: "blur(14px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-0.5 h-3 rounded-full" style={{ background: "#9B7FFF" }} />
                  <p className="text-[10px] tracking-widest uppercase font-semibold" style={{ color: "#9B7FFF" }}>
                    {diamondLayers[activeLayer].kicker}
                  </p>
                </div>
                <p className="text-serif text-lg mb-1.5 text-white">{diamondLayers[activeLayer].title}</p>
                <p className="text-xs mb-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {diamondLayers[activeLayer].desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {diamondLayers[activeLayer].tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                      style={{
                        background: "rgba(124,92,255,0.14)",
                        color: "#b8a0ff",
                        border: "1px solid rgba(124,92,255,0.22)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-violet-100 bg-[#F5F3FF] text-[#1A1535]">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-serif text-4xl md:text-5xl text-violet-600">{s.value}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-16 bg-[#F8F6FF]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-slate-400 mb-10">Trusted by enterprises across industries</p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-70">
            {["Northwind", "Acme Corp", "Helix", "Vantage", "Orbital", "Meridian"].map((b) => (
              <div key={b} className="text-center text-serif text-xl text-slate-600">{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ADLC */}
      <section id="platform" className="py-32 relative bg-[#F5F3FF] text-[#1A1535]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-violet-600 text-xs tracking-[0.2em] uppercase mb-4">Agent Development Lifecycle</p>
          <h2 className="text-5xl md:text-6xl max-w-4xl mb-6 text-slate-900">
            Everything across <em className="text-violet-600">the ADLC cycle.</em>
          </h2>
          <p className="text-slate-600 max-w-2xl mb-16 text-lg">
            From first design session to governed production deployment — six stages, one platform. No external tools stitched in. No gaps where agents go to die.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6">
            {adlcStages.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.num}
                  className="relative group block p-2 h-full w-full"
                  onMouseEnter={() => setAdlcHovered(idx)}
                  onMouseLeave={() => setAdlcHovered(null)}
                >
                  <AnimatePresence>
                    {adlcHovered === idx && (
                      <motion.span
                        className="absolute inset-0 h-full w-full bg-violet-200/50 block rounded-3xl"
                        layoutId="adlcHover"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: { duration: 0.15 },
                        }}
                        exit={{
                          opacity: 0,
                          transition: { duration: 0.15, delay: 0.2 },
                        }}
                      />
                    )}
                  </AnimatePresence>
                  <div className="relative z-20 group p-7 rounded-2xl bg-white border border-violet-100/80 transition duration-300 overflow-hidden h-full">
                    <div className="absolute -top-10 -right-10 w-32 h-32 rotate-45 bg-violet-600 opacity-[0.03] group-hover:opacity-[0.08] transition rounded-2xl" />
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-serif text-3xl text-slate-300">{s.num}</span>
                      <Icon className="w-5 h-5 text-violet-600" />
                    </div>
                    <h3 className="text-2xl mb-5 text-slate-800">{s.title}</h3>
                    <ul className="space-y-2">
                      {s.items.map((i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-violet-600" /> {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 p-6 rounded-2xl border border-violet-100 bg-white flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-600">
            <span className="text-violet-600 font-semibold">Framework agnostic</span>
            {["LangChain", "CrewAI", "AutoGen", "Custom stacks", "Any LLM", "Any cloud"].map((t) => (
              <span key={t} className="text-slate-600 flex items-center gap-2"><Check className="w-4 h-4 text-violet-600" /> {t}</span>
            ))}
            <span className="text-slate-500 ml-auto">No rewrite required</span>
          </div>
        </div>
      </section>

      {/* BLUEPRINTS */}
      <section className="py-32 bg-[#F8F6FF] border-y border-violet-100 text-[#1A1535]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-violet-600 text-xs tracking-[0.2em] uppercase mb-4">Agent Blueprints</p>
          <h2 className="text-5xl md:text-6xl max-w-4xl mb-6 text-slate-900">
            100+ usecases live <em className="text-violet-600">from week one.</em>
          </h2>
          <p className="text-slate-600 max-w-2xl mb-12 text-lg">
            Pre-built, pre-tested, and pre-governed agents across every enterprise function. Pick a blueprint, configure for your environment, and deploy.
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {Object.keys(blueprintCats).map((k) => (
              <button
                key={k}
                onClick={() => setCat(k as keyof typeof blueprintCats)}
                className={`px-5 py-2 rounded-full text-sm transition ${cat === k ? "bg-violet-600 text-white shadow-md shadow-violet-600/20" : "bg-white border border-violet-100 text-slate-600 hover:text-slate-900"}`}
              >
                {k}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-6">
            {blueprintCats[cat].map((b, idx) => (
              <a
                key={b.title}
                href="#"
                className="relative group block p-2 h-full w-full"
                onMouseEnter={() => setBlueprintHovered(idx)}
                onMouseLeave={() => setBlueprintHovered(null)}
              >
                <AnimatePresence>
                  {blueprintHovered === idx && (
                    <motion.span
                      className="absolute inset-0 h-full w-full bg-violet-200/50 block rounded-3xl"
                      layoutId="blueprintHover"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.15 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                      }}
                    />
                  )}
                </AnimatePresence>
                <div className="relative z-20 group p-6 rounded-2xl bg-white border border-violet-100/80 transition duration-300 h-full flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg mb-3 text-slate-800 group-hover:text-violet-600 transition">{b.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                  </div>
                  <div className="mt-5 text-xs text-violet-600 inline-flex items-center gap-1">
                    Explore <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* REASONS */}
      <section className="py-32 bg-[#F5F3FF] text-[#1A1535]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-violet-600 text-xs tracking-[0.2em] uppercase mb-4">Why Enterprises Choose Optylize</p>
          <h2 className="text-5xl md:text-6xl mb-20 max-w-3xl text-slate-900">
            Five reasons enterprises <em className="text-violet-600">pick Optylize.</em>
          </h2>

          <div className="space-y-6">
            {reasons.map((r, i) => (
              <div key={r.title} className="grid lg:grid-cols-12 gap-8 p-8 md:p-12 rounded-3xl bg-white border border-violet-100 hover:border-violet-300 hover:shadow-md transition">
                <div className="lg:col-span-1 text-serif text-5xl text-violet-400">0{i + 1}</div>
                <div className="lg:col-span-7">
                  <p className="text-xs uppercase tracking-widest text-violet-600 mb-3">{r.kicker}</p>
                  <h3 className="text-3xl md:text-4xl mb-5 text-slate-900">{r.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{r.body}</p>
                </div>
                <div className="lg:col-span-4 space-y-3">
                  {r.points.map((p) => (
                    <div key={p} className="flex items-start gap-3 text-sm text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-violet-600" />
                      </div>
                      <span>{p}</span>
                    </div>
                  ))}
                  <div className="pt-4 inline-flex items-center gap-2 text-xs text-violet-600">
                    <Cog className="w-3 h-3" /> {r.badge}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PATHS */}
      <section className="py-32 bg-[#F8F6FF] border-y border-violet-100 text-[#1A1535]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-violet-600 text-xs tracking-[0.2em] uppercase mb-4">How to Get Started</p>
          <h2 className="text-5xl md:text-6xl mb-16 max-w-3xl text-slate-900">
            Three paths to <em className="text-violet-600">agents in production.</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 py-6">
            {[
              { num: "01", title: "Platform + Your Team", body: "Build custom agents with Agent Studio and Architect. Full control, any LLM, modular Blocks. Your engineers own the IP and the roadmap.", tags: ["Agent Studio", "Blocks", "Architect"], cta: "Start Building" },
              { num: "02", title: "Platform + Our Engineers", body: "Our Applied AI architects co-build your first 3 agents, productionize the complex ones, and transfer full ownership to you.", tags: ["Co-build", "No Lock-in"], cta: "Talk to Us" },
              { num: "03", title: "Through Expert Partners", body: "Work with our certified solution partners. They bring domain depth; we bring the platform. You get agents in production faster.", tags: ["SI Partners", "Vertical depth"], cta: "Find a Partner" },
            ].map((p, idx) => (
              <div
                key={p.num}
                className="relative group block p-2 h-full w-full"
                onMouseEnter={() => setPathsHovered(idx)}
                onMouseLeave={() => setPathsHovered(null)}
              >
                <AnimatePresence>
                  {pathsHovered === idx && (
                    <motion.span
                      className="absolute inset-0 h-full w-full bg-violet-200/50 block rounded-3xl"
                      layoutId="pathsHover"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.15 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                      }}
                    />
                  )}
                </AnimatePresence>
                <div className="relative z-20 p-8 rounded-3xl bg-white border border-violet-100/80 transition duration-300 flex flex-col h-full text-slate-700">
                  <span className="text-serif text-4xl text-violet-400 mb-6">{p.num}</span>
                  <h3 className="text-2xl mb-4 text-slate-900">{p.title}</h3>
                  <p className="text-sm text-slate-500 mb-6 flex-1">{p.body}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map((t) => <span key={t} className="text-xs px-3 py-1 rounded-full bg-violet-50 text-violet-600 border border-violet-100/50">{t}</span>)}
                  </div>
                  <a href="#" className="text-sm text-violet-600 inline-flex items-center gap-1 font-semibold">{p.cta} <ArrowRight className="w-3 h-3" /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-40 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(98,70,234,0.2) 0%, rgba(124,92,255,0.08) 50%, transparent 80%)" }} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl mb-8 leading-[1.05]">
            Ready to ship agents <em className="text-violet-400">that actually run?</em>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Bring us your hardest agent problem. We'll show you a path to production in weeks, not quarters.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-violet-600 text-primary-foreground font-medium hover:shadow-lg transition">
              Talk to Us <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-foreground hover:bg-card transition">
              <ExternalLink className="w-4 h-4" /> Explore Agent Studio
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
