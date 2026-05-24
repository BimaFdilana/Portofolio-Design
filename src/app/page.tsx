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

  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/20 selection:text-foreground overflow-hidden">
      
      {/* Global Background Blobs for Glassmorphism backdrop-blur depth */}
      <div className="absolute top-[15%] left-[-10%] w-[35vw] h-[35vw] min-w-[300px] min-h-[300px] rounded-full bg-gradient-to-tr from-blue-500/10 to-indigo-500/5 dark:from-blue-600/10 dark:to-purple-900/10 blur-[100px] pointer-events-none -z-10 animate-float-1" />
      <div className="absolute top-[45%] right-[-10%] w-[40vw] h-[40vw] min-w-[350px] min-h-[350px] rounded-full bg-gradient-to-br from-amber-500/5 to-pink-500/5 dark:from-indigo-900/10 dark:to-blue-600/10 blur-[120px] pointer-events-none -z-10 animate-float-2" />
      <div className="absolute bottom-[10%] left-[-5%] w-[35vw] h-[35vw] min-w-[300px] min-h-[300px] rounded-full bg-gradient-to-tr from-cyan-500/5 to-blue-500/10 dark:from-purple-900/10 dark:to-blue-900/10 blur-[110px] pointer-events-none -z-10 animate-float-1" />

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
