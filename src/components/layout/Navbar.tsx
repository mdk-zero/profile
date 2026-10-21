"use client";

import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { sections } from "@/lib/content";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const navSections = sections.filter((s) => s.nav);
type SectionId = (typeof navSections)[number]["id"];

function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      // The last section whose top has passed the upper third of the viewport; the
      // last one once the page is scrolled to the bottom; none while in the hero.
      const line = window.innerHeight / 3;
      let current: SectionId | null = null;
      for (const { id } of navSections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = navSections[navSections.length - 1].id;
      setActive(current);
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
  }, []);

  return active;
}

export function Navbar() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur-md">
      <div className="page flex h-(--nav-h) items-center justify-between gap-6">
        <a href="#top" className="flex shrink-0 items-center gap-3 font-display text-lg font-bold whitespace-nowrap text-ink">
          {/* public/logo.png is a one-colour mark, so it's a mask that takes the text colour in either theme. */}
          <span
            aria-hidden="true"
            className="icon h-8 w-[1.53rem]"
            style={{ "--icon": "url(/logo.png)" } as React.CSSProperties}
          />
          {site.handle}
        </a>

        <nav aria-label="Sections" className="hidden xl:block">
          <ul className="flex items-center gap-7 text-base">
            {navSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "location" : undefined}
                  className={cn(
                    "relative py-2 transition-colors",
                    active === s.id
                      ? "text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-blue"
                      : "text-muted hover:text-ink"
                  )}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${nextTheme} theme`}
            className="flex size-10 cursor-pointer items-center justify-center text-muted transition-colors hover:text-ink"
          >
            {theme === "dark" ? (
              <Sun className="size-5" aria-hidden="true" />
            ) : (
              <Moon className="size-5" aria-hidden="true" />
            )}
          </button>
          <a href={site.resume} download className="btn btn-primary hidden min-h-10 px-4 whitespace-nowrap md:inline-flex">
            Download résumé
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex size-10 cursor-pointer items-center justify-center text-ink xl:hidden"
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Sections" className="border-t border-rule bg-paper xl:hidden">
          <ul className="page flex flex-col py-4">
            {navSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === s.id ? "location" : undefined}
                  className={cn(
                    "flex min-h-12 items-center font-display text-xl font-semibold",
                    active === s.id ? "text-blue" : "text-ink"
                  )}
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li className="mt-4 md:hidden">
              <a href={site.resume} download className="btn btn-primary w-full">
                Download résumé
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
