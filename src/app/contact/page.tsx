"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, ArrowRight, Loader2, ChevronLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface ContactForm { name: string; email: string; phone: string; subject: string; message: string; }
const initial: ContactForm = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactPage() {
  const [form, setForm]         = useState<ContactForm>(initial);
  const [errors, setErrors]     = useState<Partial<ContactForm>>({});
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const e: Partial<ContactForm> = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
    } catch {
      setApiError("Failed to send. Please try WhatsApp or email directly.");
    } finally {
      setLoading(false);
    }
  };

  const set = (field: keyof ContactForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((p) => ({ ...p, [field]: e.target.value }));
      setErrors((p) => ({ ...p, [field]: undefined }));
    };

  const channels = [
    {
      href: "https://wa.me/27000000000",
      icon: MessageCircle,
      label: "WhatsApp Support",
      sub: "Fastest response · Primary channel",
      hoverColor: "#4ade80",
      external: true,
    },
    {
      href: "mailto:hello@mincpay.co.za",
      icon: Mail,
      label: "hello@mincpay.co.za",
      sub: "Responds within 24 hours",
      hoverColor: "var(--crimson-400)",
      external: false,
    },
    {
      href: "tel:+27000000000",
      icon: Phone,
      label: "+27 (0) 00 000 0000",
      sub: "Mon–Fri, 8am–5pm SAST",
      hoverColor: "var(--text-secondary)",
      external: false,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ backgroundColor: "var(--glow-primary)" }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-mono tracking-wide mb-10 transition-colors hover-text-secondary"
          style={{ color: "var(--text-muted)" }}>
          <ChevronLeft size={14} /> Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <div className="section-label"><span className="w-4 h-px" style={{ backgroundColor: "var(--crimson-500)" }} />Contact Us</div>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-4" style={{ color: "var(--text-primary)" }}>
              We&apos;re here to <span className="text-gradient-red">help</span>
            </h1>
            <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-secondary)" }}>
              Have questions about our payment solutions? Reach out and a member of our team will respond as quickly as possible.
            </p>

            <div className="space-y-4">
              {channels.map((ch) => {
                const Icon = ch.icon;
                return (
                  <a key={ch.href} href={ch.href} {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="flex items-center gap-4 glass-card hover-border-accent rounded-sm p-5 transition-colors duration-300"
                    style={{ color: "var(--text-primary)" }}>
                    <div className="w-10 h-10 rounded-sm flex items-center justify-center transition-colors"
                      style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-default)" }}>
                      <Icon size={16} style={{ color: "var(--crimson-400)" }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{ch.label}</p>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{ch.sub}</p>
                    </div>
                    <ArrowRight size={14} style={{ color: "var(--text-muted)" }} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: Form or success */}
          <div>
            {success ? (
              <div className="glass-card rounded-sm p-10 text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)" }}>
                  <CheckCircle2 size={24} style={{ color: "var(--crimson-400)" }} />
                </div>
                <h3 className="font-display text-2xl font-black mb-3" style={{ color: "var(--text-primary)" }}>Message Sent</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Thanks for reaching out. We&apos;ll get back to you within 24 hours. For urgent queries, WhatsApp is fastest.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-sm p-8 space-y-5">
                <h2 className="font-display text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>Send a message</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono tracking-wide uppercase mb-2" style={{ color: "var(--text-secondary)" }}>Your Name *</label>
                    <input type="text" value={form.name} onChange={set("name")} placeholder="John Smith" className="input-field" />
                    {errors.name && <p className="text-xs mt-1.5" style={{ color: "var(--crimson-400)" }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-mono tracking-wide uppercase mb-2" style={{ color: "var(--text-secondary)" }}>Email *</label>
                    <input type="email" value={form.email} onChange={set("email")} placeholder="john@example.co.za" className="input-field" />
                    {errors.email && <p className="text-xs mt-1.5" style={{ color: "var(--crimson-400)" }}>{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-wide uppercase mb-2" style={{ color: "var(--text-secondary)" }}>Phone (Optional)</label>
                  <input type="tel" value={form.phone} onChange={set("phone")} placeholder="082 000 0000" className="input-field" />
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-wide uppercase mb-2" style={{ color: "var(--text-secondary)" }}>Subject *</label>
                  <input type="text" value={form.subject} onChange={set("subject")} placeholder="Question about payment devices" className="input-field" />
                  {errors.subject && <p className="text-xs mt-1.5" style={{ color: "var(--crimson-400)" }}>{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-wide uppercase mb-2" style={{ color: "var(--text-secondary)" }}>Message *</label>
                  <textarea value={form.message} onChange={set("message")} rows={4} placeholder="Tell us how we can help..." className="input-field resize-none" />
                  {errors.message && <p className="text-xs mt-1.5" style={{ color: "var(--crimson-400)" }}>{errors.message}</p>}
                </div>

                {apiError && (
                  <div className="rounded-sm px-4 py-3" style={{ backgroundColor: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)" }}>
                    <p className="text-sm" style={{ color: "var(--crimson-400)" }}>{apiError}</p>
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-50">
                  {loading ? <><Loader2 size={15} className="animate-spin" />Sending...</> : <><ArrowRight size={15} />Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
