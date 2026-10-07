import Link from "next/link";
import type { PortfolioProject } from "@/lib/portfolio-types";

type ProjectCardProps = {
  project: PortfolioProject;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  return (
    <article className={`project-card${compact ? " project-card-compact" : ""}`}>
      <div className="project-card-topline">
        <span>{project.categories.includes("Featured") ? "FEATURED PROJECT" : "PROJECT"}</span>
        {project.status && <span className="project-status">{project.status}</span>}
      </div>
      <h2 className="project-card-title">
        <Link href={`/projects/${project.slug}`}>{project.name}</Link>
      </h2>
      <p className="project-card-summary">{project.summary}</p>
      <p className="project-tech-label">
        {project.technologyHeading ?? "Technologies"}
      </p>
      <ul
        className="tag-list"
        aria-label={`${project.name} ${project.technologyHeading ?? "technologies"}`}
      >
        {project.technologies.slice(0, compact ? 4 : 5).map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
        {project.technologies.length > (compact ? 4 : 5) && (
          <li>+{project.technologies.length - (compact ? 4 : 5)}</li>
        )}
      </ul>
      <div className="project-card-bottom">
        <Link className="text-link" href={`/projects/${project.slug}`}>
          Project details <span aria-hidden="true">→</span>
        </Link>
        <span className="category-label">{project.categories.find((category) => category !== "Featured")}</span>
      </div>
    </article>
  );
}
