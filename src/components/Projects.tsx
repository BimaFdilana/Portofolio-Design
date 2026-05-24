"use client";

import { motion } from "framer-motion";
import { Layers, ArrowUpRight, ExternalLink } from "lucide-react";
import { PortfolioData } from "../types/portfolio";

interface ProjectsProps {
  data: PortfolioData;
}

const TAG_COLORS = [
  { bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.3)", text: "#6366f1", darkText: "#a5b4fc" },
  { bg: "rgba(236,72,153,0.12)", border: "rgba(236,72,153,0.3)", text: "#db2777", darkText: "#f472b6" },
  { bg: "rgba(6,182,212,0.12)",  border: "rgba(6,182,212,0.3)",  text: "#0891b2", darkText: "#22d3ee" },
  { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)", text: "#d97706", darkText: "#fbbf24" },
  { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)", text: "#059669", darkText: "#34d399" },
];

const CARD_ACCENTS = [
  "from-violet-500/20 to-indigo-500/10",
  "from-pink-500/20 to-rose-500/10",
  "from-cyan-500/20 to-teal-500/10",
];

export default function Projects({ data }: ProjectsProps) {
  return (
    <section id="projects" className="py-32 px-6 max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-20"
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            <Layers className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Featured Work
          </h2>
        </div>
        <div
          className="h-[3px] w-24 rounded-full"
          style={{ background: "linear-gradient(90deg, #6366f1, #ec4899)" }}
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.projects.map((project, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: idx * 0.12 }}
            key={idx}
            className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${CARD_ACCENTS[idx % CARD_ACCENTS.length]} z-10`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-20" />
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Project number badge */}
              <div
                className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
              >
                {String(idx + 1).padStart(2, "0")}
              </div>
            </div>

            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                {/* Tags */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {project.tags.map((tag, tagIdx) => {
                    const c = TAG_COLORS[tagIdx % TAG_COLORS.length];
                    return (
                      <span
                        key={tagIdx}
                        className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full"
                        style={{
                          background: c.bg,
                          border: `1px solid ${c.border}`,
                          color: c.text,
                        }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white flex items-center justify-between">
                  <span className="group-hover:text-gradient transition-all">{project.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-violet-500" />
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold transition-all group/link"
                style={{ color: "#6366f1" }}
              >
                <span className="group-hover/link:underline">View Project</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
