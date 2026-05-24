"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Menu, 
  X, 
  ArrowUpRight, 
  Code, 
  Layers, 
  User, 
  Send,
  Sparkles,
  Database,
  QrCode,
  Coffee,
  Copy,
  Check,
  Twitter,
  Instagram,
  Sun,
  Moon
} from "lucide-react";

// Default placeholder data matching the Apple developer aesthetic
const DEFAULT_DATA = {
  hero: {
    name: "Alex Thorne",
    title: "Full-Stack Engineer",
    subtitle: "Crafting digital experiences with absolute precision, minimalism, and premium interactive details.",
    resumeUrl: "#",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  },
  about: {
    bio: "I am a full-stack developer dedicated to building high-performance web applications. My philosophy centers on clean typography, logical structures, and responsive micro-interactions inspired by Apple's digital product designs. I enjoy turning complex challenges into elegant, maintainable code.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
  },
  skills: [
    { name: "Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Languages" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "React", category: "Frontend" },
    { name: "Appwrite", category: "Backend/Database" },
    { name: "Node.js", category: "Backend" },
    { name: "PostgreSQL", category: "Backend/Database" },
    { name: "Framer Motion", category: "Frontend" }
  ],
  projects: [
    {
      title: "Synthetix Dashboard",
      description: "A dark-mode analytics console showcasing real-time crypto transactions and elegant vector charts.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      link: "https://github.com",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Aura Commerce",
      description: "Minimalist, lightning-fast storefront with custom transition animations and seamless Appwrite backend sync.",
      tags: ["React", "Appwrite", "Tailwind CSS"],
      link: "https://github.com",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Prism Editor",
      description: "An interactive, web-based markdown workspace with distraction-free layout and local storage auto-save.",
      tags: ["Next.js", "Framer Motion", "Tailwind"],
      link: "https://github.com",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"
    }
  ],
  contact: {
    email: "alex@example.com",
    location: "San Francisco, CA",
  }
};

export default function Home() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio_theme") as "light" | "dark" | null;
    const systemTheme = typeof window !== 'undefined' && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("portfolio_theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Load custom data from localStorage if updated via admin panel
  useEffect(() => {
    const savedData = localStorage.getItem("portfolio_data");
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to load custom portfolio data:", e);
      }
    }
  }, []);

  // Track page scroll to activate navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section for scroll indicator
      const sections = ["hero", "projects", "skills", "about", "contact"];
      const scrollPos = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Progress indicator setup (Apple-like header indicator)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax translation effects
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Handle mock form submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    
    // Simulate Appwrite database creation (databases.createDocument)
    setTimeout(() => {
      setFormStatus("success");
      const form = e.target as HTMLFormElement;
      form.reset();
      setTimeout(() => setFormStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/20 selection:text-foreground">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-450 to-amber-405 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 grid-pattern [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* Floating Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--glow-1)] blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] right-[-10%] w-[45%] h-[45%] rounded-full bg-[var(--glow-2)] blur-[120px] pointer-events-none -z-10" />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "glass py-4 shadow-xl" : "bg-transparent py-6"
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#hero" className="font-semibold text-lg tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 text-slate-900 dark:text-white">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>{data.hero.name}</span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {["projects", "skills", "about", "contact"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`capitalize transition-colors relative py-1 ${
                  activeSection === section ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {section}
                {activeSection === section && (
                  <motion.span 
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-blue-600 dark:bg-blue-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
            <a 
              href="/admin" 
              className="text-xs px-3 py-1.5 rounded-full border border-slate-200/60 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-slate-300/80 dark:hover:border-white/20 transition-all text-blue-600 dark:text-blue-400"
            >
              Admin Panel
            </a>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-200/60 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-slate-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 glass py-6 px-8 flex flex-col gap-4 shadow-2xl border-t border-slate-200/50 dark:border-white/5 md:hidden"
          >
            {["projects", "skills", "about", "contact"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`capitalize text-base font-medium ${
                  activeSection === section ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-gray-300"
                }`}
              >
                {section}
              </a>
            ))}
            
            <div className="flex gap-4 items-center justify-between mt-2">
              <a 
                href="/admin" 
                className="flex-grow text-center font-medium py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all text-sm"
              >
                Admin Panel
              </a>
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-slate-800 dark:text-gray-300"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="text-center max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-700 dark:text-blue-300 dark:bg-blue-950/40 dark:border-blue-900/40 text-xs font-medium mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Available for freelance & full-time</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-gradient"
          >
            {data.hero.name}
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl text-slate-700 dark:text-gray-300 font-medium mb-6"
          >
            {data.hero.title}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base md:text-lg text-slate-500 dark:text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            {data.hero.subtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <a 
              href="#projects" 
              className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-white dark:text-black dark:hover:bg-gray-200 font-semibold text-sm transition-all flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              <span>View Projects</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 rounded-full border border-blue-600/20 text-blue-600 hover:bg-blue-50/50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white font-semibold text-sm transition-all w-full sm:w-auto justify-center flex items-center"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>

        {/* Apple mouse scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <div className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-white/20 flex justify-center p-1.5">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-white/40"
            />
          </div>
          <span className="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* Projects Section */}
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
                      <span key={tagIdx} className="text-[10px] uppercase font-semibold text-blue-600 dark:text-blue-450 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/30">
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

      {/* Skills Section */}
      <section id="skills" className="py-32 bg-slate-50 dark:bg-navy-950/15 border-y border-slate-200/60 dark:border-white/5">
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
                className="p-5 rounded-xl border border-slate-200/60 dark:border-white/5 bg-white dark:bg-white/[0.02] flex items-center justify-between hover:border-blue-500/20 hover:bg-blue-500/[0.02] transition-all group"
              >
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{skill.name}</h3>
                  <span className="text-[10px] text-slate-400 dark:text-gray-500 uppercase tracking-wider">{skill.category}</span>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500/30 group-hover:bg-blue-500 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 shadow-sm">
              <div>
                <h4 className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Pendidikan / Tamatan</h4>
                <p className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">S1 Ilmu Komputer</p>
                <span className="text-[10px] text-slate-500 dark:text-gray-400">Universitas Indonesia</span>
              </div>
              <div>
                <h4 className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Bahasa</h4>
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">Indonesia <span className="text-slate-500 dark:text-gray-400 font-normal text-xs">(Native)</span></p>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">English <span className="text-slate-500 dark:text-gray-400 font-normal text-xs">(Professional)</span></p>
                </div>
              </div>
              <div className="border-t border-slate-200/60 dark:border-white/5 pt-4">
                <h4 className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Arsitektur</h4>
                <p className="font-semibold text-slate-900 dark:text-white text-sm">Next.js App Router & Framer Motion</p>
              </div>
              <div className="border-t border-slate-200/60 dark:border-white/5 pt-4">
                <h4 className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Database & Cloud</h4>
                <p className="font-semibold text-slate-900 dark:text-white text-sm">Appwrite Backend & Vercel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 border-t border-slate-200/60 dark:border-white/5 bg-gradient-to-b from-transparent to-blue-50/10 dark:to-navy-950/10">
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
          <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-between text-center border border-slate-200/60 dark:border-white/5 bg-white dark:bg-white/[0.01]">
            <div className="mb-6">
              <QrCode className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Scan QR / Transfer</h3>
              <p className="text-xs text-slate-500 dark:text-gray-500 mt-1">Dukung langsung melalui QRIS atau nomor rekening</p>
            </div>
 
            {/* QR Image Container */}
            <div className="relative w-48 h-48 mb-6 p-2 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden group">
              <img 
                src="/coffee_qr.png" 
                alt="Payment QR Code" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.qr-fallback') as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="qr-fallback hidden absolute inset-0 flex-col items-center justify-center bg-navy-950/90 text-gray-400 gap-2 p-4">
                <QrCode className="w-12 h-12 text-blue-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-blue-300 font-semibold">QR Code Ready</span>
                <span className="text-[9px] text-gray-500 text-center">Place your QR code in public/coffee_qr.png</span>
              </div>
            </div>

            {/* Copyable Details */}
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/60 dark:bg-black/40 border border-slate-200 dark:border-white/5 text-sm">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-500 tracking-wider">Bank BCA</span>
                  <p className="font-semibold text-slate-900 dark:text-white">872-0184-920</p>
                </div>
                <button 
                  onClick={() => handleCopy("8720184920", "bca")}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all"
                >
                  {copiedKey === "bca" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/60 dark:bg-black/40 border border-slate-200 dark:border-white/5 text-sm">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-500 tracking-wider">GoPay / Dana</span>
                  <p className="font-semibold text-slate-900 dark:text-white">0812-3456-7890</p>
                </div>
                <button 
                  onClick={() => handleCopy("081234567890", "e-wallet")}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all"
                >
                  {copiedKey === "e-wallet" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Card: Social Media Connect */}
          <div className="glass-card rounded-2xl p-8 flex flex-col justify-between border border-slate-200/60 dark:border-white/5 bg-white dark:bg-white/[0.01]">
            <div className="mb-8">
              <Coffee className="w-8 h-8 text-blue-600 dark:text-blue-455 mb-2" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Social Connections</h3>
              <p className="text-xs text-slate-500 dark:text-gray-500 mt-1">Ikuti update terbaru atau kirim pesan langsung</p>
            </div>
 
            {/* Social Buttons Grid */}
            <div className="space-y-3">
              {[
                { name: "GitHub", url: data.hero.githubUrl, icon: Github, desc: "Explore my source code", color: "hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-100 dark:hover:bg-white/5" },
                { name: "LinkedIn", url: data.hero.linkedinUrl, icon: Linkedin, desc: "Connect professionally", color: "hover:border-blue-500/20 hover:bg-blue-500/5 hover:text-blue-600 dark:hover:text-blue-400" },
                { name: "Twitter / X", url: "https://twitter.com", icon: Twitter, desc: "Read my thoughts & tech threads", color: "hover:border-sky-500/20 hover:bg-sky-500/5 hover:text-sky-600 dark:hover:text-sky-400" },
                { name: "Instagram", url: "https://instagram.com", icon: Instagram, desc: "Peek into my daily life", color: "hover:border-pink-500/20 hover:bg-pink-500/5 hover:text-pink-600 dark:hover:text-pink-400" },
                { name: "Direct Mail", url: `mailto:${data.contact.email}`, icon: Mail, desc: data.contact.email, color: "hover:border-blue-500/20 hover:bg-blue-500/5 hover:text-blue-600 dark:hover:text-blue-400" }
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
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:translate-x-1 transition-transform">{social.name}</h4>
                      <span className="text-[10px] text-slate-450 dark:text-gray-500">{social.desc}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-slate-400 dark:text-gray-400" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200/60 dark:border-white/5 bg-slate-50 dark:bg-black text-slate-800 dark:text-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500 dark:text-gray-500">
            &copy; {new Date().getFullYear()} {data.hero.name}. All rights reserved. Designed with Apple aesthetic.
          </p>

          <div className="flex gap-6 text-slate-500 dark:text-gray-400">
            <a href={data.hero.githubUrl} target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href={data.hero.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={`mailto:${data.contact.email}`} className="hover:text-slate-900 dark:hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
