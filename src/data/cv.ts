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
    "Full Stack Developer with 2+ years building production web applications and internal platforms. Specialises in React, TypeScript, Node.js, and REST APIs, with end-to-end ownership across frontend architecture, cloud deployment, CI/CD, authentication, and role-based access control.",
  focus:
    "End-to-end ownership across frontend architecture, AWS deployment, CI/CD, and RBAC — with a consistent focus on performance, clean code, and shipping on time.",
};

export const stats = [
  { label: "Years of experience", value: "2+" },
  { label: "Frontend", value: "React 19" },
  { label: "Development", value: "Full-stack" },
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
    company: "Udrive - Rent A Car",
    role: "Full Stack Developer",
    location: "Dubai, UAE",
    period: "Aug 2024 – Present",
    projects: [
      {
        name: "Production Web Platforms",
        points: [
          "Build and maintain production admin platforms using React 19, TypeScript, MUI, Emotion, and React Router 7.",
          "Modernized frontend tooling from a legacy CRACO setup to Vite 8, adding lazy-loaded routes and vendor code-splitting.",
          "Standardized server-state fetching and caching through reusable React Query hooks and a centralized, environment-driven API client with bearer authentication, unauthorized-session handling, and normalized errors.",
          "Built reusable map, data-visualization, and document interfaces with Mapbox GL, MapLibre GL, D3, and React-PDF.",
          "Improved reliability and usability with lazy-loaded routes, vendor code-splitting, global toasts, optimistic updates, an ErrorBoundary, reusable empty states, and URL-synced filters.",
          "Structured feature areas around dedicated data hooks, mutation actions, reusable components, constants, and protected routes.",
          "Contributed to production delivery through cloud infrastructure, reverse proxy configuration, HTTPS, and CI/CD workflows.",
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
        items: ["React 19", "TypeScript", "JavaScript", "React Router 7"],
      },
      {
        label: "State & UI",
        items: [
          "TanStack React Query 5",
          "MUI 5/6",
          "Emotion",
          "Framer Motion",
        ],
      },
      {
        label: "Build",
        items: ["Vite 8", "CRACO"],
      },
    ],
  },
  {
    category: "Backend & APIs",
    subgroups: [
      {
        label: "Runtime",
        items: ["Node.js (Express)", ".NET"],
      },
      {
        label: "APIs & Security",
        items: ["RESTful API design", "JWT / OAuth2"],
      },
    ],
  },
  {
    category: "Cloud & DevOps",
    subgroups: [
      {
        label: "Cloud",
        items: ["AWS (EC2, Route 53, CloudWatch)"],
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
      {
        label: "Native Android",
        items: ["Java", "Android Development"],
      },
    ],
  },
  {
    category: "Data, Maps & Monitoring",
    subgroups: [
      {
        label: "Streaming & Orchestration",
        items: ["Apache Kafka", "Apache Airflow"],
      },
      {
        label: "Analytics & Visualization",
        items: ["Apache Superset", "D3"],
      },
      {
        label: "Maps & Documents",
        items: ["Mapbox GL / MapLibre GL", "React-PDF"],
      },
      {
        label: "Data Platforms",
        items: ["MS SQL Server", "Firebase"],
      },
    ],
  },
  {
    category: "Languages & Tools",
    subgroups: [
      {
        label: "Languages",
        items: ["Python (Tkinter, PyQt, scripting)", "C++", "C#"],
      },
      {
        label: "Collaboration",
        items: ["GitHub", "Jira", "Confluence"],
      },
      {
        label: "Creative",
        items: ["Adobe Suite (Photoshop, Illustrator)", "Premiere Pro"],
      },
    ],
  },
];

// A flat set of signature technologies used across portfolio visuals
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
