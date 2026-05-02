"use client";

import { useEffect, useState, useCallback } from "react";
import {
  CheckCircle2, XCircle, Clock, Search, RefreshCw,
  Users, AlertCircle, LogOut, ChevronRight, X, Building2,
} from "lucide-react";
import Image from "next/image";
import { Application } from "@/types";
import { formatDate, formatVolume, formatBusinessType } from "@/lib/utils";

type StatusFilter = "all" | "pending" | "approved" | "rejected";
type SortField    = "submittedAt" | "businessName" | "status";

const STATUS = {
  pending:  { label: "Pending",  Icon: Clock,        color: "#f59e0b", bg: "rgba(245,158,11,0.10)",  border: "rgba(245,158,11,0.30)" },
  approved: { label: "Approved", Icon: CheckCircle2, color: "#34d399", bg: "rgba(52,211,153,0.10)",  border: "rgba(52,211,153,0.30)" },
  rejected: { label: "Rejected", Icon: XCircle,      color: "#f87171", bg: "rgba(248,113,113,0.10)", border: "rgba(248,113,113,0.30)" },
};

interface AdminUser { displayName: string; username: string; }

// ── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: "linear-gradient(135deg, var(--crimson-600), #7f1d1d)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.36, fontWeight: 700, color: "#fff",
      fontFamily: "var(--font-mono)", letterSpacing: "0.05em",
    }}>
      {initials}
    </div>
  );
}

// ── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, Icon, color, total }: {
  label: string; value: number; Icon: React.ElementType; color: string; total?: number;
}) {
  const pct = total && total > 0 ? Math.round((value / total) * 100) : null;
  return (
    <div className="glass-card" style={{ borderRadius: 4, padding: 20, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80,
                    background: `radial-gradient(circle at top right, ${color}20, transparent 70%)`,
                    pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ padding: 8, borderRadius: 4, background: `${color}15`, border: `1px solid ${color}30` }}>
          <Icon size={14} style={{ color, display: "block" }} />
        </div>
        {pct !== null && (
          <span style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "var(--text-faint)",
                         background: "var(--bg-elevated)", padding: "2px 7px", borderRadius: 2,
                         border: "1px solid var(--border-subtle)" }}>
            {pct}%
          </span>
        )}
      </div>
      <p className="font-display" style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text-primary)", lineHeight: 1 }}>
        {value}
      </p>
      <p style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", letterSpacing: "0.15em",
                  textTransform: "uppercase", color: "var(--text-muted)", marginTop: 6 }}>
        {label}
      </p>
    </div>
  );
}

// ── Detail panel ─────────────────────────────────────────────────────────────
function DetailPanel({ app, onClose, onUpdate, updating }: {
  app: Application;
  onClose: () => void;
  onUpdate: (id: string, status: Application["status"]) => void;
  updating: string | null;
}) {
  const s = STATUS[app.status];
  const busy = updating === app.id;

  const fields = [
    { label: "Application ID", value: app.id,          mono: true },
    { label: "Business Name",  value: app.businessName },
    { label: "Owner",          value: `${app.ownerFirstName} ${app.ownerLastName}` },
    { label: "Email",          value: app.email },
    { label: "Phone",          value: app.phone },
    { label: "Business Type",  value: formatBusinessType(app.businessType) },
    { label: "Monthly Volume", value: formatVolume(app.monthlyVolume) },
    { label: "Submitted",      value: formatDate(app.submittedAt) },
  ];

  const actionBtn = (
    onClick: () => void,
    label: string,
    bg: string,
    border: string,
    color: string,
  ) => (
    <button onClick={onClick} disabled={busy} style={{
      width: "100%", padding: "10px 0", fontSize: "0.72rem", fontFamily: "var(--font-mono)",
      letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 3, cursor: busy ? "not-allowed" : "pointer",
      background: bg, border: `1px solid ${border}`, color, opacity: busy ? 0.45 : 1,
      transition: "opacity 0.2s",
    }}>
      {label}
    </button>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>

      {/* Header */}
      <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--border-subtle)", flexShrink: 0,
                    display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", letterSpacing: "0.18em",
                      textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 4 }}>
            Application Detail
          </p>
          <h3 className="font-display" style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)",
                                                 overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {app.businessName}
          </h3>
        </div>
        <button onClick={onClose} style={{ padding: 6, borderRadius: 4, border: "1px solid var(--border-default)",
                                            background: "transparent", cursor: "pointer", color: "var(--text-muted)",
                                            display: "flex", alignItems: "center", flexShrink: 0 }}>
          <X size={13} />
        </button>
      </div>

      {/* Status */}
      <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border-subtle)", flexShrink: 0 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px",
                       borderRadius: 2, border: `1px solid ${s.border}`, background: s.bg,
                       fontSize: "0.68rem", fontFamily: "var(--font-mono)", letterSpacing: "0.1em",
                       textTransform: "uppercase", color: s.color }}>
          <s.Icon size={10} />{s.label}
        </span>
      </div>

      {/* Fields */}
      <div style={{ flex: 1, overflowY: "auto", padding: "18px 20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {fields.map(({ label, value, mono }) => (
            <div key={label}>
              <p style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", letterSpacing: "0.16em",
                          textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 3 }}>
                {label}
              </p>
              <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", wordBreak: "break-all",
                          fontFamily: mono ? "var(--font-mono)" : undefined, lineHeight: 1.4 }}>
                {value}
              </p>
            </div>
          ))}
          {app.message && (
            <div>
              <p style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", letterSpacing: "0.16em",
                          textTransform: "uppercase", color: "var(--text-faint)", marginBottom: 3 }}>
                Notes
              </p>
              <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {app.message}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border-subtle)",
                    display: "flex", flexDirection: "column", gap: 8, flexShrink: 0 }}>
        {app.status !== "approved" &&
          actionBtn(() => onUpdate(app.id, "approved"), "✓ Approve Application",
            "rgba(52,211,153,0.10)", "rgba(52,211,153,0.30)", "#34d399")}
        {app.status !== "rejected" &&
          actionBtn(() => onUpdate(app.id, "rejected"), "✕ Reject Application",
            "rgba(248,113,113,0.10)", "rgba(248,113,113,0.30)", "#f87171")}
        {app.status !== "pending" &&
          actionBtn(() => onUpdate(app.id, "pending"), "↺ Reset to Pending",
            "rgba(245,158,11,0.10)", "rgba(245,158,11,0.30)", "#f59e0b")}
        <a href={`mailto:${app.email}`} style={{
          display: "block", textAlign: "center", padding: "10px 0", fontSize: "0.72rem",
          fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase",
          borderRadius: 3, background: "var(--bg-elevated)", border: "1px solid var(--border-default)",
          color: "var(--text-secondary)", textDecoration: "none",
        }}>
          ✉ Email Applicant
        </a>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [statusFilter, setFilter] = useState<StatusFilter>("all");
  const [sortField, setSort]      = useState<SortField>("submittedAt");
  const [updating, setUpdating]   = useState<string | null>(null);
  const [selected, setSelected]   = useState<Application | null>(null);
  const [user, setUser]           = useState<AdminUser>({ displayName: "Admin", username: "admin" });
  const [menuOpen, setMenuOpen]   = useState(false);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/applications");
      setApplications(await res.json());
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchApplications(); }, [fetchApplications]);
  useEffect(() => {
    fetch("/api/admin/me").then((r) => r.json()).then(setUser).catch(() => {});
  }, []);

  const updateStatus = async (id: string, status: Application["status"]) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setApplications((prev) => prev.map((a) => a.id === id ? updated : a));
        if (selected?.id === id) setSelected(updated);
      }
    } finally { setUpdating(null); }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  const counts = {
    all:      applications.length,
    pending:  applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  const filtered = applications
    .filter((a) => {
      const q = search.toLowerCase();
      const matchQ = !q || [a.businessName, a.email, a.ownerFirstName, a.ownerLastName]
        .some((s) => s.toLowerCase().includes(q));
      return matchQ && (statusFilter === "all" || a.status === statusFilter);
    })
    .sort((a, b) => {
      if (sortField === "submittedAt")  return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      if (sortField === "businessName") return a.businessName.localeCompare(b.businessName);
      return a.status.localeCompare(b.status);
    });

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  const firstName = user.displayName.split(" ")[0];

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-base)", display: "flex", flexDirection: "column" }}>

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50, height: 60,
        backgroundColor: "var(--nav-bg)", borderBottom: "1px solid var(--border-subtle)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px",
                      display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%" }}>

          {/* Left: logo + portal label */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Image src="/minc-logo.png" alt="MINC Pay" width={96} height={36} className="object-contain"
                   style={{ filter: "var(--logo-watermark-filter) brightness(0) invert(0)" }} />
            <div style={{ width: 1, height: 18, background: "var(--border-strong)" }} />
            <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", letterSpacing: "0.22em",
                           textTransform: "uppercase", color: "var(--text-faint)" }}>
              Admin Portal
            </span>
          </div>

          {/* Right: user menu */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              style={{ display: "flex", alignItems: "center", gap: 9, padding: "5px 10px 5px 5px",
                       borderRadius: 6, border: "1px solid var(--border-default)", background: "transparent",
                       cursor: "pointer", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-default)")}>
              <Avatar name={user.displayName} size={28} />
              {/* Hide text on very small screens */}
              <div className="hidden sm:block" style={{ textAlign: "left" }}>
                <p style={{ fontSize: "0.76rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.2 }}>
                  {user.displayName}
                </p>
                <p style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--text-faint)", lineHeight: 1 }}>
                  @{user.username}
                </p>
              </div>
            </button>

            {menuOpen && (
              <>
                <div onClick={() => setMenuOpen(false)}
                     style={{ position: "fixed", inset: 0, zIndex: 10 }} />
                <div style={{
                  position: "absolute", right: 0, top: "calc(100% + 8px)", zIndex: 20,
                  width: 200, background: "var(--bg-elevated)", border: "1px solid var(--border-default)",
                  borderRadius: 6, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                }}>
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border-subtle)" }}>
                    <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-primary)" }}>
                      {user.displayName}
                    </p>
                    <p style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--text-faint)", marginTop: 2 }}>
                      @{user.username}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{ width: "100%", padding: "11px 16px", display: "flex", alignItems: "center", gap: 8,
                             background: "transparent", border: "none", cursor: "pointer", color: "#f87171",
                             fontSize: "0.78rem", fontFamily: "var(--font-mono)", textAlign: "left", transition: "background 0.15s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(248,113,113,0.08)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}>
                    <LogOut size={13} /> Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <main style={{ flex: 1, maxWidth: 1280, margin: "0 auto", width: "100%",
                     padding: "clamp(20px, 4vw, 40px) 20px", boxSizing: "border-box" }}>

        {/* Greeting row */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", letterSpacing: "0.2em",
                      textTransform: "uppercase", color: "var(--crimson-500)", marginBottom: 6 }}>
            {new Date().toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                        flexWrap: "wrap", gap: 12 }}>
            <h1 className="font-display"
                style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.1rem)", fontWeight: 900,
                         color: "var(--text-primary)", lineHeight: 1.1, margin: 0 }}>
              {greeting}, {firstName}.
            </h1>
            <button
              onClick={fetchApplications}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
                       borderRadius: 4, border: "1px solid var(--border-default)", background: "transparent",
                       cursor: "pointer", color: "var(--text-muted)", fontSize: "0.72rem",
                       fontFamily: "var(--font-mono)", letterSpacing: "0.08em", transition: "all 0.2s" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text-primary)"; el.style.borderColor = "var(--border-strong)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "var(--text-muted)"; el.style.borderColor = "var(--border-default)"; }}>
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
          <p style={{ marginTop: 8, fontSize: "0.85rem", color: "var(--text-muted)" }}>
            {loading ? "Loading applications…" : counts.pending > 0
              ? <>{`You have `}<span style={{ color: "#f59e0b", fontWeight: 600 }}>{counts.pending} pending application{counts.pending !== 1 ? "s" : ""}</span>{` awaiting review.`}</>
              : "All caught up — no applications pending review."}
          </p>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                      gap: 14, marginBottom: 28 }}>
          <StatCard label="Total"    value={counts.all}      Icon={Users}        color="#94a3b8" />
          <StatCard label="Pending"  value={counts.pending}  Icon={Clock}        color="#f59e0b" total={counts.all} />
          <StatCard label="Approved" value={counts.approved} Icon={CheckCircle2} color="#34d399" total={counts.all} />
          <StatCard label="Rejected" value={counts.rejected} Icon={XCircle}      color="#f87171" total={counts.all} />
        </div>

        {/* Table + detail panel */}
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>

          {/* ── Table ─────────────────────────────────────────────────── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Filter bar */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
              {/* Search */}
              <div style={{ position: "relative", flex: "1 1 200px", minWidth: 0 }}>
                <Search size={13} style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)",
                                            color: "var(--text-muted)", pointerEvents: "none" }} />
                <input
                  type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search business, name, email…"
                  style={{ width: "100%", padding: "8px 12px 8px 32px", background: "var(--bg-elevated)",
                           border: "1px solid var(--border-default)", borderRadius: 4, outline: "none",
                           fontSize: "0.8rem", color: "var(--text-primary)", boxSizing: "border-box",
                           transition: "border-color 0.2s" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--crimson-600)")}
                  onBlur={(e)  => (e.target.style.borderColor = "var(--border-default)")} />
              </div>

              {/* Status filters */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {(["all", "pending", "approved", "rejected"] as StatusFilter[]).map((s) => (
                  <button key={s} onClick={() => setFilter(s)} style={{
                    padding: "7px 13px", fontSize: "0.65rem", fontFamily: "var(--font-mono)",
                    letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 4,
                    cursor: "pointer", transition: "all 0.15s", border: "1px solid",
                    ...(statusFilter === s
                      ? { background: "var(--crimson-600)", borderColor: "var(--crimson-600)", color: "#fff" }
                      : { background: "transparent", borderColor: "var(--border-default)", color: "var(--text-muted)" }),
                  }}>
                    {s}{s !== "all" ? ` · ${counts[s]}` : ""}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sortField} onChange={(e) => setSort(e.target.value as SortField)}
                style={{ padding: "7px 12px", background: "var(--bg-elevated)", border: "1px solid var(--border-default)",
                         borderRadius: 4, color: "var(--text-muted)", fontSize: "0.72rem",
                         fontFamily: "var(--font-mono)", outline: "none", cursor: "pointer" }}>
                <option value="submittedAt">Date ↓</option>
                <option value="businessName">Name A–Z</option>
                <option value="status">Status</option>
              </select>
            </div>

            {/* Table card */}
            <div className="glass-card" style={{ borderRadius: 4, overflow: "hidden" }}>
              {loading ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
                              justifyContent: "center", padding: "60px 20px", gap: 12 }}>
                  <RefreshCw size={20} className="animate-spin" style={{ color: "var(--text-muted)" }} />
                  <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-faint)" }}>
                    Loading applications…
                  </p>
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
                              justifyContent: "center", padding: "60px 20px", gap: 10 }}>
                  <AlertCircle size={24} style={{ color: "var(--text-muted)" }} />
                  <p style={{ fontSize: "0.78rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                    No applications found
                  </p>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                        {["Business", "Owner", "Type", "Volume", "Status", "Date", "Actions"].map((h) => (
                          <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: "0.6rem",
                                              fontFamily: "var(--font-mono)", letterSpacing: "0.16em",
                                              textTransform: "uppercase", color: "var(--text-faint)",
                                              whiteSpace: "nowrap", fontWeight: 500 }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((app) => {
                        const s        = STATUS[app.status];
                        const isActive = selected?.id === app.id;
                        return (
                          <tr
                            key={app.id}
                            onClick={() => setSelected(isActive ? null : app)}
                            style={{ borderBottom: "1px solid var(--border-subtle)", cursor: "pointer",
                                     background: isActive ? "rgba(220,38,38,0.05)" : "transparent",
                                     transition: "background 0.15s" }}
                            onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = isActive ? "rgba(220,38,38,0.05)" : "transparent"; }}>

                            {/* Business */}
                            <td style={{ padding: "12px 16px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 28, height: 28, borderRadius: 4, flexShrink: 0,
                                              background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)",
                                              display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <Building2 size={12} style={{ color: "var(--text-faint)" }} />
                                </div>
                                <div>
                                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap" }}>
                                    {app.businessName}
                                  </p>
                                  <p style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "var(--text-faint)", marginTop: 1 }}>
                                    {app.id.slice(0, 8)}…
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Owner */}
                            <td style={{ padding: "12px 16px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <Avatar name={`${app.ownerFirstName} ${app.ownerLastName}`} size={24} />
                                <div>
                                  <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                                    {app.ownerFirstName} {app.ownerLastName}
                                  </p>
                                  <p style={{ fontSize: "0.65rem", color: "var(--text-faint)", marginTop: 1, whiteSpace: "nowrap" }}>
                                    {app.email}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Type */}
                            <td style={{ padding: "12px 16px", fontSize: "0.75rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                              {formatBusinessType(app.businessType)}
                            </td>

                            {/* Volume */}
                            <td style={{ padding: "12px 16px", fontSize: "0.72rem", color: "var(--text-muted)",
                                         whiteSpace: "nowrap", fontFamily: "var(--font-mono)" }}>
                              {formatVolume(app.monthlyVolume)}
                            </td>

                            {/* Status */}
                            <td style={{ padding: "12px 16px" }}>
                              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 9px",
                                             borderRadius: 2, border: `1px solid ${s.border}`, background: s.bg,
                                             fontSize: "0.62rem", fontFamily: "var(--font-mono)",
                                             letterSpacing: "0.08em", textTransform: "uppercase", color: s.color,
                                             whiteSpace: "nowrap" }}>
                                <s.Icon size={10} />{s.label}
                              </span>
                            </td>

                            {/* Date */}
                            <td style={{ padding: "12px 16px", fontSize: "0.68rem", color: "var(--text-faint)",
                                         whiteSpace: "nowrap", fontFamily: "var(--font-mono)" }}>
                              {formatDate(app.submittedAt)}
                            </td>

                            {/* Actions */}
                            <td style={{ padding: "12px 12px" }} onClick={(e) => e.stopPropagation()}>
                              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                {app.status !== "approved" && (
                                  <button onClick={() => updateStatus(app.id, "approved")} disabled={updating === app.id}
                                    style={{ padding: "4px 9px", fontSize: "0.62rem", fontFamily: "var(--font-mono)",
                                             borderRadius: 2, cursor: "pointer", whiteSpace: "nowrap",
                                             background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.25)",
                                             color: "#34d399", opacity: updating === app.id ? 0.4 : 1 }}>
                                    Approve
                                  </button>
                                )}
                                {app.status !== "rejected" && (
                                  <button onClick={() => updateStatus(app.id, "rejected")} disabled={updating === app.id}
                                    style={{ padding: "4px 9px", fontSize: "0.62rem", fontFamily: "var(--font-mono)",
                                             borderRadius: 2, cursor: "pointer", whiteSpace: "nowrap",
                                             background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)",
                                             color: "#f87171", opacity: updating === app.id ? 0.4 : 1 }}>
                                    Reject
                                  </button>
                                )}
                                {app.status !== "pending" && (
                                  <button onClick={() => updateStatus(app.id, "pending")} disabled={updating === app.id}
                                    style={{ padding: "4px 9px", fontSize: "0.62rem", fontFamily: "var(--font-mono)",
                                             borderRadius: 2, cursor: "pointer", whiteSpace: "nowrap",
                                             background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)",
                                             color: "#f59e0b", opacity: updating === app.id ? 0.4 : 1 }}>
                                    Reset
                                  </button>
                                )}
                                <button
                                  onClick={() => setSelected(isActive ? null : app)}
                                  style={{ padding: "4px 7px", borderRadius: 2, cursor: "pointer",
                                           background: isActive ? "var(--bg-elevated)" : "transparent",
                                           border: "1px solid var(--border-default)", color: "var(--text-muted)",
                                           display: "flex", alignItems: "center" }}>
                                  <ChevronRight size={12} style={{
                                    transform: isActive ? "rotate(90deg)" : "none",
                                    transition: "transform 0.2s",
                                  }} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Row count */}
            <p style={{ marginTop: 8, fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--text-faint)" }}>
              Showing {filtered.length} of {applications.length} application{applications.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* ── Detail panel (sticky sidebar) ─────────────────────────── */}
          {selected && (
            <div
              className="glass-card"
              style={{
                width: 320, flexShrink: 0, borderRadius: 4, overflow: "hidden",
                position: "sticky", top: 72,
                maxHeight: "calc(100vh - 88px)",
                display: "flex", flexDirection: "column",
              }}>
              <DetailPanel
                app={selected}
                onClose={() => setSelected(null)}
                onUpdate={updateStatus}
                updating={updating}
              />
            </div>
          )}
        </div>

      </main>
    </div>
  );
}