"use client";

import { motion, useMotionValue, useMotionTemplate, MotionValue } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { PortfolioData } from "../types/portfolio";

interface HeroProps {
  data: PortfolioData;
  heroY: MotionValue<number>;
  heroOpacity: MotionValue<number>;
}

export default function Hero({ data, heroY, heroOpacity }: HeroProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden group/hero"
    >
      {/* Interactive Radial Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-10 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, var(--spotlight-color), transparent 80%)`,
        }}
      />

      {/* Spotlight Grid Reveal */}
      <motion.div
        className="absolute inset-0 grid-pattern pointer-events-none -z-10 transition-opacity duration-500"
        style={{
          maskImage: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, black 60%, transparent 100%)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, black 60%, transparent 100%)`,
        }}
      />

      {/* Floating gradient blobs for depth */}
      <div className="absolute top-1/4 left-1/4 w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-blue-500/10 to-amber-500/5 dark:from-blue-600/15 dark:to-indigo-900/10 blur-[85px] pointer-events-none -z-20 animate-float-1" />
      <div className="absolute bottom-1/4 right-1/4 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-amber-500/5 to-cyan-500/10 dark:from-indigo-900/10 dark:to-blue-600/15 blur-[95px] pointer-events-none -z-20 animate-float-2" />

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-700 dark:text-blue-300 dark:bg-blue-950/40 dark:border-blue-900/40 text-xs font-medium mb-6"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Available for freelance & full-time</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-gradient"
        >
          {data.hero.name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl md:text-3xl text-slate-700 dark:text-gray-300 font-medium mb-6"
        >
          {data.hero.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-lg text-slate-500 dark:text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          {data.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-white dark:text-black dark:hover:bg-gray-200 font-semibold text-sm transition-all flex items-center gap-2 group w-full sm:w-auto justify-center"
          >
            <span>View Projects</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full border border-blue-600/20 text-blue-600 hover:bg-blue-50/50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white font-semibold text-sm transition-all w-full sm:w-auto justify-center flex items-center"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Apple mouse scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-white/20 flex justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-white/40"
          />
        </div>
        <span className="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-widest">
          Scroll
        </span>
      </div>
    </section>
  );
}
