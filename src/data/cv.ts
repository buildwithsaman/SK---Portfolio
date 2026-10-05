export const profile = {
  name: "Saman Shakil Khan",
  title: "Software Engineer / Developer",
  location: "Dubai, UAE",
  phone: "+971 50 601 9290",
  email: "samankhanhq@gmail.com",
  linkedin: "https://www.linkedin.com/in/saman-shakil-khan-62728b208/",
  github: "https://github.com/buildwithsaman",
  resume: "./Saman_Khan_CV.pdf",
  resumeName: "Saman_Khan_CV.pdf",
  summary:
    "Frontend-focused Software Engineer with 2+ years building production web platforms for mobility operations, subscriptions, analytics, and customer-facing experiences. Primary frontend owner across large React/TypeScript admin systems and currently building Udrive’s new Next.js website from Figma. Experienced in responsive UI architecture, data-heavy dashboards, D3/Mapbox visualizations, performance optimization, AWS deployment, and API integration, with additional production backend experience in Python/Kafka-based KYC automation.",
  focus:
    "Owning features from development through deployment — React/Next.js frontends, data-heavy operations tools, and automation that delivers measurable business impact.",
};

export const stats = [
  { label: "Years of experience", value: "2+" },
  { label: "Cost reduction", value: "~70%" },
  { label: "Debt recovery", value: "+30%" },
  { label: "Ownership", value: "E2E" },
];

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  projects: {
    name?: string;
    points: string[];
  }[];
  recognition?: string;
};

export const experiences: Experience[] = [
  {
    company: "Udrive – Rent-a-Car",
    role: "Software Engineer / Developer",
    location: "Dubai, UAE",
    period: "Aug 2024 – Present",
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
    projects: [
      {
        points: [
          "Developed responsive desktop GUIs using Python (Tkinter, PyQt) and collaborated with cross-functional teams to translate requirements into deployable software solutions.",
        ],
      },
    ],
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
        items: [
          "Next.js",
          "React.js",
          "TypeScript",
          "JavaScript",
          "React Router",
        ],
      },
      {
        label: "UI & Motion",
        items: ["MUI", "CSS Modules", "Redux", "Lottie", "Framer Motion"],
      },
      {
        label: "Maps & Charts",
        items: ["D3.js", "Mapbox", "MapLibre"],
      },
      {
        label: "Build",
        items: ["Vite", "CRACO"],
      },
    ],
  },
  {
    category: "Backend & Integration",
    subgroups: [
      {
        label: "Runtime",
        items: ["Python", "FastStream", "Node.js / Express", ".NET"],
      },
      {
        label: "APIs & Auth",
        items: ["REST APIs", "Kafka consumers", "Pydantic", "asyncpg", "JWT / OAuth2"],
      },
    ],
  },
  {
    category: "Cloud & DevOps",
    subgroups: [
      {
        label: "AWS",
        items: ["EC2", "S3", "CloudFront", "Route 53", "CloudWatch"],
      },
      {
        label: "Delivery & Edge",
        items: ["Nginx", "Cloudflare", "GitHub Actions"],
      },
    ],
  },
  {
    category: "Mobile",
    subgroups: [
      {
        label: "Cross-platform",
        items: ["React Native (Expo)"],
      },
    ],
  },
  {
    category: "Data & Monitoring",
    subgroups: [
      {
        label: "Streaming & Orchestration",
        items: ["Apache Kafka", "Apache Airflow"],
      },
      {
        label: "Analytics",
        items: ["Apache Superset"],
      },
      {
        label: "Data Platforms",
        items: ["PostgreSQL", "MS SQL Server", "Firebase"],
      },
    ],
  },
  {
    category: "Languages & Tools",
    subgroups: [
      {
        label: "Collaboration",
        items: ["Git / GitHub", "Jira", "Confluence"],
      },
      {
        label: "Design & Creative",
        items: [
          "Figma implementation",
          "Adobe Photoshop",
          "Illustrator",
          "Premiere Pro",
        ],
      },
    ],
  },
];

// A flat set of signature technologies used across portfolio visuals
export const techCloud = [
  "Next.js",
  "React",
  "TypeScript",
  "MUI",
  "D3.js",
  "Mapbox",
  "Python",
  "Kafka",
  "AWS",
  "Superset",
  "PostgreSQL",
  "Vite",
  "CloudFront",
  "Nginx",
  "REST",
  "JWT",
  "FastStream",
  "React Native",
  "Airflow",
  "CSS Modules",
  "Lottie",
  "Figma",
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
