"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
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

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
