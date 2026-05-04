"use client";

import { useState, useRef, useEffect } from "react";
import { Mail, Github, Facebook, MapPin, Star, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useTheme } from "@/components/ThemeProvider";

const WEB3FORMS_SITE_KEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

export function Contact() {
  const { theme } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<HCaptcha>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!captchaToken) {
      setError("Please complete the CAPTCHA.");
      setLoading(false);
      return;
    }

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        setError("Form not configured.");
        setLoading(false);
        return;
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          to: "linuxadona17@gmail.com",
          "h-captcha-response": captchaToken,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setCaptchaToken("");
        captchaRef.current?.resetCaptcha();
      } else {
        setError("Something went wrong.");
      }
    } catch {
      setError("Something went wrong.");
    }
    setLoading(false);
  };

  const inputStyle = {
    background: "var(--p-bg)",
    border: "1px solid var(--p-border)",
    color: "var(--p-text)",
    fontSize: "0.85rem",
    fontFamily: "monospace",
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 transition-colors duration-300 font-mono"
      style={{ background: "var(--p-bg)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Terminal-style header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            <span className="ml-2 text-xs" style={{ color: "var(--p-text-muted)" }}>~/contact — bash</span>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: "var(--p-accent)" }}>❯</span>
              <span style={{ color: "var(--p-accent)" }}>send mail --help</span>
            </div>
            <p style={{ color: "var(--p-text-muted)", fontSize: "0.8rem" }}>Send a message and I'll get back to you within 24 hours.</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Contact info as terminal output */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-3"
          >
            <div className="rounded-lg p-4" style={{ background: "var(--p-bg-alt)", border: "1px solid var(--p-border)" }}>
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: "var(--p-accent)" }}>❯</span>
                <span style={{ color: "var(--p-accent)" }}>echo $CONTACT_INFO</span>
              </div>
              <div className="space-y-3">
                <a
                  href="mailto:linuxadona17@gmail.com"
                  className="flex items-center gap-3 p-2 rounded"
                  style={{ background: "var(--p-bg-card)" }}
                >
                  <Mail className="w-4 h-4" style={{ color: "var(--p-accent)" }} />
                  <span style={{ color: "var(--p-text-secondary)", fontSize: "0.8rem" }}>linuxadona17@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 p-2" style={{ background: "var(--p-bg-card)" }}>
                  <MapPin className="w-4 h-4" style={{ color: "var(--p-accent)" }} />
                  <span style={{ color: "var(--p-text-secondary)", fontSize: "0.8rem" }}>Balayan, Batangas, PH</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="rounded-lg p-4" style={{ background: "var(--p-bg-alt)", border: "1px solid var(--p-border)" }}>
              <div className="flex items-center gap-2 mb-3">
                <span style={{ color: "var(--p-accent)" }}>❯</span>
                <span style={{ color: "var(--p-accent)" }}>ls ./socials/</span>
              </div>
              <div className="flex gap-2">
                <a
                  href="https://www.facebook.com/Linux.Sale.Adona"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded"
                  style={{
                    background: "var(--p-bg-card)",
                    border: "1px solid var(--p-border)",
                    color: "var(--p-text-secondary)",
                  }}
                >
                  <Facebook className="w-4 h-4" />
                  <span style={{ fontSize: "0.75rem" }}>Facebook</span>
                </a>
                <a
                  href="https://github.com/itslinxad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded"
                  style={{
                    background: "var(--p-bg-card)",
                    border: "1px solid var(--p-border)",
                    color: "var(--p-text-secondary)",
                  }}
                >
                  <Github className="w-4 h-4" />
                  <span style={{ fontSize: "0.75rem" }}>GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form as terminal input */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="rounded-lg p-5" style={{ background: "var(--p-bg-alt)", border: "1px solid var(--p-border)" }}>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <CheckCircle className="w-8 h-8" style={{ color: "#22c55e" }} />
                    <span style={{ color: "var(--p-text)", fontSize: "1.2rem" }}>Message Sent!</span>
                  </div>
                  <p style={{ color: "var(--p-text-muted)", fontSize: "0.85rem", marginBottom: 16 }}>
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded"
                    style={{
                      background: "var(--p-accent-bg)",
                      color: "var(--p-accent)",
                      border: "1px solid var(--p-accent-border)",
                      fontSize: "0.8rem",
                    }}
                  >
                    Send another →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span style={{ color: "var(--p-accent)" }}>❯</span>
                    <span style={{ color: "var(--p-accent)" }}>cat &lt; message.txt</span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label style={{ color: "var(--p-text-muted)", fontSize: "0.75rem", display: "block", marginBottom: 6 }}>
                        # Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg outline-none"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={{ color: "var(--p-text-muted)", fontSize: "0.75rem", display: "block", marginBottom: 6 }}>
                        # Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg outline-none"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ color: "var(--p-text-muted)", fontSize: "0.75rem", display: "block", marginBottom: 6 }}>
                      # Subject
                    </label>
                    <input
                      type="text"
                      placeholder="What's this about?"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg outline-none"
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={{ color: "var(--p-text-muted)", fontSize: "0.75rem", display: "block", marginBottom: 6 }}>
                      # Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg outline-none resize-none"
                      style={inputStyle}
                    />
                  </div>

                  <div className="flex justify-center pt-2">
                    <HCaptcha
                      ref={captchaRef}
                      sitekey={WEB3FORMS_SITE_KEY}
                      reCaptchaCompat={false}
                      theme={theme === "dark" ? "dark" : "light"}
                      onVerify={(token) => setCaptchaToken(token)}
                      onExpire={() => setCaptchaToken("")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg flex items-center justify-center gap-2"
                    style={{
                      background: loading ? "var(--p-accent-bg)" : "var(--p-accent)",
                      color: "#fff",
                      fontSize: "0.85rem",
                    }}
                  >
                    {loading ? (
                      <span style={{ color: "var(--p-accent)" }}>Sending...</span>
                    ) : (
                      <>
                        <span>$</span> Send Message
                      </>
                    )}
                  </button>

                  {error && (
                    <p className="text-center text-sm" style={{ color: "#ef4444" }}>{error}</p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}