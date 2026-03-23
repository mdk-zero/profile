"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { ArrowDown, Github, Linkedin, Twitter, Download } from "lucide-react";
import { motion } from "motion/react";

const roles = [
  "Full-Stack Developer",
  "UI/UX Designer",
  "React Specialist",
  "Problem Solver",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tick = useCallback(() => {
    const current = roles[roleIndex];

    if (typing) {
      if (displayed.length < current.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, 70);
      } else {
        timeoutRef.current = setTimeout(() => {
          setTyping(false);
        }, 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 40);
      } else {
        timeoutRef.current = setTimeout(() => {
          setRoleIndex((i) => (i + 1) % roles.length);
          setTyping(true);
        }, 300);
      }
    }
  }, [displayed, typing, roleIndex]);

  useEffect(() => {
    tick();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [tick]);

  const scrollDown = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-300"
      style={{ background: "var(--p-bg)" }}
    >
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle, #7c3aed, transparent)",
          opacity: "var(--p-blob-opacity)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle, #4f46e5, transparent)",
          opacity: "calc(var(--p-blob-opacity) * 0.75)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: `linear-gradient(var(--p-grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--p-grid-color) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: "var(--p-grid-opacity)",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8"
          style={{
            borderColor: "var(--p-accent-border)",
            background: "var(--p-accent-bg)",
            color: "var(--p-accent)",
            fontSize: "0.8rem",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for new projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 800,
            color: "var(--p-text)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            transition: "color 0.3s",
          }}
        >
          Hi, I&apos;m{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #6366f1, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Your Name
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 h-12 flex items-center justify-center"
          style={{ fontSize: "clamp(1.2rem, 3vw, 1.75rem)", color: "var(--p-text-secondary)", transition: "color 0.3s" }}
        >
          <span>{displayed}</span>
          <span className="ml-1 w-0.5 h-8 animate-pulse inline-block" style={{ background: "var(--p-accent)" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 max-w-xl mx-auto"
          style={{ color: "var(--p-text-muted)", lineHeight: 1.8, fontSize: "1rem", transition: "color 0.3s" }}
        >
          I craft beautiful, high-performance web experiences that help businesses grow.
          Specializing in React, Node.js, and modern design systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <button
            onClick={() => {
              const el = document.getElementById("projects");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-7 py-3.5 rounded-xl text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              boxShadow: "0 0 30px var(--p-accent-glow)",
              fontSize: "0.9rem",
            }}
          >
            View My Work
          </button>
          <button
            className="px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
            style={{
              background: "var(--p-bg-card)",
              border: "1px solid var(--p-border)",
              color: "var(--p-text)",
              fontSize: "0.9rem",
            }}
          >
            <Download className="w-4 h-4" />
            Download CV
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Twitter, href: "#", label: "Twitter" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "var(--p-bg-card)",
                border: "1px solid var(--p-border)",
                color: "var(--p-text-secondary)",
              }}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
        style={{ color: "var(--p-scroll-hint)" }}
      >
        <span style={{ fontSize: "0.75rem" }}>Scroll down</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
