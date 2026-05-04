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
          <span style={{ color: "var(--p-text-muted)", fontSize: "0.85rem", fontFamily: "var(--font-geist-mono)" }}>
            mdk0
          </span>
        </div>

        <p
          className="flex items-center gap-1.5"
          style={{ color: "var(--p-text-muted)", fontSize: "0.8rem", fontFamily: "var(--font-geist-mono)" }}
        >
          © {year} Linux Adona
        </p>

        <div className="flex gap-5">
          {[
            { label: "About", id: "about" },
            { label: "Services", id: "skills" },
            { label: "Projects", id: "projects" },
            { label: "Contact", id: "contact" },
          ].map((link) => (
            <button
              key={link.label}
              onClick={() => {
                const el = document.getElementById(link.id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ color: "var(--p-text-muted)", fontSize: "0.8rem", transition: "color 0.2s", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-geist-mono)" }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
