export const profile = {
  name: "Saman Shakil Khan",
  title: "Software Developer",
  location: "Dubai, UAE",
  phone: "+971 50 601 9290",
  email: "samankhanhq@gmail.com",
  linkedin: "https://www.linkedin.com/in/saman-shakil-khan-62728b208/",
  github: "https://github.com/buildwithsaman",
  resume: "./Saman_Khan_CV.pdf",
  resumeName: "Saman_Khan_CV.pdf",
  heroDescription:
    "I build scalable, production-ready software applications, combining modern frontend technologies with backend integrations, automation, and practical engineering solutions.",
  summary:
    "Software Developer with 2+ years of experience building and maintaining production-ready applications across mobility operations, subscriptions, analytics, and customer-facing products. Strongest in frontend development with React, Next.js, TypeScript, and JavaScript, with additional production experience in Python/Kafka integrations, internal platforms, automation, and AWS deployments.",
  openTo:
    "Open to Software Developer, Software Engineer, and Full-Stack Development opportunities in Dubai or remote.",
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
  problem: string;
  ownership: string;
  built: string;
  tech: string[];
  impact: string;
};

/** Expandable Udrive domains — verified against CV only */
export const udriveDomains: ExperienceDomain[] = [
  {
    id: "operations-analytics",
    title: "Operations & Analytics",
    problem:
      "Internal teams needed a reliable operations platform for customers, fleet, invoices, mobility, and analytics across many business workflows.",
    ownership:
      "Primary frontend owner for a React + MUI internal operations platform spanning customers, verifications, reservations, invoices, vehicles, damage reports, credits, fines, claims, analytics, mobility operations, and admin tooling.",
    built:
      "Built or heavily evolved six analytics areas (Trip Revenue, Cleaning, RTA Parking, Customer Stats, Metrics with D3, and TARS) with shared filters, responsive tables/charts, and CSV export. Delivered mobility modules including a near-real-time Mapbox driver map (10-second polling), rides/driver/fleet management, vehicle lock/unlock and immobilize workflows, and an in-app Banner Studio for marketing content.",
    tech: ["React", "TypeScript", "MUI", "Mapbox", "D3.js", "JWT", "RBAC"],
    impact:
      "Centralized operational tooling with reusable UI patterns, protected routing, and resilient loading/error feedback across desktop, tablet, and mobile.",
  },
  {
    id: "subscription-crm",
    title: "Subscription & CRM",
    problem:
      "Sales and operations needed an admin platform for subscription lifecycle, customer KYC, fleet assignment, invoicing, and deal pipeline management.",
    ownership:
      "Built most of the React frontend for the monthly subscription admin platform, covering sales pipeline, customers/KYC, fleet operations, subscriptions, invoices, product catalog, analytics, and role-based administration.",
    built:
      "Implemented Lead → Initial Contact → Qualified → Won/Lost Kanban workflows with filters, assignee management, and one-click personalized WhatsApp outreach. Delivered customer/fleet consoles, subscription car assignment, product management, D3 lead/funnel analytics, and a print-friendly Deals Report. Migrated the frontend from CRA/CRACO to Vite and handled AWS EC2 build/deployment with Nginx and HTTPS.",
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
    impact:
      "Faster development iteration after the Vite migration, with end-to-end subscription and CRM workflows available to operations and sales teams.",
  },
  {
    id: "website-apps",
    title: "Website & Application Development",
    problem:
      "The business needed a new customer-facing website built from Figma with bilingual support, consistent components, and strong page performance.",
    ownership:
      "Building the customer-facing website from scratch using Next.js App Router, TypeScript, and CSS Modules, translating designs into pixel-accurate responsive experiences.",
    built:
      "Implemented roughly 20 routes across home, rental offerings, fleet, mobility, business, help, articles, contact, careers, and legal content, with English/Arabic locale routing and RTL support. Created reusable navigation, footer, hero, CTA, FAQ, pricing, gallery, and content components. Optimized delivery with CloudFront-hosted assets, responsive image loading, lazy loading, font optimization, and controlled Lottie behavior.",
    tech: [
      "Next.js",
      "TypeScript",
      "CSS Modules",
      "CloudFront",
      "Lottie",
      "i18n",
      "RTL",
    ],
    impact:
      "A maintainable bilingual site foundation with approximately 20 production routes and performance-minded asset delivery.",
  },
  {
    id: "kyc-backend",
    title: "KYC & Backend Integrations",
    problem:
      "Verification needed automated document and identity checks with reliable orchestration across services and data stores.",
    ownership:
      "Contributed to a production Python/FastStream Kafka verification pipeline and maintained validation/decisioning logic for identity documents.",
    built:
      "Helped orchestrate OCR, face/liveness/audio checks, AWS S3 document handling, Postgres updates, and automated approval/rejection workflows. Implemented and maintained validation around Emirates ID, UAE/foreign driving licences, and passports — including eligibility checks, cross-document name matching, face/liveness checks, and fraud signals.",
    tech: [
      "Python",
      "FastStream",
      "Kafka",
      "AWS S3",
      "PostgreSQL",
      "REST APIs",
    ],
    impact:
      "Supported automated KYC decisioning in production, reducing manual verification overhead for supported document flows.",
  },
  {
    id: "automation-tools",
    title: "Automation & Internal Tools",
    problem:
      "Manual invoicing and hosted analytics were costly and operationally heavy for internal teams.",
    ownership:
      "Delivered invoice automation and contributed to analytics migration and operational monitoring work.",
    built:
      "Implemented invoice automation using serverless functions. Migrated analytics to self-hosted Apache Superset with secure data pipelines and authentication. Contributed to Kafka-based monitoring and operational visibility. Also built internal utilities such as Banner Studio and WhatsApp outreach workflows within the admin platforms.",
    tech: ["Serverless", "Apache Superset", "Kafka", "AWS", "React"],
    impact:
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

export const caseStudies: CaseStudy[] = [
  {
    number: "01",
    type: "operations",
    category: "Internal platforms",
    title: "Operations platform for mobility and analytics.",
    problem:
      "Operations teams needed a unified software platform for customers, fleet, invoices, mobility controls, and reporting — not disconnected tools.",
    ownership:
      "Primary frontend owner of the React + MUI internal operations platform, including analytics, mobility modules, vehicle controls, auth/RBAC UI, and Banner Studio.",
    implementation:
      "Delivered six analytics areas with shared filters and CSV export; a Mapbox driver map with 10-second polling; vehicle lock/immobilize workflows; and reusable patterns for loading, errors, and protected routes.",
    result:
      "A production operations system used across core business workflows, with near-real-time mobility visibility and consolidated analytics tooling.",
    impact: [
      { value: "6", label: "analytics areas" },
      { value: "10s", label: "map polling" },
    ],
    tech: ["React", "TypeScript", "MUI", "Mapbox", "D3.js", "Vite"],
  },
  {
    number: "02",
    type: "lifecycle",
    category: "Web applications",
    title: "Customer-facing Next.js application from Figma.",
    problem:
      "Udrive needed a modern public website with accurate design implementation, bilingual UX, and production-grade performance.",
    ownership:
      "Building the site from scratch with Next.js App Router, TypeScript, and CSS Modules — from Figma through responsive production pages.",
    implementation:
      "Shipped roughly 20 routes with English/Arabic locale routing and RTL support, reusable design-system components, and CloudFront-optimized media delivery with lazy loading and controlled Lottie playback.",
    result:
      "A scalable bilingual web application foundation covering rental, fleet, mobility, business, and support content.",
    impact: [
      { value: "~20", label: "application routes" },
      { value: "EN / AR", label: "locale + RTL" },
    ],
    tech: ["Next.js", "TypeScript", "CSS Modules", "CloudFront", "Lottie"],
  },
  {
    number: "03",
    type: "analytics",
    category: "Automation & integrations",
    title: "KYC automation and analytics cost reduction.",
    problem:
      "Verification and analytics processes needed automation and a more cost-efficient infrastructure footprint.",
    ownership:
      "Contributed to Python/Kafka KYC automation, delivered serverless invoice automation, and supported migration to self-hosted Apache Superset.",
    implementation:
      "Helped orchestrate document OCR, liveness checks, S3 storage, and Postgres updates in a Kafka pipeline; automated invoice workflows; and moved analytics onto Superset with secure authentication.",
    result:
      "Measurable operational gains: ~70% infrastructure cost reduction from analytics migration and 30% improved debt recovery from invoice automation.",
    impact: [
      { value: "~70%", label: "infra cost reduction" },
      { value: "+30%", label: "debt recovery" },
    ],
    tech: ["Python", "Kafka", "FastStream", "Superset", "AWS", "PostgreSQL"],
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
    role: "Software Developer",
    location: "Dubai, UAE",
    period: "Aug 2024 – Present",
    summary:
      "Building and maintaining production software across operations platforms, subscription/CRM systems, a customer-facing Next.js website, KYC integrations, and automation — with primary ownership of large React/TypeScript admin experiences.",
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
      "Delivered a React Native vehicle marketplace and supported .NET APIs, data operations, and BI reporting workflows.",
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
      "Developed Python desktop interfaces and collaborated with cross-functional teams to ship production software.",
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

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
