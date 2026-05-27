"use client";

import { FileText, ExternalLink } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const certificates = [
  { name: "AI Fundamentals with IBM SkillsBuild", file: "AI_Fundamentals_with_IBM_SkillsBuild.pdf" },
  { name: "Apply AI - Analyze Customer Reviews", file: "Apply_AI-_Analyze_Customer_Reviews.pdf" },
  { name: "CCNA Switching Routing and Wireless Essentials", file: "CCNA_Switching_Routing_and_Wireless_Essentials.pdf" },
  { name: "Data Analytics Essentials", file: "Data_Analytics_Essentials.pdf" },
  { name: "English for IT 1", file: "English_for_IT_1.pdf" },
  { name: "English for IT 2", file: "English_for_IT_2.pdf" },
  { name: "Introduction to Data Science", file: "Introduction_to_Data_Science.pdf" },
  { name: "Introduction to Modern AI", file: "Introduction_to_Modern_AI.pdf" },
  { name: "Introduction to Packet Tracer", file: "Introduction_to_Packet_Tracer.pdf" },
  { name: "IoT Cybersecurity Webinar Certificate", file: "IoT Cybersecurity Webinar Certificate.pdf" },
  { name: "ITS - Data Analytics", file: "ITS - Data Analytics.pdf" },
  { name: "ITS - Databases", file: "ITS - Databases.pdf" },
  { name: "ITS - Device Configuration and Management", file: "ITS - Device Configuration and Management.pdf" },
  { name: "Microsoft Office Specialist", file: "Microsoft Office Specialist.pdf" },
];

export function Certificates() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="py-24 px-4 sm:px-6 transition-colors duration-300 font-mono"
      style={{ background: "var(--p-bg)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Terminal-style header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 rounded-lg overflow-hidden"
          style={{
            background: "var(--p-bg-alt)",
            border: "1px solid var(--p-border)",
          }}
        >
          <div className="flex items-center gap-2 px-4 py-2" style={{ background: "var(--p-accent-bg)", borderBottom: "1px solid var(--p-border)" }}>
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#eab308" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
            <span className="ml-2 text-xs" style={{ color: "var(--p-text-muted)" }}>~/certificates — bash</span>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span style={{ color: "var(--p-accent)" }}>❯</span>
              <span style={{ color: "var(--p-accent)" }}>ls -la ./certifications/</span>
            </div>
            <p style={{ color: "var(--p-text-muted)", fontSize: "0.8rem" }}>Professional certifications and achievements</p>
          </div>
        </motion.div>

        {/* Certificates grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.file}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              className="group rounded-lg p-4 transition-all duration-300 hover:shadow-lg"
              style={{
                background: "var(--p-bg-alt)",
                border: "1px solid var(--p-border)",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2.5 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: "var(--p-accent-bg)",
                  }}
                >
                  <FileText className="w-4 h-4" style={{ color: "var(--p-accent)" }} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className="text-sm font-semibold leading-tight mb-2 group-hover:text-opacity-100 transition-all duration-300 line-clamp-2"
                    style={{ color: "var(--p-text)" }}
                  >
                    {cert.name}
                  </h3>

                  <motion.a
                    href={`/Certificates/${cert.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs transition-all duration-300 w-fit"
                    style={{
                      background: "var(--p-accent-bg)",
                      border: "1px solid var(--p-accent-border)",
                      color: "var(--p-accent)",
                    }}
                    whileHover={{
                      background: "var(--p-accent)",
                      color: "#fff",
                    }}
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 rounded-lg p-5"
          style={{
            background: "var(--p-bg-alt)",
            border: "1px solid var(--p-border)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span style={{ color: "var(--p-accent)" }}>❯</span>
            <span style={{ color: "var(--p-accent)" }}>wc -l achievements.txt</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="text-center p-3 rounded" style={{ background: "var(--p-bg-card)" }}>
              <span style={{ color: "var(--p-accent)", fontSize: "1.5rem", fontWeight: 700 }}>{certificates.length}</span>
              <p style={{ color: "var(--p-text-muted)", fontSize: "0.7rem" }}>Certificates</p>
            </div>
            <div className="text-center p-3 rounded" style={{ background: "var(--p-bg-card)" }}>
              <span style={{ color: "var(--p-accent)", fontSize: "1.5rem", fontWeight: 700 }}>7</span>
              <p style={{ color: "var(--p-text-muted)", fontSize: "0.7rem" }}>Tech Areas</p>
            </div>
            <div className="text-center p-3 rounded" style={{ background: "var(--p-bg-card)" }}>
              <span style={{ color: "var(--p-accent)", fontSize: "1.5rem", fontWeight: 700 }}>✓</span>
              <p style={{ color: "var(--p-text-muted)", fontSize: "0.7rem" }}>Verified</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
