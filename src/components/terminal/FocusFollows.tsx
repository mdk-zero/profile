"use client";

import { useEffect } from "react";

const PANEL = "[data-panel]";

// Keeps exactly one panel focused, like a tiling window manager. With a mouse, focus
// follows the pointer; on touch screens it follows whichever panel is at reading height.
// Keyboard focus always pulls window focus along with it.
export function FocusFollows() {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;

    const focusPanel = (panel: Element | null) => {
      if (!panel || panel.hasAttribute("data-focused")) return;
      document.querySelectorAll(PANEL).forEach((el) => {
        el.toggleAttribute("data-focused", el === panel);
      });
    };

    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      focusPanel((event.target as Element).closest(PANEL));
    };

    const onFocusIn = (event: FocusEvent) => {
      focusPanel((event.target as Element).closest(PANEL));
    };

    const onScroll = () => {
      if (finePointer.matches || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const line = window.innerHeight * 0.4;
        const hit = Array.from(document.querySelectorAll(PANEL)).find((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top <= line && rect.bottom >= line;
        });
        focusPanel(hit ?? null);
      });
    };

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("focusin", onFocusIn);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
