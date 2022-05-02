import { randNumber } from '../utils/basic'
import { fakeImage, fakeImages } from '../utils/fakeImageCreator'

interface IBaseComponent {
  uri?: string;
}

interface IAbout {
description: string[]
}
export interface IPortfolioItem {
	id: string;
	name: string;
	description: string;
	image: string;
	dateAdded?: string;
	github?: string;
	link?: {
		name: string;
		url: string;
	};
	images: string[];
	tags?: string[];
}

export interface ISkill {
	name: string;
	percent: number;
	image?: string;
	position?: number;
}

export interface IPortfolio extends IBaseComponent {
	items: IPortfolioItem[];
}

export interface ISkills extends IBaseComponent {
	items: ISkill[];
}
export interface IWorkExperience {
    employer: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    description: string[];
    url?: string;
    tools: string[];
}

// TODO: THIS IS NOT DOING NOTHING, FIX IT
export const menu = {
  portfolio: {
    name: 'Portfolio',
    link: '/',
  },
  email: {
    name: 'Email',
    link: '/',
  },
  contact: {
    name: 'Contact',
    link: '/',
  },
}

export const about: IAbout = {
  description: [
    'Creative at heart, I am a Front-End Developer with an insatiable curiosity, and a passion for learning and personal growth.',
    'I have 2 year of development experience, 4 years working with JavaScript and Node, 1 year working with TypeScript, and over 10 years working in various aspects of tech.',
    'I love how the industry is constantly evolving. In the nonstop pace of innovation, I want to build front-end products that have an impact for good, that will advance the industry forward, and that bring people together.',
  ],
}

export const portfolio: IPortfolio = {
  uri: '/',
  items: [
    {
      id: '1',
      name: 'Project A',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita eum temporibus, ducimus, placeat recusandae excepturi accusantium',
      image: fakeImage({ text: 'Project A', width: 300 }),
      github: 'https://github.com',
      link: { // LIVE PROJECT
        name: 'Personal Site',
        url:'https://ronb.co',
      },
      images: fakeImages({ amount: randNumber(5) + 1, text: 'Project A' }),
      tags: ['Web site', 'React', 'hooks'],
    },
    {
      id: '2',
      name: 'Project B',
      description: 'some description 2',
      image: fakeImage({ text: 'Project B', width: 300 }),
      github: 'https://github.com', // NAME IT GITHUB PROJECT
      link: undefined, // NAME IT LINK
      images: fakeImages({ amount: randNumber(5) + 1, text: 'Project B' }),
    },
    {
      id: '3',
      name: 'Project3 C',
      description: 'perspiciatis exercitationem dicta repudiandae odio in laboriosam totam. Fuga nisi dolore veniam quia illo.',
      image: fakeImage({ text: 'Project C', width: 300 }),
      // github: 'https://github.com',
      link: undefined,
      images: fakeImages({ amount: randNumber(5) + 1, text: 'Project C' }),
      tags: ['Leggings', 'Illustrator', 'Consulting', 'Design'],
    },
    {
      id: '4',
      name: 'Project D',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita eum temporibus, ducimus, placeat recusandae excepturi accusantium',
      image: fakeImage({ text: 'Project D', width: 300 }),
      github: 'https://github.com',
      link: { // LIVE PROJECT
        name: 'ronb.co',
        url:'http://ronb.co',
      },
      images: fakeImages({ amount: randNumber(5) + 1, text: 'Project D' }),
      tags: ['Web site', 'React', 'hooks'],
    },
    {
      id: '5',
      name: 'Project E',
      description: 'some description 2',
      image: fakeImage({ text: 'Project E', width: 300 }),
      github: 'https://github.com', // NAME IT GITHUB PROJECT
      link: undefined, // NAME IT LINK
      images: fakeImages({ amount: randNumber(5) + 1, text: 'Project E' }),
    },
    {
      id: '6',
      name: 'Project3 F',
      description: 'perspiciatis exercitationem dicta repudiandae odio in laboriosam totam. Fuga nisi dolore veniam quia illo.',
      image: fakeImage({ text: 'Project F', width: 300 }),
      // github: 'https://github.com',
      link: undefined,
      images: fakeImages({ amount: 1, text: 'Project F' }),
      tags: ['Leggings', 'Illustrator', 'Consulting', 'Design'],
    },
    {
      id: '7',
      name: 'Project G',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita eum temporibus, ducimus, placeat recusandae excepturi accusantium',
      image: fakeImage({ text: 'Project G', width: 300 }),
      github: 'https://github.com',
      link: { // LIVE PROJECT
        name: 'ronb.co',
        url:'http://ronb.co',
      },
      images: fakeImages({ amount: 2, text: 'Project G' }),
      tags: ['Web site', 'React', 'hooks'],
    },

  ],
}

export const skills: ISkills = {
    // uri: '/public/assets/skills',
  uri: '/',
  items: [
    { name: 'React', percent: .9, image: 'react.svg' },
    { name: 'Redux', percent: .9, image: 'redux.svg' },
    { name: 'AWS', percent: .9, image: 'aws.svg' },
    { name: 'Azure', percent: .9, image: 'azure.svg' },
    { name: 'CSS3', percent: .9, image: 'css3.svg' },
    { name: 'HTML5', percent: .9, image: 'html5.svg' },
    { name: 'JavaScript', percent: .9, image: 'javascript.svg' },
    { name: 'Node', percent: .9, image: 'nodejs.svg' },
    { name: 'TypeScript', percent: .9, image: 'typescript.svg' },
		// NEED IMAGES FOR THESE BELOW
    { name: 'Python', percent: .3, image: 'python.svg' },
  ],
}

export const mediaLinks = {
  items: [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ronbarrantes/',
    },
    {
      name: 'Github',
      url: 'https://github.com/ronbarrantes',
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/ronbarrantes',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/ron_barrantes',
    },
  ],
}

export const experience: { items: IWorkExperience[] } = {
  items: [
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
      tools: ['React', 'FluentUI', 'TypesScript', 'Azure Stack', 'Jest', 'KnockoutJS'],
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
      tools: ['React', 'MochaJS', 'TypesScript', 'Selenium Webdriver', 'Azure Stack', 'PortalFx'],
    },

    {
      employer: 'Protalabs',
      url: 'https://protaventures.com',
      startDate: '9/2018',
      endDate: '4/2019',
      jobTitle: 'Software Developer Internship',
      description: [
        'Contributed to the development of Quoted, a social media application for families.',
        'The app was an MVP by the Chicago based consultant firm and it utilized React Native and Redux as a frontend technology and Ruby on Rails for its backend'],
      tools: ['React Native', 'Redux', 'JavaScript', 'Jest', 'Ruby on Rails', 'PostgreSQL', 'Redis'],
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
      tools: [ 'HTML', 'CSS', 'JavaScript', 'Adobe Illustrator', 'Photoshop', 'InDesign', 'Premiere Pro', 'Wordpress'],
    },
  ],
}

export const colorNames = {
  group1: {
    red: '#B80500',
    grayBlue: '#4D5885',
    lightBlue: '#16B1F0',
    lightPurple: '#A83BED',
    darkPurple: '#4A12B8',
  },
}

