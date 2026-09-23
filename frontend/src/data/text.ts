import {
  type About,
  type PortfolioItem,
  type SectionCopy,
  type Service,
  type SocialLink,
  type WorkExperience,
} from "@/lib/types";

export const contactEmail = "ronbarrantes@gmail.com";

export const hero = {
  status: "Open to roles, contracts & collaborations",
  headlineLead: "I build",
  headlineAccent: "calm, accessible",
  headlineTail: "web products people enjoy using.",
  pitch:
    "Engineer with a designer's eye. Seven years shipping React and TypeScript at places like Microsoft and early-stage startups. Now building PaperKoi and open to jobs, contracts, and people who want to make something together.",
  photoCaption: "Ron Barrantes · UI engineer",
};

export const sections: Record<
  "now" | "services" | "work" | "projects" | "writing" | "contact",
  SectionCopy
> = {
  now: { title: "Now", sub: "What I'm working on this month." },
  services: {
    title: "What I bring",
    sub: "Whether you need another engineer on the team or someone to build your idea with.",
  },
  work: {
    title: "Experience",
    sub: "Where I've worked, from design studios to Microsoft.",
  },
  projects: {
    title: "Projects",
    sub: "Things I've built for work, for family, and for fun.",
  },
  writing: {
    title: "Blog",
    sub: "Notes from what I'm learning, written for me, shared for you.",
  },
  contact: {
    title: "Let's work together",
    sub: "Hiring, or have a project in mind? I'd like to hear about it.",
  },
};

export const services: Service[] = [
  {
    title: "Frontend engineering",
    body: "I join your team, full-time or on contract, and ship React, Next.js and TypeScript interfaces that are fast, tested, and easy for the next person to pick up.",
  },
  {
    title: "Accessible by default",
    body: "Keyboard, screen reader and contrast issues caught early and fixed properly. I did this work on Azure, across every language Microsoft supports.",
  },
  {
    title: "From idea to launch",
    body: "Got an idea? I'll take it to a working product with auth, data, payments and deploys, designed so it doesn't look like a template.",
  },
  {
    title: "Design and code, one person",
    body: "I was a designer for ten years before I wrote code. I go from Figma to pull request without losing anything in between.",
  },
];

export const about: About = {
  title: "About me",
  description: [
    "I am an Engineer with a strong eye for design, an insatiable curiosity, and a passion for learning and personal growth.",
    "I have 6 years of development experience, 8 years working with JavaScript and Node, 5 year working with TypeScript, and over 10 years working in various aspects of tech.",
    "I love how the industry is constantly evolving. In the nonstop pace of innovation, I want to build products that have an impact for good, that will advance the industry forward, and that bring people together.",
    "In my personal life, I am a coffee drinking, tech nerd who loves cooking and traveling. In 2024, me and my family lived in Costa Rica trying out the nomad live. In a former live I was a Salsa and Bachata dance instructor.",
  ],
};

export const experienceItems: WorkExperience[] = [
  {
    employer: "Virewirx",
    url: "https://virewirx.com",
    startDate: "7/2023",
    endDate: "10/2024",
    jobTitle: "UI Engineer",
    summary:
      "Built the dashboard that coordinates VR headsets, servers and apps for multi-user VR, with real-time status for every device.",
    description: [
      `Designed and created a Dashboard that manages Virewirx’s internal tool. This tool is in charge of coordinating VR headsets, computer servers, and VR applications in order to provide a high quality VR experience for multiple users, while at the same time giving real time status on each individual device`,
      `Created a configuration server that will create specific configurations depending on what kind of VR headset or computer server may be using`,
      `Create a logging server that takes info and error logs from the Virewirx’s managing dashboard and writes them to local memory`,
      `Helped find, identify, and fix bugs with the current internal tooling`,
    ],
    tools: [
      "react",
      "typescript",
      "tailwind",
      "python",
      "jira",
      "golang",
      "git",
    ],
  },
  {
    employer: "VeroSkills",
    url: "https://veroskills.com",
    startDate: "6/2022",
    endDate: "3/2023",
    jobTitle: "Staff Software Engineer",
    summary:
      "Helped create and launch a learning, tutoring and recruiting platform that takes students from beginner to hired.",
    description: [
      "Worked in the creation and initial launch of the VeroSkills platform, a new learning, tutoring, and recruiting tool where a student can be taken from a beginner to getting hired.",
      "Implementing frontend, backend, and full stack features utilizing Next.js.",
      "Contributing to the brainstorming and workshopping of new features, improvements, and ideas. Helping with the maintenance of the platform.",
    ],
    tools: [
      "nextjs",
      "react",
      "typescript",
      "planetscale",
      "trpc",
      "mysql",
      "retool",
      "vercel",
      "stripe",
      "turborepo",
      "github",
      "git",
    ],
  },

  {
    employer: "Microsoft",
    url: "https://azure.microsoft.com",
    startDate: "3/2022",
    endDate: "6/2022",
    jobTitle: "Software Developer Engineer - (Contractor)",
    summary:
      "Migrated Azure's Search-as-a-Service from KnockoutJS to React with FluentUI, localized and accessible.",
    description: [
      `Working on the migration of Azure's Search as a Service from KnockoutJS to modern ReactJS, utilizing FluentUI as the UX framework.`,
      `Creating reusable components, classes, and utilities that will later be used throughout the SaaS blades.`,
      `Writing unit testing for each blade and it's components.`,
      "Ensuring that each component localized for all languages supported by Microsoft, as well as accessible compliant.",
    ],
    tools: [
      "react",
      // "fluentui",
      // "knockout"
      "typescript",
      "azure",
      "jest",
      "github",
      "git",
    ],
  },

  {
    employer: "Microsoft",
    url: "https://azure.microsoft.com",
    startDate: "4/2020",
    endDate: "1/2021",
    jobTitle: "Software Developer Engineer - (Contractor)",
    summary:
      "Worked on Azure's first migration from KnockoutJS to React and on testing for Compute, Service Fabric and Containers.",
    description: [
      `Worked in Azure's initial migration from KnockoutJS framework to the more modern React Framework.`,
      "Worked on the testing of multiple services the Azure Compute, Service Fabric, and Containers during Azure IaaS migration from their own internal tooling to MochaJS and PortalFx as Azure transitions from KnockoutJS to ReactJS.",
      "Contributed to Azure PortalFx, a library used for testing blades, controllers, and components at Azure",
    ],
    tools: [
      "react",
      "mochajs",
      "typescript",
      "selenium",
      "azure",

      "github",
      "git",
    ],
  },

  {
    employer: "Protalabs",
    url: "https://protaventures.com",
    startDate: "9/2018",
    endDate: "4/2019",
    jobTitle: "Software Developer Internship",
    summary:
      "Contributed to Quoted, a social app for families, built in React Native and Rails.",
    description: [
      "Contributed to the development of Quoted, a social media application for families.",
      "The app was an MVP by the Chicago based consultant firm and it utilized React Native and Redux as a frontend technology and Ruby on Rails for its backend",
    ],
    tools: [
      "reactnative",
      "redux",
      "javascript",
      "jest",
      "rails",
      "postgresql",
      "redis",
      "github",
      "git",
    ],
  },

  {
    employer: "Freelancer",
    startDate: "1/2009",
    endDate: "6/2017",
    jobTitle: "Web and Graphics Designer",
    summary:
      "Eight years of websites, WordPress themes, posters, business cards and merch for small businesses.",
    description: [
      "Work in a myriad of areas regarding visual design. On the web, I worked creating HTML/CSS and JavaScript websites. Setting up, theming, and managing Wordpress sites.",
      "In print, I worked creating anything from business cards to event posters, as well as merchandise such as T-Shirts and Leggings",
    ],
    tools: [
      "html",
      "css",
      "javascript",
      "illustrator",
      "photoshop",
      "indesign",
      "premierepro",
      "wordpress",
      "github",
      "git",
    ],
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    name: "PaperKoi",
    category: "SaaS",
    status: "In progress",
    summary:
      "A cleaner way for bookkeepers, tax pros and admin-heavy firms to request, collect and organize client documents, with no more chasing files across email.",
    link: {
      href: "https://paperkoi.com",
      label: "PaperKoi",
    },
    description: [
      "This is a project I'm currently working on for firms that need a cleaner way to request, collect, and keep client documents organized.",
      "It is meant for teams like bookkeepers, tax professionals, and other admin-heavy firms that are tired of chasing files across emails, follow-ups, and random links.",
      "The goal is to give clients a simple place to upload what is needed, while giving the firm a better way to keep requests clear, track what is missing, and find documents later.",
    ],
    tools: [
      "nextjs",
      "react",
      "typescript",
      "tailwind",
      "convex",
      "clerk",
      "shadcn",
      "vercel",
      "git",
    ],
  },
  {
    name: "Easy Civics",
    category: "For family",
    status: "Live",
    summary:
      "Practice for the U.S. citizenship exam: 10 of the 100 official questions, multiple choice, with review screens so it never feels like a giant study packet.",
    github: "https://github.com/ronbarrantes/easy-civics",
    link: {
      href: "https://civics.ronb.co/",
      label: "Easy Civics",
    },
    description: [
      "This is a project I’m creating for my family to help them review the questions commonly found on the U.S. citizenship exam.",
      "It gives the user 10 of the 100 official questions in a multiple choice format, then shows results and review screens so they can see what they missed and keep practicing without the whole thing feeling like a giant study packet.",
    ],
    tools: [
      "nextjs",
      "typescript",
      "tailwind",
      "vercel",
      "postgresql",
      "github",
      "git",
    ],
  },
  {
    name: "Matching game",
    category: "For my kid",
    status: "Live",
    summary:
      "A simple matching game I made for my 4-year-old son. He really enjoys playing it.",
    github: "https://github.com/ronbarrantes/guessing-game",
    link: {
      href: "https://match.ronb.co/",
      label: "Matching game",
    },
    description: [
      "This is a simple matching game that I made for my 4 year old son. He really enjoys playing it",
      "It is built with Vite's React, TypeScript, and TailwindCSS. It is hosted on Vercel.",
    ],
    tools: [
      "react",
      "typescript",
      "tailwind",
      "vite",
      "vercel",
      "github",
      "git",
    ],
  },
  {
    name: "Game of Life",
    category: "Experiment",
    status: "Live",
    summary:
      "An interpretation of Conway's classic Game of Life, built with good old React, TypeScript and Tailwind.",
    github: "https://github.com/ronbarrantes/guessing-game",
    link: {
      href: "https://game-of-life.ronb.co/",
      label: "Game of Life",
    },
    description: [
      "An interpretation of the classic game of life, built with good old React, TypeScript, and TailwindCSS. It is hosted on Vercel.",
    ],
    tools: ["react", "typescript", "tailwind", "vercel", "github", "git"],
  },
];

export const mediaLinks: SocialLink[] = [
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/ronbarrantes",
  },
  {
    label: "github",
    href: "https://github.com/ronbarrantes",
  },
  {
    label: "facebook",
    href: "https://www.facebook.com/ronbarrantes",
  },
];
