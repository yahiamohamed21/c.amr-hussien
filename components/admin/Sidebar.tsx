"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, Map, Image as ImageIcon, BarChart3, 
  Info, Briefcase, GraduationCap, Quote, Images, 
  Award, Target, MessageSquare, Settings, LayoutTemplate, Link as LinkIcon,
  Activity, LogOut
} from "lucide-react";
import clsx from "clsx";
import { useAuthStore } from "@/lib/store/auth";

const navItems = [
  // Core Dashboard
  
  // Sections in order of the public site
  { name: "Hero Section", href: "/admin/hero", icon: LayoutTemplate },
  { name: "Coaching Goals", href: "/admin/coaching-goals", icon: Target },
  { name: "About", href: "/admin/about", icon: Info },
  { name: "Injury Rehab", href: "/admin/injury-rehab", icon: Activity },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Methodology", href: "/admin/methodology", icon: GraduationCap },
  { name: "Transformations", href: "/admin/transformations", icon: Images },
  { name: "Qualifications", href: "/admin/qualifications", icon: GraduationCap },
  
  // Management & Settings
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Media Library", href: "/admin/media", icon: ImageIcon },
  { name: "Footer", href: "/admin/footer", icon: LinkIcon },
  { name: "Site Settings", href: "/admin/site-settings", icon: Settings },
];

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile Sidebar Overlay Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99] lg:hidden"
          onClick={onClose}
        />
      )}

      <div 
        className={clsx(
          "w-64 flex-shrink-0 bg-surface border-r border-white/5 h-screen overflow-y-auto flex flex-col justify-between fixed inset-y-0 left-0 z-[100] transition-transform duration-300 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-6 bg-surface z-10 border-b border-white/5">
            <Link href="/admin" onClick={onClose} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-container text-on-primary-fixed flex items-center justify-center font-display text-lg font-bold rounded">A</div>
              <span className="font-label-caps uppercase tracking-widest text-on-surface text-sm">Workspace</span>
            </Link>
          </div>

          <nav className="flex-grow py-6 px-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={clsx(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-body-md text-sm",
                    isActive 
                      ? "bg-primary-container/10 text-primary-container font-semibold" 
                      : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile Info & Logout */}
        <div className="p-4 border-t border-white/5 bg-surface-container-low flex items-center justify-between gap-3 sticky bottom-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-fixed flex items-center justify-center font-display text-lg font-bold border border-white/10 shadow-inner">
              A
            </div>
            <div className="text-left">
              <p className="text-sm font-label-caps tracking-widest text-on-surface font-semibold">c.amr</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Administrator</p>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            title="Log out"
            className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}
