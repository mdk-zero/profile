"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Globe, Cpu, Palette } from "lucide-react";
import {
  FaReact,
  FaGitAlt,
  FaFigma,
  FaJava,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiTailwindcss,
  SiPhp,
  SiLaravel,
  SiPython,
  SiCplusplus,
} from "react-icons/si";

const services = [
  {
    title: "Web Development",
    icon: Globe,
    description: "Building fast, responsive, and visually appealing websites and web applications.",
    command: "ls -la web-services/",
    color: "#8b5cf6",
  },
  {
    title: "Arduino Projects",
    icon: Cpu,
    description: "From prototypes to fully functional hardware solutions.",
    command: "./build-arduino --all",
    color: "#6366f1",
  },
  {
    title: "UI/UX Design",
    icon: Palette,
    description: "Creating intuitive and beautiful user interfaces.",
    command: "figma export design-system",
    color: "#a78bfa",
  },
];

const techStack = [
  { name: "React", icon: FaReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Python", icon: SiPython },
  { name: "Java", icon: FaJava },
  { name: "C++", icon: SiCplusplus },
  { name: "PHP", icon: SiPhp },
  { name: "Laravel", icon: SiLaravel },
  { name: "MySQL", icon: SiMysql },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Supabase", icon: SiSupabase },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Figma", icon: FaFigma },
  { name: "Git", icon: FaGitAlt },
];

export function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 px-4 sm:px-6 transition-colors duration-300 font-mono"
      style={{ background: "var(--p-bg)" }}
    >
      <div className="max-w-4xl mx-auto">
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
            <span className="ml-2 text-xs" style={{ color: "var(--p-text-muted)" }}>~/services — bash</span>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: "var(--p-accent)" }}>❯</span>
              <span style={{ color: "var(--p-accent)" }}>cat services.txt</span>
            </div>
            <p style={{ color: "var(--p-text-muted)", fontSize: "0.8rem" }}>━━━ Services I Provide ━━━</p>
          </div>
        </motion.div>

        {/* Services as terminal blocks */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.15, duration: 0.4 }}
              className="rounded-lg p-5"
              style={{
                background: "var(--p-bg-alt)",
                border: "1px solid var(--p-border)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <service.icon className="w-5 h-5" style={{ color: service.color }} />
                <span style={{ color: "var(--p-text)", fontWeight: 600, fontSize: "0.9rem" }}>{service.title}</span>
              </div>
              <p style={{ color: "var(--p-text-muted)", fontSize: "0.75rem", lineHeight: 1.6, marginBottom: 12 }}>
                {service.description}
              </p>
              <div className="flex items-center gap-2 pt-3" style={{ borderTop: "1px solid var(--p-border)" }}>
                <span style={{ color: service.color, fontSize: "0.7rem" }}>$</span>
                <span style={{ color: "var(--p-text-muted)", fontSize: "0.7rem" }}>{service.command}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech stack terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="rounded-lg overflow-hidden"
          style={{
            background: "var(--p-bg-alt)",
            border: "1px solid var(--p-border)",
          }}
        >
          <div className="flex items-center gap-2 px-4 py-2" style={{ background: "var(--p-accent-bg)", borderBottom: "1px solid var(--p-border)" }}>
            <span className="text-xs" style={{ color: "var(--p-text-muted)" }}>~/tech-stack — bash</span>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span style={{ color: "var(--p-accent)" }}>❯</span>
              <span style={{ color: "var(--p-accent)" }}>echo $STACK</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.03 }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded"
                  style={{
                    background: "var(--p-bg-card)",
                    border: "1px solid var(--p-border)",
                  }}
                >
                  <tech.icon className="w-3.5 h-3.5" style={{ color: "var(--p-accent)" }} />
                  <span style={{ color: "var(--p-text-secondary)", fontSize: "0.75rem" }}>{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}