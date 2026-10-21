"use client";

import { useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useTheme } from "@/components/ThemeProvider";
import { Breakable } from "@/components/terminal/Breakable";

const WEB3FORMS_SITE_KEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";
const EMAIL = "linuxadona17@gmail.com";

const emptyForm = { name: "", email: "", subject: "", message: "" };

// Header fields read like composing mail in a terminal client: label, then value.
const fieldClass =
  "w-full border-0 border-b border-field bg-transparent px-0 py-1 text-fg caret-blue outline-none placeholder:text-dim focus:border-blue";

export function ContactForm() {
  const { theme } = useTheme();
  const [form, setForm] = useState(emptyForm);
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
      setError("Complete the captcha, then send again.");
      setLoading(false);
      return;
    }

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        setError(`The form isn't set up yet. Email me at ${EMAIL} instead.`);
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
          to: EMAIL,
          "h-captcha-response": captchaToken,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm(emptyForm);
        setCaptchaToken("");
        captchaRef.current?.resetCaptcha();
      } else {
        setError(`Your message didn't send. Try again, or email me at ${EMAIL}.`);
      }
    } catch {
      setError(`Your message didn't send. Check your connection and try again, or email me at ${EMAIL}.`);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div role="status">
        <p className="font-bold text-fg">Message sent.</p>
        <p className="mt-2">Thanks for reaching out. I&apos;ll reply by email within 24 hours.</p>
        <button type="button" onClick={() => setSubmitted(false)} className="btn mt-8">
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>I&apos;ll get back to you within 24 hours.</p>

      <div className="mt-8 grid grid-cols-[7ch_minmax(0,1fr)] items-baseline gap-x-[1ch] gap-y-5 sm:gap-x-[2ch]">
        <span className="text-dim">To</span>
        <span className="[overflow-wrap:anywhere]">
          <Breakable text={EMAIL} />
        </span>

        <label htmlFor="contact-name" className="text-dim">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={fieldClass}
        />

        <label htmlFor="contact-email" className="text-dim">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={fieldClass}
        />

        <label htmlFor="contact-subject" className="text-dim">
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          placeholder="What's this about?"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className={fieldClass}
        />
      </div>

      <label htmlFor="contact-message" className="mt-8 block text-dim">
        Message
      </label>
      <textarea
        id="contact-message"
        required
        rows={6}
        placeholder="Tell me about your project..."
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="mt-2 block w-full resize-y border border-field bg-transparent px-[1ch] py-2 text-fg caret-blue outline-none placeholder:text-dim focus:border-blue"
      />

      <div className="mt-6">
        <HCaptcha
          ref={captchaRef}
          sitekey={WEB3FORMS_SITE_KEY}
          reCaptchaCompat={false}
          theme={theme === "dark" ? "dark" : "light"}
          onVerify={(token) => setCaptchaToken(token)}
          onExpire={() => setCaptchaToken("")}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-[3ch] gap-y-3">
        <button type="submit" disabled={loading} className="btn">
          {loading ? "Sending..." : "Send message"}
        </button>
        {error && (
          <p role="alert" className="text-fg">
            <span className="text-dim">error:</span> {error}
          </p>
        )}
      </div>
    </form>
  );
}
