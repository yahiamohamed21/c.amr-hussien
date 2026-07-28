"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button, Input } from "@/components/ui";
import { useAdminAlert } from "@/hooks/useAdminAlert";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";

export default function CoachingGoalsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError, confirmDelete } = useAdminAlert();

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/v1/admin/coaching-goals");
      setItems(res.data);
    } catch (err) {
      showError("Failed to load coaching goals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEdit = (item: any) => {
    setFormData({ ...item });
    setIsEditing(true);
  };

  const handleCreate = () => {
    setFormData({
      name: "",
      displayOrder: items.length,
      isVisible: true,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (await confirmDelete(name)) {
      try {
        await api.delete(`/api/v1/admin/coaching-goals/${id}`);
        showSuccess("Coaching goal deleted successfully.");
        fetchItems();
      } catch (err) {
        showError("Failed to delete coaching goal.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/api/v1/admin/coaching-goals/${formData.id}`, formData);
        showSuccess("Coaching goal updated successfully.");
      } else {
        await api.post("/api/v1/admin/coaching-goals", formData);
        showSuccess("Coaching goal created successfully.");
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
          {formData.id ? 'Edit Coaching Goal' : 'New Coaching Goal'}
        </h1>
        <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-2xl border border-white/5 space-y-6">
          <Input
            label="Goal Name (e.g. Muscle Building, Fat Loss)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Display Order"
            type="number"
            value={formData.displayOrder}
            onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
          />
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
          <h1 className="font-display text-3xl uppercase tracking-wider text-on-surface">Coaching Goals</h1>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">Manage client primary goals list used in application form.</p>
        </div>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add New
        </Button>
      </div>
      
      {loading ? (
        <div className="text-center py-12 text-on-surface-variant">Loading goals...</div>
      ) : (
        <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low border-b border-white/5 text-sm font-label-caps uppercase text-on-surface-variant">
              <tr>
                <th className="p-4">Goal Name</th>
                <th className="p-4 w-24">Visible</th>
                <th className="p-4 w-24">Order</th>
                <th className="p-4 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-on-surface font-semibold">{item.name}</td>
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
                  <td colSpan={5} className="p-12 text-center text-on-surface-variant italic">No goals found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
