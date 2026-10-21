"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, ReactNode } from "react";

type Theme = "dark" | "light";

// Where the switch was pressed, in viewport pixels; the new theme grows out from here.
type Origin = { x: number; y: number };

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (origin?: Origin) => void;
}

const STORAGE_KEY = "portfolio-theme";

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

// The theme lives on <html> as a class. The inline ThemeScript in the root layout sets it
// before first paint, so React reads it from there instead of keeping a second copy.
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("theme-dark", "theme-light");
  root.classList.add(`theme-${theme}`);
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("theme-light") ? "light" : "dark";

const getServerSnapshot = (): Theme => "dark";

// Without an explicit origin (e.g. the command palette), reveal from the nav's toggle.
function defaultOrigin(): Origin {
  const toggle = document.querySelector("[data-theme-toggle]")?.getBoundingClientRect();
  if (toggle) return { x: toggle.left + toggle.width / 2, y: toggle.top + toggle.height / 2 };
  return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // A page restored from the back/forward cache may predate a theme change in another tab.
  useEffect(() => {
    const handlePageshow = () => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {}
      const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      applyTheme(stored === "light" || stored === "dark" ? stored : system);
    };

    window.addEventListener("pageshow", handlePageshow);
    return () => window.removeEventListener("pageshow", handlePageshow);
  }, []);

  // The new theme is revealed as a rectangle growing out of the switch while the old one
  // holds still underneath (a view transition). Browsers without view transitions switch
  // instantly; with reduced motion the browser's default crossfade plays instead.
  const toggleTheme = useCallback(
    (origin?: Origin) => {
      const next: Theme = theme === "dark" ? "light" : "dark";
      const commit = () => {
        applyTheme(next);
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {}
      };

      if (!document.startViewTransition) {
        commit();
        return;
      }

      const root = document.documentElement;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce) root.dataset.themeReveal = "";

      const transition = document.startViewTransition(async () => {
        commit();
        // Give React a tick to re-render the switch's icon before the new state is captured.
        await new Promise((resolve) => setTimeout(resolve, 0));
      });
      transition.finished.finally(() => delete root.dataset.themeReveal);
      if (reduce) return;

      transition.ready.then(() => {
        const { x, y } = origin ?? defaultOrigin();
        const right = window.innerWidth - x;
        const bottom = window.innerHeight - y;
        root.animate(
          { clipPath: [`inset(${y}px ${right}px ${bottom}px ${x}px)`, "inset(0px 0px 0px 0px)"] },
          {
            duration: 400,
            easing: getComputedStyle(root).getPropertyValue("--ease-out").trim(),
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    },
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
