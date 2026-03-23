"use client";

import { Code2, Heart } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-8 px-6 transition-colors duration-300"
      style={{
        background: "var(--p-bg-alt)",
        borderTop: "1px solid var(--p-border)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Code2 className="w-3.5 h-3.5 text-white" />
          </div>
          <span style={{ color: "var(--p-text-muted)", fontSize: "0.85rem" }}>
            Portfolio<span style={{ color: "var(--p-accent)" }}>.</span>dev
          </span>
        </div>

        <p
          className="flex items-center gap-1.5"
          style={{ color: "var(--p-text-muted)", fontSize: "0.8rem" }}
        >
          © {year} Your Name · Built with
          <Heart className="w-3 h-3" style={{ color: "var(--p-accent)", fill: "var(--p-accent)" }} />
          using React & Next.js
        </p>

        <div className="flex gap-5">
          {["About", "Skills", "Projects", "Contact"].map((link) => (
            <button
              key={link}
              onClick={() => {
                const el = document.getElementById(link.toLowerCase());
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ color: "var(--p-text-muted)", fontSize: "0.8rem", transition: "color 0.2s", background: "none", border: "none", cursor: "pointer" }}
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
