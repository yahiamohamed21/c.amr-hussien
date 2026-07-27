"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui";

interface ImageUploaderProps {
  label: string;
  value?: string | null;
  onUpload: (id: string) => void;
}

export function ImageUploader({ label, value, onUpload }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    try {
      // Must use multipart/form-data, our api client uses application/json by default
      const res = await api.post("/api/v1/admin/media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onUpload(res.data.id);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed. Check console.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-label-caps uppercase tracking-widest text-on-surface-variant mb-2">
        {label}
      </label>
      <div className="flex items-center gap-4">
        {value ? (
          <div className="w-24 h-24 rounded overflow-hidden border border-white/10">
            <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${value}`} alt="Uploaded" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-24 h-24 rounded border border-dashed border-white/20 flex items-center justify-center text-on-surface-variant text-xs text-center p-2">
            No Image
          </div>
        )}
        <div>
          <input
            type="file"
            id={`file-upload-${label}`}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            variant="secondary"
            isLoading={isUploading}
            onClick={() => document.getElementById(`file-upload-${label}`)?.click()}
          >
            {value ? "Change Image" : "Upload Image"}
          </Button>
        </div>
      </div>
    </div>
  );
}
