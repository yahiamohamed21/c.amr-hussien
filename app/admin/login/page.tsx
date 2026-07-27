"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { handleApiError } from "@/lib/error-parser";
import { useAuthStore } from "@/lib/store/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthGuard } from "@/components/admin/AuthGuard";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setTokens = useAuthStore((state) => state.setTokens);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const res = await api.post("/api/v1/admin/auth/login", data);
      return res.data;
    },
    onSuccess: (data) => {
      setTokens(data);
      router.push("/admin");
    },
    onError: (error) => {
      const msg = handleApiError(error, form);
      setErrorMessage(msg);
    },
  });

  const onSubmit = (data: LoginForm) => {
    setErrorMessage(null);
    loginMutation.mutate(data);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md bg-surface p-8 rounded-2xl shadow-2xl border border-white/5">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary-container text-on-primary-fixed flex items-center justify-center font-display text-2xl font-bold rounded-lg mx-auto mb-4">A</div>
            <h1 className="font-display text-3xl uppercase tracking-wider text-on-surface">Admin Access</h1>
            <p className="text-on-surface-variant font-body-md mt-2">Enter your credentials to continue</p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-label-caps uppercase tracking-widest text-on-surface-variant mb-2">Email Address</label>
              <input
                {...form.register("email")}
                type="email"
                className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors"
                placeholder="admin@example.com"
              />
              {form.formState.errors.email && (
                <p className="text-error text-xs mt-2 font-body-md">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-label-caps uppercase tracking-widest text-on-surface-variant mb-2">Password</label>
              <input
                {...form.register("password")}
                type="password"
                className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary-container transition-colors"
                placeholder="••••••••"
              />
              {form.formState.errors.password && (
                <p className="text-error text-xs mt-2 font-body-md">{form.formState.errors.password.message}</p>
              )}
            </div>

            {errorMessage && (
              <div className="bg-error/10 border border-error/20 rounded-lg p-3 text-error text-sm font-body-md text-center">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-primary-container text-on-primary-fixed font-label-caps tracking-widest uppercase py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {loginMutation.isPending ? (
                <div className="w-5 h-5 border-2 border-on-primary-fixed border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Authenticate"
              )}
            </button>
          </form>
        </div>
      </div>
    </AuthGuard>
  );
}
