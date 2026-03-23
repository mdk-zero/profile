"use client";

import { MapPin, Calendar, Coffee, Award } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const stats = [
  { icon: Calendar, value: "2+", label: "Years Experience" },
  { icon: Award, value: "15+", label: "Projects Delivered" },
  { icon: Coffee, value: "∞", label: "Cups of Coffee" },
  { icon: MapPin, value: "Remote", label: "Based In" },
];

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, type: "spring" }}
    >
      {value}
    </motion.span>
  );
}

export function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 px-6 transition-colors duration-300 relative overflow-hidden"
      style={{ background: "var(--p-bg-alt)" }}
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.15), transparent)",
          opacity: isInView ? 1 : 0,
          transition: "opacity 1s",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-0 w-48 h-48 rounded-full blur-[80px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(79, 70, 229, 0.1), transparent)",
          opacity: isInView ? 1 : 0,
          transition: "opacity 1s delay-0.3s",
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
          {/* Decorative line */}
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
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Get to know me
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
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            About Me
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image section with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, x: -60, rotate: -5 }}
            animate={isInView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-sm">
              {/* Glow effect behind image */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5, #8b5cf6)",
                  transform: "scale(0.95) translateY(15px)",
                  opacity: "var(--p-blob-opacity)",
                  filter: "blur(30px)",
                }}
                animate={{
                  scale: [0.95, 1, 0.95],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Image container */}
              <motion.div
                className="relative rounded-2xl overflow-hidden"
                style={{ border: "1px solid var(--p-accent-border)" }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://scontent.fmnl45-2.fna.fbcdn.net/v/t39.30808-6/615403695_25532891566332818_2839431724438749400_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeGaDCPUKmafCu5_InG3I4rUwxfPWdD6z6rDF89Z0PrPqllNGCed715EQK39Ji5zabSnvbiEbAGTbQ6Btdzwt8iH&_nc_ohc=EZOZJLQ_rwUQ7kNvwFb_-H0&_nc_oc=Adr5z2nYr7mq0OQIHZYF6mIVKh8NZklt761dQYBD6tGvlOSGRUcCmlUEpAZadROcOr9hjBYrsbdo9XSAHeYdmMro&_nc_zt=23&_nc_ht=scontent.fmnl45-2.fna&_nc_gid=Lg4VfYF1eS1Lsigz2NSRFA&_nc_ss=7a32e&oh=00_AfzKXOS86H6mN98RfG4QHiRiDJZ4NiXgNUnRfrcHaZNQfw&oe=69C6FA78"
                  alt="Profile"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: "4/5" }}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/3"
                  style={{ background: "linear-gradient(to top, var(--p-bg-alt), transparent)" }}
                />
              </motion.div>

              {/* Decorative floating elements */}
              <motion.div
                className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-6 sm:w-8 h-6 sm:h-8 rounded-lg border-2"
                style={{ 
                  borderColor: "var(--p-accent)",
                  opacity: 0.3 
                }}
                animate={{
                  rotate: [0, 360],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>

          {/* Content section */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3
              className="mb-4"
              style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--p-text)" }}
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

            <motion.p 
              className="mb-4" 
              style={{ color: "var(--p-text-secondary)", lineHeight: 1.8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              I&apos;m a passionate full-stack developer with around 2 years of experience building
              scalable web applications. I enjoy creating seamless user experiences
              that combine beautiful design with secure development.
            </motion.p>
            <motion.p 
              className="mb-6" 
              style={{ color: "var(--p-text-secondary)", lineHeight: 1.8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to
              open-source projects, or mentoring aspiring developers. I believe great software
              is built with the combination of creativity and technical knowledge.
            </motion.p>

            {/* Stats grid with counter animation */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map(({ icon: Icon, value, label }, index) => (
                <motion.div
                  key={label}
                  className="p-4 rounded-xl relative overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: "var(--p-accent-border)"
                  }}
                  style={{
                    background: "var(--p-bg-card)",
                    border: "1px solid var(--p-border)",
                    boxShadow: "var(--p-card-shadow)",
                  }}
                >
                  {/* Hover glow effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(135deg, rgba(124, 58, 237, 0.1), transparent)",
                    }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4" style={{ color: "var(--p-accent)" }} />
                      <span style={{ color: "var(--p-text)", fontWeight: 700, fontSize: "1.1rem" }}>
                        <AnimatedCounter value={value} />
                      </span>
                    </div>
                    <p style={{ color: "var(--p-text-muted)", fontSize: "0.8rem" }}>{label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
