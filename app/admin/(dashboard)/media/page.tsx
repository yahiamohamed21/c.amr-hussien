"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Button, Input } from "@/components/ui";
import { useAdminAlert } from "@/hooks/useAdminAlert";
import { Upload, Trash2, Copy, FileImage } from "lucide-react";

export default function MediaLibraryPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [alternativeText, setAlternativeText] = useState("");
  const { showSuccess, showError, confirmDelete } = useAdminAlert();

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/v1/admin/media");
      setAssets(res.data);
    } catch (err) {
      showError("Failed to load media library.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (alternativeText.trim()) {
        formData.append("alternativeText", alternativeText.trim());
      }

      await api.post("/api/v1/admin/media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      showSuccess("Image uploaded successfully!");
      setAlternativeText("");
      fetchAssets();
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        const msg = Object.values(errors).flat().join("\n");
        showError(msg);
      } else {
        showError("Upload failed. Only JPEG, PNG, and WebP are allowed.");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (await confirmDelete(name)) {
      try {
        await api.delete(`/api/v1/admin/media/${id}`);
        showSuccess("Media asset deleted.");
        fetchAssets();
      } catch (err: any) {
        if (err.response?.status === 409) {
          showError("This file is currently used in other website sections and cannot be deleted.");
        } else {
          showError("Failed to delete media asset.");
        }
      }
    }
  };

  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(id);
    showSuccess("Image ID copied to clipboard!");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl uppercase tracking-wider text-on-surface">Media Library</h1>
        <p className="text-on-surface-variant font-body-md text-sm mt-1">Upload and manage images. Copy IDs to use them in other modules.</p>
      </div>

      {/* Upload Box */}
      <div className="bg-surface p-8 rounded-2xl border border-white/5 space-y-6">
        <h2 className="font-display text-xl uppercase tracking-widest text-on-surface">Upload Image</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <Input 
            label="Alternative Text (optional)"
            value={alternativeText}
            onChange={(e) => setAlternativeText(e.target.value)}
            placeholder="e.g. Amr Hussien rehab photo"
          />
          <div className="relative">
            <input
              type="file"
              id="file-upload"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
            <label
              htmlFor="file-upload"
              className={`flex items-center justify-center gap-2 font-label-caps tracking-widest uppercase py-3 px-6 rounded-lg transition-all cursor-pointer bg-primary-container text-on-primary-fixed hover:opacity-90 w-full text-center ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Upload className="w-5 h-5" />
              {uploading ? "Uploading..." : "Choose File & Upload"}
            </label>
          </div>
        </div>
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="text-center py-12 text-on-surface-variant">Loading media...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {assets.map((asset) => (
            <div key={asset.id} className="bg-surface rounded-2xl border border-white/5 overflow-hidden group shadow-lg flex flex-col justify-between">
              <div className="aspect-square relative overflow-hidden bg-black/40 flex items-center justify-center">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${asset.id}`}
                  alt={asset.alternativeText || asset.originalFileName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to placeholder icon
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const icon = document.createElement('div');
                      icon.className = "flex flex-col items-center justify-center text-on-surface-variant/40";
                      icon.innerHTML = `<span class="material-symbols-outlined text-4xl">image</span>`;
                      parent.appendChild(icon);
                    }
                  }}
                />
              </div>
              <div className="p-4 space-y-3">
                <p className="text-xs text-on-surface font-semibold truncate" title={asset.originalFileName}>
                  {asset.originalFileName}
                </p>
                <div className="flex gap-1">
                  <Button 
                    variant="secondary" 
                    className="flex-1 py-1.5 px-0 text-[10px] min-h-0 flex items-center justify-center gap-1.5"
                    onClick={() => copyToClipboard(asset.id)}
                  >
                    <Copy className="w-3 h-3" /> ID
                  </Button>
                  <Button 
                    variant="danger" 
                    className="py-1.5 px-3 min-h-0 flex items-center justify-center"
                    onClick={() => handleDelete(asset.id, asset.originalFileName)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {assets.length === 0 && (
            <div className="col-span-full py-16 text-center text-on-surface-variant italic">
              No images uploaded yet. Upload your first image above.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
