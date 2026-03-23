"use client";

import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle, Linkedin, Github, Facebook } from "lucide-react";
import { motion } from "motion/react";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "linuxadona17@gmail.com", href: "mailto:linuxadona17@gmail.com" },
    { icon: MapPin, label: "Location", value: "Balayan, Batangas, Philippines", href: "#" },
  ];

  const socials = [
    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/Linux.Sale.Adona" },
    { icon: Github, label: "GitHub", href: "https://github.com/itslinxad" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
  ];

  const inputStyle = {
    background: "var(--p-input-bg)",
    border: "1px solid var(--p-input-border)",
    color: "var(--p-text)",
    fontSize: "0.9rem",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 transition-colors duration-300"
      style={{ background: "var(--p-bg)" }}
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
            Let&apos;s work together
          </p>
          <h2
            className="mb-4"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "var(--p-text)",
              lineHeight: 1.2,
              transition: "color 0.3s",
            }}
          >
            Get In Touch
          </h2>
          <p style={{ color: "var(--p-text-muted)", maxWidth: 480, margin: "0 auto", fontSize: "0.9rem", lineHeight: 1.7 }}>
            Have a project in mind? I&apos;d love to hear about it. Send me a message and
            I&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <div
              className="p-5 rounded-2xl mb-8"
              style={{
                background: "var(--p-accent-bg)",
                border: "1px solid var(--p-accent-border)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span style={{ color: "var(--p-accent)", fontWeight: 600, fontSize: "0.9rem" }}>
                  Currently Available
                </span>
              </div>
              <p style={{ color: "var(--p-text-muted)", fontSize: "0.8rem", lineHeight: 1.6 }}>
                I&apos;m open to freelance projects, full-time roles, and exciting collaborations.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 block"
                  style={{
                    background: "var(--p-bg-card)",
                    border: "1px solid var(--p-border)",
                    boxShadow: "var(--p-card-shadow)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "var(--p-accent-bg)",
                      border: "1px solid var(--p-accent-border)",
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "var(--p-accent)" }} />
                  </div>
                  <div>
                    <p style={{ color: "var(--p-text-muted)", fontSize: "0.75rem" }}>{label}</p>
                    <p style={{ color: "var(--p-text-secondary)", fontSize: "0.9rem" }}>{value}</p>
                  </div>
                </a>
              ))}
            </div>

            <p className="mb-3" style={{ color: "var(--p-text-muted)", fontSize: "0.8rem" }}>
              Find me on
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
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
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3"
          >
            <div
              className="p-8 rounded-2xl"
              style={{
                background: "var(--p-bg-card)",
                border: "1px solid var(--p-border)",
                boxShadow: "var(--p-card-shadow)",
              }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle className="w-16 h-16 mb-4" style={{ color: "var(--p-accent)" }} />
                  </motion.div>
                  <h3 style={{ color: "var(--p-text)", fontWeight: 600, marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ color: "var(--p-text-muted)", fontSize: "0.9rem" }}>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", budget: "", message: "" });
                    }}
                    className="mt-6 px-5 py-2 rounded-lg transition-colors cursor-pointer"
                    style={{
                      background: "var(--p-accent-bg)",
                      color: "var(--p-accent)",
                      border: "1px solid var(--p-accent-border)",
                      fontSize: "0.85rem",
                    }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label style={{ color: "var(--p-text-secondary)", fontSize: "0.8rem", display: "block", marginBottom: 6 }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Smith"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl outline-none"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ color: "var(--p-text-secondary)", fontSize: "0.8rem", display: "block", marginBottom: 6 }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl outline-none"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ color: "var(--p-text-secondary)", fontSize: "0.8rem", display: "block", marginBottom: 6 }}>
                      Project Budget
                    </label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl outline-none"
                      style={{
                        ...inputStyle,
                        color: form.budget ? "var(--p-text)" : "var(--p-text-muted)",
                      }}
                    >
                      <option value="" disabled>Select a budget range</option>
                      <option value="<5k">Less than $5,000</option>
                      <option value="5k-15k">$5,000 – $15,000</option>
                      <option value="15k-50k">$15,000 – $50,000</option>
                      <option value=">50k">$50,000+</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ color: "var(--p-text-secondary)", fontSize: "0.8rem", display: "block", marginBottom: 6 }}>
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl outline-none resize-none"
                      style={inputStyle}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60 cursor-pointer"
                    style={{
                      background: loading
                        ? "rgba(124, 58, 237, 0.5)"
                        : "linear-gradient(135deg, #7c3aed, #4f46e5)",
                      boxShadow: "0 0 24px var(--p-accent-glow)",
                      fontSize: "0.9rem",
                      border: "none",
                    }}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
