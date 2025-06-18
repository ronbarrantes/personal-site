import type { IconsLisType } from "@/components/icon/icons-list-files";

// Types that go get exported should go here
export type IconLink =
  | "home"
  | "about"
  | "warning"
  | "resume"
  | "portfolio"
  | "contact";

export type Link = {
  label: string;
  href: string;
};

export interface SectionText {
  title: string;
  description?: string[] | string;
}
export interface About extends SectionText {
  title: string;
  description: string[];
}

export interface PortfolioItem {
  name: string;
  description: string[];
  dateAdded?: string;
  github?: string;
  link?: Link;
  images?: string | string[];
  tags?: string[];
  tools: IconsLisType[];
}

export interface Portfolio {
  [key: string]: PortfolioItem[] | string;
}

export interface Skills {
  [key: string]: Skill[] | string;
}

export interface Skill {
  name: string;
  percent: number;
  image?: string;
  position?: number;
}

export interface WorkExperience {
  employer: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  description: string[];
  url?: string;
  tools: IconsLisType[];
}
