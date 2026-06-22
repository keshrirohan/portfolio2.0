"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Image, TrendingUp, Clock, ArrowUpRight } from "lucide-react";

interface Props {
  stats: { totalCerts: number; totalGallery: number };
  recentCerts: Array<{ _id: string; title: string; issuer: string; imageUrl: string; issueDate: string }>;
  recentGallery: Array<{ _id: string; title: string; category: string; imageUrl: string }>;
}

function StatCard({ icon: Icon, label, value, color, href }: {
  icon: React.ElementType; label: string; value: number; color: string; href: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative p-6 rounded-2xl border border-white/5 overflow-hidden"
      style={{ background: "rgba(255,255,255,0.025)" }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
        style={{ background: `radial-gradient(circle at top right,${color}12,transparent 70%)` }} />
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
          <Icon size={18} style={{ color }} strokeWidth={1.8} />
        </div>
        <Link href={href}
          className="text-white/20 hover:text-white/60 transition-colors duration-200"
          aria-label={`Go to ${label}`}>
          <ArrowUpRight size={16} />
        </Link>
      </div>
      <p className="text-3xl font-black text-white mb-1">{value}</p>
      <p className="text-sm text-white/40 font-medium">{label}</p>
    </motion.div>
  );
}

export default function AdminDashboardClient({ stats, recentCerts, recentGallery }: Props) {
  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-black text-white">Dashboard</h1>
        <p className="text-sm text-white/40 mt-1">Welcome back — here&apos;s an overview of your portfolio content.</p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={Award}      label="Certificates"   value={stats.totalCerts}   color="#ed722a" href="/admin/certificates" />
        <StatCard icon={Image}      label="Gallery Images" value={stats.totalGallery} color="#818cf8" href="/admin/gallery" />
        <StatCard icon={TrendingUp} label="Total Items"    value={stats.totalCerts + stats.totalGallery} color="#34d399" href="/admin/dashboard" />
      </div>

      {/* Recent uploads */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Certificates */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="p-5 rounded-2xl border border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Recent Certificates</h2>
            <Link href="/admin/certificates" className="text-xs text-[#ed722a] hover:underline font-semibold">View all →</Link>
          </div>
          {recentCerts.length === 0 ? (
            <p className="text-sm text-white/30 text-center py-6">No certificates yet.</p>
          ) : (
            <div className="space-y-3">
              {recentCerts.map((c) => (
                <div key={c._id} className="flex items-center gap-3 p-2.5 rounded-xl border border-white/5 hover:border-white/10 transition-colors"
                  style={{ background: "rgba(255,255,255,0.02)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.imageUrl} alt={c.title}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-white/10" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white truncate">{c.title}</p>
                    <p className="text-xs text-white/35 truncate">{c.issuer}</p>
                  </div>
                  <div className="flex items-center gap-1 text-white/25 flex-shrink-0">
                    <Clock size={10} />
                    <span className="text-[10px]">{new Date(c.issueDate).getFullYear()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Recent Gallery */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="p-5 rounded-2xl border border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Recent Gallery</h2>
            <Link href="/admin/gallery" className="text-xs text-[#818cf8] hover:underline font-semibold">View all →</Link>
          </div>
          {recentGallery.length === 0 ? (
            <p className="text-sm text-white/30 text-center py-6">No gallery images yet.</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {recentGallery.map((g) => (
                <div key={g._id} className="relative group rounded-xl overflow-hidden border border-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.imageUrl} alt={g.title}
                    className="w-full h-24 object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    <p className="text-xs text-white font-semibold truncate">{g.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
