export type ProjectCategory =
  | "Featured"
  | "Full-stack"
  | "Frontend"
  | "Backend"
  | "AI"
  | "Data"
  | "University"
  | "Personal"
  | "Startup";

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type PortfolioProject = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  categories: ProjectCategory[];
  technologies: string[];
  technologyHeading?: string;
  features: string[];
  contribution?: string;
  status?: string;
  planned?: string[];
  metrics?: { label: string; value: string; context: string }[];
  images: ProjectImage[];
  links: { label: string; url: string; kind: string }[];
  relatedProjectSlugs: string[];
};

export type Experience = {
  slug: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string | null;
  summary: string;
  responsibilities: string[];
  technologies: string[];
};

export type PortfolioEvent = {
  slug: string;
  name: string;
  organization: string;
  type: string;
  dateLabel?: string;
  description: string;
  topics: string[];
  learning?: string[];
  people?: { role: string; names: string[] }[];
  relatedProjectSlug?: string;
};

export type PortfolioData = {
  projects: PortfolioProject[];
  experiences: Experience[];
  events: PortfolioEvent[];
};
