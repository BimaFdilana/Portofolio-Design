"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash, 
  Database, 
  Layers, 
  Code, 
  User, 
  Sparkles, 
  Mail,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Default configuration mirroring the homepage
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

export default function AdminPanel() {
  const router = useRouter();
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "skills" | "projects" | "contact">("hero");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_data");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSave = () => {
    setSaveStatus("saving");
    try {
      localStorage.setItem("portfolio_data", JSON.stringify(data));
      setTimeout(() => {
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2500);
      }, 1000);
    } catch (e) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  // Reset to default template data
  const handleResetDefaults = () => {
    if (window.confirm("Are you sure you want to reset to template default values? This will overwrite your changes.")) {
      setData(DEFAULT_DATA);
      localStorage.setItem("portfolio_data", JSON.stringify(DEFAULT_DATA));
      alert("Defaults restored.");
    }
  };

  // Skills Helper Functions
  const handleAddSkill = () => {
    setData({
      ...data,
      skills: [...data.skills, { name: "New Skill", category: "Frontend" }]
    });
  };

  const handleUpdateSkill = (index: number, key: "name" | "category", value: string) => {
    const updated = [...data.skills];
    updated[index] = { ...updated[index], [key]: value };
    setData({ ...data, skills: updated });
  };

  const handleRemoveSkill = (index: number) => {
    setData({
      ...data,
      skills: data.skills.filter((_, i) => i !== index)
    });
  };

  // Projects Helper Functions
  const handleAddProject = () => {
    setData({
      ...data,
      projects: [...data.projects, {
        title: "New Project",
        description: "Project Description goes here.",
        tags: ["React"],
        link: "https://github.com",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800"
      }]
    });
  };

  const handleUpdateProject = (index: number, key: string, value: string | string[]) => {
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [key]: value };
    setData({ ...data, projects: updated });
  };

  const handleRemoveProject = (index: number) => {
    setData({
      ...data,
      projects: data.projects.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="min-h-screen bg-navy-950 text-white font-sans">
      
      {/* Top Banner indicating mock integration */}
      <div className="bg-blue-600/10 border-b border-blue-500/20 py-3 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-blue-200">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400 animate-pulse" />
            <span><strong>Mock Integration Active:</strong> Changes are saved to browser local storage. Connect to Appwrite database in backend to persist.</span>
          </div>
          <button 
            onClick={handleResetDefaults} 
            className="underline hover:text-white transition-colors"
          >
            Reset Defaults
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-white/5 bg-black/30 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push("/")}
              className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-all text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-xs text-gray-400">Update landing page details</p>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {saveStatus === "saving" ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                <span>Saving...</span>
              </>
            ) : saveStatus === "saved" ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span>Changes Saved!</span>
              </>
            ) : saveStatus === "error" ? (
              <>
                <AlertCircle className="w-4 h-4 text-red-300" />
                <span>Save Error</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Updates</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Layout Content */}
      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Navigation Tabs (Sidebar) */}
        <div className="md:col-span-3 space-y-2">
          {[
            { id: "hero", label: "Hero Banner", icon: Sparkles },
            { id: "about", label: "Biography", icon: User },
            { id: "skills", label: "Capabilities", icon: Code },
            { id: "projects", label: "Projects", icon: Layers },
            { id: "contact", label: "Contact Details", icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full p-4 rounded-xl text-left text-sm font-semibold flex items-center gap-3 transition-all ${
                  activeTab === tab.id 
                    ? "bg-blue-600/10 text-blue-400 border-l-2 border-blue-500 font-bold" 
                    : "bg-white/[0.02] text-gray-400 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}

          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] mt-8 text-xs text-gray-500 leading-relaxed">
            <h4 className="font-semibold text-gray-400 mb-2">Instructions for Junior Dev:</h4>
            <p>1. Import Appwrite SDK Client & Databases.</p>
            <p>2. Fetch data in `useEffect` on Mount using `databases.listDocuments`.</p>
            <p>3. Update save logic to trigger `databases.updateDocument` or `createDocument` inside `handleSave`.</p>
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="md:col-span-9 p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
          
          {/* HERO TAB */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold border-b border-white/5 pb-4">Hero Section Configuration</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Developer Name</label>
                  <input
                    type="text"
                    value={data.hero.name}
                    onChange={(e) => setData({
                      ...data,
                      hero: { ...data.hero, name: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Professional Title</label>
                  <input
                    type="text"
                    value={data.hero.title}
                    onChange={(e) => setData({
                      ...data,
                      hero: { ...data.hero, title: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Headline / Subtitle</label>
                <textarea
                  rows={3}
                  value={data.hero.subtitle}
                  onChange={(e) => setData({
                    ...data,
                    hero: { ...data.hero, subtitle: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">GitHub Profile URL</label>
                  <input
                    type="url"
                    value={data.hero.githubUrl}
                    onChange={(e) => setData({
                      ...data,
                      hero: { ...data.hero, githubUrl: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={data.hero.linkedinUrl}
                    onChange={(e) => setData({
                      ...data,
                      hero: { ...data.hero, linkedinUrl: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold border-b border-white/5 pb-4">Biography / About Me</h2>
              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Biography Paragraph</label>
                <textarea
                  rows={6}
                  value={data.about.bio}
                  onChange={(e) => setData({
                    ...data,
                    about: { ...data.about, bio: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Portrait Image URL</label>
                <input
                  type="text"
                  value={data.about.imageUrl}
                  onChange={(e) => setData({
                    ...data,
                    about: { ...data.about, imageUrl: e.target.value }
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <h2 className="text-lg font-bold">Capabilities & Stack</h2>
                <button
                  onClick={handleAddSkill}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="flex gap-4 items-center bg-black/20 p-4 rounded-xl border border-white/5">
                    <div className="flex-grow grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          value={skill.name}
                          placeholder="Skill Name"
                          onChange={(e) => handleUpdateSkill(index, "name", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <select
                          value={skill.category}
                          onChange={(e) => handleUpdateSkill(index, "category", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                        >
                          <option value="Frontend">Frontend</option>
                          <option value="Backend">Backend</option>
                          <option value="Languages">Languages</option>
                          <option value="Backend/Database">Backend/Database</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveSkill(index)}
                      className="p-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <h2 className="text-lg font-bold">Featured Projects</h2>
                <button
                  onClick={handleAddProject}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-6 max-h-[550px] overflow-y-auto pr-2">
                {data.projects.map((project, index) => (
                  <div key={index} className="bg-black/20 p-6 rounded-xl border border-white/5 relative space-y-4">
                    <button
                      onClick={() => handleRemoveProject(index)}
                      className="absolute top-4 right-4 p-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <Trash className="w-4 h-4" />
                    </button>

                    <h3 className="text-sm font-semibold text-blue-400">Project #{index + 1}</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => handleUpdateProject(index, "title", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">GitHub / Live Link</label>
                        <input
                          type="url"
                          value={project.link}
                          onChange={(e) => handleUpdateProject(index, "link", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Cover Image URL</label>
                        <input
                          type="text"
                          value={project.image}
                          onChange={(e) => handleUpdateProject(index, "image", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Tags (comma separated)</label>
                        <input
                          type="text"
                          value={project.tags.join(", ")}
                          onChange={(e) => handleUpdateProject(index, "tags", e.target.value.split(",").map(t => t.trim()))}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={project.description}
                        onChange={(e) => handleUpdateProject(index, "description", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-xs resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold border-b border-white/5 pb-4">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Public Email</label>
                  <input
                    type="email"
                    value={data.contact.email}
                    onChange={(e) => setData({
                      ...data,
                      contact: { ...data.contact, email: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">Location Address</label>
                  <input
                    type="text"
                    value={data.contact.location}
                    onChange={(e) => setData({
                      ...data,
                      contact: { ...data.contact, location: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
