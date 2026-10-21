"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Each section is drawn as a tiny wireframe of its own layout, like a code editor's
// minimap. Shapes are SVG masks filled with the current colour, so they follow the theme.
type Kind = "hero" | "media" | "columns" | "timeline" | "heatmap" | "split" | "form";

export type MapSection = { id: string; label: string; kind: Kind; count?: number };

type Placed = MapSection & { top: number; height: number };

const shape = (w: number, h: number, body: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}' preserveAspectRatio='none'>${body}</svg>`
  )}")`;
const rect = (x: number, y: number, w: number, h: number) =>
  `<rect x='${x}' y='${y}' width='${w}' height='${h}'/>`;

// size: how one tile maps onto the block. "count" tiles split the block evenly.
const PATTERNS: Record<Kind, { image: string; size: string | "count"; repeat: string }> = {
  // Name in big bars, intro lines and buttons on the left; the photocard on the right.
  hero: {
    image: shape(24, 48, rect(0, 6, 13, 5) + rect(0, 13, 14, 5) + rect(0, 21, 10, 2) + rect(0, 27, 14, 1) + rect(0, 30, 11, 1) + rect(0, 35, 5, 3) + rect(6, 35, 5, 3) + rect(16, 5, 8, 14)),
    size: "100% 100%",
    repeat: "no-repeat",
  },
  // One screenshot-and-text row per project.
  media: {
    image: shape(24, 20, rect(0, 3, 14, 10) + rect(16, 4, 8, 2) + rect(16, 8, 7, 1) + rect(16, 10, 6, 1) + rect(16, 12, 7, 1)),
    size: "count",
    repeat: "repeat-y",
  },
  // Three service columns.
  columns: {
    image: shape(24, 20, [0, 8.5, 17].map((x) => rect(x, 5, 6, 2) + rect(x, 9, 6, 1) + rect(x, 11, 5, 1)).join("")),
    size: "100% 100%",
    repeat: "no-repeat",
  },
  // Dated entries: date on the left, title and lines on the right.
  timeline: {
    image: shape(24, 14, rect(0, 1, 5, 1) + rect(7, 0, 12, 2) + rect(7, 4, 17, 1) + rect(7, 6, 15, 1) + rect(7, 8, 16, 1)),
    size: "100% 16px",
    repeat: "repeat-y",
  },
  // The contribution calendar.
  heatmap: {
    image: shape(4, 4, rect(0, 0, 3, 3)),
    size: "4px 4px",
    repeat: "repeat",
  },
  // Bio on the left, skills on the right.
  split: {
    image: shape(24, 10, rect(0, 1, 11, 1) + rect(0, 4, 10, 1) + rect(0, 7, 11, 1) + rect(14, 1, 5, 1) + rect(14, 4, 9, 1) + rect(14, 7, 8, 1)),
    size: "100% 10px",
    repeat: "repeat-y",
  },
  // Contact details on the left, form fields on the right.
  form: {
    image: shape(24, 12, rect(0, 2, 8, 1) + rect(0, 5, 7, 1) + `<rect x='11.5' y='0.5' width='12' height='6' fill='none' stroke='black'/>`),
    size: "100% 12px",
    repeat: "repeat-y",
  },
};

// A slim map of the whole page on the right edge. The blue frame is the part of the page
// on screen and moves as you scroll; click a section to jump there, or drag the frame.
export function PageMap({ sections }: { sections: MapSection[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(0);
  const placedRef = useRef<Placed[]>([]);
  const [layout, setLayout] = useState<{ scale: number; placed: Placed[] }>({ scale: 0, placed: [] });
  const [active, setActive] = useState<string | null>(null);
  const drag = useRef<{ startY: number; startScroll: number; moved: boolean } | null>(null);

  useEffect(() => {
    let frame = 0;

    // Position the frame and work out which section is being read.
    const update = () => {
      frame = 0;
      const scale = scaleRef.current;
      const el = frameRef.current;
      if (el && scale) {
        el.style.transform = `translateY(${window.scrollY * scale}px)`;
        el.style.height = `${Math.max(10, window.innerHeight * scale)}px`;
        el.style.opacity = "1";
      }
      const line = window.scrollY + window.innerHeight / 3;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      const list = placedRef.current;
      let current = list[0]?.id ?? null;
      for (const s of list) if (s.top <= line) current = s.id;
      if (atBottom && list.length) current = list[list.length - 1].id;
      setActive(current);
    };

    // Section positions change as images and fonts load, so re-measure on any resize.
    const measure = () => {
      const rail = railRef.current;
      if (!rail) return;
      scaleRef.current = rail.clientHeight / document.documentElement.scrollHeight;
      placedRef.current = sections.flatMap((s) => {
        const el = document.getElementById(s.id);
        if (!el) return [];
        const box = el.getBoundingClientRect();
        return [{ ...s, top: box.top + window.scrollY, height: box.height }];
      });
      setLayout({ scale: scaleRef.current, placed: placedRef.current });
      update();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [sections]);

  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ block: "start" });

  // Dragging the frame scrubs the page; a press without movement acts as a click on
  // whichever section is under the pointer.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startY: e.clientY, startScroll: window.scrollY, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || !scaleRef.current) return;
    const dy = e.clientY - d.startY;
    if (Math.abs(dy) > 3) d.moved = true;
    if (d.moved) window.scrollTo({ top: d.startScroll + dy / scaleRef.current, behavior: "instant" });
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    drag.current = null;
    const rail = railRef.current;
    if (!d || d.moved || !rail || !scaleRef.current) return;
    const docY = (e.clientY - rail.getBoundingClientRect().top) / scaleRef.current;
    const hit = placedRef.current.find((s) => docY >= s.top && docY < s.top + s.height);
    if (hit) goTo(hit.id);
  };

  const { scale, placed } = layout;

  return (
    <nav
      aria-label="Page map"
      className="fixed top-1/2 right-2 z-30 hidden -translate-y-1/2 lg:block 2xl:right-6"
    >
      <div ref={railRef} className="relative h-[min(62vh,32rem)] w-6">
        {placed.map((s) => {
          const pattern = PATTERNS[s.kind];
          const height = Math.max(6, s.height * scale);
          const size =
            pattern.size === "count" ? `100% ${height / Math.max(1, s.count ?? 1)}px` : pattern.size;
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(s.id)}
              aria-label={`Go to ${s.label}`}
              aria-current={isActive ? "location" : undefined}
              className="group absolute inset-x-0 block cursor-pointer"
              style={{ top: s.top * scale, height }}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 transition-colors duration-150",
                  isActive ? "bg-ink" : "bg-field group-hover:bg-blue group-focus-visible:bg-blue"
                )}
                style={{
                  maskImage: pattern.image,
                  WebkitMaskImage: pattern.image,
                  maskSize: size,
                  WebkitMaskSize: size,
                  maskRepeat: pattern.repeat,
                  WebkitMaskRepeat: pattern.repeat,
                }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-[calc(100%+0.875rem)] -translate-y-1/2 border border-rule bg-paper px-2 py-1 text-sm whitespace-nowrap text-ink opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                {s.label}
              </span>
            </button>
          );
        })}

        {/* Hidden until the first measurement positions it. */}
        <div
          ref={frameRef}
          aria-hidden="true"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (drag.current = null)}
          className="absolute -inset-x-1 top-0 cursor-grab touch-none border-[1.5px] border-blue bg-blue/10 opacity-0 active:cursor-grabbing"
        />
      </div>
    </nav>
  );
}
