"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { PortfolioData } from "../types/portfolio";

interface FooterProps {
  data: PortfolioData;
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="py-12 px-6 border-t border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-black text-slate-800 dark:text-white">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-xs text-slate-500 dark:text-gray-500">
          &copy; {new Date().getFullYear()} {data.hero.name}. All rights reserved. Designed with Apple aesthetic.
        </p>

        <div className="flex gap-6 text-slate-500 dark:text-gray-400">
          <a
            href={data.hero.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={data.hero.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${data.contact.email}`}
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
