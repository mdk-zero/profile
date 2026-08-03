import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../keystatic.config";
import { ProjectsClient } from "./ProjectsClient";

type ImageValue = string | { src?: string } | null | undefined;

// Keystatic stores whatever was typed, so bare domains ("example.com") are common.
// Without a scheme the browser treats the href as a relative path and resolves it
// against the current origin, so prefix https:// unless it is already absolute.
function toAbsoluteUrl(url: string | null | undefined) {
  const trimmed = url?.trim();
  if (!trimmed || trimmed === "#") return "#";
  if (/^(https?:\/\/|mailto:|tel:|\/)/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

async function getProjects() {
  const reader = createReader(process.cwd(), keystaticConfig);
  const projects = await reader.collections.projects.all();
  return projects.map((project) => {
    let imagePath = "/placeholder.png";
    
    const imageValue = project.entry.image as ImageValue;
    if (imageValue) {
      if (typeof imageValue === 'string') {
        imagePath = `/api/project-image/${encodeURIComponent(project.slug)}`;
      } else if (typeof imageValue === 'object' && 'src' in imageValue) {
        imagePath = `/api/project-image/${encodeURIComponent(project.slug)}`;
      }
    }
    
    return {
      id: project.slug,
      title: typeof project.entry.title === 'string' ? project.entry.title : project.slug,
      description: project.entry.description || "",
      image: imagePath,
      tags: [...(project.entry.tags || [])],
      liveUrl: toAbsoluteUrl(project.entry.liveUrl),
      githubUrl: toAbsoluteUrl(project.entry.sourceUrl),
      featured: project.entry.featured || false,
    };
  });
}

export async function Projects() {
  const projects = await getProjects();
  return <ProjectsClient projects={projects} />;
}
