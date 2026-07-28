"use client";

import { useAuthStore } from "@/lib/store/auth";
import { LogOut, Bell, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";

export function Topbar() {
  return (
    <header className="h-20 bg-surface border-b border-white/5 flex items-center px-8 sticky top-0 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Search across modules..."
            className="w-full bg-surface-container-low border border-white/5 rounded-full pl-10 pr-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary-container transition-colors"
          />
        </div>
      </div>
    </header>
  );
}
