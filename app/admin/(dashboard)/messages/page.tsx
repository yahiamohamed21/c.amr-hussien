"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button, Input } from "@/components/ui";
import { useAdminAlert } from "@/hooks/useAdminAlert";
import { 
  Search, Calendar, MessageSquare, Check, X, 
  Trash2, Eye, ExternalLink, ChevronLeft, ChevronRight, Mail 
} from "lucide-react";

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const { showSuccess, showError, confirmDelete } = useAdminAlert();

  const pageSize = 10;

  const statusOptions = [
    { value: "0", label: "New", color: "bg-blue-500/10 text-blue-400 border border-blue-500/20" },
    { value: "1", label: "Reviewed", color: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
    { value: "2", label: "Contacted", color: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
    { value: "3", label: "Rejected", color: "bg-rose-500/10 text-rose-400 border border-rose-500/20" },
  ];

  const getStatusBadge = (statusNum: number) => {
    const opt = statusOptions.find(o => o.value === statusNum.toString());
    return opt ? opt : { label: "Unknown", color: "bg-white/10 text-on-surface-variant" };
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const params: any = {
        page,
        pageSize,
      };
      if (search.trim()) params.search = search.trim();
      if (statusFilter) params.status = parseInt(statusFilter);

      const res = await api.get("/api/v1/admin/messages", { params });
      setMessages(res.data.items);
      setTotalItems(res.data.total);
      setTotalPages(Math.ceil(res.data.total / pageSize) || 1);
    } catch (err) {
      showError("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [page, statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchMessages();
  };

  const handleViewDetails = async (id: string) => {
    setDetailLoading(true);
    try {
      const res = await api.get(`/api/v1/admin/messages/${id}`);
      setSelectedMessage(res.data);
      // Mark read locally
      setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
    } catch (err) {
      showError("Failed to load message details.");
    } finally {
      setDetailLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: number) => {
    try {
      await api.patch(`/api/v1/admin/messages/${id}/status`, { status: newStatus });
      showSuccess("Status updated successfully.");
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
    } catch (err) {
      showError("Failed to update status.");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (await confirmDelete(name)) {
      try {
        await api.delete(`/api/v1/admin/messages/${id}`);
        showSuccess("Message deleted successfully.");
        setSelectedMessage(null);
        fetchMessages();
      } catch (err) {
        showError("Failed to delete message.");
      }
    }
  };

  const formatWhatsAppLink = (phone: string) => {
    if (!phone) return "#";
    // Strip everything but numbers
    const cleanPhone = phone.replace(/\D/g, "");
    return `https://wa.me/${cleanPhone}`;
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl uppercase tracking-wider text-on-surface">Coaching Applications</h1>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">Review and manage application forms submitted by clients.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-surface p-6 rounded-2xl border border-white/5 shadow-md flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="flex w-full md:w-auto items-center gap-3">
          <Input 
            placeholder="Search by name, email or phone..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-80"
          />
          <Button type="submit" variant="secondary" className="px-4">
            <Search className="w-5 h-5" />
          </Button>
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="text-sm font-label-caps text-on-surface-variant uppercase tracking-widest whitespace-nowrap">Filter Status:</label>
          <select 
            value={statusFilter} 
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
            className="bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container text-sm w-full md:w-48"
          >
            <option value="">All Statuses</option>
            {statusOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* List Table */}
      {loading ? (
        <div className="text-center py-12 text-on-surface-variant">Loading messages...</div>
      ) : (
        <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-low border-b border-white/5 text-sm font-label-caps uppercase text-on-surface-variant">
                <tr>
                  <th className="p-4 w-8"></th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Goal</th>
                  <th className="p-4">WhatsApp</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m) => {
                  const badge = getStatusBadge(m.status);
                  return (
                    <tr 
                      key={m.id} 
                      className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${!m.isRead ? "bg-primary/5 font-semibold" : ""}`}
                    >
                      <td className="p-4">
                        {!m.isRead && (
                          <span className="w-2.5 h-2.5 bg-primary rounded-full block animate-pulse"></span>
                        )}
                      </td>
                      <td className="p-4 text-sm text-on-surface-variant">
                        {new Date(m.createdAtUtc).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-on-surface">{m.fullName}</td>
                      <td className="p-4 text-sm text-on-surface-variant">{m.primaryGoal}</td>
                      <td className="p-4 text-sm">
                        <a 
                          href={formatWhatsAppLink(m.whatsAppNumber)} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-primary hover:underline flex items-center gap-1.5"
                        >
                          {m.whatsAppNumber}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded text-xs uppercase tracking-wider font-semibold ${badge.color}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          className="p-2 min-h-0" 
                          onClick={() => handleViewDetails(m.id)}
                          isLoading={detailLoading && selectedMessage?.id === m.id}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="p-2 min-h-0 text-error hover:bg-error/10" 
                          onClick={() => handleDelete(m.id, m.fullName)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
                {messages.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-on-surface-variant italic">No applications found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-6 bg-surface-container-lowest border-t border-white/5">
              <span className="text-xs text-on-surface-variant font-label-caps">Showing page {page} of {totalPages} ({totalItems} total)</span>
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  disabled={page === 1} 
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  className="p-2 min-h-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button 
                  variant="secondary" 
                  disabled={page === totalPages} 
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  className="p-2 min-h-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-surface-container max-w-2xl w-full rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative">
            {/* Form Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-label-caps text-primary uppercase tracking-widest flex items-center gap-1.5 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Submitted: {new Date(selectedMessage.createdAtUtc).toLocaleString()}
                  </span>
                  <h2 className="text-2xl font-display uppercase text-on-surface">{selectedMessage.fullName}</h2>
                </div>
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="text-on-surface-variant hover:text-on-surface p-1 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-surface-container-low p-5 rounded-xl border border-white/5">
                <div>
                  <span className="text-xs font-label-caps text-on-surface-variant uppercase tracking-widest block mb-1">Email Address</span>
                  <a href={`mailto:${selectedMessage.email}`} className="text-on-surface hover:text-primary transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {selectedMessage.email}
                  </a>
                </div>
                <div>
                  <span className="text-xs font-label-caps text-on-surface-variant uppercase tracking-widest block mb-1">WhatsApp Number</span>
                  <a 
                    href={formatWhatsAppLink(selectedMessage.whatsAppNumber)} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-primary hover:underline flex items-center gap-1.5"
                  >
                    {selectedMessage.whatsAppNumber}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <div className="md:col-span-2">
                  <span className="text-xs font-label-caps text-on-surface-variant uppercase tracking-widest block mb-1">Primary Goal</span>
                  <span className="text-on-surface text-lg font-semibold">{selectedMessage.primaryGoal}</span>
                </div>
              </div>

              {/* Injuries / Health */}
              <div className="space-y-2">
                <span className="text-xs font-label-caps text-on-surface-variant uppercase tracking-widest block">Injuries / Physical State</span>
                <div className="bg-surface-container-lowest border border-white/5 p-4 rounded-xl text-on-surface min-h-[80px] leading-relaxed">
                  {selectedMessage.healthConsiderations || <span className="italic text-on-surface-variant/60">No health considerations or injuries specified.</span>}
                </div>
              </div>

              {/* Status Update */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-label-caps text-on-surface-variant uppercase tracking-widest">Update Status:</span>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((opt) => {
                      const isActive = selectedMessage.status.toString() === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => handleUpdateStatus(selectedMessage.id, parseInt(opt.value))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-label-caps uppercase tracking-widest border transition-all ${
                            isActive 
                              ? "bg-primary text-black font-bold border-primary shadow-[0_0_10px_rgba(184,211,0,0.4)]" 
                              : "bg-surface-container-high border-white/5 text-on-surface-variant hover:text-on-surface hover:border-white/10"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button 
                    variant="danger" 
                    className="py-2.5" 
                    onClick={() => handleDelete(selectedMessage.id, selectedMessage.fullName)}
                  >
                    <Trash2 className="w-4 h-4 mr-2 inline" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
