import Image from "next/image";
import { Panel } from "@/components/terminal/Panel";
import { Prompt } from "@/components/terminal/Prompt";

// fastfetch-style system info. "Uptime" is years of experience.
const facts = [
  ["Role", "Full stack developer"],
  ["Location", "Balayan, Batangas, PH"],
  ["Uptime", "2+ years"],
  ["Projects", "15+"],
  ["OS", "Arch Linux"],
  ["Shell", "zsh"],
  ["Editor", "Neovim"],
  ["Terminal", "Ghostty"],
] as const;

export function About() {
  return (
    <section id="about" tabIndex={-1} aria-labelledby="about-name" className="workspace">
      <div className="grid gap-3 lg:min-h-[calc(100svh-var(--bar-h)-3rem)] lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
        <Panel title="about" titleAs="span" focused className="flex flex-col @container">
          <Prompt command="whoami" typed />

          <div className="after-cmd flex flex-1 flex-col">
            <h1
              id="about-name"
              className="mt-4 font-display text-[min(50cqi,30svh)] leading-[0.8] text-fg"
            >
              Linux
              <br />
              Adona
            </h1>

            <p className="mt-8 max-w-[62ch] text-soft">
              Passionate full-stack developer with ~2 years of experience building scalable
              web applications. I enjoy creating seamless user experiences that combine
              beautiful design with secure development.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-[3ch] gap-y-4">
              <a href="/Resume.pdf" download className="btn">
                Download résumé
              </a>
              <a
                href="https://github.com/mdk-zero"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                GitHub
              </a>
              <a
                href="https://www.facebook.com/Linux.Sale.Adona"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                Facebook
              </a>
            </div>

            <Prompt cursor className="mt-10" />
          </div>
        </Panel>

        <Panel title="fastfetch" titleAs="span" className="@container">
          <div className="grid gap-6 @[30rem]:grid-cols-[11rem_minmax(0,1fr)]">
            <div className="relative aspect-[4/3] @[30rem]:aspect-[4/5]">
              <Image
                src="/profile-pic.jpg"
                alt="Linux Adona seated in a rattan chair in front of framed maps of Balayan Bay"
                fill
                preload
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="dimmable object-cover object-[50%_30%]"
              />
            </div>

            <div>
              <p className="font-bold text-blue">mdk0@arch</p>
              <p aria-hidden="true" className="text-dim">
                ---------
              </p>
              <dl className="kv mt-1">
                {facts.map(([key, value]) => (
                  <div key={key} className="contents">
                    <dt className="text-blue">{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}
