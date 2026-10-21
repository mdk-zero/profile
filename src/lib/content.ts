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

export type Certificate = { name: string; file: string };

export const certificateGroups: { issuer: string; certificates: Certificate[] }[] = [
  {
    issuer: "Cisco Networking Academy",
    certificates: [
      {
        name: "CCNA: Switching, Routing and Wireless Essentials",
        file: "CCNA_Switching_Routing_and_Wireless_Essentials.pdf",
      },
      { name: "Introduction to Packet Tracer", file: "Introduction_to_Packet_Tracer.pdf" },
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
      { name: "English for IT 1", file: "English_for_IT_1.pdf" },
      { name: "English for IT 2", file: "English_for_IT_2.pdf" },
    ],
  },
  {
    issuer: "Information Technology Specialist",
    certificates: [
      { name: "ITS: Data Analytics", file: "ITS - Data Analytics.pdf" },
      { name: "ITS: Databases", file: "ITS - Databases.pdf" },
      {
        name: "ITS: Device Configuration and Management",
        file: "ITS - Device Configuration and Management.pdf",
      },
    ],
  },
  {
    issuer: "Microsoft",
    certificates: [
      { name: "Microsoft Office Specialist", file: "Microsoft Office Specialist.pdf" },
    ],
  },
  {
    issuer: "Webinars",
    certificates: [
      { name: "IoT Cybersecurity Webinar", file: "IoT Cybersecurity Webinar Certificate.pdf" },
    ],
  },
];

export const certificateHref = (cert: Certificate) =>
  `/Certificates/${encodeURIComponent(cert.file)}`;

// The page's sections, in order. `nav` marks the ones listed in the top navigation.
export const sections = [
  { id: "projects", label: "Projects", nav: true },
  { id: "services", label: "Services", nav: true },
  { id: "experience", label: "Experience", nav: true },
  { id: "activity", label: "Activity", nav: true },
  { id: "about", label: "About", nav: true },
  { id: "contact", label: "Contact", nav: true },
] as const;
