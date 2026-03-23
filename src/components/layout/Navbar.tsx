"use client";

import { useState, useEffect } from "react";
import { Menu, X, Code2, Sun, Moon } from "lucide-react";
import { motion } from "motion/react";
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
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href.slice(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Logo - visible on top left */}
      <div
        className="fixed top-6 left-6 z-50"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-all duration-300 group-hover:scale-110">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span 
            style={{ 
              color: "var(--p-logo-text)", 
              fontWeight: 700, 
              fontSize: "1.1rem", 
              transition: "color 0.3s" 
            }}
            className="group-hover:text-[var(--p-accent)] transition-colors duration-300 hidden sm:block"
          >
            linuxadona<span style={{ color: "var(--p-accent)" }}>.</span>dev
          </span>
        </button>
      </div>

      {/* Theme toggle, Hire Me, and Mobile menu - top right */}
      <div className="fixed top-6 right-4 z-50 flex items-center gap-2">
        <button
          onClick={() => handleNavClick("#contact")}
          className="px-4 py-2 rounded-full text-white text-sm font-medium transition-all duration-300 cursor-pointer relative overflow-hidden group hidden sm:block"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
            boxShadow: "0 4px 15px var(--p-accent-glow)",
          }}
        >
          <span className="relative z-10">Hire Me</span>
          <motion.div 
            className="absolute inset-0 bg-white/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
        </button>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
          style={{
            background: "var(--p-accent-bg)",
            border: "1px solid var(--p-accent-border)",
            color: "var(--p-accent)",
          }}
          aria-label="Toggle theme"
        >
          <motion.div
            className="transition-transform duration-500"
            animate={{ rotate: theme === "dark" ? 0 : 180 }}
            whileHover={{ rotate: 360 }}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.div>
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-9 h-9 md:hidden rounded-lg flex items-center justify-center transition-transform duration-300 cursor-pointer"
          style={{ color: "var(--p-text)" }}
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Floating vertical nav - right side */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex">
        <motion.div
          className="flex flex-col items-end gap-3 py-6 pr-4 pl-6 rounded-l-2xl"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.08))",
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="relative group cursor-pointer px-3 py-1.5 rounded-lg transition-all duration-300"
              >
                <motion.span 
                  className="text-sm font-medium transition-all duration-300 block"
                  style={{ 
                    color: isActive ? "var(--p-accent)" : "var(--p-text-secondary)",
                    textShadow: isActive ? "0 0 20px var(--p-accent)" : "none",
                  }}
                  animate={{
                    fontSize: isActive ? "1.25rem" : "1rem",
                    fontWeight: isActive ? 600 : 500,
                  }}
                  transition={{ duration: 0.1 }}
                >
                  {link.label}
                </motion.span>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Mobile menu with slide animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out fixed top-16 left-0 right-0 z-40 ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="mx-4 p-4 flex flex-col gap-3 rounded-xl"
          style={{
            background: "var(--p-mobile-bg)",
            border: "1px solid var(--p-border-subtle)",
          }}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 flex items-center gap-3"
                style={{
                  background: isActive ? "var(--p-accent-bg)" : "transparent",
                  color: isActive ? "var(--p-accent)" : "var(--p-text-secondary)",
                  border: isActive ? "1px solid var(--p-accent-border)" : "1px solid transparent",
                }}
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{ 
                    background: isActive ? "var(--p-accent)" : "transparent",
                    boxShadow: isActive ? "0 0 8px var(--p-accent)" : "none",
                  }}
                />
                {link.label}
              </button>
            );
          })}
          <button
            onClick={() => handleNavClick("#contact")}
            className="w-full py-3 rounded-xl text-white cursor-pointer mt-2"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", border: "none" }}
          >
            Hire Me
          </button>
        </div>
      </div>
    </>
  );
}
