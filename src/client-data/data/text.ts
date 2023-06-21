import { About, PortfolioItem, Skills, WorkExperience } from '@/types/text'

export const about: About = {
  title: 'About Me',
  description: [
    'Creative at heart, I am an Engineer with a strong eye for design, an insatiable curiosity, and a passion for learning and personal growth.',
    'I have 4 years of development experience, 6 years working with JavaScript and Node, 2 year working with TypeScript, and over 10 years working in various aspects of tech.',
    'I love how the industry is constantly evolving. In the nonstop pace of innovation, I want to build products that have an impact for good, that will advance the industry forward, and that bring people together.',
  ],
}

// TODO: Remove this if not in use
export const skills: Skills = {
  uri: '/',
  items: [
    { name: 'React', percent: 0.9, image: 'react.svg' },
    { name: 'Redux', percent: 0.9, image: 'redux.svg' },
    { name: 'AWS', percent: 0.9, image: 'aws.svg' },
    { name: 'Azure', percent: 0.9, image: 'azure.svg' },
    { name: 'CSS3', percent: 0.9, image: 'css3.svg' },
    { name: 'HTML5', percent: 0.9, image: 'html5.svg' },
    { name: 'JavaScript', percent: 0.9, image: 'javascript.svg' },
    { name: 'Node', percent: 0.9, image: 'nodejs.svg' },
    { name: 'TypeScript', percent: 0.9, image: 'typescript.svg' },
    { name: 'Python', percent: 0.3, image: 'python.svg' },
  ],
}

export const workHistoryText = {
  title: 'Work History',
  description: `These are some of the places I've worked`,
}

export const experienceItems: WorkExperience[] = [
  {
    employer: 'VeroSkills',
    url: 'https://veroskills.com',
    startDate: '6/2022',
    jobTitle: 'Staff Software Engineer',
    description: [
      'Worked in the creation and initial launch of the VeroSkills platform, a new learning, tutoring, and recruiting tool where a student can be taken from a beginner to getting hired.',
      'Implementing frontend, backend, and full stack features utilizing Next.js.',
      'Contributing to the brainstorming and workshopping of new features, improvements, and ideas. Helping with the maintenance of the platform.',
    ],
    tools: [
      'nextjs',
      'react',
      'typescript',
      'planetscale',
      'trpc',
      'mysql',
      'retool',
      'vercel',
      'stripe',
      'turborepo',
    ],
  },

  {
    employer: 'Microsoft',
    url: 'https://azure.microsoft.com',
    startDate: '3/2022',
    endDate: '6/2022',
    jobTitle: 'Software Developer Engineer - (Contractor)',
    description: [
      `Working on the migration of Azure's Search as a Service from KnockoutJS to modern ReactJS, utilizing FluentUI as the UX framework.`,
      `Creating reusable components, classes, and utilities that will later be used throughout the SaaS blades.`,
      `Writing unit testing for each blade and it's components.`,
      'Ensuring that each component localized for all languages supported by Microsoft, as well as accessible compliant.',
    ],
    tools: ['react', 'fluentui', 'typescript', 'azure', 'jest', 'knockout'],
  },

  {
    employer: 'Microsoft',
    url: 'https://azure.microsoft.com',
    startDate: '4/2020',
    endDate: '1/2021',
    jobTitle: 'Software Developer Engineer - (Contractor)',
    description: [
      `Worked in Azure's initial migration from KnockoutJS framework to the more modern React Framework.`,
      'Worked on the testing of multiple services the Azure Compute, Service Fabric, and Containers during Azure IaaS migration from their own internal tooling to MochaJS and PortalFx as Azure transitions from KnockoutJS to ReactJS.',
      'Contributed to Azure PortalFx, a library used for testing blades, controllers, and components at Azure',
    ],
    tools: ['react', 'mochajs', 'typescript', 'selenium', 'azure'],
  },

  {
    employer: 'Protalabs',
    url: 'https://protaventures.com',
    startDate: '9/2018',
    endDate: '4/2019',
    jobTitle: 'Software Developer Internship',
    description: [
      'Contributed to the development of Quoted, a social media application for families.',
      'The app was an MVP by the Chicago based consultant firm and it utilized React Native and Redux as a frontend technology and Ruby on Rails for its backend',
    ],
    tools: [
      'reactnative',
      'redux',
      'javascript',
      'jest',
      'rails',
      'postgresql',
      'redis',
    ],
  },

  {
    employer: 'Freelancer',
    startDate: '1/2009',
    endDate: '6/2017',
    // jobTitle: 'Web and Graphics Designer/Social Media/Print/Video',
    jobTitle: 'Web and Graphics Designer',
    description: [
      'Work in a myriad of areas regarding visual design. On the web, I worked creating HTML/CSS and JavaScript websites. Setting up, theming, and managing Wordpress sites.',
      'In print, I worked creating anything from business cards to event posters, as well as merchandise such as T-Shirts and Leggings',
    ],
    tools: [
      'html',
      'css',
      'javascript',
      'illustrator',
      // 'photoshop', //TODO: ADD PHOTOSHOP
      'indesign',
      'premierepro',
      'wordpress',
    ],
  },
]

export const portfolioText = {
  title: 'Portfolio',
  description: `These are some of the projects I've worked on or am currently working on`,
}

export const portfolioItems: PortfolioItem[] = [
  {
    name: 'Matching game',
    github: 'https://github.com/ronbarrantes/guessing-game',
    link: {
      href: 'https://match.ronb.co/',
      label: 'Matching game',
    },
    description: [
      'This is a simple matching game that I made for my 4 year old son. He really enjoys playing it',
      "It is built with Vite's React, TypeScript, and TailwindCSS. It is hosted on Vercel.",
    ],
    tools: [
      'react',
      'typescript',
      'tailwind',
      // 'vite', // TODO: ADD VITE
      'vercel',
    ],
  },

  {
    name: 'Shuttly',
    github: 'https://github.com/ronbarrantes/shuttly',
    // link: {
    //   href: 'https://shuttly.app',
    //   label: 'Shuttly.app',
    // },
    description: [
      `This is a project I'm building on the side, it's a scheduling app for a shuttles.`,
      `It is being built with Next.js, TypeScript, TailwindCSS, ReactNative, using TurboRepo as monorepo It is hosted on Vercel.`,
    ],
    tools: [
      'nextjs',
      'typescript',
      'reactnative',
      'tailwind',
      'turborepo',
      'vercel',
    ],
  },
  {
    name: 'Personal porfolio',
    github: 'https://github.com/ronbarrantes/personal-site',
    description: [
      `This is the github to my personal portfolio site, the one you're currently on. It is built with React.js, Next.js, TypeScript, and TailwindCSS. It is hosted on Vercel.`,
    ],
    tools: ['nextjs', 'typescript', 'react', 'tailwind', 'vercel'],
  },
]
