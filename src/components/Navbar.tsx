"use client";

import { useState } from "react";
import { motion, MotionValue } from "framer-motion";
import { Sparkles, Sun, Moon, Menu, X } from "lucide-react";
import { PortfolioData } from "../types/portfolio";

interface NavbarProps {
  data: PortfolioData;
  theme: "light" | "dark";
  toggleTheme: () => void;
  isScrolled: boolean;
  activeSection: string;
  scrollYProgress: MotionValue<number>;
  scaleX: any;
}

export default function Navbar({
  data,
  theme,
  toggleTheme,
  isScrolled,
  activeSection,
  scaleX,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Colorful scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f59e0b, #06b6d4)",
        }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "glass py-3 shadow-lg shadow-violet-500/5" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#hero"
            className="font-bold text-lg tracking-tight flex items-center gap-2 group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-gradient font-extrabold">{data.hero.name}</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {["projects", "skills", "about", "contact"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`capitalize transition-all relative py-1 ${
                  activeSection === section
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {section}
                {activeSection === section && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: "linear-gradient(90deg, #6366f1, #ec4899)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}

            <a
              href="/admin"
              className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all"
              style={{
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.25)",
                color: "#6366f1",
              }}
            >
              Admin
            </a>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-all hover:scale-110"
              style={{
                background: "rgba(139,92,246,0.1)",
                border: "1px solid rgba(139,92,246,0.2)",
              }}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-violet-600" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors text-slate-600 dark:text-slate-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 glass py-6 px-8 flex flex-col gap-4 shadow-2xl border-t md:hidden"
            style={{ borderColor: "rgba(139,92,246,0.15)" }}
          >
            {["projects", "skills", "about", "contact"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`capitalize text-base font-medium transition-colors ${
                  activeSection === section
                    ? "text-violet-600 dark:text-violet-400"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {section}
              </a>
            ))}

            <div className="flex gap-3 items-center mt-2">
              <a
                href="/admin"
                className="flex-grow text-center font-semibold py-2.5 rounded-xl text-white text-sm transition-all"
                style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
              >
                Admin Panel
              </a>
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl transition-all"
                style={{
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.2)",
                }}
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-violet-600" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
}
