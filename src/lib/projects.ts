import { cache } from "react";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  publishedAt: string | null;
};

type ImageValue = string | { src?: string } | null | undefined;

// Keystatic stores whatever was typed, so bare domains ("example.com") are common.
// Without a scheme the browser treats the href as a relative path and resolves it
// against the current origin, so prefix https:// unless it is already absolute.
function toAbsoluteUrl(url: string | null | undefined) {
  const trimmed = url?.trim();
  if (!trimmed || trimmed === "#") return null;
  if (/^(https?:\/\/|mailto:|tel:|\/)/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

// Cached per request, so the hero and the projects section share one read.
export const getProjects = cache(async (): Promise<Project[]> => {
  const reader = createReader(process.cwd(), keystaticConfig);
  const projects = await reader.collections.projects.all();

  return projects
    .map((project) => {
      const imageValue = project.entry.image as ImageValue;
      const hasImage =
        typeof imageValue === "string" || (typeof imageValue === "object" && !!imageValue?.src);

      return {
        id: project.slug,
        title: typeof project.entry.title === "string" ? project.entry.title : project.slug,
        description: project.entry.description || "",
        image: hasImage
          ? `/api/project-image/${encodeURIComponent(project.slug)}`
          : "/placeholder.png",
        tags: [...(project.entry.tags || [])],
        liveUrl: toAbsoluteUrl(project.entry.liveUrl),
        githubUrl: toAbsoluteUrl(project.entry.sourceUrl),
        featured: project.entry.featured || false,
        publishedAt: project.entry.publishedAt ?? null,
      };
    })
    // Newest first; projects without a date keep their order after the dated ones.
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
});

export const projectAnchor = (id: string) =>
  `project-${id.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

// "https://www.example.com/path/" -> "example.com/path"
export const displayUrl = (url: string) =>
  url.replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/$/, "");
