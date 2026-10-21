import { Panel } from "@/components/terminal/Panel";
import { Prompt } from "@/components/terminal/Prompt";

const groups = [
  {
    dir: "networking",
    certificates: [
      {
        name: "CCNA: Switching, Routing and Wireless Essentials",
        file: "CCNA_Switching_Routing_and_Wireless_Essentials.pdf",
      },
      { name: "Introduction to Packet Tracer", file: "Introduction_to_Packet_Tracer.pdf" },
      {
        name: "ITS: Device Configuration and Management",
        file: "ITS - Device Configuration and Management.pdf",
      },
      { name: "IoT Cybersecurity Webinar", file: "IoT Cybersecurity Webinar Certificate.pdf" },
    ],
  },
  {
    dir: "ai-and-data",
    certificates: [
      {
        name: "AI Fundamentals with IBM SkillsBuild",
        file: "AI_Fundamentals_with_IBM_SkillsBuild.pdf",
      },
      { name: "Introduction to Modern AI", file: "Introduction_to_Modern_AI.pdf" },
      {
        name: "Apply AI: Analyze Customer Reviews",
        file: "Apply_AI-_Analyze_Customer_Reviews.pdf",
      },
      { name: "Introduction to Data Science", file: "Introduction_to_Data_Science.pdf" },
      { name: "Data Analytics Essentials", file: "Data_Analytics_Essentials.pdf" },
      { name: "ITS: Data Analytics", file: "ITS - Data Analytics.pdf" },
      { name: "ITS: Databases", file: "ITS - Databases.pdf" },
    ],
  },
  {
    dir: "professional",
    certificates: [
      { name: "Microsoft Office Specialist", file: "Microsoft Office Specialist.pdf" },
      { name: "English for IT 1", file: "English_for_IT_1.pdf" },
      { name: "English for IT 2", file: "English_for_IT_2.pdf" },
    ],
  },
];

export function Certificates() {
  return (
    <section
      id="certificates"
      tabIndex={-1}
      aria-labelledby="certificates-title"
      className="workspace"
    >
      <Panel title="certificates" titleId="certificates-title">
        <Prompt command="ls ~/certificates" />
        <p className="mt-1 text-dim">Select a certificate to open the PDF.</p>

        <div className="mt-8 grid gap-x-[4ch] gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((group) => (
            <div key={group.dir}>
              <h3 className="font-bold text-blue">{group.dir}/</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {group.certificates.map((cert) => (
                  <li key={cert.file}>
                    <a
                      href={`/Certificates/${encodeURIComponent(cert.file)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fg hover:text-blue hover:underline hover:underline-offset-4"
                    >
                      {cert.name}
                      <span className="text-dim">.pdf</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}
