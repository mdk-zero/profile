"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { CornerDownLeft, Search } from "lucide-react";
import { openCertificate } from "@/components/CertificateViewer";
import { useTheme } from "@/components/ThemeProvider";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const SEARCH_GROUPS = [
  "Sections",
  "Projects",
  "Experience",
  "Skills",
  "Certificates",
  "Actions",
] as const;

export type SearchItem = {
  id: string;
  group: (typeof SEARCH_GROUPS)[number];
  title: string;
  subtitle?: string;
  keywords?: string;
  href?: string;
  external?: boolean;
  download?: boolean;
  action?: "toggle-theme" | "copy-email";
  /** Opens this certificate (its `image` name) in the certificate viewer. */
  certificate?: string;
};

const OPEN_EVENT = "open-command-palette";

export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

// "⌘" on Apple devices, "Ctrl" elsewhere. The server renders "Ctrl".
export function useModKeyLabel() {
  return useSyncExternalStore(
    () => () => {},
    () => (/Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent) ? "⌘" : "Ctrl"),
    () => "Ctrl"
  );
}

// Every query word must appear somewhere in the item; titles that start with the
// first word rank above titles that merely contain it, which rank above keyword hits.
function search(items: SearchItem[], query: string) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return items.filter((item) => item.group === "Sections" || item.group === "Actions");
  }
  return items
    .map((item) => {
      const title = item.title.toLowerCase();
      const haystack = `${title} ${item.subtitle ?? ""} ${item.keywords ?? ""}`.toLowerCase();
      if (!words.every((w) => haystack.includes(w))) return null;
      const score = title.startsWith(words[0]) ? 0 : title.includes(words[0]) ? 1 : 2;
      return { item, score };
    })
    .filter((r): r is { item: SearchItem; score: number } => r !== null)
    .sort((a, b) => a.score - b.score)
    .map((r) => r.item);
}

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  !!target.closest("input, textarea, select, [contenteditable=''], [contenteditable='true']");

export function CommandPalette({ items }: { items: SearchItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [notice, setNotice] = useState("");
  const { toggleTheme } = useTheme();
  const modKey = useModKeyLabel();

  const results = useMemo(() => search(items, query), [items, query]);
  // Groups appear in the order of their best match (results are already ranked), so the
  // closest hit is always first; `flat` is the same order for keyboard movement.
  const grouped = SEARCH_GROUPS.map((group) => ({
    group,
    rank: results.findIndex((r) => r.group === group),
    items: results.filter((r) => r.group === group),
  }))
    .filter((g) => g.items.length > 0)
    .sort((a, b) => (query.trim() ? a.rank - b.rank : 0));
  const flat = grouped.flatMap((g) => g.items);
  const active = flat[Math.min(activeIndex, flat.length - 1)];

  const open = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    setQuery("");
    setActiveIndex(0);
    dialog.showModal();
    inputRef.current?.focus();
  };

  const close = () => dialogRef.current?.close();

  // Ctrl+K / ⌘K anywhere, or "/" when not typing in a field.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const modK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      const slash = e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey && !isTyping(e.target);
      if (!modK && !slash) return;
      e.preventDefault();
      if (dialogRef.current?.open) close();
      else open();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_EVENT, open);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_EVENT, open);
    };
  }, []);

  // Keep the highlighted result in view while moving with the arrow keys.
  useEffect(() => {
    if (!active) return;
    document.getElementById(`search-option-${active.id}`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  useEffect(() => {
    if (!notice) return;
    const id = window.setTimeout(() => setNotice(""), 2500);
    return () => window.clearTimeout(id);
  }, [notice]);

  const run = async (item: SearchItem) => {
    close();
    if (item.action === "toggle-theme") {
      toggleTheme();
    } else if (item.action === "copy-email") {
      try {
        await navigator.clipboard.writeText(site.email);
        setNotice(`Copied ${site.email}`);
      } catch {
        setNotice(`Couldn't copy. The address is ${site.email}`);
      }
    } else if (item.certificate) {
      openCertificate(item.certificate);
    } else if (item.href) {
      if (item.download || item.external) {
        const a = document.createElement("a");
        a.href = item.href;
        if (item.download) a.download = "";
        if (item.external) {
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
        a.click();
      } else {
        window.location.assign(item.href);
      }
    }
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (flat.length === 0) return;
    const index = flat.indexOf(active);
    if (e.key === "ArrowDown") {
      setActiveIndex((index + 1) % flat.length);
    } else if (e.key === "ArrowUp") {
      setActiveIndex((index - 1 + flat.length) % flat.length);
    } else if (e.key === "Enter") {
      if (active) run(active);
    } else {
      return;
    }
    e.preventDefault();
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        aria-label="Search the site"
        className="palette"
        // A click on the backdrop lands on the <dialog> itself, not on its contents.
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <div className="flex h-14 shrink-0 items-center gap-3 border-b border-rule px-4">
          <Search className="size-5 shrink-0 text-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-autocomplete="list"
            aria-activedescendant={active ? `search-option-${active.id}` : undefined}
            aria-label="Search"
            placeholder="Search projects, skills, certificates…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onInputKeyDown}
            className="h-full min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-muted"
          />
          <kbd className="kbd">Esc</kbd>
        </div>

        <div id="search-results" role="listbox" aria-label="Results" className="overflow-y-auto p-2">
          {flat.length === 0 ? (
            <p className="px-3 py-8 text-center text-muted">
              No results for “{query}”. Try a project name, a skill like React, or a certificate.
            </p>
          ) : (
            grouped.map(({ group, items: groupItems }) => (
              <div key={group} role="group" aria-labelledby={`search-group-${group}`} className="pb-2">
                <p id={`search-group-${group}`} className="px-3 pt-2 pb-1 text-sm text-muted">
                  {group}
                </p>
                {groupItems.map((item) => {
                  const isActive = item === active;
                  return (
                    <div
                      key={item.id}
                      id={`search-option-${item.id}`}
                      role="option"
                      aria-selected={isActive}
                      onClick={() => run(item)}
                      onMouseMove={() => !isActive && setActiveIndex(flat.indexOf(item))}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 px-3 py-2.5",
                        isActive ? "bg-wash text-ink" : "text-body"
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <p className={cn("truncate", isActive && "text-ink")}>{item.title}</p>
                        {item.subtitle && <p className="truncate text-sm text-muted">{item.subtitle}</p>}
                      </div>
                      {isActive && <CornerDownLeft className="size-4 shrink-0 text-blue" aria-hidden="true" />}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="hidden shrink-0 gap-5 border-t border-rule px-4 py-2.5 text-sm text-muted sm:flex">
          <span>↑ ↓ to move</span>
          <span>Enter to open</span>
          <span className="ml-auto">{modKey} K to toggle</span>
        </div>
      </dialog>

      <p
        role="status"
        className={cn(
          "fixed bottom-6 left-1/2 z-50 -translate-x-1/2 border border-rule bg-paper px-4 py-3 text-ink",
          !notice && "sr-only"
        )}
      >
        {notice}
      </p>
    </>
  );
}
