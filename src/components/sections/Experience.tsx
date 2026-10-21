import { certificateGroups, certificateHref, education, work } from "@/lib/content";

const certificateCount = certificateGroups.reduce((n, g) => n + g.certificates.length, 0);

// A dated entry: dates in a narrow left column, details on the right.
function Entry({
  dates,
  title,
  subtitle,
  children,
}: {
  dates: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <li className="grid gap-2 border-t border-rule py-8 md:grid-cols-12 md:gap-10">
      <p className="text-base text-muted md:col-span-3 md:pt-1">{dates}</p>
      <div className="md:col-span-9">
        <h4 className="text-xl leading-snug font-bold">{title}</h4>
        <p className="mt-1 text-ink">{subtitle}</p>
        {children}
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="page py-24 md:py-32">
      <h2 id="experience-title" className="section-title">
        Experience
      </h2>

      <h3 className="mt-16 text-2xl font-bold">Work</h3>
      <ul className="mt-6 border-b border-rule">
        {work.map((job) => (
          <Entry key={job.org} dates={`${job.start} – ${job.end}`} title={job.role} subtitle={job.org}>
            <ul className="mt-4 flex max-w-[68ch] list-disc flex-col gap-2 pl-5 marker:text-muted">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Entry>
        ))}
      </ul>

      <h3 className="mt-20 text-2xl font-bold">Education</h3>
      <ul className="mt-6 border-b border-rule">
        {education.map((school) => (
          <Entry
            key={school.school}
            dates={`${school.start} – ${school.end}`}
            title={school.credential}
            subtitle={school.school}
          >
            <p className="mt-4 max-w-[68ch]">{school.note}</p>
          </Entry>
        ))}
      </ul>

      <div id="certificates" className="mt-20">
        <h3 className="text-2xl font-bold">Certificates</h3>
        <p className="mt-3">
          {certificateCount} certificates. Select one to open the PDF.
        </p>
        <div className="mt-8 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {certificateGroups.map((group) => (
            <div key={group.issuer}>
              <h4 className="text-base font-bold">{group.issuer}</h4>
              <ul className="mt-3 border-t border-rule">
                {group.certificates.map((cert) => (
                  <li key={cert.file} className="border-b border-rule">
                    <a
                      href={certificateHref(cert)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-12 items-center justify-between gap-6 py-3 text-ink transition-colors hover:text-blue"
                    >
                      <span>{cert.name}</span>
                      <span className="shrink-0 text-sm text-muted">PDF</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
