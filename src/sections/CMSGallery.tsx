"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  X, ChevronLeft, ChevronRight, ZoomIn, Images, Loader, Filter,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────── */
interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}
interface ApiResponse { items: GalleryItem[]; total: number; page: number; pages: number; }

const ALL_CATEGORIES = ["Event", "Hackathon", "Conference", "Workshop", "Achievement", "Other"];

/* ─────────────────────────────────────────────────────
   Full-Screen Preview
───────────────────────────────────────────────────── */
function Preview({
  item, items, onClose, onPrev, onNext,
}: {
  item: GalleryItem;
  items: GalleryItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const idx = items.findIndex((g) => g._id === item._id);

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
        aria-label={`Gallery image: ${item.title}`}
      >
        <div
          className="absolute inset-0 bg-black/92"
          style={{ backdropFilter: "blur(24px)" }}
          onClick={onClose}
        />

        {/* Controls */}
        <button onClick={onClose} aria-label="Close preview"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.06)" }}>
          <X size={18} />
        </button>
        <button onClick={onPrev} disabled={idx === 0} aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-20 transition-colors"
          style={{ background: "rgba(255,255,255,0.06)" }}>
          <ChevronLeft size={20} />
        </button>
        <button onClick={onNext} disabled={idx === items.length - 1} aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-20 transition-colors"
          style={{ background: "rgba(255,255,255,0.06)" }}>
          <ChevronRight size={20} />
        </button>

        {/* Image */}
        <motion.div
          key={item._id}
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center gap-5 max-w-4xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={item.title}
            className="max-h-[72vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
          />
          <div className="text-center max-w-md">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
                style={{ background: "rgba(129,140,248,0.15)", border: "1px solid rgba(129,140,248,0.3)", color: "#818cf8" }}>
                {item.category}
              </span>
              <span className="text-white/20 text-[10px]">{idx + 1} / {items.length}</span>
            </div>
            <p className="text-white font-bold text-base">{item.title}</p>
            {item.description && (
              <p className="text-white/40 text-sm mt-1 leading-relaxed">{item.description}</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────
   Gallery Card — with variable heights for masonry feel
───────────────────────────────────────────────────── */
function GalleryCard({
  item, index, onClick,
}: { item: GalleryItem; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  // Alternate heights to create masonry-like grid
  const heights = [180, 220, 200, 240, 190, 210];
  const height  = heights[index % heights.length];

  return (
    <motion.div
      ref={ref}
      className="cms-gallery-card group relative rounded-2xl border border-white/5 overflow-hidden cursor-pointer"
      style={{ background: "rgba(255,255,255,0.02)" }}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: (index % 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onClick={onClick}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(129,140,248,0.35)" }} />

      {/* Category pill */}
      <div className="absolute top-3 left-3 z-10">
        <span className="text-[9px] font-bold tracking-[0.12em] uppercase px-2 py-1 rounded-full"
          style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}>
          {item.category}
        </span>
      </div>

      {/* Image */}
      <div className="overflow-hidden" style={{ height }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <div className="flex items-end justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-white font-bold text-sm leading-tight line-clamp-1">{item.title}</p>
            {item.description && (
              <p className="text-white/60 text-xs mt-0.5 line-clamp-1">{item.description}</p>
            )}
          </div>
          <ZoomIn size={18} className="text-white/80 flex-shrink-0 ml-2" />
        </div>
      </div>

      {/* Bottom info strip (always visible) */}
      <div className="p-3 border-t border-white/5">
        <p className="text-xs font-semibold text-white/60 truncate">{item.title}</p>
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
        <Images size={12} /> Gallery
      </span>
      <h2 className="section-title mt-4">
        My{" "}
        <span style={{ background: "linear-gradient(135deg,#818cf8,#6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          Gallery
        </span>
      </h2>
      <p className="section-subtitle mx-auto mt-4">
        Events, hackathons, and moments — curated from my journey.
      </p>
      <div className="divider mx-auto mt-6" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Main Export
───────────────────────────────────────────────────── */
export default function CMSGallery() {
  const [data, setData]         = useState<ApiResponse | null>(null);
  const [loading, setLoading]   = useState(true);
  const [category, setCategory] = useState("");
  const [page, setPage]         = useState(1);
  const [preview, setPreview]   = useState<GalleryItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async (cat: string, p: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p), limit: "9" });
      if (cat) params.set("category", cat);
      const res  = await fetch(`/api/gallery?${params}`);
      const json = await res.json() as ApiResponse;
      setData(json);
    } catch {
      setData(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => { void load(category, page); }, [category, page, load]);

  // GSAP stagger on container
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || loading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cms-gallery-card",
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 85%", once: true },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [loading, data]);

  const allItems   = data?.items ?? [];
  const previewIdx = preview ? allItems.findIndex((g) => g._id === preview._id) : -1;
  const handlePrev = () => { if (previewIdx > 0) setPreview(allItems[previewIdx - 1]); };
  const handleNext = () => { if (previewIdx < allItems.length - 1) setPreview(allItems[previewIdx + 1]); };

  // Hide section when no data
  if (!loading && data && data.total === 0 && !category) return null;

  return (
    <section id="gallery" aria-label="Gallery section" className="relative bg-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(129,140,248,0.3),transparent)" }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle at bottom right,rgba(129,140,248,0.05),transparent 70%)", filter: "blur(60px)" }} />

      <div className="container section">
        <SectionHeader />

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          <div className="flex items-center gap-1.5 mr-2">
            <Filter size={12} className="text-white/30" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">Filter</span>
          </div>
          <button
            onClick={() => { setCategory(""); setPage(1); }}
            className="px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
            style={!category
              ? { background: "linear-gradient(135deg,#818cf8,#6366f1)", color: "#fff", boxShadow: "0 0 16px rgba(129,140,248,0.3)" }
              : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
          >
            All
          </button>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className="px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
              style={category === cat
                ? { background: "linear-gradient(135deg,#818cf8,#6366f1)", color: "#fff", boxShadow: "0 0 16px rgba(129,140,248,0.3)" }
                : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Count */}
        {data && (
          <p className="text-center text-xs text-white/20 font-medium mb-8">
            {data.total} image{data.total !== 1 ? "s" : ""}
            {category ? ` in "${category}"` : " in collection"}
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader size={24} className="text-[#818cf8] animate-spin" />
          </div>
        ) : !data || data.items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <Images size={40} className="text-white/10 mx-auto mb-3" />
            <p className="text-white/30 text-sm">{category ? `No images in "${category}" category.` : "No gallery images added yet."}</p>
            {category && (
              <button onClick={() => setCategory("")} className="mt-3 text-xs text-[#818cf8] hover:underline font-semibold">
                Show all →
              </button>
            )}
          </motion.div>
        ) : (
          <div
            ref={containerRef}
            className="columns-1 sm:columns-2 lg:columns-3 gap-5 max-w-6xl mx-auto space-y-5"
          >
            <AnimatePresence mode="wait">
              {data.items.map((item, i) => (
                <div key={item._id} className="break-inside-avoid">
                  <GalleryCard item={item} index={i} onClick={() => setPreview(item)} />
                </div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination */}
        {data && data.pages > 1 && (
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mt-12"
          >
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="w-10 h-10 rounded-xl border border-white/8 flex items-center justify-center text-white/40 hover:text-white disabled:opacity-25 transition-all"
              style={{ background: "rgba(255,255,255,0.04)" }} aria-label="Previous page">
              <ChevronLeft size={17} />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: data.pages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => setPage(n)} aria-label={`Page ${n}`} aria-current={n === page ? "page" : undefined}
                  className="w-8 h-8 rounded-lg text-xs font-bold transition-all"
                  style={n === page
                    ? { background: "linear-gradient(135deg,#818cf8,#6366f1)", color: "#fff" }
                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
                  {n}
                </button>
              ))}
            </div>
            <button onClick={() => setPage((p) => Math.min(data.pages, p + 1))} disabled={page === data.pages}
              className="w-10 h-10 rounded-xl border border-white/8 flex items-center justify-center text-white/40 hover:text-white disabled:opacity-25 transition-all"
              style={{ background: "rgba(255,255,255,0.04)" }} aria-label="Next page">
              <ChevronRight size={17} />
            </button>
          </motion.div>
        )}
      </div>

      {/* Full-screen preview */}
      {preview && (
        <Preview
          item={preview} items={allItems}
          onClose={() => setPreview(null)} onPrev={handlePrev} onNext={handleNext}
        />
      )}
    </section>
  );
}
