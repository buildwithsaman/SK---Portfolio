export const profile = {
  name: "Saman Shakil Khan",
  title: "Software Engineer/Developer",
  location: "Dubai, UAE",
  phone: "+971 50 601 9290",
  email: "samankhanhq@gmail.com",
  linkedin: "https://www.linkedin.com/in/saman-shakil-khan-62728b208/",
  github: "https://github.com/buildwithsaman",
  resume: "./Saman_Khan_CV.pdf",
  resumeName: "Saman_Khan_CV.pdf",
  /** Short hero line — taken from the CV professional summary */
  heroDescription:
    "Frontend-focused Software Engineer with 2+ years of experience building production web platforms for mobility operations, subscriptions, analytics, and customer-facing experiences.",
  /** Full professional summary — verbatim from the CV */
  summary:
    "Frontend-focused Software Engineer with 2+ years of experience building production web platforms for mobility operations, subscriptions, analytics, and customer-facing experiences. Primary frontend owner across large React/TypeScript admin systems and currently building Udrive’s new Next.js website from Figma. Experienced in responsive UI architecture, data-heavy dashboards, D3/Mapbox visualizations, performance optimization, AWS deployment, and API integration, with additional production backend experience in Python/Kafka-based KYC automation. Delivered ~70% infrastructure cost reduction through analytics migration and improved debt recovery by 30% through invoice automation.",
  siteUrl: "https://buildwithsaman.dev",
};

export const stats = [
  { label: "Years experience", value: "2+" },
  { label: "Infra cost reduction", value: "~70%" },
  { label: "Debt recovery lift", value: "+30%" },
  { label: "App routes shipped", value: "~20" },
];

export const heroTechnologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "AWS",
  "Kafka",
];

export type ExperienceDomain = {
  id: string;
  title: string;
  /** CV section lead / ownership line */
  ownership: string;
  /** CV bullet details for this section */
  built: string;
  tech: string[];
  /** Optional CV-stated outcome (metrics only when present on the CV) */
  result?: string;
};

/** Expandable Udrive domains — copy taken from the CV experience sections */
export const udriveDomains: ExperienceDomain[] = [
  {
    id: "operations-analytics",
    title: "Internal Operations & Analytics",
    ownership:
      "Primary frontend owner for a React + MUI internal operations platform spanning customers, verifications, reservations, invoices, vehicles, damage reports, credits, fines, claims, analytics, mobility operations, and admin tooling.",
    built:
      "Built or heavily evolved six analytics areas — Trip Revenue, Cleaning, RTA Parking, Customer Stats, Metrics (D3), and TARS — with shared filters, responsive tables/charts, and CSV export workflows. Built mobility operations modules for a near-real-time Mapbox driver map (10-second polling), rides operations, driver management, and fleet management, including create/edit/assignment workflows and reusable UI patterns. Implemented vehicle operations including lock/unlock, immobilize/mobilize, onboarding/offboarding, location/state updates, and resilient loading, error, and toast feedback patterns. Built an in-app Banner Studio with draggable/resizable layers, text/images/shapes, templates, undo/redo, preview, and HTML/JSON export/import for lightweight marketing content creation. Maintained protected routing, JWT-based frontend auth flows, feature scopes/RBAC UI, release notes, and responsive layouts across desktop, tablet, and mobile.",
    tech: ["React", "TypeScript", "MUI", "Mapbox", "D3.js", "JWT", "RBAC"],
  },
  {
    id: "subscription-crm",
    title: "Subscription, CRM & Fleet Operations",
    ownership:
      "Built most of the React frontend for the monthly subscription admin platform, covering the sales pipeline, customers/KYC, fleet operations, subscriptions, invoices, product catalog, analytics, and role-based administration.",
    built:
      "Built the Lead → Initial Contact → Qualified → Won/Lost deals workflow with Kanban pipeline, stage transitions, filters/search, assignee management, lost/archive actions, lead creation, and one-click personalized WhatsApp outreach. Developed customer and fleet consoles with verification queues, payment/device/history views, account actions, MapLibre maps, hardware controls, reservations, damage reports, and vehicle state management. Implemented subscription car assignment, invoice operations, product management for colors/pricing/mileage packages, and D3 lead/funnel analytics; also created a filterable, print-friendly Deals Report. Migrated the frontend from CRA/CRACO to Vite for faster startup/HMR and simpler configuration while preserving the existing build output; handled frontend build/deployment on AWS EC2 with Nginx and HTTPS.",
    tech: [
      "React",
      "TypeScript",
      "MUI",
      "MapLibre",
      "D3.js",
      "Vite",
      "AWS EC2",
      "Nginx",
    ],
  },
  {
    id: "website-apps",
    title: "Customer-Facing Web Development",
    ownership:
      "Building a new customer-facing website from scratch from Figma using Next.js App Router, TypeScript, and CSS Modules, translating designs into pixel-accurate responsive experiences across desktop, tablet, and mobile.",
    built:
      "Implemented roughly 20 routes spanning home, rental offerings, fleet, mobility services, business, help content, articles, contact, careers, and legal content, with English/Arabic locale routing and RTL support. Created reusable navigation, footer, hero, CTA, FAQ, pricing/rental, gallery, and content components to keep the design system consistent and maintainable across pages. Optimized page delivery with AWS CloudFront-hosted WebP/SVG/Lottie assets, next/image responsive loading, lazy loading, next/font, critical asset preloading, and offscreen/play-once Lottie behavior.",
    tech: [
      "Next.js",
      "TypeScript",
      "CSS Modules",
      "CloudFront",
      "Lottie",
    ],
  },
  {
    id: "kyc-backend",
    title: "KYC & Verification Automation",
    ownership:
      "Contributed to a production Python/FastStream Kafka verification pipeline that orchestrates Taareef AI OCR, face/liveness/audio checks, AWS S3 documents, Postgres updates, and automated approval/rejection workflows.",
    built:
      "Implemented/maintained validation and decisioning around Emirates ID, UAE/foreign driving licences, and passports, including age/expiry/driving-experience eligibility, cross-document name matching, face/liveness checks, and fraud signals.",
    tech: [
      "Python",
      "FastStream",
      "Kafka",
      "AWS S3",
      "PostgreSQL",
    ],
  },
  {
    id: "automation-tools",
    title: "Platform Automation & Observability",
    ownership:
      "Delivered invoice automation using serverless functions, improving debt recovery by 30% while reducing manual operational overhead.",
    built:
      "Migrated analytics to self-hosted Apache Superset with secure data pipelines/authentication, reducing infrastructure costs by ~70%; contributed to Kafka-based monitoring and operational visibility.",
    tech: ["Serverless", "Apache Superset", "Kafka", "AWS"],
    result:
      "Improved debt recovery by 30% through invoice automation and reduced infrastructure costs by ~70% via the Superset analytics migration.",
  },
];

export type CaseStudy = {
  number: string;
  type: "operations" | "analytics" | "lifecycle";
  category: string;
  title: string;
  problem: string;
  ownership: string;
  implementation: string;
  result: string;
  impact: { value: string; label: string }[];
  tech: string[];
};

/** Featured metrics only — values stated on the CV */
export const caseStudies: CaseStudy[] = [
  {
    number: "01",
    type: "operations",
    category: "Internal Operations & Analytics",
    title: "Six analytics areas and a near-real-time Mapbox driver map.",
    problem: "",
    ownership:
      "Primary frontend owner for a React + MUI internal operations platform.",
    implementation:
      "Six analytics areas (Trip Revenue, Cleaning, RTA Parking, Customer Stats, Metrics with D3, and TARS) with shared filters, CSV export, and a Mapbox driver map with 10-second polling.",
    result: "",
    impact: [
      { value: "6", label: "analytics areas" },
      { value: "10s", label: "map polling" },
    ],
    tech: ["React", "TypeScript", "MUI", "Mapbox", "D3.js"],
  },
  {
    number: "02",
    type: "lifecycle",
    category: "Customer-Facing Web Development",
    title: "Next.js website from Figma with English/Arabic routing and RTL.",
    problem: "",
    ownership:
      "Building a new customer-facing website from scratch from Figma using Next.js App Router, TypeScript, and CSS Modules.",
    implementation:
      "Roughly 20 routes with English/Arabic locale routing and RTL support; CloudFront-hosted assets with lazy loading and controlled Lottie behavior.",
    result: "",
    impact: [
      { value: "~20", label: "routes" },
      { value: "EN / AR", label: "locale + RTL" },
    ],
    tech: ["Next.js", "TypeScript", "CSS Modules", "CloudFront", "Lottie"],
  },
  {
    number: "03",
    type: "analytics",
    category: "Platform Automation & Observability",
    title: "Invoice automation and Apache Superset analytics migration.",
    problem: "",
    ownership:
      "Delivered invoice automation using serverless functions; migrated analytics to self-hosted Apache Superset.",
    implementation:
      "Serverless invoice automation and self-hosted Apache Superset with secure data pipelines/authentication; Kafka-based monitoring contributions.",
    result:
      "Improved debt recovery by 30%; reduced infrastructure costs by ~70%.",
    impact: [
      { value: "~70%", label: "infra cost reduction" },
      { value: "+30%", label: "debt recovery" },
    ],
    tech: ["Python", "Kafka", "FastStream", "Superset", "AWS"],
  },
];

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  projects: {
    name?: string;
    points: string[];
  }[];
  recognition?: string;
  domains?: ExperienceDomain[];
};

export const experiences: Experience[] = [
  {
    company: "Udrive – Rent-a-Car",
    role: "Software Engineer/Developer",
    location: "Dubai, UAE",
    period: "Aug 2024 – Present",
    summary:
      "Primary frontend owner across large React/TypeScript admin systems and currently building Udrive’s new Next.js website from Figma — covering internal operations & analytics, subscription/CRM, KYC automation, and platform automation.",
    domains: udriveDomains,
    projects: [
      {
        name: "Internal Operations & Analytics",
        points: [
          "Primary frontend owner for a React + MUI internal operations platform spanning customers, verifications, reservations, invoices, vehicles, damage reports, credits, fines, claims, analytics, mobility operations, and admin tooling.",
          "Built or heavily evolved six analytics areas — Trip Revenue, Cleaning, RTA Parking, Customer Stats, Metrics (D3), and TARS — with shared filters, responsive tables/charts, and CSV export workflows.",
          "Built mobility operations modules for a near-real-time Mapbox driver map (10-second polling), rides operations, driver management, and fleet management, including create/edit/assignment workflows and reusable UI patterns.",
          "Implemented vehicle operations including lock/unlock, immobilize/mobilize, onboarding/offboarding, location/state updates, and resilient loading, error, and toast feedback patterns.",
          "Built an in-app Banner Studio with draggable/resizable layers, text/images/shapes, templates, undo/redo, preview, and HTML/JSON export/import for lightweight marketing content creation.",
          "Maintained protected routing, JWT-based frontend auth flows, feature scopes/RBAC UI, release notes, and responsive layouts across desktop, tablet, and mobile.",
        ],
      },
      {
        name: "Subscription, CRM & Fleet Operations",
        points: [
          "Built most of the React frontend for the monthly subscription admin platform, covering the sales pipeline, customers/KYC, fleet operations, subscriptions, invoices, product catalog, analytics, and role-based administration.",
          "Built the Lead → Initial Contact → Qualified → Won/Lost deals workflow with Kanban pipeline, stage transitions, filters/search, assignee management, lost/archive actions, lead creation, and one-click personalized WhatsApp outreach.",
          "Developed customer and fleet consoles with verification queues, payment/device/history views, account actions, MapLibre maps, hardware controls, reservations, damage reports, and vehicle state management.",
          "Implemented subscription car assignment, invoice operations, product management for colors/pricing/mileage packages, and D3 lead/funnel analytics; also created a filterable, print-friendly Deals Report.",
          "Migrated the frontend from CRA/CRACO to Vite for faster startup/HMR and simpler configuration while preserving the existing build output; handled frontend build/deployment on AWS EC2 with Nginx and HTTPS.",
        ],
      },
      {
        name: "Customer-Facing Web Development",
        points: [
          "Building a new customer-facing website from scratch from Figma using Next.js App Router, TypeScript, and CSS Modules, translating designs into pixel-accurate responsive experiences across desktop, tablet, and mobile.",
          "Implemented roughly 20 routes spanning home, rental offerings, fleet, mobility services, business, help content, articles, contact, careers, and legal content, with English/Arabic locale routing and RTL support.",
          "Created reusable navigation, footer, hero, CTA, FAQ, pricing/rental, gallery, and content components to keep the design system consistent and maintainable across pages.",
          "Optimized page delivery with AWS CloudFront-hosted WebP/SVG/Lottie assets, next/image responsive loading, lazy loading, next/font, critical asset preloading, and offscreen/play-once Lottie behavior.",
        ],
      },
      {
        name: "KYC & Verification Automation",
        points: [
          "Contributed to a production Python/FastStream Kafka verification pipeline that orchestrates Taareef AI OCR, face/liveness/audio checks, AWS S3 documents, Postgres updates, and automated approval/rejection workflows.",
          "Implemented/maintained validation and decisioning around Emirates ID, UAE/foreign driving licences, and passports, including age/expiry/driving-experience eligibility, cross-document name matching, face/liveness checks, and fraud signals.",
        ],
      },
      {
        name: "Platform Automation & Observability",
        points: [
          "Delivered invoice automation using serverless functions, improving debt recovery by 30% while reducing manual operational overhead.",
          "Migrated analytics to self-hosted Apache Superset with secure data pipelines/authentication, reducing infrastructure costs by ~70%; contributed to Kafka-based monitoring and operational visibility.",
        ],
      },
    ],
  },
  {
    company: "Arata International FZC (Bahwan International Group)",
    role: "IT Intern",
    location: "Dubai, UAE",
    period: "Feb 2024 – Jun 2024",
    summary:
      "Built and shipped a cross-platform React Native (Expo) app for buying and selling used vehicles; developed and maintained REST APIs using .NET; supported CARPRO rental/leasing data operations and INTELLiVIEW BI dashboards/data-quality workflows.",
    projects: [
      {
        points: [
          "Built and shipped a cross-platform React Native (Expo) app for buying and selling used vehicles, with relational data models for profiles, listings, and bidding transactions.",
          "Developed and maintained REST APIs using .NET; supported CARPRO rental/leasing data operations and INTELLiVIEW BI dashboards/data-quality workflows.",
        ],
      },
    ],
    recognition:
      "Certificate of Appreciation for successful completion of the Engineering & Technology Services Division internship.",
  },
  {
    company: "Dubai Technologies",
    role: "Software Intern",
    location: "Dubai, UAE",
    period: "Jul 2023 – Aug 2023",
    summary:
      "Developed responsive desktop GUIs using Python (Tkinter, PyQt) and collaborated with cross-functional teams to translate requirements into deployable software solutions.",
    projects: [
      {
        points: [
          "Developed responsive desktop GUIs using Python (Tkinter, PyQt) and collaborated with cross-functional teams to translate requirements into deployable software solutions.",
        ],
      },
    ],
  },
];

export const howIWork = [
  {
    title: "End-to-end feature development",
    body: "Own features from requirements through implementation, integration, and production release.",
  },
  {
    title: "Architecture & reusable components",
    body: "Design modular UI systems and shared patterns that keep large admin platforms maintainable.",
  },
  {
    title: "Figma-to-production delivery",
    body: "Translate designs into responsive, pixel-accurate React and Next.js experiences.",
  },
  {
    title: "API & backend integration",
    body: "Integrate REST APIs and contribute to Python/Kafka workflows where production systems require it.",
  },
  {
    title: "Authentication & RBAC",
    body: "Implement JWT-based auth flows, protected routing, and role/feature-scoped UI access.",
  },
  {
    title: "Performance & reliability",
    body: "Optimize loading, assets, and feedback states so production applications remain usable under real conditions.",
  },
  {
    title: "AWS deployment workflows",
    body: "Ship and maintain applications on AWS with EC2, Nginx/HTTPS, S3, and CloudFront where applicable.",
  },
  {
    title: "Production maintenance",
    body: "Debug, iterate, and improve live systems used by operations, sales, and customers.",
  },
];

export type SkillGroup = {
  category: string;
  subgroups: {
    label: string;
    items: string[];
  }[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    subgroups: [
      {
        label: "Core",
        items: ["React", "Next.js", "TypeScript", "JavaScript", "MUI"],
      },
      {
        label: "Supporting",
        items: [
          "CSS Modules",
          "Redux",
          "React Router",
          "Lottie",
          "React Native (Expo)",
        ],
      },
    ],
  },
  {
    category: "Backend & Integration",
    subgroups: [
      {
        label: "Core",
        items: ["Python", "REST APIs", "Kafka"],
      },
      {
        label: "Supporting",
        items: [
          "FastStream",
          "Node.js / Express",
          ".NET",
          "JWT / OAuth2",
          "Pydantic",
          "asyncpg",
        ],
      },
    ],
  },
  {
    category: "Data & Visualization",
    subgroups: [
      {
        label: "Core",
        items: ["Mapbox", "D3.js", "Apache Superset"],
      },
      {
        label: "Supporting",
        items: [
          "MapLibre",
          "PostgreSQL",
          "MS SQL Server",
          "Firebase",
          "Apache Airflow",
        ],
      },
    ],
  },
  {
    category: "Infrastructure & Tools",
    subgroups: [
      {
        label: "Core",
        items: ["AWS", "Git", "Vite"],
      },
      {
        label: "Supporting",
        items: [
          "EC2",
          "S3",
          "CloudFront",
          "Nginx",
          "Cloudflare",
          "GitHub Actions",
          "Jira",
          "Figma implementation",
        ],
      },
    ],
  },
];

export const techCloud = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "MUI",
  "Python",
  "REST APIs",
  "Kafka",
  "Mapbox",
  "D3.js",
  "Superset",
  "AWS",
  "Git",
  "Vite",
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
    org: "Imperial College London · Coursera",
    year: "2021",
  },
  {
    name: "Object-Oriented Programming in Java",
    org: "UC San Diego · Coursera",
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
    role: "Sponsorship Head, Technovanza",
    org: "MAHE Dubai — School of Engineering & IT",
    year: "2023",
  },
  {
    role: "Volunteer, AJAR Ramadan Drive",
    org: "Manipal Academy of Higher Education, Dubai",
    year: "2022",
  },
];

/** Primary chrome — all stage sections */
export const navLinks = [
  { id: "home", label: "Stage" },
  { id: "about", label: "About" },
  { id: "career", label: "Career" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

/** Full act rail for progress indicator (scroll tracking) */
export const stageActs = [
  { id: "home", label: "01", name: "Stage" },
  { id: "about", label: "02", name: "About" },
  { id: "career", label: "03", name: "Career" },
  { id: "work", label: "04", name: "Work" },
  { id: "skills", label: "05", name: "Skills" },
  { id: "contact", label: "06", name: "Contact" },
];

/** Predefined Quick Facts — answers sourced only from the CV */
export const quickFacts = [
  {
    id: "build",
    question: "What do you build?",
    answer:
      "Production web platforms for mobility operations, subscriptions, analytics, and customer-facing experiences — with primary frontend ownership of large React/TypeScript admin systems and Udrive’s Next.js website from Figma.",
  },
  {
    id: "impact",
    question: "Verified impact?",
    answer:
      "~70% infrastructure cost reduction through analytics migration to self-hosted Apache Superset, and 30% improved debt recovery through invoice automation.",
  },
  {
    id: "stack",
    question: "Core stack?",
    answer:
      "Next.js, React, TypeScript/JavaScript, MUI, Python, FastStream, Kafka, Mapbox/MapLibre, D3.js, Apache Superset, and AWS (EC2, S3, CloudFront, Nginx).",
  },
  {
    id: "role",
    question: "Current role?",
    answer:
      "Software Engineer/Developer at Udrive – Rent-a-Car, Dubai (Aug 2024 – Present).",
  },
  {
    id: "location",
    question: "Where are you based?",
    answer: "Dubai, UAE.",
  },
] as const;
