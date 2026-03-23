"use client";

import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const projects = [
  {
    id: 1,
    title: "SaaS Analytics Dashboard",
    description:
      "A real-time analytics platform with interactive charts, user management, and advanced reporting built for enterprise clients.",
    image: "https://images.unsplash.com/photo-1641567535859-c58187ac4954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBhcHAlMjBkYXNoYm9hcmQlMjBVSSUyMGRlc2lnbnxlbnwxfHx8fDE3NzQxOTQ4MTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "E-Commerce Mobile App",
    description:
      "A full-featured mobile shopping app with real-time inventory, seamless checkout, and personalized recommendations.",
    image: "https://images.unsplash.com/photo-1721864428881-dbabb9ea0017?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBlY29tbWVyY2UlMjBkZXNpZ258ZW58MXx8fHwxNzc0MTk0ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React Native", "GraphQL", "Stripe", "Firebase"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Data Visualization Tool",
    description:
      "An interactive data visualization platform that transforms complex datasets into actionable, beautiful insights.",
    image: "https://images.unsplash.com/photo-1758876202919-4d2fbedcf23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwdmlzdWFsaXphdGlvbiUyMHByb2plY3R8ZW58MXx8fHwxNzc0MTcxMjMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["D3.js", "React", "Python", "AWS"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "var(--p-bg-card)",
        border: "1px solid var(--p-border)",
        boxShadow: "var(--p-card-shadow)",
        transition: "border-color 0.3s, box-shadow 0.3s, transform 0.2s",
      }}
      whileHover={{ y: -4 }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4"
          style={{ background: "var(--p-overlay)", backdropFilter: "blur(4px)" }}
        >
          <a
            href={project.liveUrl}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all duration-200 hover:scale-105"
            style={{ background: "rgba(124, 58, 237, 0.85)", fontSize: "0.85rem" }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Demo
          </a>
          <a
            href={project.githubUrl}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              background: "var(--p-bg-card)",
              border: "1px solid var(--p-border)",
              color: "var(--p-text)",
              fontSize: "0.85rem",
            }}
          >
            <Github className="w-3.5 h-3.5" />
            Code
          </a>
        </div>
        {project.featured && (
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(124, 58, 237, 0.9)",
              backdropFilter: "blur(8px)",
              fontSize: "0.7rem",
              color: "#fff",
              letterSpacing: "0.05em",
            }}
          >
            Featured
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="mb-2" style={{ color: "var(--p-text)", fontWeight: 600, fontSize: "1rem" }}>
          {project.title}
        </h3>
        <p className="mb-4 flex-1" style={{ color: "var(--p-text-muted)", fontSize: "0.85rem", lineHeight: 1.6 }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md"
              style={{
                background: "var(--p-accent-bg)",
                border: "1px solid var(--p-accent-border)",
                color: "var(--p-tag)",
                fontSize: "0.75rem",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="py-24 px-6 transition-colors duration-300"
      style={{ background: "var(--p-bg-alt)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p
            className="mb-3"
            style={{
              color: "var(--p-accent)",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            My work
          </p>
          <h2
            className="mb-4"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "var(--p-text)",
              lineHeight: 1.2,
              transition: "color 0.3s",
            }}
          >
            Featured Projects
          </h2>
          <p style={{ color: "var(--p-text-muted)", maxWidth: 480, margin: "0 auto", fontSize: "0.9rem" }}>
            A selection of projects that showcase my technical skills and design approach.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 group"
            style={{ color: "var(--p-accent)", fontSize: "0.9rem" }}
          >
            View all projects on GitHub
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
