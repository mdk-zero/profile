import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="page py-24 md:py-32">
      <h2 id="services-title" className="section-title">
        Services
      </h2>

      <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        {services.map((service) => (
          <li key={service.title} className="border-t border-ink pt-6">
            <h3 className="text-2xl leading-tight font-bold tracking-[-0.015em]">{service.title}</h3>
            <p className="mt-3 max-w-[40ch]">{service.description}</p>
          </li>
        ))}
      </ul>

      <p className="mt-12">
        Have a project in mind?{" "}
        <a href="#contact" className="link">
          Tell me about it
        </a>
        .
      </p>
    </section>
  );
}
