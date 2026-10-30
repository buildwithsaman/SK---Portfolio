import {
  education,
  profile,
  skillGroups,
  techStack,
  udriveDomains,
} from "../data/cv";

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

export const WELCOME_CHIPS = [
  "What do you build?",
  "Tell me about your experience",
  "What projects have you worked on?",
  "What technologies do you use?",
  "Can I download your CV?",
] as const;

const MORE_CHIPS = [
  "What impact have you made?",
  "How can I contact you?",
] as const;

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

function say(...parts: Array<string | false | undefined>) {
  return parts.filter((part): part is string => Boolean(part)).join("\n\n");
}

function normalize(input: string) {
  return input
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9+#.\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(hay: string, needles: string[]) {
  return needles.some((needle) => hay.includes(needle));
}

function includesPhrase(hay: string, needle: string) {
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|\\s)${escaped}(?:\\s|$)`).test(hay);
}

const FALLBACK: AssistantReply = {
  text: "I can tell you about my experience, projects, skills, or how to get in touch. What would you like to explore?",
  followUps: [...WELCOME_CHIPS],
};

function aboutReply(): AssistantReply {
  return {
    text: say(
      "I'm a Software Engineer based in Dubai.",
      "I build production web platforms, from internal operations systems to customer-facing experiences.",
      "Day to day I work across React, Next.js, TypeScript, and Python, with a focus on frontend architecture, operational systems, and API integration.",
    ),
    followUps: [
      "Tell me about your experience",
      "What projects have you worked on?",
      "What technologies do you use?",
    ],
  };
}

function experienceReply(): AssistantReply {
  return {
    text: say(
      "I have over two years of experience building production applications, primarily focused on frontend engineering.",
      "I'm currently a Software Engineer at Udrive in Dubai, since August 2024. I'm the primary frontend owner for internal operations, I built most of the subscription admin frontend, and I'm developing the customer-facing Next.js website.",
      "Before that I interned at Arata International, where I built a React Native app for buying and selling used vehicles, developed .NET REST APIs, and supported rental operations.",
      "I also interned at Dubai Technologies, building Python desktop GUIs with Tkinter and PyQt.",
    ),
    followUps: [
      "What projects have you worked on?",
      "What impact have you made?",
      "What did you study?",
    ],
  };
}

function projectsReply(): AssistantReply {
  return {
    text: say(
      "Most of my production work is at Udrive, across five domains.",
      "Earlier I built a React Native used-vehicle app and .NET REST APIs at Arata International, and Python desktop GUIs at Dubai Technologies.",
    ),
    bullets: [
      "Operations and analytics platform",
      "Subscription, CRM, and fleet admin",
      "Multilingual Next.js customer website",
      "KYC and identity verification",
      "Analytics and invoice automation",
    ],
    followUps: [
      "Tell me about Operations",
      "Tell me about CRM",
      "Tell me about KYC",
      "What impact have you made?",
    ],
  };
}

const DOMAIN_LEAD: Record<string, string> = {
  "operations-analytics":
    "I'm the primary frontend owner for Udrive's internal operations platform, a large React and MUI system covering customers, verifications, reservations, invoices, vehicles, analytics, and admin tooling.",
  "subscription-crm":
    "I built most of the React frontend for Udrive's monthly subscription admin, covering the sales pipeline, customers and KYC, fleet, subscriptions, invoices, and role-based admin.",
  "website-apps":
    "I'm developing Udrive's customer-facing website from Figma in Next.js, with English and Arabic, RTL layouts, and performance-focused asset delivery. It's currently in development.",
  "kyc-backend":
    "I contributed to a production Python and Kafka pipeline for document verification, eligibility checks, name matching, and automated KYC decisions.",
  "automation-tools":
    "I helped migrate analytics to self-hosted Apache Superset and ship serverless invoice automation, which reduced infrastructure cost and manual operational work.",
};

function domainReply(id: string): AssistantReply | null {
  const item = udriveDomains.find((domain) => domain.id === id);
  const lead = DOMAIN_LEAD[id];
  if (!item || !lead) return null;
  return {
    text: lead,
    bullets: item.contributions,
    followUps: [
      "What other projects have you worked on?",
      "What technologies do you use?",
      "What impact have you made?",
    ],
  };
}

function impactReply(): AssistantReply {
  return {
    text: say(
      "At Udrive, analytics infrastructure costs fell by about 70% after migrating to self-hosted Apache Superset, and debt recovery improved by 30% through invoice automation.",
      "I also helped build or evolve six analytics areas: Trip Revenue, Cleaning, RTA Parking, Customer Stats, Metrics, and TARS.",
    ),
    followUps: [
      "Tell me about Automation",
      "What projects have you worked on?",
      "How can I contact you?",
    ],
  };
}

function coreStack() {
  return skillGroups
    .flatMap((group) => group.items)
    .filter((item, index, all) => all.indexOf(item) === index);
}

function skillsReply(focus?: string): AssistantReply {
  if (focus) {
    const known = techStack.find(
      (item) => item.title.toLowerCase() === focus || item.id === focus,
    );
    const inGroups = skillGroups.some((group) =>
      group.items.some((item) => item.toLowerCase() === focus),
    );
    if (known || inGroups) {
      const label = known?.title ?? focus;
      const where =
        focus === "python"
          ? "I use it in production on a FastStream Kafka KYC pipeline, and earlier for desktop GUIs at Dubai Technologies."
          : focus === "aws"
            ? "I have used it for EC2, Nginx, HTTPS, S3, and CloudFront delivery on production Udrive work."
            : focus === "react"
              ? "It's the core of the operations and subscription admin platforms I own or built at Udrive."
              : focus === "nextjs"
                ? "I'm using it now for the customer-facing Udrive website, including App Router, TypeScript, and English/Arabic routing."
                : focus === "typescript"
                  ? "It's the language I write most of my production frontend in, across React and Next.js."
                  : `It's part of the stack I use in production.`;
      return {
        text: say(`Yes, I work with ${label}.`, where),
        followUps: [
          "What projects have you worked on?",
          "What technologies do you use?",
          "Can I download your CV?",
        ],
      };
    }
  }
  return {
    text: "My core stack is React, Next.js, TypeScript, and Python. I also work across cloud, data, and integration tooling in production.",
    bullets: coreStack(),
    followUps: [
      "Do you know Python?",
      "Have you worked with AWS?",
      "What projects have you worked on?",
    ],
  };
}

function educationReply(): AssistantReply {
  const school = education[0];
  const prior = education[1];
  return {
    text: say(
      `I completed a ${school.degree} at ${school.place}, graduating in 2024.`,
      `Before that I did ${prior.degree} at ${prior.place}.`,
    ),
    followUps: [
      "Tell me about your experience",
      "What technologies do you use?",
      "How can I contact you?",
    ],
  };
}

function contactReply(): AssistantReply {
  return {
    text: say(
      `I'm based in ${profile.locationFull}.`,
      `The fastest way to reach me is email, or you can call. I'm also on GitHub and LinkedIn.`,
    ),
    actions: contactActions(),
    followUps: [
      "Can I download your CV?",
      "What do you build?",
      "Tell me about your experience",
    ],
  };
}

function locationReply(): AssistantReply {
  return {
    text: `I'm based in ${profile.locationFull}.`,
    followUps: ["How can I contact you?", "Tell me about your experience"],
  };
}

function cvReply(): AssistantReply {
  return {
    text: "Here's my CV. It's the same PDF as the desktop site.",
    actions: [cvAction()],
    followUps: [
      "How can I contact you?",
      "Tell me about your experience",
      "What projects have you worked on?",
    ],
  };
}

const TECH_ALIASES: { id: string; keys: string[] }[] = [
  { id: "python", keys: ["python", "pyqt", "tkinter"] },
  { id: "react", keys: ["react", "react native", "expo"] },
  { id: "nextjs", keys: ["next.js", "nextjs", "next"] },
  { id: "typescript", keys: ["typescript", "ts"] },
  { id: "javascript", keys: ["javascript", "js"] },
  {
    id: "aws",
    keys: ["aws", "amazon web services", "ec2", "s3", "cloudfront"],
  },
  { id: "kafka", keys: ["kafka"] },
  { id: "nodejs", keys: ["node", "node.js"] },
  { id: "d3", keys: ["d3"] },
  { id: "mui", keys: ["mui", "material ui"] },
  { id: "mapbox", keys: ["mapbox", "maplibre"] },
  { id: "vite", keys: ["vite"] },
  { id: "nginx", keys: ["nginx"] },
];

export function answerAssistant(raw: string): AssistantReply {
  const q = normalize(raw);
  if (!q) return FALLBACK;

  if (
    includesAny(q, [
      "cv",
      "resume",
      "curriculum",
      "download your",
      "get your cv",
      "see your resume",
    ])
  ) {
    return cvReply();
  }

  if (
    includesAny(q, [
      "email",
      "phone",
      "call",
      "contact",
      "reach",
      "linkedin",
      "github",
      "hire",
    ])
  ) {
    return contactReply();
  }

  if (
    includesAny(q, ["where", "based", "location", "dubai", "live", "from"]) &&
    !includesAny(q, ["project", "work on", "build"])
  ) {
    return locationReply();
  }

  if (
    includesAny(q, [
      "educat",
      "degree",
      "stud",
      "manipal",
      "college",
      "universit",
      "school",
    ])
  ) {
    return educationReply();
  }

  if (
    includesAny(q, [
      "70",
      "30",
      "impact",
      "achiev",
      "cost",
      "debt recover",
      "superset",
    ])
  ) {
    return impactReply();
  }

  if (includesAny(q, ["kyc", "verif", "emirates", "passport", "liveness"])) {
    return domainReply("kyc-backend") ?? FALLBACK;
  }

  if (
    includesAny(q, ["crm", "kanban", "subscription admin", "sales pipeline"])
  ) {
    return domainReply("subscription-crm") ?? FALLBACK;
  }

  if (
    includesAny(q, [
      "website",
      "next.js website",
      "multilingual",
      "arabic",
      "rtl",
      "figma",
    ])
  ) {
    return domainReply("website-apps") ?? FALLBACK;
  }

  if (
    includesAny(q, [
      "operation",
      "banner studio",
      "mapbox",
      "driver tracking",
      "analytics platform",
    ])
  ) {
    return domainReply("operations-analytics") ?? FALLBACK;
  }

  if (
    includesAny(q, ["automat", "invoice", "superset", "infrastructure cost"])
  ) {
    return domainReply("automation-tools") ?? FALLBACK;
  }

  const techHit = TECH_ALIASES.find((item) =>
    item.keys.some((key) => includesPhrase(q, key)),
  );
  if (
    techHit &&
    includesAny(q, [
      "know",
      "use",
      "work with",
      "worked with",
      "skill",
      "stack",
      "experience with",
      "familiar",
    ])
  ) {
    return skillsReply(techHit.id);
  }

  if (
    includesAny(q, [
      "technolog",
      "tech stack",
      "skills",
      "stack",
      "tools",
      "languages",
    ])
  ) {
    return skillsReply();
  }

  if (techHit) {
    return skillsReply(techHit.id);
  }

  if (
    includesAny(q, [
      "project",
      "work on",
      "worked on",
      "built",
      "applications",
      "domains",
      "portfolio of",
    ])
  ) {
    return projectsReply();
  }

  if (
    includesAny(q, [
      "experience",
      "career",
      "background",
      "intern",
      "years",
      "role",
      "job",
    ])
  ) {
    return experienceReply();
  }

  if (
    includesAny(q, [
      "what do you do",
      "what you do",
      "who are you",
      "about you",
      "about yourself",
      "what do you build",
      "what you build",
      "working on",
      "software engineer",
      "introduce",
      "hello",
      "hey",
    ])
  ) {
    return aboutReply();
  }

  return FALLBACK;
}

export { MORE_CHIPS, cvAction };
