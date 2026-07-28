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

const injuryRehabSchema = z.object({
  eyebrow: z.string().min(1, "Required"),
  title: z.string().min(1, "Required"),
  body: z.string().min(1, "Required"),
  bodySecondary: z.string().optional(),
  image1Id: z.string().nullable().optional(),
  image2Id: z.string().nullable().optional(),
  isVisible: z.boolean(),
});

type InjuryRehabForm = z.infer<typeof injuryRehabSchema>;

export default function InjuryRehabAdminPage() {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useAdminAlert();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-injury-rehab"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/injury-rehab");
      return res.data;
    },
  });

  const form = useForm<InjuryRehabForm>({
    resolver: zodResolver(injuryRehabSchema),
    values: data || {
      eyebrow: "Injury Rehabilitation Specialist",
      title: "REBUILD WITHOUT LIMITS",
      body: "",
      bodySecondary: "",
      image1Id: null,
      image2Id: null,
      isVisible: true,
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: InjuryRehabForm) => {
      const res = await api.put("/api/v1/admin/injury-rehab", payload);
      return res.data;
    },
    onSuccess: () => {
      showSuccess("Injury Rehab section updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-injury-rehab"] });
    },
    onError: (error) => {
      const msg = handleApiError(error, form);
      showError(msg);
    },
  });

  const onSubmit = (payload: InjuryRehabForm) => {
    mutation.mutate(payload);
  };

  if (isLoading) {
    return <div className="text-on-surface-variant">Loading Injury Rehab Data...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-display text-3xl uppercase tracking-wider text-on-surface">Injury Rehab Section</h1>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-surface p-8 rounded-2xl border border-white/5 space-y-6">
        
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
          <input type="checkbox" id="isVisible" {...form.register("isVisible")} className="w-5 h-5 accent-primary-container" />
          <label htmlFor="isVisible" className="text-on-surface font-label-caps uppercase tracking-widest text-sm">Visible on Public Site</label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Eyebrow Text" {...form.register("eyebrow")} error={form.formState.errors.eyebrow?.message} />
          <Input label="Main Title" {...form.register("title")} error={form.formState.errors.title?.message} />
          
          <div className="md:col-span-2">
            <label className="block text-sm font-label-caps uppercase tracking-widest text-on-surface-variant mb-2">Primary Body Copy</label>
            <textarea 
              {...form.register("body")}
              className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors min-h-[100px]"
            />
            {form.formState.errors.body && <p className="text-error text-xs mt-2 font-body-md">{form.formState.errors.body.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-label-caps uppercase tracking-widest text-on-surface-variant mb-2">Secondary Body Copy (Optional)</label>
            <textarea 
              {...form.register("bodySecondary")}
              className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors min-h-[100px]"
            />
            {form.formState.errors.bodySecondary && <p className="text-error text-xs mt-2 font-body-md">{form.formState.errors.bodySecondary.message}</p>}
          </div>
        </div>

        <h3 className="font-display text-xl uppercase tracking-widest pt-6 border-t border-white/5 text-on-surface">Images</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploader
            label="Left Image (Image 1)"
            value={form.watch("image1Id")}
            onUpload={(id) => form.setValue("image1Id", id)}
          />
          <ImageUploader
            label="Right Image (Image 2)"
            value={form.watch("image2Id")}
            onUpload={(id) => form.setValue("image2Id", id)}
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-white/5">
          <Button type="submit" isLoading={mutation.isPending}>Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
