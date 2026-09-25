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
    "I'm an engineer who cares a lot about UX and accessibility. I've spent seven years shipping React and TypeScript at Microsoft and at early-stage startups. Right now I'm building PaperKoi, and I'm open to a full-time role, contract work, or starting something with the right people.",
  photoCaption: "Ron Barrantes · UI engineer",
};

export const sections: Record<
  "now" | "services" | "work" | "projects" | "writing" | "contact",
  SectionCopy
> = {
  now: { title: "Now", sub: "What I'm working on this month." },
  services: {
    title: "What I bring",
    sub: "For teams that need another engineer, and for anyone with an idea they want built.",
  },
  work: {
    title: "Experience",
    sub: "Where I've worked, from freelance web and design work to Microsoft.",
  },
  projects: {
    title: "Projects",
    sub: "Things I've built for work, for family, and for fun.",
  },
  writing: {
    title: "Blog",
    sub: "Notes from what I'm learning. I write them for myself and share them in case they help you too.",
  },
  contact: {
    title: "Let's work together",
    sub: "Hiring, or have a project in mind? I'd like to hear about it.",
  },
};

export const services: Service[] = [
  {
    title: "Frontend engineering",
    body: "I join your team, full-time or on contract, and ship React, Next.js and TypeScript interfaces that load fast, have tests, and are easy for the next person to work on.",
  },
  {
    title: "Accessible by default",
    body: "I build for keyboard and screen reader users from the start, not as a cleanup pass at the end. At Microsoft, the Azure components I built had to meet accessibility standards and work in every language Azure supports.",
  },
  {
    title: "From idea to launch",
    body: "Have an idea? I'll turn it into a working product with sign-in, a database, payments and deploys, and a design that doesn't look like a template.",
  },
  {
    title: "Design and code, one person",
    body: "I've done both since 2009: WordPress sites, HTML, CSS and JavaScript alongside design work in Photoshop, Illustrator and InDesign. I can take a design from mockup to pull request without losing the details.",
  },
];

export const about: About = {
  title: "About me",
  description: [
    "I'm an engineer who cares a lot about UX and accessibility, with an insatiable curiosity and a passion for learning. Lately I love building tools that improve how people work.",
    "I have 7 years of development experience, 8 years working with JavaScript and Node, 5 years working with TypeScript, and over 10 years working in various aspects of tech.",
    "I love how the industry is constantly evolving. In the nonstop pace of innovation, I want to build products that have an impact for good, that will advance the industry forward, and that bring people together.",
    "In my personal life, I am a coffee drinking, tech nerd who loves cooking and traveling. In 2024, me and my family lived in Costa Rica trying out the nomad life. In a former life I was a Salsa and Bachata dance instructor.",
  ],
};

export const experienceItems: WorkExperience[] = [
  {
    employer: "Virewirx",
    url: "https://virewirx.com",
    startDate: "9/2023",
    endDate: "10/2024",
    jobTitle: "UI Engineer - (Contractor)",
    summary:
      "Built the dashboard that runs multi-user VR sessions. It coordinates headsets, servers and apps, and shows live status for every device.",
    description: [
      "Designed and built a React.js/TypeScript dashboard for Virewirx’s internal VR operations tool, giving operators one place to manage headsets, computer servers, VR applications, and real-time device status.",
      "Developed a Python-based configuration server that generated device-specific settings for VR headsets and servers, reducing the need for manual configuration changes.",
      "Built a Node.js/TypeScript logging server that captured info and error logs from the dashboard locally, giving the team better visibility into issues during testing and live VR sessions.",
      "Identified and resolved bugs across the internal toolchain, improving reliability for multi-user VR experiences.",
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
    endDate: "6/2023",
    jobTitle: "Staff Software Engineer",
    summary:
      "Helped create and launch a learning, tutoring and recruiting platform that takes students from beginner to hired.",
    description: [
      "Contributed to the creation, launch, and maintenance of the VeroSkills platform, supporting learning, recruiting, and hiring workflows from early development through active customer usage.",
      "Developed API routes and cron jobs in a Next.js, React.js, and TypeScript/JavaScript codebase to support backend and scheduled workflows.",
      "Improved recruiter and student workflows, including internal job search, pipeline organization, text editor capabilities, and learning platform features.",
      "Coached and mentored coworkers on platform features and coding practices, helping improve code quality and shared product understanding across the team.",
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
    jobTitle: "Software Development Engineer - (Contractor)",
    summary:
      "Moved Azure's search service from KnockoutJS to React and FluentUI, with components that met accessibility standards and were translated into every supported language.",
    description: [
      "Migrated multiple Azure Search-as-a-Service blades from Knockout.js to React.js, using Fluent UI to modernize portal experiences with consistent styling and component patterns.",
      "Developed reusable components, classes, and utilities for SaaS blades, improving maintainability across React.js and JavaScript portal work.",
      "Wrote unit tests and validated localization and accessibility compliance for TypeScript and JavaScript features.",
      "Contributed implementation feedback during feature planning, helping align Azure portal updates with usability, accessibility, and localization requirements.",
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
    jobTitle: "Software Development Engineer - (Contractor)",
    summary:
      "Helped with Azure's first move from KnockoutJS to React, and tested Compute, Service Fabric and Containers during the switch.",
    description: [
      "Contributed to Azure’s initial migration from Knockout.js to React.js, helping modernize internal portal tools and user interfaces.",
      "Created and migrated multiple end-to-end and integration tests for Compute, Service Fabric, and Containers using TypeScript/JavaScript, improving coverage for key Azure portal workflows.",
      "Helped maintain and expand PortalFX, Azure’s internal library of testing blades, controllers, and components used by portal teams.",
      "Collaborated with teammates on test planning, best practices, and continuous improvements to strengthen test reliability and regression coverage.",
      "Mentored coworkers on best practices and performance optimizations across the stack, supporting stronger development habits and team efficiency.",
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
    employer: "ProtaLabs",
    url: "https://protaventures.com",
    startDate: "9/2018",
    endDate: "4/2019",
    jobTitle: "Software Developer Intern",
    summary:
      "Contributed to Quoted, a social app for families, built in React Native and Rails.",
    description: [
      "Contributed to “Quoted,” a family-focused social media application, building features across React.js, React Native, Redux, JavaScript, Ruby on Rails, and PostgreSQL.",
      "Added unit tests for application features to protect core behavior and reduce regressions during active development.",
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
      "A full-stack SaaS for bookkeeping and accounting teams: structured document requests, checklist templates, missing-item tracking, and a client portal with magic-link uploads.",
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
    name: "QA Workflow Extensions",
    category: "Internal tools",
    status: "In use",
    summary:
      "Chrome and Edge extensions used by about 100 QA associates across four shifts. One shows grouped location tables with priority work, duplicates removed, fixes needed, and upcoming cut times at a glance. The other generates standardized reports from editable templates.",
    github: "https://github.com/ronbarrantes/qa-locations",
    description: [
      "A location visibility extension that renders grouped location tables, highlights priority work, removes duplicate entries, and shows areas needing fixes and upcoming cut times.",
      "A reporting extension that generates standardized statements from configurable Markdown templates, with reusable categories, local storage, and copy-to-clipboard.",
    ],
    tools: ["javascript", "html", "css", "jest", "github", "git"],
  },
  {
    name: "Easy Civics",
    category: "For family",
    status: "Live",
    summary:
      "Practice for the U.S. citizenship test, built for my family: 10 of the 100 official questions at a time, multiple choice, with a review of what you missed.",
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
    name: "Pattern Game",
    category: "Hardware",
    status: "In progress",
    summary:
      "A Simon-says style memory game I'm building on an ATtiny85 microcontroller in C. It's how I'm learning electronics and embedded C, one part at a time: buttons, LEDs, sound, and timers.",
    github: "https://github.com/ronbarrantes/pattern-game",
    description: [
      "A battery-powered pattern game built on an ATtiny85, written in C and flashed through an Arduino.",
      "I'm building it to learn embedded C and electronics well enough to explain and debug each part myself.",
    ],
    tools: ["c", "arduino", "github", "git"],
  },

  // {
  //   name: "Matching game",
  //   category: "For my kid",
  //   status: "Live",
  //   summary:
  //     "A simple matching game I made for my 4-year-old son. He really enjoys playing it.",
  //   github: "https://github.com/ronbarrantes/guessing-game",
  //   link: {
  //     href: "https://match.ronb.co/",
  //     label: "Matching game",
  //   },
  //   description: [
  //     "This is a simple matching game that I made for my 4 year old son. He really enjoys playing it",
  //     "It is built with Vite's React, TypeScript, and TailwindCSS. It is hosted on Vercel.",
  //   ],
  //   tools: [
  //     "react",
  //     "typescript",
  //     "tailwind",
  //     "vite",
  //     "vercel",
  //     "github",
  //     "git",
  //   ],
  // },
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
