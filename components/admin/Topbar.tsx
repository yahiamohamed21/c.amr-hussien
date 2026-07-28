"use client";

import { Search, Menu } from "lucide-react";

export function Topbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <header className="h-20 bg-surface border-b border-white/5 flex items-center px-4 md:px-8 sticky top-0 z-10 gap-4">
      <button 
        onClick={onToggleSidebar}
        className="p-2 -ml-2 text-on-surface-variant hover:text-on-surface lg:hidden transition-colors"
        title="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

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
