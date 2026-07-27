"use client";

import { useAuthStore } from "@/lib/store/auth";
import { LogOut, Bell, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";

export function Topbar() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <header className="h-20 bg-surface border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-10">
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

      <div className="flex items-center gap-6">
        <button className="text-on-surface-variant hover:text-on-surface transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
        </button>

        <div className="h-8 w-px bg-white/10"></div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-label-caps tracking-widest text-on-surface">Admin</p>
            <p className="text-xs text-on-surface-variant">System Administrator</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center text-on-surface">
            <User className="w-5 h-5" />
          </div>
          
          <button 
            onClick={handleLogout}
            title="Log out"
            className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors ml-2"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
