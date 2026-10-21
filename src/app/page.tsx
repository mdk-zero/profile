import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Services } from "@/components/sections/Services";
import { Experience } from "@/components/sections/Experience";
import { Activity } from "@/components/sections/Activity";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <Services />
      <Experience />
      <Activity />
      <About />
      <Contact />
    </>
  );
}
