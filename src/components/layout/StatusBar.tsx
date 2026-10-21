"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { workspaces } from "@/components/terminal/workspaces";
import { cn } from "@/lib/utils";

type WorkspaceId = (typeof workspaces)[number]["id"];

function useActiveWorkspace() {
  const [active, setActive] = useState<WorkspaceId>(workspaces[0].id);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      // The active workspace is the last section whose top has passed the upper third
      // of the viewport, or the last one once the page is scrolled to the bottom.
      const line = window.innerHeight / 3;
      let current: WorkspaceId = workspaces[0].id;
      for (const { id } of workspaces) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = workspaces[workspaces.length - 1].id;
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

// Number keys jump between workspaces, unless the visitor is typing in a field.
function useWorkspaceShortcuts() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement;
      if (target.closest("input, textarea, select, [contenteditable]")) return;

      const workspace = workspaces.find((w) => w.key === event.key);
      const section = workspace && document.getElementById(workspace.id);
      if (!section) return;

      event.preventDefault();
      section.scrollIntoView({ block: "start" });
      section.focus({ preventScroll: true });
      history.replaceState(null, "", `#${workspace.id}`);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}

// Local time where Linux works, so visitors know when to expect a reply.
function useBalayanTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Manila",
      hour: "2-digit",
      minute: "2-digit",
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

export function StatusBar() {
  const active = useActiveWorkspace();
  const time = useBalayanTime();
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";
  useWorkspaceShortcuts();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-(--bar-h) border-b border-line bg-bg text-sm">
      <div className="mx-auto flex h-full max-w-[1360px] items-stretch justify-between px-3">
        <nav aria-label="Sections">
          <ol className="flex h-full">
            {workspaces.map((ws) => {
              const isActive = active === ws.id;
              return (
                <li key={ws.id}>
                  <a
                    href={`#${ws.id}`}
                    aria-current={isActive ? "location" : undefined}
                    aria-keyshortcuts={ws.key}
                    title={`${ws.label} (press ${ws.key})`}
                    className={cn(
                      "flex h-full items-center gap-[1ch] px-[1.25ch]",
                      isActive ? "bg-blue text-on-blue" : "text-dim hover:text-fg"
                    )}
                  >
                    <span>{ws.key}</span>
                    <span className={cn(isActive ? "inline" : "hidden md:inline")}>
                      {ws.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="flex items-center gap-[2ch]">
          <span
            className="hidden text-dim sm:inline"
            title="Local time in Balayan, Batangas (UTC+8)"
          >
            Balayan {time ?? "--:--"}
          </span>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${nextTheme} theme`}
            className="flex h-full cursor-pointer items-center px-[1.25ch] text-dim hover:text-fg"
          >
            {nextTheme}
          </button>
        </div>
      </div>
    </header>
  );
}
