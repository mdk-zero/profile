import { FaFacebook } from "react-icons/fa";
import { Breakable } from "@/components/Breakable";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";

const methods = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: <Icon name="mail" /> },
  {
    label: "GitHub",
    value: `github.com/${site.github.user}`,
    href: site.github.url,
    icon: <Icon name="github" />,
  },
  ...(site.linkedin
    ? [{ label: "LinkedIn", value: "LinkedIn", href: site.linkedin, icon: <Icon name="linkedin" /> }]
    : []),
  {
    label: "Facebook",
    value: "Linux.Sale.Adona",
    href: site.facebook,
    icon: <FaFacebook aria-hidden="true" className="size-[1.25em] shrink-0" />,
  },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="page py-24 md:py-32">
      <div className="grid gap-x-10 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="section-title">
            Get in touch
          </h2>
          <p className="lead mt-6 max-w-[40ch]">
            Tell me about your project and I’ll reply within 24 hours.
          </p>
          <p className="mt-4 text-muted">Based in {site.location}.</p>

          <ul className="mt-10 flex flex-col border-t border-rule">
            {methods.map((m) => (
              <li key={m.label} className="border-b border-rule">
                <a
                  href={m.href}
                  {...(m.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex min-h-14 items-center gap-4 py-3 text-ink transition-colors hover:text-blue"
                >
                  {m.icon}
                  <span className="w-20 shrink-0 text-base text-muted">{m.label}</span>
                  <span className="min-w-0 [overflow-wrap:anywhere]">
                    <Breakable text={m.value} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
