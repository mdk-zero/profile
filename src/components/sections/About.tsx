import { setup, skills, softSkills } from "@/lib/content";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="page py-24 md:py-32">
      <div className="grid gap-x-10 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 id="about-title" className="section-title">
            About
          </h2>
          <p className="lead mt-8 max-w-[52ch] text-ink">
            Passionate full-stack developer with ~2 years of experience building scalable web
            applications. I enjoy creating seamless user experiences that combine beautiful design
            with secure development.
          </p>
          <p className="mt-6 max-w-[56ch]">
            I’m finishing a BS in Information Technology at Batangas State University, where my
            thesis became iCARE++. Day to day I work on Linux, with {setup.slice(0, -1).join(", ")}{" "}
            and {setup[setup.length - 1]}.
          </p>
        </div>

        <dl className="grid content-start gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-6 lg:pt-3">
          {skills.map((group) => (
            <div key={group.group}>
              <dt className="text-base font-bold text-ink">{group.group}</dt>
              <dd className="mt-2">{group.items.join(", ")}</dd>
            </div>
          ))}
          <div className="sm:col-span-2">
            <dt className="text-base font-bold text-ink">Working style</dt>
            <dd className="mt-2">{softSkills.join(", ")}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
