"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Globe, Cpu, Palette, ArrowRight } from "lucide-react";
import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaGitAlt,
  FaFigma,
  FaJava,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiMysql,
  SiMongodb,
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
    description: "I build fast, responsive, and visually appealing  websites and web applications aligned to your needs.",
    features: ["Custom Websites", "Web Applications", "Landing Pages", "E-commerce"],
    iconColor: "#8b5cf6",
  },
  {
    title: "Arduino Projects",
    icon: Cpu,
    description: "From prototypes to fully functional hardware solutions, I bring your electronic ideas to life.",
    features: ["IoT Solutions", "Prototyping", "Sensor Integration", "Automation"],
    iconColor: "#6366f1",
  },
  {
    title: "UI/UX Design",
    icon: Palette,
    description: "Creating intuitive and beautiful user interfaces that provide satisfactory experiences.",
    features: ["Wireframing", "Prototyping", "User Research", "Design Systems"],
    iconColor: "#a78bfa",
  },
];

const techStack = [
  { name: "React", icon: FaReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript", icon: FaJs },
  { name: "Node.js", icon: FaNodeJs },
  { name: "Python", icon: SiPython },
  { name: "Java", icon: FaJava },
  { name: "C++", icon: SiCplusplus },
  { name: "PHP", icon: SiPhp },
  { name: "Laravel", icon: SiLaravel },
  { name: "MySQL", icon: SiMysql },
  { name: "MongoDB", icon: SiMongodb },
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
      className="py-24 px-6 transition-colors duration-300 relative overflow-hidden"
      style={{ background: "var(--p-bg)" }}
    >
      {/* Background decorations */}
      <motion.div
        className="absolute top-20 left-0 w-96 h-96 rounded-full blur-[150px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.08), transparent)",
          opacity: isInView ? 1 : 0,
        }}
      />
      <motion.div
        className="absolute bottom-20 right-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.08), transparent)",
          opacity: isInView ? 1 : 0,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
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
          />
          <p
            className="mb-3"
            style={{
              color: "var(--p-accent)",
              fontSize: "0.85rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            What I offer
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              color: "var(--p-text)",
            }}
          >
            Services I Provide
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: "var(--p-text-muted)" }}>
            I specialize in creating digital solutions that combine functionality with aesthetics,
            helping you bring your vision to life.
          </p>
        </motion.div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-8 rounded-2xl overflow-hidden"
              style={{
                background: "var(--p-bg-card)",
                border: "1px solid var(--p-border)",
              }}
            >
              {/* Gradient glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${service.iconColor}15, transparent 60%)`,
                }}
              />

              {/* Icon */}
              <motion.div
                className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center relative"
                style={{
                  background: `${service.iconColor}15`,
                  border: `1px solid ${service.iconColor}30`,
                }}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <service.icon className="w-8 h-8" style={{ color: service.iconColor }} />
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--p-text)" }}>
                {service.title}
              </h3>

              {/* Description */}
              <p className="mb-6 text-sm leading-relaxed" style={{ color: "var(--p-text-muted)" }}>
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: service.iconColor }}
                    />
                    <span className="text-sm" style={{ color: "var(--p-text-secondary)" }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Arrow indicator */}
              <motion.div
                className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ color: service.iconColor }}
                whileHover={{ x: 5 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="mb-6 text-sm font-medium" style={{ color: "var(--p-text-muted)" }}>
            Technologies I work with
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.9 + i * 0.05 }}
                whileHover={{ scale: 1.1, y: -3 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
                style={{
                  background: "var(--p-bg-card)",
                  border: "1px solid var(--p-border)",
                }}
              >
                <tech.icon className="w-5 h-5" style={{ color: "var(--p-accent)" }} />
                <span className="text-sm font-medium" style={{ color: "var(--p-text)" }}>
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
