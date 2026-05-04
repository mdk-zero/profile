"use client";

import { Terminal } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { SiFedora, SiNeovim, SiZsh } from "react-icons/si";
import { VscTerminalBash } from "react-icons/vsc";

const linuxStack = [
  { icon: SiFedora, label: "Fedora", color: "#51A2DA" },
  { icon: SiNeovim, label: "Neovim", color: "#57A64A" },
  { icon: Terminal, label: "Ghostty", color: "#8B5CF6" },
  { icon: SiZsh, label: "Zsh", color: "#4ADE80" },
  { icon: VscTerminalBash, label: "Bash", color: "#F59E0B" },
];

export function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="about"
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
            <span className="ml-2 text-xs" style={{ color: "var(--p-text-muted)" }}>~/about — bash</span>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: "var(--p-accent)" }}>❯</span>
              <span style={{ color: "var(--p-accent)" }}>whoami</span>
            </div>
            <p style={{ color: "var(--p-text)", fontSize: "0.9rem" }}>Linux Adona — Full Stack Developer</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-lg overflow-hidden" style={{
              background: "var(--p-bg-alt)",
              border: "1px solid var(--p-border)",
            }}>
              <img
                src="profile-pic.jpg"
                alt="Profile"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: "4/5" }}
              />
            </div>
            {/* Decorative terminal element */}
            <motion.div
              className="absolute -bottom-3 -right-3 px-3 py-2 rounded-lg"
              style={{
                background: "var(--p-accent-bg)",
                border: "1px solid var(--p-accent-border)",
              }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span style={{ color: "var(--p-accent)", fontSize: "0.75rem" }}>~/profile</span>
            </motion.div>
          </motion.div>

          {/* Content section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Bio block */}
            <div className="rounded-lg p-5 mb-6" style={{
              background: "var(--p-bg-alt)",
              border: "1px solid var(--p-border)",
            }}>
              <div className="flex items-center gap-2 mb-3">
                <span style={{ color: "var(--p-accent)" }}>❯</span>
                <span style={{ color: "var(--p-accent)" }}>cat bio.txt</span>
              </div>
              <p style={{ color: "var(--p-text-secondary)", fontSize: "0.85rem", lineHeight: 1.8 }}>
                Passionate full-stack developer with ~2 years of experience building scalable web applications. 
                I enjoy creating seamless user experiences that combine beautiful design with secure development.
              </p>
            </div>

            {/* Stats block */}
            <div className="rounded-lg p-5 mb-6" style={{
              background: "var(--p-bg-alt)",
              border: "1px solid var(--p-border)",
            }}>
              <div className="flex items-center gap-2 mb-4">
                <span style={{ color: "var(--p-accent)" }}>❯</span>
                <span style={{ color: "var(--p-accent)" }}>du -sh experience/</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded" style={{ background: "var(--p-bg-card)" }}>
                  <span style={{ color: "var(--p-accent)", fontSize: "1.5rem", fontWeight: 700 }}>2+</span>
                  <p style={{ color: "var(--p-text-muted)", fontSize: "0.7rem" }}>Years</p>
                </div>
                <div className="text-center p-3 rounded" style={{ background: "var(--p-bg-card)" }}>
                  <span style={{ color: "var(--p-accent)", fontSize: "1.5rem", fontWeight: 700 }}>15+</span>
                  <p style={{ color: "var(--p-text-muted)", fontSize: "0.7rem" }}>Projects</p>
                </div>
              </div>
            </div>

            {/* Linux stack block */}
            <div className="rounded-lg p-5" style={{
              background: "var(--p-bg-alt)",
              border: "1px solid var(--p-border)",
            }}>
              <div className="flex items-center gap-2 mb-3">
                <span style={{ color: "var(--p-accent)" }}>❯</span>
                <span style={{ color: "var(--p-accent)" }}>neofetch</span>
              </div>
              <p style={{ color: "var(--p-text-muted)", fontSize: "0.75rem", marginBottom: 12 }}>Daily Linux Workstation:</p>
              <div className="flex flex-wrap gap-2">
                {linuxStack.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded"
                    style={{
                      background: "var(--p-bg-card)",
                      border: "1px solid var(--p-border)",
                    }}
                  >
                    <item.icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                    <span style={{ color: "var(--p-text-secondary)", fontSize: "0.75rem" }}>{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}