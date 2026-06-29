export const PERSONAL = {
  name: "Muhammad Ardiansyah",
  shortName: "Ardi",
  initials: "MA",
  role: "Software Engineering Student",
  tagline: "I craft digital products that matter.",
  description:
    "Software Engineering Student passionate about building modern web and mobile applications.",
  email: "ardianssyahhh@gmail.com",
  github: "https://github.com/Ardiansyahii",
  linkedin: "https://www.linkedin.com/in/muhammad-ardiansyah-dev/",
  githubHandle: "Ardiansyahii",
  linkedinHandle: "muhammad-ardiansyah-dev",
  badge: "Open to Internship",
  status: "Available for work",
  year: new Date().getFullYear(),
  location: "Indonesia 🇮🇩",
  timezone: "WIB (UTC+7)",
};

export const TYPED_ROLES = [
  "Full-Stack Developer",
  "Mobile App Developer",
  "REST API Designer",
  "UI/UX Enthusiast",
];

export const STATS = [
  { number: "2+", label: "Years of Learning", detail: "Since 2022" },
  { number: "10+", label: "Projects Shipped", detail: "Web & Mobile" },
  { number: "5+", label: "Tech Stacks Mastered", detail: "Always growing" },
  { number: "∞", label: "Lines of Code", detail: "And counting..." },
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
];

export const SKILL_CATEGORIES = [
  { key: "all", label: "All" },
  { key: "core", label: "Core" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "mobile", label: "Mobile" },
  { key: "database", label: "Database" },
  { key: "tools", label: "Tools" },
  { key: "design", label: "Design" },
];

export const SKILLS = [
  { name: "React.js", cats: ["core", "frontend"], color: "#61dafb" },
  { name: "Next.js", cats: ["core", "frontend"], color: "#ffffff" },
  { name: "Laravel", cats: ["core", "backend"], color: "#ff2d20" },
  {
    name: "Expo React Native",
    cats: ["core", "mobile"],
    color: "#000020",
  },
  {
    name: "TypeScript",
    cats: ["core", "frontend", "backend"],
    color: "#3178c6",
  },
  { name: "HTML5", cats: ["frontend"], color: "#e34f26" },
  { name: "CSS3", cats: ["frontend"], color: "#1572b6" },
  { name: "JavaScript", cats: ["frontend"], color: "#f7df1e" },
  { name: "Tailwind CSS", cats: ["frontend"], color: "#38bdf8" },
  { name: "Bootstrap", cats: ["frontend"], color: "#7952b3" },
  {
    name: "Shadcn UI",
    cats: ["frontend", "design"],
    color: "#18181b",
  },
  { name: "NextAuth.js", cats: ["frontend"], color: "#7c3aed" },
  { name: "Zod", cats: ["frontend", "backend"], color: "#3068b7" },
  { name: "Axios", cats: ["frontend", "backend"], color: "#5a29e4" },
  { name: "Node.js", cats: ["backend"], color: "#339933" },
  { name: "Express.js", cats: ["backend"], color: "#444444" },
  { name: "PHP", cats: ["backend"], color: "#777bb4" },
  {
    name: "Prisma ORM",
    cats: ["backend", "database"],
    color: "#2d3748",
  },
  { name: "Google OAuth", cats: ["backend"], color: "#4285f4" },
  { name: "Docker", cats: ["backend", "tools"], color: "#2496ed" },
  { name: "Flutter", cats: ["mobile"], color: "#54c5f8" },
  { name: "Dart", cats: ["mobile"], color: "#0175c2" },
  { name: "MySQL", cats: ["database"], color: "#4479a1" },
  { name: "PostgreSQL", cats: ["database"], color: "#336791" },
  { name: "SQLite", cats: ["database"], color: "#003b57" },
  { name: "Supabase", cats: ["database"], color: "#3ecf8e" },
  { name: "Git", cats: ["tools"], color: "#f05032" },
  { name: "GitHub", cats: ["tools"], color: "#24292e" },
  { name: "GitLab", cats: ["tools"], color: "#fc6d26" },
  { name: "Postman", cats: ["tools"], color: "#ff6c37" },
  { name: "Trello", cats: ["tools"], color: "#0079bf" },
  { name: "npm / pnpm", cats: ["tools"], color: "#cb3837" },
  { name: "Figma", cats: ["design"], color: "#f24e1e" },
];

export const PROJECTS = [
  {
    id: "sipmas",
    name: "SIPMAS",
    subtitle: "Sistem Informasi Pengaduan Masyarakat",
    category: "Multi-Platform System",
    year: "2024",
    description:
      "A multi-platform community complaint & reporting system for RT/RW-level governance — facilitating transparent communication between residents and administrators.",
    impact:
      "Digitized manual complaint workflows for local government, reducing response time significantly.",
    features: [
      "Real-time complaint tracking & audit logs",
      "Web (Next.js) + Mobile (Expo React Native)",
      "REST API with Express.js & MySQL/Supabase",
      "Role-based access control with JWT",
    ],
    tags: [
      "Next.js",
      "Expo RN",
      "Express.js",
      "MySQL",
      "Supabase",
      "TypeScript",
    ],
    github: "https://github.com/Ardiansyahii",
    live: null,
    accentColor: "#6366f1",
    number: "01",
  },
  {
    id: "geniuslib",
    name: "GeniusLib",
    subtitle: "School Library Management System",
    category: "Hybrid Application",
    year: "2024",
    description:
      "A hybrid library system combining a web dashboard for librarians and an Android app for students — modernizing physical library circulation through digital tools.",
    impact:
      "Eliminated paper-based borrowing records and introduced QR-based digital membership.",
    features: [
      "Online catalog (OPAC) with book reservation",
      "QR Code-based digital membership cards",
      "Automated fine calculation & return system",
      "Librarian web + Student mobile app",
    ],
    tags: [
      "Next.js",
      "Expo RN",
      "Express.js",
      "MySQL",
      "Tailwind CSS",
      "QR Code",
    ],
    github: "https://github.com/Ardiansyahii",
    live: null,
    accentColor: "#22d3ee",
    number: "02",
  },
];
