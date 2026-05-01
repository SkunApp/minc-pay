"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [mounted, setMounted]   = useState(false);

  const redirectTo = searchParams.get("from") ?? "/admin";

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push(redirectTo);
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.message ?? "Invalid username or password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    } 
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* Background glows */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[130px] pointer-events-none"
        style={{ backgroundColor: "var(--glow-primary)", opacity: 0.7 }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: "var(--glow-primary)", opacity: 0.4 }}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-md mx-auto px-4"
        style={{
          opacity:    mounted ? 1 : 0,
          transform:  mounted ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="/minc-logo.png"
            alt="MINC Pay"
            width={160}
            height={62}
            className="object-contain"
            style={{ filter: "var(--logo-watermark-filter) brightness(0) invert(0)" }}
          />
        </div>

        <div
          className="glass-card rounded-sm p-8 md:p-10"
          style={{ borderColor: "rgba(220,38,38,0.15)" }}
        >
          {/* Header */}
          <div className="mb-8">
            <div className="section-label mb-3">
              <span className="w-4 h-px" style={{ backgroundColor: "var(--crimson-500)" }} />
              Secure Access
            </div>
            <h1 className="font-display text-2xl font-black" style={{ color: "var(--text-primary)" }}>
              Admin Dashboard
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Sign in to manage applications and settings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="username"
                className="text-xs font-mono tracking-widest uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                autoFocus
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="input-field w-full"
                style={{
                  backgroundColor: "var(--bg-elevated)",
                  border:          "1px solid var(--border-default)",
                  color:           "var(--text-primary)",
                  borderRadius:    "2px",
                  padding:         "0.75rem 1rem",
                  fontSize:        "0.875rem",
                  outline:         "none",
                  transition:      "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--crimson-500)")}
                onBlur={(e)  => (e.target.style.borderColor = "var(--border-default)")}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-xs font-mono tracking-widest uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field w-full pr-12"
                  style={{
                    backgroundColor: "var(--bg-elevated)",
                    border:          "1px solid var(--border-default)",
                    color:           "var(--text-primary)",
                    borderRadius:    "2px",
                    padding:         "0.75rem 1rem",
                    fontSize:        "0.875rem",
                    outline:         "none",
                    transition:      "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--crimson-500)")}
                  onBlur={(e)  => (e.target.style.borderColor = "var(--border-default)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-sm text-sm"
                style={{
                  backgroundColor: "rgba(220,38,38,0.08)",
                  border:          "1px solid rgba(220,38,38,0.25)",
                  color:           "var(--crimson-400)",
                }}
              >
                <AlertCircle size={15} className="flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin" width={15} height={15} viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn size={15} />
                  Sign In
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p
          className="text-center text-xs font-mono mt-6"
          style={{ color: "var(--text-faint)" }}
        >
          MINC Pay · Admin Portal · Restricted Access
        </p>
      </div>
    </div>
  );
}