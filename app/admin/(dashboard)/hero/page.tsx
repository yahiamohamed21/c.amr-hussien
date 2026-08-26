"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/error-parser";
import { Input, Button } from "@/components/ui";
import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { ImageUploader } from "@/components/admin/ImageUploader";

const heroSchema = z.object({
  eyebrow: z.string().min(1, "Required"),
  title: z.string().min(1, "Required"),
  highlightedText: z.string().nullable().optional(),
  description: z.string().min(1, "Required"),
  primaryButtonText: z.string().min(1, "Required"),
  primaryButtonUrl: z.string().min(1, "Required"),
  secondaryButtonText: z.string().nullable().optional(),
  secondaryButtonUrl: z.string().nullable().optional(),
  coachCardName: z.string().min(1, "Required"),
  coachCardSubtitle: z.string().min(1, "Required"),
  imageId: z.string().nullable().optional(),
  isVisible: z.boolean(),
});

type HeroForm = z.infer<typeof heroSchema>;

export default function HeroAdminPage() {
  const queryClient = useQueryClient();
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isUploadingCV, setIsUploadingCV] = useState(false);
  const cvFileInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-hero"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/hero");
      return res.data;
    },
  });

  const form = useForm<HeroForm>({
    resolver: zodResolver(heroSchema),
    values: {
      eyebrow: data?.eyebrow === "Evidence-Based Coaching" ? "ELITE PERFORMANCE" : (data?.eyebrow || "ELITE PERFORMANCE"),
      title: data?.title === "Build The Strongest Version Of Yourself" ? "Unlock Your" : (data?.title || "Unlock Your"),
      highlightedText: data?.highlightedText === "Strongest Version" ? "Elite Potential" : (data?.highlightedText || "Elite Potential"),
      description: data?.description?.startsWith("Move better") ? "Precision coaching, biomechanics, and data-driven performance for athletes who demand more from their bodies." : (data?.description || "Precision coaching, biomechanics, and data-driven performance for athletes who demand more from their bodies."),
      primaryButtonText: data?.primaryButtonText || "Download My CV",
      primaryButtonUrl: data?.primaryButtonUrl || "/Amr%20Hussien%20CV.docx",
      secondaryButtonText: data?.secondaryButtonText || "",
      secondaryButtonUrl: data?.secondaryButtonUrl || "",
      coachCardName: data?.coachCardName === "AMR HUSSIEN" ? "6X TOP TRAINER · 10+ YEARS EXPERIENCE" : (data?.coachCardName || "6X TOP TRAINER · 10+ YEARS EXPERIENCE"),
      coachCardSubtitle: "-",
      imageId: data?.imageId || null,
      isVisible: data?.isVisible ?? true,
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: HeroForm) => {
      const res = await api.put("/api/v1/admin/hero", payload);
      return res.data;
    },
    onSuccess: () => {
      setToastMessage({ type: 'success', text: 'Hero section updated successfully!' });
      queryClient.invalidateQueries({ queryKey: ["admin-hero"] });
      setTimeout(() => setToastMessage(null), 3000);
    },
    onError: (error) => {
      const msg = handleApiError(error, form);
      setToastMessage({ type: 'error', text: msg });
    },
  });

  const onSubmit = (payload: HeroForm) => {
    setToastMessage(null);
    mutation.mutate(payload);
  };

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setIsUploadingCV(true);
    try {
      const res = await api.post("/api/v1/admin/media", formData);
      const url = `/api/v1/public/media/${res.data.id}`;
      form.setValue("primaryButtonUrl", url, { shouldValidate: true, shouldDirty: true });
      setToastMessage({ type: 'success', text: 'CV uploaded successfully! Save changes to apply.' });
    } catch (err) {
      console.error("CV Upload failed", err);
      setToastMessage({ type: 'error', text: 'CV Upload failed. Make sure the file is valid.' });
    } finally {
      setIsUploadingCV(false);
      if (cvFileInputRef.current) {
        cvFileInputRef.current.value = "";
      }
    }
  };

  if (isLoading) {
    return <div className="text-on-surface-variant">Loading Hero Data...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-display text-3xl uppercase tracking-wider text-on-surface">Hero Section</h1>
      </div>

      {toastMessage && (
        <div className={`p-4 rounded-lg font-body-md ${toastMessage.type === 'success' ? 'bg-primary-container/20 text-primary-container border border-primary-container/30' : 'bg-error/20 text-error border border-error/30'}`}>
          {toastMessage.text}
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-surface p-8 rounded-2xl border border-white/5 space-y-6">
        
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
          <input type="checkbox" id="isVisible" {...form.register("isVisible")} className="w-5 h-5 accent-primary-container" />
          <label htmlFor="isVisible" className="text-on-surface font-label-caps uppercase tracking-widest text-sm">Visible on Public Site</label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Eyebrow Text" {...form.register("eyebrow")} error={form.formState.errors.eyebrow?.message} />
          <Input label="Main Title" {...form.register("title")} error={form.formState.errors.title?.message} />
          <Input label="Highlighted Text" {...form.register("highlightedText")} error={form.formState.errors.highlightedText?.message} />
          <div className="md:col-span-2">
            <label className="block text-sm font-label-caps uppercase tracking-widest text-on-surface-variant mb-2">Description</label>
            <textarea 
              {...form.register("description")}
              className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors min-h-[120px]"
            />
            {form.formState.errors.description && <p className="text-error text-xs mt-2 font-body-md">{form.formState.errors.description.message}</p>}
          </div>
        </div>

        <h3 className="font-display text-xl uppercase tracking-widest pt-6 border-t border-white/5 text-on-surface">CV Button</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="CV Button Text" {...form.register("primaryButtonText")} error={form.formState.errors.primaryButtonText?.message} />
          
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Input label="CV File URL (e.g. /cv.pdf)" {...form.register("primaryButtonUrl")} error={form.formState.errors.primaryButtonUrl?.message} />
            </div>
            <div className="pb-[22px] flex-shrink-0">
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                ref={cvFileInputRef}
                onChange={handleCVUpload}
              />
              <Button 
                type="button" 
                variant="secondary" 
                className="h-[42px] px-4 flex items-center gap-2"
                onClick={() => cvFileInputRef.current?.click()}
                isLoading={isUploadingCV}
              >
                {!isUploadingCV && <Upload className="w-4 h-4" />}
                Upload
              </Button>
            </div>
          </div>
        </div>

        <h3 className="font-display text-xl uppercase tracking-widest pt-6 border-t border-white/5 text-on-surface">Experience & Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input label="Experience Text (e.g. 6X TOP TRAINER...)" {...form.register("coachCardName")} error={form.formState.errors.coachCardName?.message} />
          </div>
          <input type="hidden" {...form.register("coachCardSubtitle")} value="-" />
        </div>
        
        <div className="pt-6 border-t border-white/5">
          <ImageUploader
            label="Hero Image"
            value={form.watch("imageId")}
            onUpload={(id) => form.setValue("imageId", id, { shouldValidate: true, shouldDirty: true })}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" isLoading={mutation.isPending}>Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
