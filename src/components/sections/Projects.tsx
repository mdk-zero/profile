"use client";

import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Gatherly: Event Management System",
    description:
      "A centralized platform for Event Managers and Venue Owners for planning an event with the help of AI Chatbot with real-time analytics and interactive charts.",
    image: "/Gatherly.png",
    tags: ["JavaScript", "PHP", "MySQL", "Python"],
    liveUrl: "#",
    githubUrl: "https://github.com/itslinxad/Gatherly.git",
    featured: true,
  },
  {
    id: 2,
    title: "Project Two",
    description:
      "Another project description goes here.",
    image: "https://images.unsplash.com/photo-1721864428881-dbabb9ea0017?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBlY29tbWVyY2UlMjBkZXNpZ258ZW58MXx8fHwxNzc0MTk0ODE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React", "Node.js"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Project Three",
    description:
      "Another project description goes here.",
    image: "https://images.unsplash.com/photo-1758876202919-4d2fbedcf23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwdmlzdWFsaXphdGlvbiUyMHByb2plY3R8ZW58MXx8fHwxNzc0MTcxMjMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React", "Python"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, type: "spring", stiffness: 100 }}
      className="group relative rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "var(--p-bg-card)",
        border: "1px solid var(--p-border)",
        boxShadow: "var(--p-card-shadow)",
      }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.05))",
          boxShadow: "inset 0 0 60px rgba(139, 92, 246, 0.1)",
        }}
      />

      {/* Image container with parallax-like effect */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-300"
          style={{ filter: "blur(0px)" }}
          whileHover={{ scale: 1.1 }}
          animate={{ scale: [1, 1.05] }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ background: "rgba(10, 10, 15, 0.5)", backdropFilter: "blur(4px)" }}
        />
        
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, var(--p-bg-alt) 0%, transparent 50%)",
          }}
        />

        {/* Featured badge with animation */}
        {project.featured && (
          <motion.div
            className="absolute top-3 left-3 px-3 py-1.5 rounded-full flex items-center gap-1.5"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.15 }}
            style={{
              background: "rgba(124, 58, 237, 0.9)",
              backdropFilter: "blur(8px)",
              fontSize: "0.7rem",
              color: "#fff",
              letterSpacing: "0.05em",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Featured
          </motion.div>
        )}

        {/* Buttons overlay - visible on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <motion.a
            href={project.liveUrl}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-white"
            whileHover={{ scale: 1.05 }}
            style={{ 
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              fontSize: "0.75rem sm:0.85rem",
              boxShadow: "0 4px 15px rgba(124, 58, 237, 0.4)"
            }}
          >
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            Live Demo
          </motion.a>
          <motion.a
            href={project.githubUrl}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-white"
            whileHover={{ scale: 1.05 }}
            style={{
              background: "rgba(10, 10, 15, 0.8)",
              backdropFilter: "blur(8px)",
              fontSize: "0.75rem sm:0.85rem",
            }}
          >
            <Github className="w-3 h-3 sm:w-4 sm:h-4" />
            GitHub
          </motion.a>
        </motion.div>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 right-0 w-10 h-10 rotate-45 translate-x-5 -translate-y-5" style={{ background: "linear-gradient(135deg, #7c3aed, transparent)" }} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 relative z-10">
        <motion.h3 
          className="mb-2" 
          style={{ color: "var(--p-text)", fontWeight: 600, fontSize: "1.1rem" }}
          whileHover={{ color: "var(--p-accent)" }}
        >
          {project.title}
        </motion.h3>
        <p 
          className="mb-4 flex-1" 
          style={{ color: "var(--p-text-muted)", fontSize: "0.85rem", lineHeight: 1.6 }}
        >
          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              className="px-2.5 py-1 rounded-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + tagIndex * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              style={{
                background: "var(--p-accent-bg)",
                border: "1px solid var(--p-accent-border)",
                color: "var(--p-tag)",
                fontSize: "0.75rem",
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 px-6 transition-colors duration-300 relative overflow-hidden"
      style={{ background: "var(--p-bg-alt)" }}
    >
      {/* Background decorations */}
      <motion.div
        className="absolute top-20 left-0 w-72 h-72 rounded-full blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.12), transparent)",
          opacity: isInView ? 1 : 0,
        }}
      />
      <motion.div
        className="absolute bottom-20 right-0 w-96 h-96 rounded-full blur-[150px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.1), transparent)",
          opacity: isInView ? 1 : 0,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Animated section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="w-16 h-1 mx-auto mb-6 rounded-full"
            style={{ background: "linear-gradient(90deg, #7c3aed, #8b5cf6)" }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p
            className="mb-3"
            style={{
              color: "var(--p-accent)",
              fontSize: "0.85rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            My work
          </motion.p>
          <motion.h2
            className="mb-4"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "var(--p-text)",
              lineHeight: 1.2,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            style={{ color: "var(--p-text-muted)", maxWidth: 480, margin: "0 auto", fontSize: "0.9rem" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            A selection of projects that showcase my technical skills and design approach.
          </motion.p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <motion.a
            href="https://www.github.com/itslinxad?tab=repositories"
            className="inline-flex items-center gap-2 group relative"
            style={{ color: "var(--p-accent)", fontSize: "0.9rem" }}
            whileHover={{ x: 5 }}
          >
            View all projects on GitHub
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            {/* Underline animation */}
            <span 
              className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
              style={{ background: "var(--p-accent)" }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
