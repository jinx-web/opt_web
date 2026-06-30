import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { useState, useEffect } from "react";
import { PortableText } from "@portabletext/react";
import { z } from "zod";
import logoUrl from "../logo.png";
import { client, urlFor } from "@/lib/sanity";
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

interface PostDetail {
  title: string;
  mainImage: any;
  publishedAt: string;
  body: any[];
  authorName?: string;
  authorImage?: any;
  authorBio?: any[];
}

// Server function to fetch post detail strictly on server
const getPostDetail = createServerFn({ method: "GET" })
  .validator((slug: string) => z.string().parse(slug))
  .handler(async ({ data: slug }) => {
    try {
      const post = await client.fetch<PostDetail>(
        `
        *[_type == "post" && slug.current == $slug][0] {
          title,
          mainImage,
          publishedAt,
          body,
          "authorName": author->name,
          "authorImage": author->image,
          "authorBio": author->bio
        }
      `,
        { slug }
      );
      return post || null;
    } catch (error) {
      console.error("Failed to fetch post details on server:", error);
      return null;
    }
  });

export const Route = createFileRoute("/blogs/$slug")({
  loader: async ({ params }) => {
    const post = await getPostDetail({ data: params.slug });
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.post?.title || "Blog Detail"} — Optylize` },
      { name: "description", content: "Read our full insights and guidelines from Optylize." },
    ],
  }),
  component: PostDetailPage,
});

// Custom rendering styles for Sanity Block/PortableText content
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <img
            src={urlFor(value).width(900).url()}
            alt={value.alt || "Sanity illustration"}
            className="w-full rounded-2xl object-cover border border-[#EADFCF]/50 shadow-sm"
          />
          {value.caption && (
            <figcaption className="text-center text-xs text-[#786D5F] mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#24211D] mt-10 mb-4 leading-tight">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#24211D] mt-10 mb-4 leading-tight">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl md:text-2xl font-serif font-bold text-[#24211D] mt-8 mb-3 leading-tight">{children}</h3>,
    normal: ({ children }: any) => <p className="text-base md:text-lg text-[#6E6458] leading-relaxed mb-6">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-[#9B7FFF] pl-5 italic my-8 text-[#24211D] bg-[#F2ECE1]/50 py-4 pr-5 rounded-r-2xl font-serif text-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-[#6E6458] text-base md:text-lg">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-[#6E6458] text-base md:text-lg">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-[#9B7FFF] underline font-medium hover:text-[#7C5CFF] transition-colors"
        >
          {children}
        </a>
      );
    },
  },
};

function PostDetailPage() {
  const { post } = Route.useLoaderData();
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
    { name: "Blogs", link: "/blogs" },
    { name: "Contact us", link: "/contact" },
  ];

  if (!post) {
    return (
      <div className="min-h-screen text-foreground bg-[#16142E] flex flex-col justify-between">
        <Navbar>
          <NavBody>
            <NavbarLogo href="/">
              <img src={logoUrl} alt="Optylize Logo" className="w-7 h-7 object-contain rounded-full" />
              <span className="font-sans font-bold text-lg tracking-tight bg-gradient-to-r from-white via-white to-violet-300 bg-clip-text text-transparent">Optylize</span>
            </NavbarLogo>
            <NavItems items={navItems} />
          </NavBody>
        </Navbar>
        <div className="text-center py-40 max-w-xl mx-auto px-6">
          <h2 className="text-3xl font-serif text-white mb-4">Post Not Found</h2>
          <p className="text-base text-muted-foreground mb-8">The blog article you are looking for does not exist or has been deleted.</p>
          <Link to="/blogs" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-650 hover:bg-violet-750 text-white font-semibold transition">
            <ArrowLeft className="w-4 h-4" /> Back to Blogs
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const defaultImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="min-h-screen text-foreground bg-[#16142E]">
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

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => {
              if (item.name === "Capabilities") {
                return (
                  <div key={`mobile-link-${idx}`} className="w-full flex flex-col gap-2">
                    <a href="/capabilities" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-sm font-semibold tracking-wider uppercase text-left w-full">— {item.name}</a>
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
                  className={`text-sm font-medium transition-colors py-1 w-full text-left ${item.name === "Blogs" ? "text-violet-400 font-semibold" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {item.name}
                </a>
              );
            })}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <main className="w-full">
        {/* Header Block */}
        <div className="max-w-4xl mx-auto px-6 pt-40 pb-12">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-400 hover:text-white transition-colors mb-6 group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author Badge & Publish Details */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-2 border-t border-zinc-800/60">
            <div className="flex items-center gap-3">
              {post.authorImage ? (
                <img
                  src={urlFor(post.authorImage).width(80).height(80).url()}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full object-cover border border-[#EADFCF]/25"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <User className="w-4 h-4 text-zinc-400" />
                </div>
              )}
              <div>
                <p className="font-semibold text-white">{post.authorName || "Optylize Writer"}</p>
                <p className="text-xs text-muted-foreground">GenAI Consulting Lead</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-violet-400" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Transition to Warm Light Content backdrop */}
        <div className="w-full bg-[#F5F2EB] py-16 border-t border-[#EAE6DD]">
          <div className="max-w-4xl mx-auto px-6">
            
            {/* Banner Cover Image */}
            <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden mb-12 shadow-md border border-[#EADFCF]/50">
              <img
                src={post.mainImage ? urlFor(post.mainImage).width(1200).height(600).url() : defaultImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Rendered Block Content */}
            <div className="prose prose-stone max-w-none text-[#6E6458]">
              <PortableText value={post.body || []} components={portableTextComponents} />
            </div>

            {/* Author Footer Bio */}
            {post.authorName && (
              <div className="mt-16 pt-8 border-t border-[#EAE6DD] flex flex-col md:flex-row gap-6 items-start bg-[#FAF8F5] border border-[#EADFCF]/35 p-6 rounded-2xl">
                {post.authorImage && (
                  <img
                    src={urlFor(post.authorImage).width(120).height(120).url()}
                    alt={post.authorName}
                    className="w-16 h-16 rounded-full object-cover border border-[#EADFCF]/40"
                  />
                )}
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-[#24211D] font-serif mb-2">Written by {post.authorName}</h4>
                  <p className="text-sm text-[#6E6458] leading-relaxed">
                    Consulting architect and writer at Optylize. Helps growth-stage companies formulate product strategies and ship production-ready agentic workloads.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
