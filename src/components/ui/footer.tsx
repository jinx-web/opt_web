import React from "react";
import { Mail, MapPin, Linkedin, Twitter, Github, Slack } from "lucide-react";
import logoUrl from "../../logo.png";

export function Footer() {
  const pagesList = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/#about" },
    { name: "Industry", link: "/#industry" },
    { name: "Capabilities", link: "/capabilities" },
    { name: "Products", link: "/#products" },
    { name: "Blogs", link: "/#blogs" },
    { name: "Contact Us", link: "/contact" },
  ];

  const legalList = [
    { name: "Terms of Service", link: "#" },
    { name: "Privacy Policy", link: "#" },
    { name: "Cookie Policy", link: "#" },
  ];

  const socialsList = [
    { name: "LinkedIn", link: "#", icon: Linkedin },
    { name: "Twitter", link: "#", icon: Twitter },
    { name: "GitHub", link: "#", icon: Github },
    { name: "Slack", link: "#", icon: Slack },
  ];

  const resourcesList = [
    { name: "Documentation", link: "#" },
    { name: "Tutorials", link: "#" },
    { name: "Examples", link: "#" },
    { name: "Guides", link: "#" },
    { name: "Support", link: "#" },
  ];

  const platformList = [
    { name: "Agent Studio", link: "#" },
    { name: "Architect", link: "#" },
    { name: "Blueprints", link: "#" },
    { name: "Simulation", link: "#" },
  ];

  return (
    <footer className="border-t border-zinc-800/60 py-16 bg-[#0E0C23] text-zinc-400 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10">
        
        {/* Column 1: Pages (2 cols on lg) */}
        <div className="lg:col-span-2">
          <p className="text-xs uppercase tracking-widest text-white font-bold mb-4">Pages</p>
          <ul className="space-y-2 text-sm">
            {pagesList.map((item) => (
              <li key={item.name}>
                <a href={item.link} className="hover:text-white transition-colors duration-200">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Legal (2 cols on lg) */}
        <div className="lg:col-span-2">
          <p className="text-xs uppercase tracking-widest text-white font-bold mb-4">Legal</p>
          <ul className="space-y-2 text-sm">
            {legalList.map((item) => (
              <li key={item.name}>
                <a href={item.link} className="hover:text-white transition-colors duration-200">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Socials (2 cols on lg) */}
        <div className="lg:col-span-2">
          <p className="text-xs uppercase tracking-widest text-white font-bold mb-4">Socials</p>
          <ul className="space-y-2 text-sm">
            {socialsList.map((item) => (
              <li key={item.name}>
                <a href={item.link} className="hover:text-white transition-colors duration-200">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Resources (2 cols on lg) */}
        <div className="lg:col-span-2">
          <p className="text-xs uppercase tracking-widest text-white font-bold mb-4">Resources</p>
          <ul className="space-y-2 text-sm">
            {resourcesList.map((item) => (
              <li key={item.name}>
                <a href={item.link} className="hover:text-white transition-colors duration-200">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 5: Platform (2 cols on lg) */}
        <div className="lg:col-span-2">
          <p className="text-xs uppercase tracking-widest text-white font-bold mb-4">Platform</p>
          <ul className="space-y-2 text-sm">
            {platformList.map((item) => (
              <li key={item.name}>
                <a href={item.link} className="hover:text-white transition-colors duration-200">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 6: Optylize Company Block (2 cols on lg) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img src={logoUrl} alt="Optylize Logo" className="w-7 h-7 object-contain rounded-full" />
            <span className="font-sans font-bold text-lg tracking-tight text-white">Optylize</span>
          </div>
          <p className="text-xs leading-relaxed text-zinc-400">
            Enterprise GenAI consulting for growth-stage companies. From strategy to production outcomes with measurable business value.
          </p>
          
          {/* Contact Details */}
          <div className="flex flex-col gap-1.5 text-xs text-zinc-400 mt-2">
            <a href="mailto:contact@optylize.com" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
              <Mail className="w-3.5 h-3.5 text-[#9B7FFF]" />
              <span>contact@optylize.com</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#9B7FFF]" />
              <span>Noida, India</span>
            </div>
          </div>

          {/* Social Icons Inline */}
          <div className="flex items-center gap-3 mt-2">
            {socialsList.map((social) => {
              const IconComp = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.link}
                  className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200 cursor-pointer"
                  title={social.name}
                >
                  <IconComp className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

      </div>

      {/* Divider and Copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-zinc-850 flex justify-center text-xs text-zinc-550">
        <span>© 2026 Optylize. All rights reserved.</span>
      </div>
    </footer>
  );
}
