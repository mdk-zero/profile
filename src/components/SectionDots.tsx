"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type DotSection = { id: string; label: string };

// A column of square dots on the right edge, one per section. The line between them fills
// as you scroll, reaching each dot as its section starts; click a dot to jump there.
export function SectionDots({ sections }: { sections: DotSection[] }) {
  const fillRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const tops = sections.map((s) => {
        const el = document.getElementById(s.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
      });

      // The section being read is the last one whose top has passed the upper third of
      // the viewport, or the last one once the page is scrolled to the bottom.
      const line = window.scrollY + window.innerHeight / 3;
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
      let index = 0;
      tops.forEach((top, i) => {
        if (top <= line) index = i;
      });
      if (atBottom) index = sections.length - 1;

      // Progress: whole dots for finished sections, plus how far into the current one.
      const start = tops[index];
      const end = tops[index + 1] ?? doc.scrollHeight;
      const within = atBottom ? 0 : Math.min(1, Math.max(0, (line - start) / (end - start)));
      const progress = sections.length > 1 ? (index + within) / (sections.length - 1) : 0;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${Math.min(1, progress)})`;

      setActive(index);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sections]);

  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ block: "start" });

  return (
    <nav
      aria-label="Sections"
      className="fixed top-1/2 right-2 z-30 hidden -translate-y-1/2 lg:block 2xl:right-6"
    >
      <ol className="relative flex flex-col gap-3">
        {/* The track runs from the first dot's centre to the last's; the fill grows over it. */}
        <span aria-hidden="true" className="absolute inset-y-3 left-1/2 w-0.5 -translate-x-1/2 bg-rule" />
        <span
          ref={fillRef}
          aria-hidden="true"
          className="absolute inset-y-3 left-1/2 w-0.5 origin-top -translate-x-1/2 bg-blue"
          style={{ transform: "scaleY(0)" }}
        />
        {sections.map((s, i) => (
          <li key={s.id} className="relative">
            <button
              type="button"
              onClick={() => goTo(s.id)}
              aria-label={`Go to ${s.label}`}
              aria-current={i === active ? "location" : undefined}
              className="group flex size-6 cursor-pointer items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "block transition-[width,height,background-color,border-color] duration-150",
                  i === active
                    ? "size-2.5 bg-blue"
                    : i < active
                      ? "size-2 bg-ink group-hover:bg-blue"
                      : "size-2 border border-field bg-paper group-hover:border-blue"
                )}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-[calc(100%+0.5rem)] -translate-y-1/2 border border-rule bg-paper px-2 py-1 text-sm whitespace-nowrap text-ink opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                {s.label}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
