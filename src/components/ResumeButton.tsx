"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// "Download résumé" that confirms the click: the label rolls over to "Downloaded" for two
// seconds, then back. Both labels share one grid cell, so the button never changes width.
export function ResumeButton({ className }: { className?: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const id = window.setTimeout(() => setDone(false), 2000);
    return () => window.clearTimeout(id);
  }, [done]);

  return (
    <>
      <a
        href={site.resume}
        download
        onClick={() => setDone(true)}
        data-done={done ? "" : undefined}
        className={cn("btn btn-primary resume-btn", className)}
      >
        <span className="resume-btn-labels">
          <span className="resume-btn-label" aria-hidden={done}>
            Download résumé
          </span>
          <span className="resume-btn-label resume-btn-done" aria-hidden={!done}>
            <Check className="size-4" aria-hidden="true" />
            Downloaded
          </span>
        </span>
      </a>
      <span role="status" className="sr-only">
        {done ? "Résumé downloaded" : ""}
      </span>
    </>
  );
}
