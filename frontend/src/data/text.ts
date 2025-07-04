import {
  type About,
  type Link,
  type PortfolioItem,
  type WorkExperience,
} from "@/lib/types";

export const about: About = {
  title: "About me",
  description: [
    "I am an Engineer with a strong eye for design, an insatiable curiosity, and a passion for learning and personal growth.",
    "I have 6 years of development experience, 8 years working with JavaScript and Node, 5 year working with TypeScript, and over 10 years working in various aspects of tech.",
    "I love how the industry is constantly evolving. In the nonstop pace of innovation, I want to build products that have an impact for good, that will advance the industry forward, and that bring people together.",
    "In my personal life, I am a coffee drinking, tech nerd who loves cooking and traveling. In 2024, me and my family lived in Costa Rica trying out the nomad live. In a former live I was a Salsa and Bachata dance instructor.",
  ],
};

export const workHistoryText = {
  title: "Work History",
  description: `These are some of the places I've worked`,
};

export const experienceItems: WorkExperience[] = [
  {
    employer: "Virewirx",
    url: "https://virewirx.com",
    startDate: "7/2023",
    jobTitle: "UI Engineer",
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

export const portfolioText = {
  title: "Portfolio",
  description: `These are some of the projects I've worked on or am currently working on`,
};

export const portfolioItems: PortfolioItem[] = [
  {
    name: "Personal porfolio",
    github: "https://github.com/ronbarrantes/personal-site",
    description: [
      `This is the github to my personal portfolio site, the one you're currently on. My site was built using React.js in the frontend and a Golang for backend. I am using Postgres for my database`,
      `For services, I am using vercel for my frontend, GCP Cloudrun for my backend, and Supabase for my database`,
      `If you're curious about my previous (Nextjs version), please browse through my branches`,
    ],
    tools: [
      "typescript",
      "react",
      "tailwind",
      "golang",
      "postgresql",
      "vercel",
      "gcp",
      "supabase",
      "git",
      "github",
    ],
  },
  {
    name: "Easy Civics",
    github: "https://github.com/ronbarrantes/easy-civics",
    link: {
      href: "https://civics.ronb.co/",
      label: "Easy Civics",
    },
    description: [
      "This is a project I’m creating for my family to help them review the questions commonly found on the U.S. citizenship exam.",
      "It gives the user 10 of the 100 questions in a multiple choice format",
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
    name: "Game of Life",
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

  {
    name: "Matching game",
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
    name: "Shuttly",
    github: "https://github.com/ronbarrantes/shuttly",
    description: [
      `This is a project I'm building on the side, it's a scheduling app for a shuttles.`,
      `It is being built with Next.js, TypeScript, TailwindCSS, ReactNative, using TurboRepo as monorepo It is hosted on Vercel.`,
    ],
    tools: [
      "nextjs",
      "typescript",
      "reactnative",
      "tailwind",
      "turborepo",
      "vercel",
      "github",
      "git",
    ],
  },
];

export const contactText = {
  title: "Contact me",
  description: `Do you want to get a hold of me? Just use the buttons below to go to my socials`,
};

export const mediaLinks: Link[] = [
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
