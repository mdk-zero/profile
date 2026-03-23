"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnimationReset({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const handlePageshow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", handlePageshow);
    return () => window.removeEventListener("pageshow", handlePageshow);
  }, [pathname]);

  return <>{children}</>;
}
