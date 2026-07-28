"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button, Input } from "@/components/ui";
import { useAdminAlert } from "@/hooks/useAdminAlert";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";

export default function QualificationsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError, confirmDelete } = useAdminAlert();

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/v1/admin/qualifications");
      setItems(res.data);
    } catch (err) {
      showError("Failed to load qualifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEdit = (item: any) => {
    setFormData({ 
      ...item, 
      issueDate: item.issueDate ? item.issueDate.split('T')[0] : "" 
    });
    setIsEditing(true);
  };

  const handleCreate = () => {
    setFormData({
      name: "",
      description: "",
      issuer: "",
      issueDate: "",
      displayOrder: items.length,
      isVisible: true,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (await confirmDelete(name)) {
      try {
        await api.delete(`/api/v1/admin/qualifications/${id}`);
        showSuccess("Qualification deleted successfully.");
        fetchItems();
      } catch (err) {
        showError("Failed to delete qualification.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        issueDate: formData.issueDate ? new Date(formData.issueDate).toISOString() : null
      };

      if (formData.id) {
        await api.put(`/api/v1/admin/qualifications/${formData.id}`, payload);
        showSuccess("Qualification updated successfully.");
      } else {
        await api.post("/api/v1/admin/qualifications", payload);
        showSuccess("Qualification created successfully.");
      }
      setIsEditing(false);
      fetchItems();
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        const msg = Object.values(errors).flat().join("\n");
        showError(msg);
      } else {
        showError("Operation failed.");
      }
    }
  };

  if (isEditing) {
    return (
      <div className="p-8 max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl font-display uppercase text-on-surface">
          {formData.id ? 'Edit Qualification' : 'New Qualification'}
        </h1>
        <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-2xl border border-white/5 space-y-6">
          <Input
            label="Name / Title (e.g. Certified Personal Trainer)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Issuer (e.g. NASM, ISSA)"
            value={formData.issuer}
            onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            required
          />
          <Input
            label="Issue Date"
            type="date"
            value={formData.issueDate}
            onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
          />
          <Input
            label="Display Order"
            type="number"
            value={formData.displayOrder}
            onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
          />
          
          <div className="md:col-span-2">
            <label className="block text-sm font-label-caps uppercase tracking-widest text-on-surface-variant mb-2">Description</label>
            <textarea 
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors min-h-[100px]"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isVisible"
              checked={formData.isVisible}
              onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
              className="w-5 h-5 accent-primary-container"
            />
            <label htmlFor="isVisible" className="text-on-surface font-label-caps uppercase tracking-widest text-sm select-none">Visible on Public Site</label>
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/10">
            <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl uppercase tracking-wider text-on-surface">Qualifications</h1>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">Manage certifications and professional degrees.</p>
        </div>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add New
        </Button>
      </div>
      
      {loading ? (
        <div className="text-center py-12 text-on-surface-variant">Loading qualifications...</div>
      ) : (
        <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low border-b border-white/5 text-sm font-label-caps uppercase text-on-surface-variant">
              <tr>
                <th className="p-4">Degree / Title</th>
                <th className="p-4">Issuer</th>
                <th className="p-4">Issue Date</th>
                <th className="p-4 w-24">Visible</th>
                <th className="p-4 w-24">Order</th>
                <th className="p-4 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-on-surface font-semibold">{item.name}</td>
                  <td className="p-4 text-sm text-on-surface-variant">{item.issuer}</td>
                  <td className="p-4 text-sm text-on-surface-variant">
                    {item.issueDate ? new Date(item.issueDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="p-4 text-sm text-on-surface-variant">
                    {item.isVisible ? (
                      <span className="flex items-center gap-1.5 text-primary"><Eye className="w-4 h-4" /> Yes</span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-on-surface-variant/40"><EyeOff className="w-4 h-4" /> No</span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-on-surface-variant">{item.displayOrder}</td>
                  <td className="p-4 flex gap-2 justify-end">
                    <Button variant="ghost" className="p-2 min-h-0" onClick={() => handleEdit(item)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" className="p-2 min-h-0 text-error hover:bg-error/10" onClick={() => handleDelete(item.id, item.name)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-on-surface-variant italic">No qualifications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
