import { profile } from "../data/cv";

export type AssistantAction = {
  label: string;
  href: string;
  download?: string;
};

export type AssistantReply = {
  text: string;
  bullets?: string[];
  actions?: AssistantAction[];
  followUps: string[];
};

export type AssistantSuggestion = {
  id: string;
  question: string;
};

type Topic = {
  id: string;
  category: string;
  question: string;
  answer: string;
  aliases: string[];
  keywords: string[];
};

export const WELCOME_CHIPS = [
  "Why should we hire you?",
  "What impact have you made?",
  "Walk me through your resume.",
  "What do you own at Udrive?",
  "What is your tech stack?",
] as const;

const MORE_CHIPS = [
  "How can I contact you?",
  "Can I download your CV?",
] as const;

const UNMATCHED =
  "I don't have a verified answer for that in my portfolio yet. You can contact me at samankhanhq@gmail.com.";

const TOPICS: Topic[] = [
  {
    id: "q001",
    category: "Introduction",
    question: "Tell me about yourself",
    answer:
      "I’m a frontend-focused Software Engineer based in Dubai with over two years of experience building production web applications. At Udrive, I work across internal operations, analytics, subscriptions, and customer-facing experiences using React, TypeScript, and Next.js. I also have practical backend experience with Python and Kafka-based automation.",
    aliases: [
      "Introduce yourself",
      "Who are you?",
      "Give me your introduction",
    ],
    keywords: ["about", "intro", "profile"],
  },
  {
    id: "q002",
    category: "Introduction",
    question: "Why should we hire you?",
    answer:
      "I combine hands-on ownership of complex frontend platforms with an understanding of business outcomes. At Udrive, I’ve built operational and analytics tools and contributed to work that reduced analytics infrastructure costs by approximately 70% and improved debt recovery by 30%. I focus on reliable, maintainable software that solves real problems.",
    aliases: [
      "Why hire Saman?",
      "What makes you a good candidate?",
      "Why choose you?",
    ],
    keywords: ["hire", "value", "strengths"],
  },
  {
    id: "q003",
    category: "Introduction",
    question: "What do you do?",
    answer:
      "I build and maintain production software, with a focus on React and Next.js applications. My work includes operations dashboards, subscription and CRM tools, analytics visualizations, customer-facing websites, and backend integrations.",
    aliases: ["What is your job?", "What kind of work do you do?"],
    keywords: ["role", "work"],
  },
  {
    id: "q004",
    category: "Introduction",
    question: "What do you build?",
    answer:
      "I build internal operations platforms, analytics dashboards, subscription management systems, CRM workflows, interactive mapping interfaces, and responsive customer-facing websites. I also contribute to automation and verification systems.",
    aliases: [
      "What kind of software do you build?",
      "What applications have you made?",
    ],
    keywords: ["build", "apps", "products"],
  },
  {
    id: "q005",
    category: "Introduction",
    question: "What are your strengths?",
    answer:
      "My strongest areas are frontend architecture, reusable React components, responsive design, complex operational interfaces, and API integration. I also bring experience improving performance and maintaining production applications.",
    aliases: ["What are you best at?", "Your top skills?"],
    keywords: ["strength", "specialty"],
  },
  {
    id: "q006",
    category: "Introduction",
    question: "What is your greatest achievement?",
    answer:
      "Two outcomes I’m proud of are contributing to an analytics migration that reduced infrastructure costs by approximately 70% and delivering invoice automation that improved debt recovery by 30%. They show how engineering work can create measurable business value.",
    aliases: ["What are you most proud of?", "Biggest accomplishment?"],
    keywords: ["achievement", "impact"],
  },
  {
    id: "q007",
    category: "Introduction",
    question: "Walk me through your resume.",
    answer:
      "I graduated in Computer Science Engineering from Manipal Dubai in 2024. My internships at Dubai Technologies and Arata International gave me experience in Python desktop software, React Native, and .NET APIs. Since August 2024, I’ve worked at Udrive on operations, analytics, subscription platforms, a Next.js website, and automation.",
    aliases: ["Walk me through your CV", "Summarize your career"],
    keywords: ["resume", "cv", "career"],
  },
  {
    id: "q008",
    category: "Introduction",
    question: "How many years of experience do you have?",
    answer:
      "I have over two years of professional software engineering experience, including my role at Udrive since August 2024. I also completed development internships during university.",
    aliases: ["Years of experience?", "How experienced are you?"],
    keywords: ["years", "experience"],
  },
  {
    id: "q009",
    category: "Introduction",
    question: "Are you frontend or backend?",
    answer:
      "My primary specialization is frontend engineering, especially React, Next.js, and TypeScript. I also have practical backend experience with Python, Kafka, REST APIs, and database integrations.",
    aliases: ["Are you more frontend?", "Frontend vs backend"],
    keywords: ["frontend", "backend"],
  },
  {
    id: "q010",
    category: "Introduction",
    question: "Are you a full-stack developer?",
    answer:
      "I’m a frontend-focused Software Engineer with practical full-stack capabilities. I’ve built complex frontends and worked with Python-based automation, .NET REST APIs, databases, and cloud deployments.",
    aliases: ["Do you do full stack?", "Can you work on backend?"],
    keywords: ["fullstack", "full stack"],
  },
  {
    id: "q011",
    category: "Introduction",
    question: "What do you specialize in?",
    answer:
      "I specialize in scalable React and Next.js interfaces, especially data-heavy dashboards, internal operations platforms, responsive layouts, and interactive visualizations.",
    aliases: ["What is your specialty?", "Your focus?"],
    keywords: ["specialization", "frontend"],
  },
  {
    id: "q012",
    category: "Introduction",
    question: "What kind of engineer are you?",
    answer:
      "I’m a frontend-focused engineer who enjoys taking ownership of production applications and translating complex business workflows into reliable interfaces. My work also reaches into analytics, integrations, and automation.",
    aliases: ["How would you describe yourself as an engineer?"],
    keywords: ["engineering", "identity"],
  },
  {
    id: "q013",
    category: "Introduction",
    question: "What motivates you as an engineer?",
    answer:
      "I’m particularly interested in building software that makes complicated operational workflows easier to use and maintain. The work I’ve done across analytics, mobility, and automation reflects that focus.",
    aliases: ["What do you enjoy building?", "What drives you?"],
    keywords: ["motivation", "interests"],
  },
  {
    id: "q014",
    category: "Introduction",
    question: "What makes you different from other frontend developers?",
    answer:
      "My experience combines frontend ownership with business-critical workflows such as mobility operations, subscription administration, analytics, verification, and automation. I’ve worked on systems where usability, reliability, and measurable outcomes matter together.",
    aliases: ["What sets you apart?", "Why are you unique?"],
    keywords: ["differentiator", "hire"],
  },
  {
    id: "q015",
    category: "Introduction",
    question: "What roles fit your experience?",
    answer:
      "Frontend Engineer and Software Engineer roles are the closest match to my strongest experience. Roles involving React, Next.js, dashboards, complex operational applications, and frontend-led full-stack work are also relevant.",
    aliases: ["What positions suit you?", "What jobs can you do?"],
    keywords: ["jobs", "roles"],
  },
  {
    id: "q016",
    category: "Introduction",
    question: "Have you worked on production applications?",
    answer:
      "Yes. My experience at Udrive includes production operations and subscription platforms, analytics modules, vehicle-management interfaces, and Python-based verification workflows.",
    aliases: ["Have you shipped production code?", "Real-world applications?"],
    keywords: ["production", "shipped"],
  },
  {
    id: "q017",
    category: "Introduction",
    question: "Do you have enterprise application experience?",
    answer:
      "I’ve worked on large internal administration platforms with protected routes, role-based interface permissions, complex workflows, data-heavy tables, and integrations across business functions.",
    aliases: ["Have you built enterprise software?"],
    keywords: ["enterprise", "admin"],
  },
  {
    id: "q018",
    category: "Udrive",
    question: "What is your current role?",
    answer:
      "I’m a Software Engineer/Developer at Udrive in Dubai, where I work on internal operations, analytics, subscription administration, customer-facing web development, and selected automation systems.",
    aliases: ["Where do you work?", "Current position?"],
    keywords: ["udrive", "current job"],
  },
  {
    id: "q019",
    category: "Udrive",
    question: "What do you own at Udrive?",
    answer:
      "I’m the primary frontend owner for major parts of Udrive’s React-based internal operations platform and built most of the React frontend for its monthly subscription administration system. I also work on the new customer-facing Next.js website.",
    aliases: ["What are your responsibilities?", "What do you lead?"],
    keywords: ["ownership", "udrive"],
  },
  {
    id: "q020",
    category: "Udrive",
    question: "What projects have you worked on at Udrive?",
    answer:
      "My work includes the internal operations platform, six analytics areas, mobility and fleet tools, Banner Studio, subscription administration, Kanban CRM, the customer-facing Next.js website, KYC verification, invoice automation, and analytics infrastructure migration.",
    aliases: ["Udrive projects?", "What did you build at Udrive?"],
    keywords: ["projects", "udrive"],
  },
  {
    id: "q021",
    category: "Udrive",
    question: "Tell me about the Operations platform.",
    answer:
      "It’s a React and Material UI platform supporting customers, verifications, reservations, invoices, vehicles, damage reports, credits, fines, claims, analytics, and administration. I’ve developed and maintained features across these operational areas.",
    aliases: ["What is Operations?", "Operations dashboard?"],
    keywords: ["operations", "dashboard"],
  },
  {
    id: "q022",
    category: "Udrive",
    question: "What makes the Operations platform complex?",
    answer:
      "It spans many connected business workflows and requires consistent handling of permissions, data tables, responsive layouts, API states, and operational actions. My work focuses on making those interfaces reusable and dependable.",
    aliases: ["How complex is the admin platform?"],
    keywords: ["complexity", "operations"],
  },
  {
    id: "q023",
    category: "Udrive",
    question: "Tell me about the analytics platform.",
    answer:
      "I built or significantly enhanced six analytics areas: Trip Revenue, Cleaning, RTA Parking, Customer Stats, Metrics, and TARS. They use responsive tables and charts, shared filtering patterns, and CSV exports to support operational reporting.",
    aliases: ["What analytics did you build?", "Analytics dashboard?"],
    keywords: ["analytics", "reports"],
  },
  {
    id: "q024",
    category: "Udrive",
    question: "Which analytics modules did you work on?",
    answer:
      "I worked on Trip Revenue, Cleaning, RTA Parking, Customer Stats, Metrics with D3 visualizations, and TARS. My contributions include filtering, tables, charts, and export workflows.",
    aliases: ["List your analytics modules", "Six analytics areas"],
    keywords: [
      "trip revenue",
      "cleaning",
      "rta",
      "customer stats",
      "metrics",
      "tars",
    ],
  },
  {
    id: "q025",
    category: "Udrive",
    question: "Tell me about Trip Revenue analytics.",
    answer:
      "Trip Revenue is one of the six analytics areas I built or heavily evolved at Udrive. My documented work across these modules includes shared filters, responsive charts and tables, and CSV export workflows.",
    aliases: ["Revenue dashboard?", "Trip revenue reporting"],
    keywords: ["revenue", "trips"],
  },
  {
    id: "q026",
    category: "Udrive",
    question: "Tell me about Cleaning analytics.",
    answer:
      "Cleaning is one of the operational analytics areas I built or significantly enhanced. My work on the analytics platform includes usable filtering, responsive reporting interfaces, and CSV exports.",
    aliases: ["Cleaning dashboard?", "Cleaning reports"],
    keywords: ["cleaning", "analytics"],
  },
  {
    id: "q027",
    category: "Udrive",
    question: "Tell me about RTA Parking analytics.",
    answer:
      "RTA Parking is one of the six analytics modules I built or heavily evolved. I worked on reporting interfaces with filtering, responsive data presentation, and CSV export workflows.",
    aliases: ["RTA reports?", "Parking analytics"],
    keywords: ["rta", "parking"],
  },
  {
    id: "q028",
    category: "Udrive",
    question: "Tell me about Customer Stats.",
    answer:
      "Customer Stats is one of the analytics areas I developed or significantly enhanced, with a focus on presenting operational data through accessible filters, tables, charts, and export patterns.",
    aliases: ["Customer statistics?", "Customer analytics"],
    keywords: ["customers", "stats"],
  },
  {
    id: "q029",
    category: "Udrive",
    question: "Tell me about Metrics and D3.js.",
    answer:
      "Metrics is one of the analytics areas where I used D3.js for specialized visualizations. The wider analytics platform also includes responsive charts, filters, tables, and CSV export workflows.",
    aliases: ["D3 metrics?", "Custom analytics visualizations"],
    keywords: ["metrics", "d3"],
  },
  {
    id: "q030",
    category: "Udrive",
    question: "Tell me about TARS.",
    answer:
      "TARS is one of the six analytics areas I built or heavily evolved at Udrive. My CV confirms my work on its analytics interface, but does not expand the TARS acronym or document its underlying business logic.",
    aliases: ["What is TARS?", "TARS reporting"],
    keywords: ["tars"],
  },
  {
    id: "q031",
    category: "Udrive",
    question: "Tell me about Banner Studio.",
    answer:
      "I built an in-app visual editor with draggable and resizable text, images, and shapes; templates; undo and redo; previews; and HTML/JSON import and export. It supports lightweight marketing content creation within the application.",
    aliases: ["What is Banner Studio?", "Marketing editor"],
    keywords: ["banner", "studio", "editor"],
  },
  {
    id: "q032",
    category: "Udrive",
    question: "How does Banner Studio undo and redo work?",
    answer:
      "Banner Studio includes undo and redo functionality. My CV confirms that capability, but does not specify its internal state-history implementation, so I wouldn’t claim a particular algorithm without checking the code.",
    aliases: ["How did you implement undo/redo?"],
    keywords: ["undo", "redo", "banner"],
  },
  {
    id: "q033",
    category: "Udrive",
    question: "How does driver tracking work?",
    answer:
      "I built a near-real-time Mapbox driver map for mobility operations, using 10-second polling to refresh data. The surrounding tools support driver management, rides operations, and fleet workflows.",
    aliases: ["Driver map?", "Real-time vehicle tracking?", "Mapbox polling"],
    keywords: ["mapbox", "tracking", "drivers", "10 seconds"],
  },
  {
    id: "q034",
    category: "Udrive",
    question: "Is the driver map real-time?",
    answer:
      "It’s near-real-time rather than a continuous live stream: the documented implementation polls for updates every 10 seconds.",
    aliases: ["Does tracking use websockets?", "Live driver map?"],
    keywords: ["polling", "realtime", "real-time"],
  },
  {
    id: "q035",
    category: "Udrive",
    question: "Tell me about fleet management.",
    answer:
      "I worked on driver and fleet management interfaces including create, edit, assignment, and vehicle-state workflows. The platform also supports location updates and operational controls such as lock/unlock and immobilize/mobilize.",
    aliases: ["What fleet tools did you build?", "Vehicle management"],
    keywords: ["fleet", "vehicles"],
  },
  {
    id: "q036",
    category: "Udrive",
    question: "What vehicle controls have you implemented?",
    answer:
      "My work includes interfaces for lock/unlock, immobilize/mobilize, onboarding and offboarding, location and state updates, and related loading, error, and feedback states.",
    aliases: ["Can you control vehicles?", "Lock unlock?"],
    keywords: ["lock", "unlock", "immobilize", "mobilize"],
  },
  {
    id: "q037",
    category: "Udrive",
    question: "Tell me about the subscription admin.",
    answer:
      "I built most of the React frontend for Udrive’s monthly subscription administration platform, including sales, customers and KYC, fleet operations, subscriptions, invoices, product catalog, analytics, and role-based administration.",
    aliases: ["Monthly admin?", "Subscription dashboard"],
    keywords: ["subscription", "monthly"],
  },
  {
    id: "q038",
    category: "Udrive",
    question: "Tell me about the CRM.",
    answer:
      "I developed frontend workflows for lead management, sales stages, assignments, search, filters, archiving, and outreach as part of the subscription administration platform.",
    aliases: ["Customer relationship management?", "Sales CRM"],
    keywords: ["crm", "sales"],
  },
  {
    id: "q039",
    category: "Udrive",
    question: "How does the Kanban sales pipeline work?",
    answer:
      "The pipeline supports Lead, Initial Contact, Qualified, and Won/Lost stages, with transitions, filtering, assignee management, lead creation, lost/archive actions, and personalized WhatsApp outreach.",
    aliases: ["Kanban CRM?", "Lead stages?", "Sales board"],
    keywords: ["kanban", "leads", "pipeline"],
  },
  {
    id: "q040",
    category: "Udrive",
    question: "Did you build WhatsApp outreach?",
    answer:
      "Yes. I implemented one-click personalized WhatsApp outreach as part of the CRM lead-management workflow.",
    aliases: ["WhatsApp integration?", "Contact leads by WhatsApp"],
    keywords: ["whatsapp", "crm"],
  },
  {
    id: "q041",
    category: "Udrive",
    question: "What subscription product management features did you build?",
    answer:
      "I implemented frontend product-management features for vehicle colors, pricing, and mileage packages, along with car assignment and invoice operations.",
    aliases: ["Pricing catalog?", "Mileage packages?"],
    keywords: ["catalog", "pricing", "mileage"],
  },
  {
    id: "q042",
    category: "Udrive",
    question: "Tell me about Deals Report.",
    answer:
      "I created a filterable, print-friendly Deals Report within the subscription administration platform, alongside D3-based lead and funnel analytics.",
    aliases: ["Sales report?", "Printable deals"],
    keywords: ["deals", "report"],
  },
  {
    id: "q043",
    category: "Udrive",
    question: "Tell me about the Vite migration.",
    answer:
      "I migrated a React frontend from CRA/CRACO to Vite to improve startup and hot module replacement and simplify configuration, while preserving the existing build output. I also handled frontend deployment on AWS EC2 with Nginx and HTTPS.",
    aliases: ["CRA to Vite?", "CRACO migration"],
    keywords: ["vite", "migration", "cra", "craco"],
  },
  {
    id: "q044",
    category: "Udrive",
    question: "Tell me about the new Udrive website.",
    answer:
      "I’ve been building Udrive’s customer-facing website from Figma using Next.js App Router, TypeScript, and CSS Modules. The work includes roughly 20 routes, English/Arabic support, responsive components, and performance-focused asset delivery. That website is currently in development.",
    aliases: ["Website redesign?", "Customer website?", "Next.js website"],
    keywords: ["website", "nextjs"],
  },
  {
    id: "q045",
    category: "Udrive",
    question: "How do you support Arabic and RTL?",
    answer:
      "The Next.js website includes English and Arabic locale routing and right-to-left support. I implement responsive layouts and reusable components that work across those language experiences.",
    aliases: ["Multilingual website?", "Right to left?", "Arabic localization"],
    keywords: ["arabic", "rtl", "locale", "i18n"],
  },
  {
    id: "q046",
    category: "Udrive",
    question: "How do you translate Figma into code?",
    answer:
      "I implement Figma designs in Next.js with attention to responsive layouts, reusable components, and visual consistency across desktop, tablet, and mobile.",
    aliases: ["Pixel-perfect design?", "Figma implementation"],
    keywords: ["figma", "responsive"],
  },
  {
    id: "q047",
    category: "Udrive",
    question: "How did you optimize the website?",
    answer:
      "I worked with CloudFront-hosted WebP, SVG, and Lottie assets; responsive next/image loading; lazy loading; next/font; critical asset preloading; and offscreen or play-once animation behavior.",
    aliases: [
      "Website performance?",
      "Image optimization?",
      "Lottie optimization",
    ],
    keywords: ["performance", "webp", "lottie", "cloudfront"],
  },
  {
    id: "q048",
    category: "Udrive",
    question: "Tell me about KYC automation.",
    answer:
      "I contributed to a production Python/FastStream Kafka pipeline using Taareef AI OCR, face/liveness/audio checks, AWS S3 documents, PostgreSQL updates, and automated approval or rejection workflows.",
    aliases: ["Identity verification?", "KYC pipeline"],
    keywords: ["kyc", "verification"],
  },
  {
    id: "q049",
    category: "Udrive",
    question: "What documents does the KYC system validate?",
    answer:
      "My work covered Emirates IDs, UAE and foreign driving licences, and passports, including age, expiry, driving experience, cross-document name matching, and fraud-related checks.",
    aliases: [
      "Emirates ID?",
      "Passport verification?",
      "Driving licence checks",
    ],
    keywords: ["emirates id", "passport", "licence"],
  },
  {
    id: "q050",
    category: "Udrive",
    question: "How does liveness verification fit into KYC?",
    answer:
      "The production verification pipeline incorporates face, liveness, and audio checks alongside document OCR and eligibility validation. I contributed to validation and decisioning logic; the CV does not specify the underlying biometric models.",
    aliases: ["Face match?", "Biometric verification"],
    keywords: ["liveness", "face", "audio"],
  },
  {
    id: "q051",
    category: "Udrive",
    question: "What is your experience with automation?",
    answer:
      "I delivered invoice automation with serverless functions and contributed to KYC automation and analytics infrastructure improvements. These projects reduce repetitive operational work and improve business workflows.",
    aliases: ["What processes did you automate?", "Automation projects"],
    keywords: ["automation", "serverless"],
  },
  {
    id: "q052",
    category: "Udrive",
    question: "Tell me about invoice automation.",
    answer:
      "I delivered serverless invoice automation that reduced manual operational overhead and improved debt recovery by 30%.",
    aliases: ["Invoice workflows?", "Debt recovery automation"],
    keywords: ["invoices", "debt"],
  },
  {
    id: "q053",
    category: "Udrive",
    question: "Tell me about Apache Superset.",
    answer:
      "I contributed to migrating analytics to self-hosted Apache Superset with secure data pipelines and authentication. The migration reduced analytics infrastructure costs by approximately 70%.",
    aliases: ["Superset migration?", "Self-hosted BI"],
    keywords: ["superset", "analytics", "migration"],
  },
  {
    id: "q054",
    category: "Udrive",
    question: "What is your experience with Kafka monitoring?",
    answer:
      "I contributed to Kafka-based monitoring and operational visibility as part of platform automation and observability work. My CV does not specify the monitoring stack or alert rules.",
    aliases: ["Kafka observability?", "Operational monitoring"],
    keywords: ["kafka", "monitoring"],
  },
  {
    id: "q055",
    category: "Impact",
    question: "What impact have you made?",
    answer:
      "My documented business outcomes include an approximately 70% reduction in analytics infrastructure costs through migration work and a 30% improvement in debt recovery through invoice automation. I’ve also built tools supporting day-to-day operations, reporting, and customer management.",
    aliases: ["What measurable results?", "Business impact"],
    keywords: ["impact", "metrics", "results"],
  },
  {
    id: "q056",
    category: "Impact",
    question: "How did you reduce analytics costs by 70%?",
    answer:
      "I contributed to moving analytics to a self-hosted Apache Superset environment with secure data pipelines and authentication. The migration reduced infrastructure costs by approximately 70%. My CV does not provide a detailed cost breakdown.",
    aliases: ["70% cost reduction?", "Analytics savings"],
    keywords: ["70%", "cost", "superset"],
  },
  {
    id: "q057",
    category: "Impact",
    question: "How did you improve debt recovery by 30%?",
    answer:
      "I delivered invoice automation using serverless functions. It reduced manual operational overhead and contributed to a 30% improvement in debt recovery.",
    aliases: ["30% debt recovery?", "Invoice results"],
    keywords: ["30%", "debt", "invoice"],
  },
  {
    id: "q058",
    category: "Impact",
    question: "Which project had measurable business impact?",
    answer:
      "The analytics infrastructure migration and invoice automation have the clearest documented metrics: approximately 70% lower infrastructure costs and 30% improved debt recovery, respectively.",
    aliases: ["Best impact project?", "Most valuable project"],
    keywords: ["business", "achievement"],
  },
  {
    id: "q059",
    category: "Impact",
    question: "How many users use your software?",
    answer:
      "My CV documents production platforms but does not include verified user counts. I’d rather share an accurate figure directly than estimate one here.",
    aliases: ["How many active users?", "Application usage numbers"],
    keywords: ["users", "scale", "traffic"],
  },
  {
    id: "q060",
    category: "Impact",
    question: "How much revenue did your work generate?",
    answer:
      "My CV does not state a revenue figure. The documented outcomes are approximately 70% lower analytics infrastructure costs and 30% improved debt recovery.",
    aliases: ["Revenue generated?", "ROI in dollars"],
    keywords: ["revenue", "roi"],
  },
  {
    id: "q061",
    category: "Internships",
    question: "Tell me about your internships.",
    answer:
      "At Dubai Technologies, I developed Python desktop GUIs with Tkinter and PyQt. At Arata International, I built a React Native/Expo vehicle marketplace app, worked on .NET REST APIs, and supported business data workflows.",
    aliases: ["Internship experience?", "Early career"],
    keywords: ["intern", "internships"],
  },
  {
    id: "q062",
    category: "Internships",
    question: "What did you do at Arata International?",
    answer:
      "From February to June 2024, I was an IT Intern at Arata International FZC, part of Bahwan International Group. I shipped a React Native/Expo used-vehicle marketplace app, worked on .NET REST APIs, and supported CARPRO and INTELLiVIEW data workflows.",
    aliases: ["Bahwan internship?", "Arata role"],
    keywords: ["arata", "bahwan"],
  },
  {
    id: "q063",
    category: "Internships",
    question: "Tell me about your React Native app.",
    answer:
      "I built and shipped a cross-platform used-vehicle buying and selling app with React Native and Expo, including relational models for profiles, listings, and bidding transactions.",
    aliases: ["Vehicle marketplace app?", "Expo project"],
    keywords: ["react native", "expo", "marketplace"],
  },
  {
    id: "q064",
    category: "Internships",
    question: "Did you work with .NET APIs?",
    answer:
      "Yes. During my Arata International internship, I developed and maintained REST APIs using .NET and supported rental, leasing, and BI data workflows.",
    aliases: ["ASP.NET experience?", "REST backend internship"],
    keywords: ["dotnet", ".net", "api"],
  },
  {
    id: "q065",
    category: "Internships",
    question: "What are CARPRO and INTELLiVIEW?",
    answer:
      "During my Arata internship, I supported CARPRO rental and leasing data operations and INTELLiVIEW business intelligence dashboards and data-quality workflows. My CV does not describe their full internal architectures.",
    aliases: ["CARPRO?", "INTELLiVIEW?"],
    keywords: ["carpro", "intelliview"],
  },
  {
    id: "q066",
    category: "Internships",
    question: "What recognition did you receive at Arata?",
    answer:
      "I received a Certificate of Appreciation for successfully completing my internship with the Engineering & Technology Services Division.",
    aliases: ["Certificate of Appreciation?", "Internship award"],
    keywords: ["certificate", "appreciation"],
  },
  {
    id: "q067",
    category: "Internships",
    question: "What did you do at Dubai Technologies?",
    answer:
      "During July and August 2023, I developed responsive desktop interfaces using Python, Tkinter, and PyQt and collaborated with cross-functional teams to turn requirements into deployable software.",
    aliases: ["Dubai Technologies internship?", "Python internship"],
    keywords: ["dubai technologies", "tkinter", "pyqt"],
  },
  {
    id: "q068",
    category: "Stack",
    question: "What is your tech stack?",
    answer:
      "My strongest frontend technologies are React, Next.js, TypeScript, JavaScript, MUI, and CSS Modules. I also have experience with Python, REST APIs, Kafka, PostgreSQL, AWS, D3.js, Mapbox/MapLibre, React Native, and deployment tooling.",
    aliases: ["Technologies you use?", "Your tools?"],
    keywords: ["stack", "technologies", "skills"],
  },
  {
    id: "q069",
    category: "Stack",
    question: "What is your experience with React?",
    answer:
      "I’ve used React extensively across production operations, analytics, CRM, and subscription administration interfaces.",
    aliases: ["Do you know React?", "Have you used React?"],
    keywords: ["react"],
  },
  {
    id: "q070",
    category: "Stack",
    question: "What is your experience with Next.js?",
    answer:
      "I’ve used Next.js App Router with TypeScript and CSS Modules to build a multilingual, responsive customer-facing website.",
    aliases: ["Do you know Next.js?", "Have you used Next.js?"],
    keywords: ["next.js"],
  },
  {
    id: "q071",
    category: "Stack",
    question: "What is your experience with TypeScript?",
    answer:
      "TypeScript is part of my core frontend stack, especially for React and Next.js development.",
    aliases: ["Do you know TypeScript?", "Have you used TypeScript?"],
    keywords: ["typescript"],
  },
  {
    id: "q072",
    category: "Stack",
    question: "What is your experience with JavaScript?",
    answer:
      "JavaScript is a core language in my frontend work across React applications and web interfaces.",
    aliases: ["Do you know JavaScript?", "Have you used JavaScript?"],
    keywords: ["javascript"],
  },
  {
    id: "q073",
    category: "Stack",
    question: "What is your experience with Python?",
    answer:
      "I’ve used Python for desktop GUIs and contributed to production KYC verification automation with FastStream and Kafka.",
    aliases: ["Do you know Python?", "Have you used Python?"],
    keywords: ["python"],
  },
  {
    id: "q074",
    category: "Stack",
    question: "What is your experience with React Native?",
    answer:
      "I built and shipped a cross-platform used-vehicle marketplace app using React Native and Expo.",
    aliases: ["Do you know React Native?", "Have you used React Native?"],
    keywords: ["react native"],
  },
  {
    id: "q075",
    category: "Stack",
    question: "What is your experience with Expo?",
    answer:
      "I used Expo with React Native during development of a cross-platform vehicle marketplace app.",
    aliases: ["Do you know Expo?", "Have you used Expo?"],
    keywords: ["expo"],
  },
  {
    id: "q076",
    category: "Stack",
    question: "What is your experience with MUI?",
    answer:
      "I’ve used Material UI extensively in large React-based internal operations and admin platforms.",
    aliases: ["Do you know MUI?", "Have you used MUI?"],
    keywords: ["mui"],
  },
  {
    id: "q077",
    category: "Stack",
    question: "What is your experience with D3.js?",
    answer:
      "I’ve used D3.js for specialized analytics and sales-funnel visualizations.",
    aliases: ["Do you know D3.js?", "Have you used D3.js?"],
    keywords: ["d3.js"],
  },
  {
    id: "q078",
    category: "Stack",
    question: "What is your experience with Mapbox?",
    answer:
      "I built a near-real-time driver-tracking interface with Mapbox and 10-second polling.",
    aliases: ["Do you know Mapbox?", "Have you used Mapbox?"],
    keywords: ["mapbox"],
  },
  {
    id: "q079",
    category: "Stack",
    question: "What is your experience with MapLibre?",
    answer:
      "I used MapLibre maps in customer and fleet administration interfaces.",
    aliases: ["Do you know MapLibre?", "Have you used MapLibre?"],
    keywords: ["maplibre"],
  },
  {
    id: "q080",
    category: "Stack",
    question: "What is your experience with Vite?",
    answer:
      "I migrated a React frontend from CRA/CRACO to Vite to improve the development experience and simplify configuration.",
    aliases: ["Do you know Vite?", "Have you used Vite?"],
    keywords: ["vite"],
  },
  {
    id: "q081",
    category: "Stack",
    question: "What is your experience with Nginx?",
    answer: "I handled frontend deployment on AWS EC2 with Nginx and HTTPS.",
    aliases: ["Do you know Nginx?", "Have you used Nginx?"],
    keywords: ["nginx"],
  },
  {
    id: "q082",
    category: "Stack",
    question: "What is your experience with REST APIs?",
    answer:
      "I regularly integrate frontend applications with REST APIs and developed and maintained .NET REST APIs during my Arata internship.",
    aliases: ["Do you know REST APIs?", "Have you used REST APIs?"],
    keywords: ["rest apis"],
  },
  {
    id: "q083",
    category: "Stack",
    question: "What is your experience with PostgreSQL?",
    answer:
      "I’ve worked with PostgreSQL in production verification and data workflows.",
    aliases: ["Do you know PostgreSQL?", "Have you used PostgreSQL?"],
    keywords: ["postgresql"],
  },
  {
    id: "q084",
    category: "Stack",
    question: "What is your experience with Kafka?",
    answer:
      "I contributed to Python/FastStream Kafka-based verification workflows and Kafka-related monitoring.",
    aliases: ["Do you know Kafka?", "Have you used Kafka?"],
    keywords: ["kafka"],
  },
  {
    id: "q085",
    category: "Stack",
    question: "What is your experience with FastStream?",
    answer:
      "I contributed to a production Python/FastStream Kafka verification pipeline.",
    aliases: ["Do you know FastStream?", "Have you used FastStream?"],
    keywords: ["faststream"],
  },
  {
    id: "q086",
    category: "Stack",
    question: "What is your experience with Node.js?",
    answer:
      "Node.js and Express are listed in my backend and integration skill set. My CV does not describe a specific Node.js project.",
    aliases: ["Do you know Node.js?", "Have you used Node.js?"],
    keywords: ["node.js"],
  },
  {
    id: "q087",
    category: "Stack",
    question: "What is your experience with Express?",
    answer:
      "Express is listed in my backend skill set, although my CV does not identify a dedicated Express project.",
    aliases: ["Do you know Express?", "Have you used Express?"],
    keywords: ["express"],
  },
  {
    id: "q088",
    category: "Stack",
    question: "What is your experience with AWS EC2?",
    answer:
      "I handled frontend build and deployment on AWS EC2, including Nginx and HTTPS.",
    aliases: ["Do you know AWS EC2?", "Have you used AWS EC2?"],
    keywords: ["aws ec2"],
  },
  {
    id: "q089",
    category: "Stack",
    question: "What is your experience with AWS S3?",
    answer:
      "I worked with AWS S3 document storage as part of a production KYC verification pipeline.",
    aliases: ["Do you know AWS S3?", "Have you used AWS S3?"],
    keywords: ["aws s3"],
  },
  {
    id: "q090",
    category: "Stack",
    question: "What is your experience with AWS CloudFront?",
    answer:
      "I used CloudFront-hosted optimized assets for a Next.js customer-facing website.",
    aliases: ["Do you know AWS CloudFront?", "Have you used AWS CloudFront?"],
    keywords: ["aws cloudfront"],
  },
  {
    id: "q091",
    category: "Stack",
    question: "What is your experience with AWS Route 53?",
    answer:
      "Route 53 is listed among my cloud tools; my CV does not detail a specific Route 53 implementation.",
    aliases: ["Do you know AWS Route 53?", "Have you used AWS Route 53?"],
    keywords: ["aws route 53"],
  },
  {
    id: "q092",
    category: "Stack",
    question: "What is your experience with AWS CloudWatch?",
    answer:
      "CloudWatch is included in my cloud and DevOps skills; the CV does not specify individual dashboards or alarms.",
    aliases: ["Do you know AWS CloudWatch?", "Have you used AWS CloudWatch?"],
    keywords: ["aws cloudwatch"],
  },
  {
    id: "q093",
    category: "Stack",
    question: "What is your experience with Cloudflare?",
    answer:
      "Cloudflare is listed in my cloud and deployment skills; my CV does not specify a particular Cloudflare implementation.",
    aliases: ["Do you know Cloudflare?", "Have you used Cloudflare?"],
    keywords: ["cloudflare"],
  },
  {
    id: "q094",
    category: "Stack",
    question: "What is your experience with GitHub Actions?",
    answer:
      "GitHub Actions is included in my DevOps skill set, but my CV does not document a specific pipeline.",
    aliases: ["Do you know GitHub Actions?", "Have you used GitHub Actions?"],
    keywords: ["github actions"],
  },
  {
    id: "q095",
    category: "Stack",
    question: "What is your experience with CSS Modules?",
    answer:
      "I used CSS Modules with Next.js to build maintainable responsive website interfaces.",
    aliases: ["Do you know CSS Modules?", "Have you used CSS Modules?"],
    keywords: ["css modules"],
  },
  {
    id: "q096",
    category: "Stack",
    question: "What is your experience with Lottie?",
    answer:
      "I worked with Lottie assets and performance-conscious playback, including offscreen and play-once behavior.",
    aliases: ["Do you know Lottie?", "Have you used Lottie?"],
    keywords: ["lottie"],
  },
  {
    id: "q097",
    category: "Stack",
    question: "What is your experience with Redux?",
    answer:
      "Redux is part of my frontend skill set; my CV does not describe a specific Redux architecture.",
    aliases: ["Do you know Redux?", "Have you used Redux?"],
    keywords: ["redux"],
  },
  {
    id: "q098",
    category: "Stack",
    question: "What is your experience with React Router?",
    answer:
      "I’ve worked with protected routing and frontend authentication in React applications; React Router is included in my frontend stack.",
    aliases: ["Do you know React Router?", "Have you used React Router?"],
    keywords: ["react router"],
  },
  {
    id: "q099",
    category: "Stack",
    question: "What is your experience with JWT?",
    answer:
      "I maintained JWT-based frontend authentication flows and protected routing in internal platforms.",
    aliases: ["Do you know JWT?", "Have you used JWT?"],
    keywords: ["jwt"],
  },
  {
    id: "q100",
    category: "Stack",
    question: "What is your experience with OAuth2?",
    answer:
      "OAuth2 is listed in my backend and integration skill set; the CV does not detail a specific implementation.",
    aliases: ["Do you know OAuth2?", "Have you used OAuth2?"],
    keywords: ["oauth2"],
  },
  {
    id: "q101",
    category: "Stack",
    question: "What is your experience with Pydantic?",
    answer:
      "Pydantic is listed in my backend skill set, alongside my work on Python verification workflows.",
    aliases: ["Do you know Pydantic?", "Have you used Pydantic?"],
    keywords: ["pydantic"],
  },
  {
    id: "q102",
    category: "Stack",
    question: "What is your experience with asyncpg?",
    answer:
      "asyncpg is included in my backend integration skill set; the CV does not specify a dedicated project using it.",
    aliases: ["Do you know asyncpg?", "Have you used asyncpg?"],
    keywords: ["asyncpg"],
  },
  {
    id: "q103",
    category: "Stack",
    question: "What is your experience with Apache Superset?",
    answer:
      "I contributed to a self-hosted Apache Superset analytics migration that reduced infrastructure costs by approximately 70%.",
    aliases: ["Do you know Apache Superset?", "Have you used Apache Superset?"],
    keywords: ["apache superset"],
  },
  {
    id: "q104",
    category: "Stack",
    question: "What is your experience with Apache Airflow?",
    answer:
      "Apache Airflow is listed in my data and monitoring skill set; my CV does not describe a specific DAG or deployment.",
    aliases: ["Do you know Apache Airflow?", "Have you used Apache Airflow?"],
    keywords: ["apache airflow"],
  },
  {
    id: "q105",
    category: "Stack",
    question: "What is your experience with MS SQL Server?",
    answer:
      "MS SQL Server is listed in my data skill set; the CV does not document a specific project using it.",
    aliases: ["Do you know MS SQL Server?", "Have you used MS SQL Server?"],
    keywords: ["ms sql server"],
  },
  {
    id: "q106",
    category: "Stack",
    question: "What is your experience with Firebase?",
    answer:
      "Firebase is included in my data and monitoring skills; my CV does not describe a specific Firebase implementation.",
    aliases: ["Do you know Firebase?", "Have you used Firebase?"],
    keywords: ["firebase"],
  },
  {
    id: "q107",
    category: "Stack",
    question: "What is your experience with Figma?",
    answer:
      "I translate Figma designs into responsive Next.js interfaces and reusable components.",
    aliases: ["Do you know Figma?", "Have you used Figma?"],
    keywords: ["figma"],
  },
  {
    id: "q108",
    category: "Stack",
    question: "What is your experience with Git and GitHub?",
    answer: "I use Git and GitHub as part of my software development workflow.",
    aliases: ["Do you know Git and GitHub?", "Have you used Git and GitHub?"],
    keywords: ["git and github"],
  },
  {
    id: "q109",
    category: "Stack",
    question: "What is your experience with Jira and Confluence?",
    answer:
      "Jira and Confluence are included in my tooling experience, though my CV does not describe a specific team process.",
    aliases: [
      "Do you know Jira and Confluence?",
      "Have you used Jira and Confluence?",
    ],
    keywords: ["jira and confluence"],
  },
  {
    id: "q110",
    category: "Stack",
    question: "What is your experience with Adobe creative tools?",
    answer:
      "My CV lists Photoshop, Illustrator, and Premiere Pro among my tools.",
    aliases: [
      "Do you know Adobe creative tools?",
      "Have you used Adobe creative tools?",
    ],
    keywords: ["adobe creative tools"],
  },
  {
    id: "q111",
    category: "Engineering",
    question: "How do you approach large React applications?",
    answer:
      "My experience includes reusable UI patterns, protected routing, role-based frontend permissions, responsive layouts, and consistent API loading and error states across large internal React applications.",
    aliases: ["How do you structure React apps?", "Frontend architecture"],
    keywords: ["architecture", "react"],
  },
  {
    id: "q112",
    category: "Engineering",
    question: "How do you design reusable components?",
    answer:
      "I build shared interface patterns for navigation, forms, tables, charts, and content sections so related workflows stay consistent and easier to maintain. This approach has been central to my internal platforms and Next.js website work.",
    aliases: ["Component reuse?", "Design system approach"],
    keywords: ["components", "reuse"],
  },
  {
    id: "q113",
    category: "Engineering",
    question: "How do you handle API failures and loading states?",
    answer:
      "I’ve implemented resilient loading, error, and toast-feedback patterns for operational actions. Clear states matter especially when a user is managing vehicles, reservations, or other business-critical workflows.",
    aliases: ["Error handling?", "Loading skeletons?", "Toasts"],
    keywords: ["api", "errors", "loading"],
  },
  {
    id: "q114",
    category: "Engineering",
    question: "How do you implement access control in the frontend?",
    answer:
      "I’ve maintained protected routing, JWT-based frontend authentication flows, and feature scopes or role-based UI permissions in internal applications. Backend authorization must still be enforced server-side.",
    aliases: ["RBAC?", "Protected routes?", "Authorization"],
    keywords: ["auth", "rbac", "jwt"],
  },
  {
    id: "q115",
    category: "Engineering",
    question: "How do you handle responsive design?",
    answer:
      "I build layouts for desktop, tablet, and mobile, using reusable components and responsive data presentation. My experience includes both large internal admin platforms and a Figma-driven customer-facing website.",
    aliases: ["Mobile responsiveness?", "Tablet support"],
    keywords: ["responsive", "mobile"],
  },
  {
    id: "q116",
    category: "Engineering",
    question: "How do you optimize frontend performance?",
    answer:
      "My documented work includes migrating tooling to Vite, optimizing website asset delivery, responsive image loading, lazy loading, font handling, and controlling offscreen animations. I focus on improvements that preserve usability and visual consistency.",
    aliases: ["Performance optimization?", "Fast website"],
    keywords: ["performance", "speed"],
  },
  {
    id: "q117",
    category: "Engineering",
    question: "How do you work with legacy code?",
    answer:
      "I’ve maintained existing React applications and migrated one from CRA/CRACO to Vite while preserving its build output. That experience required improving developer tooling without unnecessarily disrupting the application.",
    aliases: ["Legacy migration?", "Refactoring old code"],
    keywords: ["legacy", "migration"],
  },
  {
    id: "q118",
    category: "Engineering",
    question: "How do you handle complex data tables?",
    answer:
      "My operations and analytics work includes responsive tables, shared filters, reporting workflows, and CSV exports. I focus on making operational data usable rather than simply displaying large datasets.",
    aliases: ["Data-heavy interfaces?", "Table UX"],
    keywords: ["tables", "filters", "csv"],
  },
  {
    id: "q119",
    category: "Engineering",
    question: "What is your experience with charts?",
    answer:
      "I’ve built analytics dashboards with responsive charts and used D3.js for more specialized metrics and funnel visualizations.",
    aliases: ["Data visualization approach?", "Charting"],
    keywords: ["charts", "d3"],
  },
  {
    id: "q120",
    category: "Engineering",
    question: "How do you work with backend teams?",
    answer:
      "My work involves integrating frontend features with REST APIs and contributing to selected backend workflows. The CV confirms cross-system integration experience but does not describe my team structure or meeting practices.",
    aliases: ["Cross-functional collaboration?", "API contracts"],
    keywords: ["collaboration", "backend"],
  },
  {
    id: "q121",
    category: "Engineering",
    question: "How do you debug production issues?",
    answer:
      "I have production experience maintaining operational applications and implementing clear loading and error feedback. My CV does not document a particular debugging incident, so I’d discuss a specific example directly rather than invent one.",
    aliases: ["Production debugging?", "Troubleshooting"],
    keywords: ["debug", "incident"],
  },
  {
    id: "q122",
    category: "Engineering",
    question: "What testing frameworks do you use?",
    answer:
      "My public CV does not list specific testing frameworks, so I wouldn’t claim experience with a particular one based on the CV alone. I’m happy to discuss my actual testing workflow directly.",
    aliases: ["Jest?", "Playwright?", "Unit tests"],
    keywords: ["testing", "qa"],
  },
  {
    id: "q123",
    category: "Engineering",
    question: "Have you worked with CI/CD?",
    answer:
      "GitHub Actions and cloud deployment tooling are included in my skills. I’ve also handled frontend deployment on AWS EC2 with Nginx and HTTPS; my CV does not describe a particular CI/CD pipeline configuration.",
    aliases: ["Continuous deployment?", "Build pipeline"],
    keywords: ["cicd", "deploy"],
  },
  {
    id: "q124",
    category: "Engineering",
    question: "Do you prefer frontend architecture or automation?",
    answer:
      "Frontend engineering and application architecture are my strongest areas, but I’ve also delivered invoice automation and contributed to Python-based verification workflows.",
    aliases: ["Architecture vs automation?", "Engineering focus"],
    keywords: ["focus", "automation"],
  },
  {
    id: "q125",
    category: "Engineering",
    question: "What is your most technically challenging project?",
    answer:
      "My CV shows several complex projects, including large operations platforms, Banner Studio, and KYC automation. It does not identify one as my single hardest project, so I’d prefer to discuss that comparison directly.",
    aliases: ["Hardest project?", "Most complex challenge"],
    keywords: ["challenge", "hardest"],
  },
  {
    id: "q126",
    category: "Engineering",
    question: "How do you handle technical debt?",
    answer:
      "I’ve worked on maintainability through reusable components and a CRA/CRACO-to-Vite migration. My CV does not describe a formal technical-debt process, so I wouldn’t invent one.",
    aliases: ["Refactoring strategy?", "Code quality"],
    keywords: ["technical debt", "refactor"],
  },
  {
    id: "q127",
    category: "Engineering",
    question: "How do you manage state in React?",
    answer:
      "Redux is listed in my skills, and I’ve built stateful interfaces including Kanban workflows and Banner Studio. My CV does not specify the state-management design of each application.",
    aliases: ["React state management?", "Redux architecture"],
    keywords: ["state", "redux"],
  },
  {
    id: "q128",
    category: "Education",
    question: "What did you study?",
    answer:
      "I completed a B.Tech in Computer Science Engineering at Manipal Academy of Higher Education, Dubai, graduating in 2024.",
    aliases: ["What is your degree?", "Academic background"],
    keywords: ["degree", "education"],
  },
  {
    id: "q129",
    category: "Education",
    question: "Where did you go to university?",
    answer:
      "I graduated from Manipal Academy of Higher Education in Dubai in 2024 with a B.Tech in Computer Science Engineering.",
    aliases: ["Which college?", "Manipal Dubai"],
    keywords: ["manipal", "university"],
  },
  {
    id: "q130",
    category: "Education",
    question: "Where did you go to school?",
    answer:
      "I completed CBSE higher secondary education in Physics, Chemistry, and Mathematics at IES, Sharjah, from 2018 to 2020.",
    aliases: ["High school?", "IES Sharjah"],
    keywords: ["school", "cbse"],
  },
  {
    id: "q131",
    category: "Education",
    question: "What professional courses have you completed?",
    answer:
      "My CV lists Mathematics for Machine Learning through Imperial College London on Coursera, Object-Oriented Programming in Java through UC San Diego on Coursera, Cisco networking and IoT fundamentals, and blockchain and Ethereum fundamentals through Kerala Blockchain Academy.",
    aliases: ["Certifications?", "Professional development"],
    keywords: ["courses", "certifications"],
  },
  {
    id: "q132",
    category: "Education",
    question: "Did you study machine learning?",
    answer:
      "I completed the Mathematics for Machine Learning course through Imperial College London on Coursera in 2021. My CV does not claim a professional machine-learning engineering role.",
    aliases: ["ML course?", "Mathematics for ML"],
    keywords: ["machine learning", "coursera"],
  },
  {
    id: "q133",
    category: "Education",
    question: "What did you learn about networking and IoT?",
    answer:
      "My professional development includes Introduction to Networks and IoT Fundamentals through Cisco Networking Academy in 2023. The CV does not list specific course projects.",
    aliases: ["Cisco certification?", "IoT course"],
    keywords: ["cisco", "iot", "networking"],
  },
  {
    id: "q134",
    category: "Education",
    question: "Have you studied blockchain?",
    answer:
      "Yes. I completed Blockchain Foundation and Ethereum Fundamentals through Kerala Blockchain Academy in 2023.",
    aliases: ["Ethereum?", "Blockchain course"],
    keywords: ["blockchain", "ethereum"],
  },
  {
    id: "q135",
    category: "Education",
    question: "Tell me about your volunteer work.",
    answer:
      "I served as Sponsorship Head for Technovanza at Manipal Dubai in 2023 and volunteered for the AJAR Ramadan Drive in 2022.",
    aliases: ["Volunteering?", "Community work"],
    keywords: ["volunteer", "technovanza", "ajar"],
  },
  {
    id: "q136",
    category: "Education",
    question: "What was your role at Technovanza?",
    answer:
      "I served as Sponsorship Head for Technovanza at Manipal Dubai’s School of Engineering and IT in 2023.",
    aliases: ["Sponsorship Head?", "Technovanza"],
    keywords: ["technovanza", "sponsorship"],
  },
  {
    id: "q137",
    category: "Education",
    question: "What is the AJAR Ramadan Drive?",
    answer:
      "My CV records that I volunteered for the AJAR Ramadan Drive at Manipal Academy of Higher Education, Dubai, in 2022. It does not specify my individual responsibilities.",
    aliases: ["AJAR volunteer?", "Ramadan volunteering"],
    keywords: ["ajar", "ramadan"],
  },
  {
    id: "q138",
    category: "Contact",
    question: "Where are you based?",
    answer: "I’m based in Dubai, United Arab Emirates.",
    aliases: ["Where do you live?", "Your location"],
    keywords: ["dubai", "uae", "location"],
  },
  {
    id: "q139",
    category: "Contact",
    question: "How can I contact you?",
    answer:
      "You can email me at samankhanhq@gmail.com or use the LinkedIn and GitHub links on my portfolio.",
    aliases: ["Contact details?", "Get in touch"],
    keywords: ["contact", "email"],
  },
  {
    id: "q140",
    category: "Contact",
    question: "What is your email?",
    answer: "My email address is samankhanhq@gmail.com.",
    aliases: ["Email address?", "Send email"],
    keywords: ["email", "mail"],
  },
  {
    id: "q141",
    category: "Contact",
    question: "What is your phone number?",
    answer: "My phone number listed on my CV is +971 506019290.",
    aliases: ["Mobile number?", "Call you"],
    keywords: ["phone", "mobile"],
  },
  {
    id: "q142",
    category: "Contact",
    question: "Where can I find your LinkedIn?",
    answer:
      "My LinkedIn is https://www.linkedin.com/in/saman-shakil-khan-62728b208/. You can also use the LinkedIn link in the portfolio contact section.",
    aliases: ["LinkedIn profile?", "Connect on LinkedIn"],
    keywords: ["linkedin", "social"],
  },
  {
    id: "q143",
    category: "Contact",
    question: "Where can I find your GitHub?",
    answer:
      "My GitHub is https://github.com/buildwithsaman. You can also use the GitHub link in the portfolio contact section.",
    aliases: ["GitHub profile?", "See your repositories"],
    keywords: ["github", "code"],
  },
  {
    id: "q144",
    category: "Contact",
    question: "Can I download your CV?",
    answer:
      "Yes. Use the Download CV button on my portfolio to get Saman_Khan_CV.pdf, the same file as the desktop site.",
    aliases: ["Download resume?", "Get your PDF CV"],
    keywords: ["cv", "download", "resume"],
  },
  {
    id: "q145",
    category: "Contact",
    question: "Are you open to opportunities?",
    answer:
      "I’m a Dubai-based Software Engineer open to engineering opportunities, technical collaborations, and conversations about building production software. Roles involving React, Next.js, and frontend-focused platforms are a strong fit. Email is the best next step.",
    aliases: ["Are you hiring?", "Looking for work?", "Open to work"],
    keywords: ["opportunities", "jobs"],
  },
  {
    id: "q146",
    category: "Contact",
    question: "What is your expected salary?",
    answer:
      "Compensation expectations depend on the role and responsibilities. Please contact me directly to discuss them.",
    aliases: ["Salary expectations?", "Compensation?", "CTC"],
    keywords: ["salary", "pay"],
  },
  {
    id: "q147",
    category: "Contact",
    question: "What is your notice period?",
    answer:
      "My notice period is not stated in my public CV. Please contact me directly for current availability and timelines.",
    aliases: ["When can you join?", "Immediate joining"],
    keywords: ["notice", "joining"],
  },
  {
    id: "q148",
    category: "Contact",
    question: "What is your visa status?",
    answer:
      "My visa status is not included in my public CV. Please contact me directly for employment-related details.",
    aliases: ["Work visa?", "Residency status"],
    keywords: ["visa", "work permit"],
  },
  {
    id: "q149",
    category: "Contact",
    question: "What is your preferred work arrangement?",
    answer:
      "My public CV does not specify a preference for remote, hybrid, or onsite work. Please contact me to discuss the role and arrangement.",
    aliases: ["Remote or onsite?", "Hybrid work"],
    keywords: ["remote", "hybrid", "onsite"],
  },
  {
    id: "q150",
    category: "Contact",
    question: "Why are you leaving your current job?",
    answer:
      "My CV does not state a reason for considering a change. I’d prefer to discuss my motivations and fit for a particular opportunity directly.",
    aliases: ["Why change jobs?", "Why leave Udrive"],
    keywords: ["leaving", "job change"],
  },
  {
    id: "q151",
    category: "Contact",
    question: "What are your long-term career goals?",
    answer:
      "My CV establishes a strong focus on frontend engineering and production systems, but does not state a specific long-term career plan. I’d be glad to discuss my goals in the context of a role.",
    aliases: ["Where do you see yourself in five years?", "Career goals"],
    keywords: ["goals", "future"],
  },
  {
    id: "q152",
    category: "Contact",
    question: "Can you share Udrive source code?",
    answer:
      "I can discuss the projects and responsibilities described in my CV, but I don’t share proprietary company source code or confidential implementation details.",
    aliases: ["Show private code?", "Company repository"],
    keywords: ["source", "confidential"],
  },
  {
    id: "q153",
    category: "Portfolio",
    question: "Who built this portfolio?",
    answer:
      "I built this portfolio. I’m Saman Khan, a Software Engineer based in Dubai.",
    aliases: ["Who made this site?", "Whose portfolio is this?"],
    keywords: ["portfolio", "owner"],
  },
  {
    id: "q154",
    category: "Portfolio",
    question: "What should I explore first?",
    answer:
      "A good starting point is my Udrive experience and project work, especially the operations platform, analytics modules, subscription administration, and customer-facing website.",
    aliases: ["Where should I start?", "Best project to see"],
    keywords: ["explore", "projects"],
  },
  {
    id: "q155",
    category: "Portfolio",
    question: "Can I ask about a specific project?",
    answer:
      "Absolutely. You can ask about Operations, Analytics, Banner Studio, driver tracking, subscription admin, CRM, the Next.js website, KYC, or automation.",
    aliases: ["What can I ask?", "Project questions"],
    keywords: ["questions", "projects"],
  },
  {
    id: "q156",
    category: "Portfolio",
    question: "How does this portfolio chatbot work?",
    answer:
      "This is a local Q&A over 159 questions from my CV, not a live model. As you type, it suggests matching questions. Selecting one shows the stored answer. If a question is not in that set, I will say so and share my email instead of inventing a fact.",
    aliases: ["Is this AI?", "How does autocomplete work?"],
    keywords: ["chatbot", "assistant", "autocomplete"],
  },
  {
    id: "q157",
    category: "Portfolio",
    question: "What technologies power this portfolio?",
    answer:
      "This site is a Vite, React 19, TypeScript, Tailwind, and Framer Motion static portfolio. Below laptop width it becomes a conversational Q&A over my CV. Desktop is the cinematic page with intro, career, work, skills, and contact.",
    aliases: ["Portfolio tech stack?", "How was this site built?"],
    keywords: ["portfolio", "stack"],
  },
  {
    id: "q158",
    category: "Portfolio",
    question: "Can I see your projects?",
    answer:
      "Yes. On desktop, the Work section covers five Udrive domains. On mobile, ask about Operations, CRM, the website, KYC, or automation. Public code is on GitHub at https://github.com/buildwithsaman.",
    aliases: ["Show projects", "View work"],
    keywords: ["work", "projects"],
  },
  {
    id: "q159",
    category: "Portfolio",
    question: "Can I hire you for a project?",
    answer:
      "Please get in touch at samankhanhq@gmail.com with the project scope and requirements. I can discuss whether it is a suitable fit.",
    aliases: ["Freelance?", "Contract work?", "Work together"],
    keywords: ["hire", "freelance"],
  },
];

function cvAction(): AssistantAction {
  return {
    label: "Download CV",
    href: profile.resume,
    download: profile.resumeName,
  };
}

function contactActions(): AssistantAction[] {
  return [
    { label: "Email", href: `mailto:${profile.email}` },
    { label: "Call", href: profile.phoneHref },
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
  ];
}

function followUpsFor(item: Topic): string[] {
  const related = TOPICS.filter(
    (entry) => entry.category === item.category && entry.id !== item.id,
  )
    .slice(0, 4)
    .map((entry) => entry.question);
  if (related.length >= 3) return related;
  return [...related, ...MORE_CHIPS].slice(0, 4);
}

function actionsFor(item: Topic): AssistantAction[] | undefined {
  if (item.id === "q144") return [cvAction()];
  if (item.id === "q140") {
    return [{ label: "Email", href: `mailto:${profile.email}` }];
  }
  if (item.id === "q141") {
    return [{ label: "Call", href: profile.phoneHref }];
  }
  if (item.id === "q142") {
    return [{ label: "LinkedIn", href: profile.linkedin }];
  }
  if (item.id === "q143") {
    return [{ label: "GitHub", href: profile.github }];
  }
  if (
    item.id === "q139" ||
    item.id === "q145" ||
    item.id === "q146" ||
    item.id === "q147" ||
    item.id === "q148" ||
    item.id === "q159"
  ) {
    return contactActions();
  }
  return undefined;
}

function replyFrom(item: Topic): AssistantReply {
  return {
    text: item.answer,
    actions: actionsFor(item),
    followUps: followUpsFor(item),
  };
}

const FALLBACK: AssistantReply = {
  text: UNMATCHED,
  actions: [{ label: "Email", href: `mailto:${profile.email}` }, cvAction()],
  followUps: [...WELCOME_CHIPS],
};

const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const tokenize = (text: string) => normalize(text).split(" ").filter(Boolean);

function topicById(id: string): Topic | undefined {
  return TOPICS.find((item) => item.id === id);
}

function matchExact(query: string): Topic | undefined {
  const q = normalize(query);
  if (!q) return undefined;
  return TOPICS.find((item) => {
    if (normalize(item.question) === q) return true;
    return item.aliases.some((alias) => normalize(alias) === q);
  });
}

export function suggestQuestions(
  query: string,
  limit = 6,
): AssistantSuggestion[] {
  const q = normalize(query);
  if (!q) return [];
  const terms = tokenize(q);
  return TOPICS.map((item) => {
    const title = normalize(item.question);
    const aliases = item.aliases.map(normalize);
    const keywords = item.keywords.map(normalize);
    const all = [title, ...aliases, ...keywords];
    let score = title === q ? 1000 : 0;
    if (aliases.includes(q)) score += 900;
    if (title.startsWith(q)) score += 350;
    if (aliases.some((a) => a.startsWith(q))) score += 300;
    if (all.some((s) => s.includes(q))) score += 180;
    for (const term of terms) {
      if (title.split(" ").includes(term)) score += 45;
      if (keywords.some((k) => k.split(" ").includes(term))) score += 50;
      if (aliases.some((a) => a.split(" ").includes(term))) score += 35;
      if (all.some((s) => s.includes(term))) score += 10;
    }
    const matchedTerms = terms.filter((term) =>
      all.some((s) => s.includes(term)),
    ).length;
    if (terms.length > 1 && matchedTerms < Math.ceil(terms.length / 2))
      score = 0;
    return { item, score };
  })
    .filter((result) => result.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || a.item.question.localeCompare(b.item.question),
    )
    .slice(0, limit)
    .map((result) => ({
      id: result.item.id,
      question: result.item.question,
    }));
}

export function answerAssistant(raw: string, topicId?: string): AssistantReply {
  const selected = topicId ? topicById(topicId) : matchExact(raw);
  if (!selected) return FALLBACK;
  return replyFrom(selected);
}

export { MORE_CHIPS, cvAction };
