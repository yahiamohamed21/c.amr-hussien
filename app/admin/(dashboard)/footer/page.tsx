"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/error-parser";
import { Input, Button } from "@/components/ui";
import { useState } from "react";

const footerSchema = z.object({
  brandName: z.string().min(1, "Required"),
  description: z.string().optional(),
  copyrightText: z.string().optional(),
  closingStatement: z.string().optional(),
  isVisible: z.boolean(),
});

type FooterForm = z.infer<typeof footerSchema>;

export default function FooterAdminPage() {
  const queryClient = useQueryClient();
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-footer"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/footer");
      return res.data; // Note: Returns object containing links list too, but we just bind content to form
    },
  });

  const form = useForm<FooterForm>({
    resolver: zodResolver(footerSchema),
    values: data || {
      brandName: "Amr Hussien",
      description: "",
      copyrightText: "",
      closingStatement: "",
      isVisible: true,
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: FooterForm) => {
      const res = await api.put("/api/v1/admin/footer", payload);
      return res.data;
    },
    onSuccess: () => {
      setToastMessage({ type: 'success', text: 'Footer updated successfully!' });
      queryClient.invalidateQueries({ queryKey: ["admin-footer"] });
      setTimeout(() => setToastMessage(null), 3000);
    },
    onError: (error) => {
      const msg = handleApiError(error, form);
      setToastMessage({ type: 'error', text: msg });
    },
  });

  const onSubmit = (payload: FooterForm) => {
    setToastMessage(null);
    mutation.mutate(payload);
  };

  if (isLoading) {
    return <div className="text-on-surface-variant">Loading Footer Data...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-display text-3xl uppercase tracking-wider text-on-surface">Footer Content</h1>
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
        </div>

        <div className="flex justify-end pt-4 border-t border-white/5">
          <Button type="submit" isLoading={mutation.isPending}>Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
