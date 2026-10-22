import { createHash } from "crypto";
import fs from "fs";
import path from "path";
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

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

const IMAGE_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

// Keystatic saves a project's cover as image.<ext> in the project's folder, in
// whatever format was uploaded. `version` is a hash of the file, so the image URL
// changes when the cover is replaced and no cache keeps serving the old one.
export function readProjectImage(slug: string) {
  const dir = path.join(PROJECTS_DIR, slug);
  // The slug can come from a URL, so it must name a folder directly in PROJECTS_DIR.
  if (path.dirname(dir) !== PROJECTS_DIR || !fs.existsSync(dir)) return null;

  const fileName = fs.readdirSync(dir).find((name) => {
    const { name: base, ext } = path.parse(name);
    return base === "image" && ext.toLowerCase() in IMAGE_TYPES;
  });
  if (!fileName) return null;

  const file = fs.readFileSync(path.join(dir, fileName));
  return {
    file,
    contentType: IMAGE_TYPES[path.extname(fileName).toLowerCase()],
    version: createHash("sha1").update(file).digest("hex").slice(0, 10),
  };
}

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
      const image = readProjectImage(project.slug);

      return {
        id: project.slug,
        title: typeof project.entry.title === "string" ? project.entry.title : project.slug,
        description: project.entry.description || "",
        image: image
          ? `/api/project-image/${encodeURIComponent(project.slug)}/${image.version}`
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
