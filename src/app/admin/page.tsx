"use client";

import { useEffect, useState, useCallback } from "react";
import {
  CheckCircle2, XCircle, Clock, Search, RefreshCw,
  Users, AlertCircle, LogOut, ChevronRight, X, Building2,
  Trash2, FileText, ExternalLink,
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
          <span style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)",
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
function DetailPanel({ app, onClose, onUpdate, onDelete, updating, deleting }: {
  app: Application;
  onClose: () => void;
  onUpdate: (id: string, status: Application["status"]) => void;
  onDelete: (id: string) => void;
  updating: string | null;
  deleting: string | null;
}) {
  const s = STATUS[app.status];
  const busy = updating === app.id || deleting === app.id;
  const isCompany = app.applicantType === "company";

  const fields = [
    { label: "Application ID", value: app.id,          mono: true },
    { label: "Applicant Type", value: isCompany ? "Company" : "Individual" },
    { label: "Business Name",  value: app.businessName },
    { label: "Owner",          value: `${app.ownerFirstName} ${app.ownerLastName}` },
    { label: "Email",          value: app.email },
    { label: "Phone",          value: app.phone },
    { label: "Business Type",  value: formatBusinessType(app.businessType) },
    { label: "Monthly Volume", value: formatVolume(app.monthlyVolume) },
    { label: "Submitted",      value: formatDate(app.submittedAt) },
  ];

  const docLink = (label: string, doc?: { url: string; originalName: string }) => {
    if (!doc) return null;
    return (
      <a
        href={doc.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
          borderRadius: 3, border: "1px solid var(--border-subtle)", background: "var(--bg-elevated)",
          textDecoration: "none", transition: "border-color 0.2s",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)")}
      >
        <FileText size={12} style={{ color: "var(--crimson-400)", flexShrink: 0 }} />
        <span style={{ fontSize: "0.72rem", color: "var(--text-primary)", flex: 1,
                       overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {label}
        </span>
        <ExternalLink size={10} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
      </a>
    );
  };

  return (
    <div style={{ padding: "20px 24px 24px" }}>

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, flexWrap: "wrap" }}>
          <p style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", letterSpacing: "0.18em",
                      textTransform: "uppercase", color: "var(--text-muted)", flexShrink: 0 }}>
            Application Detail
          </p>
          <div style={{ width: 1, height: 14, background: "var(--border-strong)", flexShrink: 0 }} />
          <h3 className="font-display" style={{ fontSize: "1rem", fontWeight: 800, color: "var(--text-primary)", flexShrink: 0 }}>
            {app.businessName}
          </h3>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px",
                         borderRadius: 2, border: `1px solid ${s.border}`, background: s.bg,
                         fontSize: "0.62rem", fontFamily: "var(--font-mono)", letterSpacing: "0.1em",
                         textTransform: "uppercase", color: s.color, flexShrink: 0 }}>
            <s.Icon size={10} />{s.label}
          </span>
        </div>
        <button onClick={onClose} style={{ padding: 6, borderRadius: 4, border: "1px solid var(--border-default)",
                                            background: "transparent", cursor: "pointer", color: "var(--text-secondary)",
                                            display: "flex", alignItems: "center", flexShrink: 0 }}>
          <X size={13} />
        </button>
      </div>

      {/* Fields grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px 24px", marginBottom: 20 }}>
        {fields.map(({ label, value, mono }) => (
          <div key={label}>
            <p style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", letterSpacing: "0.16em",
                        textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 3 }}>
              {label}
            </p>
            <p style={{ fontSize: "0.83rem", color: "var(--text-primary)", wordBreak: "break-all",
                        fontFamily: mono ? "var(--font-mono)" : undefined, lineHeight: 1.4 }}>
              {value}
            </p>
          </div>
        ))}
        {app.message && (
          <div style={{ gridColumn: "1 / -1" }}>
            <p style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", letterSpacing: "0.16em",
                        textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 3 }}>
              Notes
            </p>
            <p style={{ fontSize: "0.83rem", color: "var(--text-primary)", lineHeight: 1.6 }}>
              {app.message}
            </p>
          </div>
        )}
      </div>

      {/* Documents */}
      {isCompany && (app.companyRegistrationDoc || app.directorIdDoc || app.proofOfBankDoc) && (
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", letterSpacing: "0.16em",
                      textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>
            Company Documents
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {docLink("Company Registration", app.companyRegistrationDoc)}
            {docLink("Director ID", app.directorIdDoc)}
            {docLink("Proof of Bank Account", app.proofOfBankDoc)}
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, borderTop: "1px solid var(--border-subtle)", paddingTop: 16 }}>
        {app.status !== "approved" && (
          <button onClick={() => onUpdate(app.id, "approved")} disabled={busy} style={{
            padding: "8px 18px", fontSize: "0.72rem", fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 3, cursor: busy ? "not-allowed" : "pointer",
            background: "rgba(52,211,153,0.10)", border: "1px solid rgba(52,211,153,0.30)", color: "#34d399",
            opacity: busy ? 0.45 : 1, transition: "opacity 0.2s",
          }}>✓ Approve</button>
        )}
        {app.status !== "rejected" && (
          <button onClick={() => onUpdate(app.id, "rejected")} disabled={busy} style={{
            padding: "8px 18px", fontSize: "0.72rem", fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 3, cursor: busy ? "not-allowed" : "pointer",
            background: "rgba(248,113,113,0.10)", border: "1px solid rgba(248,113,113,0.30)", color: "#f87171",
            opacity: busy ? 0.45 : 1, transition: "opacity 0.2s",
          }}>✕ Reject</button>
        )}
        {app.status !== "pending" && (
          <button onClick={() => onUpdate(app.id, "pending")} disabled={busy} style={{
            padding: "8px 18px", fontSize: "0.72rem", fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 3, cursor: busy ? "not-allowed" : "pointer",
            background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.30)", color: "#f59e0b",
            opacity: busy ? 0.45 : 1, transition: "opacity 0.2s",
          }}>↺ Reset to Pending</button>
        )}
        <a href={`mailto:${app.email}`} style={{
          display: "inline-flex", alignItems: "center", padding: "8px 18px", fontSize: "0.72rem",
          fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase",
          borderRadius: 3, background: "var(--bg-elevated)", border: "1px solid var(--border-default)",
          color: "var(--text-secondary)", textDecoration: "none",
        }}>✉ Email Applicant</a>
        <button
          onClick={() => { if (confirm(`Delete application for "${app.businessName}"? This cannot be undone.`)) { onDelete(app.id); } }}
          disabled={busy}
          style={{
            padding: "8px 18px", fontSize: "0.72rem", fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 3,
            cursor: busy ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.20)",
            color: "var(--crimson-400)", opacity: busy ? 0.45 : 1, transition: "opacity 0.2s",
          }}>
          <Trash2 size={12} /> Delete
        </button>
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
  const [deleting, setDeleting]   = useState<string | null>(null);
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

  const deleteApp = async (id: string) => {
    setDeleting(id);
    try {
      const res = await fetch(`/api/applications/${id}`, { method: "DELETE" });
      if (res.ok) {
        setApplications((prev) => prev.filter((a) => a.id !== id));
        if (selected?.id === id) setSelected(null);
      }
    } finally { setDeleting(null); }
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
                           textTransform: "uppercase", color: "var(--text-muted)" }}>
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
              <div className="hidden sm:block" style={{ textAlign: "left" }}>
                <p style={{ fontSize: "0.76rem", fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.2 }}>
                  {user.displayName}
                </p>
                <p style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", lineHeight: 1 }}>
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
                  background: "var(--bg-surface)", border: "1px solid var(--border-default)",
                  borderRadius: 6, overflow: "hidden", minWidth: 160,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                }}>
                  <button onClick={handleLogout} style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 9,
                    padding: "11px 14px", background: "transparent", border: "none",
                    cursor: "pointer", fontSize: "0.78rem", color: "var(--text-secondary)",
                    transition: "background 0.15s",
                  }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)")}
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
      <main style={{ flex: 1, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "32px 20px 60px" }}>

        {/* Greeting */}
        <div style={{ marginBottom: 28 }}>
          <h1 className="font-display" style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--text-primary)", marginBottom: 4 }}>
            {greeting}, {firstName}.
          </h1>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            {counts.pending > 0
              ? `You have ${counts.pending} pending application${counts.pending !== 1 ? "s" : ""} to review.`
              : "All applications have been reviewed."}
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

        {/* Table */}
        <div style={{ width: "100%" }}>

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

              {/* Refresh */}
              <button onClick={fetchApplications} disabled={loading} style={{
                padding: "7px 11px", background: "transparent", border: "1px solid var(--border-default)",
                borderRadius: 4, cursor: loading ? "not-allowed" : "pointer", color: "var(--text-muted)",
                display: "flex", alignItems: "center", opacity: loading ? 0.5 : 1,
              }}>
                <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              </button>
            </div>

            {/* Table card */}
            <div className="glass-card" style={{ borderRadius: 4, overflow: "hidden" }}>
              {loading ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
                              justifyContent: "center", padding: "60px 20px", gap: 12 }}>
                  <RefreshCw size={20} className="animate-spin" style={{ color: "var(--text-muted)" }} />
                  <p style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
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
                        {["Business", "Type", "Owner", "Volume", "Status", "Date", "Actions"].map((h) => (
                          <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: "0.6rem",
                                              fontFamily: "var(--font-mono)", letterSpacing: "0.16em",
                                              textTransform: "uppercase", color: "var(--text-secondary)",
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
                        const isBusy   = deleting === app.id || updating === app.id;
                        return (
                          <>
                          <tr
                            key={app.id}
                            onClick={() => setSelected(isActive ? null : app)}
                            style={{ borderBottom: isActive ? "none" : "1px solid var(--border-subtle)", cursor: "pointer",
                                     background: isActive ? "rgba(220,38,38,0.06)" : "transparent",
                                     transition: "background 0.15s", opacity: isBusy ? 0.5 : 1 }}
                            onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = isActive ? "rgba(220,38,38,0.06)" : "transparent"; }}>

                            {/* Business */}
                            <td style={{ padding: "12px 16px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ width: 28, height: 28, borderRadius: 4, flexShrink: 0,
                                              background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)",
                                              display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <Building2 size={12} style={{ color: "var(--text-muted)" }} />
                                </div>
                                <div>
                                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap" }}>
                                    {app.businessName}
                                  </p>
                                  <p style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginTop: 1 }}>
                                    {app.id.slice(0, 8)}…
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Applicant type */}
                            <td style={{ padding: "12px 16px" }}>
                              <span style={{
                                fontSize: "0.62rem", fontFamily: "var(--font-mono)", letterSpacing: "0.08em",
                                textTransform: "uppercase", padding: "3px 7px", borderRadius: 2,
                                background: app.applicantType === "company" ? "rgba(139,92,246,0.10)" : "rgba(148,163,184,0.10)",
                                border: `1px solid ${app.applicantType === "company" ? "rgba(139,92,246,0.25)" : "rgba(148,163,184,0.20)"}`,
                                color: app.applicantType === "company" ? "#a78bfa" : "var(--text-muted)",
                                whiteSpace: "nowrap",
                              }}>
                                {app.applicantType === "company" ? "🏢 Co." : "👤 Ind."}
                              </span>
                            </td>

                            {/* Owner */}
                            <td style={{ padding: "12px 16px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <Avatar name={`${app.ownerFirstName} ${app.ownerLastName}`} size={24} />
                                <div>
                                  <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
                                    {app.ownerFirstName} {app.ownerLastName}
                                  </p>
                                  <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: 1, whiteSpace: "nowrap" }}>
                                    {app.email}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Volume */}
                            <td style={{ padding: "12px 16px", fontSize: "0.72rem", color: "var(--text-secondary)",
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
                            <td style={{ padding: "12px 16px", fontSize: "0.68rem", color: "var(--text-secondary)",
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
                                {/* Delete */}
                                <button
                                  onClick={() => {
                                    if (confirm(`Delete "${app.businessName}"? This cannot be undone.`)) {
                                      deleteApp(app.id);
                                    }
                                  }}
                                  disabled={deleting === app.id}
                                  title="Delete application"
                                  style={{ padding: "4px 7px", borderRadius: 2, cursor: "pointer",
                                           background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.20)",
                                           color: "var(--crimson-400)", display: "flex", alignItems: "center",
                                           opacity: deleting === app.id ? 0.4 : 1 }}>
                                  <Trash2 size={11} />
                                </button>
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
                          {isActive && (
                            <tr key={`${app.id}-detail`} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                              <td colSpan={7} style={{ padding: 0, background: "rgba(220,38,38,0.03)" }}>
                                <div style={{ borderTop: "1px solid rgba(220,38,38,0.15)" }}>
                                  <DetailPanel
                                    app={selected!}
                                    onClose={() => setSelected(null)}
                                    onUpdate={updateStatus}
                                    onDelete={deleteApp}
                                    updating={updating}
                                    deleting={deleting}
                                  />
                                </div>
                              </td>
                            </tr>
                          )}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Row count */}
            <p style={{ marginTop: 8, fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
              Showing {filtered.length} of {applications.length} application{applications.length !== 1 ? "s" : ""}
            </p>
          </div>

      </main>
    </div>
  );
}