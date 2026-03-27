"use client";

import { useEffect, useState, useCallback } from "react";
import { CheckCircle2, XCircle, Clock, Search, RefreshCw, Users, AlertCircle } from "lucide-react";
import { Application } from "@/types";
import { formatDate, formatVolume, formatBusinessType } from "@/lib/utils";
import { cn } from "@/lib/utils";

type StatusFilter = "all" | "pending" | "approved" | "rejected";
type SortField    = "submittedAt" | "businessName" | "status";

const statusConfig = {
  pending:  { label: "Pending",  Icon: Clock,        color: "#f59e0b", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.25)" },
  approved: { label: "Approved", Icon: CheckCircle2, color: "#34d399", bg: "rgba(52,211,153,0.08)",  border: "rgba(52,211,153,0.25)" },
  rejected: { label: "Rejected", Icon: XCircle,      color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.25)" },
};

export default function AdminPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [statusFilter, setFilter] = useState<StatusFilter>("all");
  const [sortField, setSort]      = useState<SortField>("submittedAt");
  const [updating, setUpdating]   = useState<string | null>(null);
  const [selected, setSelected]   = useState<Application | null>(null);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/applications");
      setApplications(await res.json());
    } catch { /* silently fail */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchApplications(); }, [fetchApplications]);

  const updateStatus = async (id: string, status: Application["status"]) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setApplications((prev) => prev.map((a) => (a.id === id ? updated : a)));
        if (selected?.id === id) setSelected(updated);
      }
    } finally { setUpdating(null); }
  };

  const filtered = applications
    .filter((a) => {
      const q = search.toLowerCase();
      const matchQ = !q || [a.businessName, a.email, a.ownerFirstName, a.ownerLastName].some((s) => s.toLowerCase().includes(q));
      return matchQ && (statusFilter === "all" || a.status === statusFilter);
    })
    .sort((a, b) => {
      if (sortField === "submittedAt") return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      if (sortField === "businessName") return a.businessName.localeCompare(b.businessName);
      return a.status.localeCompare(b.status);
    });

  const counts = {
    all:      applications.length,
    pending:  applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  const filterBtns: StatusFilter[] = ["all", "pending", "approved", "rejected"];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)" }}>

      {/* Top bar */}
      <div className="border-b pt-20" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-mono tracking-widest uppercase mb-1" style={{ color: "var(--text-muted)" }}>Internal Portal</p>
              <h1 className="font-display text-2xl font-black" style={{ color: "var(--text-primary)" }}>Applications Dashboard</h1>
            </div>
            <button onClick={fetchApplications} className="btn-secondary py-2 px-4 text-xs gap-1.5">
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total",    value: counts.all,      Icon: Users,        color: "var(--text-primary)" },
              { label: "Pending",  value: counts.pending,  Icon: Clock,        color: "#f59e0b" },
              { label: "Approved", value: counts.approved, Icon: CheckCircle2, color: "#34d399" },
              { label: "Rejected", value: counts.rejected, Icon: XCircle,      color: "#f87171" },
            ].map(({ label, value, Icon, color }) => (
              <div key={label} className="glass-card rounded-sm p-4 flex items-center gap-3">
                <Icon size={16} style={{ color }} />
                <div>
                  <p className="font-display text-xl font-black leading-none" style={{ color: "var(--text-primary)" }}>{value}</p>
                  <p className="text-xs font-mono tracking-wide mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Table area */}
          <div className="flex-1 min-w-0">
            {/* Filters row */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search business, name, email..."
                  className="input-field pl-9 text-sm" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {filterBtns.map((s) => (
                  <button key={s} onClick={() => setFilter(s)}
                    className="px-3 py-2 text-xs font-mono tracking-wide uppercase rounded-sm border transition-all duration-200"
                    style={statusFilter === s
                      ? { backgroundColor: "var(--crimson-600)", borderColor: "var(--crimson-600)", color: "#fff" }
                      : { borderColor: "var(--border-default)", color: "var(--text-muted)", backgroundColor: "transparent" }}>
                    {s}{s !== "all" && ` (${counts[s]})`}
                  </button>
                ))}
              </div>
              <select value={sortField} onChange={(e) => setSort(e.target.value as SortField)} className="input-field text-xs font-mono w-auto">
                <option value="submittedAt">Sort: Date</option>
                <option value="businessName">Sort: Name</option>
                <option value="status">Sort: Status</option>
              </select>
            </div>

            {/* Table */}
            <div className="glass-card rounded-sm overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <RefreshCw size={20} className="animate-spin" style={{ color: "var(--text-muted)" }} />
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20" style={{ color: "var(--text-muted)" }}>
                  <AlertCircle size={28} className="mb-3" />
                  <p className="text-sm font-mono">No applications found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                        {["ID", "Business", "Owner", "Type", "Volume", "Status", "Date", "Actions"].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-mono tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((app) => {
                        const s = statusConfig[app.status];
                        return (
                          <tr key={app.id}
                            className="cursor-pointer transition-colors"
                            style={{ borderBottom: "1px solid var(--border-subtle)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-elevated)")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = selected?.id === app.id ? "rgba(220,38,38,0.04)" : "transparent")}
                            onClick={() => setSelected(app)}>
                            <td className="px-4 py-3.5 text-xs font-mono" style={{ color: "var(--text-muted)" }}>{app.id.slice(0, 8)}…</td>
                            <td className="px-4 py-3.5 font-medium" style={{ color: "var(--text-primary)" }}>{app.businessName}</td>
                            <td className="px-4 py-3.5" style={{ color: "var(--text-secondary)" }}>{app.ownerFirstName} {app.ownerLastName}</td>
                            <td className="px-4 py-3.5 text-xs" style={{ color: "var(--text-muted)" }}>{formatBusinessType(app.businessType)}</td>
                            <td className="px-4 py-3.5 text-xs whitespace-nowrap" style={{ color: "var(--text-muted)" }}>{formatVolume(app.monthlyVolume)}</td>
                            <td className="px-4 py-3.5">
                              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm border text-xs font-mono"
                                style={{ color: s.color, backgroundColor: s.bg, borderColor: s.border }}>
                                <s.Icon size={10} /> {s.label}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-xs whitespace-nowrap" style={{ color: "var(--text-muted)" }}>{formatDate(app.submittedAt)}</td>
                            <td className="px-4 py-3.5">
                              <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                                {app.status !== "approved" && (
                                  <button onClick={() => updateStatus(app.id, "approved")} disabled={updating === app.id}
                                    className="px-2.5 py-1 text-xs rounded-sm transition-colors disabled:opacity-40"
                                    style={{ backgroundColor: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.22)", color: "#34d399" }}>
                                    Approve
                                  </button>
                                )}
                                {app.status !== "rejected" && (
                                  <button onClick={() => updateStatus(app.id, "rejected")} disabled={updating === app.id}
                                    className="px-2.5 py-1 text-xs rounded-sm transition-colors disabled:opacity-40"
                                    style={{ backgroundColor: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.22)", color: "#f87171" }}>
                                    Reject
                                  </button>
                                )}
                                {app.status !== "pending" && (
                                  <button onClick={() => updateStatus(app.id, "pending")} disabled={updating === app.id}
                                    className="px-2.5 py-1 text-xs rounded-sm transition-colors disabled:opacity-40"
                                    style={{ backgroundColor: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.22)", color: "#f59e0b" }}>
                                    Reset
                                  </button>
                                )}
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
            <p className="text-xs font-mono mt-3" style={{ color: "var(--text-faint)" }}>
              Showing {filtered.length} of {applications.length} applications
            </p>
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="lg:w-80 flex-shrink-0">
              <div className="glass-card rounded-sm p-6 sticky top-24">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display text-base font-bold" style={{ color: "var(--text-primary)" }}>Application Detail</h3>
                  <button onClick={() => setSelected(null)} className="text-xs font-mono transition-colors" style={{ color: "var(--text-muted)" }}>✕</button>
                </div>

                {(() => {
                  const s = statusConfig[selected.status];
                  return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border text-xs font-mono mb-5"
                      style={{ color: s.color, backgroundColor: s.bg, borderColor: s.border }}>
                      <s.Icon size={11} /> {s.label}
                    </span>
                  );
                })()}

                <div className="space-y-4">
                  {[
                    { label: "Application ID", value: selected.id },
                    { label: "Business",        value: selected.businessName },
                    { label: "Owner",           value: `${selected.ownerFirstName} ${selected.ownerLastName}` },
                    { label: "Email",           value: selected.email },
                    { label: "Phone",           value: selected.phone },
                    { label: "Business Type",   value: formatBusinessType(selected.businessType) },
                    { label: "Monthly Volume",  value: formatVolume(selected.monthlyVolume) },
                    { label: "Submitted",       value: formatDate(selected.submittedAt) },
                  ].map((row) => (
                    <div key={row.label}>
                      <p className="text-xs font-mono tracking-widest uppercase mb-1" style={{ color: "var(--text-faint)" }}>{row.label}</p>
                      <p className="text-sm break-all" style={{ color: "var(--text-secondary)" }}>{row.value}</p>
                    </div>
                  ))}
                  {selected.message && (
                    <div>
                      <p className="text-xs font-mono tracking-widest uppercase mb-1" style={{ color: "var(--text-faint)" }}>Notes</p>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{selected.message}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-5 flex flex-col gap-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                  {selected.status !== "approved" && (
                    <button onClick={() => updateStatus(selected.id, "approved")} disabled={updating === selected.id}
                      className="w-full py-2.5 text-xs font-mono rounded-sm transition-colors disabled:opacity-40"
                      style={{ backgroundColor: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.22)", color: "#34d399" }}>
                      ✓ Approve Application
                    </button>
                  )}
                  {selected.status !== "rejected" && (
                    <button onClick={() => updateStatus(selected.id, "rejected")} disabled={updating === selected.id}
                      className="w-full py-2.5 text-xs font-mono rounded-sm transition-colors disabled:opacity-40"
                      style={{ backgroundColor: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.22)", color: "#f87171" }}>
                      ✕ Reject Application
                    </button>
                  )}
                  {selected.status !== "pending" && (
                    <button onClick={() => updateStatus(selected.id, "pending")} disabled={updating === selected.id}
                      className="w-full py-2.5 text-xs font-mono rounded-sm transition-colors disabled:opacity-40"
                      style={{ backgroundColor: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.22)", color: "#f59e0b" }}>
                      ↺ Reset to Pending
                    </button>
                  )}
                  <a href={`mailto:${selected.email}`}
                    className="w-full py-2.5 text-xs font-mono text-center rounded-sm transition-colors"
                    style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-default)", color: "var(--text-secondary)" }}>
                    ✉ Email Applicant
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
