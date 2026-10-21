import type { SearchItem } from "@/components/search/CommandPalette";
import {
  certificateGroups,
  certificateHref,
  education,
  sections,
  services,
  skills,
  work,
} from "@/lib/content";
import { getProjects, projectAnchor } from "@/lib/projects";
import { site } from "@/lib/site";

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Everything the command palette can find, built from the same data the sections render.
export async function getSearchIndex(): Promise<SearchItem[]> {
  const projects = await getProjects();

  return [
    ...sections.map((s) => ({
      id: `section-${s.id}`,
      group: "Sections" as const,
      title: s.label,
      href: `#${s.id}`,
    })),
    { id: "section-certificates", group: "Sections", title: "Certificates", href: "#certificates" },

    ...projects.map((p) => ({
      id: `project-${slug(p.id)}`,
      group: "Projects" as const,
      title: p.title,
      subtitle: p.tags.join(", "),
      keywords: p.description,
      href: `#${projectAnchor(p.id)}`,
    })),

    ...work.map((w) => ({
      id: `work-${slug(w.org)}`,
      group: "Experience" as const,
      title: `${w.role}, ${w.org}`,
      subtitle: `${w.start} – ${w.end}`,
      keywords: w.points.join(" "),
      href: "#experience",
    })),
    ...education.map((e) => ({
      id: `education-${slug(e.school)}`,
      group: "Experience" as const,
      title: e.school,
      subtitle: e.credential,
      keywords: `education school ${e.note}`,
      href: "#experience",
    })),

    ...services.map((s) => ({
      id: `service-${slug(s.title)}`,
      group: "Skills" as const,
      title: s.title,
      subtitle: "Service",
      keywords: s.description,
      href: "#services",
    })),
    ...skills.flatMap((g) =>
      g.items.map((item) => ({
        id: `skill-${slug(item)}`,
        group: "Skills" as const,
        title: item,
        subtitle: g.group,
        href: "#about",
      }))
    ),

    ...certificateGroups.flatMap((g) =>
      g.certificates.map((c) => ({
        id: `certificate-${slug(c.file)}`,
        group: "Certificates" as const,
        title: c.name,
        subtitle: `${g.issuer}, opens the PDF`,
        href: certificateHref(c),
        external: true,
      }))
    ),

    { id: "action-resume", group: "Actions", title: "Download résumé", subtitle: "PDF", keywords: "cv resume", href: site.resume, download: true },
    { id: "action-email", group: "Actions", title: "Email me", subtitle: site.email, keywords: "contact mail", href: `mailto:${site.email}` },
    { id: "action-copy-email", group: "Actions", title: "Copy email address", subtitle: site.email, keywords: "contact mail clipboard", action: "copy-email" },
    { id: "action-theme", group: "Actions", title: "Switch light or dark theme", keywords: "dark mode light mode appearance", action: "toggle-theme" },
    { id: "action-github", group: "Actions", title: "Open GitHub profile", subtitle: `github.com/${site.github.user}`, keywords: "code repositories", href: site.github.url, external: true },
  ];
}
