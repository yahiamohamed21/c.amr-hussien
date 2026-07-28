"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/error-parser";
import { Input, Button } from "@/components/ui";
import { useAdminAlert } from "@/hooks/useAdminAlert";
import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

const methodologySectionSchema = z.object({
  eyebrow: z.string().min(1, "Required"),
  title: z.string().min(1, "Required"),
  description: z.string().optional(),
  isVisible: z.boolean(),
});

type MethodologySectionForm = z.infer<typeof methodologySectionSchema>;

export default function MethodologyAdminPage() {
  const queryClient = useQueryClient();
  const { showSuccess, showError, confirmDelete } = useAdminAlert();

  const [steps, setSteps] = useState<any[]>([]);
  const [editingStep, setEditingStep] = useState<any>(null);
  const [isEditingStep, setIsEditingStep] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-methodology"],
    queryFn: async () => {
      const res = await api.get("/api/v1/admin/methodology");
      setSteps(res.data.steps || []);
      return res.data;
    },
  });

  const sectionForm = useForm<MethodologySectionForm>({
    resolver: zodResolver(methodologySectionSchema),
    values: data ? {
      eyebrow: data.eyebrow || "Our System",
      title: data.title || "Methodology",
      description: data.description || "",
      isVisible: data.isVisible ?? true,
    } : {
      eyebrow: "Our System",
      title: "Methodology",
      description: "",
      isVisible: true,
    },
  });

  const sectionMutation = useMutation({
    mutationFn: async (payload: MethodologySectionForm) => {
      const res = await api.put("/api/v1/admin/methodology", payload);
      return res.data;
    },
    onSuccess: () => {
      showSuccess("Methodology section header updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-methodology"] });
    },
    onError: (error) => {
      const msg = handleApiError(error, sectionForm);
      showError(msg);
    },
  });

  const handleSaveSection = (payload: MethodologySectionForm) => {
    sectionMutation.mutate(payload);
  };

  // Steps Handlers
  const handleEditStep = (step: any) => {
    setEditingStep({ ...step });
    setIsEditingStep(true);
  };

  const handleCreateStep = () => {
    setEditingStep({
      name: "",
      description: "",
      displayOrder: steps.length,
      isVisible: true,
    });
    setIsEditingStep(true);
  };

  const handleDeleteStep = async (id: string, name: string) => {
    if (await confirmDelete(name)) {
      try {
        await api.delete(`/api/v1/admin/methodology/steps/${id}`);
        showSuccess("Step deleted successfully.");
        queryClient.invalidateQueries({ queryKey: ["admin-methodology"] });
      } catch (err) {
        showError("Failed to delete step.");
      }
    }
  };

  const handleSaveStep = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStep.id) {
        await api.put(`/api/v1/admin/methodology/steps/${editingStep.id}`, editingStep);
        showSuccess("Step updated successfully.");
      } else {
        await api.post("/api/v1/admin/methodology/steps", editingStep);
        showSuccess("Step created successfully.");
      }
      setIsEditingStep(false);
      queryClient.invalidateQueries({ queryKey: ["admin-methodology"] });
    } catch (err: any) {
      showError("Failed to save step.");
    }
  };

  if (isLoading) {
    return <div className="text-on-surface-variant">Loading Methodology Data...</div>;
  }

  if (isEditingStep) {
    return (
      <div className="p-8 max-w-2xl mx-auto space-y-8">
        <h1 className="text-2xl font-display uppercase text-on-surface">
          {editingStep.id ? 'Edit Step' : 'New Step'}
        </h1>
        <form onSubmit={handleSaveStep} className="bg-surface p-8 rounded-2xl border border-white/5 space-y-6">
          <Input
            label="Step Name"
            value={editingStep.name}
            onChange={(e) => setEditingStep({ ...editingStep, name: e.target.value })}
            required
          />
          <Input
            label="Display Order"
            type="number"
            value={editingStep.displayOrder}
            onChange={(e) => setEditingStep({ ...editingStep, displayOrder: parseInt(e.target.value) || 0 })}
          />
          <div>
            <label className="block text-sm font-label-caps uppercase tracking-widest text-on-surface-variant mb-2">Description</label>
            <textarea 
              value={editingStep.description}
              onChange={(e) => setEditingStep({ ...editingStep, description: e.target.value })}
              className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors min-h-[100px]"
              required
            />
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/10">
            <Button type="button" variant="secondary" onClick={() => setIsEditingStep(false)}>Cancel</Button>
            <Button type="submit">Save Step</Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl uppercase tracking-wider text-on-surface">Methodology</h1>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">Configure your coaching methodology header and process steps.</p>
        </div>
      </div>

      {/* Header Info */}
      <form onSubmit={sectionForm.handleSubmit(handleSaveSection)} className="bg-surface p-8 rounded-2xl border border-white/5 space-y-6">
        <h2 className="font-display text-xl uppercase tracking-widest text-on-surface">Section Header info</h2>
        
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
          <input type="checkbox" id="isVisible" {...sectionForm.register("isVisible")} className="w-5 h-5 accent-primary-container" />
          <label htmlFor="isVisible" className="text-on-surface font-label-caps uppercase tracking-widest text-sm">Visible on Public Site</label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Eyebrow Text" {...sectionForm.register("eyebrow")} error={sectionForm.formState.errors.eyebrow?.message} />
          <Input label="Main Title" {...sectionForm.register("title")} error={sectionForm.formState.errors.title?.message} />
          
          <div className="md:col-span-2">
            <label className="block text-sm font-label-caps uppercase tracking-widest text-on-surface-variant mb-2">Description</label>
            <textarea 
              {...sectionForm.register("description")}
              className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" isLoading={sectionMutation.isPending}>Save Header Changes</Button>
        </div>
      </form>

      {/* Steps List */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="font-display text-2xl uppercase tracking-wider text-on-surface">Methodology Steps</h2>
          <Button onClick={handleCreateStep} className="flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add Step
          </Button>
        </div>

        <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low border-b border-white/5 text-sm font-label-caps uppercase text-on-surface-variant">
              <tr>
                <th className="p-4 w-16">Order</th>
                <th className="p-4">Name</th>
                <th className="p-4">Description</th>
                <th className="p-4 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {steps.map((step) => (
                <tr key={step.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-primary font-bold">{step.displayOrder}</td>
                  <td className="p-4 text-on-surface font-semibold">{step.name}</td>
                  <td className="p-4 text-sm text-on-surface-variant truncate max-w-xs">{step.description}</td>
                  <td className="p-4 flex gap-2 justify-end">
                    <Button variant="ghost" className="p-2 min-h-0" onClick={() => handleEditStep(step)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" className="p-2 min-h-0 text-error hover:bg-error/10" onClick={() => handleDeleteStep(step.id, step.name)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {steps.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-on-surface-variant italic">No methodology steps found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
