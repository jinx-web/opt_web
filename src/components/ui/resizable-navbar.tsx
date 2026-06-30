"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import React, { useRef, useState, useEffect } from "react";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}>
        {children}
      </div>
    );
  }

  return <NavbarClient children={children} className={className} />;
};

const NavbarClient = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(12px)" : "none",
        boxShadow: visible
          ? "0 0 30px rgba(124, 92, 255, 0.25), 0 1px 1px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(124, 92, 255, 0.3), 0 0 4px rgba(124, 92, 255, 0.2), 0 16px 68px rgba(0, 0, 0, 0.5)"
          : "none",
        width: visible ? "80%" : "100%",
        y: visible ? 16 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-6 py-3 lg:flex",
        visible && "bg-black/60 border border-violet-500/40 backdrop-blur-md",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-muted-foreground transition duration-200 hover:text-foreground lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => {
        const isCapabilities = item.name === "Capabilities";
        return (
          <div
            key={`link-wrapper-${idx}`}
            onMouseEnter={() => setHovered(idx)}
            className="relative py-2"
          >
            <a
              onClick={onItemClick}
              className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 z-20"
              href={item.link}
            >
              {hovered === idx && (
                <motion.div
                  layoutId="hovered"
                  className="absolute inset-0 h-full w-full rounded-full bg-violet-500/20"
                />
              )}
              <span className="relative z-20 flex items-center gap-1">
                {item.name}
                {isCapabilities && (
                  <svg
                    className={cn(
                      "w-3 h-3 text-slate-400 group-hover:text-white transition-transform duration-200",
                      hovered === idx && "rotate-180"
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </span>
            </a>

            {/* Mega Menu Dropdown under "Capabilities" */}
            {isCapabilities && hovered === idx && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 w-[900px] max-h-[520px] overflow-y-auto p-8 rounded-2xl border border-violet-500/30 bg-[#0E0C23]/95 backdrop-blur-xl shadow-2xl shadow-black/80 z-[100] text-left custom-scrollbar"
              >
                <div className="grid grid-cols-3 gap-8">
                  {/* Column 1: Technology */}
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#3B82F6] font-bold mb-4">— Technology</p>
                    <div className="space-y-4">
                      {[
                        { title: "Business Intelligence & Insights", desc: "Leverage deep analytics and automated reporting." },
                        { title: "Generative AI Fine Tuning", desc: "Optimize pre-trained LLMs with domain data." },
                        { title: "Agentic AI & Implementation", desc: "Deploy autonomous multi-agent networks." },
                        { title: "AI Adoption Roadmaps (ML)", desc: "Timelines and integration for classic ML." },
                        { title: "AI Adoption Roadmaps (Agentic)", desc: "Plan structural migrations to agents." },
                        { title: "Predictive Analytics & Forecasting", desc: "Identify market changes and customer trends." },
                        { title: "Technology & AI Consulting", desc: "Consult on infrastructure and security." },
                      ].map((item) => (
                        <a
                          key={item.title}
                          href="/capabilities?category=technology"
                          className="group/item block cursor-pointer"
                        >
                          <p className="text-xs font-semibold text-white group-hover/item:text-[#3B82F6] transition-colors">{item.title}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Strategy */}
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#10B981] font-bold mb-4">— Strategy</p>
                    <div className="space-y-4">
                      {[
                        { title: "Cost Optimization Strategy", desc: "Minimize cloud and computation expenses." },
                        { title: "Business & Product Strategy", desc: "Align agent features with business goals." },
                        { title: "Insights Framework & Automation", desc: "Automate metrics delivery across teams." },
                        { title: "Pricing & Strategy Consulting", desc: "Develop monetization and pricing models." },
                        { title: "Operational Perfomance Consulting", desc: "Audit and solve workflow bottlenecks." },
                        { title: "Go-To-Market & Predictive Revenue", desc: "Predict pipeline changes and audience value." },
                        { title: "Strategy & Research Consulting", desc: "Market research to validate positioning." },
                      ].map((item) => (
                        <a
                          key={item.title}
                          href="/capabilities?category=strategy"
                          className="group/item block cursor-pointer"
                        >
                          <p className="text-xs font-semibold text-white group-hover/item:text-[#10B981] transition-colors">{item.title}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Advisory */}
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#06B6D4] font-bold mb-4">— Advisory</p>
                    <div className="space-y-4">
                      {[
                        { title: "Agentic Automation & ML Integration", desc: "Connect agent pipelines with ML workflows." },
                        { title: "Predictive Analytics & Forecasting", desc: "Risk mitigation and portfolio modeling." },
                        { title: "Market & Industry Research", desc: "Collect competitor intel and industry trends." },
                        { title: "Financial Analytics & Forecasting", desc: "Simulate balance sheets and predict revenue." },
                        { title: "Financial Advisory Capability", desc: "Consult on investment and compliance." },
                      ].map((item) => (
                        <a
                          key={item.title}
                          href="/capabilities?category=advisory"
                          className="group/item block cursor-pointer"
                        >
                          <p className="text-xs font-semibold text-white group-hover/item:text-[#06B6D4] transition-colors">{item.title}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(12px)" : "none",
        boxShadow: visible
          ? "0 0 30px rgba(124, 92, 255, 0.25), 0 1px 1px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(124, 92, 255, 0.3), 0 0 4px rgba(124, 92, 255, 0.2), 0 16px 68px rgba(0, 0, 0, 0.5)"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "16px" : "0px",
        paddingLeft: visible ? "16px" : "0px",
        borderRadius: visible ? "1.5rem" : "0px",
        y: visible ? 16 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-3 lg:hidden",
        visible && "bg-black/60 border border-violet-500/40 backdrop-blur-md",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl bg-card px-6 py-8 border border-border/80 shadow-2xl shadow-black/40",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-foreground cursor-pointer" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-foreground cursor-pointer" onClick={onClick} />
  );
};

interface NavbarLogoProps {
  children?: React.ReactNode;
  className?: string;
  href?: string;
}

export const NavbarLogo = ({ children, className, href = "#" }: NavbarLogoProps) => {
  return (
    <a
      href={href}
      className={cn("relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-foreground group", className)}
    >
      {children}
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient" | "ember";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 text-sm font-medium relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "bg-white text-black rounded-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent text-muted-foreground hover:text-foreground shadow-none",
    dark: "bg-black text-white rounded-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white rounded-full shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
    ember:
      "bg-ember-gradient text-primary-foreground rounded-full hover:shadow-ember shadow-lg shadow-black/20",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
