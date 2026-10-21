import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Experience } from "@/components/sections/Experience";
import { Activity } from "@/components/sections/Activity";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { PageMap, type MapSection } from "@/components/PageMap";
import { CommandPalette } from "@/components/search/CommandPalette";
import { getProjects } from "@/lib/projects";
import { getSearchIndex } from "@/lib/search-index";

export default async function HomePage() {
  const [searchItems, projects] = await Promise.all([getSearchIndex(), getProjects()]);

  // The page map draws each section as a miniature of its layout.
  const mapSections: MapSection[] = [
    { id: "top", label: "Intro", kind: "hero" },
    { id: "projects", label: "Projects", kind: "media", count: projects.length },
    { id: "services", label: "Services", kind: "columns" },
    { id: "experience", label: "Experience", kind: "timeline" },
    { id: "activity", label: "Activity", kind: "heatmap" },
    { id: "about", label: "About", kind: "split" },
    { id: "contact", label: "Contact", kind: "form" },
  ];

  return (
    <>
      <Hero />
      <Projects />
      <Services />
      <Experience />
      <Activity />
      <About />
      <Contact />
      <PageMap sections={mapSections} />
      <CommandPalette items={searchItems} />
    </>
  );
}
