export const profile = {
  name: "Mubashira P",
  role: "Software Engineer",
  tagline: "Full-stack web development & AI-driven application integration",
  location: "Kerala, India",
  email: "pmubashira428@gmail.com",
  phone: "+91 7356162358",
  linkedin: "https://linkedin.com/in/mubashirap2",
  github: "https://github.com/MubashiraAli",
  resume: "/MubashiraP_resume.pdf",
  summary:
    "Software Engineer with hands-on experience in full-stack web development and AI-driven application integration. Currently developing AI-powered features for a hospital information system across frontend, backend, and REST APIs. Experienced in delivering full-stack applications and production-grade solutions using React.js, Next.js, Django, Node.js, and Gemini API.",
};

export const skills = [
  {
    title: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Frontend",
    items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Vite"],
  },
  {
    title: "Backend",
    items: ["Django", "Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Databases",
    items: ["MySQL", "PostgreSQL"],
  },
  {
    title: "AI / ML",
    items: ["Google Gemini API", "TensorFlow", "NLP"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Docker", "Postman", "Vercel"],
  },
];

export const experience = [
  {
    role: "Software Engineer",
    type: "Full-Time",
    company: "Curanova.ai",
    period: "Jun 2026 — Present",
    current: true,
    points: [
      "Developing a Hospital Information System (HIS) with a team of 4, integrating AI-powered features into full-stack healthcare workflows.",
      "Building and maintaining frontend, backend, and REST API components for scalable enterprise applications.",
      "Developing and enhancing application features using Python, React, Django, and SQL, with a focus on reliability and maintainability.",
      "Working with Git, GitHub, Docker, and Postman for version control, containerization, API testing, and collaborative development.",
      "Collaborating with cross-functional team members to debug issues, implement new features, optimize application workflows, and deliver production-ready solutions.",
    ],
    stack: ["Python", "React", "Django", "SQL", "Docker"],
  },
  {
    role: "Freelance Web Developer",
    type: "Self-Employed",
    company: "Self-Employed",
    period: "Dec 2025 — Jun 2026",
    current: false,
    points: [
      "Delivered 5+ full-stack web applications for independent clients using React.js, Next.js, REST APIs, TypeScript, and MySQL.",
      "Managed development, client communication, and project delivery independently.",
    ],
    stack: ["React.js", "Next.js", "TypeScript", "MySQL"],
  },
  {
    role: "Python Full Stack Developer Intern",
    type: "Internship",
    company: "Pentagon Space, Bengaluru",
    period: "May 2025 — Dec 2025",
    current: false,
    points: [
      "Developed backend modules using Python, Django, MySQL, and Django ORM within a 3-member development team.",
      "Built responsive UIs using React.js, HTML5, CSS3, and Tailwind CSS; collaborated using Git and GitHub.",
    ],
    stack: ["Python", "Django", "MySQL", "React.js", "Tailwind CSS"],
  },
];

export type Project = {
  name: string;
  blurb: string;
  points: string[];
  stack: string[];
  accent: string;
  /** Live deployment. Leave undefined to hide the "Live demo" button. */
  demo?: string;
  /** Source repository. Leave undefined to hide the "Source" button. */
  repo?: string;
};

export const projects: Project[] = [
  {
    name: "LearnHub",
    blurb:
      "E-learning platform supporting course browsing, student enrollment, and progress tracking, deployed on a cloud-based architecture.",
    points: [
      "Developed an e-learning platform supporting course browsing, student enrollment, and progress tracking using Next.js and PostgreSQL.",
      "Deployed on Vercel with Neon PostgreSQL, using a cloud-based architecture for reliable application and database hosting.",
    ],
    stack: ["Next.js", "Vercel", "Neon PostgreSQL"],
    accent: "from-violet-400 to-fuchsia-500",
    demo: "https://learn-hub-umber-zeta.vercel.app",
    repo: "https://github.com/MubashiraAli/learn-hub",
  },
  {
    name: "HomeVault",
    blurb:
      "Private household record for property, appliances, warranties and maintenance — organised room by room, with strict per-user data isolation.",
    points: [
      "Built a Next.js 16 App Router application on Prisma 7 and PostgreSQL, with Auth.js v5 credential sessions, bcrypt hashing and per-user data isolation enforced end to end.",
      "Implemented property and appliance CRUD alongside warranty and maintenance tracking, with derived status and recurrence calculations driving upkeep alerts.",
      "Hardened the data layer with Zod schemas shared across client and server, magic-byte file-upload validation, and verification scripts covering route policy, cross-user authorization, money handling and notification idempotency.",
    ],
    stack: [
      "Next.js 16",
      "TypeScript",
      "Prisma 7",
      "PostgreSQL",
      "Auth.js v5",
      "Tailwind CSS v4",
    ],
    accent: "from-lime-400 to-emerald-500",
    // demo: "",
    repo: "https://github.com/MubashiraAli/HomeVault",
  },
  {
    name: "FitTrack",
    blurb:
      "Cross-platform mobile fitness tracker with six tabs over a local-first store, so everything logged stays on the device.",
    points: [
      "Built a React Native app on Expo SDK 57 with Expo Router and NativeWind, shipping six tabs: dashboard, workouts, water, progress, goals and profile.",
      "Implemented a local-first store persisted to AsyncStorage, so logged data survives an app restart and never leaves the phone.",
      "Designed the dashboard around concentric daily-progress rings, a 7-day streak strip, quick-logging tiles and a weekly active-minutes chart, with generated app icons and EAS build profiles for Android and iOS.",
    ],
    stack: [
      "React Native",
      "Expo SDK 57",
      "TypeScript",
      "Expo Router",
      "NativeWind",
      "Reanimated",
    ],
    accent: "from-fuchsia-400 to-pink-500",
    // demo: "",
    repo: "https://github.com/MubashiraAli/FitTrack",
  },
  {
    name: "AI-Powered E-Commerce Application",
    blurb:
      "Full-stack e-commerce platform with a Gemini-powered AI shopping assistant for product recommendations and natural-language user queries.",
    points: [
      "Built a full-stack e-commerce platform with a Gemini-powered AI shopping assistant for product recommendations and natural-language user queries.",
      "Implemented a React.js frontend with Node.js/Express.js backend and MySQL database; deployed the application for production use.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MySQL", "Gemini API"],
    accent: "from-cyan-400 to-blue-500",
    demo: "https://ecommerce-ai-eta.vercel.app",
    repo: "https://github.com/MubashiraAli/ecommerce-ai",
  },
  {
    name: "Architecture Competition Platform",
    blurb:
      "Competition portal for architecture design contests — a public site plus a full admin dashboard, with online registration payments and downloadable reports.",
    points: [
      "Built a public site (featured competitions, categories, jury, winners, gallery, news, statistics) alongside a protected admin dashboard managing competitions, registrations, jury, winners, gallery and settings.",
      "Integrated Razorpay for registration payments, JWT and bcrypt authentication for admin access, and Multer-backed image uploads.",
      "Added XLSX and PDF export of registration reports so organisers can download and review submissions offline.",
    ],
    stack: ["React 19", "Vite", "Express 5", "Framer Motion", "Razorpay", "JWT"],
    accent: "from-rose-400 to-red-500",
    // demo: "",
    repo: "https://github.com/MubashiraAli/myarch-competition",
  },
  {
    name: "TaskFlow",
    blurb:
      "Full-stack task manager with drag-and-drop reordering, JWT authentication and a filterable dashboard, inspired by Notion and Trello.",
    points: [
      "Built a MERN task manager with register/login/logout over JWT cookies, protected routes, and per-user task data in MongoDB through Mongoose.",
      "Implemented drag-and-drop reordering, instant search, filtering by status, priority and category, custom categories, progress tracking, dashboard stats, and a dark/light theme with a persisted preference.",
    ],
    stack: ["React 19", "Vite", "Node.js", "Express.js", "MongoDB", "JWT"],
    accent: "from-emerald-400 to-teal-500",
    // demo: "",
    repo: "https://github.com/MubashiraAli/Task-Flow",
  },
  {
    name: "Wanderlane",
    blurb:
      "Travel agency website with a filterable tour catalogue whose entire filter state lives in the URL, so any view is a shareable link.",
    points: [
      "Built a Next.js 16 App Router site with statically prerendered trip and destination pages generated from a typed data layer, plus an API route behind the enquiry form.",
      "Designed a URL-driven filter and sort system across search, region, duration, pace, budget and themes, making every filtered catalogue view a shareable link.",
      "Created a licence-free illustration system that draws each destination as a layered duotone SVG scene instead of relying on stock photography.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"],
    accent: "from-indigo-400 to-sky-500",
    demo: "https://wanderlane-travel-mubashiraalis-projects.vercel.app",
    repo: "https://github.com/MubashiraAli/-wanderlane-travel",
  },
  {
    name: "MelodicVerse",
    blurb:
      "NLP-based application that converts text input into musical melodies, built leading a team of 4 from concept through deployment.",
    points: [
      "Led a team of 4 to develop an NLP-based application that converts text input into musical melodies.",
      "Designed and integrated the text-processing and melody-generation workflow, coordinating development from concept through deployment.",
    ],
    stack: ["Python", "TensorFlow", "NLP"],
    accent: "from-amber-400 to-orange-500",
    // demo: "https://melodicverse.vercel.app",
    // repo: "https://github.com/MubashiraAli/melodicverse",
  },
];

export const education = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    school: "A.P.J. Abdul Kalam Technological University, Kerala",
    period: "2022 — 2025",
  },
  {
    degree: "Diploma in Computer Science Engineering",
    school: "SSM Polytechnic College, Tirur, Kerala",
    period: "2019 — 2022",
  },
];

export const achievements = [
  { title: "1st Place — Blind Coding Competition", org: "Technical Fest" },
  { title: "Python Programming Workshop", org: "STEM Robotics" },
  { title: "Data Analytics Essentials", org: "Cisco" },
  { title: "IEEE Paper Presentation Certification", org: "IEEE" },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];
