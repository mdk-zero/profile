"use server";

import { Resend } from "resend";
import { site } from "@/lib/site";

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  captchaToken?: string;
  // Honeypot: hidden from people, so anything typed here came from a bot.
  company?: string;
};

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string; field?: "name" | "email" | "message" | "captcha" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function verifyCaptcha(token: string | undefined, secret: string) {
  if (!token) return false;
  const res = await fetch("https://api.hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

// Sends the contact form to site.email through Resend. Needs RESEND_API_KEY, and a
// sender on a domain verified in Resend (CONTACT_FROM_EMAIL, default contact@mdk0.tech).
// The captcha is enforced only when HCAPTCHA_SECRET is set.
export async function sendMessage(input: ContactInput): Promise<ContactResult> {
  // Single-line fields end up in email headers, so line breaks are flattened.
  const oneLine = (value: unknown, max: number) =>
    String(value ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);
  const name = oneLine(input.name, 100);
  const email = oneLine(input.email, 200);
  const subject = oneLine(input.subject, 150);
  const message = String(input.message ?? "").trim().slice(0, 5000);

  if (input.company) return { ok: true };
  if (!name) return { ok: false, field: "name", error: "Enter your name." };
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, field: "email", error: "Enter an email address I can reply to, like you@example.com." };
  }
  if (message.length < 10) {
    return { ok: false, field: "message", error: "Write a message of at least 10 characters." };
  }

  const captchaSecret = process.env.HCAPTCHA_SECRET;
  if (captchaSecret && !(await verifyCaptcha(input.captchaToken, captchaSecret))) {
    return { ok: false, field: "captcha", error: "Complete the captcha, then send again." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set.");
    return { ok: false, error: `Sending isn't set up yet. Email me at ${site.email} instead.` };
  }

  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Portfolio contact form <contact@mdk0.tech>",
    to: site.email,
    replyTo: email,
    subject: subject ? `Portfolio: ${subject}` : `Portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n${subject ? `Subject: ${subject}\n` : ""}\n${message}`,
  });

  if (error) {
    console.error("Contact form: Resend rejected the message.", error);
    return { ok: false, error: `Your message didn't send. Try again, or email me at ${site.email}.` };
  }
  return { ok: true };
}
