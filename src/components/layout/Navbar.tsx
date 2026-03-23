"use client";

import { useState, useEffect } from "react";
import { Menu, X, Code2, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? {
              background: "var(--p-nav-bg)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 1px 24px var(--p-shadow)",
              borderBottom: "1px solid var(--p-nav-border)",
            }
          : { background: "transparent" }
      }
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span style={{ color: "var(--p-logo-text)", fontWeight: 700, fontSize: "1.1rem", transition: "color 0.3s" }}>
            linuxadona<span style={{ color: "var(--p-accent)" }}>.</span>dev
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              style={{ color: "var(--p-text-secondary)", fontSize: "0.9rem", transition: "color 0.2s", background: "none", border: "none", cursor: "pointer" }}
              className="relative group"
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 rounded-full"
                style={{ background: "var(--p-accent)" }}
              />
            </button>
          ))}

          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
            style={{
              background: "var(--p-accent-bg)",
              border: "1px solid var(--p-accent-border)",
              color: "var(--p-accent)",
            }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => handleNavClick("#contact")}
            className="px-5 py-2 rounded-lg text-white transition-colors duration-200 shadow-md cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              boxShadow: "0 4px 12px var(--p-accent-glow)",
              fontSize: "0.875rem",
            }}
          >
            Hire Me
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
            style={{
              background: "var(--p-accent-bg)",
              border: "1px solid var(--p-accent-border)",
              color: "var(--p-accent)",
            }}
          >
            {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <button
            style={{ color: "var(--p-text)", background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="md:hidden backdrop-blur-xl px-6 py-4 flex flex-col gap-4"
          style={{
            background: "var(--p-mobile-bg)",
            borderTop: "1px solid var(--p-border-subtle)",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-left py-2 cursor-pointer"
              style={{
                color: "var(--p-text-secondary)",
                background: "none",
                border: "none",
                borderBottom: "1px solid var(--p-border-subtle)",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("#contact")}
            className="w-full py-3 rounded-lg text-white cursor-pointer"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", border: "none" }}
          >
            Hire Me
          </button>
        </div>
      )}
    </nav>
  );
}
