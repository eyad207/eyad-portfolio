import Link from "next/link";
import { TagList } from "@/components/tag-list";
import type { PortfolioProject } from "@/lib/portfolio-types";
import { ui } from "@/lib/ui";

type ProjectCardProps = {
  project: PortfolioProject;
  compact?: boolean;
};

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const limit = compact ? 4 : 5;
  const tags = project.technologies.slice(0, limit);
  if (project.technologies.length > limit) {
    tags.push(`+${project.technologies.length - limit}`);
  }

  return (
    <article
      className={`flex min-w-0 flex-col rounded-[3px] border border-border bg-white p-[18px] transition-colors hover:border-[#c6cbd3] ${
        compact ? "md:min-h-[228px]" : "md:min-h-[260px]"
      }`}
    >
      <div className="flex min-h-[17px] items-start justify-between gap-3 font-mono text-[9px] tracking-[0.04em] text-subtle uppercase">
        <span>
          {project.categories.includes("Featured")
            ? "FEATURED PROJECT"
            : "PROJECT"}
        </span>
        {project.status && (
          <span className="font-sans text-right text-[10px] leading-[1.45] tracking-normal text-muted normal-case">
            {project.status}
          </span>
        )}
      </div>
      <h2 className="mt-4 text-[19px] leading-[1.35] font-[560] tracking-[-0.04em]">
        <Link
          className="transition-colors hover:text-accent"
          href={`/projects/${project.slug}`}
        >
          {project.name}
        </Link>
      </h2>
      <p className="mt-[9px] mb-4 text-xs leading-[1.75] text-muted">
        {project.summary}
      </p>
      <p className="mb-[7px] text-[10px] text-subtle">
        {project.technologyHeading ?? "Technologies"}
      </p>
      <TagList
        className="mt-auto"
        items={tags}
        label={`${project.name} ${project.technologyHeading ?? "technologies"}`}
      />
      <div className="mt-[19px] flex items-center justify-between gap-2.5 border-t border-[#eef0f3] pt-3">
        <Link className={ui.textLink} href={`/projects/${project.slug}`}>
          Project details <span aria-hidden="true">→</span>
        </Link>
        <span className="text-[10px] text-subtle">
          {project.categories.find((category) => category !== "Featured")}
        </span>
      </div>
    </article>
  );
}
