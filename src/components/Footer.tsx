"use client";

import { Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { PortfolioData } from "../types/portfolio";

interface FooterProps {
  data: PortfolioData;
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="py-10 px-6 relative overflow-hidden">
      {/* Top gradient divider */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #6366f1, #ec4899, #06b6d4, #f59e0b, transparent)",
        }}
      />

      {/* Subtle background glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.15) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gradient">{data.hero.name}</span>
            {" "}· Built with Next.js & Framer Motion
          </p>
        </div>

        {/* Social icons */}
        <div className="flex gap-4">
          {[
            { href: data.hero.githubUrl, icon: Github, color: "#6366f1" },
            { href: data.hero.linkedinUrl, icon: Linkedin, color: "#0ea5e9" },
            { href: `mailto:${data.contact.email}`, icon: Mail, color: "#ec4899" },
          ].map(({ href, icon: Icon, color }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg transition-all hover:scale-110"
              style={{
                background: `${color}15`,
                border: `1px solid ${color}25`,
              }}
            >
              <Icon className="w-4 h-4" style={{ color }} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
