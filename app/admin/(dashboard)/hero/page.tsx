"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/error-parser";
import { Input, Button } from "@/components/ui";
import { useState } from "react";

const heroSchema = z.object({
  eyebrow: z.string().min(1, "Required"),
  title: z.string().min(1, "Required"),
  highlightedText: z.string().optional(),
  description: z.string().min(1, "Required"),
  primaryButtonText: z.string().min(1, "Required"),
  primaryButtonUrl: z.string().min(1, "Required"),
  secondaryButtonText: z.string().optional(),
  secondaryButtonUrl: z.string().optional(),
  coachCardName: z.string().min(1, "Required"),
  coachCardSubtitle: z.string().min(1, "Required"),
  imageId: z.string().nullable().optional(),
  isVisible: z.boolean(),
});

type HeroForm = z.infer<typeof heroSchema>;

export default function HeroAdminPage() {
  const queryClient = useQueryClient();
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-hero"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/hero");
      return res.data;
    },
  });

  const form = useForm<HeroForm>({
    resolver: zodResolver(heroSchema),
    values: data || {
      eyebrow: "",
      title: "",
      highlightedText: "",
      description: "",
      primaryButtonText: "",
      primaryButtonUrl: "",
      secondaryButtonText: "",
      secondaryButtonUrl: "",
      coachCardName: "",
      coachCardSubtitle: "",
      imageId: null,
      isVisible: true,
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

        <h3 className="font-display text-xl uppercase tracking-widest pt-6 border-t border-white/5 text-on-surface">Buttons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Primary Button Text" {...form.register("primaryButtonText")} error={form.formState.errors.primaryButtonText?.message} />
          <Input label="Primary Button URL" {...form.register("primaryButtonUrl")} error={form.formState.errors.primaryButtonUrl?.message} />
          <Input label="Secondary Button Text" {...form.register("secondaryButtonText")} error={form.formState.errors.secondaryButtonText?.message} />
          <Input label="Secondary Button URL" {...form.register("secondaryButtonUrl")} error={form.formState.errors.secondaryButtonUrl?.message} />
        </div>

        <h3 className="font-display text-xl uppercase tracking-widest pt-6 border-t border-white/5 text-on-surface">Coach ID Card</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Card Name" {...form.register("coachCardName")} error={form.formState.errors.coachCardName?.message} />
          <Input label="Card Subtitle" {...form.register("coachCardSubtitle")} error={form.formState.errors.coachCardSubtitle?.message} />
        </div>
        
        {/* Placeholder for Media Library Picker */}
        <div className="pt-6 border-t border-white/5">
           <p className="text-on-surface-variant text-sm font-body-md italic mb-4">Note: Image selection will be connected once the Media Library module is built.</p>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" isLoading={mutation.isPending}>Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
