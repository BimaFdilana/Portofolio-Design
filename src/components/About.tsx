"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { PortfolioData } from "../types/portfolio";

interface AboutProps {
  data: PortfolioData;
}

export default function About({ data }: AboutProps) {
  const { about } = data;

  const infoItems = [
    {
      label: "Nama",
      value: about.name || data.hero.name,
      sub: "Full Name",
      color: "#8b5cf6",
    },
    {
      label: "Pendidikan",
      value: about.education || "S1 Ilmu Komputer",
      sub: about.educationInstitution || "Universitas Indonesia",
      color: "#6366f1",
    },
    {
      label: "Bahasa",
      value: about.languagePrimary || "Indonesia (Native)",
      sub: about.languageSecondary || "English (Professional)",
      color: "#ec4899",
    },
  ];

  return (
    <section id="about" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:col-span-5 relative group"
        >
          {/* Colorful border */}
          <div
            className="absolute -inset-1 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
            style={{ background: "linear-gradient(135deg, #6366f1, #ec4899, #06b6d4, #f59e0b)" }}
          />
          <div className="relative rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0 z-10 opacity-30"
              style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(236,72,153,0.2))" }}
            />
            <img
              src={about.imageUrl}
              alt={about.name || "Developer Bio Avatar"}
              className="w-full h-[420px] object-cover relative"
            />
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring" }}
            className="absolute -bottom-4 -right-4 glass-card px-4 py-3 rounded-xl"
          >
            <p className="text-xs text-slate-500 dark:text-slate-400">Currently</p>
            <p className="font-bold text-sm text-gradient">Open to Work</p>
          </motion.div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="md:col-span-7"
        >
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #06b6d4, #6366f1)" }}
              >
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                About Me
              </h2>
            </div>
            <div
              className="h-[3px] w-24 rounded-full"
              style={{ background: "linear-gradient(90deg, #06b6d4, #6366f1)" }}
            />
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg mb-8">
            {about.bio}
          </p>

          {/* Info grid — 3 items: Nama, Pendidikan, Bahasa */}
          <div className="glass-card grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-2xl">
            {infoItems.map((item, i) => (
              <div key={i}>
                <h4
                  className="text-[10px] uppercase tracking-widest mb-1 font-bold"
                  style={{ color: item.color }}
                >
                  {item.label}
                </h4>
                <p className="font-semibold text-slate-900 dark:text-white text-sm">{item.value}</p>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{item.sub}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
