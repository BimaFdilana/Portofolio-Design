"use client";

import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring, MotionValue } from "framer-motion";
import { Sparkles, ArrowUpRight, Code2, Zap, Star } from "lucide-react";
import { PortfolioData } from "../types/portfolio";

interface HeroProps {
  data: PortfolioData;
  heroY: MotionValue<number>;
  heroOpacity: MotionValue<number>;
}

// Floating particle component
function Particle({ x, y, color, size, delay }: { x: string; y: string; color: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, -10, 0],
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.4, 1],
      }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

// Floating icon badge
function FloatingBadge({
  icon: Icon,
  label,
  color,
  className,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  color: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 200 }}
      className={`absolute hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl glass-card text-xs font-semibold ${className}`}
      style={{ borderColor: color + "40" }}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </motion.div>
      <span className="text-slate-700 dark:text-slate-200">{label}</span>
    </motion.div>
  );
}

export default function Hero({ data, heroY, heroOpacity }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const particles = [
    { x: "8%",  y: "15%", color: "#6366f1", size: 6,  delay: 0 },
    { x: "92%", y: "20%", color: "#ec4899", size: 8,  delay: 0.8 },
    { x: "15%", y: "75%", color: "#06b6d4", size: 5,  delay: 1.5 },
    { x: "85%", y: "70%", color: "#f59e0b", size: 7,  delay: 0.4 },
    { x: "50%", y: "10%", color: "#8b5cf6", size: 5,  delay: 2.1 },
    { x: "25%", y: "45%", color: "#10b981", size: 4,  delay: 1.2 },
    { x: "75%", y: "50%", color: "#f43f5e", size: 6,  delay: 0.6 },
    { x: "60%", y: "85%", color: "#3b82f6", size: 5,  delay: 1.8 },
    { x: "5%",  y: "50%", color: "#a855f7", size: 4,  delay: 2.5 },
    { x: "95%", y: "45%", color: "#14b8a6", size: 5,  delay: 0.9 },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
    >
      {/* ── Animated gradient background ── */}
      <div className="absolute inset-0 hero-gradient-bg opacity-20 dark:opacity-30 -z-30" />

      {/* ── Mesh gradient layer ── */}
      <div className="absolute inset-0 hero-mesh opacity-60 dark:opacity-70 -z-20" />

      {/* ── Grid pattern ── */}
      <div className="absolute inset-0 grid-pattern opacity-40 -z-10" />

      {/* ── Interactive mouse spotlight ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background: useMotionTemplate`radial-gradient(700px circle at ${springX}px ${springY}px, rgba(139,92,246,0.18), transparent 70%)`,
        }}
      />

      {/* ── Grid reveal on mouse ── */}
      <motion.div
        className="absolute inset-0 grid-pattern pointer-events-none -z-10"
        style={{
          maskImage: useMotionTemplate`radial-gradient(500px circle at ${springX}px ${springY}px, black 50%, transparent 100%)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(500px circle at ${springX}px ${springY}px, black 50%, transparent 100%)`,
          opacity: 0.6,
        }}
      />

      {/* ── Large floating blobs ── */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-violet-500/25 to-indigo-500/15 dark:from-violet-600/30 dark:to-indigo-900/20 blur-[100px] pointer-events-none -z-20 animate-float-1" />
      <div className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/15 dark:from-pink-600/25 dark:to-rose-900/20 blur-[110px] pointer-events-none -z-20 animate-float-2" />
      <div className="absolute top-[40%] right-[15%] w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-cyan-500/20 to-teal-500/15 dark:from-cyan-600/25 dark:to-teal-900/20 blur-[90px] pointer-events-none -z-20 animate-float-3" />
      <div className="absolute bottom-[30%] left-[15%] w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-amber-500/15 to-orange-500/10 dark:from-amber-600/20 dark:to-orange-900/15 blur-[85px] pointer-events-none -z-20 animate-float-1" />

      {/* ── Floating particles ── */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* ── Floating tech badges ── */}
      <FloatingBadge icon={Code2}   label="Next.js 14"      color="#6366f1" className="top-[22%] left-[6%]"   delay={1.0} />
      <FloatingBadge icon={Zap}     label="Framer Motion"   color="#ec4899" className="top-[22%] right-[6%]"  delay={1.3} />
      <FloatingBadge icon={Star}    label="TypeScript"      color="#06b6d4" className="bottom-[28%] left-[5%]" delay={1.6} />
      <FloatingBadge icon={Sparkles} label="Tailwind CSS"   color="#f59e0b" className="bottom-[28%] right-[5%]" delay={1.9} />

      {/* ── Main content ── */}
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center max-w-4xl relative z-10">

        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(236,72,153,0.1))",
            border: "1px solid rgba(139,92,246,0.3)",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-400"
          />
          <Sparkles className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" />
          <span className="text-violet-700 dark:text-violet-300">Available for freelance & full-time</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, type: "spring", stiffness: 100 }}
          className="text-6xl md:text-8xl font-extrabold tracking-tight mb-4 text-gradient leading-none"
        >
          {data.hero.name}
        </motion.h1>

        {/* Title with colorful underline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300 inline-block relative">
            {data.hero.title}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full origin-left"
              style={{ background: "linear-gradient(90deg, #6366f1, #ec4899, #f59e0b)" }}
            />
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          {data.hero.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          {/* Primary button with gradient */}
          <a
            href="#projects"
            className="group relative px-8 py-3.5 rounded-full font-semibold text-sm text-white overflow-hidden flex items-center gap-2 w-full sm:w-auto justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)" }}
          >
            <motion.span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #db2777)" }}
            />
            <span className="relative z-10">View Projects</span>
            <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Secondary glass button */}
          <a
            href="#contact"
            className="group px-8 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 w-full sm:w-auto justify-center transition-all duration-300"
            style={{
              background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.3)",
              color: "inherit",
            }}
          >
            <span className="text-violet-700 dark:text-violet-300 group-hover:text-violet-600 dark:group-hover:text-violet-200 transition-colors">
              Get in Touch
            </span>
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 flex justify-center gap-8 md:gap-16"
        >
          {[
            { value: "3+", label: "Years Exp.", color: "#6366f1" },
            { value: "20+", label: "Projects", color: "#ec4899" },
            { value: "10+", label: "Tech Stack", color: "#06b6d4" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <motion.p
                className="text-3xl md:text-4xl font-extrabold"
                style={{ color: stat.color }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1, type: "spring" }}
              >
                {stat.value}
              </motion.p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
        <div
          className="w-6 h-10 rounded-full flex justify-center p-1.5"
          style={{ border: "2px solid rgba(139,92,246,0.4)" }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
          />
        </div>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Scroll
        </span>
      </div>
    </section>
  );
}
