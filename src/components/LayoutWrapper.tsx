"use client";

import { usePathname } from "next/navigation";
import { StatusBar } from "@/components/layout/StatusBar";
import { Footer } from "@/components/layout/Footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isKeystatic = pathname.startsWith("/keystatic");

  if (isKeystatic) {
    return <>{children}</>;
  }

  return (
    <>
      <StatusBar />
      <main className="mx-auto flex max-w-[1360px] flex-col gap-16 px-3 pt-[calc(var(--bar-h)+1.5rem)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
