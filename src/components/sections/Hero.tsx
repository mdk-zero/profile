"use client";

import { useEffect, useState, useRef } from "react";
import { Github, Download } from "lucide-react";
import { FaFacebookF } from "react-icons/fa";
import { motion, useScroll, useTransform } from "motion/react";

interface StartupLine {
  text: string;
  type: "info" | "success" | "loading" | "progress" | "done";
  duration?: number;
}

export function Hero() {
  const [startupLines, setStartupLines] = useState<StartupLine[]>([]);
  const [progress, setProgress] = useState(0);
  const [showMain, setShowMain] = useState(false);
  const [locked, setLocked] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const startedRef = useRef(false);

  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const startupSequence: StartupLine[] = [
    { text: "Initializing portfolio shell...", type: "loading", duration: 800 },
    { text: "Loading modules...", type: "loading", duration: 600 },
    { text: "[✓] react-core loaded", type: "success", duration: 400 },
    { text: "[✓] motion-ui loaded", type: "success", duration: 400 },
    { text: "[✓] lucide-icons loaded", type: "success", duration: 400 },
    { text: "Processing dependencies...", type: "loading", duration: 700 },
    { text: "Installing packages...", type: "progress", duration: 1500 },
    { text: "Build complete. Welcome to my portfolio.", type: "info", duration: 300 },
  ];

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const runStartup = async () => {
      for (let i = 0; i < startupSequence.length; i++) {
        if (startupSequence[i].type === "progress") {
          setStartupLines(prev => [...prev, startupSequence[i]]);
          setProgress(0);
          for (let p = 0; p <= 100; p += 5) {
            await new Promise(resolve => setTimeout(resolve, 80));
            setProgress(p);
          }
        } else {
          await new Promise(resolve => setTimeout(resolve, startupSequence[i].duration || 500));
          setStartupLines(prev => [...prev, startupSequence[i]]);
        }
      }
      await new Promise(resolve => setTimeout(resolve, 400));
      setShowMain(true);
    };

    runStartup();
  }, []);

  useEffect(() => {
    if (showMain) {
      setLocked(false);
    }
  }, [showMain]);

  useEffect(() => {
    if (locked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [locked]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 p-4"
      style={{ background: "var(--p-bg)" }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(var(--p-grid-color) 1px, transparent 1px), 
            linear-gradient(90deg, var(--p-grid-color) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: "var(--p-grid-opacity)",
        }}
      />

      {/* Main terminal content */}
      <motion.div
        className="relative z-10 w-full max-w-3xl"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg overflow-hidden"
          style={{
            background: "rgba(10, 10, 15, 0.95)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            boxShadow: "0 0 40px rgba(139, 92, 246, 0.15)",
          }}
        >
          {/* Terminal header */}
          <div
            className="flex items-center gap-2 px-4 py-2"
            style={{ background: "rgba(139, 92, 246, 0.15)" }}
          >
            <div className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#eab308" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#22c55e" }} />
            <span
              className="ml-2 text-sm font-mono"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              ~/portfolio — zsh
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-6 font-mono text-sm sm:text-base min-h-[320px]">
            {/* Startup sequence */}
            {startupLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-1"
              >
                {line.type === "loading" && (
                  <div className="flex items-center gap-2">
                    <span style={{ color: "#fbbf24" }}>●</span>
                    <span style={{ color: "#94a3b8" }}>{line.text}</span>
                  </div>
                )}
                {line.type === "success" && (
                  <div className="flex items-center gap-2">
                    <span style={{ color: "#22c55e" }}>{line.text}</span>
                  </div>
                )}
                {line.type === "done" && (
                  <div className="flex items-center gap-2">
                    <span style={{ color: "#22c55e" }}>{line.text}</span>
                  </div>
                )}
                {line.type === "progress" && (
                  <div className="flex flex-col gap-1">
                    <span style={{ color: "#94a3b8" }}>{line.text}</span>
                    <div className="flex items-center gap-2">
                      <span style={{ color: "#fbbf24" }}>[</span>
                      <span style={{ color: "#22c55e", fontSize: "0.85em" }}>
                        {(() => {
                          const filled = Math.round(progress / 2.5);
                          const empty = 40 - filled;
                          return "▓".repeat(filled) + "░".repeat(empty) + ` ${progress}%`;
                        })()}
                      </span>
                      <span style={{ color: "#fbbf24" }}>]</span>
                    </div>
                  </div>
                )}
                {line.type === "info" && (
                  <div className="flex items-center gap-2">
                    <span style={{ color: "#60a5fa" }}>ℹ</span>
                    <span style={{ color: "#e2e8f0" }}>{line.text}</span>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Main content after startup */}
            {showMain && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Prompt */}
                <div className="flex items-center gap-2 mt-4 mb-2">
                  <span className="text-lg" style={{ color: "#a78bfa" }}>❯</span>
                  <span style={{ color: "#8b5cf6" }}>whoami</span>
                </div>

                {/* Output */}
                <div className="pl-6 mb-4">
                  <span style={{ color: "#e2e8f0" }}>Linux Adona — Full Stack Developer</span>
                </div>

                {/* Prompt again */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg" style={{ color: "#a78bfa" }}>❯</span>
                  <span style={{ color: "#8b5cf6" }}>cat skills.txt</span>
                </div>

                {/* Skills output */}
                <div className="pl-6 mb-4">
                  <div style={{ color: "#94a3b8" }}>
                    <span style={{ color: "#22c55e" }}>PHP</span> • <span style={{ color: "#22c55e" }}>TypeScript</span> • <span style={{ color: "#22c55e" }}>React</span>
                  </div>
                  <div style={{ color: "#94a3b8" }}>
                    <span style={{ color: "#22c55e" }}>Node.js</span> • <span style={{ color: "#22c55e" }}>Next.js</span> • <span style={{ color: "#22c55e" }}>Python</span>
                  </div>
                </div>

                {/* Prompt again */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg" style={{ color: "#a78bfa" }}>❯</span>
                  <span style={{ color: "#8b5cf6" }}>echo "Hello, World."</span>
                </div>

                {/* Echo output */}
                <div className="pl-6 mb-6">
                  <span style={{ color: "#e2e8f0" }}>{"Hello, World."}</span>
                </div>

                {/* Links */}
                <div className="flex gap-4 pl-6 flex-wrap">
                  <motion.a
                    href="https://www.github.com/itslinxad/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded transition-all duration-300"
                    style={{
                      background: "rgba(139, 92, 246, 0.1)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      color: "#a78bfa",
                    }}
                    whileHover={{
                      background: "rgba(139, 92, 246, 0.2)",
                      borderColor: "rgba(139, 92, 246, 0.5)",
                    }}
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </motion.a>

                  <motion.a
                    href="https://www.facebook.com/Linux.Sale.Adona"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded transition-all duration-300"
                    style={{
                      background: "rgba(139, 92, 246, 0.1)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      color: "#a78bfa",
                    }}
                    whileHover={{
                      background: "rgba(139, 92, 246, 0.2)",
                      borderColor: "rgba(139, 92, 246, 0.5)",
                    }}
                  >
                    <FaFacebookF className="w-4 h-4" />
                    <span>Facebook</span>
                  </motion.a>

                  <motion.button
                    className="flex items-center gap-2 px-3 py-2 rounded transition-all duration-300"
                    style={{
                      background: "rgba(139, 92, 246, 0.1)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      color: "#a78bfa",
                    }}
                    whileHover={{
                      background: "rgba(139, 92, 246, 0.2)",
                      borderColor: "rgba(139, 92, 246, 0.5)",
                    }}
                  >
                    <Download className="w-4 h-4" />
                    <span>CV</span>
                  </motion.button>
                </div>

                {/* Cursor */}
                <div className="mt-6 flex items-center gap-2">
                  <span className="text-lg" style={{ color: "#a78bfa" }}>❯</span>
                  <motion.span
                    className="w-2 h-4 inline-block"
                    style={{ background: "#a78bfa" }}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Hint text */}
        {showMain && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6 text-sm font-mono"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            scroll down to explore ↓
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
