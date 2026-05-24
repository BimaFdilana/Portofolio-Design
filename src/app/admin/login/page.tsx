"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, LogIn, Eye, EyeOff, AlertCircle, UserPlus } from "lucide-react";
import { login, getCurrentUser, getAppwriteErrorMessage } from "../../../lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // Jika sudah login, redirect ke dashboard
  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        router.replace("/admin");
      } else {
        setIsCheckingSession(false);
      }
    });
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await login(email.trim(), password);
      router.replace("/admin");
    } catch (err) {
      setError(getAppwriteErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  // Loading saat cek sesi
  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#06070f]">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "rgba(139,92,246,0.3)", borderTopColor: "#8b5cf6" }}
          />
          <p className="text-sm text-slate-400">Memeriksa sesi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#06070f]">
      {/* Background blobs */}
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-violet-600/20 to-indigo-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-gradient-to-bl from-pink-600/15 to-rose-900/10 blur-[110px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.07) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(15,10,40,0.6)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(139,92,246,0.2)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(99,102,241,0.08)",
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
            >
              <Sparkles className="w-7 h-7 text-white" />
            </motion.div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Login</h1>
            <p className="text-sm text-slate-400 mt-1">Masuk ke dashboard portfolio</p>
          </div>

          {/* Error alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-3.5 rounded-xl mb-6 text-sm"
              style={{
                background: "rgba(244,63,94,0.1)",
                border: "1px solid rgba(244,63,94,0.25)",
                color: "#fb7185",
              }}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "rgba(139,92,246,0.7)" }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all disabled:opacity-50"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(139,92,246,0.2)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.6)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.2)")}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "rgba(139,92,246,0.7)" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all disabled:opacity-50"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(139,92,246,0.2)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.6)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.2)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)" }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Masuk...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Masuk ke Dashboard</span>
                </>
              )}
            </button>

            {/* Register button — disabled */}
            <div className="relative group">
              <button
                type="button"
                disabled
                className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 cursor-not-allowed opacity-40"
                style={{
                  background: "rgba(139,92,246,0.05)",
                  border: "1px solid rgba(139,92,246,0.15)",
                  color: "#a78bfa",
                }}
              >
                <UserPlus className="w-4 h-4" />
                <span>Daftar Akun Baru</span>
              </button>
              {/* Tooltip */}
              <div
                className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                style={{ background: "rgba(15,10,40,0.95)", border: "1px solid rgba(139,92,246,0.3)" }}
              >
                Registrasi saat ini dinonaktifkan
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                  style={{
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderTop: "5px solid rgba(139,92,246,0.3)",
                  }}
                />
              </div>
            </div>
          </form>

          {/* Footer hint */}
          <p className="text-center text-xs text-slate-600 mt-6">
            Akun admin dibuat melalui Appwrite Console
          </p>
        </div>
      </motion.div>
    </div>
  );
}
