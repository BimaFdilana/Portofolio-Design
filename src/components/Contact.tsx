"use client";

import { motion } from "framer-motion";
import {
  Coffee,
  QrCode,
  Check,
  Copy,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { PortfolioData } from "../types/portfolio";

interface ContactProps {
  data: PortfolioData;
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
}

export default function Contact({ data, copiedKey, onCopy }: ContactProps) {
  const socials = [
    {
      name: "GitHub",
      url: data.hero.githubUrl,
      icon: Github,
      desc: "Explore my source code",
      color: "#6366f1",
      bg: "rgba(99,102,241,0.1)",
      border: "rgba(99,102,241,0.25)",
    },
    {
      name: "LinkedIn",
      url: data.hero.linkedinUrl,
      icon: Linkedin,
      desc: "Connect professionally",
      color: "#0ea5e9",
      bg: "rgba(14,165,233,0.1)",
      border: "rgba(14,165,233,0.25)",
    },
    {
      name: "Twitter / X",
      url: "https://twitter.com",
      icon: Twitter,
      desc: "Read my thoughts & tech threads",
      color: "#06b6d4",
      bg: "rgba(6,182,212,0.1)",
      border: "rgba(6,182,212,0.25)",
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: Instagram,
      desc: "Peek into my daily life",
      color: "#ec4899",
      bg: "rgba(236,72,153,0.1)",
      border: "rgba(236,72,153,0.25)",
    },
    {
      name: "Direct Mail",
      url: `mailto:${data.contact.email}`,
      icon: Mail,
      desc: data.contact.email,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.1)",
      border: "rgba(245,158,11,0.25)",
    },
  ];

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="section-divider mb-16" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "linear-gradient(135deg, #f59e0b, #ec4899)" }}
        >
          <Coffee className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
          Send me a Coffee ☕
        </h2>
        <div
          className="h-[3px] w-24 rounded-full mx-auto mb-6"
          style={{ background: "linear-gradient(90deg, #f59e0b, #ec4899)" }}
        />
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          Dukung saya dengan membelikan kopi hangat atau terhubung secara profesional dan sosial di bawah ini.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* QR & Payment card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8 flex flex-col items-center text-center"
        >
          <div className="mb-6">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
              style={{ background: "linear-gradient(135deg, #6366f1, #06b6d4)" }}
            >
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Scan QR / Transfer</h3>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
              Dukung langsung melalui QRIS atau nomor rekening
            </p>
          </div>

          {/* QR Image */}
          <div
            className="relative w-48 h-48 mb-6 p-2 rounded-xl flex items-center justify-center overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            <img
              src="/coffee_qr.png"
              alt="Payment QR Code"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.parentElement?.querySelector(".qr-fallback") as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="qr-fallback hidden absolute inset-0 flex-col items-center justify-center gap-2 p-4 rounded-xl"
              style={{ background: "rgba(6,7,15,0.9)" }}
            >
              <QrCode className="w-12 h-12 text-violet-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-violet-300 font-semibold">QR Code Ready</span>
              <span className="text-[9px] text-slate-500 text-center">Place your QR in public/coffee_qr.png</span>
            </div>
          </div>

          {/* Bank details */}
          <div className="w-full space-y-3">
            {[
              { label: "Bank BCA", value: "872-0184-920", copyKey: "bca", copyVal: "8720184920", color: "#6366f1" },
              { label: "GoPay / Dana", value: "0812-3456-7890", copyKey: "e-wallet", copyVal: "081234567890", color: "#ec4899" },
            ].map((item) => (
              <div
                key={item.copyKey}
                className="flex items-center justify-between p-3.5 rounded-xl text-sm bg-white/50 dark:bg-white/5"
                style={{ border: `1px solid ${item.color}30` }}
              >
                <div className="text-left">
                  <span
                    className="text-[10px] uppercase font-bold tracking-wider"
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </span>
                  <p className="font-semibold text-slate-900 dark:text-white">{item.value}</p>
                </div>
                <button
                  onClick={() => onCopy(item.copyVal, item.copyKey)}
                  className="p-2 rounded-lg transition-all hover:scale-110"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                >
                  {copiedKey === item.copyKey ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" style={{ color: item.color }} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card rounded-2xl p-8 flex flex-col justify-between"
        >
          <div className="mb-6">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
              style={{ background: "linear-gradient(135deg, #ec4899, #f59e0b)" }}
            >
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Social Connections</h3>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
              Ikuti update terbaru atau kirim pesan langsung
            </p>
          </div>

          <div className="space-y-3">
            {socials.map((social, sIdx) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={sIdx}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-3.5 rounded-xl transition-all group bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = social.bg;
                    (e.currentTarget as HTMLElement).style.borderColor = social.border;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "";
                    (e.currentTarget as HTMLElement).style.borderColor = "";
                  }}
                >
                  <div
                    className="p-2 rounded-lg flex-shrink-0"
                    style={{ background: social.bg, border: `1px solid ${social.border}` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: social.color }} />
                  </div>
                  <div className="text-left flex-grow">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{social.name}</h4>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">{social.desc}</span>
                  </div>
                  <ArrowUpRight
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all"
                    style={{ color: social.color }}
                  />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
