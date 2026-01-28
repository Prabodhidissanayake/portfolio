export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  location: string;
  duration: string;
  description: string[];
  technologies: string[];
  website: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  location: string;
  duration: string;
  description: string;
  achievements: string[];
  coursework: string[];
}

export interface ContactInfo {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
  value: string;
  href: string;
}

export interface SocialLink {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
  href: string;
  color: string;
}
