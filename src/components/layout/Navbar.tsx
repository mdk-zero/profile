"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "@/components/ThemeProvider";
import { useAppContext } from "@/components/AppContext";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();
  const { startupComplete } = useAppContext();

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

  if (!startupComplete) {
    return null;
  }

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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" style={{ filter: "drop-shadow(0 0 6px rgba(255, 255, 255, 0.3))" }}>
            <circle cx="16" cy="16" r="15" fill="#0a0a0f"/>
            <polygon points="24,20 10,20 10,10" fill="white"/>
          </svg>
          <span 
            style={{ 
              color: "var(--p-logo-text)", 
              fontWeight: 700, 
              fontSize: "1.1rem", 
              transition: "color 0.3s" 
            }}
            className="group-hover:text-[var(--p-accent)] transition-colors duration-300 hidden sm:block"
          >
            itslinxad
          </span>
        </button>
      </div>

      {/* Theme toggle and Mobile menu - top right */}
      <div className="fixed top-6 right-4 z-50 flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer"
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
          onClick={() => setIsOpen(!isOpen)}
          className="w-9 h-9 md:hidden rounded-lg flex items-center justify-center cursor-pointer"
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
              <motion.button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="relative group cursor-pointer px-3 py-1.5 rounded-lg"
                whileHover={{ scale: 1.1, x: -4 }}
                transition={{ duration: 0.15 }}
              >
                <motion.span 
                  className="text-sm font-medium block"
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
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0.5 rounded-full"
                  style={{ background: "var(--p-accent)" }}
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.1 }}
                />
              </motion.button>
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
              <motion.button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-3 px-4 rounded-xl cursor-pointer flex items-center gap-3"
                style={{
                  background: isActive ? "var(--p-accent-bg)" : "transparent",
                  color: isActive ? "var(--p-accent)" : "var(--p-text-secondary)",
                  border: isActive ? "1px solid var(--p-accent-border)" : "1px solid transparent",
                }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{ 
                    background: isActive ? "var(--p-accent)" : "transparent",
                    boxShadow: isActive ? "0 0 8px var(--p-accent)" : "none",
                  }}
                />
                {link.label}
              </motion.button>
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
