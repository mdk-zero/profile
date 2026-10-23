// Static page content. Work history, education, skills and certificate groups follow
// public/Resume.pdf; keep the two in sync when either changes.

export const services = [
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

export type WorkEntry = {
  org: string;
  role: string;
  start: string;
  end: string;
  points: string[];
};

export const work: WorkEntry[] = [
  {
    org: "C2LK Internet Solutions",
    role: "Full-stack web developer",
    start: "Aug 2024",
    end: "Present",
    points: [
      "Engineered and shipped full-stack web applications for clients across 5+ projects, from requirements gathering through production deployment.",
      "Led UI/UX design planning for client-facing apps, reducing navigation friction and consistently earning client approval on first review.",
      "Hardened apps before deployment with input validation, HTTPS enforcement and auth controls, with zero reported security incidents.",
      "Standardized Git workflows, linters and CI scripts, cutting average build-to-deploy time by about 30%.",
    ],
  },
  {
    org: "McDonald’s",
    role: "Crew member",
    start: "Nov 2023",
    end: "Mar 2024",
    points: [
      "Onboarded customers to a newly deployed self-service kiosk system, cutting average order time and queue length during peak hours.",
      "Coordinated with a team of 8–12 crew members during high-volume shifts to keep food quality and throughput consistent.",
    ],
  },
  {
    org: "PLDT",
    role: "Sales agent",
    start: "Jan 2020",
    end: "Dec 2022",
    points: [
      "Resolved customer connectivity issues and service arrangements across a high volume of daily inquiries.",
      "Processed and validated customer application data, reducing errors and speeding up service delivery.",
      "Contributed to a 25% increase in customer satisfaction through fast, accurate service.",
    ],
  },
];

export const education = [
  {
    school: "Batangas State University TNEU – ARASOF Nasugbu",
    credential: "BS Information Technology with Honors, major in Business Analytics",
    start: "Aug 2023",
    end: "Expected Jul 2027",
    note: "Thesis: iCARE++, a machine-learning-driven clinical competency assessment and adaptive learning system for nursing students.",
  },
  {
    school: "Balayan Senior High School",
    credential: "Diploma in Science, Technology, Engineering and Mathematics",
    start: "Jun 2021",
    end: "Jul 2023",
    note: "Built a registrar management system in Visual Basic for managing student registrations.",
  },
];

export const skills = [
  { group: "Frontend", items: ["React", "JavaScript", "TypeScript", "Next.js", "Tailwind CSS"] },
  { group: "Backend", items: ["PHP", "Laravel", "Python", "Java", "C++"] },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "Supabase"] },
  { group: "Tools", items: ["Git", "Node.js", "Figma", "Neovim", "Tmux", "Opencode"] },
];

export const softSkills = [
  "Problem solving",
  "Team leadership",
  "Data analysis",
  "Communication",
  "Attention to detail",
];

export const setup = ["Arch Linux", "Neovim", "Ghostty", "zsh", "Tmux"];

// Certificates are shown as images in a viewer, never as the original PDFs, so there is
// no editable file to download. Each image sits at public/certificates/<image>.webp,
// rendered from the PDF at 1600px wide: readable on screen, too coarse to reprint.
export type Certificate = { name: string; image: string; width: number; height: number };

const cisco = (name: string, image: string): Certificate => ({ name, image, width: 1600, height: 1084 });
const certiport = (name: string, image: string): Certificate => ({ name, image, width: 1600, height: 1237 });

export const certificateGroups: { issuer: string; certificates: Certificate[] }[] = [
  {
    issuer: "Cisco Networking Academy",
    certificates: [
      cisco("CCNA: Switching, Routing and Wireless Essentials", "ccna-switching-routing-and-wireless-essentials"),
      cisco("Introduction to Packet Tracer", "introduction-to-packet-tracer"),
      cisco("AI Fundamentals with IBM SkillsBuild", "ai-fundamentals-with-ibm-skillsbuild"),
      cisco("Introduction to Modern AI", "introduction-to-modern-ai"),
      cisco("Apply AI: Analyze Customer Reviews", "apply-ai-analyze-customer-reviews"),
      cisco("Introduction to Data Science", "introduction-to-data-science"),
      cisco("Data Analytics Essentials", "data-analytics-essentials"),
      cisco("English for IT 1", "english-for-it-1"),
      cisco("English for IT 2", "english-for-it-2"),
    ],
  },
  {
    issuer: "Information Technology Specialist",
    certificates: [
      certiport("ITS: Data Analytics", "its-data-analytics"),
      certiport("ITS: Databases", "its-databases"),
      certiport("ITS: Device Configuration and Management", "its-device-configuration-and-management"),
    ],
  },
  {
    issuer: "Microsoft",
    certificates: [certiport("Microsoft Office Specialist", "microsoft-office-specialist")],
  },
  {
    issuer: "Webinars",
    certificates: [
      {
        name: "IoT Cybersecurity Webinar",
        image: "iot-cybersecurity-webinar-certificate",
        width: 1600,
        height: 1132,
      },
    ],
  },
];

export const certificateSrc = (cert: Certificate) => `/certificates/${cert.image}.webp`;

// The page's sections, in order. `nav` marks the ones listed in the top navigation.
export const sections = [
  { id: "projects", label: "Projects", nav: true },
  { id: "services", label: "Services", nav: true },
  { id: "experience", label: "Experience", nav: true },
  { id: "activity", label: "Activity", nav: true },
  { id: "about", label: "About", nav: true },
  { id: "contact", label: "Contact", nav: true },
] as const;
