"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Map, Image as ImageIcon, BarChart3, 
  Info, Briefcase, GraduationCap, Quote, Images, 
  Award, Target, MessageSquare, Settings, LayoutTemplate, Link as LinkIcon,
  Activity
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Media Library", href: "/admin/media", icon: ImageIcon },
  { name: "Site Settings", href: "/admin/site-settings", icon: Settings },
  { name: "Navigation", href: "/admin/navigation", icon: Map },
  { name: "Hero", href: "/admin/hero", icon: LayoutTemplate },
  { name: "Statistics", href: "/admin/statistics", icon: BarChart3 },
  { name: "About", href: "/admin/about", icon: Info },
  { name: "Injury Rehab", href: "/admin/injury-rehab", icon: Activity },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Methodology", href: "/admin/methodology", icon: GraduationCap },
  { name: "Motivation Banner", href: "/admin/motivation-banner", icon: Quote },
  { name: "Transformations", href: "/admin/transformations", icon: Images },
  { name: "Accreditations", href: "/admin/accreditations", icon: Award },
  { name: "Qualifications", href: "/admin/qualifications", icon: GraduationCap },
  { name: "Coaching Goals", href: "/admin/coaching-goals", icon: Target },
  { name: "Footer", href: "/admin/footer", icon: LinkIcon },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 flex-shrink-0 bg-surface border-r border-white/5 h-screen overflow-y-auto flex flex-col">
      <div className="p-6 sticky top-0 bg-surface z-10 border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-container text-on-primary-fixed flex items-center justify-center font-display text-lg font-bold rounded">A</div>
          <span className="font-label-caps uppercase tracking-widest text-on-surface text-sm">Workspace</span>
        </Link>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
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
  );
}
