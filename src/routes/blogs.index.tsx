import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ArrowRight, BookOpen, Calendar, User } from "lucide-react";
import { useState, useEffect } from "react";
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

interface Post {
  title: string;
  slug: { current: string };
  mainImage: any;
  publishedAt: string;
  excerpt?: string;
  authorName?: string;
  authorImage?: any;
}

// Server function to fetch posts strictly on the server side
const getPosts = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const posts = await client.fetch<Post[]>(`
      *[_type == "post"] | order(publishedAt desc) {
        title,
        slug,
        mainImage,
        publishedAt,
        "excerpt": pt::text(body[0..1]),
        "authorName": author->name,
        "authorImage": author->image
      }
    `);
    return posts || [];
  } catch (error) {
    console.error("Failed to fetch posts from Sanity on server:", error);
    return [];
  }
});

export const Route = createFileRoute("/blogs/")({
  loader: async () => {
    const posts = await getPosts();
    return { posts };
  },
  head: () => ({
    meta: [
      { title: "Blogs — Optylize Insights" },
      { name: "description", content: "Opinions, guides, and engineering logs from our GenAI consulting team." },
    ],
  }),
  component: BlogsPage,
});

function BlogsPage() {
  const { posts } = Route.useLoaderData();
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

  const featuredPost = posts[0];
  const gridPosts = posts.slice(1);

  // Fallback images
  const defaultImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="min-h-screen text-foreground bg-[#16142E]">
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
                  className={`text-sm font-medium transition-colors py-1 w-full text-left ${item.name === "Blogs" ? "text-violet-400 font-semibold" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {item.name}
                </a>
              );
            })}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero Header */}
      <main className="w-full">
        <div className="text-center pt-40 pb-20 px-6 max-w-4xl mx-auto">
          <p className="tracking-[0.2em] text-xs uppercase mb-4" style={{ color: "#9B7FFF" }}>Optylize Insights</p>
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-6 animate-fade-in">The Optylize Blog</h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Opinions, guides, and engineering logs from our GenAI consulting team.
          </p>
        </div>

        {/* Transition to Light Beige Content */}
        <div className="w-full bg-[#F5F2EB] py-20 border-t border-[#EAE6DD]">
          <div className="max-w-7xl mx-auto px-6">
            
            {posts.length === 0 ? (
              <div className="text-center py-20 bg-[#FAF8F5] border border-[#EADFCF]/50 rounded-2xl max-w-2xl mx-auto">
                <BookOpen className="w-12 h-12 text-[#786D5F] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#24211D] font-serif mb-2">No Posts Yet</h3>
                <p className="text-sm text-[#6E6458]">Check back soon! We are drafting posts in our studio.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-16 max-w-6xl mx-auto">
                
                {/* Featured Post Card */}
                {featuredPost && (
                  <Link
                    to="/blogs/$slug"
                    params={{ slug: featuredPost.slug.current }}
                    className="group flex flex-col lg:flex-row bg-[#FAF8F5] border border-[#EADFCF]/50 hover:border-[#D0C0AC] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(36,33,29,0.02)] hover:shadow-[0_12px_30px_rgba(36,33,29,0.06)] transition-all duration-300 cursor-pointer w-full"
                  >
                    {/* Left: Image */}
                    <div className="lg:w-7/12 relative overflow-hidden h-72 lg:h-auto min-h-[300px]">
                      <img
                        src={featuredPost.mainImage ? urlFor(featuredPost.mainImage).width(800).height(500).url() : defaultImage}
                        alt={featuredPost.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-[#24211D] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                        Featured
                      </div>
                    </div>

                    {/* Right: Content */}
                    <div className="lg:w-5/12 p-8 md:p-10 flex flex-col justify-between">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-xs text-[#786D5F]">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        
                        <h2 className="text-2xl md:text-3xl font-bold text-[#24211D] font-serif leading-tight group-hover:text-black transition-colors duration-300">
                          {featuredPost.title}
                        </h2>

                        <p className="text-sm text-[#6E6458] leading-relaxed line-clamp-3">
                          {featuredPost.excerpt || "Click to read the full post and explore details."}
                        </p>
                      </div>

                      {/* Author & Footer */}
                      <div className="mt-8 pt-6 border-t border-[#EFECE6] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {featuredPost.authorImage ? (
                            <img
                              src={urlFor(featuredPost.authorImage).width(80).height(80).url()}
                              alt={featuredPost.authorName}
                              className="w-8 h-8 rounded-full object-cover border border-[#EADFCF]"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-[#EFEBE4] flex items-center justify-center border border-[#EADFCF]">
                              <User className="w-4 h-4 text-[#786D5F]" />
                            </div>
                          )}
                          <span className="text-xs font-semibold text-[#24211D]">{featuredPost.authorName || "Optylize Writer"}</span>
                        </div>

                        <span className="text-xs font-bold text-[#5A5043] group-hover:text-black flex items-center gap-1">
                          Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Grid Section */}
                {gridPosts.length > 0 && (
                  <div className="flex flex-col gap-8">
                    <h3 className="text-lg font-bold text-[#24211D] font-serif tracking-tight border-b border-[#EAE6DD] pb-4">
                      Latest Articles
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {gridPosts.map((post) => (
                        <Link
                          key={post.slug.current}
                          to="/blogs/$slug"
                          params={{ slug: post.slug.current }}
                          className="group bg-[#FAF8F5] border border-[#EADFCF]/50 hover:border-[#D0C0AC] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(36,33,29,0.02)] hover:shadow-[0_12px_30px_rgba(36,33,29,0.06)] transition-all duration-300 flex flex-col justify-between cursor-pointer"
                        >
                          <div>
                            {/* Image */}
                            <div className="relative overflow-hidden h-48 w-full">
                              <img
                                src={post.mainImage ? urlFor(post.mainImage).width(500).height(300).url() : defaultImage}
                                alt={post.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                              />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                              <span className="flex items-center gap-1.5 text-[11px] text-[#786D5F] mb-3">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>

                              <h4 className="text-lg font-bold text-[#24211D] font-serif mb-2 leading-snug group-hover:text-black transition-colors duration-300 line-clamp-2">
                                {post.title}
                              </h4>

                              <p className="text-xs text-[#6E6458] leading-relaxed line-clamp-2">
                                {post.excerpt || "Click to read the full article."}
                              </p>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="px-6 pb-6 pt-4 border-t border-[#EFECE6] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {post.authorImage ? (
                                <img
                                  src={urlFor(post.authorImage).width(60).height(60).url()}
                                  alt={post.authorName}
                                  className="w-6 h-6 rounded-full object-cover border border-[#EADFCF]"
                                />
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-[#EFEBE4] flex items-center justify-center border border-[#EADFCF]">
                                  <User className="w-3 h-3 text-[#786D5F]" />
                                </div>
                              )}
                              <span className="text-[11px] font-semibold text-[#24211D]">{post.authorName || "Optylize"}</span>
                            </div>

                            <span className="text-[11px] font-bold text-[#5A5043] group-hover:text-black flex items-center gap-1">
                              Read Post <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
