"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, ChevronLeft } from "lucide-react";
import Link from "next/link";

const businessTypes = [
  { value: "retail", label: "Retail" },
  { value: "food_beverage", label: "Food & Beverage" },
  { value: "services", label: "Services" },
  { value: "automotive", label: "Automotive" },
  { value: "health_beauty", label: "Health & Beauty" },
  { value: "hospitality", label: "Hospitality" },
  { value: "other", label: "Other" },
];

const volumeOptions = [
  { value: "under_10k", label: "Under R10,000 / month" },
  { value: "10k_50k", label: "R10,000 – R50,000 / month" },
  { value: "50k_200k", label: "R50,000 – R200,000 / month" },
  { value: "200k_500k", label: "R200,000 – R500,000 / month" },
  { value: "500k_plus", label: "R500,000+ / month" },
];

interface FormData {
  businessName: string;
  ownerFirstName: string;
  ownerLastName: string;
  email: string;
  phone: string;
  businessType: string;
  monthlyVolume: string;
  message: string;
}

const initial: FormData = {
  businessName: "",
  ownerFirstName: "",
  ownerLastName: "",
  email: "",
  phone: "",
  businessType: "",
  monthlyVolume: "",
  message: "",
};

export default function ApplyPage() {
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.businessName.trim()) e.businessName = "Business name is required";
    if (!form.ownerFirstName.trim()) e.ownerFirstName = "First name is required";
    if (!form.ownerLastName.trim()) e.ownerLastName = "Last name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.businessType) e.businessType = "Please select a business type";
    if (!form.monthlyVolume) e.monthlyVolume = "Please select a transaction volume";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError("");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSuccess(true);
    } catch {
      setApiError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (success) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-crimson-600/10 border border-crimson-600/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={28} className="text-crimson-400" />
          </div>
          <h1 className="font-display text-3xl font-black text-white mb-4">
            Application Received
          </h1>
          <p className="text-white/40 text-base leading-relaxed mb-8">
            Thank you, <span className="text-white">{form.ownerFirstName}</span>! We've received your application for{" "}
            <span className="text-white">{form.businessName}</span>. Our team will
            review it and be in touch within 24 hours.
          </p>
          <div className="glass-card rounded-sm p-5 mb-8 text-left">
            <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-3">
              What happens next
            </p>
            {[
              "You'll receive a confirmation email shortly",
              "A MINC Pay representative will contact you within 24 hours",
              "Once approved, your device will be dispatched",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 mb-2 last:mb-0">
                <span className="text-crimson-500 font-mono text-xs mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-white/50 text-sm">{item}</p>
              </div>
            ))}
          </div>
          <Link href="/" className="btn-secondary inline-flex">
            <ChevronLeft size={14} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-crimson-700/8 rounded-full blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 text-sm font-mono tracking-wide mb-10 transition-colors"
        >
          <ChevronLeft size={14} />
          Back
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="section-label">
            <span className="w-4 h-px bg-crimson-500" />
            Merchant Application
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-3">
            Get your{" "}
            <span className="text-gradient-red">payment device</span>
          </h1>
          <p className="text-white/40 text-base leading-relaxed">
            Fill in the form below and our team will be in touch within 24
            hours to get you set up.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Info */}
          <fieldset className="glass-card rounded-sm p-7 space-y-5">
            <legend className="text-white/30 text-xs font-mono tracking-widest uppercase -mt-1 mb-4 block">
              Business Information
            </legend>

            <div>
              <label className="block text-white/60 text-xs font-mono tracking-wide uppercase mb-2">
                Business Name *
              </label>
              <input
                type="text"
                value={form.businessName}
                onChange={set("businessName")}
                placeholder="e.g. Cape Town Coffee Roasters"
                className="input-field"
              />
              {errors.businessName && (
                <p className="text-crimson-400 text-xs mt-1.5">{errors.businessName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/60 text-xs font-mono tracking-wide uppercase mb-2">
                  Business Type *
                </label>
                <select
                  value={form.businessType}
                  onChange={set("businessType")}
                  className="input-field"
                >
                  <option value="">Select type...</option>
                  {businessTypes.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
                {errors.businessType && (
                  <p className="text-crimson-400 text-xs mt-1.5">{errors.businessType}</p>
                )}
              </div>

              <div>
                <label className="block text-white/60 text-xs font-mono tracking-wide uppercase mb-2">
                  Est. Monthly Volume *
                </label>
                <select
                  value={form.monthlyVolume}
                  onChange={set("monthlyVolume")}
                  className="input-field"
                >
                  <option value="">Select range...</option>
                  {volumeOptions.map((v) => (
                    <option key={v.value} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
                {errors.monthlyVolume && (
                  <p className="text-crimson-400 text-xs mt-1.5">{errors.monthlyVolume}</p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Owner Info */}
          <fieldset className="glass-card rounded-sm p-7 space-y-5">
            <legend className="text-white/30 text-xs font-mono tracking-widest uppercase -mt-1 mb-4 block">
              Owner Details
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/60 text-xs font-mono tracking-wide uppercase mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={form.ownerFirstName}
                  onChange={set("ownerFirstName")}
                  placeholder="Sarah"
                  className="input-field"
                />
                {errors.ownerFirstName && (
                  <p className="text-crimson-400 text-xs mt-1.5">{errors.ownerFirstName}</p>
                )}
              </div>
              <div>
                <label className="block text-white/60 text-xs font-mono tracking-wide uppercase mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={form.ownerLastName}
                  onChange={set("ownerLastName")}
                  placeholder="Van der Berg"
                  className="input-field"
                />
                {errors.ownerLastName && (
                  <p className="text-crimson-400 text-xs mt-1.5">{errors.ownerLastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/60 text-xs font-mono tracking-wide uppercase mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="sarah@yourbusiness.co.za"
                  className="input-field"
                />
                {errors.email && (
                  <p className="text-crimson-400 text-xs mt-1.5">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-white/60 text-xs font-mono tracking-wide uppercase mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="082 000 0000"
                  className="input-field"
                />
                {errors.phone && (
                  <p className="text-crimson-400 text-xs mt-1.5">{errors.phone}</p>
                )}
              </div>
            </div>
          </fieldset>

          {/* Optional message */}
          <fieldset className="glass-card rounded-sm p-7">
            <legend className="text-white/30 text-xs font-mono tracking-widest uppercase -mt-1 mb-4 block">
              Anything Else? (Optional)
            </legend>
            <textarea
              value={form.message}
              onChange={set("message")}
              rows={3}
              placeholder="Tell us about your business or any specific requirements..."
              className="input-field resize-none"
            />
          </fieldset>

          {apiError && (
            <div className="bg-crimson-600/10 border border-crimson-600/30 rounded-sm px-5 py-3">
              <p className="text-crimson-400 text-sm">{apiError}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Application
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <p className="text-center text-white/20 text-xs font-mono">
            By submitting you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
}
