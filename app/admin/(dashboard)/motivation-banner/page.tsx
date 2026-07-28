"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/error-parser";
import { Input, Button } from "@/components/ui";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { useAdminAlert } from "@/hooks/useAdminAlert";

const motivationBannerSchema = z.object({
  title: z.string().min(1, "Required"),
  highlightedText: z.string().optional(),
  quote: z.string().optional(),
  backgroundImageId: z.string().nullable().optional(),
  isVisible: z.boolean(),
});

type MotivationBannerForm = z.infer<typeof motivationBannerSchema>;

export default function MotivationBannerAdminPage() {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useAdminAlert();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-motivation-banner"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/motivation-banner");
      return res.data;
    },
  });

  const form = useForm<MotivationBannerForm>({
    resolver: zodResolver(motivationBannerSchema),
    values: data || {
      title: "Your Body Should Work For You",
      highlightedText: "",
      quote: "",
      backgroundImageId: null,
      isVisible: true,
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: MotivationBannerForm) => {
      const res = await api.put("/api/v1/admin/motivation-banner", payload);
      return res.data;
    },
    onSuccess: () => {
      showSuccess("Motivation Banner updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-motivation-banner"] });
    },
    onError: (error) => {
      const msg = handleApiError(error, form);
      showError(msg);
    },
  });

  const onSubmit = (payload: MotivationBannerForm) => {
    mutation.mutate(payload);
  };

  if (isLoading) {
    return <div className="text-on-surface-variant">Loading Motivation Banner...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-display text-3xl uppercase tracking-wider text-on-surface">Motivation Banner</h1>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-surface p-8 rounded-2xl border border-white/5 space-y-6">
        
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
          <input type="checkbox" id="isVisible" {...form.register("isVisible")} className="w-5 h-5 accent-primary-container" />
          <label htmlFor="isVisible" className="text-on-surface font-label-caps uppercase tracking-widest text-sm">Visible on Public Site</label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Banner Title" {...form.register("title")} error={form.formState.errors.title?.message} required />
          <Input label="Highlighted Text" {...form.register("highlightedText")} error={form.formState.errors.highlightedText?.message} />
          
          <div className="md:col-span-2">
            <label className="block text-sm font-label-caps uppercase tracking-widest text-on-surface-variant mb-2">Quote Text</label>
            <textarea 
              {...form.register("quote")}
              className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors min-h-[100px]"
            />
            {form.formState.errors.quote && <p className="text-error text-xs mt-2 font-body-md">{form.formState.errors.quote.message}</p>}
          </div>
        </div>

        <h3 className="font-display text-xl uppercase tracking-widest pt-6 border-t border-white/5 text-on-surface">Background Image</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploader
            label="Banner Background Image"
            value={form.watch("backgroundImageId")}
            onUpload={(id) => form.setValue("backgroundImageId", id)}
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-white/5">
          <Button type="submit" isLoading={mutation.isPending}>Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
