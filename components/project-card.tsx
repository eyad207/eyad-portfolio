import Image from "next/image";
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
      className={`group flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-white transition-[border-color,box-shadow] hover:border-accent/35 hover:shadow-md ${
        compact ? "md:min-h-[290px]" : "md:min-h-[358px]"
      }`}
    >
      {project.images[0] && (
        <Link
          className="relative block aspect-[16/9] overflow-hidden bg-surface"
          href={`/projects/${project.slug}`}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            src={project.images[0].src}
            alt=""
            fill
            sizes={compact ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex min-h-[17px] items-start justify-between gap-3 font-mono text-[9px] tracking-[0.06em] text-subtle uppercase">
          <span>
            {project.categories.includes("Featured")
              ? "FEATURED PROJECT"
              : "PROJECT"}
          </span>
          {project.status && (
            <span className="font-sans text-right text-[10px] leading-[1.45] font-semibold tracking-normal text-muted normal-case">
              {project.status}
            </span>
          )}
        </div>
        <h2 className="mt-3 text-[20px] leading-[1.28] font-bold tracking-[-0.045em]">
          <Link
            className="transition-colors hover:text-accent"
            href={`/projects/${project.slug}`}
          >
            {project.name}
          </Link>
        </h2>
        <p className="mt-2.5 mb-5 text-xs leading-[1.8] text-muted">
          {project.summary}
        </p>
        <p className="mb-2 text-[10px] font-semibold text-subtle">
          {project.technologyHeading ?? "Technologies"}
        </p>
        <TagList
          className="mt-auto"
          items={tags}
          label={`${project.name} ${project.technologyHeading ?? "technologies"}`}
        />
        <div className="mt-5 flex items-center justify-between gap-2.5 border-t border-border pt-3.5">
          <Link className={ui.textLink} href={`/projects/${project.slug}`}>
            View project <span aria-hidden="true">→</span>
          </Link>
          <span className="text-[10px] font-semibold text-subtle">
            {project.categories.find((category) => category !== "Featured")}
          </span>
        </div>
      </div>
    </article>
  );
}
