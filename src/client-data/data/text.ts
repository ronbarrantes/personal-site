import { IAbout, ISkills, IWorkExperience } from '@/types/text'
// import { fakeImage, fakeImages } from '@/ utils/fakeImageCreator'

export const about: IAbout = {
  title: 'About Me',
  description: [
    'Creative at heart, I am an Engineer with a strong eye for design, an insatiable curiosity, and a passion for learning and personal growth.',
    'I have 4 years of development experience, 6 years working with JavaScript and Node, 2 year working with TypeScript, and over 10 years working in various aspects of tech.',
    'I love how the industry is constantly evolving. In the nonstop pace of innovation, I want to build products that have an impact for good, that will advance the industry forward, and that bring people together.',
  ],
}

export const skills: ISkills = {
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

export const experienceItems: IWorkExperience[] = [
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
    jobTitle: 'Web and Graphics Designer/Social Media/Print/Video',
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

// export const portfolio: IPortfolio = {
//   uri: '/',
//   items: [
//     {
//       id: '1',
//       name: 'Project A',
//       description:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita eum temporibus, ducimus, placeat recusandae excepturi accusantium',
//       image: fakeImage({ text: 'Project A', width: 300 }),
//       github: 'https://github.com',
//       link: {
//         // LIVE PROJECT
//         name: 'Personal Site',
//         url: 'https://ronb.co',
//       },
//       images: fakeImages({ amount: randNumber(5) + 1, text: 'Project A' }),
//       tags: ['Web site', 'React', 'hooks'],
//     },
//     {
//       id: '2',
//       name: 'Project B',
//       description: 'some description 2',
//       image: fakeImage({ text: 'Project B', width: 300 }),
//       github: 'https://github.com', // NAME IT GITHUB PROJECT
//       link: undefined, // NAME IT LINK
//       images: fakeImages({ amount: randNumber(5) + 1, text: 'Project B' }),
//     },
//     {
//       id: '3',
//       name: 'Project3 C',
//       description:
//         'perspiciatis exercitationem dicta repudiandae odio in laboriosam totam. Fuga nisi dolore veniam quia illo.',
//       image: fakeImage({ text: 'Project C', width: 300 }),
//       // github: 'https://github.com',
//       link: undefined,
//       images: fakeImages({ amount: randNumber(5) + 1, text: 'Project C' }),
//       tags: ['Leggings', 'Illustrator', 'Consulting', 'Design'],
//     },
//     {
//       id: '4',
//       name: 'Project D',
//       description:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita eum temporibus, ducimus, placeat recusandae excepturi accusantium',
//       image: fakeImage({ text: 'Project D', width: 300 }),
//       github: 'https://github.com',
//       link: {
//         // LIVE PROJECT
//         name: 'ronb.co',
//         url: 'http://ronb.co',
//       },
//       images: fakeImages({ amount: randNumber(5) + 1, text: 'Project D' }),
//       tags: ['Web site', 'React', 'hooks'],
//     },
//     {
//       id: '5',
//       name: 'Project E',
//       description: 'some description 2',
//       image: fakeImage({ text: 'Project E', width: 300 }),
//       github: 'https://github.com', // NAME IT GITHUB PROJECT
//       link: undefined, // NAME IT LINK
//       images: fakeImages({ amount: randNumber(5) + 1, text: 'Project E' }),
//     },
//     {
//       id: '6',
//       name: 'Project3 F',
//       description:
//         'perspiciatis exercitationem dicta repudiandae odio in laboriosam totam. Fuga nisi dolore veniam quia illo.',
//       image: fakeImage({ text: 'Project F', width: 300 }),
//       // github: 'https://github.com',
//       link: undefined,
//       images: fakeImages({ amount: 1, text: 'Project F' }),
//       tags: ['Leggings', 'Illustrator', 'Consulting', 'Design'],
//     },
//     {
//       id: '7',
//       name: 'Project G',
//       description:
//         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita eum temporibus, ducimus, placeat recusandae excepturi accusantium',
//       image: fakeImage({ text: 'Project G', width: 300 }),
//       github: 'https://github.com',
//       link: {
//         // LIVE PROJECT
//         name: 'ronb.co',
//         url: 'http://ronb.co',
//       },
//       images: fakeImages({ amount: 2, text: 'Project G' }),
//       tags: ['Web site', 'React', 'hooks'],
//     },
//   ],
// }
