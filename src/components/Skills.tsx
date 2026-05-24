"use client";

import { motion } from "framer-motion";
import { Code } from "lucide-react";
import { PortfolioData } from "../types/portfolio";

interface SkillsProps {
  data: PortfolioData;
}

const SKILL_COLORS = [
  { dot: "#6366f1", glow: "rgba(99,102,241,0.2)",  border: "rgba(99,102,241,0.25)",  text: "#6366f1"  },
  { dot: "#ec4899", glow: "rgba(236,72,153,0.2)",  border: "rgba(236,72,153,0.25)",  text: "#ec4899"  },
  { dot: "#06b6d4", glow: "rgba(6,182,212,0.2)",   border: "rgba(6,182,212,0.25)",   text: "#06b6d4"  },
  { dot: "#f59e0b", glow: "rgba(245,158,11,0.2)",  border: "rgba(245,158,11,0.25)",  text: "#f59e0b"  },
  { dot: "#10b981", glow: "rgba(16,185,129,0.2)",  border: "rgba(16,185,129,0.25)",  text: "#10b981"  },
  { dot: "#8b5cf6", glow: "rgba(139,92,246,0.2)",  border: "rgba(139,92,246,0.25)",  text: "#8b5cf6"  },
  { dot: "#f43f5e", glow: "rgba(244,63,94,0.2)",   border: "rgba(244,63,94,0.25)",   text: "#f43f5e"  },
  { dot: "#14b8a6", glow: "rgba(20,184,166,0.2)",  border: "rgba(20,184,166,0.25)",  text: "#14b8a6"  },
];

export default function Skills({ data }: SkillsProps) {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Colorful section divider top */}
      <div className="section-divider mb-0" />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center md:text-left"
        >
          <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}
            >
              <Code className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Stack & Capabilities
            </h2>
          </div>
          <div
            className="h-[3px] w-24 rounded-full mx-auto md:mx-0"
            style={{ background: "linear-gradient(90deg, #ec4899, #8b5cf6)" }}
          />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.skills.map((skill, idx) => {
            const c = SKILL_COLORS[idx % SKILL_COLORS.length];
            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ scale: 1.04 }}
                key={idx}
                className="glass-card p-5 rounded-xl flex items-center justify-between group cursor-default"
                style={{ "--hover-border": c.border } as React.CSSProperties}
              >
                <div>
                  <h3
                    className="font-bold text-slate-800 dark:text-white group-hover:transition-colors"
                    style={{ "--tw-text-opacity": 1 } as React.CSSProperties}
                  >
                    <span className="group-hover:text-transparent group-hover:bg-clip-text transition-all"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${c.dot}, ${c.text})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {skill.name}
                    </span>
                  </h3>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {skill.category}
                  </span>
                </div>
                <motion.div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: c.dot, boxShadow: `0 0 8px ${c.glow}` }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2 + idx * 0.3, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Colorful section divider bottom */}
      <div className="section-divider mt-0" />
    </section>
  );
}
