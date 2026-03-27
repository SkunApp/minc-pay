"use client";

import { useEffect, useState, useCallback } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  RefreshCw,
  ChevronDown,
  Eye,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Application } from "@/types";
import { formatDate, formatVolume, formatBusinessType } from "@/lib/utils";
import { cn } from "@/lib/utils";

type StatusFilter = "all" | "pending" | "approved" | "rejected";
type SortField = "submittedAt" | "businessName" | "status";

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    cls: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  },
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    cls: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    cls: "text-crimson-400 bg-crimson-400/10 border-crimson-400/20",
  },
};

export default function AdminPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortField, setSortField] = useState<SortField>("submittedAt");
  const [updating, setUpdating] = useState<string | null>(null);
  const [selected, setSelected] = useState<Application | null>(null);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/applications");
      const data = await res.json();
      setApplications(data);
    } catch {
      console.error("Failed to fetch");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

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
    } finally {
      setUpdating(null);
    }
  };

  const filtered = applications
    .filter((a) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        a.businessName.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.ownerFirstName.toLowerCase().includes(q) ||
        a.ownerLastName.toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || a.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortField === "submittedAt")
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
      if (sortField === "businessName")
        return a.businessName.localeCompare(b.businessName);
      return a.status.localeCompare(b.status);
    });

  const counts = {
    all: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Top bar */}
      <div className="bg-navy-900 border-b border-white/8 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/30 text-xs font-mono tracking-widest uppercase mb-1">
                Internal Portal
              </p>
              <h1 className="font-display text-2xl font-black text-white">
                Applications Dashboard
              </h1>
            </div>
            <button
              onClick={fetchApplications}
              className="btn-secondary py-2 px-4 text-xs"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Total", value: counts.all, icon: Users, color: "text-white" },
              { label: "Pending", value: counts.pending, icon: Clock, color: "text-amber-400" },
              { label: "Approved", value: counts.approved, icon: CheckCircle2, color: "text-emerald-400" },
              { label: "Rejected", value: counts.rejected, icon: XCircle, color: "text-crimson-400" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="glass-card rounded-sm p-4 flex items-center gap-3">
                  <Icon size={16} className={stat.color} />
                  <div>
                    <p className="text-white font-display text-xl font-black leading-none">
                      {stat.value}
                    </p>
                    <p className="text-white/30 text-xs font-mono tracking-wide mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main table */}
          <div className="flex-1 min-w-0">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1">
                <Search
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search business, name, email..."
                  className="input-field pl-9 text-sm"
                />
              </div>

              <div className="flex gap-2">
                {(["all", "pending", "approved", "rejected"] as StatusFilter[]).map(
                  (s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={cn(
                        "px-3 py-2 text-xs font-mono tracking-wide uppercase rounded-sm border transition-all duration-200",
                        statusFilter === s
                          ? "bg-crimson-600 border-crimson-600 text-white"
                          : "border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
                      )}
                    >
                      {s} {s !== "all" && `(${counts[s]})`}
                    </button>
                  )
                )}
              </div>

              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
                className="input-field text-xs font-mono w-auto"
              >
                <option value="submittedAt">Sort: Date</option>
                <option value="businessName">Sort: Name</option>
                <option value="status">Sort: Status</option>
              </select>
            </div>

            {/* Table */}
            <div className="glass-card rounded-sm overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <RefreshCw size={20} className="animate-spin text-white/30" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-white/20">
                  <AlertCircle size={28} className="mb-3" />
                  <p className="text-sm font-mono">No applications found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/8">
                        {["ID", "Business", "Owner", "Type", "Volume", "Status", "Date", "Actions"].map(
                          (h) => (
                            <th
                              key={h}
                              className="text-left px-4 py-3 text-white/25 text-xs font-mono tracking-widest uppercase"
                            >
                              {h}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((app) => {
                        const s = statusConfig[app.status];
                        const SIcon = s.icon;
                        return (
                          <tr
                            key={app.id}
                            className={cn(
                              "border-b border-white/5 hover:bg-white/2 transition-colors cursor-pointer",
                              selected?.id === app.id && "bg-crimson-600/5"
                            )}
                            onClick={() => setSelected(app)}
                          >
                            <td className="px-4 py-3.5 text-white/30 font-mono text-xs">
                              {app.id}
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="text-white font-medium">
                                {app.businessName}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-white/50">
                              {app.ownerFirstName} {app.ownerLastName}
                            </td>
                            <td className="px-4 py-3.5 text-white/40 text-xs">
                              {formatBusinessType(app.businessType)}
                            </td>
                            <td className="px-4 py-3.5 text-white/40 text-xs whitespace-nowrap">
                              {formatVolume(app.monthlyVolume)}
                            </td>
                            <td className="px-4 py-3.5">
                              <span
                                className={cn(
                                  "inline-flex items-center gap-1.5 px-2 py-1 rounded-sm border text-xs font-mono",
                                  s.cls
                                )}
                              >
                                <SIcon size={10} />
                                {s.label}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-white/30 text-xs whitespace-nowrap">
                              {formatDate(app.submittedAt)}
                            </td>
                            <td className="px-4 py-3.5">
                              <div
                                className="flex gap-1.5"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {app.status !== "approved" && (
                                  <button
                                    onClick={() => updateStatus(app.id, "approved")}
                                    disabled={updating === app.id}
                                    className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-xs rounded-sm transition-colors disabled:opacity-40"
                                  >
                                    Approve
                                  </button>
                                )}
                                {app.status !== "rejected" && (
                                  <button
                                    onClick={() => updateStatus(app.id, "rejected")}
                                    disabled={updating === app.id}
                                    className="px-2.5 py-1 bg-crimson-600/10 border border-crimson-600/20 text-crimson-400 hover:bg-crimson-600/20 text-xs rounded-sm transition-colors disabled:opacity-40"
                                  >
                                    Reject
                                  </button>
                                )}
                                {app.status !== "pending" && (
                                  <button
                                    onClick={() => updateStatus(app.id, "pending")}
                                    disabled={updating === app.id}
                                    className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 text-xs rounded-sm transition-colors disabled:opacity-40"
                                  >
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

            <p className="text-white/20 text-xs font-mono mt-3">
              Showing {filtered.length} of {applications.length} applications
            </p>
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="lg:w-80 flex-shrink-0">
              <div className="glass-card rounded-sm p-6 sticky top-24">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display text-base font-bold text-white">
                    Application Detail
                  </h3>
                  <button
                    onClick={() => setSelected(null)}
                    className="text-white/30 hover:text-white/60 transition-colors text-xs font-mono"
                  >
                    ✕
                  </button>
                </div>

                {(() => {
                  const s = statusConfig[selected.status];
                  const SIcon = s.icon;
                  return (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border text-xs font-mono mb-5",
                        s.cls
                      )}
                    >
                      <SIcon size={11} />
                      {s.label}
                    </span>
                  );
                })()}

                <div className="space-y-4">
                  {[
                    { label: "Application ID", value: selected.id },
                    { label: "Business", value: selected.businessName },
                    {
                      label: "Owner",
                      value: `${selected.ownerFirstName} ${selected.ownerLastName}`,
                    },
                    { label: "Email", value: selected.email },
                    { label: "Phone", value: selected.phone },
                    {
                      label: "Business Type",
                      value: formatBusinessType(selected.businessType),
                    },
                    {
                      label: "Monthly Volume",
                      value: formatVolume(selected.monthlyVolume),
                    },
                    { label: "Submitted", value: formatDate(selected.submittedAt) },
                  ].map((row) => (
                    <div key={row.label}>
                      <p className="text-white/25 text-xs font-mono tracking-widest uppercase mb-1">
                        {row.label}
                      </p>
                      <p className="text-white/70 text-sm">{row.value}</p>
                    </div>
                  ))}

                  {selected.message && (
                    <div>
                      <p className="text-white/25 text-xs font-mono tracking-widest uppercase mb-1">
                        Notes
                      </p>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {selected.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-5 border-t border-white/8 flex flex-col gap-2">
                  {selected.status !== "approved" && (
                    <button
                      onClick={() => updateStatus(selected.id, "approved")}
                      disabled={updating === selected.id}
                      className="w-full py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-xs font-mono rounded-sm transition-colors disabled:opacity-40"
                    >
                      ✓ Approve Application
                    </button>
                  )}
                  {selected.status !== "rejected" && (
                    <button
                      onClick={() => updateStatus(selected.id, "rejected")}
                      disabled={updating === selected.id}
                      className="w-full py-2.5 bg-crimson-600/10 border border-crimson-600/20 text-crimson-400 hover:bg-crimson-600/20 text-xs font-mono rounded-sm transition-colors disabled:opacity-40"
                    >
                      ✕ Reject Application
                    </button>
                  )}
                  {selected.status !== "pending" && (
                    <button
                      onClick={() => updateStatus(selected.id, "pending")}
                      disabled={updating === selected.id}
                      className="w-full py-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 text-xs font-mono rounded-sm transition-colors disabled:opacity-40"
                    >
                      ↺ Reset to Pending
                    </button>
                  )}
                  <a
                    href={`mailto:${selected.email}`}
                    className="w-full py-2.5 glass border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 text-xs font-mono text-center rounded-sm transition-colors"
                  >
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
