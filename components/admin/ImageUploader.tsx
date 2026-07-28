"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui";
import { Upload, FolderOpen, X } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  value?: string | null;
  onUpload: (id: string) => void;
}

export function ImageUploader({ label, value, onUpload }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [libraryImages, setLibraryImages] = useState<any[]>([]);
  const [loadingLibrary, setLoadingLibrary] = useState(false);

  // Fetch media library when opening selector
  const openLibrary = async () => {
    setIsLibraryOpen(true);
    setLoadingLibrary(true);
    try {
      const res = await api.get("/api/v1/admin/media");
      setLibraryImages(res.data);
    } catch (err) {
      console.error("Failed to load media library", err);
    } finally {
      setLoadingLibrary(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    try {
      const res = await api.post("/api/v1/admin/media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onUpload(res.data.id);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed. Make sure it's a valid image (JPEG/PNG/WebP).");
    } finally {
      setIsUploading(false);
    }
  };

  const selectFromLibrary = (id: string) => {
    onUpload(id);
    setIsLibraryOpen(false);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-label-caps uppercase tracking-widest text-on-surface-variant mb-2">
        {label}
      </label>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-surface-container-low p-4 rounded-xl border border-white/5">
        {value ? (
          <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
            <img 
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${value}`} 
              alt="Selected" 
              className="w-full h-full object-cover" 
            />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-lg border border-dashed border-white/20 flex items-center justify-center text-on-surface-variant/40 text-xs text-center p-2 flex-shrink-0">
            No Image
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {/* Option 1: File Upload */}
          <input
            type="file"
            id={`file-upload-${label}`}
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            variant="secondary"
            isLoading={isUploading}
            onClick={() => document.getElementById(`file-upload-${label}`)?.click()}
            className="flex items-center gap-2 text-xs py-2.5 px-4"
          >
            <Upload className="w-4 h-4" />
            Upload File
          </Button>

          {/* Option 2: Media Library */}
          <Button
            type="button"
            variant="secondary"
            onClick={openLibrary}
            className="flex items-center gap-2 text-xs py-2.5 px-4"
          >
            <FolderOpen className="w-4 h-4" />
            Choose from Library
          </Button>
        </div>
      </div>

      {/* Media Library Selector Modal */}
      {isLibraryOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-surface-container max-w-4xl w-full rounded-2xl border border-white/10 shadow-2xl overflow-hidden relative flex flex-col max-h-[85vh]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-display uppercase tracking-widest text-on-surface">Select Image</h3>
                <p className="text-xs text-on-surface-variant mt-1 font-body-md">Choose an existing image from your media library.</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsLibraryOpen(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {loadingLibrary ? (
                <div className="text-center py-12 text-on-surface-variant font-body-md">Loading media assets...</div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {libraryImages.map((img) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => selectFromLibrary(img.id)}
                      className={`relative aspect-square rounded-xl overflow-hidden border bg-black/40 hover:scale-[1.03] transition-all group flex items-center justify-center ${
                        value === img.id ? "border-primary shadow-[0_0_10px_rgba(184,211,0,0.3)]" : "border-white/5"
                      }`}
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${img.id}`}
                        alt={img.alternativeText || img.originalFileName}
                        className="w-full h-full object-cover"
                      />
                      {value === img.id && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <span className="bg-primary text-black font-bold rounded-full p-1 text-xs">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                  {libraryImages.length === 0 && (
                    <div className="col-span-full py-12 text-center text-on-surface-variant italic font-body-md">
                      Your Media Library is empty. Upload a file from your device first.
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-white/5 flex justify-end">
              <Button type="button" variant="secondary" onClick={() => setIsLibraryOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
