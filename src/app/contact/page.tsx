"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, ArrowRight, Loader2, ChevronLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initial: ContactForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initial);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const e: Partial<ContactForm> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
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

  const set = (field: keyof ContactForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  return (
    <div className="min-h-screen bg-navy-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-crimson-700/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 text-sm font-mono tracking-wide mb-10 transition-colors"
        >
          <ChevronLeft size={14} />
          Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <div className="section-label">
              <span className="w-4 h-px bg-crimson-500" />
              Contact Us
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
              We're here to{" "}
              <span className="text-gradient-red">help</span>
            </h1>
            <p className="text-white/40 text-base leading-relaxed mb-10">
              Have questions about our payment solutions? Reach out and a
              member of our team will respond as quickly as possible.
            </p>

            {/* Contact methods */}
            <div className="space-y-4 mb-10">
              <a
                href="https://wa.me/27000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-card rounded-sm p-5 group hover:border-green-500/30 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-sm flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <MessageCircle size={16} className="text-green-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">WhatsApp Support</p>
                  <p className="text-white/30 text-xs">Fastest response · Primary channel</p>
                </div>
                <ArrowRight size={14} className="text-white/20 ml-auto group-hover:text-white/50 transition-colors" />
              </a>

              <a
                href="mailto:hello@mincpay.co.za"
                className="flex items-center gap-4 glass-card rounded-sm p-5 group hover:border-crimson-600/20 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-crimson-600/10 border border-crimson-600/20 rounded-sm flex items-center justify-center group-hover:bg-crimson-600/20 transition-colors">
                  <Mail size={16} className="text-crimson-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">hello@mincpay.co.za</p>
                  <p className="text-white/30 text-xs">Responds within 24 hours</p>
                </div>
                <ArrowRight size={14} className="text-white/20 ml-auto group-hover:text-white/50 transition-colors" />
              </a>

              <a
                href="tel:+27000000000"
                className="flex items-center gap-4 glass-card rounded-sm p-5 group hover:border-white/20 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Phone size={16} className="text-white/50" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">+27 (0) 00 000 0000</p>
                  <p className="text-white/30 text-xs">Mon–Fri, 8am–5pm SAST</p>
                </div>
                <ArrowRight size={14} className="text-white/20 ml-auto group-hover:text-white/50 transition-colors" />
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {success ? (
              <div className="glass-card rounded-sm p-10 text-center">
                <div className="w-14 h-14 bg-crimson-600/10 border border-crimson-600/30 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={24} className="text-crimson-400" />
                </div>
                <h3 className="font-display text-2xl font-black text-white mb-3">
                  Message Sent
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                  For urgent queries, WhatsApp is fastest.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card rounded-sm p-8 space-y-5">
                <h2 className="font-display text-xl font-bold text-white mb-1">
                  Send a message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/60 text-xs font-mono tracking-wide uppercase mb-2">
                      Your Name *
                    </label>
                    <input type="text" value={form.name} onChange={set("name")} placeholder="John Smith" className="input-field" />
                    {errors.name && <p className="text-crimson-400 text-xs mt-1.5">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs font-mono tracking-wide uppercase mb-2">
                      Email *
                    </label>
                    <input type="email" value={form.email} onChange={set("email")} placeholder="john@example.co.za" className="input-field" />
                    {errors.email && <p className="text-crimson-400 text-xs mt-1.5">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 text-xs font-mono tracking-wide uppercase mb-2">
                    Phone (Optional)
                  </label>
                  <input type="tel" value={form.phone} onChange={set("phone")} placeholder="082 000 0000" className="input-field" />
                </div>

                <div>
                  <label className="block text-white/60 text-xs font-mono tracking-wide uppercase mb-2">
                    Subject *
                  </label>
                  <input type="text" value={form.subject} onChange={set("subject")} placeholder="Question about payment devices" className="input-field" />
                  {errors.subject && <p className="text-crimson-400 text-xs mt-1.5">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-white/60 text-xs font-mono tracking-wide uppercase mb-2">
                    Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={set("message")}
                    rows={4}
                    placeholder="Tell us how we can help..."
                    className="input-field resize-none"
                  />
                  {errors.message && <p className="text-crimson-400 text-xs mt-1.5">{errors.message}</p>}
                </div>

                {apiError && (
                  <div className="bg-crimson-600/10 border border-crimson-600/30 rounded-sm px-4 py-3">
                    <p className="text-crimson-400 text-sm">{apiError}</p>
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-60">
                  {loading ? (
                    <><Loader2 size={15} className="animate-spin" /> Sending...</>
                  ) : (
                    <><ArrowRight size={15} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
