"use client";

import { motion } from "framer-motion";
import { Code } from "lucide-react";
import { PortfolioData } from "../types/portfolio";

interface SkillsProps {
  data: PortfolioData;
}

export default function Skills({ data }: SkillsProps) {
  return (
    <section
      id="skills"
      className="py-32 border-y border-slate-200/60 dark:border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 flex justify-center md:justify-start items-center gap-3 text-slate-900 dark:text-white">
            <Code className="w-6 h-6 text-blue-500" />
            Stack & Capabilities
          </h2>
          <div className="w-20 h-[2px] bg-blue-600 rounded mx-auto md:mx-0" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.skills.map((skill, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              key={idx}
              className="glass-card p-5 rounded-xl flex items-center justify-between group"
            >
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {skill.name}
                </h3>
                <span className="text-[10px] text-slate-450 dark:text-gray-500 uppercase tracking-wider">
                  {skill.category}
                </span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500/30 group-hover:bg-blue-500 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
