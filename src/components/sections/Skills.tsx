"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

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
  "Express", "MySQL", "MongoDB", "Tailwind", "Figma", "Git",
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span style={{ color: "var(--p-text-secondary)", fontSize: "0.85rem" }}>{name}</span>
        <motion.span 
          style={{ color: "var(--p-text-muted)", fontSize: "0.8rem" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
        >
          {level}%
        </motion.span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden relative"
        style={{ background: "var(--p-skill-track)" }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ 
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            boxShadow: `0 0 10px ${color}40`,
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Shimmer effect */}
        <motion.div
          className="absolute top-0 left-0 h-full w-full rounded-full"
          animate={isInView ? {
            backgroundPosition: ["200% 0", "-200% 0"],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            backgroundSize: "200% 100%",
          }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 px-6 transition-colors duration-300 relative overflow-hidden"
      style={{ background: "var(--p-bg)" }}
    >
      {/* Background decorations */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[150px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent)",
          opacity: isInView ? 1 : 0,
        }}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.1), transparent)",
          opacity: isInView ? 1 : 0,
        }}
        transition={{ duration: 1.5, delay: 0.3 }}
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
            What I work with
          </motion.p>
          <motion.h2
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
            Skills & Expertise
          </motion.h2>
        </motion.div>

        {/* Skill cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: catIdx * 0.15 }}
              className="p-6 rounded-2xl relative overflow-hidden group"
              style={{
                background: "var(--p-bg-card)",
                border: "1px solid var(--p-border)",
                boxShadow: "var(--p-card-shadow)",
              }}
              whileHover={{ 
                scale: 1.02,
                borderColor: `${category.color}40`,
                boxShadow: `0 10px 40px rgba(0,0,0,0.1), 0 0 30px ${category.color}10`
              }}
            >
              {/* Hover glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${category.color}15, transparent 70%)`,
                }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${category.color}15`,
                      border: `1px solid ${category.color}30`,
                    }}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ background: category.color }}
                    />
                  </motion.div>
                  <h3 style={{ color: "var(--p-text)", fontWeight: 600 }}>{category.title}</h3>
                </div>
                
                <div className="space-y-1">
                  {category.skills.map((skill, skillIdx) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={category.color}
                      delay={catIdx * 0.15 + skillIdx * 0.1}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech stack tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <motion.p 
            className="mb-6" 
            style={{ color: "var(--p-text-muted)", fontSize: "0.85rem" }}
          >
            Technologies I use regularly
          </motion.p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.05 }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  boxShadow: "0 10px 30px rgba(139, 92, 246, 0.2)"
                }}
                className="px-4 py-2 rounded-lg cursor-default"
                style={{
                  background: "var(--p-bg-card)",
                  border: "1px solid var(--p-border)",
                  color: "var(--p-text-secondary)",
                  fontSize: "0.85rem",
                  boxShadow: "var(--p-card-shadow)",
                }}
              >
                {/* Sparkle effect on hover */}
                <span className="relative">
                  <span className="absolute -top-1 -right-1 w-1 h-1 rounded-full bg-[var(--p-accent)] opacity-0 group-hover:opacity-100" />
                  {tech}
                </span>
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
