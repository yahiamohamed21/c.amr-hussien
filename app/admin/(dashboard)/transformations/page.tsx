"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button, Input } from "@/components/ui";
import { useAdminAlert } from "@/hooks/useAdminAlert";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function TransformationsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError, confirmDelete } = useAdminAlert();

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const fetchItems = async () => {
    try {
      const res = await api.get("/api/v1/admin/transformations");
      setItems(res.data);
    } catch (err) {
      showError("Failed to load transformations");
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
      clientDisplayName: "Client",
      programName: "",
      testimonial: null,
      durationLabel: null,
      beforeImageId: null,
      afterImageId: null,
      coverImageId: null,
      displayOrder: 0,
      isVisible: true,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (await confirmDelete(name)) {
      try {
        await api.delete(`/api/v1/admin/transformations/${id}`);
        showSuccess("Deleted successfully");
        fetchItems();
      } catch (err) {
        showError("Failed to delete");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        clientDisplayName: formData.clientDisplayName || formData.programName || "Client",
      };
      
      if (formData.id) {
        await api.put(`/api/v1/admin/transformations/${formData.id}`, payload);
        showSuccess("Updated successfully");
      } else {
        await api.post("/api/v1/admin/transformations", payload);
        showSuccess("Created successfully");
      }
      setIsEditing(false);
      fetchItems();
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        const msg = Object.values(errors).flat().join("\n");
        showError(msg);
      } else {
        showError("Operation failed");
      }
    }
  };

  if (isEditing) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-display uppercase mb-8">{formData.id ? 'Edit Transformation' : 'New Transformation'}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Program Name"
            value={formData.programName}
            onChange={(e) => setFormData({ ...formData, programName: e.target.value })}
            required
          />

          <ImageUploader
            label="Before Image"
            value={formData.beforeImageId}
            onUpload={(id) => setFormData({ ...formData, beforeImageId: id })}
          />
          <ImageUploader
            label="After Image"
            value={formData.afterImageId}
            onUpload={(id) => setFormData({ ...formData, afterImageId: id })}
          />

          <Input
            label="Display Order"
            type="number"
            value={formData.displayOrder}
            onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isVisible"
              checked={formData.isVisible}
              onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
            />
            <label htmlFor="isVisible">Is Visible</label>
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
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-display uppercase">Transformations</h1>
        <Button onClick={handleCreate}>Add New</Button>
      </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-surface-container-low rounded-lg overflow-hidden border border-white/5">
          <table className="w-full text-left">
            <thead className="bg-surface-container border-b border-white/5 text-sm font-label-caps uppercase text-on-surface-variant">
              <tr>
                <th className="p-4 w-16">Img</th>
                <th className="p-4">Program</th>
                <th className="p-4 w-24">Visible</th>
                <th className="p-4 w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                  <td className="p-4">
                    {item.coverImageId || item.afterImageId ? (
                      <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${item.coverImageId || item.afterImageId}`} className="w-10 h-10 object-cover rounded" />
                    ) : (
                      <div className="w-10 h-10 bg-white/10 rounded"></div>
                    )}
                  </td>
                  <td className="p-4">{item.programName}</td>
                  <td className="p-4">{item.isVisible ? 'Yes' : 'No'}</td>
                  <td className="p-4 flex gap-2">
                    <Button variant="secondary" className="px-3 py-1 text-sm" onClick={() => handleEdit(item)}>Edit</Button>
                    <Button variant="danger" className="px-3 py-1 text-sm" onClick={() => handleDelete(item.id, item.clientDisplayName)}>Del</Button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-on-surface-variant">No transformations found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
