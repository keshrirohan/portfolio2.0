"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Search, Pencil, Trash2, X, Upload, Image, ChevronLeft, ChevronRight,
  AlertCircle, CheckCircle, Loader, Filter,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface GalleryItem {
  _id: string; title: string; description: string; imageUrl: string;
  cloudinaryId: string; category: string; createdAt: string;
}
interface ApiResponse { items: GalleryItem[]; total: number; page: number; pages: number; }

const CATEGORIES = ["Event", "Hackathon", "Conference", "Workshop", "Achievement", "Other"];

/* ─── Toast ─────────────────────────────────────────────────────────────── */
type ToastType = "success" | "error";
interface ToastMsg { id: number; type: ToastType; message: string; }

function Toast({ toasts, remove }: { toasts: ToastMsg[]; remove: (id: number) => void }) {
  return (
    <div className="fixed top-5 right-5 z-[200] space-y-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div key={t.id}
            initial={{ opacity: 0, x: 60, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 60, scale: 0.9 }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold shadow-xl"
            style={{
              background: t.type === "success" ? "rgba(52,211,153,0.12)" : "rgba(239,68,68,0.12)",
              borderColor: t.type === "success" ? "rgba(52,211,153,0.25)" : "rgba(239,68,68,0.25)",
              color: t.type === "success" ? "#34d399" : "#f87171",
            }}
            onClick={() => remove(t.id)}>
            {t.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ─── Image Picker ───────────────────────────────────────────────────────── */
function ImagePicker({ value, onChange, progress }: { value: string; onChange: (b64: string) => void; progress: number }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-1.5">
        Image {!value && <span className="text-red-400">*</span>}
      </label>
      <div onClick={() => inputRef.current?.click()}
        className="relative w-full h-40 rounded-xl border-2 border-dashed border-white/10 hover:border-[#818cf8]/40 transition-colors cursor-pointer overflow-hidden"
        style={{ background: "rgba(255,255,255,0.02)" }}>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="Preview" className="w-full h-full object-contain" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <Upload size={22} className="text-white/25 mb-2" />
            <p className="text-xs text-white/30 font-medium">Click to upload</p>
          </div>
        )}
        {progress > 0 && progress < 100 && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
            <Loader size={20} className="text-[#818cf8] animate-spin" />
            <p className="text-xs text-white font-bold">{progress}%</p>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

/* ─── Gallery Form Modal ─────────────────────────────────────────────────── */
interface FormData { title: string; description: string; category: string; imageData: string; }

function GalleryModal({
  initial, onClose, onSaved, toast,
}: { initial?: GalleryItem; onClose: () => void; onSaved: () => void; toast: (t: ToastType, m: string) => void }) {
  const [form, setForm] = useState<FormData>({
    title:       initial?.title       ?? "",
    description: initial?.description ?? "",
    category:    initial?.category    ?? CATEGORIES[0],
    imageData:   initial?.imageUrl    ?? "",
  });
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress]   = useState(0);
  const isEdit = !!initial;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.category) return toast("error", "Title and category are required.");
    if (!isEdit && !form.imageData.startsWith("data:")) return toast("error", "Please select an image.");

    setUploading(true); setProgress(30);
    const body: Record<string, string> = { title: form.title, description: form.description, category: form.category };
    if (form.imageData.startsWith("data:")) body.imageData = form.imageData;
    setProgress(60);

    const res = await fetch(
      isEdit ? `/api/gallery/${initial!._id}` : "/api/gallery",
      { method: isEdit ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
    );
    setProgress(100); setUploading(false);

    if (res.ok) {
      toast("success", isEdit ? "Image updated!" : "Image added!");
      onSaved(); onClose();
    } else {
      const d = await res.json() as { error?: string };
      toast("error", d.error ?? "Something went wrong.");
    }
  };

  const inputCls = "w-full px-4 py-2.5 rounded-xl border text-sm text-white placeholder-white/20 outline-none transition-all focus:border-[#818cf8] focus:ring-1 focus:ring-[#818cf8]/30";
  const inputStyle = { background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" style={{ backdropFilter: "blur(12px)" }} onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md rounded-2xl border border-white/8 overflow-hidden z-10 max-h-[90vh] overflow-y-auto"
        style={{ background: "#0d0d0d", boxShadow: "0 40px 80px rgba(0,0,0,0.8)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg,#818cf8,transparent)" }} />
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 className="font-black text-white text-base">{isEdit ? "Edit Image" : "Add Gallery Image"}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white border border-white/8 hover:border-white/20 transition-all" aria-label="Close"><X size={15} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <ImagePicker value={form.imageData} onChange={(d) => setForm((f) => ({ ...f, imageData: d }))} progress={progress} />
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-1.5">Title <span className="text-red-400">*</span></label>
            <input className={inputCls} style={inputStyle} placeholder="e.g. Techathon 2024 Finals" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-1.5">Category <span className="text-red-400">*</span></label>
            <select className={inputCls} style={inputStyle} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
              {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#0d0d0d]">{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-1.5">Description</label>
            <textarea rows={3} className={`${inputCls} resize-none`} style={inputStyle} placeholder="Brief description…" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/8 text-sm font-semibold text-white/50 hover:text-white hover:border-white/20 transition-all">Cancel</button>
            <button type="submit" disabled={uploading}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-60 transition-all"
              style={{ background: "linear-gradient(135deg,#818cf8,#6366f1)" }}>
              {uploading ? <Loader size={15} className="animate-spin" /> : null}
              {uploading ? "Saving…" : isEdit ? "Save Changes" : "Add Image"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

/* ─── Lightbox ───────────────────────────────────────────────────────────── */
function Lightbox({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90" onClick={onClose}
      style={{ backdropFilter: "blur(16px)" }}>
      <button className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 text-white/60 hover:text-white z-10" onClick={onClose} aria-label="Close lightbox"><X size={18} /></button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.imageUrl} alt={item.title}
        className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()} />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-white font-bold text-sm">{item.title}</p>
        <p className="text-white/40 text-xs mt-0.5">{item.category}</p>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */
export default function GalleryClient() {
  const [data, setData]         = useState<ApiResponse | null>(null);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage]         = useState(1);
  const [modal, setModal]       = useState<"add" | GalleryItem | null>(null);
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toasts, setToasts]     = useState<ToastMsg[]>([]);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "9" });
    if (search)   params.set("search", search);
    if (category) params.set("category", category);
    const res  = await fetch(`/api/gallery?${params}`);
    const json = await res.json() as ApiResponse;
    setData(json);
    setLoading(false);
  }, [search, category, page]);

  useEffect(() => { void load(); }, [load]);

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm(`Delete "${item.title}"?`)) return;
    setDeleting(item._id);
    const res = await fetch(`/api/gallery/${item._id}`, { method: "DELETE" });
    if (res.ok) { addToast("success", "Image deleted."); void load(); }
    else        { addToast("error", "Failed to delete."); }
    setDeleting(null);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <Toast toasts={toasts} remove={(id) => setToasts((t) => t.filter((x) => x.id !== id))} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-black text-white">Gallery</h1>
          <p className="text-sm text-white/40 mt-0.5">{data?.total ?? 0} total images</p>
        </div>
        <button onClick={() => setModal("add")} id="gallery-add-new-btn"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-white"
          style={{ background: "linear-gradient(135deg,#818cf8,#6366f1)" }}>
          <Plus size={16} /> Add Image
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
          <input type="search" placeholder="Search gallery…" value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-white placeholder-white/20 outline-none focus:border-[#818cf8] focus:ring-1 focus:ring-[#818cf8]/30"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
            id="gallery-search-input" />
        </div>
        <div className="relative">
          <Filter size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
          <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="pl-9 pr-4 py-2.5 rounded-xl border text-sm text-white outline-none appearance-none focus:border-[#818cf8]"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
            id="gallery-category-filter">
            <option value="" className="bg-[#0d0d0d]">All Categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#0d0d0d]">{c}</option>)}
          </select>
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => { setCategory(""); setPage(1); }}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${!category ? "text-white" : "text-white/35 hover:text-white"}`}
          style={!category ? { background: "rgba(129,140,248,0.15)", border: "1px solid rgba(129,140,248,0.3)" } : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          All
        </button>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => { setCategory(c); setPage(1); }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${category === c ? "text-white" : "text-white/35 hover:text-white"}`}
            style={category === c ? { background: "rgba(129,140,248,0.15)", border: "1px solid rgba(129,140,248,0.3)" } : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader size={24} className="text-[#818cf8] animate-spin" />
        </div>
      ) : data?.items.length === 0 ? (
        <div className="text-center py-20">
          <Image size={36} className="text-white/15 mx-auto mb-3" />
          <p className="text-white/30 text-sm">No gallery images found.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {data?.items.map((item, i) => (
              <motion.div key={item._id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="group relative rounded-2xl border border-white/5 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.025)" }}
              >
                <div className="relative overflow-hidden cursor-pointer" onClick={() => setLightbox(item)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.imageUrl} alt={item.title} className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/50 px-3 py-1.5 rounded-lg">View Full</span>
                  </div>
                  <span className="absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(129,140,248,0.2)", border: "1px solid rgba(129,140,248,0.3)", color: "#818cf8" }}>
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-white truncate">{item.title}</h3>
                  {item.description && <p className="text-xs text-white/35 mt-0.5 line-clamp-2">{item.description}</p>}
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => setModal(item)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold text-white/50 hover:text-white border border-white/8 hover:border-white/20 transition-all"
                      style={{ background: "rgba(255,255,255,0.03)" }} aria-label={`Edit ${item.title}`}>
                      <Pencil size={12} /> Edit
                    </button>
                    <button onClick={() => handleDelete(item)} disabled={deleting === item._id}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold text-red-400/60 hover:text-red-400 border border-red-500/8 hover:border-red-500/25 transition-all disabled:opacity-50"
                      style={{ background: "rgba(239,68,68,0.04)" }} aria-label={`Delete ${item.title}`}>
                      {deleting === item._id ? <Loader size={12} className="animate-spin" /> : <Trash2 size={12} />}
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Pagination */}
      {data && data.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            className="w-9 h-9 rounded-xl border border-white/8 flex items-center justify-center text-white/40 hover:text-white disabled:opacity-30 transition-all"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm text-white/40 font-medium px-2">{page} / {data.pages}</span>
          <button onClick={() => setPage((p) => Math.min(data.pages, p + 1))} disabled={page === data.pages}
            className="w-9 h-9 rounded-xl border border-white/8 flex items-center justify-center text-white/40 hover:text-white disabled:opacity-30 transition-all"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {modal && (
          <GalleryModal key="gallery-modal"
            initial={modal === "add" ? undefined : modal}
            onClose={() => setModal(null)} onSaved={load} toast={addToast} />
        )}
        {lightbox && <Lightbox key="lightbox" item={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
}
