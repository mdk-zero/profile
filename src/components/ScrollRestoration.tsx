"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function ScrollRestoration() {
  const pathname = usePathname();
  const isRestoring = useRef(false);

  useEffect(() => {
    const scrollPositions = sessionStorage;
    
    const saveScrollPosition = () => {
      if (!isRestoring.current) {
        scrollPositions.setItem("scrollPosition", window.scrollY.toString());
      }
    };

    const restoreScrollPosition = () => {
      const savedPosition = scrollPositions.getItem("scrollPosition");
      if (savedPosition) {
        isRestoring.current = true;
        window.scrollTo(0, parseInt(savedPosition, 10));
        setTimeout(() => {
          isRestoring.current = false;
        }, 100);
      }
    };

    window.addEventListener("beforeunload", saveScrollPosition);
    
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.closest("a")) {
        saveScrollPosition();
      }
    };

    document.addEventListener("click", handleClick);

    restoreScrollPosition();

    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
      document.removeEventListener("click", handleClick);
    };
  }, [pathname]);

  return null;
}
