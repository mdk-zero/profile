"use client";

import { motion } from "motion/react";

const skillCategories = [
  {
    title: "Frontend",
    color: "#8b5cf6",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Figma & Design", level: 80 },
    ],
  },
  {
    title: "Backend",
    color: "#6366f1",
    skills: [
      { name: "Node.js / Express", level: 88 },
      { name: "PostgreSQL", level: 82 },
      { name: "GraphQL", level: 78 },
      { name: "REST APIs", level: 93 },
    ],
  },
  {
    title: "DevOps & Tools",
    color: "#a78bfa",
    skills: [
      { name: "AWS / Cloud", level: 75 },
      { name: "Docker", level: 80 },
      { name: "Git & CI/CD", level: 90 },
      { name: "Testing (Jest)", level: 85 },
    ],
  },
];

const techStack = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js",
  "Express", "MySQL", "MongoDB", "Tailwind",
  "Figma", "Git",
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span style={{ color: "var(--p-text-secondary)", fontSize: "0.85rem" }}>{name}</span>
        <span style={{ color: "var(--p-text-muted)", fontSize: "0.8rem" }}>{level}%</span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "var(--p-skill-track)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="py-24 px-6 transition-colors duration-300"
      style={{ background: "var(--p-bg)" }}
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
            What I work with
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "var(--p-text)",
              lineHeight: 1.2,
              transition: "color 0.3s",
            }}
          >
            Skills & Expertise
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              className="p-6 rounded-2xl"
              style={{
                background: "var(--p-bg-card)",
                border: "1px solid var(--p-border)",
                boxShadow: "var(--p-card-shadow)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-lg"
                  style={{
                    background: `${category.color}18`,
                    border: `1px solid ${category.color}40`,
                  }}
                />
                <h3 style={{ color: "var(--p-text)", fontWeight: 600 }}>{category.title}</h3>
              </div>
              {category.skills.map((skill, skillIdx) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={category.color}
                  delay={catIdx * 0.1 + skillIdx * 0.08}
                />
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="mb-6" style={{ color: "var(--p-text-muted)", fontSize: "0.85rem" }}>
            Technologies I use regularly
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 rounded-lg cursor-default"
                style={{
                  background: "var(--p-bg-card)",
                  border: "1px solid var(--p-border)",
                  color: "var(--p-text-secondary)",
                  fontSize: "0.85rem",
                  boxShadow: "var(--p-card-shadow)",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
