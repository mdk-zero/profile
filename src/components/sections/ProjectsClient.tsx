"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Breakable } from "@/components/terminal/Breakable";
import { Panel } from "@/components/terminal/Panel";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
};

// "https://www.example.com/path/" -> "example.com/path"
function displayUrl(url: string) {
  return url.replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/$/, "");
}

const hasUrl = (url: string) => url !== "#";

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const project = projects[selected];

  // A file-manager list: arrow keys or j/k move the selection, like yazi or ranger.
  const select = (index: number) => {
    const next = (index + projects.length) % projects.length;
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
      case "j":
        select(selected + 1);
        break;
      case "ArrowUp":
      case "k":
        select(selected - 1);
        break;
      case "Home":
        select(0);
        break;
      case "End":
        select(projects.length - 1);
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  return (
    <section id="projects" tabIndex={-1} aria-labelledby="projects-title" className="workspace">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)]">
        <Panel title="projects" titleId="projects-title" className="flex flex-col">
          {projects.length === 0 ? (
            <p>No projects published yet.</p>
          ) : (
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-labelledby="projects-title"
              onKeyDown={onKeyDown}
              className="-mx-[1ch] flex flex-col"
            >
              {projects.map((p, i) => {
                const isSelected = i === selected;
                return (
                  <button
                    key={p.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`project-tab-${i}`}
                    aria-selected={isSelected}
                    aria-controls="project-preview"
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setSelected(i)}
                    className={cn(
                      "cursor-pointer px-[1ch] py-2 text-left",
                      isSelected ? "bg-fg text-bg" : "text-soft hover:text-fg"
                    )}
                  >
                    <span className="block truncate">{p.title}</span>
                    {hasUrl(p.liveUrl) && (
                      <span
                        className={cn(
                          "block truncate text-sm",
                          isSelected ? "text-bg/70" : "text-dim"
                        )}
                      >
                        {displayUrl(p.liveUrl)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-auto flex flex-col gap-2 pt-8 text-sm">
            <p className="hidden text-dim md:block">Use ↑ ↓ or j k to browse.</p>
            <a
              href="https://www.github.com/mdk-zero?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="link w-fit"
            >
              More projects on GitHub
            </a>
          </div>
        </Panel>

        {project && (
          <Panel
            title="preview"
            titleAs="span"
            role="tabpanel"
            id="project-preview"
            aria-labelledby={`project-tab-${selected}`}
          >
            {/* Every screenshot stays mounted so switching projects never waits on a load. */}
            <div className="relative aspect-video border border-line">
              {projects.map((p, i) => (
                <Image
                  key={p.id}
                  src={p.image}
                  alt={i === selected ? `Screenshot of ${p.title}` : ""}
                  aria-hidden={i !== selected}
                  fill
                  sizes="(min-width: 1360px) 820px, (min-width: 1024px) 60vw, 100vw"
                  className={cn(
                    "dimmable object-cover object-top",
                    i === selected ? "opacity-100" : "opacity-0"
                  )}
                />
              ))}
            </div>

            <h3 className="mt-6 text-xl font-bold text-fg">{project.title}</h3>
            <p className="mt-2 max-w-[68ch]">{project.description}</p>

            <dl className="kv mt-6">
              {project.tags.length > 0 && (
                <div className="contents">
                  <dt>stack</dt>
                  <dd>{project.tags.join(", ")}</dd>
                </div>
              )}
              {hasUrl(project.liveUrl) && (
                <div className="contents">
                  <dt>site</dt>
                  <dd className="[overflow-wrap:anywhere]">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      <Breakable text={displayUrl(project.liveUrl)} />
                    </a>
                  </dd>
                </div>
              )}
              {hasUrl(project.githubUrl) && (
                <div className="contents">
                  <dt>source</dt>
                  <dd className="[overflow-wrap:anywhere]">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      <Breakable text={displayUrl(project.githubUrl)} />
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </Panel>
        )}
      </div>
    </section>
  );
}
