export const profile = {
  name: "Saman Shakil Khan",
  title: "Full Stack Developer",
  location: "Dubai, UAE",
  phone: "+971 50 601 9290",
  email: "samankhanhq@gmail.com",
  linkedin: "https://www.linkedin.com/in/saman-shakil-khan-62728b208/",
  github: "https://github.com/buildwithsaman",
  resume: "./Saman_Khan_CV.docx",
  resumeName: "Saman_Khan_CV.docx",
  summary:
    "Full Stack Developer with 2+ years building data-intensive internal platforms and subscription portals at scale — currently at a Dubai-based mobility startup. Specialises in React, Node.js, and REST APIs, with a track record of measurable impact: cutting infrastructure costs by ~70% through a self-hosted analytics migration and improving debt recovery by 30% via invoice automation.",
  focus:
    "End-to-end ownership across frontend architecture, AWS deployment, CI/CD, and RBAC — with a consistent focus on performance, clean code, and shipping on time.",
};

export const stats = [
  { label: "Infra cost reduction", value: "~70%" },
  { label: "Debt recovery lift", value: "30%" },
  { label: "Years of experience", value: "2+" },
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
    role: "Full Stack Developer",
    location: "Dubai, UAE",
    period: "Aug 2024 – Present",
    projects: [
      {
        name: "UdriveAdmin · Internal Fleet & Operations Platform",
        points: [
          "Modernized UdriveAdmin into a React 19 SPA, migrating from CRACO to Vite 8 and using MUI 5, Emotion, React Router 7, and TanStack React Query 5 across fleet, customer, reservation, billing, claims, and analytics workflows.",
          "Standardized server-state fetching and caching through reusable React Query hooks and a centralized, environment-driven API client with bearer authentication, unauthorized-session handling, and normalized errors.",
          "Built live vehicle and cleaning maps with Mapbox GL and MapLibre GL, modular D3 analytics, and PDF-based fine-document workflows.",
          "Improved reliability and usability with lazy-loaded routes, vendor code-splitting, global toasts, optimistic updates, an ErrorBoundary, reusable empty states, and URL-synced filters.",
          "Delivered end-to-end invoice automation with serverless functions, improving debt recovery by 30% and cutting manual operational overhead.",
          "Migrated analytics to self-hosted Apache Superset, designing secure data pipelines and auth layers — achieving ~70% infrastructure cost reduction.",
          "Designed system-level monitoring dashboards using Apache Kafka with real-time alerts and interactive analytics to improve platform observability.",
        ],
      },
      {
        name: "SN Admin · Subscription Operations Platform",
        points: [
          "Built a React 19 operational portal using React Router 7, MUI, Emotion, D3, MapLibre GL, and Framer Motion for leads, customers, vehicles, deals, subscriptions, invoices, products, roles, and release management.",
          "Structured feature modules around dedicated data hooks, mutation actions, reusable components, constants, and protected application routes.",
          "Developed the deals pipeline with five sales stages, deal cards, filters, editing, preview workflows, WhatsApp quick messaging, and a standalone printable report.",
          "Owned subscription lifecycle workflows spanning KYC, invoicing, car assignment, fleet onboarding/offboarding, and vehicle hardware actions.",
          "Deployed to AWS EC2 using CRA + CRACO, configured Nginx, and secured production traffic with HTTPS (Certbot).",
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
          "Built a cross-platform mobile app using React Native (Expo) for buying and selling used vehicles, with a focus on intuitive UI/UX.",
          "Designed relational database schemas to manage user profiles, vehicle listings, and bidding transactions, ensuring scalability and data integrity.",
          "Developed and maintained RESTful APIs using .NET (Visual Studio) for seamless frontend–backend integration.",
          "Managed database operations and reporting for the CARPRO third-party application via iView, supporting rental and leasing workflows.",
          "Integrated INTELLiVIEW BI dashboards and data quality checks, improving master data management and business insight delivery.",
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
          "Developed responsive desktop GUIs using Python (Tkinter, PyQt), improving usability and workflow efficiency.",
          "Collaborated with cross-functional teams to translate technical requirements into deployable software solutions.",
        ],
      },
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
      "React 19",
      "TypeScript",
      "JavaScript",
      "TanStack React Query 5",
      "MUI 5/6",
      "Emotion",
      "React Native (Expo)",
      "Framer Motion",
      "React Router 7",
    ],
  },
  {
    category: "Backend & APIs",
    items: ["Node.js (Express)", ".NET", "RESTful API design", "JWT / OAuth2"],
  },
  {
    category: "Cloud & DevOps",
    items: [
      "AWS (EC2, Route 53, CloudWatch)",
      "Nginx",
      "Cloudflare",
      "GitHub Actions",
      "Vite 8",
      "CRACO",
    ],
  },
  {
    category: "Data, Maps & Monitoring",
    items: [
      "Apache Kafka",
      "Apache Airflow",
      "Apache Superset",
      "Mapbox GL / MapLibre GL",
      "D3",
      "React-PDF",
      "MS SQL Server",
      "Firebase",
    ],
  },
  {
    category: "Mobile",
    items: ["React Native (Expo)", "Java", "Android Development"],
  },
  {
    category: "Languages & Tools",
    items: [
      "Python (Tkinter, PyQt, scripting)",
      "C++",
      "C#",
      "Java",
      "GitHub",
      "Jira",
      "Confluence",
      "Adobe Suite (Photoshop, Illustrator)",
      "Premiere Pro",
    ],
  },
];

// A flat set of signature technologies for the 3D skills cloud
export const techCloud = [
  "React 19",
  "TypeScript",
  "Node.js",
  "React Query 5",
  "AWS",
  "Kafka",
  "Superset",
  "Airflow",
  "Nginx",
  "MUI",
  "Vite 8",
  "MapLibre GL",
  "D3",
  "Framer Motion",
  "REST",
  "JWT",
  "OAuth2",
  "Cloudflare",
  ".NET",
  "Python",
  "C++",
  "Java",
  "Firebase",
  "SQL",
  "CI/CD",
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
    name: "Mathematics for Machine Learning (Linear Algebra + Multivariate Calculus)",
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
