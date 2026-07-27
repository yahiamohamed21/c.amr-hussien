"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button, Input } from "@/components/ui";
import { useAdminAlert } from "@/hooks/useAdminAlert";
import { ImageUploader } from "@/components/admin/ImageUploader";

export default function AccreditationsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError, confirmDelete } = useAdminAlert();

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const fetchItems = async () => {
    try {
      const res = await api.get("/api/v1/admin/accreditations");
      setItems(res.data);
    } catch (err) {
      showError("Failed to load accreditations");
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
      issuer: "",
      issuedOn: "",
      expiresOn: "",
      verificationUrl: "",
      imageId: "",
      displayOrder: 0,
      isVisible: true,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (await confirmDelete(name)) {
      try {
        await api.delete(`/api/v1/admin/accreditations/${id}`);
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
      // API expects DateOnly which is yyyy-MM-dd format string
      // Just ensure we don't send empty string for DateOnly
      const dataToSend = { ...formData };
      if (!dataToSend.issuedOn) dataToSend.issuedOn = null;
      if (!dataToSend.expiresOn) dataToSend.expiresOn = null;
      
      if (formData.id) {
        await api.put(`/api/v1/admin/accreditations/${formData.id}`, dataToSend);
        showSuccess("Updated successfully");
      } else {
        await api.post("/api/v1/admin/accreditations", dataToSend);
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
        <h1 className="text-2xl font-display uppercase mb-8">{formData.id ? 'Edit Accreditation' : 'New Accreditation'}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Issuer"
            value={formData.issuer}
            onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            required
          />
          <Input
            label="Issued On (YYYY-MM-DD)"
            type="date"
            value={formData.issuedOn || ""}
            onChange={(e) => setFormData({ ...formData, issuedOn: e.target.value })}
          />
          <Input
            label="Expires On (YYYY-MM-DD)"
            type="date"
            value={formData.expiresOn || ""}
            onChange={(e) => setFormData({ ...formData, expiresOn: e.target.value })}
          />
          <Input
            label="Verification URL"
            value={formData.verificationUrl || ""}
            onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
          />

          <ImageUploader
            label="Certificate Image"
            value={formData.imageId}
            onUpload={(id) => setFormData({ ...formData, imageId: id })}
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
        <h1 className="text-2xl font-display uppercase">Accreditations</h1>
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
                <th className="p-4">Name</th>
                <th className="p-4">Issuer</th>
                <th className="p-4 w-24">Visible</th>
                <th className="p-4 w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                  <td className="p-4">
                    {item.imageId ? (
                      <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${item.imageId}`} className="w-10 h-10 object-cover rounded" />
                    ) : (
                      <div className="w-10 h-10 bg-white/10 rounded"></div>
                    )}
                  </td>
                  <td className="p-4">{item.name}</td>
                  <td className="p-4">{item.issuer}</td>
                  <td className="p-4">{item.isVisible ? 'Yes' : 'No'}</td>
                  <td className="p-4 flex gap-2">
                    <Button variant="secondary" className="px-3 py-1 text-sm" onClick={() => handleEdit(item)}>Edit</Button>
                    <Button variant="danger" className="px-3 py-1 text-sm" onClick={() => handleDelete(item.id, item.name)}>Del</Button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant">No accreditations found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
