import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Experience } from "@/components/sections/Experience";
import { Activity } from "@/components/sections/Activity";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { CommandPalette } from "@/components/search/CommandPalette";
import { getSearchIndex } from "@/lib/search-index";

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
      <CommandPalette items={searchItems} />
    </>
  );
}
