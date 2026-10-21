"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { RotateCw } from "lucide-react";
import { LocalTime } from "@/components/LocalTime";

type PhotoCardProps = {
  name: string;
  handle: string;
  role: string;
  photo: { src: string; alt: string };
  // Rows printed on the back of the card. A value of null shows the live local time.
  details: { label: string; value: string | null }[];
  footer: string[];
};

const logoStyle = { "--icon": "url(/logo.png)" } as React.CSSProperties;

// The hero portrait as a printed photocard. With a mouse it tilts toward the pointer and
// catches the light; a click (or the button under it) flips it over to show the back.
export function PhotoCard({ name, handle, role, photo, details, footer }: PhotoCardProps) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = card.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width;
    const y = (e.clientY - box.top) / box.height;
    // Tilt toward the pointer. The tilt layer sits outside the flip, so this holds on both sides.
    card.style.setProperty("--rx", `${(0.5 - y) * 12}deg`);
    card.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
    card.setAttribute("data-tracking", "");
  };

  const onPointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    for (const prop of ["--rx", "--ry", "--mx", "--my"]) card.style.removeProperty(prop);
    card.removeAttribute("data-tracking");
  };

  return (
    <div className="mx-auto w-full max-w-[22rem] sm:max-w-[27rem] lg:mr-0 lg:ml-auto">
      <div
        ref={cardRef}
        role="group"
        aria-label={`Photocard of ${name}`}
        data-flipped={flipped ? "" : undefined}
        className="photocard"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <div className="photocard-tilt" onClick={() => setFlipped((f) => !f)}>
          <div className="photocard-inner">
            <div className="photocard-face photocard-front flex flex-col p-3" aria-hidden={flipped}>
              <div className="relative flex-1 overflow-hidden bg-[#e5e5e5]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  preload
                  sizes="(min-width: 640px) 27rem, 22rem"
                  className="object-cover object-[50%_30%]"
                  draggable={false}
                />
                <div className="photocard-sheen" aria-hidden="true" />
              </div>
              <div className="flex items-end justify-between gap-3 px-1 pt-3 pb-0.5">
                <div className="min-w-0">
                  <p className="font-display text-xl leading-tight font-bold tracking-[-0.02em]">{name}</p>
                  <p className="mt-0.5 text-sm text-[#5c5c5c]">{role}</p>
                </div>
                <span aria-hidden="true" className="icon h-8 w-[1.53rem]" style={logoStyle} />
              </div>
            </div>

            <div className="photocard-face photocard-back flex flex-col p-6" aria-hidden={!flipped}>
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="icon h-10 w-[1.9rem]" style={logoStyle} />
                <div>
                  <p className="font-display text-2xl leading-none font-bold">{handle}</p>
                  <p className="mt-1 text-sm text-[#5c5c5c]">{name}</p>
                </div>
              </div>

              <dl className="mt-7 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-3 text-[0.9375rem] leading-snug">
                {details.map((row) => (
                  <div key={row.label} className="contents">
                    <dt className="text-[#5c5c5c]">{row.label}</dt>
                    <dd className="font-medium">{row.value ?? <LocalTime />}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-auto border-t border-black/10 pt-4 text-sm text-[#5c5c5c]">
                {footer.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-pressed={flipped}
          className="inline-flex min-h-10 cursor-pointer items-center gap-2 px-2 text-base text-muted transition-colors hover:text-ink"
        >
          <RotateCw className="size-4" aria-hidden="true" />
          {flipped ? "Show the front" : "Flip the card"}
        </button>
      </div>
    </div>
  );
}
