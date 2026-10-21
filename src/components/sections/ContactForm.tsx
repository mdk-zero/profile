"use client";

import { useRef, useState, useTransition } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useTheme } from "@/components/ThemeProvider";
import { sendMessage, type ContactResult } from "@/lib/actions/contact";
import { cn } from "@/lib/utils";

// Optional: set NEXT_PUBLIC_HCAPTCHA_SITE_KEY (and HCAPTCHA_SECRET on the server) to require a captcha.
const CAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

const emptyForm = { name: "", email: "", subject: "", message: "", company: "" };

const fieldClass =
  "mt-2 block w-full border border-field bg-transparent px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted focus:border-blue focus-visible:outline-none aria-invalid:border-destructive";

export function ContactForm() {
  const { theme } = useTheme();
  const [form, setForm] = useState(emptyForm);
  const [result, setResult] = useState<ContactResult | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [pending, startTransition] = useTransition();
  const captchaRef = useRef<HCaptcha>(null);

  const update = (field: keyof typeof emptyForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await sendMessage({ ...form, captchaToken });
      setResult(res);
      if (res.ok) {
        setForm(emptyForm);
        setCaptchaToken("");
        captchaRef.current?.resetCaptcha();
      }
    });
  };

  if (result?.ok) {
    return (
      <div role="status" className="border border-rule p-8">
        <p className="font-display text-2xl font-bold text-ink">Message sent.</p>
        <p className="mt-3">Thanks for reaching out. I’ll reply by email within 24 hours.</p>
        <button type="button" onClick={() => setResult(null)} className="btn btn-secondary mt-8">
          Write another message
        </button>
      </div>
    );
  }

  const fieldError = result && !result.ok ? result.field : undefined;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block text-base text-ink">
          Name
          <input
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={update("name")}
            aria-invalid={fieldError === "name" || undefined}
            className={fieldClass}
          />
        </label>
        <label className="block text-base text-ink">
          Email
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={update("email")}
            aria-invalid={fieldError === "email" || undefined}
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block text-base text-ink">
        Subject <span className="text-muted">(optional)</span>
        <input type="text" value={form.subject} onChange={update("subject")} className={fieldClass} />
      </label>

      <label className="block text-base text-ink">
        Message
        <textarea
          required
          rows={6}
          placeholder="What are you building, and when do you need it?"
          value={form.message}
          onChange={update("message")}
          aria-invalid={fieldError === "message" || undefined}
          className={cn(fieldClass, "resize-y")}
        />
      </label>

      {/* Honeypot: off-screen and skipped by keyboard and screen readers; bots fill it in. */}
      <label aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        Company
        <input type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={update("company")} />
      </label>

      {CAPTCHA_SITE_KEY && (
        <HCaptcha
          ref={captchaRef}
          sitekey={CAPTCHA_SITE_KEY}
          theme={theme === "dark" ? "dark" : "light"}
          onVerify={setCaptchaToken}
          onExpire={() => setCaptchaToken("")}
        />
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <button type="submit" disabled={pending} className="btn btn-primary">
          {pending ? "Sending…" : "Send message"}
        </button>
        {result && !result.ok && (
          <p role="alert" className="text-ink">
            {result.error}
          </p>
        )}
      </div>
    </form>
  );
}
