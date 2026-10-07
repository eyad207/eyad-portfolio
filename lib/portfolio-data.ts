import type {
  Experience,
  PortfolioData,
  PortfolioEvent,
  PortfolioProject,
} from "./portfolio-types";

const fixtechTechnologies = [
  "Next.js",
  "TypeScript",
  "MongoDB",
  "Mongoose",
  "Tailwind CSS",
  "Zustand",
  "Zod",
  "Cloudinary",
  "Resend",
  "Redis",
];

export const projects: PortfolioProject[] = [
  {
    slug: "pickbox",
    name: "PickBox",
    summary:
      "A surplus-food platform connecting local food businesses with customers looking for more affordable meals.",
    description:
      "PickBox aims to reduce food waste by helping restaurants, bakeries, cafes, and potentially hotels offer surplus food to customers. The product concepts include Deals and MysteryBoxes.",
    categories: ["Featured", "Full-stack", "Startup"],
    technologyHeading: "Potential / current technology direction",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Stripe",
      "Cloudinary",
    ],
    features: ["Deals", "MysteryBox"],
    contribution:
      "Built the PickBox website and MVP before Pangstart, then continued developing the product during and after the program.",
    status:
      "The MVP is mostly finished and needs further testing and improvements.",
    planned: [
      "Continue product development.",
      "Explore a mobile application with Expo / React Native.",
    ],
    images: [],
    links: [],
    relatedProjectSlugs: ["house-of-shawarma", "sallora"],
  },
  {
    slug: "house-of-shawarma",
    name: "House of Shawarma",
    summary:
      "An online ordering platform developed for a restaurant, with customer ordering and restaurant administration features.",
    description:
      "A real restaurant ordering platform with product and order management, discounts, opening hours, restaurant status, and an administration area.",
    categories: ["Featured", "Full-stack"],
    technologies: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "Stripe",
      "Cloudinary",
      "Resend",
      "Redis",
    ],
    features: [
      "Online ordering, products, and orders",
      "Discounts, opening hours, and restaurant status",
      "Admin dashboard and live new-order page",
      "Sound notification for new orders",
      "Stripe integration",
      "Server-side validation and webhooks",
    ],
    metrics: [
      { label: "Visits", value: "587+", context: "Historical project metric" },
      { label: "Views", value: "1,332+", context: "Historical project metric" },
    ],
    images: [],
    links: [],
    relatedProjectSlugs: ["pickbox", "sallora"],
  },
  {
    slug: "fixtech",
    name: "FixTech",
    summary:
      "Website and product development work for FixTech AS, spanning catalog, repair, administration, and data features.",
    description:
      "Professional software development work at FixTech AS, including website development, product/catalog functionality, repair-related functionality, APIs, data management, media management, and performance and caching work.",
    categories: ["Featured", "Full-stack"],
    technologies: fixtechTechnologies,
    features: [
      "Product/catalog and repair-related functionality",
      "Admin dashboard and APIs",
      "Data and media management",
      "Performance and caching",
      "Website development",
    ],
    contribution:
      "Technical / Full-Stack Developer at FixTech AS. Work includes the areas described above.",
    planned: ["AI repair-triage feature is planned / in development."],
    images: [],
    links: [],
    relatedProjectSlugs: ["house-of-shawarma", "sallora"],
  },
  {
    slug: "sallora",
    name: "Sallora",
    summary:
      "An e-commerce / webshop project with authentication, product browsing, payments, and email functionality.",
    description:
      "A full-stack webshop project covering e-commerce, authentication, products, payments through Stripe and Vipps, email, and media management.",
    categories: ["Full-stack"],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "MongoDB",
      "NextAuth",
      "Stripe",
      "Vipps",
      "Resend",
      "Cloudinary",
    ],
    features: [
      "E-commerce and product functionality",
      "Authentication",
      "Stripe and Vipps payments",
      "Email and media management",
    ],
    images: [],
    links: [],
    relatedProjectSlugs: ["pickbox", "house-of-shawarma"],
  },
  {
    slug: "study-room-booking",
    name: "Study Room Booking Tool",
    summary:
      "A university project for finding rooms, checking availability, and managing study-room bookings.",
    description:
      "An ASP.NET Core MVC application with rooms, bookings, availability, CRUD functionality, validation, and persistent storage in SQLite.",
    categories: ["Full-stack", "University"],
    technologies: [
      "C#",
      "ASP.NET Core MVC",
      "Entity Framework Core",
      "SQLite",
      "Razor",
      "Bootstrap",
      "JavaScript",
    ],
    features: [
      "Room and booking management",
      "Availability",
      "Create, read, update, and delete operations",
      "Validation and database persistence",
    ],
    images: [],
    links: [],
    relatedProjectSlugs: ["house-of-shawarma", "sallora"],
  },
];

export const experiences: Experience[] = [
  {
    slug: "fixtech-as",
    organization: "FixTech AS",
    role: "Technical / Full-Stack Developer",
    startDate: "2025-12",
    endDate: null,
    summary:
      "Developing FixTech's website and product functionality across catalog, repair, administration, APIs, data, and media management.",
    responsibilities: [
      "Develop website functionality.",
      "Work on product/catalog and repair-related features.",
      "Develop admin dashboard features and APIs.",
      "Manage data and media, and contribute to performance and caching.",
    ],
    technologies: fixtechTechnologies,
  },
];

export const events: PortfolioEvent[] = [
  {
    slug: "pangstart",
    name: "Pangstart",
    organization: "LIUS",
    type: "Startup / entrepreneurship program",
    description:
      "A startup and entrepreneurship program where I continued developing PickBox. I had built the PickBox website/MVP before the program.",
    topics: [
      "Market research",
      "Competitor research",
      "Interviews",
      "Customer research",
      "Business model",
      "Product development",
      "Pitching",
    ],
    people: [
      { role: "Mentor", names: ["Marius"] },
      { role: "Organizers", names: ["Kim (LIUS)", "Stian"] },
      { role: "Other participants", names: ["Marcus", "Jakob", "Silje"] },
    ],
    relatedProjectSlug: "pickbox",
  },
  {
    slug: "telenor-bla-sone",
    name: "Telenor Blå Sone",
    organization: "Telenor, Fornebu",
    type: "Technology / career event",
    description:
      'A technology and career event that included "En utviklers hverdag", technical discussions, a coding/technical challenge, cybersecurity discussions, and product and technology perspectives.',
    topics: [
      "Software development",
      "Technical challenge",
      "Cybersecurity",
      "Product and technology",
    ],
    learning: [
      "I was particularly interested in cybersecurity and CSOC-related work, including AI-supported security workflows and automated response.",
      "I spoke with people working in cybersecurity and technology.",
    ],
  },
  {
    slug: "gjensidige-career-day",
    name: "Gjensidige Career Day",
    organization: "Gjensidige",
    type: "Career day / professional development",
    description:
      "Participation in a career-related event offering exposure to the technology and business environment.",
    topics: [],
  },
];

export const localPortfolioData: PortfolioData = {
  projects,
  experiences,
  events,
};
