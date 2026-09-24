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

export type SocialLink = {
  label: IconsLisType;
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
  /** One-line summary shown on the project card. */
  summary?: string;
  /** Short label, e.g. "SaaS" or "For family". */
  category?: string;
  /** e.g. "Live" or "In progress". */
  status?: string;
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
  /** One-line summary shown above the details list. */
  summary?: string;
  startDate: string;
  endDate?: string;
  description: string[];
  url?: string;
  tools: IconsLisType[];
}

export interface Service {
  title: string;
  body: string;
}

export interface SectionCopy {
  title: string;
  sub: string;
}
