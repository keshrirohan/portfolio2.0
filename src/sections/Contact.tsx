"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  GitBranch,
  Link2,
  ExternalLink,
  ArrowUpRight,
  Send,
  CheckCircle,
  AlertCircle,
  Loader,
  MessageSquare,
  Sparkles,
  Clock,
  ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────── */
type FormStatus = "idle" | "sending" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface SocialLink {
  icon: React.ElementType;
  label: string;
  value: string;
  href: string;
  color: string;
  description: string;
}

/* ─────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────── */
const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: Mail,
    label: "Email",
    value: "keshrirohan@gmail.com",
    href: "mailto:keshrirohan@gmail.com",
    color: "#ed722a",
    description: "Drop me a mail anytime",
  },
  {
    icon: GitBranch,
    label: "GitHub",
    value: "github.com/keshrirohan",
    href: "https://github.com/keshrirohan",
    color: "#ffffff",
    description: "Check out my open-source work",
  },
  {
    icon: Link2,
    label: "LinkedIn",
    value: "linkedin.com/in/keshrirohan",
    href: "https://linkedin.com/in/keshrirohan",
    color: "#0A66C2",
    description: "Connect professionally",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 XXXXX XXXXX",
    href: "tel:+91XXXXXXXXXX",
    color: "#34d399",
    description: "Available Mon–Fri, 10AM–7PM IST",
  },
];

/* ─────────────────────────────────────────────────────
   Validation
───────────────────────────────────────────────────── */
function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) {
    errors.name = "Name is required.";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.subject.trim()) {
    errors.subject = "Subject is required.";
  } else if (data.subject.trim().length < 4) {
    errors.subject = "Subject must be at least 4 characters.";
  }
  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters.";
  }
  return errors;
}

/* ─────────────────────────────────────────────────────
   Field Component
───────────────────────────────────────────────────── */
interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold tracking-wide text-white/50 uppercase">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-red-400 flex items-center gap-1 font-medium"
          >
            <AlertCircle size={11} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputBase =
  "w-full px-4 py-3 rounded-xl border text-sm text-white placeholder-white/20 outline-none transition-all duration-200 focus:border-[#ed722a] focus:ring-1 focus:ring-[#ed722a]/30";
const inputStyle = {
  background: "rgba(255,255,255,0.03)",
  borderColor: "rgba(255,255,255,0.08)",
};

/* ─────────────────────────────────────────────────────
   Contact Form
───────────────────────────────────────────────────── */
function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    const newErrors = validate(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStatus("sending");
    // Simulate API call — replace with real endpoint
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTouched({});
    setErrors({});
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Contact form">
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Name */}
        <Field id="contact-name" label="Your Name" error={errors.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Rohan Keshri"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} ${errors.name ? "!border-red-500/50 !ring-red-500/20 !ring-1" : ""}`}
            style={inputStyle}
            disabled={status === "sending"}
          />
        </Field>

        {/* Email */}
        <Field id="contact-email" label="Email Address" error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputBase} ${errors.email ? "!border-red-500/50 !ring-red-500/20 !ring-1" : ""}`}
            style={inputStyle}
            disabled={status === "sending"}
          />
        </Field>
      </div>

      {/* Subject */}
      <Field id="contact-subject" label="Subject" error={errors.subject}>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder="Project collaboration, opportunity, etc."
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${inputBase} ${errors.subject ? "!border-red-500/50 !ring-red-500/20 !ring-1" : ""}`}
          style={inputStyle}
          disabled={status === "sending"}
        />
      </Field>

      {/* Message */}
      <Field id="contact-message" label="Message" error={errors.message}>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell me about your project or opportunity…"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${inputBase} resize-none ${errors.message ? "!border-red-500/50 !ring-red-500/20 !ring-1" : ""}`}
          style={inputStyle}
          disabled={status === "sending"}
        />
        <p className="text-[10px] text-white/20 text-right">
          {formData.message.length} / 500
        </p>
      </Field>

      {/* Submit */}
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-3 px-5 py-3.5 rounded-xl border border-green-500/20 text-sm font-semibold text-green-400"
            style={{ background: "rgba(52,211,153,0.08)" }}
          >
            <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
            <div>
              <p>Message sent successfully!</p>
              <p className="text-xs font-normal text-green-400/60 mt-0.5">I'll get back to you within 24 hours.</p>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="submit"
            type="submit"
            id="contact-submit-btn"
            disabled={status === "sending"}
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, #ed722a 0%, #c45f1f 100%)",
              boxShadow: "0 0 30px rgba(237,114,42,0.3)",
            }}
            whileHover={{ scale: 1.01, boxShadow: "0 0 40px rgba(237,114,42,0.45)" }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer */}
            <span
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
              }}
            />
            {status === "sending" ? (
              <>
                <Loader size={16} className="animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
}

/* ─────────────────────────────────────────────────────
   Social Link Card
───────────────────────────────────────────────────── */
function SocialCard({ link, index }: { link: SocialLink; index: number }) {
  const Icon = link.icon;
  return (
    <motion.a
      href={link.href}
      target={link.href.startsWith("http") ? "_blank" : undefined}
      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 p-4 rounded-2xl border border-white/5 transition-all duration-300 overflow-hidden relative"
      style={{ background: "rgba(255,255,255,0.02)" }}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      aria-label={`${link.label}: ${link.value}`}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${link.color}08, transparent)`,
          boxShadow: `inset 0 0 0 1px ${link.color}25`,
          borderRadius: "inherit",
        }}
      />

      {/* Icon */}
      <div
        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{
          background: `${link.color}12`,
          border: `1px solid ${link.color}25`,
          boxShadow: `0 0 12px ${link.color}10`,
        }}
      >
        <Icon size={18} style={{ color: link.color }} strokeWidth={1.8} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/30 mb-0.5">
          {link.label}
        </p>
        <p className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors duration-200 truncate">
          {link.value}
        </p>
        <p className="text-[11px] text-white/30 mt-0.5">{link.description}</p>
      </div>

      <ArrowUpRight
        size={15}
        className="flex-shrink-0 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
      />
    </motion.a>
  );
}

/* ─────────────────────────────────────────────────────
   Availability Badge
───────────────────────────────────────────────────── */
function AvailabilityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative p-5 rounded-2xl border border-white/5 overflow-hidden"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <div
        className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
        style={{ background: "radial-gradient(circle at top right, rgba(237,114,42,0.1), transparent 70%)" }}
      />
      <div className="flex items-start gap-3">
        <div className="relative flex-shrink-0 mt-1">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400" />
          </span>
        </div>
        <div>
          <p className="text-sm font-bold text-white">Open to opportunities</p>
          <p className="text-xs text-white/40 mt-1 leading-relaxed">
            Available for full-time roles, freelance projects, and exciting collaborations.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {["Full-time", "Freelance", "Remote"].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(237,114,42,0.08)",
                  border: "1px solid rgba(237,114,42,0.2)",
                  color: "#ed722a",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
        <Clock size={12} className="text-white/30" />
        <span className="text-[11px] text-white/30">Usually responds within 24 hours · IST (GMT+5:30)</span>
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
      className="text-center mb-16"
    >
      <span className="section-tag">
        <MessageSquare size={12} /> Get in Touch
      </span>
      <h2 className="section-title mt-4">
        Let&apos;s{" "}
        <span
          style={{
            background: "linear-gradient(135deg,#ed722a,#f59150)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Connect
        </span>
      </h2>
      <p className="section-subtitle mx-auto mt-4">
        Have a project in mind or just want to say hello? My inbox is always open.
      </p>
      <div className="divider mx-auto mt-6" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Main Export
───────────────────────────────────────────────────── */
export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-60px" });

  return (
    <section id="contact" aria-label="Contact section" className="relative overflow-hidden" style={{ background: "var(--color-background)" }}>
      {/* Top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(237,114,42,0.3),transparent)" }}
      />

      {/* Background orbs */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse,rgba(237,114,42,0.06) 0%,transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(circle,rgba(129,140,248,0.04) 0%,transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="container section">
        <SectionHeader />

        <div ref={containerRef} className="grid lg:grid-cols-[1fr_420px] gap-10 max-w-6xl mx-auto items-start">
          {/* ── Left: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-6 sm:p-8 rounded-3xl border overflow-hidden"
            style={{
              background: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            {/* Corner glow */}
            <div
              className="absolute top-0 left-0 w-48 h-48 pointer-events-none"
              style={{ background: "radial-gradient(circle at top left, rgba(237,114,42,0.08), transparent 70%)" }}
            />
            {/* Header accent stripe */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl"
              style={{ background: "linear-gradient(90deg, #ed722a, #f59150, transparent)" }}
            />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(237,114,42,0.12)", border: "1px solid rgba(237,114,42,0.2)" }}
                >
                  <Send size={15} className="text-[#ed722a]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-base font-bold" style={{ color: "var(--color-foreground)" }}>Send a Message</h3>
                  <p className="text-xs" style={{ color: "var(--color-foreground-subtle)" }}>I read every message personally.</p>
                </div>
              </div>
              <ContactForm />
            </div>
          </motion.div>

          {/* ── Right: Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {/* Availability */}
            <AvailabilityCard />

            {/* Location card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-white/5"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <MapPin size={16} className="text-[#ed722a] flex-shrink-0" strokeWidth={1.8} />
              <div>
                <p className="text-sm font-semibold text-white">India · Remote-First</p>
                <p className="text-xs text-white/35">Open to relocation for the right opportunity</p>
              </div>
            </motion.div>

            {/* Social links */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/25 px-1">
                Find me on
              </p>
              {SOCIAL_LINKS.map((link, i) => (
                <SocialCard key={link.label} link={link} index={i} />
              ))}
            </div>

            {/* Quick message shortcut */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center gap-2.5 px-4 py-3 rounded-2xl border border-white/5"
              style={{ background: "rgba(255,255,255,0.015)" }}
            >
              <Sparkles size={14} className="text-[#ed722a] flex-shrink-0" />
              <p className="text-xs text-white/35 leading-relaxed">
                Prefer email?{" "}
                <a
                  href="mailto:keshrirohan@gmail.com"
                  className="text-[#ed722a] font-semibold hover:underline"
                  id="contact-email-link"
                >
                  keshrirohan@gmail.com
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Footer ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="border-t border-white/5 mt-20"
      >
        <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <p>
            Designed &amp; Built by{" "}
            <span className="text-[#ed722a] font-semibold">Rohan Keshri</span>
          </p>
          <div className="flex items-center gap-4">
            <a href="#home" className="hover:text-white/60 transition-colors duration-200">Back to top ↑</a>
            <span>·</span>
            <a
              href="https://github.com/keshrirohan/portfolio2.0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors duration-200 inline-flex items-center gap-1"
              id="footer-github-link"
            >
              View Source <ChevronRight size={11} />
            </a>
          </div>
        </div>
      </motion.footer>
    </section>
  );
}
