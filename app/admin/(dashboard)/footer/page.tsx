"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/error-parser";
import { Input, Button } from "@/components/ui";
import { useAdminAlert } from "@/hooks/useAdminAlert";

const footerSchema = z.object({
  brandName: z.string().min(1, "Required"),
  description: z.string().optional(),
  copyrightText: z.string().optional(),
  closingStatement: z.string().optional(),
  isVisible: z.boolean(),
  instagramUrl: z.string().optional(),
  whatsappNumber: z.string().optional(),
  facebookUrl: z.string().optional(),
  linkedInUrl: z.string().optional(),
});

type FooterForm = z.infer<typeof footerSchema>;

export default function FooterAdminPage() {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useAdminAlert();

  const { data: footerData, isLoading: isFooterLoading } = useQuery({
    queryKey: ["admin-footer"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/footer");
      return res.data;
    },
  });

  const { data: settingsData, isLoading: isSettingsLoading } = useQuery({
    queryKey: ["admin-site-settings"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/site-settings");
      return res.data;
    },
  });

  const form = useForm<FooterForm>({
    resolver: zodResolver(footerSchema),
    values: (footerData && settingsData) ? {
      brandName: footerData.brandName || "",
      description: footerData.description || "",
      copyrightText: footerData.copyrightText || "",
      closingStatement: footerData.closingStatement || "",
      isVisible: footerData.isVisible ?? true,
      instagramUrl: settingsData.instagramUrl || "",
      whatsappNumber: settingsData.whatsAppNumber || settingsData.whatsappNumber || "+966504224831",
      facebookUrl: settingsData.facebookUrl || "",
      linkedInUrl: settingsData.linkedInUrl || "",
    } : {
      brandName: "Amr Hussien",
      description: "",
      copyrightText: "",
      closingStatement: "",
      isVisible: true,
      instagramUrl: "",
      whatsappNumber: "+966504224831",
      facebookUrl: "",
      linkedInUrl: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: FooterForm) => {
      // 1. Update footer content
      await api.put("/api/v1/admin/footer", {
        brandName: payload.brandName,
        description: payload.description,
        copyrightText: payload.copyrightText,
        closingStatement: payload.closingStatement,
        isVisible: payload.isVisible,
      });

      await api.put("/api/v1/admin/site-settings", {
        ...settingsData, // Preserve current email, metadata, etc.
        brandName: settingsData?.brandName || payload.brandName,
        instagramUrl: payload.instagramUrl,
        whatsappNumber: payload.whatsappNumber,
        facebookUrl: payload.facebookUrl,
        linkedInUrl: payload.linkedInUrl,
      });
    },
    onSuccess: () => {
      showSuccess("Footer and Social Links updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-footer"] });
      queryClient.invalidateQueries({ queryKey: ["admin-site-settings"] });
      queryClient.invalidateQueries({ queryKey: ["public-site-settings"] });
    },
    onError: (error) => {
      const msg = handleApiError(error, form);
      showError(msg);
    },
  });

  const onSubmit = (payload: FooterForm) => {
    mutation.mutate(payload);
  };

  if (isFooterLoading || isSettingsLoading) {
    return <div className="text-on-surface-variant">Loading Footer Data...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-display text-3xl uppercase tracking-wider text-on-surface">Footer Content</h1>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-surface p-8 rounded-2xl border border-white/5 space-y-6">
        
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
          <input type="checkbox" id="isVisible" {...form.register("isVisible")} className="w-5 h-5 accent-primary-container" />
          <label htmlFor="isVisible" className="text-on-surface font-label-caps uppercase tracking-widest text-sm">Visible on Public Site</label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Brand Name" {...form.register("brandName")} error={form.formState.errors.brandName?.message} required />
          <Input label="Closing Statement" {...form.register("closingStatement")} error={form.formState.errors.closingStatement?.message} />
          <Input label="Copyright Text" {...form.register("copyrightText")} error={form.formState.errors.copyrightText?.message} />
          
          <div className="md:col-span-2">
            <label className="block text-sm font-label-caps uppercase tracking-widest text-on-surface-variant mb-2">Description</label>
            <textarea 
              {...form.register("description")}
              className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors min-h-[100px]"
            />
            {form.formState.errors.description && <p className="text-error text-xs mt-2 font-body-md">{form.formState.errors.description.message}</p>}
          </div>

          <h3 className="font-display text-xl uppercase tracking-widest pt-6 border-t border-white/5 text-on-surface md:col-span-2">Social Links</h3>
          <Input label="Instagram URL" {...form.register("instagramUrl")} error={form.formState.errors.instagramUrl?.message} />
          <Input label="WhatsApp Number (with country code)" {...form.register("whatsappNumber")} error={form.formState.errors.whatsappNumber?.message} />
          <Input label="Facebook URL" {...form.register("facebookUrl")} error={form.formState.errors.facebookUrl?.message} />
          <Input label="LinkedIn URL" {...form.register("linkedInUrl")} error={form.formState.errors.linkedInUrl?.message} />
        </div>

        <div className="flex justify-end pt-4 border-t border-white/5">
          <Button type="submit" isLoading={mutation.isPending}>Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
