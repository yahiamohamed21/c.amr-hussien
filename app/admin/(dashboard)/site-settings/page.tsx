"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/error-parser";
import { Input, Button } from "@/components/ui";
import { useAdminAlert } from "@/hooks/useAdminAlert";

const siteSettingsSchema = z.object({
  brandName: z.string().min(1, "Required"),
  defaultMetaTitle: z.string().optional(),
  defaultMetaDescription: z.string().optional(),
  instagramUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  linkedInUrl: z.string().optional(),
  whatsAppNumber: z.string().optional(),
  contactEmail: z.string().optional(),
  isAcceptingApplications: z.boolean(),
});

type SiteSettingsForm = z.infer<typeof siteSettingsSchema>;

export default function SiteSettingsAdminPage() {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useAdminAlert();

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
      facebookUrl: "",
      linkedInUrl: "",
      whatsAppNumber: "",
      contactEmail: "",
      isAcceptingApplications: true,
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: SiteSettingsForm) => {
      const res = await api.put("/api/v1/admin/site-settings", payload);
      return res.data;
    },
    onSuccess: () => {
      showSuccess("Site settings updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-site-settings"] });
      queryClient.invalidateQueries({ queryKey: ["public-site-settings"] });
    },
    onError: (error) => {
      const msg = handleApiError(error, form);
      showError(msg);
    },
  });

  const onSubmit = (payload: SiteSettingsForm) => {
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

      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-surface p-8 rounded-2xl border border-white/5 space-y-6">
        
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
          <input 
            type="checkbox" 
            id="isAcceptingApplications" 
            {...form.register("isAcceptingApplications")} 
            className="w-5 h-5 accent-primary-container" 
          />
          <label htmlFor="isAcceptingApplications" className="text-on-surface font-label-caps uppercase tracking-widest text-sm select-none">
            Accept Coaching Applications / Messages
          </label>
        </div>

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
          <Input label="Facebook URL" {...form.register("facebookUrl")} error={form.formState.errors.facebookUrl?.message} />
          <Input label="LinkedIn URL" {...form.register("linkedInUrl")} error={form.formState.errors.linkedInUrl?.message} />
        </div>

        <div className="flex justify-end pt-4 border-t border-white/5">
          <Button type="submit" isLoading={mutation.isPending}>Save Changes</Button>
        </div>
      </form>
      
      <AdminCredentialsSection />
    </div>
  );
}

const adminCredentialsSchema = z.object({
  currentPassword: z.string().min(1, "Required"),
  newEmail: z.string().email("Invalid email").min(1, "Required"),
  newPassword: z.string().min(6, "Must be at least 6 characters"),
});

type AdminCredentialsForm = z.infer<typeof adminCredentialsSchema>;

function AdminCredentialsSection() {
  const { showSuccess, showError } = useAdminAlert();
  const form = useForm<AdminCredentialsForm>({
    resolver: zodResolver(adminCredentialsSchema),
    defaultValues: { currentPassword: "", newEmail: "", newPassword: "" }
  });

  const mutation = useMutation({
    mutationFn: async (payload: AdminCredentialsForm) => {
      const res = await api.put("/api/v1/admin/auth/credentials", payload);
      return res.data;
    },
    onSuccess: () => {
      showSuccess("Credentials updated successfully!");
      form.reset();
    },
    onError: (error) => {
      const msg = handleApiError(error, form);
      showError(msg);
    },
  });

  return (
    <form onSubmit={form.handleSubmit((d) => mutation.mutate(d))} className="bg-surface p-8 rounded-2xl border border-white/5 space-y-6 mt-8">
      <h3 className="font-display text-xl uppercase tracking-widest text-on-surface mb-6 border-b border-white/5 pb-4">Security Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Current Password" type="password" {...form.register("currentPassword")} error={form.formState.errors.currentPassword?.message} required />
        <Input label="New Email" type="email" {...form.register("newEmail")} error={form.formState.errors.newEmail?.message} required />
        <Input label="New Password" type="password" {...form.register("newPassword")} error={form.formState.errors.newPassword?.message} required />
      </div>
      <div className="flex justify-end pt-4 border-t border-white/5">
        <Button type="submit" isLoading={mutation.isPending}>Update Credentials</Button>
      </div>
    </form>
  );
}
