import { IconsLisType } from '@ui'
import { TLink as Link } from './link'

export interface SectionText {
  title: string
  description?: string[] | string
}
export interface IAbout extends SectionText {
  title: string
  description: string[]
}

export interface PortfolioItem {
  id: string
  name: string
  description: string
  image: string
  dateAdded?: string
  github?: string
  link?: Link
  images: string[]
  tags?: string[]
}

export interface IPortfolio {
  [key: string]: PortfolioItem[] | string
}

export interface ISkills {
  [key: string]: ISkill[] | string
}

export interface ISkill {
  name: string
  percent: number
  image?: string
  position?: number
}

export interface IWorkExperience {
  employer: string
  jobTitle: string
  startDate: string
  endDate?: string
  description: string[]
  url?: string
  tools: IconsLisType[]
}
