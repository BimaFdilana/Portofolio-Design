export interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

export interface AboutData {
  bio: string;
  imageUrl: string;
}

export interface SkillData {
  name: string;
  category: string;
}

export interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
}

export interface ContactData {
  email: string;
  location: string;
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  skills: SkillData[];
  projects: ProjectData[];
  contact: ContactData;
}
