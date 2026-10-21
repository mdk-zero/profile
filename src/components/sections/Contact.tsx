import { Breakable } from "@/components/terminal/Breakable";
import { Panel } from "@/components/terminal/Panel";
import { ContactForm } from "./ContactForm";

const details = [
  { key: "email", label: "linuxadona17@gmail.com", href: "mailto:linuxadona17@gmail.com" },
  { key: "location", label: "Balayan, Batangas, PH" },
  { key: "github", label: "github.com/mdk-zero", href: "https://github.com/mdk-zero" },
  {
    key: "facebook",
    label: "Linux.Sale.Adona",
    href: "https://www.facebook.com/Linux.Sale.Adona",
  },
  { key: "résumé", label: "Resume.pdf", href: "/Resume.pdf", download: true },
];

export function Contact() {
  return (
    <section id="contact" tabIndex={-1} aria-labelledby="contact-title" className="workspace">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <Panel title="send a message" titleId="contact-title">
          <ContactForm />
        </Panel>

        <Panel title="contact info">
          <dl className="kv">
            {details.map((item) => (
              <div key={item.key} className="contents">
                <dt>{item.key}</dt>
                <dd className="[overflow-wrap:anywhere]">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="link"
                      {...(item.download
                        ? { download: true }
                        : item.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                    >
                      <Breakable text={item.label} />
                    </a>
                  ) : (
                    item.label
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Panel>
      </div>
    </section>
  );
}
