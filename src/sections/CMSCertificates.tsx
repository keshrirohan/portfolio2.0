"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search, X, Award, ZoomIn, ChevronLeft, ChevronRight, Sparkles, Loader,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────── */
interface CertItem {
  _id: string;
  title: string;
  issuer: string;
  imageUrl: string;
  issueDate: string;
}
interface ApiResponse { items: CertItem[]; total: number; page: number; pages: number; }

/* ─────────────────────────────────────────────────────
   Lightbox
───────────────────────────────────────────────────── */
function Lightbox({
  item, items, onClose, onPrev, onNext,
}: {
  item: CertItem;
  items: CertItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const idx = items.findIndex((c) => c._id === item._id);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-modal="true"
        role="dialog"
        aria-label={`Certificate: ${item.title}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/90"
          style={{ backdropFilter: "blur(20px)" }}
          onClick={onClose}
        />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.05)" }}
          aria-label="Close lightbox"
        >
          <X size={18} />
        </button>

        {/* Prev */}
        <button
          onClick={onPrev}
          disabled={idx === 0}
          className="absolute left-4 z-10 w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-20 transition-colors"
          style={{ background: "rgba(255,255,255,0.05)" }}
          aria-label="Previous certificate"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Next */}
        <button
          onClick={onNext}
          disabled={idx === items.length - 1}
          className="absolute right-4 z-10 w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-20 transition-colors"
          style={{ background: "rgba(255,255,255,0.05)" }}
          aria-label="Next certificate"
        >
          <ChevronRight size={18} />
        </button>

        {/* Main image */}
        <motion.div
          key={item._id}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center gap-4 max-w-3xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={item.title}
            className="max-h-[70vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
          />
          <div className="text-center">
            <p className="text-white font-bold text-base">{item.title}</p>
            <p className="text-[#ed722a] text-sm font-semibold mt-0.5">{item.issuer}</p>
            <p className="text-white/35 text-xs mt-1 font-mono">
              {new Date(item.issueDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
            <p className="text-white/20 text-xs mt-1">{idx + 1} / {items.length}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────
   Certificate Card
───────────────────────────────────────────────────── */
function CertCard({ item, index, onClick }: { item: CertItem; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="cms-cert-card group relative rounded-2xl border border-white/5 overflow-hidden cursor-pointer"
      style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.025),rgba(255,255,255,0.01))" }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      onClick={onClick}
    >
      {/* Hover glow border */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(237,114,42,0.3)" }} />

      {/* Top accent bar */}
      <motion.div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: "linear-gradient(90deg,#ed722a,#f59150,transparent)" }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: index * 0.07 + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Image */}
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Zoom overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-bold text-white leading-tight line-clamp-2 group-hover:text-white transition-colors mb-1.5">
          {item.title}
        </h3>
        <p className="text-xs font-semibold text-[#ed722a]">{item.issuer}</p>
        <p className="text-[10px] text-white/30 font-mono mt-2">
          {new Date(item.issueDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Section Header
───────────────────────────────────────────────────── */
function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-14"
    >
      <span className="section-tag">
        <Award size={12} /> Certificates
      </span>
      <h2 className="section-title mt-4">
        My{" "}
        <span style={{ background: "linear-gradient(135deg,#ed722a,#f59150)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Certifications
        </span>
      </h2>
      <p className="section-subtitle mx-auto mt-4">
        Verified credentials and course completions — live from the portfolio CMS.
      </p>
      <div className="divider mx-auto mt-6" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Main Export
───────────────────────────────────────────────────── */
export default function CMSCertificates() {
  const [data, setData]     = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage]     = useState(1);
  const [lightbox, setLightbox] = useState<CertItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchDebounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(async (s: string, p: number) => {
    setLoading(true);
    try {
      const res  = await fetch(`/api/certificates?search=${encodeURIComponent(s)}&page=${p}&limit=9`);
      const json = await res.json() as ApiResponse;
      setData(json);
    } catch {
      setData(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (searchDebounce.current) clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => { void load(search, page); }, 300);
  }, [search, page, load]);

  const allItems = data?.items ?? [];
  const lightboxIdx = lightbox ? allItems.findIndex((c) => c._id === lightbox._id) : -1;
  const handlePrev = () => { if (lightboxIdx > 0) setLightbox(allItems[lightboxIdx - 1]); };
  const handleNext = () => { if (lightboxIdx < allItems.length - 1) setLightbox(allItems[lightboxIdx + 1]); };

  // Only render if we have CMS data (i.e. section has content)
  if (!loading && data && data.total === 0 && !search) return null;

  return (
    <section id="cms-certificates" aria-label="CMS Certificates section" className="relative overflow-hidden" style={{ background: "var(--color-background)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(237,114,42,0.3),transparent)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse,rgba(237,114,42,0.04),transparent 70%)", filter: "blur(60px)" }} />

      <div className="container section">
        <SectionHeader />

        {/* Search */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-md">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="search"
              placeholder="Search certificates…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border text-sm text-white placeholder-white/20 outline-none focus:border-[#ed722a] focus:ring-1 focus:ring-[#ed722a]/30"
              style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
              id="cms-cert-search"
            />
          </div>
        </div>

        {/* Count */}
        {data && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center text-xs text-white/25 font-medium mb-8"
          >
            {data.total} certificate{data.total !== 1 ? "s" : ""}
            {search ? ` matching "${search}"` : ""}
          </motion.p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size={24} className="text-[#ed722a] animate-spin" />
          </div>
        ) : !data || data.items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20">
            <Award size={40} className="text-white/10 mx-auto mb-3" />
            <p className="text-white/30 text-sm">{search ? "No certificates match your search." : "No certificates added yet."}</p>
          </motion.div>
        ) : (
          <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {data.items.map((item, i) => (
              <CertCard key={item._id} item={item} index={i} onClick={() => setLightbox(item)} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {data && data.pages > 1 && (
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mt-10"
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-10 h-10 rounded-xl border border-white/8 flex items-center justify-center text-white/40 hover:text-white disabled:opacity-25 transition-all"
              style={{ background: "rgba(255,255,255,0.04)" }}
              aria-label="Previous page"
            >
              <ChevronLeft size={17} />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: data.pages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className="w-8 h-8 rounded-lg text-xs font-bold transition-all"
                  style={n === page
                    ? { background: "linear-gradient(135deg,#ed722a,#c45f1f)", color: "#fff" }
                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
                  aria-label={`Page ${n}`}
                  aria-current={n === page ? "page" : undefined}
                >
                  {n}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(data.pages, p + 1))}
              disabled={page === data.pages}
              className="w-10 h-10 rounded-xl border border-white/8 flex items-center justify-center text-white/40 hover:text-white disabled:opacity-25 transition-all"
              style={{ background: "rgba(255,255,255,0.04)" }}
              aria-label="Next page"
            >
              <ChevronRight size={17} />
            </button>
          </motion.div>
        )}

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 mt-10"
        >
          <Sparkles size={12} className="text-[#ed722a]" />
          <span className="text-xs text-white/25 font-medium">Managed via Portfolio CMS</span>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          item={lightbox}
          items={allItems}
          onClose={() => setLightbox(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
}
