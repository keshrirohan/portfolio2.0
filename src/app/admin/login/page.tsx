"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User, LogIn, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json() as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Login failed. Please try again.");
      } else {
        router.push("/admin/dashboard");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(237,114,42,0.08) 0%, transparent 65%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="relative p-8 rounded-3xl border border-white/8 overflow-hidden"
          style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))" }}>
          {/* Top stripe */}
          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
            style={{ background: "linear-gradient(90deg,#ed722a,#f59150,transparent)" }} />

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl text-white mb-3"
              style={{ background: "linear-gradient(135deg,#ed722a,#c45f1f)", boxShadow: "0 0 30px rgba(237,114,42,0.35)" }}>
              RK
            </div>
            <h1 className="text-xl font-black text-white">Admin Panel</h1>
            <p className="text-sm text-white/40 mt-1">Sign in to manage your portfolio</p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/08 text-red-400 text-sm mb-5"
            >
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label htmlFor="admin-username" className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-1.5">
                Username
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  id="admin-username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-white placeholder-white/20 outline-none transition-all duration-200 focus:border-[#ed722a] focus:ring-1 focus:ring-[#ed722a]/30"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="admin-password" className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl border text-sm text-white placeholder-white/20 outline-none transition-all duration-200 focus:border-[#ed722a] focus:ring-1 focus:ring-[#ed722a]/30"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              id="admin-login-submit"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm text-white disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
              style={{ background: "linear-gradient(135deg,#ed722a,#c45f1f)", boxShadow: "0 0 24px rgba(237,114,42,0.3)" }}
              whileHover={{ scale: loading ? 1 : 1.01, boxShadow: "0 0 36px rgba(237,114,42,0.45)" }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <LogIn size={16} />
              )}
              {loading ? "Signing in…" : "Sign In"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
