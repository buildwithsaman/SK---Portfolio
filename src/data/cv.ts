export const profile = {
  name: "Saman Khan",
  legalName: "Saman Shakil Khan",
  givenName: "Saman",
  familyName: "Khan",
  title: "Software Engineer / Developer",
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
    "I build production web platforms, from internal operations systems to customer-facing experiences.",
  heroDescription:
    "Frontend-focused Software Engineer in Dubai with 2+ years of experience building production web platforms for mobility operations, subscriptions, analytics, and customer-facing experiences.",
  heroSupport:
    "Working across React, Next.js, TypeScript, and Python, with a focus on frontend architecture, operational systems, and API integration.",
  summary: [
    "Frontend-focused Software Engineer with 2+ years of experience building production web platforms for mobility operations, subscriptions, analytics, and customer-facing experiences.",
    "Primary frontend owner across large React and TypeScript admin systems, with additional production backend experience in Python and Kafka-based KYC automation.",
    "I work on responsive UI architecture, data-heavy dashboards, performance optimization, AWS deployment, and API integration.",
    "At Udrive, analytics infrastructure costs fell by about 70% after migrating to self-hosted Apache Superset, and debt recovery improved by 30% through invoice automation.",
  ],
  achievements: [
    {
      value: "~70%",
      label:
        "reduction in analytics infrastructure costs through migration to self-hosted Apache Superset.",
    },
    {
      value: "30%",
      label: "improvement in debt recovery through invoice automation.",
    },
    {
      value: "6",
      label:
        "analytics areas built or significantly evolved: Trip Revenue, Cleaning, RTA Parking, Customer Stats, Metrics (D3), and TARS.",
    },
  ],
  workIntro:
    "Five production domains at Udrive, spanning internal operations, subscription platforms, customer-facing web, verification workflows, and platform automation.",
  contactIntro:
    "I'm a Dubai-based Software Engineer working across frontend architecture, production systems, and automation. I'm open to engineering opportunities, technical collaborations, and conversations about building better software.",
  contactHeading: "Have Something Worth Building?",
  footerTagline: "Software Engineer/Developer",
  siteUrl: "https://buildwithsaman.dev",
  seoTitle: "Saman Khan | Software Engineer in Dubai",
  seoDescription:
    "Frontend-focused Software Engineer in Dubai with 2+ years of experience building production web platforms for mobility operations, subscriptions, analytics, and customer-facing experiences.",
  contentUpdated: "2026-10-29",
};

export const heroRoles = [
  "Software Engineer / Developer",
  "Frontend Architecture",
  "Production Web Platforms",
  "Production Systems & Automation",
] as const;

export const highlightLines = [
  "Frontend-focused Software Engineer with production web platform experience",
  "Primary frontend owner for Udrive operations, and built most of the subscription admin frontend",
  "React, Next.js, TypeScript, and Python",
  "About 70% analytics infrastructure cost reduction",
  "30% improvement in debt recovery",
] as const;

export type TechStackItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  alt: string;
};

export const techStack: TechStackItem[] = [
  {
    id: "nextjs",
    title: "Next.js",
    subtitle: "App Router",
    href: "https://nextjs.org",
    alt: "Next.js",
  },
  {
    id: "react",
    title: "React",
    subtitle: "Interfaces",
    href: "https://react.dev",
    alt: "React",
  },
  {
    id: "typescript",
    title: "TypeScript",
    subtitle: "Typed JS",
    href: "https://www.typescriptlang.org",
    alt: "TypeScript",
  },
  {
    id: "python",
    title: "Python",
    subtitle: "Services",
    href: "https://www.python.org",
    alt: "Python",
  },
  {
    id: "aws",
    title: "AWS",
    subtitle: "Cloud",
    href: "https://aws.amazon.com",
    alt: "Amazon Web Services",
  },
  {
    id: "d3",
    title: "D3.js",
    subtitle: "Charts",
    href: "https://d3js.org",
    alt: "D3.js",
  },
  {
    id: "mui",
    title: "MUI",
    subtitle: "Components",
    href: "https://mui.com",
    alt: "Material UI",
  },
  {
    id: "mapbox",
    title: "Mapbox",
    subtitle: "Mapping",
    href: "https://www.mapbox.com",
    alt: "Mapbox",
  },
  {
    id: "nodejs",
    title: "Node.js",
    subtitle: "Runtime",
    href: "https://nodejs.org",
    alt: "Node.js",
  },
  {
    id: "kafka",
    title: "Apache Kafka",
    subtitle: "Streaming",
    href: "https://kafka.apache.org",
    alt: "Apache Kafka",
  },
  {
    id: "rest",
    title: "REST APIs",
    subtitle: "HTTP",
    href: "https://developer.mozilla.org",
    alt: "REST APIs",
  },
  {
    id: "vite",
    title: "Vite",
    subtitle: "Tooling",
    href: "https://vite.dev",
    alt: "Vite",
  },
  {
    id: "nginx",
    title: "Nginx",
    subtitle: "Delivery",
    href: "https://nginx.org",
    alt: "Nginx",
  },
  {
    id: "github-actions",
    title: "GitHub Actions",
    subtitle: "CI/CD",
    href: "https://github.com/features/actions",
    alt: "GitHub Actions",
  },
];

export type Practice = {
  title: string;
  kicker: string;
  body: string;
};

export const practices: Practice[] = [
  {
    title: "Frontend Engineering & Architecture",
    kicker: "Interfaces",
    body: "Building React and Next.js applications, from administrative platforms to responsive customer-facing websites. Focused on reusable architecture, data-intensive interfaces, performance, and maintainability.",
  },
  {
    title: "Platform & Systems Engineering",
    kicker: "Operations",
    body: "Developing operational workflows, API integrations, fleet management interfaces, near-real-time tracking, and subscription systems that support day-to-day business operations.",
  },
  {
    title: "Automation, Data & Analytics",
    kicker: "Impact",
    body: "Contributing to production Python/Kafka verification pipelines, developing analytics dashboards, and implementing automation that reduces operational overhead and infrastructure costs.",
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
    title: "Engineering Internal Operations & Analytics",
    role: "Primary frontend owner",
    ownership:
      "Primary frontend owner for a large React/MUI operations platform spanning customers, verifications, reservations, invoices, vehicles, analytics, mobility operations, and admin tooling.",
    contributions: [
      "Six analytics areas developed or significantly evolved.",
      "Near-real-time Mapbox driver tracking with 10-second polling.",
      "Interactive Banner Studio with draggable and resizable layers, templates, undo/redo, and export/import.",
      "Fleet controls, administrative workflows, protected routing, and role-based UI.",
    ],
    focus:
      "React and MUI operations platform across fleet, customers, analytics, and mobility.",
    tech: ["React", "TypeScript", "MUI", "D3.js", "Mapbox", "REST APIs"],
  },
  {
    id: "subscription-crm",
    title: "Building Subscription, CRM & Fleet Platforms",
    role: "Built most of the frontend",
    ownership:
      "Built most of the React frontend for the monthly subscription admin platform, covering the sales pipeline, customers and KYC, fleet operations, subscriptions, invoices, product catalog, and role-based administration.",
    contributions: [
      "Kanban CRM with lead lifecycle management.",
      "Subscription and fleet management workflows.",
      "Customer verification and administrative consoles.",
      "CRA/CRACO to Vite migration.",
      "AWS EC2, Nginx, and HTTPS deployment.",
    ],
    focus:
      "Subscription administration covering sales, verification, fleet, invoices, and product setup.",
    tech: ["React", "TypeScript", "MUI", "MapLibre", "Vite", "AWS", "Nginx"],
  },
  {
    id: "website-apps",
    title: "Developing a Multilingual Next.js Website",
    role: "Frontend development",
    ownership:
      "Developing a responsive customer-facing website from Figma using Next.js, with reusable components, English/Arabic support, RTL layouts, and performance-focused asset delivery.",
    contributions: [
      "Approximately 20 routes.",
      "Next.js App Router and TypeScript.",
      "Responsive design implementation from Figma.",
      "AWS CloudFront-hosted assets.",
      "WebP, SVG, and Lottie optimization.",
      "Responsive loading, lazy loading, and critical asset preloading.",
    ],
    focus:
      "Next.js App Router website from Figma, with English/Arabic routing and RTL support. Currently in development.",
    tech: ["Next.js", "TypeScript", "CSS Modules", "CloudFront", "Lottie"],
  },
  {
    id: "kyc-backend",
    title: "Automating Identity Verification Workflows",
    role: "Backend contribution",
    ownership:
      "Contributed to a production Python/FastStream Kafka pipeline supporting document verification, eligibility checks, name matching, and automated approval and rejection workflows.",
    contributions: [
      "Emirates ID, driving licence, and passport verification.",
      "Document eligibility and expiry validation.",
      "Cross-document name matching.",
      "Face and liveness verification integrations.",
      "Kafka, AWS S3, PostgreSQL, and Python.",
    ],
    focus:
      "Production Python/FastStream Kafka pipeline for document validation and automated KYC decisions.",
    tech: ["Python", "FastStream", "Apache Kafka", "PostgreSQL", "AWS S3"],
  },
  {
    id: "automation-tools",
    title: "Reducing Costs Through Platform Automation",
    role: "Platform contribution",
    ownership:
      "Migrated analytics to self-hosted Apache Superset and delivered serverless invoice automation, reducing infrastructure costs and manual operational overhead.",
    contributions: [
      "Approximately 70% analytics infrastructure cost reduction.",
      "30% improvement in debt recovery.",
      "Self-hosted analytics infrastructure.",
      "Serverless invoice automation.",
      "Kafka-based monitoring and operational visibility contributions.",
    ],
    focus:
      "Self-hosted Apache Superset analytics and serverless invoice automation.",
    tech: ["Apache Superset", "AWS", "Apache Kafka"],
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
    company: "Udrive – Rent-a-Car",
    role: "Software Engineer/Developer",
    location: "Dubai, UAE",
    period: "August 2024 – Present",
    periodStart: "2024-08",
    summary: [
      "Primary frontend owner for internal operations, built most of the subscription admin frontend, and currently developing the customer-facing Next.js website.",
    ],
    domains: udriveDomains,
  },
  {
    company: "Arata International FZC (Bahwan International Group)",
    role: "IT Intern",
    location: "Dubai, UAE",
    period: "February 2024 – June 2024",
    periodStart: "2024-02",
    periodEnd: "2024-06",
    summary: [
      "Built a cross-platform React Native (Expo) app for buying and selling used vehicles, developed and maintained .NET REST APIs, and supported rental operations and business intelligence workflows.",
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
      "Developed responsive desktop GUIs using Python (Tkinter and PyQt) and collaborated with cross-functional teams to translate requirements into deployable software.",
    ],
  },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend Engineering",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "MUI",
      "D3.js",
      "CSS Modules",
    ],
  },
  {
    category: "Backend & Integration",
    items: [
      "Python",
      "Node.js",
      "REST APIs",
      "FastStream",
      "Apache Kafka",
      "PostgreSQL",
    ],
  },
  {
    category: "Cloud & Deployment",
    items: [
      "AWS",
      "CloudFront",
      "Nginx",
      "Cloudflare",
      "GitHub Actions",
      "Vite",
    ],
  },
  {
    category: "Data & Visualization",
    items: ["Apache Superset", "Mapbox", "MapLibre", "D3.js", "Apache Kafka"],
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
    period: "2018 – 2020",
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
    org: "Technovanza MAHE Dubai, School of Engineering & IT",
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
  { id: "career", label: "Career" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
