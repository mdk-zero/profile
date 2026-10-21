import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Experience } from "@/components/sections/Experience";
import { Activity } from "@/components/sections/Activity";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { SectionDots } from "@/components/SectionDots";
import { CommandPalette } from "@/components/search/CommandPalette";
import { sections } from "@/lib/content";
import { getSearchIndex } from "@/lib/search-index";

// One dot per section, starting with the intro.
const dotSections = [{ id: "top", label: "Intro" }, ...sections.map(({ id, label }) => ({ id, label }))];

export default async function HomePage() {
  const searchItems = await getSearchIndex();

  return (
    <>
      <Hero />
      <Projects />
      <Services />
      <Experience />
      <Activity />
      <About />
      <Contact />
      <SectionDots sections={dotSections} />
      <CommandPalette items={searchItems} />
    </>
  );
}
