"use client";

import { User } from "lucide-react";
import { PortfolioData } from "../types/portfolio";

interface AboutProps {
  data: PortfolioData;
}

export default function About({ data }: AboutProps) {
  return (
    <section id="about" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
        {/* Portrait Column */}
        <div className="md:col-span-5 relative group">
          <div className="absolute inset-0 border border-blue-500/20 dark:border-blue-900/30 rounded-2xl -rotate-3 group-hover:rotate-0 transition-transform duration-500 pointer-events-none -z-10" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-cyan-500/5 rounded-2xl pointer-events-none z-10" />
          <img
            src={data.about.imageUrl}
            alt="Developer Bio Avatar"
            className="w-full h-[400px] object-cover rounded-2xl shadow-2xl relative"
          />
        </div>

        {/* Biography Column */}
        <div className="md:col-span-7">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
              <User className="w-6 h-6 text-blue-500" />
              About Me
            </h2>
            <div className="w-20 h-[2px] bg-blue-600 rounded" />
          </div>

          <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-base md:text-lg mb-8">
            {data.about.bio}
          </p>

          <div className="glass-card grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl">
            <div>
              <h4 className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
                Pendidikan / Tamatan
              </h4>
              <p className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                S1 Ilmu Komputer
              </p>
              <span className="text-[10px] text-slate-500 dark:text-gray-400">
                Universitas Indonesia
              </span>
            </div>
            <div>
              <h4 className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
                Bahasa
              </h4>
              <div className="space-y-0.5">
                <p className="font-semibold text-slate-900 dark:text-white text-sm">
                  Indonesia{" "}
                  <span className="text-slate-500 dark:text-gray-400 font-normal text-xs">
                    (Native)
                  </span>
                </p>
                <p className="font-semibold text-slate-900 dark:text-white text-sm">
                  English{" "}
                  <span className="text-slate-500 dark:text-gray-400 font-normal text-xs">
                    (Professional)
                  </span>
                </p>
              </div>
            </div>
            <div className="border-t border-slate-200/60 dark:border-white/5 pt-4">
              <h4 className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
                Arsitektur
              </h4>
              <p className="font-semibold text-slate-900 dark:text-white text-sm">
                Next.js App Router & Framer Motion
              </p>
            </div>
            <div className="border-t border-slate-200/60 dark:border-white/5 pt-4">
              <h4 className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
                Database & Cloud
              </h4>
              <p className="font-semibold text-slate-900 dark:text-white text-sm">
                Appwrite Backend & Vercel
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
