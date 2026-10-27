export const profile = {
  name: "Saman Khan",
  legalName: "Saman Shakil Khan",
  title: "Software Engineer/Developer",
  location: "Dubai, UAE",
  locationFull: "Dubai, United Arab Emirates",
  phone: "+971 506019290",
  phoneHref: "tel:+971506019290",
  email: "samankhanhq@gmail.com",
  linkedin: "https://www.linkedin.com/in/saman-shakil-khan-62728b208/",
  linkedinLabel: "linkedin.com/in/saman-shakil-khan-62728b208",
  github: "https://github.com/buildwithsaman",
  githubLabel: "github.com/buildwithsaman",
  resume: "./Saman_Khan_CV.pdf",
  resumeName: "Saman_Khan_CV.pdf",
  heroLead:
    "Building production web platforms for mobility operations, subscriptions, analytics, and customer-facing experiences.",
  heroDescription:
    "Frontend-focused Software Engineer with 2+ years of experience building production web platforms for mobility operations, subscriptions, analytics, and customer-facing experiences.",
  heroSupport:
    "Primary frontend owner across large React/TypeScript admin systems and currently building Udrive's new Next.js website from Figma.",
  aboutIntro: "Frontend-focused Software Engineer based in Dubai, UAE",
  summary: [
    "Frontend-focused Software Engineer with 2+ years of experience building production web platforms for mobility operations, subscriptions, analytics, and customer-facing experiences.",
    "Primary frontend owner across large React/TypeScript admin systems and currently building Udrive's new Next.js website from Figma.",
    "Experienced in responsive UI architecture, data-heavy dashboards, D3/Mapbox visualizations, performance optimization, AWS deployment, and API integration, with additional production backend experience in Python/Kafka-based KYC automation.",
    "Delivered ~70% infrastructure cost reduction through analytics migration and improved debt recovery by 30% through invoice automation.",
  ],
  achievements: [
    {
      value: "~70%",
      label:
        "infrastructure cost reduction through migration to self-hosted Apache Superset analytics.",
    },
    {
      value: "30%",
      label: "improvement in debt recovery through invoice automation.",
    },
    {
      value: "6",
      label:
        "analytics areas built or heavily evolved: Trip Revenue, Cleaning, RTA Parking, Customer Stats, Metrics, and TARS.",
    },
    {
      value: "~20",
      label:
        "customer-facing website routes with English/Arabic locale routing and RTL support.",
    },
  ],
  workIntro:
    "Engineering contributions across Udrive mobility operations, subscriptions, analytics, and customer-facing experiences.",
  contactIntro:
    "Frontend-focused Software Engineer in Dubai, UAE, building production web platforms for mobility operations, subscriptions, analytics, and customer-facing experiences.",
  contactSupport:
    "Interested in collaborating, discussing engineering opportunities, or connecting professionally? Feel free to reach out.",
  footerTagline: "Software Engineer/Developer",
  siteUrl: "https://buildwithsaman.dev",
};

export const heroRoles = [
  "Software Engineer/Developer",
  "Frontend-focused Software Engineer",
  "React · Next.js · TypeScript",
] as const;

export const highlightLines = [
  "Frontend-focused Software Engineer",
  "Building production web platforms",
  "Primary frontend owner at Udrive",
  "React, Next.js, and TypeScript",
  "~70% infrastructure cost reduction",
  "30% improvement in debt recovery",
] as const;

export const featuredSkills = [
  "Next.js",
  "React.js",
  "TypeScript",
  "Python",
  "AWS",
  "D3.js",
];

export type Practice = {
  title: string;
  kicker: string;
  body: string;
  tools: string[];
};

export const practices: Practice[] = [
  {
    title: "Frontend architecture",
    kicker: "Production platforms",
    body: "Primary frontend owner across large React/TypeScript admin systems and currently building Udrive's new Next.js website from Figma.",
    tools: ["Next.js", "React.js", "TypeScript", "JavaScript"],
  },
  {
    title: "Systems beyond the UI",
    kicker: "KYC, analytics, automation",
    body: "Production backend experience in Python/Kafka-based KYC automation, plus analytics migration and invoice automation across AWS.",
    tools: ["Python", "Apache Kafka", "AWS", "Apache Superset"],
  },
];

export type ExperienceDomain = {
  id: string;
  title: string;
  role: string;
  ownership: string;
  contributions: string[];
  focus: string;
  tech: string[];
};

export const udriveDomains: ExperienceDomain[] = [
  {
    id: "operations-analytics",
    title: "Internal Operations & Analytics",
    role: "Primary Frontend Owner",
    ownership:
      "Primary frontend owner for a React + MUI internal operations platform spanning customers, verifications, reservations, invoices, vehicles, damage reports, credits, fines, claims, analytics, mobility operations, and admin tooling.",
    contributions: [
      "Built or heavily evolved six analytics areas — Trip Revenue, Cleaning, RTA Parking, Customer Stats, Metrics (D3), and TARS — with shared filters, responsive tables/charts, and CSV export workflows.",
      "Built mobility operations modules for a near-real-time Mapbox driver map (10-second polling), rides operations, driver management, and fleet management, including create/edit/assignment workflows and reusable UI patterns.",
      "Implemented vehicle operations including lock/unlock, immobilize/mobilize, onboarding/offboarding, location/state updates, and resilient loading, error, and toast feedback patterns.",
      "Built an in-app Banner Studio with draggable/resizable layers, text/images/shapes, templates, undo/redo, preview, and HTML/JSON export/import for lightweight marketing content creation.",
      "Maintained protected routing, JWT-based frontend auth flows, feature scopes/RBAC UI, release notes, and responsive layouts across desktop, tablet, and mobile.",
    ],
    focus:
      "React + MUI operations platform across customers, fleet, analytics, and mobility.",
    tech: ["React", "TypeScript", "Material UI", "D3.js", "Mapbox"],
  },
  {
    id: "subscription-crm",
    title: "Subscription, CRM & Fleet Operations",
    role: "Primary Frontend Developer",
    ownership:
      "Built most of the React frontend for the monthly subscription admin platform, covering the sales pipeline, customers/KYC, fleet operations, subscriptions, invoices, product catalog, analytics, and role-based administration.",
    contributions: [
      "Built the Lead → Initial Contact → Qualified → Won/Lost deals workflow with Kanban pipeline, stage transitions, filters/search, assignee management, lost/archive actions, lead creation, and one-click personalized WhatsApp outreach.",
      "Developed customer and fleet consoles with verification queues, payment/device/history views, account actions, MapLibre maps, hardware controls, reservations, damage reports, and vehicle state management.",
      "Implemented subscription car assignment, invoice operations, product management for colors/pricing/mileage packages, and D3 lead/funnel analytics; also created a filterable, print-friendly Deals Report.",
      "Migrated the frontend from CRA/CRACO to Vite for faster startup/HMR and simpler configuration while preserving the existing build output.",
      "Handled frontend build/deployment on AWS EC2 with Nginx and HTTPS.",
    ],
    focus:
      "Monthly subscription admin: sales pipeline, KYC, fleet, billing, and analytics.",
    tech: [
      "React",
      "TypeScript",
      "Material UI",
      "MapLibre",
      "D3.js",
      "Vite",
      "AWS",
    ],
  },
  {
    id: "website-apps",
    title: "Customer-Facing Web Development",
    role: "Frontend Developer",
    ownership:
      "Building a new customer-facing website from scratch from Figma using Next.js App Router, TypeScript, and CSS Modules, translating designs into pixel-accurate responsive experiences across desktop, tablet, and mobile.",
    contributions: [
      "Implemented roughly 20 routes spanning home, rental offerings, fleet, mobility services, business, help content, articles, contact, careers, and legal content, with English/Arabic locale routing and RTL support.",
      "Created reusable navigation, footer, hero, CTA, FAQ, pricing/rental, gallery, and content components to keep the design system consistent and maintainable across pages.",
      "Optimized page delivery with AWS CloudFront-hosted WebP/SVG/Lottie assets, next/image responsive loading, lazy loading, next/font, critical asset preloading, and offscreen/play-once Lottie behavior.",
    ],
    focus:
      "Next.js App Router website from Figma, with English/Arabic routing and RTL support.",
    tech: ["Next.js", "TypeScript", "CSS Modules", "AWS CloudFront", "Lottie"],
  },
  {
    id: "kyc-backend",
    title: "KYC & Verification Automation",
    role: "Software Engineering Contributor",
    ownership:
      "Contributed to a production Python/FastStream Kafka verification pipeline that orchestrates Taareef AI OCR, face/liveness/audio checks, AWS S3 documents, Postgres updates, and automated approval/rejection workflows.",
    contributions: [
      "Implemented and maintained validation and decisioning around Emirates ID, UAE/foreign driving licences, and passports.",
      "Supported eligibility checks for age, document expiry, and driving experience, plus cross-document name matching, face/liveness checks, and fraud signals.",
    ],
    focus:
      "Python/FastStream Kafka pipeline for document validation and automated KYC decisions.",
    tech: [
      "Python",
      "FastStream",
      "Apache Kafka",
      "PostgreSQL",
      "AWS S3",
      "Pydantic",
    ],
  },
  {
    id: "automation-tools",
    title: "Platform Automation & Observability",
    role: "Software Engineering Contributor",
    ownership:
      "Improved business operations through invoice automation, analytics infrastructure modernization, and operational monitoring.",
    contributions: [
      "Delivered invoice automation using serverless functions, improving debt recovery by 30% while reducing manual operational overhead.",
      "Migrated analytics to self-hosted Apache Superset with secure data pipelines/authentication, reducing infrastructure costs by ~70%.",
      "Contributed to Kafka-based monitoring and operational visibility.",
    ],
    focus:
      "Serverless invoice automation and self-hosted Apache Superset analytics.",
    tech: ["Apache Superset", "Python", "AWS", "Serverless", "Apache Kafka"],
  },
];

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  /** Machine-readable dates for <time dateTime>; display still uses `period`. */
  periodStart: string;
  periodEnd?: string;
  summary: string[];
  recognition?: string;
  domains?: ExperienceDomain[];
};

export const experiences: Experience[] = [
  {
    company: "Udrive — Rent-a-Car",
    role: "Software Engineer/Developer",
    location: "Dubai, UAE",
    period: "August 2024 – Present",
    periodStart: "2024-08",
    summary: [
      "Frontend-focused Software Engineer building production web platforms for mobility operations, subscriptions, analytics, and customer-facing experiences.",
      "Primary frontend owner across large React/TypeScript admin systems, currently building Udrive's new Next.js website from Figma, with additional production work in Python/Kafka KYC automation, analytics migration, and invoice automation.",
    ],
    domains: udriveDomains,
  },
  {
    company: "Arata International FZC — Bahwan International Group",
    role: "IT Intern",
    location: "Dubai, UAE",
    period: "February 2024 – June 2024",
    periodStart: "2024-02",
    periodEnd: "2024-06",
    summary: [
      "Built and shipped a cross-platform React Native (Expo) app for buying and selling used vehicles, with relational data models for profiles, listings, and bidding transactions.",
      "Developed and maintained REST APIs using .NET; supported CARPRO rental/leasing data operations and INTELLiVIEW BI dashboards/data-quality workflows.",
    ],
    recognition:
      "Certificate of Appreciation for successful completion of the Engineering & Technology Services Division internship.",
  },
  {
    company: "Dubai Technologies",
    role: "Software Intern",
    location: "Dubai, UAE",
    period: "July 2023 – August 2023",
    periodStart: "2023-07",
    periodEnd: "2023-08",
    summary: [
      "Developed responsive desktop GUIs using Python (Tkinter, PyQt) and collaborated with cross-functional teams to translate requirements into deployable software solutions.",
    ],
  },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      "Next.js",
      "React.js",
      "TypeScript",
      "JavaScript",
      "MUI",
      "CSS Modules",
      "Redux",
      "React Router",
      "D3.js",
      "Mapbox",
      "MapLibre",
      "Lottie",
      "React Native (Expo)",
    ],
  },
  {
    category: "Backend & Integration",
    items: [
      "Python",
      "FastStream",
      "Node.js",
      "Express",
      ".NET",
      "REST APIs",
      "Kafka consumers",
      "Pydantic",
      "asyncpg",
      "JWT",
      "OAuth2",
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      "AWS EC2",
      "AWS S3",
      "AWS CloudFront",
      "AWS Route 53",
      "AWS CloudWatch",
      "Nginx",
      "Cloudflare",
      "GitHub Actions",
      "Vite",
      "CRACO",
    ],
  },
  {
    category: "Data & Monitoring",
    items: [
      "Apache Kafka",
      "Apache Airflow",
      "Apache Superset",
      "PostgreSQL",
      "MS SQL Server",
      "Firebase",
    ],
  },
  {
    category: "Tools",
    items: [
      "Git",
      "GitHub",
      "Jira",
      "Confluence",
      "Figma",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Premiere Pro",
    ],
  },
];

export type EducationItem = {
  degree: string;
  place: string;
  period: string;
};

export const education: EducationItem[] = [
  {
    degree: "B.Tech in Computer Science Engineering",
    place: "Manipal Academy of Higher Education, Dubai",
    period: "Graduated 2024",
  },
  {
    degree: "Higher Secondary (CBSE, PCM)",
    place: "IES, Sharjah, UAE",
    period: "2018–2020",
  },
];

export const certifications = [
  {
    name: "Mathematics for Machine Learning",
    org: "Imperial College London, Coursera",
    year: "2021",
  },
  {
    name: "Object-Oriented Programming in Java",
    org: "UC San Diego, Coursera",
    year: "2021",
  },
  {
    name: "Introduction to Networks & IoT Fundamentals",
    org: "Cisco Networking Academy",
    year: "2023",
  },
  {
    name: "Blockchain Foundation & Ethereum Fundamentals",
    org: "Kerala Blockchain Academy",
    year: "2023",
  },
];

export const volunteer = [
  {
    role: "Sponsorship Head",
    org: "Technovanza MAHE Dubai – School of Engineering & IT",
    year: "2023",
  },
  {
    role: "Volunteer",
    org: "AJAR Ramadan Drive, Manipal Academy of Higher Education, Dubai",
    year: "2022",
  },
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "career", label: "Career" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const stageActs = [
  { id: "home", label: "01", name: "Home" },
  { id: "about", label: "02", name: "About" },
  { id: "career", label: "03", name: "Career" },
  { id: "work", label: "04", name: "Work" },
  { id: "skills", label: "05", name: "Skills" },
  { id: "contact", label: "06", name: "Contact" },
];
