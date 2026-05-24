"use client";

import { useEffect, useState } from "react";
import { useScroll, useSpring, useTransform } from "framer-motion";
import { PortfolioData } from "../types/portfolio";

// Import Refactored Components
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

// Default placeholder data matching the Apple developer aesthetic
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
    bio: "I am a full-stack developer dedicated to building high-performance web applications. My philosophy centers on clean typography, logical structures, and responsive micro-interactions inspired by Apple's digital product designs. I enjoy turning complex challenges into elegant, maintainable code.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    name: "Alex Thorne",
    education: "S1 Ilmu Komputer",
    educationInstitution: "Universitas Indonesia",
    languagePrimary: "Indonesia (Native)",
    languageSecondary: "English (Professional)",
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
  const [data, setData] = useState<PortfolioData>(DEFAULT_DATA);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
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

  // Load data: coba dari Appwrite DB dulu, fallback ke localStorage, lalu DEFAULT_DATA
  useEffect(() => {
    import("../lib/portfolio-db").then(({ fetchPortfolioData }) => {
      fetchPortfolioData(DEFAULT_DATA)
        .then((fetched) => {
          setData(fetched);
          // Cache ke localStorage agar tersedia offline
          localStorage.setItem("portfolio_data", JSON.stringify(fetched));
        })
        .catch(() => {
          // Appwrite gagal — coba localStorage
          const saved = localStorage.getItem("portfolio_data");
          if (saved) {
            try { setData(JSON.parse(saved)); } catch {}
          }
        });
    });
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

  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-violet-500/20 selection:text-foreground overflow-hidden">
      
      {/* Global colorful background blobs */}
      <div className="absolute top-[15%] left-[-8%] w-[40vw] h-[40vw] min-w-[320px] min-h-[320px] rounded-full bg-gradient-to-tr from-violet-500/12 to-indigo-500/8 dark:from-violet-600/18 dark:to-indigo-900/12 blur-[120px] pointer-events-none -z-10 animate-float-1" />
      <div className="absolute top-[50%] right-[-8%] w-[45vw] h-[45vw] min-w-[360px] min-h-[360px] rounded-full bg-gradient-to-br from-pink-500/10 to-rose-500/8 dark:from-pink-600/15 dark:to-rose-900/12 blur-[130px] pointer-events-none -z-10 animate-float-2" />
      <div className="absolute bottom-[15%] left-[-5%] w-[38vw] h-[38vw] min-w-[300px] min-h-[300px] rounded-full bg-gradient-to-tr from-cyan-500/10 to-teal-500/8 dark:from-cyan-600/15 dark:to-teal-900/12 blur-[115px] pointer-events-none -z-10 animate-float-3" />
      <div className="absolute top-[70%] right-[20%] w-[30vw] h-[30vw] min-w-[250px] min-h-[250px] rounded-full bg-gradient-to-bl from-amber-500/8 to-orange-500/6 dark:from-amber-600/12 dark:to-orange-900/10 blur-[100px] pointer-events-none -z-10 animate-float-1" />

      <Navbar 
        data={data}
        theme={theme}
        toggleTheme={toggleTheme}
        isScrolled={isScrolled}
        activeSection={activeSection}
        scrollYProgress={scrollYProgress}
        scaleX={scaleX}
      />

      <Hero 
        data={data}
        heroY={heroY}
        heroOpacity={heroOpacity}
      />

      <Projects data={data} />

      <Skills data={data} />

      <About data={data} />

      <Contact 
        data={data}
        copiedKey={copiedKey}
        onCopy={handleCopy}
      />

      <Footer data={data} />

    </div>
  );
}
