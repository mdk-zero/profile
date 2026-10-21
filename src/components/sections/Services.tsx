import { Panel } from "@/components/terminal/Panel";
import { Prompt } from "@/components/terminal/Prompt";

const services = [
  {
    title: "Web development",
    description: "Building fast, responsive, and visually appealing websites and web applications.",
  },
  {
    title: "Arduino projects",
    description: "From prototypes to fully functional hardware solutions.",
  },
  {
    title: "UI/UX design",
    description: "Creating intuitive and beautiful user interfaces.",
  },
];

const stack = [
  { dir: "languages", items: ["TypeScript", "Python", "Java", "C++", "PHP"] },
  { dir: "frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { dir: "backend-and-data", items: ["Laravel", "MySQL", "PostgreSQL", "Supabase"] },
  { dir: "tools", items: ["Git", "Figma"] },
];

const fileCount = stack.reduce((sum, group) => sum + group.items.length, 0);

export function Services() {
  return (
    <section id="services" tabIndex={-1} aria-labelledby="services-title" className="workspace">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Panel title="services" titleId="services-title" className="flex flex-col">
          <dl className="flex flex-col gap-8">
            {services.map((service) => (
              <div key={service.title}>
                <dt className="font-bold text-fg">{service.title}</dt>
                <dd className="mt-1 max-w-[56ch]">{service.description}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-auto pt-12">
            Have a project in mind?{" "}
            <a href="#contact" className="link">
              Send me a message
            </a>
            .
          </p>
        </Panel>

        <Panel title="stack">
          <Prompt command="tree ~/stack" />
          <p className="mt-4 font-bold text-blue">~/stack</p>
          <ul aria-label="Tech stack" className="leading-[1.5]">
            {stack.map((group, gi) => {
              const lastGroup = gi === stack.length - 1;
              return (
                <li key={group.dir}>
                  <span aria-hidden="true" className="glyphs text-dim">
                    {lastGroup ? "└── " : "├── "}
                  </span>
                  <span className="font-bold text-blue">{group.dir}</span>
                  <ul>
                    {group.items.map((item, ii) => (
                      <li key={item}>
                        <span aria-hidden="true" className="glyphs text-dim">
                          {lastGroup ? "    " : "│   "}
                          {ii === group.items.length - 1 ? "└── " : "├── "}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-dim">
            {stack.length} directories, {fileCount} files
          </p>
        </Panel>
      </div>
    </section>
  );
}
