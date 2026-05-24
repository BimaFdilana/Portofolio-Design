"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, LayoutDashboard, User, Code2, Layers, Mail,
  Save, Plus, Trash, CheckCircle, AlertCircle, LogOut,
  Sun, Moon, Menu, X, ExternalLink, ChevronRight,
  RefreshCw, Database, Upload, ImageIcon, Loader2,
} from "lucide-react";
import { getCurrentUser, logout, getAppwriteErrorMessage, type AuthUser } from "../../lib/auth";
import { fetchPortfolioData, savePortfolioData, dbErrorMessage } from "../../lib/portfolio-db";
import { uploadImage, extractFileId, deleteImage, storageErrorMessage } from "../../lib/storage";
import type { PortfolioData } from "../../types/portfolio";

// ─── Types ────────────────────────────────────────────────────────────────────
type TabId = "overview" | "hero" | "about" | "skills" | "projects" | "contact";

const DEFAULT_DATA: PortfolioData = {
  hero: {
    name: "Alex Thorne",
    title: "Full-Stack Engineer",
    subtitle: "Crafting digital experiences with absolute precision, minimalism, and premium interactive details.",
    resumeUrl: "#",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  about: {
    bio: "I am a full-stack developer dedicated to building high-performance web applications.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    name: "Alex Thorne",
    education: "S1 Ilmu Komputer",
    educationInstitution: "Universitas Indonesia",
    languagePrimary: "Indonesia (Native)",
    languageSecondary: "English (Professional)",
  },
  skills: [
    { name: "Next.js",       category: "Frontend"          },
    { name: "TypeScript",    category: "Languages"          },
    { name: "Tailwind CSS",  category: "Frontend"          },
    { name: "React",         category: "Frontend"          },
    { name: "Appwrite",      category: "Backend/Database"  },
    { name: "Node.js",       category: "Backend"           },
    { name: "PostgreSQL",    category: "Backend/Database"  },
    { name: "Framer Motion", category: "Frontend"          },
  ],
  projects: [
    {
      title: "Synthetix Dashboard",
      description: "A dark-mode analytics console showcasing real-time crypto transactions.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      link: "https://github.com",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Aura Commerce",
      description: "Minimalist storefront with custom transition animations.",
      tags: ["React", "Appwrite", "Tailwind CSS"],
      link: "https://github.com",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Prism Editor",
      description: "Interactive web-based markdown workspace.",
      tags: ["Next.js", "Framer Motion", "Tailwind"],
      link: "https://github.com",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    },
  ],
  contact: { email: "alex@example.com", location: "San Francisco, CA" },
};

// ─── Nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "overview",  label: "Overview",       icon: LayoutDashboard, color: "#6366f1" },
  { id: "hero",      label: "Hero Banner",    icon: Sparkles,        color: "#8b5cf6" },
  { id: "about",     label: "About Me",       icon: User,            color: "#06b6d4" },
  { id: "skills",    label: "Skills & Stack", icon: Code2,           color: "#ec4899" },
  { id: "projects",  label: "Projects",       icon: Layers,          color: "#f59e0b" },
  { id: "contact",   label: "Contact",        icon: Mail,            color: "#10b981" },
] as const;

// ─── Theme tokens ─────────────────────────────────────────────────────────────
const T = {
  dark: {
    bg:        "bg-[#0d0f1a]",
    sidebar:   "bg-[#0a0c16] border-r border-white/5",
    topbar:    "bg-[#0d0f1a]/90 border-b border-white/5",
    card:      "bg-white/[0.03] border-white/8",
    cardHover: "hover:bg-white/[0.05]",
    input:     "bg-black/40 border-white/10 text-white placeholder-slate-600 focus:border-violet-500",
    label:     "text-slate-400",
    text:      "text-white",
    subtext:   "text-slate-400",
    muted:     "text-slate-600",
    divider:   "bg-white/5",
    rowBg:     "bg-black/20 border-white/5",
    select:    "bg-[#0d0f1a] border-white/10 text-white",
    navActive:   (c: string) => ({ background: `${c}18`, borderLeft: `3px solid ${c}`, color: c }),
    navInactive: { background: "transparent", borderLeft: "3px solid transparent", color: "#64748b" },
  },
  light: {
    bg:        "bg-slate-50",
    sidebar:   "bg-white border-r border-slate-200",
    topbar:    "bg-white/90 border-b border-slate-200",
    card:      "bg-white border-slate-200",
    cardHover: "hover:bg-slate-50",
    input:     "bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-violet-500",
    label:     "text-slate-500",
    text:      "text-slate-900",
    subtext:   "text-slate-500",
    muted:     "text-slate-400",
    divider:   "bg-slate-200",
    rowBg:     "bg-slate-50 border-slate-200",
    select:    "bg-white border-slate-300 text-slate-900",
    navActive:   (c: string) => ({ background: `${c}12`, borderLeft: `3px solid ${c}`, color: c }),
    navInactive: { background: "transparent", borderLeft: "3px solid transparent", color: "#94a3b8" },
  },
};

// ─── Loading screen ───────────────────────────────────────────────────────────
function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin" />
        <p className="text-sm text-slate-500">{message}</p>
      </div>
    </div>
  );
}

// ─── Toast notification ───────────────────────────────────────────────────────
function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-sm font-semibold text-white"
      style={{
        background: type === "success"
          ? "linear-gradient(135deg, #10b981, #059669)"
          : "linear-gradient(135deg, #f43f5e, #e11d48)",
      }}
    >
      {type === "success"
        ? <CheckCircle className="w-4 h-4" />
        : <AlertCircle className="w-4 h-4" />}
      {message}
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();

  const [authUser, setAuthUser]       = useState<AuthUser | null>(null);
  const [isCheckingAuth, setChecking] = useState(true);
  const [isLoggingOut, setLoggingOut] = useState(false);

  const [data, setData]                 = useState<PortfolioData>(DEFAULT_DATA);
  const [isLoadingData, setLoadingData] = useState(false);
  const [activeTab, setActiveTab]       = useState<TabId>("overview");
  const [saveStatus, setSaveStatus]     = useState<"idle"|"saving"|"saved"|"error">("idle");

  // Light mode sebagai default
  const [theme, setTheme]             = useState<"dark"|"light">("light");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toast
  const [toast, setToast]             = useState<{ message: string; type: "success"|"error" } | null>(null);

  // Image upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = T[theme];

  const showToast = (message: string, type: "success"|"error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Image upload handler ──────────────────────────────────────────────────
  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(30);
    try {
      // Hapus gambar lama dari storage jika URL-nya dari Appwrite
      const oldUrl = data.about.imageUrl;
      if (oldUrl && oldUrl.includes("/storage/buckets/")) {
        const oldFileId = extractFileId(oldUrl);
        if (oldFileId) {
          await deleteImage(oldFileId).catch(() => {}); // abaikan error hapus
        }
      }

      setUploadProgress(60);
      const newUrl = await uploadImage(file);
      setUploadProgress(100);

      setData({ ...data, about: { ...data.about, imageUrl: newUrl } });
      showToast("Foto berhasil diupload!", "success");
    } catch (err) {
      showToast(storageErrorMessage(err), "error");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // ── Auth guard ────────────────────────────────────────────────────────────
  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user) router.replace("/admin/login");
      else { setAuthUser(user); setChecking(false); }
    });
  }, [router]);

  // ── Load data dari Appwrite DB ────────────────────────────────────────────
  const loadData = useCallback(async () => {
    setLoadingData(true);
    try {
      const fetched = await fetchPortfolioData(DEFAULT_DATA);
      setData(fetched);
      // Sync ke localStorage agar landing page juga update
      localStorage.setItem("portfolio_data", JSON.stringify(fetched));
    } catch (err) {
      showToast(dbErrorMessage(err), "error");
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (authUser) loadData();
  }, [authUser, loadData]);

  // ── Logout ────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    setLoggingOut(true);
    try { await logout(); router.replace("/admin/login"); }
    catch (err) { showToast(getAppwriteErrorMessage(err), "error"); setLoggingOut(false); }
  };

  // ── Save ke Appwrite DB ───────────────────────────────────────────────────
  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      await savePortfolioData(data);
      // Sync ke localStorage agar landing page juga update tanpa reload
      localStorage.setItem("portfolio_data", JSON.stringify(data));
      setSaveStatus("saved");
      showToast("Perubahan berhasil disimpan ke database!", "success");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } catch (err) {
      setSaveStatus("error");
      showToast(dbErrorMessage(err), "error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  // ── Skills helpers ────────────────────────────────────────────────────────
  const addSkill    = () => setData({ ...data, skills: [...data.skills, { name: "", category: "Frontend" }] });
  const updateSkill = (i: number, k: "name"|"category", v: string) => {
    const s = [...data.skills]; s[i] = { ...s[i], [k]: v }; setData({ ...data, skills: s });
  };
  const removeSkill = (i: number) => setData({ ...data, skills: data.skills.filter((_, x) => x !== i) });

  // ── Projects helpers ──────────────────────────────────────────────────────
  const addProject    = () => setData({ ...data, projects: [...data.projects, { title: "New Project", description: "", tags: ["React"], link: "https://github.com", image: "" }] });
  const updateProject = (i: number, k: string, v: string|string[]) => {
    const p = [...data.projects]; p[i] = { ...p[i], [k]: v }; setData({ ...data, projects: p });
  };
  const removeProject = (i: number) => setData({ ...data, projects: data.projects.filter((_, x) => x !== i) });

  if (isCheckingAuth) return <LoadingScreen message="Memverifikasi sesi..." />;

  // ── Shared styles ─────────────────────────────────────────────────────────
  const inp = `w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all ${t.input}`;
  const lbl = `block text-[11px] uppercase tracking-widest font-semibold mb-1.5 ${t.label}`;

  return (
    <div className={`min-h-screen flex ${t.bg} font-sans transition-colors duration-300`}>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>

      {/* ══ SIDEBAR ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>

      <aside className={`
        fixed top-0 left-0 h-full w-64 z-40 flex flex-col transition-transform duration-300
        ${t.sidebar}
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Logo */}
        <div className={`px-5 py-5 flex items-center gap-3 border-b ${t.divider}`}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}>
            <Sparkles className="w-[18px] h-[18px] text-white" />
          </div>
          <div>
            <p className={`text-sm font-extrabold tracking-tight ${t.text}`}>Porto Admin</p>
            <p className={`text-[10px] ${t.muted}`}>Content Manager</p>
          </div>
          <button className={`ml-auto lg:hidden ${t.subtext}`} onClick={() => setSidebarOpen(false)}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className={`text-[10px] uppercase tracking-widest font-bold px-3 mb-3 ${t.muted}`}>Menu</p>
          {NAV_ITEMS.map(({ id, label, icon: Icon, color }) => {
            const isActive = activeTab === id;
            // Badge count untuk skills dan projects
            const badge = id === "skills" ? data.skills.length
                        : id === "projects" ? data.projects.length
                        : null;
            return (
              <button key={id}
                onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={isActive ? t.navActive(color) : t.navInactive}>
                {/* Icon dengan background saat aktif */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                  style={isActive
                    ? { background: `${color}25` }
                    : { background: "transparent" }
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="flex-1 text-left">{label}</span>
                {/* Badge count */}
                {badge !== null && (
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
                    style={isActive
                      ? { background: `${color}30`, color }
                      : { background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", color: "#94a3b8" }
                    }
                  >
                    {badge}
                  </span>
                )}
                {isActive && !badge && <ChevronRight className="w-3.5 h-3.5 opacity-50" />}
              </button>
            );
          })}

          <div className={`my-4 h-px ${t.divider}`} />
          <p className={`text-[10px] uppercase tracking-widest font-bold px-3 mb-3 ${t.muted}`}>Lainnya</p>
          <a href="/" target="_blank"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${t.cardHover}`}
            style={t.navInactive}>
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
            <span>Lihat Portfolio</span>
          </a>
        </nav>

        {/* DB status indicator */}
        <div className={`px-4 py-2 mx-3 mb-2 rounded-xl flex items-center gap-2 text-xs`}
          style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
          <Database className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          <span className="text-emerald-600 font-medium">Appwrite DB Connected</span>
        </div>

        {/* User card */}
        <div className={`px-3 py-4 border-t ${t.divider}`}>
          <div className={`flex items-center gap-3 p-3 rounded-xl border ${t.card}`}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}>
              {authUser?.email?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-semibold truncate ${t.text}`}>{authUser?.email}</p>
              <p className={`text-[10px] ${t.muted}`}>Administrator</p>
            </div>
            <button onClick={handleLogout} disabled={isLoggingOut}
              className="p-1.5 rounded-lg transition-all hover:bg-red-500/10 text-red-400 flex-shrink-0"
              title="Logout">
              {isLoggingOut
                ? <div className="w-3.5 h-3.5 rounded-full border-2 border-red-400/30 border-t-red-400 animate-spin" />
                : <LogOut className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </aside>

      {/* ══ MAIN AREA ════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className={`sticky top-0 z-20 px-6 py-3.5 flex items-center justify-between backdrop-blur-xl ${t.topbar}`}>
          <div className="flex items-center gap-3">
            <button className={`lg:hidden p-2 rounded-lg border ${t.card} ${t.text}`}
              onClick={() => setSidebarOpen(true)}>
              <Menu className="w-4 h-4" />
            </button>
            <div>
              <h1 className={`text-base font-extrabold ${t.text}`}>
                {NAV_ITEMS.find(n => n.id === activeTab)?.label ?? "Dashboard"}
              </h1>
              <p className={`text-[11px] ${t.muted}`}>Kelola konten landing page</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Refresh data */}
            <button onClick={loadData} disabled={isLoadingData}
              className={`p-2 rounded-xl border transition-all ${t.card} ${t.subtext} disabled:opacity-50`}
              title="Refresh data dari database">
              <RefreshCw className={`w-4 h-4 ${isLoadingData ? "animate-spin" : ""}`} />
            </button>

            {/* Theme toggle */}
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 rounded-xl border transition-all ${t.card} ${t.text}`}>
              {theme === "dark"
                ? <Sun className="w-4 h-4 text-amber-400" />
                : <Moon className="w-4 h-4 text-violet-600" />}
            </button>
          </div>
        </header>

        {/* Loading overlay saat fetch data */}
        {isLoadingData && (
          <div className={`mx-6 mt-4 flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${t.card}`}>
            <div className="w-4 h-4 rounded-full border-2 border-violet-500/30 border-t-violet-500 animate-spin flex-shrink-0" />
            <span className={t.subtext}>Memuat data dari Appwrite Database...</span>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>

              {/* ── OVERVIEW ── */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Total Skills",   value: data.skills.length,   color: "#ec4899", icon: Code2          },
                      { label: "Total Projects", value: data.projects.length, color: "#f59e0b", icon: Layers         },
                      { label: "Sections",       value: 5,                    color: "#6366f1", icon: LayoutDashboard },
                      { label: "Database",       value: "Live",               color: "#10b981", icon: Database       },
                    ].map((stat, i) => {
                      const Icon = stat.icon;
                      return (
                        <div key={i} className={`p-5 rounded-2xl border ${t.card}`}>
                          <div className="flex items-center justify-between mb-3">
                            <p className={`text-xs font-semibold uppercase tracking-wider ${t.muted}`}>{stat.label}</p>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{ background: `${stat.color}18` }}>
                              <Icon className="w-4 h-4" style={{ color: stat.color }} />
                            </div>
                          </div>
                          <p className={`text-2xl font-extrabold ${t.text}`}>{stat.value}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${t.muted}`}>Kelola Konten</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {NAV_ITEMS.filter(n => n.id !== "overview").map(({ id, label, icon: Icon, color }) => (
                        <button key={id} onClick={() => setActiveTab(id)}
                          className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${t.card} ${t.cardHover}`}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `${color}18` }}>
                            <Icon className="w-5 h-5" style={{ color }} />
                          </div>
                          <div>
                            <p className={`text-sm font-bold ${t.text}`}>{label}</p>
                            <p className={`text-xs ${t.muted}`}>Edit konten</p>
                          </div>
                          <ChevronRight className={`w-4 h-4 ml-auto ${t.muted}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── HERO ── */}
              {activeTab === "hero" && (
                <div className={`rounded-2xl border p-6 space-y-5 ${t.card}`}>
                  <TabHeader title="Hero Banner" color="#8b5cf6" t={t} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <F label="Nama" lbl={lbl}>
                      <input className={inp} type="text" value={data.hero.name}
                        onChange={e => setData({ ...data, hero: { ...data.hero, name: e.target.value } })} />
                    </F>
                    <F label="Judul Profesional" lbl={lbl}>
                      <input className={inp} type="text" value={data.hero.title}
                        onChange={e => setData({ ...data, hero: { ...data.hero, title: e.target.value } })} />
                    </F>
                  </div>
                  <F label="Subtitle / Headline" lbl={lbl}>
                    <textarea rows={3} className={inp + " resize-none"} value={data.hero.subtitle}
                      onChange={e => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })} />
                  </F>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <F label="GitHub URL" lbl={lbl}>
                      <input className={inp} type="url" value={data.hero.githubUrl}
                        onChange={e => setData({ ...data, hero: { ...data.hero, githubUrl: e.target.value } })} />
                    </F>
                    <F label="LinkedIn URL" lbl={lbl}>
                      <input className={inp} type="url" value={data.hero.linkedinUrl}
                        onChange={e => setData({ ...data, hero: { ...data.hero, linkedinUrl: e.target.value } })} />
                    </F>
                  </div>
                  <F label="Resume URL" lbl={lbl}>
                    <input className={inp} type="url" value={data.hero.resumeUrl}
                      onChange={e => setData({ ...data, hero: { ...data.hero, resumeUrl: e.target.value } })} />
                  </F>
                </div>
              )}

              {/* ── ABOUT ── */}
              {activeTab === "about" && (
                <div className={`rounded-2xl border p-6 space-y-5 ${t.card}`}>
                  <TabHeader title="About Me" color="#06b6d4" t={t} />

                  {/* Nama */}
                  <F label="Nama Lengkap" lbl={lbl}>
                    <input className={inp} type="text" value={data.about.name ?? ""}
                      placeholder="Nama lengkap kamu"
                      onChange={e => setData({ ...data, about: { ...data.about, name: e.target.value } })} />
                  </F>

                  <F label="Biografi" lbl={lbl}>
                    <textarea rows={5} className={inp + " resize-none leading-relaxed"} value={data.about.bio}
                      onChange={e => setData({ ...data, about: { ...data.about, bio: e.target.value } })} />
                  </F>

                  {/* Pendidikan */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <F label="Pendidikan" lbl={lbl}>
                      <input className={inp} type="text" value={data.about.education ?? ""}
                        placeholder="S1 Ilmu Komputer"
                        onChange={e => setData({ ...data, about: { ...data.about, education: e.target.value } })} />
                    </F>
                    <F label="Institusi" lbl={lbl}>
                      <input className={inp} type="text" value={data.about.educationInstitution ?? ""}
                        placeholder="Universitas Indonesia"
                        onChange={e => setData({ ...data, about: { ...data.about, educationInstitution: e.target.value } })} />
                    </F>
                  </div>

                  {/* Bahasa */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <F label="Bahasa Utama" lbl={lbl}>
                      <input className={inp} type="text" value={data.about.languagePrimary ?? ""}
                        placeholder="Indonesia (Native)"
                        onChange={e => setData({ ...data, about: { ...data.about, languagePrimary: e.target.value } })} />
                    </F>
                    <F label="Bahasa Kedua" lbl={lbl}>
                      <input className={inp} type="text" value={data.about.languageSecondary ?? ""}
                        placeholder="English (Professional)"
                        onChange={e => setData({ ...data, about: { ...data.about, languageSecondary: e.target.value } })} />
                    </F>
                  </div>

                  {/* ── Image Upload Section ── */}
                  <div>
                    <label className={lbl}>Foto Profil</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                      {/* Preview */}
                      <div className={`relative rounded-2xl overflow-hidden border ${theme === "dark" ? "border-white/10 bg-black/20" : "border-slate-200 bg-slate-50"} aspect-square flex items-center justify-center`}>
                        {data.about.imageUrl ? (
                          <>
                            <img src={data.about.imageUrl} alt="Profile preview" className="w-full h-full object-cover" />
                            {isUploading && (
                              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3">
                                <Loader2 className="w-8 h-8 text-white animate-spin" />
                                <div className="w-32 h-1.5 rounded-full bg-white/20 overflow-hidden">
                                  <motion.div className="h-full rounded-full bg-violet-400"
                                    initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }}
                                    transition={{ duration: 0.3 }} />
                                </div>
                                <p className="text-white text-xs font-medium">Mengupload...</p>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-2 p-6 text-center">
                            <ImageIcon className={`w-10 h-10 ${t.muted}`} />
                            <p className={`text-xs ${t.muted}`}>Belum ada foto</p>
                          </div>
                        )}
                      </div>

                      {/* Upload controls */}
                      <div className="space-y-3">
                        <input ref={fileInputRef} type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif" className="hidden"
                          onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); }} />
                        <button type="button" onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                          className={`w-full flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-dashed transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                            theme === "dark"
                              ? "border-violet-500/30 hover:border-violet-500/60 hover:bg-violet-500/5"
                              : "border-violet-300 hover:border-violet-500 hover:bg-violet-50"
                          }`}>
                          {isUploading
                            ? <Loader2 className="w-6 h-6 text-violet-500 animate-spin" />
                            : <Upload className="w-6 h-6 text-violet-500" />}
                          <div className="text-center">
                            <p className={`text-sm font-semibold ${t.text}`}>
                              {isUploading ? "Mengupload..." : "Klik untuk upload foto"}
                            </p>
                            <p className={`text-xs mt-0.5 ${t.muted}`}>JPG, PNG, WebP · Maks 5MB</p>
                          </div>
                        </button>
                        <div>
                          <p className={`text-[10px] uppercase tracking-widest font-semibold mb-1.5 ${t.muted}`}>atau masukkan URL manual</p>
                          <input className={inp} type="text" placeholder="https://example.com/photo.jpg"
                            value={data.about.imageUrl}
                            onChange={e => setData({ ...data, about: { ...data.about, imageUrl: e.target.value } })} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SKILLS ── */}
              {activeTab === "skills" && (
                <div className={`rounded-2xl border p-6 space-y-5 ${t.card}`}>
                  <div className="flex items-center justify-between">
                    <TabHeader title="Skills & Stack" color="#ec4899" t={t} />
                    <button onClick={addSkill}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-bold"
                      style={{ background: "linear-gradient(135deg, #ec4899, #8b5cf6)" }}>
                      <Plus className="w-3.5 h-3.5" /> Tambah
                    </button>
                  </div>
                  <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
                    {data.skills.map((skill, i) => (
                      <div key={i} className={`flex gap-3 items-center p-3 rounded-xl border ${t.rowBg}`}>
                        <input type="text" value={skill.name} placeholder="Nama skill"
                          onChange={e => updateSkill(i, "name", e.target.value)}
                          className={inp + " flex-1"} />
                        <select value={skill.category} onChange={e => updateSkill(i, "category", e.target.value)}
                          className={`px-3 py-2.5 rounded-xl border text-sm outline-none transition-all ${t.select}`}>
                          {["Frontend","Backend","Languages","Backend/Database","Other"].map(c =>
                            <option key={c} value={c}>{c}</option>)}
                        </select>
                        <button onClick={() => removeSkill(i)}
                          className="p-2.5 rounded-xl flex-shrink-0 text-red-400 hover:bg-red-500/10 transition-all">
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── PROJECTS ── */}
              {activeTab === "projects" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <TabHeader title="Featured Projects" color="#f59e0b" t={t} />
                    <button onClick={addProject}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-bold"
                      style={{ background: "linear-gradient(135deg, #f59e0b, #ec4899)" }}>
                      <Plus className="w-3.5 h-3.5" /> Tambah Project
                    </button>
                  </div>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                    {data.projects.map((project, i) => (
                      <div key={i} className={`p-5 rounded-2xl border space-y-4 ${t.card}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold px-2.5 py-1 rounded-lg"
                            style={{ background: "#f59e0b18", color: "#f59e0b" }}>
                            Project #{i + 1}
                          </span>
                          <button onClick={() => removeProject(i)}
                            className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <F label="Judul" lbl={lbl}>
                            <input className={inp} type="text" value={project.title}
                              onChange={e => updateProject(i, "title", e.target.value)} />
                          </F>
                          <F label="Link GitHub / Live" lbl={lbl}>
                            <input className={inp} type="url" value={project.link}
                              onChange={e => updateProject(i, "link", e.target.value)} />
                          </F>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <F label="URL Gambar Cover" lbl={lbl}>
                            <input className={inp} type="text" value={project.image}
                              onChange={e => updateProject(i, "image", e.target.value)} />
                          </F>
                          <F label="Tags (pisah koma)" lbl={lbl}>
                            <input className={inp} type="text" value={project.tags.join(", ")}
                              onChange={e => updateProject(i, "tags", e.target.value.split(",").map(s => s.trim()))} />
                          </F>
                        </div>
                        <F label="Deskripsi" lbl={lbl}>
                          <textarea rows={2} className={inp + " resize-none"} value={project.description}
                            onChange={e => updateProject(i, "description", e.target.value)} />
                        </F>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── CONTACT ── */}
              {activeTab === "contact" && (
                <div className={`rounded-2xl border p-6 space-y-5 ${t.card}`}>
                  <TabHeader title="Contact Information" color="#10b981" t={t} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <F label="Email Publik" lbl={lbl}>
                      <input className={inp} type="email" value={data.contact.email}
                        onChange={e => setData({ ...data, contact: { ...data.contact, email: e.target.value } })} />
                    </F>
                    <F label="Lokasi" lbl={lbl}>
                      <input className={inp} type="text" value={data.contact.location}
                        onChange={e => setData({ ...data, contact: { ...data.contact, location: e.target.value } })} />
                    </F>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>

        {/* ── Sticky Save Bar — tampil di semua tab kecuali overview ── */}
        {activeTab !== "overview" && (
          <div className={`sticky bottom-0 z-10 px-6 py-3 border-t flex items-center justify-between gap-4 backdrop-blur-xl ${t.topbar}`}>
            <div className="flex items-center gap-2">
              {saveStatus === "saved" && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5 text-xs font-medium text-emerald-500"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Tersimpan ke database
                </motion.span>
              )}
              {saveStatus === "error" && (
                <span className="flex items-center gap-1.5 text-xs font-medium text-red-500">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Gagal menyimpan
                </span>
              )}
              {(saveStatus === "idle" || saveStatus === "saving") && (
                <span className={`text-xs ${t.muted}`}>
                  Klik simpan untuk menyimpan perubahan ke database
                </span>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={saveStatus === "saving"}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all disabled:opacity-60 shadow-lg"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)" }}
            >
              {saveStatus === "saving" ? (
                <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /><span>Menyimpan...</span></>
              ) : (
                <><Save className="w-4 h-4" /><span>Simpan Perubahan</span></>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function TabHeader({ title, color, t }: { title: string; color: string; t: typeof T["light"] }) {
  return (
    <div className="mb-1">
      <h2 className={`text-base font-extrabold ${t.text}`}>{title}</h2>
      <div className="h-[3px] w-12 rounded-full mt-1.5" style={{ background: color }} />
    </div>
  );
}

function F({ label, lbl, children }: { label: string; lbl: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={lbl}>{label}</label>
      {children}
    </div>
  );
}
