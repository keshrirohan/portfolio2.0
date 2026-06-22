"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Image, Award, LogOut, Menu, X, ChevronRight,
} from "lucide-react";

const NAV = [
  { href: "/admin/dashboard",     label: "Dashboard",             icon: LayoutDashboard },
  { href: "/admin/gallery",       label: "Gallery Management",    icon: Image },
  { href: "/admin/certificates",  label: "Certificates",          icon: Award },
];

function NavItem({
  href, label, icon: Icon, active, onClick,
}: { href: string; label: string; icon: React.ElementType; active: boolean; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative ${
        active ? "text-white" : "text-white/40 hover:text-white hover:bg-white/5"
      }`}
    >
      {active && (
        <motion.div
          layoutId="nav-active"
          className="absolute inset-0 rounded-xl"
          style={{ background: "linear-gradient(135deg,rgba(237,114,42,0.15),rgba(237,114,42,0.05))", border: "1px solid rgba(237,114,42,0.2)" }}
          transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
        />
      )}
      <Icon size={17} className={`flex-shrink-0 relative z-10 ${active ? "text-[#ed722a]" : ""}`} strokeWidth={1.8} />
      <span className="relative z-10">{label}</span>
      {active && <ChevronRight size={13} className="ml-auto relative z-10 text-[#ed722a]" />}
    </Link>
  );
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router   = useRouter();

  const handleLogout = useCallback(async () => {
    await fetch("/api/auth/login", { method: "DELETE" });
    router.push("/admin/login");
  }, [router]);

  return (
    <div className="flex flex-col h-full py-6 px-3">
      {/* Logo */}
      <div className="flex items-center gap-3 px-3 mb-8">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm text-white flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#ed722a,#c45f1f)", boxShadow: "0 0 20px rgba(237,114,42,0.3)" }}>
          RK
        </div>
        <div>
          <p className="text-sm font-black text-white leading-tight">Admin Panel</p>
          <p className="text-[10px] text-white/30 font-medium">Portfolio CMS</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-auto text-white/40 hover:text-white lg:hidden" aria-label="Close menu">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        <p className="text-[9px] font-bold tracking-[0.18em] uppercase text-white/20 px-3 mb-2">Navigation</p>
        {NAV.map((item) => (
          <NavItem key={item.href} {...item} active={pathname === item.href} onClick={onClose} />
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-6 pt-6 border-t border-white/5">
        <button
          onClick={handleLogout}
          id="admin-logout-btn"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200"
        >
          <LogOut size={17} strokeWidth={1.8} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030303] flex text-white" style={{ cursor: "auto" }}>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 border-r border-white/5 flex-shrink-0"
        style={{ background: "rgba(255,255,255,0.015)" }}>
        <Sidebar />
      </aside>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/60" style={{ backdropFilter: "blur(8px)" }}
              onClick={() => setMobileOpen(false)} />
            <motion.div
              className="absolute top-0 left-0 bottom-0 w-64 border-r border-white/5"
              style={{ background: "#0a0a0a" }}
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Sidebar onClose={() => setMobileOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3.5 border-b border-white/5"
          style={{ background: "rgba(255,255,255,0.015)" }}>
          <button onClick={() => setMobileOpen(true)} aria-label="Open navigation"
            className="w-9 h-9 rounded-xl border border-white/8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <Menu size={17} />
          </button>
          <span className="text-sm font-bold text-white/70">Portfolio Admin</span>
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
