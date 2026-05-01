"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle2 } from "lucide-react";

export default function AdminSignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username:    "",
    displayName: "",
    password:    "",
    confirm:     "",
  });
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState(false);
  const [mounted, setMounted]         = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  const set = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/signup", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username:    form.username,
          displayName: form.displayName,
          password:    form.password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/admin/login"), 2500);
      } else {
        setError(data.message ?? "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    backgroundColor: "var(--bg-elevated)",
    border:          "1px solid var(--border-default)",
    color:           "var(--text-primary)",
    borderRadius:    "2px",
    padding:         "0.75rem 1rem",
    fontSize:        "0.875rem",
    outline:         "none",
    transition:      "border-color 0.2s",
    width:           "100%",
  };

  const labelStyle = {
    fontSize:      "0.7rem",
    fontFamily:    "var(--font-mono)",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color:         "var(--text-muted)",
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center"
           style={{ backgroundColor: "var(--bg-base)" }}>
        <div className="text-center px-4">
          <CheckCircle2 size={56} style={{ color: "#34d399", margin: "0 auto 1.5rem" }} />
          <h2 className="font-display text-2xl font-black mb-2" style={{ color: "var(--text-primary)" }}>
            Account Created
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Redirecting to login…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-12"
         style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none"
           style={{ backgroundColor: "var(--glow-primary)", opacity: 0.6 }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
           style={{ backgroundColor: "var(--glow-primary)", opacity: 0.35 }} />

      <div className="relative w-full max-w-md mx-auto px-4"
           style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>

        <div className="flex justify-center mb-10">
          <Image src="/minc-logo.png" alt="MINC Pay" width={160} height={62} className="object-contain"
                 style={{ filter: "var(--logo-watermark-filter) brightness(0) invert(0)" }} />
        </div>

        <div className="glass-card rounded-sm p-8 md:p-10" style={{ borderColor: "rgba(220,38,38,0.15)" }}>
          <div className="mb-8">
            <div className="section-label mb-3" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="w-4 h-px" style={{ backgroundColor: "var(--crimson-500)" }} />
              Admin Registration
            </div>
            <h1 className="font-display text-2xl font-black" style={{ color: "var(--text-primary)" }}>
              Create Admin Account
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Fill in your details to register as an admin.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Display name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="displayName" style={labelStyle}>Display Name</label>
              <input id="displayName" type="text" autoComplete="name" autoFocus required
                     value={form.displayName} onChange={set("displayName")} placeholder="e.g. Jane Smith"
                     style={inputStyle}
                     onFocus={(e) => (e.target.style.borderColor = "var(--crimson-500)")}
                     onBlur={(e)  => (e.target.style.borderColor = "var(--border-default)")} />
            </div>

            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" style={labelStyle}>Username</label>
              <input id="username" type="text" autoComplete="username" required
                     value={form.username} onChange={set("username")}
                     placeholder="Letters, numbers, _ . - only"
                     style={inputStyle}
                     onFocus={(e) => (e.target.style.borderColor = "var(--crimson-500)")}
                     onBlur={(e)  => (e.target.style.borderColor = "var(--border-default)")} />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" style={labelStyle}>Password</label>
              <div className="relative">
                <input id="password" type={showPass ? "text" : "password"} autoComplete="new-password"
                       required value={form.password} onChange={set("password")}
                       placeholder="Min 8 characters"
                       style={{ ...inputStyle, paddingRight: "3rem" }}
                       onFocus={(e) => (e.target.style.borderColor = "var(--crimson-500)")}
                       onBlur={(e)  => (e.target.style.borderColor = "var(--border-default)")} />
                <button type="button" onClick={() => setShowPass((v) => !v)} tabIndex={-1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                        style={{ color: "var(--text-muted)" }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirm" style={labelStyle}>Confirm Password</label>
              <div className="relative">
                <input id="confirm" type={showConfirm ? "text" : "password"} autoComplete="new-password"
                       required value={form.confirm} onChange={set("confirm")}
                       placeholder="Repeat password"
                       style={{ ...inputStyle, paddingRight: "3rem" }}
                       onFocus={(e) => (e.target.style.borderColor = "var(--crimson-500)")}
                       onBlur={(e)  => (e.target.style.borderColor = "var(--border-default)")} />
                <button type="button" onClick={() => setShowConfirm((v) => !v)} tabIndex={-1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                        style={{ color: "var(--text-muted)" }}>
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.confirm && form.password && (
                <p style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)",
                            color: form.confirm === form.password ? "#34d399" : "var(--crimson-400)" }}>
                  {form.confirm === form.password ? "✓ Passwords match" : "✗ Passwords do not match"}
                </p>
              )}
            </div>

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-sm text-sm"
                   style={{ backgroundColor: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)", color: "var(--crimson-400)" }}>
                <AlertCircle size={15} className="flex-shrink-0" />{error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2"
                    style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin" width={15} height={15} viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Creating account…
                </span>
              ) : (
                <span className="flex items-center gap-2"><UserPlus size={15} />Create Account</span>
              )}
            </button>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: "var(--text-muted)" }}>
            Already have an account?{" "}
            <a href="/admin/login" style={{ color: "var(--crimson-400)" }}
               onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--crimson-500)")}
               onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--crimson-400)")}>
              Sign in
            </a>
          </p>
        </div>

        <p className="text-center text-xs font-mono mt-6" style={{ color: "var(--text-faint)" }}>
          MINC Pay · Admin Portal · Restricted Access
        </p>
      </div>
    </div>
  );
}
