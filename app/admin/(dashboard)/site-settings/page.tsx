"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/error-parser";
import { Input, Button } from "@/components/ui";
import { useState } from "react";

const siteSettingsSchema = z.object({
  brandName: z.string().min(1, "Required"),
  defaultMetaTitle: z.string().optional(),
  defaultMetaDescription: z.string().optional(),
  instagramUrl: z.string().optional(),
  xUrl: z.string().optional(),
  whatsAppNumber: z.string().optional(),
  contactEmail: z.string().optional(),
});

type SiteSettingsForm = z.infer<typeof siteSettingsSchema>;

export default function SiteSettingsAdminPage() {
  const queryClient = useQueryClient();
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-site-settings"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/site-settings");
      return res.data;
    },
  });

  const form = useForm<SiteSettingsForm>({
    resolver: zodResolver(siteSettingsSchema),
    values: data || {
      brandName: "Amr Hussien",
      defaultMetaTitle: "",
      defaultMetaDescription: "",
      instagramUrl: "",
      xUrl: "",
      whatsAppNumber: "",
      contactEmail: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: SiteSettingsForm) => {
      const res = await api.put("/api/v1/admin/site-settings", payload);
      return res.data;
    },
    onSuccess: () => {
      setToastMessage({ type: 'success', text: 'Site settings updated successfully!' });
      queryClient.invalidateQueries({ queryKey: ["admin-site-settings"] });
      setTimeout(() => setToastMessage(null), 3000);
    },
    onError: (error) => {
      const msg = handleApiError(error, form);
      setToastMessage({ type: 'error', text: msg });
    },
  });

  const onSubmit = (payload: SiteSettingsForm) => {
    setToastMessage(null);
    mutation.mutate(payload);
  };

  if (isLoading) {
    return <div className="text-on-surface-variant">Loading Site Settings...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-display text-3xl uppercase tracking-wider text-on-surface">Site Settings</h1>
      </div>

      {toastMessage && (
        <div className={`p-4 rounded-lg font-body-md ${toastMessage.type === 'success' ? 'bg-primary-container/20 text-primary-container border border-primary-container/30' : 'bg-error/20 text-error border border-error/30'}`}>
          {toastMessage.text}
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-surface p-8 rounded-2xl border border-white/5 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Brand Name" {...form.register("brandName")} error={form.formState.errors.brandName?.message} required />
          <Input label="Default Meta Title" {...form.register("defaultMetaTitle")} error={form.formState.errors.defaultMetaTitle?.message} />
          
          <div className="md:col-span-2">
            <label className="block text-sm font-label-caps uppercase tracking-widest text-on-surface-variant mb-2">Default Meta Description</label>
            <textarea 
              {...form.register("defaultMetaDescription")}
              className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors min-h-[80px]"
            />
            {form.formState.errors.defaultMetaDescription && <p className="text-error text-xs mt-2 font-body-md">{form.formState.errors.defaultMetaDescription.message}</p>}
          </div>

          <h3 className="font-display text-xl uppercase tracking-widest pt-6 border-t border-white/5 text-on-surface md:col-span-2">Contact & Social Info</h3>
          <Input label="WhatsApp Number" {...form.register("whatsAppNumber")} error={form.formState.errors.whatsAppNumber?.message} />
          <Input label="Contact Email" {...form.register("contactEmail")} error={form.formState.errors.contactEmail?.message} />
          <Input label="Instagram URL" {...form.register("instagramUrl")} error={form.formState.errors.instagramUrl?.message} />
          <Input label="X (Twitter) URL" {...form.register("xUrl")} error={form.formState.errors.xUrl?.message} />
        </div>

        <div className="flex justify-end pt-4 border-t border-white/5">
          <Button type="submit" isLoading={mutation.isPending}>Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
