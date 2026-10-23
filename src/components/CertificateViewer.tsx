"use client";

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { certificateGroups, certificateSrc } from "@/lib/content";

// Every certificate in page order, with its issuer, so Previous and Next walk the whole list.
const certificates = certificateGroups.flatMap((group) =>
  group.certificates.map((cert) => ({ ...cert, issuer: group.issuer }))
);

const OPEN_EVENT = "open-certificate";

export function openCertificate(image: string) {
  window.dispatchEvent(new CustomEvent<string>(OPEN_EVENT, { detail: image }));
}

export function ViewCertificateButton({
  image,
  className,
  children,
}: {
  image: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button type="button" onClick={() => openCertificate(image)} className={className}>
      {children}
    </button>
  );
}

const navButton =
  "inline-flex min-h-11 cursor-pointer items-center gap-1.5 px-3 text-base text-ink transition-colors hover:text-blue";

// Shows a certificate image over the page. There is deliberately no download link, and
// right-click, long-press and dragging the image are blocked, so the only copy a visitor
// can take is a screenshot.
export function CertificateViewer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const cert = certificates[index];

  useEffect(() => {
    const onOpen = (e: Event) => {
      const i = certificates.findIndex((c) => c.image === (e as CustomEvent<string>).detail);
      const dialog = dialogRef.current;
      if (i === -1 || !dialog) return;
      setIndex(i);
      setOpen(true);
      if (!dialog.open) dialog.showModal();
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const close = () => dialogRef.current?.close();
  const step = (by: number) => setIndex((i) => (i + by + certificates.length) % certificates.length);

  // Fetch the neighbours while this one is on screen, so Previous and Next show at once.
  if (open) {
    for (const by of [-1, 1]) {
      const neighbour = certificates[(index + by + certificates.length) % certificates.length];
      preload(certificateSrc(neighbour), { as: "image" });
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="certificate-title"
      className="certificate-viewer"
      onClose={() => setOpen(false)}
      // A click on the backdrop lands on the <dialog> itself, not on its contents.
      onClick={(e) => e.target === e.currentTarget && close()}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") step(-1);
        else if (e.key === "ArrowRight") step(1);
        else return;
        e.preventDefault();
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="flex items-start gap-4 border-b border-rule py-3 pr-2 pl-4 sm:pl-6">
        <div className="min-w-0 flex-1 pt-1">
          <p className="text-sm text-muted">{cert.issuer}</p>
          <h2 id="certificate-title" className="text-lg leading-snug font-bold">
            {cert.name}
          </h2>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center text-ink transition-colors hover:text-blue"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex justify-center p-4 sm:p-6">
        <Image
          key={cert.image}
          src={certificateSrc(cert)}
          alt={`${cert.name} certificate`}
          width={cert.width}
          height={cert.height}
          // Already small WebP files; serving them as-is skips the image optimizer.
          unoptimized
          draggable={false}
          className="certificate-viewer-image"
        />
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-rule px-1 py-1 sm:px-3">
        <button type="button" onClick={() => step(-1)} className={navButton}>
          <ChevronLeft className="size-5" aria-hidden="true" />
          Previous
        </button>
        <p className="text-sm text-muted" aria-live="polite">
          {index + 1} of {certificates.length}
        </p>
        <button type="button" onClick={() => step(1)} className={navButton}>
          Next
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </dialog>
  );
}
