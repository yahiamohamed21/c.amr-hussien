"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAdminAlert } from "@/hooks/useAdminAlert";

export default function AdminOverview() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { showError } = useAdminAlert();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/v1/admin/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        showError("Failed to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl uppercase tracking-wider text-on-surface">Dashboard Overview</h1>
          <p className="text-on-surface-variant font-body-md mt-1">Manage your website content and coaching applications.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-on-surface-variant italic py-6">Loading statistics...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface p-6 rounded-2xl border border-white/5 shadow-md">
            <p className="text-sm font-label-caps tracking-widest text-on-surface-variant uppercase mb-2">New Messages</p>
            <p className="text-4xl font-display text-primary-container">{stats?.newMessages ?? 0}</p>
          </div>
          
          <div className="bg-surface p-6 rounded-2xl border border-white/5 shadow-md">
            <p className="text-sm font-label-caps tracking-widest text-on-surface-variant uppercase mb-2">Total Transformations</p>
            <p className="text-4xl font-display text-primary-container">{stats?.totalTransformations ?? 0}</p>
          </div>
          
          <div className="bg-surface p-6 rounded-2xl border border-white/5 shadow-md">
            <p className="text-sm font-label-caps tracking-widest text-on-surface-variant uppercase mb-2">Active Services</p>
            <p className="text-4xl font-display text-primary-container">{stats?.activeServices ?? 0}</p>
          </div>
          
          <div className="bg-surface p-6 rounded-2xl border border-white/5 shadow-md">
            <p className="text-sm font-label-caps tracking-widest text-on-surface-variant uppercase mb-2">Site Status</p>
            <p className={`text-2xl font-body-md font-bold uppercase mt-2 ${stats?.siteStatus === "LIVE" ? "text-primary" : "text-error"}`}>
              {stats?.siteStatus ?? "UNKNOWN"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
