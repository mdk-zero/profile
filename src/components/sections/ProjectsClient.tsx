"use client";

import { ExternalLink, Github, Star } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-lg overflow-hidden flex flex-col font-mono"
      style={{
        background: "var(--p-bg-alt)",
        border: "1px solid var(--p-border)",
      }}
    >
      {/* Image container */}
      <div className="relative" style={{ aspectRatio: "16/9" }}>
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {/* Overlay with project number */}
        <div className="absolute top-2 left-2 px-2 py-1 rounded text-xs" style={{ 
          background: "var(--p-accent-bg)", 
          color: "var(--p-accent)",
          border: "1px solid var(--p-accent-border)"
        }}>
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </div>
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-2 right-2 px-3 py-1.5 rounded flex items-center gap-1.5 text-xs" style={{ 
            background: "#22c55e", 
            color: "#fff"
          }}>
            <Star className="w-3.5 h-3.5" />
            <span>Featured</span>
          </div>
        )}
        {/* Links on hover */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 hover:opacity-100 transition-opacity" style={{ background: "rgba(0,0,0,0.7)" }}>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
            style={{ background: "var(--p-accent)", color: "#fff" }}
          >
            <ExternalLink className="w-4 h-4" />
            Live
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
            style={{ background: "var(--p-bg-card)", color: "var(--p-text)" }}
          >
            <Github className="w-4 h-4" />
            Code
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Project name as command */}
        <div className="flex items-center gap-2 mb-2">
          <span style={{ color: "var(--p-accent)" }}>❯</span>
          <span style={{ color: "var(--p-accent)", fontWeight: 600, fontSize: "0.9rem" }}>./{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
        </div>
        
        <p style={{ color: "var(--p-text-muted)", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: 12 }}>
          {project.description}
        </p>
        
        {/* Tags as installed packages */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs"
              style={{
                background: "var(--p-bg-card)",
                border: "1px solid var(--p-border)",
                color: "var(--p-text-secondary)",
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

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 px-4 sm:px-6 transition-colors duration-300 font-mono"
      style={{ background: "var(--p-bg)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Terminal-style header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 rounded-lg overflow-hidden"
          style={{
            background: "var(--p-bg-alt)",
            border: "1px solid var(--p-border)",
          }}
        >
          <div className="flex items-center gap-2 px-4 py-2" style={{ background: "var(--p-accent-bg)", borderBottom: "1px solid var(--p-border)" }}>
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#eab308" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
            <span className="ml-2 text-xs" style={{ color: "var(--p-text-muted)" }}>~/projects — bash</span>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: "var(--p-accent)" }}>❯</span>
              <span style={{ color: "var(--p-accent)" }}>ls -la ./projects/</span>
            </div>
            <p style={{ color: "var(--p-text-muted)", fontSize: "0.8rem" }}>Found {projects.length} project(s)</p>
          </div>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Footer link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <a
            href="https://www.github.com/itslinxad?tab=repositories"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{
              background: "var(--p-accent-bg)",
              border: "1px solid var(--p-accent-border)",
              color: "var(--p-accent)",
              fontSize: "0.8rem",
            }}
          >
            <Github className="w-4 h-4" />
            View all on GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  );
}