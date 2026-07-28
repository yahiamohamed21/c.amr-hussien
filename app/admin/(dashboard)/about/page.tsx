"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/error-parser";
import { Input, Button } from "@/components/ui";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { useState } from "react";

const aboutSchema = z.object({
  eyebrow: z.string().min(1, "Required"),
  title: z.string().min(1, "Required"),
  body: z.string().min(1, "Required"),
  watermarkText: z.string().optional(),
  imageId: z.string().nullable().optional(),
  isVisible: z.boolean(),
});

type AboutForm = z.infer<typeof aboutSchema>;

export default function AboutAdminPage() {
  const queryClient = useQueryClient();
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-about"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/about");
      return res.data;
    },
  });

  const form = useForm<AboutForm>({
    resolver: zodResolver(aboutSchema),
    values: data || {
      eyebrow: "About The Coach",
      title: "More Than Fitness",
      body: "",
      watermarkText: "PERFORMANCE",
      imageId: null,
      isVisible: true,
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: AboutForm) => {
      const res = await api.put("/api/v1/admin/about", payload);
      return res.data;
    },
    onSuccess: () => {
      setToastMessage({ type: 'success', text: 'About section updated successfully!' });
      queryClient.invalidateQueries({ queryKey: ["admin-about"] });
      setTimeout(() => setToastMessage(null), 3000);
    },
    onError: (error) => {
      const msg = handleApiError(error, form);
      setToastMessage({ type: 'error', text: msg });
    },
  });

  const onSubmit = (payload: AboutForm) => {
    setToastMessage(null);
    mutation.mutate(payload);
  };

  if (isLoading) {
    return <div className="text-on-surface-variant">Loading About Data...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-display text-3xl uppercase tracking-wider text-on-surface">About Section</h1>
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
          <Input label="Watermark Text" {...form.register("watermarkText")} error={form.formState.errors.watermarkText?.message} />
          
          <div className="md:col-span-2">
            <label className="block text-sm font-label-caps uppercase tracking-widest text-on-surface-variant mb-2">Body Text</label>
            <textarea 
              {...form.register("body")}
              className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors min-h-[150px]"
            />
            {form.formState.errors.body && <p className="text-error text-xs mt-2 font-body-md">{form.formState.errors.body.message}</p>}
          </div>
        </div>

        <h3 className="font-display text-xl uppercase tracking-widest pt-6 border-t border-white/5 text-on-surface">Image</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploader
            label="Section Image"
            value={form.watch("imageId")}
            onUpload={(id) => form.setValue("imageId", id)}
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-white/5">
          <Button type="submit" isLoading={mutation.isPending}>Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
