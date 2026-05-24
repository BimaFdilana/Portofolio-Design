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
  scaleX: any; // We can use the scaleX spring motion value passed down
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
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-450 to-amber-405 z-50 origin-left"
        style={{ scaleX }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "glass py-4 shadow-xl" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a
            href="#hero"
            className="font-semibold text-lg tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 text-slate-900 dark:text-white"
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>{data.hero.name}</span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {["projects", "skills", "about", "contact"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`capitalize transition-colors relative py-1 ${
                  activeSection === section
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {section}
                {activeSection === section && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-blue-600 dark:bg-blue-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
            <a
              href="/admin"
              className="text-xs px-3 py-1.5 rounded-full border border-slate-200/60 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-300/80 dark:hover:border-white/20 transition-all text-blue-600 dark:text-blue-400"
            >
              Admin Panel
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-200/60 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-slate-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 glass py-6 px-8 flex flex-col gap-4 shadow-2xl border-t border-slate-200/50 dark:border-white/5 md:hidden"
          >
            {["projects", "skills", "about", "contact"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`capitalize text-base font-medium ${
                  activeSection === section
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-600 dark:text-gray-300"
                }`}
              >
                {section}
              </a>
            ))}

            <div className="flex gap-4 items-center justify-between mt-2">
              <a
                href="/admin"
                className="flex-grow text-center font-medium py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all text-sm"
              >
                Admin Panel
              </a>
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-slate-800 dark:text-gray-300"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
}
