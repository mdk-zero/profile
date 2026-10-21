import { setup, work } from "@/lib/content";
import { getContributions } from "@/lib/github";
import { getProjects, projectAnchor } from "@/lib/projects";
import { site } from "@/lib/site";
import { PhotoCard } from "./PhotoCard";

// Each audience in the intro links to a real project built for it.
const examples = [
  { label: "businesses", projectId: "Coffee Shop POS and Inventory Management" },
  { label: "students", projectId: "iCARE++" },
  { label: "local government", projectId: "Tuy Government Website" },
];

export async function Hero() {
  // Same request as the commit activity section; Next.js shares one fetch between them.
  const [projects, contributions] = await Promise.all([getProjects(), getContributions()]);

  // The back of the photocard, read like the stats on a trading card.
  const cardDetails = [
    { label: "Based in", value: "Balayan, Batangas" },
    { label: "Local time", value: null },
    { label: "Work", value: work[0].org },
    { label: "Studying", value: "BS IT, Batangas State University" },
    { label: "Stack", value: "Next.js, React, Laravel, PostgreSQL" },
    { label: "Runs on", value: setup.slice(0, 2).join(", ") },
    { label: "Projects", value: "15+ shipped" },
    ...(contributions
      ? [{ label: "Commits", value: `${contributions.total.toLocaleString("en-US")} in the last year` }]
      : []),
  ];

  const example = (index: number) => {
    const { label, projectId } = examples[index];
    if (!projects.some((p) => p.id === projectId)) return label;
    return (
      <a href={`#${projectAnchor(projectId)}`} className="example-link">
        {label}
      </a>
    );
  };

  return (
    <section id="top" className="page overflow-x-clip pt-12 pb-24 md:pt-16 md:pb-32">
      <div className="grid gap-14 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="lg:col-span-7 lg:pt-6">
          {/* The name is the headline; the role is part of it so the page title reads as both. */}
          <h1>
            <span className="block text-[clamp(4.5rem,24vw,11rem)] leading-[0.86] font-bold tracking-[-0.05em] lg:text-[clamp(8rem,12.5vw,11rem)]">
              Linux
              <br />
              Adona
            </span>
            <span className="mt-6 block text-[clamp(1.75rem,1.2rem+1.6vw,2.625rem)] leading-tight font-medium tracking-[-0.02em] md:mt-8">
              Full Stack Developer
            </span>
          </h1>

          <p className="lead mt-8 max-w-[40ch] text-ink md:mt-10 md:text-2xl md:leading-snug">
            I design and build websites and web apps for {example(0)}, {example(1)} and {example(2)}.
          </p>

          <p className="mt-4 max-w-[52ch] text-muted">
            Currently at C2LK Internet Solutions, and studying IT at Batangas State University.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#projects" className="btn btn-primary">
              See projects
            </a>
            <a href="#contact" className="btn btn-secondary">
              Get in touch
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-4">
          <PhotoCard
            name={site.name}
            handle={site.handle}
            role="Full Stack Developer"
            photo={{
              src: "/profile-pic.jpg",
              alt: "Linux Adona seated in a rattan chair in front of framed maps of Balayan Bay",
            }}
            details={cardDetails}
            footer={[site.email, `github.com/${site.github.user}`]}
          />
        </div>
      </div>
    </section>
  );
}
