"use client";

import { MapPin, Calendar, Coffee, Award } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { icon: Calendar, value: "5+", label: "Years Experience" },
  { icon: Award, value: "40+", label: "Projects Delivered" },
  { icon: Coffee, value: "∞", label: "Cups of Coffee" },
  { icon: MapPin, value: "San Francisco", label: "Based In" },
];

export function About() {
  return (
    <section
      id="about"
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
            Get to know me
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
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-sm">
              <div
                className="absolute inset-0 rounded-2xl blur-2xl"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  transform: "scale(0.9) translateY(10px)",
                  opacity: "var(--p-blob-opacity)",
                }}
              />
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ border: "1px solid var(--p-accent-border)" }}
              >
                <img
                  src="https://scontent.fmnl45-2.fna.fbcdn.net/v/t39.30808-6/615403695_25532891566332818_2839431724438749400_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeGaDCPUKmafCu5_InG3I4rUwxfPWdD6z6rDF89Z0PrPqllNGCed715EQK39Ji5zabSnvbiEbAGTbQ6Btdzwt8iH&_nc_ohc=EZOZJLQ_rwUQ7kNvwFb_-H0&_nc_oc=Adr5z2nYr7mq0OQIHZYF6mIVKh8NZklt761dQYBD6tGvlOSGRUcCmlUEpAZadROcOr9hjBYrsbdo9XSAHeYdmMro&_nc_zt=23&_nc_ht=scontent.fmnl45-2.fna&_nc_gid=Lg4VfYF1eS1Lsigz2NSRFA&_nc_ss=7a32e&oh=00_AfzKXOS86H6mN98RfG4QHiRiDJZ4NiXgNUnRfrcHaZNQfw&oe=69C6FA78"
                  alt="Profile"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: "4/5" }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/3"
                  style={{ background: "linear-gradient(to top, var(--p-bg-alt), transparent)" }}
                />
              </div>
              <div
                className="absolute -bottom-4 -right-4 px-4 py-3 rounded-xl"
                style={{
                  background: "var(--p-bg-card)",
                  border: "1px solid var(--p-accent-border)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "var(--p-card-shadow)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span style={{ color: "var(--p-text)", fontSize: "0.8rem" }}>Open to work</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3
              className="mb-4"
              style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--p-text)", transition: "color 0.3s" }}
            >
              Turning Ideas Into{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Digital Reality
              </span>
            </h3>

            <p className="mb-4" style={{ color: "var(--p-text-secondary)", lineHeight: 1.8, transition: "color 0.3s" }}>
              I&apos;m a passionate full-stack developer with over 5 years of experience building
              scalable web applications. I specialize in creating seamless user experiences
              that combine beautiful design with robust engineering.
            </p>
            <p className="mb-6" style={{ color: "var(--p-text-secondary)", lineHeight: 1.8, transition: "color 0.3s" }}>
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to
              open-source projects, or mentoring aspiring developers. I believe great software
              is built at the intersection of creativity and technical excellence.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {["React", "Node.js", "TypeScript", "MySQL", "Figma"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full"
                  style={{
                    background: "var(--p-accent-bg)",
                    border: "1px solid var(--p-accent-border)",
                    color: "var(--p-tag)",
                    fontSize: "0.8rem",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="p-4 rounded-xl"
                  style={{
                    background: "var(--p-bg-card)",
                    border: "1px solid var(--p-border)",
                    boxShadow: "var(--p-card-shadow)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4" style={{ color: "var(--p-accent)" }} />
                    <span style={{ color: "var(--p-text)", fontWeight: 700, fontSize: "1.1rem" }}>{value}</span>
                  </div>
                  <p style={{ color: "var(--p-text-muted)", fontSize: "0.8rem" }}>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
