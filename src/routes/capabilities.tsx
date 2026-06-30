import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  BarChart3,
  Cpu,
  Bot,
  Route as RouteIcon,
  LineChart,
  Coins,
  Target,
  Sliders,
  DollarSign,
  Gauge,
  Rocket,
  Search,
  Boxes,
  ShieldAlert,
  Globe,
  Calculator,
  Briefcase,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import logoUrl from "../logo.png";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { Footer } from "@/components/ui/footer";

interface CapabilitiesSearch {
  category?: "technology" | "strategy" | "advisory";
}

export const Route = createFileRoute("/capabilities")({
  validateSearch: (search: Record<string, unknown>): CapabilitiesSearch => {
    return {
      category: (search.category as any) || "technology",
    };
  },
  head: () => ({
    meta: [
      { title: "Capabilities — Optylize" },
      { name: "description", content: "Optylize Capabilities Architect Map" },
    ],
  }),
  component: CapabilitiesPage,
});

const column1Data = [
  {
    title: "Business Intelligence & Insights",
    desc: "Leverage deep analytics and automated reporting for decision making.",
    category: "ANALYTICS",
    icon: BarChart3,
  },
  {
    title: "Generative AI Fine Tuning",
    desc: "Optimize pre-trained LLMs with your enterprise domain data.",
    category: "MODELING",
    icon: Cpu,
  },
  {
    title: "Agentic AI & Implementation",
    desc: "Deploy autonomous multi-agent networks inside your workflows.",
    category: "INTEGRATION",
    icon: Bot,
  },
  {
    title: "AI Adoption Roadmaps (ML)",
    desc: "Establish custom timelines and integration frameworks for classic ML.",
    category: "ROADMAP",
    icon: RouteIcon,
  },
  {
    title: "AI Adoption Roadmaps (Agentic)",
    desc: "Plan structural migrations to autonomous agent-driven systems.",
    category: "MIGRATION",
    icon: RouteIcon,
  },
  {
    title: "Predictive Analytics & Forecasting",
    desc: "Identify market changes and customer trends using high-fidelity modeling.",
    category: "FORECASTING",
    icon: LineChart,
  },
  {
    title: "Technology & AI Consulting",
    desc: "Consult with expert architects on infrastructure, security, and stack selection.",
    category: "CONSULTING",
    icon: Cpu,
  },
];

const column2Data = [
  {
    title: "Cost Optimization Strategy",
    desc: "Minimize cloud and computation expenses during large-scale deployments.",
    category: "FINANCE",
    icon: Coins,
  },
  {
    title: "Business & Product Strategy",
    desc: "Align agent features with product roadmaps and strategic goals.",
    category: "STRATEGY",
    icon: Target,
  },
  {
    title: "Insights Framework & Automation",
    desc: "Automate data aggregation and metric delivery across departments.",
    category: "AUTOMATION",
    icon: Sliders,
  },
  {
    title: "Pricing & Strategy Consulting",
    desc: "Develop monetization models and pricing matrices for AI products.",
    category: "PRICING",
    icon: DollarSign,
  },
  {
    title: "Operational Perfomance Consulting",
    desc: "Audit workflows to find operational bottlenecks and solve them.",
    category: "OPERATIONS",
    icon: Gauge,
  },
  {
    title: "Go-To-Market & Predictive Revenue",
    desc: "Predict pipeline changes and target high-value audience segments.",
    category: "MARKETING",
    icon: Rocket,
  },
  {
    title: "Strategy & Research Consulting",
    desc: "In-depth market research to validate product positioning.",
    category: "RESEARCH",
    icon: Search,
  },
];

const column3Data = [
  {
    title: "Agentic Automation & ML Integration",
    desc: "Connect agent pipelines with existing classic machine learning workflows.",
    category: "AUTOMATION",
    icon: Boxes,
  },
  {
    title: "Predictive Analytics & Forecasting",
    desc: "Perform risk mitigation and modeling on financial advisory portfolios.",
    category: "RISK ANALYSIS",
    icon: ShieldAlert,
  },
  {
    title: "Market & Industry Research",
    desc: "Collect competitor intel and customer trends across target industries.",
    category: "RESEARCH",
    icon: Globe,
  },
  {
    title: "Financial Analytics & Forecasting",
    desc: "Simulate balance sheets and predict revenue using dynamic factors.",
    category: "FINANCIALS",
    icon: Calculator,
  },
  {
    title: "Financial Advisory Capability",
    desc: "Consult on investment, budgeting, and compliance strategy.",
    category: "ADVISORY",
    icon: Briefcase,
  },
];

const categoriesList = [
  { id: "technology", name: "Technology", desc: "BI, GenAI tuning, implementation & roadmaps" },
  { id: "strategy", name: "Strategy", desc: "Cost optimization, product, and operational consulting" },
  { id: "advisory", name: "Advisory", desc: "ML integration, risk analytics, and financial advisory" },
];

function CapabilitiesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const search = useSearch({ from: "/capabilities" });
  const navigate = useNavigate({ from: "/capabilities" });
  const activeCategory = search.category || "technology";

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
    { name: "Blogs", link: "/blogs" },
    { name: "Contact us", link: "/contact" },
  ];

  const handleCardClick = (title: string) => {
    toast.success(`Active capability selected: ${title}`, {
      description: "Redirecting to sandbox setup...",
      duration: 3000,
    });
  };

  const handleCategoryChange = (catId: "technology" | "strategy" | "advisory") => {
    navigate({
      search: (prev) => ({ ...prev, category: catId }),
    });
    setIsDropdownOpen(false);
  };

  const activeItems =
    activeCategory === "strategy"
      ? column2Data
      : activeCategory === "advisory"
      ? column3Data
      : column1Data;

  return (
    <div className="min-h-screen text-foreground bg-[#16142E]">
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
                      href="/capabilities"
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

      {/* Dark Hero Section */}
      <main className="w-full">
        <div className="text-center pt-40 pb-20 px-6 max-w-4xl mx-auto">
          <p className="tracking-[0.2em] text-xs uppercase mb-4" style={{ color: "#9B7FFF" }}>Architect Systems & Flow</p>
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-6 animate-fade-in">Capabilities Architect Map</h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Select a specialized category below to inspect our architecture configurations and deployment strategies.
          </p>
        </div>

        {/* Transition to Light Beige Section */}
        <div className="w-full bg-[#F5F2EB] py-20 border-t border-[#EAE6DD]">
          
          {/* Responsive Selector Dropdown / Tabs */}
          <div className="flex justify-center mb-16 px-6">
            {/* Desktop Tabs */}
            <div className="hidden md:flex bg-[#EFECE6] p-1.5 rounded-full gap-1.5 border border-[#E0DCD4] shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]">
              {categoriesList.map((catItem) => (
                <button
                  key={catItem.id}
                  onClick={() => handleCategoryChange(catItem.id as any)}
                  className={`rounded-full px-8 py-2.5 text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                    activeCategory === catItem.id
                      ? "bg-[#24211D] text-white shadow-md shadow-[#24211D]/10 cursor-pointer"
                      : "text-[#6E6458] hover:text-[#24211D] cursor-pointer"
                  }`}
                >
                  {catItem.name}
                </button>
              ))}
            </div>

            {/* Mobile Dropdown */}
            <div className="md:hidden w-full max-w-xs relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex justify-between items-center w-full rounded-2xl border border-[#E0DCD4] shadow-sm px-5 py-4 bg-[#FAF8F5] text-sm font-semibold text-[#24211D] hover:bg-[#F2ECE1] transition-all duration-300 focus:outline-none cursor-pointer"
              >
                <span className="capitalize font-bold text-[#24211D]">{activeCategory} Capabilities</span>
                <ChevronDown className={`w-4 h-4 ml-2 text-[#786D5F] transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="origin-top absolute left-0 right-0 mt-2 rounded-2xl shadow-xl bg-[#FAF8F5] border border-[#E0DCD4] z-20 overflow-hidden"
                    >
                      <div className="py-1">
                        {categoriesList.map((catItem) => (
                          <button
                            key={catItem.id}
                            onClick={() => handleCategoryChange(catItem.id as any)}
                            className={`w-full text-left px-5 py-4 text-sm transition-colors duration-200 flex flex-col gap-1 border-b border-[#EFECE6] last:border-b-0 hover:bg-[#F2ECE1] cursor-pointer ${
                              activeCategory === catItem.id ? "bg-[#F2ECE1]/50 text-[#24211D] font-bold" : ""
                            }`}
                          >
                            <span className="text-sm font-bold capitalize text-[#24211D]">{catItem.name}</span>
                            <span className="text-xs text-[#8C8274] leading-normal font-normal">{catItem.desc}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Cards Grid Container with animation */}
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {activeItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    onClick={() => handleCardClick(item.title)}
                    className="group relative cursor-pointer bg-[#FAF8F5] border border-[#EADFCF]/50 hover:border-[#D0C0AC] rounded-2xl p-6 shadow-[0_4px_20px_rgba(36,33,29,0.02)] hover:shadow-[0_12px_30px_rgba(36,33,29,0.06)] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Tag row */}
                      <div className="flex items-center gap-3 mb-5">
                        <div className="bg-[#F2ECE1] text-[#786D5F] p-2 rounded-xl flex items-center justify-center w-9 h-9 group-hover:bg-[#EADFCF] transition-colors duration-300">
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <span className="text-[10px] font-bold tracking-widest text-[#786D5F] uppercase">
                          {item.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg md:text-xl font-bold text-[#24211D] mb-2 font-serif group-hover:text-black transition-colors duration-300">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#6E6458] leading-relaxed mb-6">
                        {item.desc}
                      </p>
                    </div>

                    {/* Separator and View blueprint */}
                    <div>
                      <div className="border-t border-[#EFECE6] my-4" />
                      <div className="text-xs font-bold text-[#5A5043] group-hover:text-black transition-colors duration-300 flex items-center gap-1.5">
                        <span>View Blueprint</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
