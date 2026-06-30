import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import { Mail, Phone, Building, Loader2, Send, CheckCircle2 } from "lucide-react";
import { Toaster, toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
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

// Zod Schema for validation
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type ContactInput = z.infer<typeof contactSchema>;



// Server Function: Handle contact form SMTP / mock submission
const submitContactForm = createServerFn({ method: "POST" })
  .validator((data: ContactInput) => {
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(parsed.error.errors[0].message);
    }
    return parsed.data;
  })
  .handler(async ({ data }) => {
    const { name, email, company, message } = data;

    // Retrieve SMTP configurations
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const secure = process.env.SMTP_SECURE === "true";
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;
    const to = process.env.SMTP_TO;

    console.log("========================================");
    console.log("NEW CONTACT INQUIRY RECEIVED:");
    console.log(`Name:    ${name}`);
    console.log(`Email:   ${email}`);
    console.log(`Company: ${company || "N/A"}`);
    console.log(`Message: ${message}`);
    console.log("========================================");

    if (host && user && pass && to) {
      try {
        const nodemailer = await import("nodemailer");
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure,
          auth: {
            user,
            pass,
          },
        });

        await transporter.sendMail({
          from: from,
          to: to,
          subject: `New Contact Request from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nMessage: ${message}`,
          html: `
            <h2>New Optylize Platform Contact Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || "N/A"}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f4f4f5; padding: 12px; border-left: 4px solid #8b5cf6;">
              ${message.replace(/\n/g, "<br>")}
            </blockquote>
          `,
        });
        return { success: true, message: "Email sent successfully via SMTP!" };
      } catch (err: any) {
        console.error("Failed to send SMTP email:", err);
        throw new Error(`SMTP Error: ${err.message || err}`);
      }
    } else {
      // Simulated successful fallback
      console.log("SMTP environment variables not configured. Simulated form processing successful.");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return {
        success: true,
        message: "Form received! Configure SMTP environment variables to enable real email transmission.",
        simulated: true,
      };
    }
  });

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Optylize AI" },
      { name: "description", content: "Get in touch with the Optylize Enterprise AI team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [svg, setSvg] = useState<string>("");
  const [isLoadingMap, setIsLoadingMap] = useState<boolean>(true);

  useEffect(() => {
    fetch("/world.svg")
      .then((res) => res.text())
      .then((svgText) => {
        let content = svgText;
        if (!content.includes("viewBox=")) {
          content = content.replace("<svg", '<svg viewBox="0 0 1009.6727 665.96301"');
        }
        setSvg(content);
        setIsLoadingMap(false);
      })
      .catch((err) => {
        console.error("Failed to load map client side:", err);
        setIsLoadingMap(false);
      });
  }, []);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState<ContactInput>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const navItems = [
    { name: "About Us", link: "/#about" },
    { name: "Industry", link: "/#industry" },
    { name: "Capabilities", link: "/capabilities" },
    { name: "Products", link: "/#products" },
    { name: "Blogs", link: "/blogs" },
    { name: "Contact us", link: "/contact" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactInput] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      toast.error("Please fix the validation errors in the form.");
      return;
    }

    try {
      const response = await submitContactForm({ data: formData });
      if (response.success) {
        setSubmitSuccess(true);
        toast.success(response.message, { duration: 5000 });
        setFormData({ name: "", email: "", company: "", message: "" });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-foreground relative overflow-hidden" style={{ background: "#16142E" }}>
      <Toaster position="bottom-right" theme="dark" />

      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[60%] rounded-full bg-violet-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-25%] w-[60%] h-[60%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <Navbar>
        <NavBody>
          <NavbarLogo href="/">
            <img src={logoUrl} alt="Optylize Logo" className="w-7 h-7 object-contain rounded-full group-hover:scale-105 transition-transform" />
            <span className="font-sans font-bold text-lg tracking-tight bg-gradient-to-r from-white via-white to-violet-300 bg-clip-text text-transparent">Optylize</span>
          </NavbarLogo>
          <NavItems items={navItems} />
        </NavBody>

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
                      className="text-white text-sm font-semibold tracking-wider uppercase text-left w-full"
                    >
                      — {item.name}
                    </a>
                    <div className="pl-4 flex flex-col gap-3 border-l border-violet-500/20 text-left w-full">
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
                  className={`text-sm font-medium transition-colors py-1 w-full text-left ${item.name === "Contact us" ? "text-violet-400 font-semibold" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {item.name}
                </a>
              );
            })}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Main Grid Content */}
      <main className="max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Info & Map */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              {/* Mail Icon badge */}
              <div className="inline-flex w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 items-center justify-center text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.1)]">
                <Mail className="w-5 h-5" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-normal tracking-tight">
                Contact us
              </h1>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
                We are always looking for ways to improve our products and services. Contact us and let us know how we can help you.
              </p>
            </div>

            {/* Direct Contact Links */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-zinc-400 font-mono">
              <span className="hover:text-white transition-colors cursor-pointer">contact@optylize.ai</span>
              <span className="text-zinc-600 font-sans">•</span>
              <span className="hover:text-white transition-colors cursor-pointer">+1 (800) 123 9999</span>
              <span className="text-zinc-600 font-sans">•</span>
              <span className="hover:text-white transition-colors cursor-pointer">support@optylize.ai</span>
            </div>

            {/* SVG Map Section */}
            <div className="relative w-full aspect-[1009/665] rounded-2xl overflow-hidden bg-zinc-950/40 border border-violet-500/10 shadow-[0_15px_30px_rgba(0,0,0,0.3)]">
              {/* Embedded Styles for SVG */}
              <style dangerouslySetInnerHTML={{
                __html: `
                .world-svg-map svg {
                  width: 100%;
                  height: 100%;
                  display: block;
                }
                .world-svg-map svg path {
                  fill: #141324;
                  stroke: #25243d;
                  stroke-width: 0.8;
                  transition: fill 0.3s ease, stroke 0.3s ease;
                }
                .world-svg-map svg path:hover {
                  fill: #1e1b4b;
                  stroke: #4f46e5;
                }
                .world-svg-map svg path#IN {
                  fill: #1c1a3b;
                  stroke: #3b82f6;
                  stroke-width: 1.2;
                }
              `}} />

              {/* World SVG Map */}
              {isLoadingMap ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
                </div>
              ) : (
                <div
                  className="world-svg-map w-full h-full flex items-center justify-center opacity-65"
                  dangerouslySetInnerHTML={{ __html: svg }}
                />
              )}

              {/* Glowing Pin Over Delhi, India (X = 68.5%, Y = 57.0%) */}
              <div
                className="absolute"
                style={{ left: "68.5%", top: "57.0%" }}
              >
                {/* Horizontal light center coordinate holder */}
                <div className="relative flex items-center justify-center w-0 h-0">
                  {/* Pin outer waves */}
                  <div className="absolute w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 animate-pulse" />
                  <div className="absolute w-5 h-5 rounded-full bg-blue-500/30 animate-ping" />
                  {/* Pin core dot */}
                  <div className="absolute w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,1)]" />

                  {/* Vertical light beam (3D beam effect) */}
                  <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-t from-blue-500 via-blue-500/20 to-transparent" />

                  {/* Tooltip Badge at the top of the beam */}
                  <div className="absolute bottom-[84px] left-1/2 -translate-x-1/2 bg-zinc-900/90 border border-zinc-800 text-zinc-100 text-[10px] font-sans font-medium px-2 py-0.5 rounded shadow-[0_4px_12px_rgba(0,0,0,0.5)] whitespace-nowrap tracking-wide">
                    We are here
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Form Card */}
          <div className="lg:col-span-6">
            <div
              className="relative p-8 rounded-3xl bg-[#131128]/70 backdrop-blur-md border border-violet-500/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden group"
              style={{
                backgroundImage: 'radial-gradient(circle at center, transparent 40%, #131128 100%), linear-gradient(to right, rgba(139, 92, 246, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(139, 92, 246, 0.03) 1px, transparent 1px)',
                backgroundSize: '100% 100%, 20px 20px, 20px 20px',
              }}
            >
              {/* Card Hover Border Glow */}
              <div className="absolute inset-0 border border-violet-500/10 rounded-3xl pointer-events-none group-hover:border-violet-500/20 transition-colors duration-300" />

              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center py-12 gap-4"
                  >
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
                    <h3 className="text-2xl font-serif text-white">Thank you!</h3>
                    <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
                      Your inquiry has been successfully received. A representative from the Optylize team will reach out to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-6 text-xs text-violet-400 hover:text-white border border-violet-500/20 hover:border-violet-500/40 rounded-xl px-4 py-2 bg-violet-500/5 transition-all"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Full Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs md:text-sm font-medium text-zinc-300">
                        Full name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className={`w-full rounded-xl bg-zinc-950/40 border ${errors.name ? "border-rose-500/50" : "border-zinc-800"
                          } px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all`}
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <span className="text-xs text-rose-500 mt-0.5">{errors.name}</span>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs md:text-sm font-medium text-zinc-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="support@optylize.com"
                        className={`w-full rounded-xl bg-zinc-950/40 border ${errors.email ? "border-rose-500/50" : "border-zinc-800"
                          } px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all`}
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <span className="text-xs text-rose-500 mt-0.5">{errors.email}</span>
                      )}
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className="text-xs md:text-sm font-medium text-zinc-300">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Optylize Limited"
                        className="w-full rounded-xl bg-zinc-950/40 border border-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-xs md:text-sm font-medium text-zinc-300">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Type your message here"
                        rows={4}
                        className={`w-full rounded-xl bg-zinc-950/40 border ${errors.message ? "border-rose-500/50" : "border-zinc-800"
                          } px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all resize-none`}
                        disabled={isSubmitting}
                      />
                      {errors.message && (
                        <span className="text-xs text-rose-500 mt-0.5">{errors.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-fit inline-flex items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white px-6 py-3 text-sm font-medium transition-all hover:bg-zinc-850 active:scale-[0.98] disabled:opacity-50 disabled:scale-100 hover:border-violet-500/20 shadow-md cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-violet-400" />
                          Submit
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
