export const profile = {
  name: "Saman Khan",
  title: "Software Engineer | Frontend Development",
  location: "Dubai, UAE",
  locationFull: "Dubai, United Arab Emirates",
  email: "samankhanhq@gmail.com",
  linkedin: "https://www.linkedin.com/in/saman-shakil-khan-62728b208/",
  linkedinLabel: "linkedin.com/in/saman-shakil-khan-62728b208",
  github: "https://github.com/buildwithsaman",
  githubLabel: "github.com/buildwithsaman",
  resume: "./Saman_Khan_CV.pdf",
  resumeName: "Saman_Khan_CV.pdf",
  heroLead:
    "Building scalable web applications, intuitive user experiences, and production-ready software.",
  heroDescription:
    "I'm a Dubai-based Software Engineer specializing in React, Next.js, and TypeScript, with 2+ years of experience developing production web platforms for mobility, fleet operations, subscriptions, analytics, and customer-facing services.",
  heroSupport:
    "From complex internal dashboards to multilingual customer websites, I turn business requirements into reliable, responsive, and maintainable software.",
  aboutIntro: "Software Engineer based in Dubai, UAE",
  summary: [
    "I'm a frontend-focused Software Engineer with 2+ years of experience building and maintaining production applications using React, Next.js, TypeScript, and modern web technologies.",
    "At Udrive, I take primary frontend ownership of internal operations platforms used for fleet management, reservations, customer verification, subscription management, and business analytics.",
    "I'm also developing Udrive's new customer-facing website using Next.js App Router, translating Figma designs into responsive, multilingual web experiences with English and Arabic support.",
    "My work extends beyond frontend development into Python-based backend services, Kafka event processing, REST API integration, AWS deployment, and workflow automation.",
    "I focus on writing maintainable code, improving application performance, building reusable components, and delivering software that solves real operational problems.",
  ],
  achievements: [
    {
      value: "~70%",
      label:
        "reduction in infrastructure costs through migration to self-hosted Apache Superset analytics.",
    },
    {
      value: "30%",
      label:
        "improvement in debt recovery through automated invoice workflows.",
    },
    {
      value: "6",
      label:
        "analytics areas built or significantly enhanced for business and operational reporting.",
    },
    {
      value: "~20",
      label:
        "website routes implemented with responsive layouts, multilingual routing, and reusable components.",
    },
  ],
  contactIntro:
    "I'm a Software Engineer based in Dubai, UAE, passionate about building scalable web applications, efficient software systems, and intuitive digital experiences.",
  contactSupport:
    "Interested in collaborating, discussing engineering opportunities, or connecting professionally? Feel free to reach out.",
  footerTagline: "Software Engineer | React, Next.js & TypeScript",
  siteUrl: "https://buildwithsaman.dev",
};

export const highlightLines = [
  "Frontend-focused Software Engineer",
  "Building scalable web applications",
  "Primary frontend ownership at Udrive",
  "React, Next.js, and TypeScript",
  "~70% infrastructure cost reduction",
  "30% improvement in debt recovery",
] as const;

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
    title: "Internal Operations & Analytics Platform",
    role: "Primary Frontend Owner",
    ownership:
      "Developed and enhanced a large-scale internal operations platform supporting customer management, vehicle operations, reservations, invoicing, verification, analytics, and mobility services.",
    contributions: [
      "Built and significantly improved six analytics areas: Trip Revenue, Cleaning, RTA Parking, Customer Stats, Metrics, and TARS.",
      "Developed responsive dashboards featuring interactive D3 visualizations, reusable filters, data tables, and CSV exports.",
      "Built a near-real-time Mapbox driver monitoring interface using 10-second polling.",
      "Implemented fleet and vehicle operations including lock/unlock, immobilization, location updates, and onboarding/offboarding workflows.",
      "Created an interactive Banner Studio supporting draggable layers, image and text editing, templates, undo/redo, previews, and HTML/JSON import/export.",
      "Maintained protected routes, JWT authentication flows, role-based UI access, and reusable responsive components.",
    ],
    focus:
      "Frontend Architecture · Data Visualization · Operational Software · Fleet Management",
    tech: ["React", "TypeScript", "Material UI", "D3.js", "Mapbox"],
  },
  {
    id: "subscription-crm",
    title: "Subscription, CRM & Fleet Management Platform",
    role: "Primary Frontend Developer",
    ownership:
      "Built most of the frontend for a monthly vehicle subscription management platform integrating customer relationship management, fleet operations, subscriptions, billing, and business analytics.",
    contributions: [
      "Developed a complete lead management workflow with Kanban boards, stage transitions, assignments, filtering, and deal tracking.",
      "Integrated personalized WhatsApp outreach into CRM workflows.",
      "Built customer management interfaces for KYC, payment history, account actions, and verification queues.",
      "Developed fleet consoles with interactive maps, vehicle controls, reservations, damage reporting, and state management.",
      "Implemented subscription vehicle assignments, invoicing, product configuration, and mileage-based pricing interfaces.",
      "Built interactive sales funnel analytics and printable business reports.",
      "Migrated the frontend from Create React App/CRACO to Vite to improve development speed and simplify configuration.",
      "Managed frontend deployment using AWS EC2, Nginx, and HTTPS.",
    ],
    focus:
      "CRM Systems · Subscription Software · Frontend Modernization · Business Operations",
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
    title: "Udrive Customer-Facing Website",
    role: "Frontend Developer",
    ownership:
      "Building a modern customer-facing mobility website from Figma designs using Next.js App Router, with a focus on responsive design, performance, multilingual accessibility, and reusable frontend architecture.",
    contributions: [
      "Implemented approximately 20 routes covering rental services, fleet listings, mobility offerings, business services, support, articles, careers, and legal information.",
      "Developed responsive interfaces for desktop, tablet, and mobile devices.",
      "Implemented English and Arabic locale routing with right-to-left layout support.",
      "Created reusable navigation, hero sections, pricing interfaces, galleries, FAQs, and call-to-action components.",
      "Optimized images and animations using WebP, SVG, Lottie, Next.js image optimization, and AWS CloudFront.",
      "Applied lazy loading, font optimization, and selective asset preloading to improve page delivery.",
    ],
    focus:
      "Next.js Development · Responsive Design · Internationalization · Web Performance",
    tech: ["Next.js", "TypeScript", "CSS Modules", "AWS CloudFront", "Lottie"],
  },
  {
    id: "kyc-backend",
    title: "Automated KYC & Identity Verification",
    role: "Software Engineering Contributor",
    ownership:
      "Contributed to a production identity verification pipeline automating customer document validation and approval workflows.",
    contributions: [
      "Developed and maintained validation logic for Emirates ID, driving licences, and passports.",
      "Integrated document-processing workflows involving AI OCR, identity checks, face matching, and liveness verification.",
      "Supported eligibility validation based on document expiry, age, and driving experience.",
      "Worked with Kafka-based event processing, AWS S3 document storage, and PostgreSQL database updates.",
      "Contributed to automated approval and rejection decisioning, including fraud-related validation signals.",
    ],
    focus:
      "Backend Integration · Event-Driven Systems · Identity Verification · Automation",
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
    title: "Analytics Infrastructure & Workflow Automation",
    role: "Software Engineering Contributor",
    ownership:
      "Improved business operations through analytics infrastructure modernization and automated financial workflows.",
    contributions: [
      "Migrated analytics infrastructure to a self-hosted Apache Superset environment.",
      "Integrated secure data access and authentication workflows.",
      "Achieved approximately 70% infrastructure cost reduction through the analytics migration.",
      "Delivered serverless invoice automation that improved debt recovery by 30%.",
      "Contributed to Kafka-based operational monitoring and observability.",
    ],
    focus:
      "Cloud Infrastructure · Analytics · Workflow Automation · Cost Optimization",
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
      "Developing and maintaining production web applications across fleet operations, mobility services, subscription management, business analytics, and customer-facing experiences.",
      "Primary frontend owner for major React and TypeScript administrative platforms, with additional contributions to backend verification services, cloud infrastructure, and operational automation.",
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
      "Built and shipped a cross-platform React Native application using Expo for buying and selling used vehicles, including user profiles, vehicle listings, and bidding workflows.",
      "Developed and maintained .NET REST APIs and supported rental and leasing data operations, business intelligence dashboards, and data-quality processes.",
    ],
    recognition:
      "Certificate of Appreciation for successfully completing the Engineering & Technology Services Division internship.",
  },
  {
    company: "Dubai Technologies",
    role: "Software Intern",
    location: "Dubai, UAE",
    period: "July 2023 – August 2023",
    periodStart: "2023-07",
    periodEnd: "2023-08",
    summary: [
      "Developed responsive desktop applications using Python, Tkinter, and PyQt. Collaborated with cross-functional teams to translate requirements into deployable software solutions.",
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
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Material UI",
      "CSS Modules",
      "Redux",
      "React Router",
      "React Native (Expo)",
      "Responsive Web Design",
    ],
  },
  {
    category: "Data Visualization & Mapping",
    items: [
      "D3.js",
      "Mapbox",
      "MapLibre",
      "Interactive Dashboards",
      "Data Tables",
      "Analytics Interfaces",
    ],
  },
  {
    category: "Backend Development & Integration",
    items: [
      "Python",
      "Node.js",
      "Express.js",
      ".NET",
      "FastStream",
      "REST APIs",
      "Apache Kafka",
      "Pydantic",
      "asyncpg",
      "JWT",
      "OAuth2",
    ],
  },
  {
    category: "Cloud, Infrastructure & DevOps",
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
    category: "Databases, Data & Monitoring",
    items: [
      "PostgreSQL",
      "Microsoft SQL Server",
      "Firebase",
      "Apache Superset",
      "Apache Airflow",
      "Apache Kafka",
    ],
  },
  {
    category: "Development & Design Tools",
    items: [
      "Git",
      "GitHub",
      "Jira",
      "Confluence",
      "Figma",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe Premiere Pro",
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
    degree: "Bachelor of Technology in Computer Science Engineering",
    place: "Manipal Academy of Higher Education, Dubai",
    period: "Graduated 2024",
  },
  {
    degree: "Higher Secondary Education — CBSE, PCM",
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
    org: "University of California San Diego, Coursera",
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
    org: "Technovanza, MAHE Dubai",
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
