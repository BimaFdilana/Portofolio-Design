"use client";

import { motion } from "framer-motion";
import { Layers, ArrowUpRight, ExternalLink } from "lucide-react";
import { PortfolioData } from "../types/portfolio";

interface ProjectsProps {
  data: PortfolioData;
}

export default function Projects({ data }: ProjectsProps) {
  return (
    <section id="projects" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="mb-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
          <Layers className="w-6 h-6 text-blue-500" />
          Featured Work
        </h2>
        <div className="w-20 h-[2px] bg-blue-600 dark:bg-blue-500 rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.projects.map((project, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            key={idx}
            className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group"
          >
            <div className="relative h-48 overflow-hidden bg-navy-900/40">
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-navy-950/80 to-transparent z-10" />
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex gap-2 flex-wrap mb-4">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="text-[10px] uppercase font-semibold text-blue-600 dark:text-blue-455 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>

                <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              >
                <span>View Project Files</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
