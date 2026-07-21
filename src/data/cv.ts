export const profile = {
  name: "Saman Shakil Khan",
  title: "Full Stack Software Engineer",
  location: "Dubai, UAE",
  phone: "+971 50 601 9290",
  email: "samankhanhq@gmail.com",
  linkedin: "https://www.linkedin.com/in/saman-shakil-khan-62728b208/",
  github: "https://github.com/samankhan",
  resume: "./Saman_Khan_CV.docx",
  resumeName: "Saman_Khan_CV.docx",
  summary:
    "Full Stack Software Engineer with 2+ years building data-intensive internal platforms and subscription portals at scale — currently at a Dubai-based mobility startup. Specialises in React, Node.js, and REST APIs, with a track record of measurable impact: cutting infrastructure costs by ~70% through a self-hosted analytics migration and improving debt recovery by 30% via invoice automation.",
  focus:
    "End-to-end ownership across frontend architecture, AWS deployment, CI/CD, and RBAC — with a consistent focus on performance, clean code, and shipping on time.",
};

export const stats = [
  { label: "Infra cost reduction", value: "~70%" },
  { label: "Debt recovery lift", value: "30%" },
  { label: "Years of experience", value: "2+" },
  { label: "Production platforms", value: "5+" },
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
    role: "Full Stack Software Developer",
    location: "Dubai, UAE",
    period: "Aug 2024 – Present",
    projects: [
      {
        name: "Internal Dashboard & CMS · Data-Intensive Platform",
        points: [
          "Built scalable, data-driven admin dashboards using React, Redux, Node.js, and REST APIs to manage customers, reservations, vehicles, and real-time pricing.",
          "Enforced secure authentication and RBAC using JWT/OAuth2, supporting dynamic pricing, CRUD workflows, and protected operational features.",
          "Delivered end-to-end invoice automation with serverless functions, improving debt recovery by 30% and cutting manual operational overhead.",
          "Migrated analytics to self-hosted Apache Superset, designing secure data pipelines and auth layers — achieving ~70% infrastructure cost reduction.",
          "Designed system-level monitoring dashboards using Apache Kafka with real-time alerts and interactive analytics to improve platform observability.",
          "Drove frontend performance improvements through component refactoring, lazy loading, and caching for faster load times.",
          "Maintained code quality via SOLID/DRY principles, TypeScript, code reviews, automated testing, and CI/CD pipelines.",
        ],
      },
      {
        name: "Subscription Mobility Admin Portal · Product & UX-Focused",
        points: [
          "Built a responsive vehicle subscription admin portal using React, TypeScript, MUI, and React Router with a mobile-first, fixed-navigation layout.",
          "Owned customer lifecycle & CRM workflows (Lead → Deal → Active → Completed), integrating KYC, invoicing, fleet onboarding/offboarding, and hardware actions via APIs.",
          "Enhanced usability with advanced search & filtering, pagination, grid/table view toggles, and optimistic UI updates with real-time feedback.",
          "Deployed to AWS EC2 using CRA + CRACO, configured Nginx, and secured production traffic with HTTPS (Certbot).",
        ],
      },
    ],
  },
  {
    company: "Arata International FZC · Bahwan International Group",
    role: "IT Intern",
    location: "Dubai, UAE",
    period: "Feb 2024 – Jun 2024",
    projects: [
      {
        points: [
          "Built and shipped a cross-platform mobile app using React Native (Expo) for buying and selling used vehicles, with a focus on intuitive UI/UX.",
          "Designed relational database schemas for user profiles, vehicle listings, and bidding transactions, ensuring scalability and data integrity.",
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
      "React.js",
      "TypeScript",
      "JavaScript",
      "Redux",
      "MUI",
      "React Native (Expo)",
      "Framer Motion",
      "React Router",
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
      "CRACO",
    ],
  },
  {
    category: "Data & Monitoring",
    items: [
      "Apache Kafka",
      "Apache Airflow",
      "Apache Superset",
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
      "Python",
      "C++",
      "C#",
      "Java",
      "GitHub",
      "Jira",
      "Confluence",
      "Adobe Suite",
    ],
  },
];

// A flat set of signature technologies for the 3D skills cloud
export const techCloud = [
  "React",
  "TypeScript",
  "Node.js",
  "Redux",
  "AWS",
  "Kafka",
  "Superset",
  "Airflow",
  "Nginx",
  "MUI",
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
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
