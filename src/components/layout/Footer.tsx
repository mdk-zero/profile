import { FaFacebook } from "react-icons/fa";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";

const iconLink = "flex size-10 items-center justify-center text-muted transition-colors hover:text-blue";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule">
      <div className="page flex flex-col gap-6 py-10 text-base text-muted sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-ink">© {year} {site.name}</p>
          <p className="mt-1 text-sm">Built with Next.js, Tailwind CSS and Keystatic.</p>
        </div>
        <ul className="-ml-2.5 flex items-center gap-1 sm:ml-0">
          <li>
            <a href={`mailto:${site.email}`} aria-label="Email" className={iconLink}>
              <Icon name="mail" />
            </a>
          </li>
          <li>
            <a href={site.github.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconLink}>
              <Icon name="github" />
            </a>
          </li>
          {site.linkedin && (
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconLink}>
                <Icon name="linkedin" />
              </a>
            </li>
          )}
          <li>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={iconLink}>
              <FaFacebook aria-hidden="true" className="size-5" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
