"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button, Input } from "@/components/ui";
import { useAdminAlert } from "@/hooks/useAdminAlert";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function ServicesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError, confirmDelete } = useAdminAlert();

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const fetchItems = async () => {
    try {
      const res = await api.get("/api/v1/admin/services");
      setItems(res.data);
    } catch (err) {
      showError("Failed to load services");
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
      description: "",
      learnMoreUrl: "",
      iconId: null, // Note: For Icon, we might not need an image in UI, but the API accepts an iconId
      displayOrder: 0,
      isVisible: true,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (await confirmDelete(name)) {
      try {
        await api.delete(`/api/v1/admin/services/${id}`);
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
      if (formData.id) {
        await api.put(`/api/v1/admin/services/${formData.id}`, formData);
        showSuccess("Updated successfully");
      } else {
        await api.post("/api/v1/admin/services", formData);
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
        <h1 className="text-2xl font-display uppercase mb-8">{formData.id ? 'Edit Service' : 'New Service'}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <Input
            label="Learn More URL"
            value={formData.learnMoreUrl || ""}
            onChange={(e) => setFormData({ ...formData, learnMoreUrl: e.target.value })}
          />

          <ImageUploader
            label="Icon Image (Optional, backend accepts MediaAsset)"
            value={formData.iconId}
            onUpload={(id) => setFormData({ ...formData, iconId: id })}
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
        <h1 className="text-2xl font-display uppercase">Coaching Services</h1>
        <Button onClick={handleCreate}>Add New</Button>
      </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-surface-container-low rounded-lg overflow-hidden border border-white/5">
          <table className="w-full text-left">
            <thead className="bg-surface-container border-b border-white/5 text-sm font-label-caps uppercase text-on-surface-variant">
              <tr>
                <th className="p-4 w-16">Icon</th>
                <th className="p-4">Name</th>
                <th className="p-4">Description</th>
                <th className="p-4 w-24">Visible</th>
                <th className="p-4 w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                  <td className="p-4">
                    {item.iconId ? (
                      <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${item.iconId}`} className="w-10 h-10 object-cover rounded" />
                    ) : (
                      <div className="w-10 h-10 flex justify-center items-center bg-white/10 rounded"><span className="material-symbols-outlined text-sm">fitness_center</span></div>
                    )}
                  </td>
                  <td className="p-4">{item.name}</td>
                  <td className="p-4 truncate max-w-xs">{item.description}</td>
                  <td className="p-4">{item.isVisible ? 'Yes' : 'No'}</td>
                  <td className="p-4 flex gap-2">
                    <Button variant="secondary" className="px-3 py-1 text-sm" onClick={() => handleEdit(item)}>Edit</Button>
                    <Button variant="danger" className="px-3 py-1 text-sm" onClick={() => handleDelete(item.id, item.name)}>Del</Button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant">No services found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
