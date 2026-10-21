import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { FocusFollows } from "@/components/terminal/FocusFollows";

export default function HomePage() {
  return (
    <>
      <FocusFollows />
      <About />
      <Services />
      <Projects />
      <Certificates />
      <Contact />
    </>
  );
}
