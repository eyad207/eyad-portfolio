import "server-only";

import { cacheLife } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { localPortfolioData } from "./portfolio-data";
import type { Database } from "./database.types";
import type {
  Experience,
  PortfolioData,
  PortfolioEvent,
  PortfolioProject,
  ProjectImage,
} from "./portfolio-types";

function getSupabaseCredentials() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url && !key) return null;
  if (!url || !key) {
    throw new Error(
      "Set both SUPABASE_URL and SUPABASE_ANON_KEY, or leave both unset to use the local portfolio data.",
    );
  }

  return { url, key };
}

async function getSupabasePortfolioData(
  url: string,
  key: string,
): Promise<PortfolioData> {
  "use cache";
  cacheLife("hours");
  const supabase = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const [
    projectsResult,
    technologiesResult,
    projectTechnologiesResult,
    imagesResult,
    experiencesResult,
    experienceTechnologiesResult,
    eventsResult,
    eventTagsResult,
    projectLinksResult,
  ] = await Promise.all([
    supabase.from("projects").select("*").eq("published", true).order("sort_order"),
    supabase.from("technologies").select("*"),
    supabase.from("project_technologies").select("*").order("sort_order"),
    supabase.from("project_images").select("*").order("sort_order"),
    supabase.from("experiences").select("*").eq("published", true).order("sort_order"),
    supabase.from("experience_technologies").select("*").order("sort_order"),
    supabase.from("events").select("*").eq("published", true).order("sort_order"),
    supabase.from("event_tags").select("*").order("sort_order"),
    supabase.from("links").select("*").eq("entity_type", "project").order("sort_order"),
  ]);

  const results = [
    projectsResult,
    technologiesResult,
    projectTechnologiesResult,
    imagesResult,
    experiencesResult,
    experienceTechnologiesResult,
    eventsResult,
    eventTagsResult,
    projectLinksResult,
  ];
  const failedResult = results.find((result) => result.error);
  if (failedResult?.error) {
    throw new Error(`Unable to load portfolio data: ${failedResult.error.message}`);
  }

  const technologies = technologiesResult.data ?? [];
  const projects: PortfolioProject[] = (projectsResult.data ?? []).map((project) => {
    const technologyIds = (projectTechnologiesResult.data ?? [])
      .filter((item) => item.project_slug === project.slug)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((item) => item.technology_id);

    const images: ProjectImage[] = (imagesResult.data ?? [])
      .filter((image) => image.project_slug === project.slug)
      .map(({ src, alt, caption }) => ({
        src,
        alt,
        ...(caption ? { caption } : {}),
      }));

    const links = (projectLinksResult.data ?? [])
      .filter((link) => link.entity_slug === project.slug)
      .map(({ label, url, kind }) => ({ label, url, kind }));

    return {
      slug: project.slug,
      name: project.name,
      summary: project.summary,
      description: project.description,
      categories: project.categories,
      ...(project.technology_heading
        ? { technologyHeading: project.technology_heading }
        : {}),
      technologies: technologyIds.flatMap((id) => {
        const technology = technologies.find((item) => item.id === id);
        return technology ? [technology.name] : [];
      }),
      features: project.features,
      ...(project.contribution ? { contribution: project.contribution } : {}),
      ...(project.status ? { status: project.status } : {}),
      planned: project.planned,
      metrics: project.metrics,
      images,
      links,
      relatedProjectSlugs: project.related_project_slugs,
    };
  });

  const experiences: Experience[] = (experiencesResult.data ?? []).map((experience) => ({
    slug: experience.slug,
    organization: experience.organization,
    role: experience.role,
    startDate: experience.start_date,
    endDate: experience.end_date,
    summary: experience.summary,
    responsibilities: experience.responsibilities,
    technologies: (experienceTechnologiesResult.data ?? [])
      .filter((item) => item.experience_slug === experience.slug)
      .sort((a, b) => a.sort_order - b.sort_order)
      .flatMap((item) => {
        const technology = technologies.find((entry) => entry.id === item.technology_id);
        return technology ? [technology.name] : [];
      }),
  }));

  const events: PortfolioEvent[] = (eventsResult.data ?? []).map((event) => ({
    slug: event.slug,
    name: event.name,
    organization: event.organization,
    type: event.type,
    ...(event.date_label ? { dateLabel: event.date_label } : {}),
    description: event.description,
    topics: (eventTagsResult.data ?? [])
      .filter((tag) => tag.event_slug === event.slug)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((tag) => tag.tag),
    ...(event.learning.length ? { learning: event.learning } : {}),
    ...(event.people.length ? { people: event.people } : {}),
    ...(event.related_project_slug
      ? { relatedProjectSlug: event.related_project_slug }
      : {}),
  }));

  return { projects, experiences, events };
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const credentials = getSupabaseCredentials();
  if (!credentials) return localPortfolioData;
  return getSupabasePortfolioData(credentials.url, credentials.key);
}
