"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // If not logged in and not already on the login page
    if (!accessToken && !pathname.includes("/admin/login")) {
      router.push("/admin/login");
    } 
    // If logged in and on the login page
    else if (accessToken && pathname.includes("/admin/login")) {
      router.push("/admin");
    }
    else {
      setIsReady(true);
    }
  }, [accessToken, pathname, router]);

  if (!isReady) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background text-on-surface">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return <>{children}</>;
}
