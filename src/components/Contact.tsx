"use client";

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
  return (
    <section
      id="contact"
      className="py-32 px-6 border-t border-slate-200/60 dark:border-white/5 bg-gradient-to-b from-transparent to-blue-50/10 dark:to-navy-950/10"
    >
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 flex justify-center items-center gap-3 text-slate-900 dark:text-white">
          <Coffee className="w-8 h-8 text-blue-600" />
          Send me coffe
        </h2>
        <div className="w-20 h-[2px] bg-blue-600 rounded mx-auto mb-6" />
        <p className="text-slate-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
          Dukung saya dengan membelikan kopi hangat atau terhubung secara profesional dan sosial di bawah ini.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Card: QR & Payments */}
        <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-between text-center">
          <div className="mb-6">
            <QrCode className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Scan QR / Transfer</h3>
            <p className="text-xs text-slate-500 dark:text-gray-500 mt-1">
              Dukung langsung melalui QRIS atau nomor rekening
            </p>
          </div>

          {/* QR Image Container */}
          <div className="relative w-48 h-48 mb-6 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden group">
            <img
              src="/coffee_qr.png"
              alt="Payment QR Code"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.parentElement?.querySelector(
                  ".qr-fallback"
                ) as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="qr-fallback hidden absolute inset-0 flex-col items-center justify-center bg-navy-950/90 text-gray-400 gap-2 p-4">
              <QrCode className="w-12 h-12 text-blue-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-blue-300 font-semibold">
                QR Code Ready
              </span>
              <span className="text-[9px] text-gray-500 text-center">
                Place your QR code in public/coffee_qr.png
              </span>
            </div>
          </div>

          {/* Copyable Details */}
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/60 dark:bg-black/40 border border-slate-200 dark:border-white/5 text-sm">
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-500 tracking-wider">
                  Bank BCA
                </span>
                <p className="font-semibold text-slate-900 dark:text-white">872-0184-920</p>
              </div>
              <button
                onClick={() => onCopy("8720184920", "bca")}
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all"
              >
                {copiedKey === "bca" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/60 dark:bg-black/40 border border-slate-200 dark:border-white/5 text-sm">
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-500 tracking-wider">
                  GoPay / Dana
                </span>
                <p className="font-semibold text-slate-900 dark:text-white">0812-3456-7890</p>
              </div>
              <button
                onClick={() => onCopy("081234567890", "e-wallet")}
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all"
              >
                {copiedKey === "e-wallet" ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Card: Social Media Connect */}
        <div className="glass-card rounded-2xl p-8 flex flex-col justify-between">
          <div className="mb-8">
            <Coffee className="w-8 h-8 text-blue-600 dark:text-blue-455 mb-2" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Social Connections</h3>
            <p className="text-xs text-slate-500 dark:text-gray-500 mt-1">
              Ikuti update terbaru atau kirim pesan langsung
            </p>
          </div>

          {/* Social Buttons Grid */}
          <div className="space-y-3">
            {[
              {
                name: "GitHub",
                url: data.hero.githubUrl,
                icon: Github,
                desc: "Explore my source code",
                color:
                  "hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-100 dark:hover:bg-white/5",
              },
              {
                name: "LinkedIn",
                url: data.hero.linkedinUrl,
                icon: Linkedin,
                desc: "Connect professionally",
                color:
                  "hover:border-blue-500/20 hover:bg-blue-500/5 hover:text-blue-600 dark:hover:text-blue-400",
              },
              {
                name: "Twitter / X",
                url: "https://twitter.com",
                icon: Twitter,
                desc: "Read my thoughts & tech threads",
                color:
                  "hover:border-sky-500/20 hover:bg-sky-500/5 hover:text-sky-600 dark:hover:text-sky-400",
              },
              {
                name: "Instagram",
                url: "https://instagram.com",
                icon: Instagram,
                desc: "Peek into my daily life",
                color:
                  "hover:border-pink-500/20 hover:bg-pink-500/5 hover:text-pink-600 dark:hover:text-pink-400",
              },
              {
                name: "Direct Mail",
                url: `mailto:${data.contact.email}`,
                icon: Mail,
                desc: data.contact.email,
                color:
                  "hover:border-blue-500/20 hover:bg-blue-500/5 hover:text-blue-600 dark:hover:text-blue-400",
              },
            ].map((social, sIdx) => {
              const Icon = social.icon;
              return (
                <a
                  key={sIdx}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-white/5 bg-white/60 dark:bg-black/40 transition-all group ${social.color}`}
                >
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:translate-x-1 transition-transform">
                      {social.name}
                    </h4>
                    <span className="text-[10px] text-slate-450 dark:text-gray-500">
                      {social.desc}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-slate-400 dark:text-gray-400" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
