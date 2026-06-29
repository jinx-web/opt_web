import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, ExternalLink, Shield, Boxes, Activity, Workflow, GitBranch, Eye, Cog } from "lucide-react";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
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

export const Route = createFileRoute("/capabilities")({
  head: () => ({
    meta: [
      { title: "Capabilities — Optylize" },
      { name: "description", content: "Optylize Capabilities Architect Map" },
    ],
  }),
  component: CapabilitiesPage,
});

const column1 = [
  { title: "Business Intelligence & Insights", desc: "Leverage deep analytics and automated reporting for decision making." },
  { title: "Generative AI Fine Tuning", desc: "Optimize pre-trained LLMs with your enterprise domain data." },
  { title: "Agentic AI & Implementation", desc: "Deploy autonomous multi-agent networks inside your workflows." },
  { title: "AI Adoption Roadmaps (ML)", desc: "Establish custom timelines and integration frameworks for classic ML." },
  { title: "AI Adoption Roadmaps (Agentic)", desc: "Plan structural migrations to autonomous agent-driven systems." },
  { title: "Predictive Analytics & Forecasting", desc: "Identify market changes and customer trends using high-fidelity modeling." },
  { title: "Technology & AI Consulting", desc: "Consult with expert architects on infrastructure, security, and stack selection." }
];

const column2 = [
  { title: "Cost Optimization Strategy", desc: "Minimize cloud and computation expenses during large-scale deployments." },
  { title: "Business & Product Strategy", desc: "Align agent features with product roadmaps and strategic goals." },
  { title: "Insights Framework & Automation", desc: "Automate data aggregation and metric delivery across departments." },
  { title: "Pricing & Strategy Consulting", desc: "Develop monetization models and pricing matrices for AI products." },
  { title: "Operational Perfomance Consulting", desc: "Audit workflows to find operational bottlenecks and solve them." },
  { title: "Go-To-Market & Predictive Revenue", desc: "Predict pipeline changes and target high-value audience segments." },
  { title: "Strategy & Research Consulting", desc: "In-depth market research to validate product positioning." }
];

const column3 = [
  { title: "Agentic Automation & ML Integration", desc: "Connect agent pipelines with existing classic machine learning workflows." },
  { title: "Predictive Analytics & Forecasting", desc: "Perform risk mitigation and modeling on financial advisory portfolios." },
  { title: "Market & Industry Research", desc: "Collect competitor intel and customer trends across target industries." },
  { title: "Financial Analytics & Forecasting", desc: "Simulate balance sheets and predict revenue using dynamic factors." },
  { title: "Financial Advisory Capability", desc: "Consult on investment, budgeting, and compliance strategy." }
];

function CapabilitiesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1280);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "About Us", link: "/#about" },
    { name: "Industry", link: "/#industry" },
    { name: "Capabilities", link: "/capabilities" },
    { name: "Products", link: "/#products" },
    { name: "Blogs", link: "/#blogs" },
    { name: "Contact us", link: "/#contact" },
  ];

  const handleCardClick = (title: string) => {
    toast.success(`Active capability selected: ${title}`, {
      description: "Redirecting to sandbox setup...",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen text-foreground" style={{ background: "#16142E" }}>
      <Toaster position="bottom-right" theme="dark" />

      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo href="/">
            <img src={logoUrl} alt="Optylize Logo" className="w-7 h-7 object-contain rounded-full group-hover:scale-105 transition-transform" />
            <span className="font-sans font-bold text-lg tracking-tight bg-gradient-to-r from-white via-white to-violet-300 bg-clip-text text-transparent">Optylize</span>
          </NavbarLogo>

          <NavItems items={navItems} />
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader className="px-4 py-1">
            <NavbarLogo href="/">
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
                            <a key={f} href="/capabilities" onClick={() => setIsMobileMenuOpen(false)} className="text-xs text-muted-foreground hover:text-white transition-colors">{f}</a>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-[#10B981] font-bold tracking-widest mb-1">Strategy</p>
                        <div className="flex flex-col gap-1">
                          {["Cost Opt Strategy", "Biz & Product Strategy", "Insights Framework", "Pricing Consulting", "Operational Performance", "GTM Revenue", "Research Consulting"].map((ind) => (
                            <a key={ind} href="/capabilities" onClick={() => setIsMobileMenuOpen(false)} className="text-xs text-muted-foreground hover:text-white transition-colors">{ind}</a>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-[#06B6D4] font-bold tracking-widest mb-1">Advisory</p>
                        <div className="flex flex-col gap-1">
                          {["To Be Announced", "Automation Integration", "Risk Analytics", "Market Research", "Financial Analytics", "Advisory Capability"].map((oth) => (
                            <a key={oth} href="/capabilities" onClick={() => setIsMobileMenuOpen(false)} className="text-xs text-muted-foreground hover:text-white transition-colors">{oth}</a>
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

      {/* Main Map Content */}
      <main className="max-w-7xl mx-auto px-6 pt-40 pb-32">
        <div className="text-center mb-16">
          <p className="tracking-[0.2em] text-xs uppercase mb-4" style={{ color: "#9B7FFF" }}>Architect Systems & Flow</p>
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-6 animate-fade-in">Capabilities Architect Map</h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Click any node below to inspect live capabilities, architecture configurations, and deployment strategies.
          </p>
        </div>

        {/* Architect Map Grid */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8 items-start justify-center max-w-6xl mx-auto pt-8">

          {/* Column 1: Blue - Technology */}
          <div className="relative pl-8 pr-2 py-4 flex flex-col gap-6">
            {/* Left Connecting Line */}
            <div className="absolute left-0 top-10 bottom-10 w-[2px] bg-blue-500/60" />

            {column1.map((item, idx) => {
              const isLast = idx === column1.length - 1;
              return (
                <div key={item.title} className="relative w-full">
                  {/* Connector Arrow */}
                  <div className="absolute left-[-32px] w-8 h-[2px] bg-blue-500/60 top-1/2 -translate-y-1/2" />
                  <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 border-y-[4px] border-y-transparent border-l-[6px] border-l-blue-500/80" />

                  {/* Card Button */}
                  <button
                    onClick={() => handleCardClick(item.title)}
                    className="w-full text-left p-4 rounded-xl border border-violet-500/10 hover:border-blue-500/40 bg-[#0E0C23]/60 hover:bg-[#1E1949]/70 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition duration-300 group cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{item.title}</span>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed group-hover:text-slate-300 transition-colors">{item.desc}</p>
                    {isLast && (
                      <div className="mt-3.5 inline-block text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest bg-blue-500/10 text-blue-300 border border-blue-500/25">
                        Technology
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Column 2: Green - Strategy */}
          <div className="relative pl-8 pr-2 py-4 flex flex-col gap-6">
            {/* Left Connecting Line */}
            <div className="absolute left-0 top-10 bottom-10 w-[2px] bg-emerald-500/60" />

            {column2.map((item, idx) => {
              const isLast = idx === column2.length - 1;
              return (
                <div key={item.title} className="relative w-full">
                  {/* Connector Arrow */}
                  <div className="absolute left-[-32px] w-8 h-[2px] bg-emerald-500/60 top-1/2 -translate-y-1/2" />
                  <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 border-y-[4px] border-y-transparent border-l-[6px] border-l-emerald-500/80" />

                  {/* Card Button */}
                  <button
                    onClick={() => handleCardClick(item.title)}
                    className="w-full text-left p-4 rounded-xl border border-violet-500/10 hover:border-emerald-500/40 bg-[#0E0C23]/60 hover:bg-[#152E38]/70 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition duration-300 group cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{item.title}</span>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed group-hover:text-slate-300 transition-colors">{item.desc}</p>
                    {isLast && (
                      <div className="mt-3.5 inline-block text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                        Capability MAP
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Column 3: Cyan - Advisory */}
          <div className="relative pr-8 pl-2 py-4 flex flex-col gap-6">
            {/* Right Connecting Line */}
            <div className="absolute right-0 top-10 bottom-10 w-[2px] bg-cyan-500/60" />

            {column3.map((item, idx) => {
              const isLast = idx === column3.length - 1;
              return (
                <div key={item.title} className="relative w-full">
                  {/* Connector Arrow (Pointing Left from Right Line!) */}
                  <div className="absolute right-[-32px] w-8 h-[2px] bg-cyan-500/60 top-1/2 -translate-y-1/2" />
                  <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 border-y-[4px] border-y-transparent border-r-[6px] border-r-cyan-500/80" />

                  {/* Card Button */}
                  <button
                    onClick={() => handleCardClick(item.title)}
                    className="w-full text-left p-4 rounded-xl border border-violet-500/10 hover:border-cyan-500/40 bg-[#0E0C23]/60 hover:bg-[#122A3C]/70 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition duration-300 group cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{item.title}</span>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed group-hover:text-slate-300 transition-colors">{item.desc}</p>
                    {isLast && (
                      <div className="mt-3.5 inline-block text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                        Capability MAP
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border py-16 bg-[#16142E]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logoUrl} alt="Optylize Logo" className="w-7 h-7 object-contain rounded-full" />
              <span className="font-sans font-bold text-lg tracking-tight text-white">Optylize</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">Enterprise AI agent platform for teams that ship.</p>
          </div>
          {[
            { h: "Platform", l: ["Agent Studio", "Architect", "Blueprints", "Simulation"] },
            { h: "Company", l: ["About", "Customers", "Careers", "Partners"] },
            { h: "Resources", l: ["Docs", "Blog", "Pricing", "Contact"] },
          ].map((c) => (
            <div key={c.h}>
              <p className="text-sm mb-4 text-white">{c.h}</p>
              <ul className="space-y-2 text-sm text-slate-400">
                {c.l.map((i) => <li key={i}><a href="#" className="hover:text-white">{i}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-border/10 flex flex-wrap justify-between text-xs text-slate-500 gap-4">
          <span>© 2026 Optylize. All rights reserved.</span>
          <span>SOC 2 · HIPAA · GDPR · ISO 27001</span>
        </div>
      </footer>
    </div>
  );
}
