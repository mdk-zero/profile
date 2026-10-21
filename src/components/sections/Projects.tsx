import Image from "next/image";
import { Breakable } from "@/components/Breakable";
import { Icon } from "@/components/Icon";
import { displayUrl, getProjects, projectAnchor } from "@/lib/projects";
import { site } from "@/lib/site";

export async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" aria-labelledby="projects-title" className="page py-24 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <h2 id="projects-title" className="section-title">
          Projects
        </h2>
        <a href={`${site.github.url}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="link">
          More on GitHub
        </a>
      </div>

      {projects.length === 0 ? (
        <p className="mt-12">No projects published yet.</p>
      ) : (
        <ul className="mt-16 flex flex-col gap-24 md:gap-32">
          {projects.map((project, i) => (
            <li
              key={project.id}
              id={projectAnchor(project.id)}
              className="grid gap-8 md:grid-cols-12 md:gap-10"
            >
              <div className="relative aspect-[16/10] overflow-hidden border border-rule bg-wash md:col-span-7">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  preload={i === 0}
                  sizes="(min-width: 1280px) 700px, (min-width: 768px) 56vw, 100vw"
                  className="object-cover object-top"
                />
              </div>

              <div className="md:col-span-5 md:pt-2">
                <h3 className="text-[clamp(1.5rem,1.25rem+0.9vw,2.25rem)] leading-[1.15] font-bold tracking-[-0.02em]">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-[52ch]">{project.description}</p>

                {project.tags.length > 0 && (
                  <dl className="mt-6 text-base">
                    <dt className="text-muted">Built with</dt>
                    <dd className="mt-1 text-ink">{project.tags.join(", ")}</dd>
                  </dl>
                )}

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-base">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link inline-flex items-center gap-2 [overflow-wrap:anywhere]"
                    >
                      <Icon name="globe" />
                      <Breakable text={displayUrl(project.liveUrl)} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link inline-flex items-center gap-2"
                    >
                      <Icon name="github" />
                      Source code
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
