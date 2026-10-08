"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { PortfolioProject, ProjectCategory } from "@/lib/portfolio-types";
import { ui } from "@/lib/ui";

const categories: ProjectCategory[] = [
  "Featured",
  "Full-stack",
  "Frontend",
  "Backend",
  "AI",
  "Data",
  "University",
  "Personal",
  "Startup",
];

const filterButton =
  "min-h-[30px] cursor-pointer rounded-[3px] border px-[9px] py-1 text-[10px] transition-colors";
const filterIdle =
  "border-border bg-white text-muted hover:border-[#bfc7d4] hover:text-foreground";
const filterActive = "border-accent bg-accent text-white";
const filterLabel = "mb-[7px] block text-[11px] font-medium text-muted";

export function ProjectBrowser({ projects }: { projects: PortfolioProject[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">("All");

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.categories.includes(activeCategory);
      const searchable = [
        project.name,
        project.summary,
        project.description,
        ...project.categories,
        ...project.technologies,
      ]
        .join(" ")
        .toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeCategory, projects, query]);

  return (
    <>
      <div
        className={`${ui.card} mb-[15px] grid gap-[15px] p-3.5 md:grid-cols-[minmax(230px,0.65fr)_minmax(0,1.35fr)] md:items-end md:gap-x-7 md:gap-y-[22px] md:p-[19px]`}
      >
        <div>
          <label className={filterLabel} htmlFor="project-search">Search projects</label>
          <input
            className="min-h-10 w-full rounded-[3px] border border-[#d9dde4] px-2.5 py-2 text-xs text-foreground placeholder:text-[#8a919b]"
            id="project-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, technology, or topic"
          />
        </div>
        <div>
          <span className={filterLabel}>Filter by category</span>
          <div className="flex flex-wrap gap-1.5" aria-label="Project categories">
            <button
              className={`${filterButton} ${activeCategory === "All" ? filterActive : filterIdle}`}
              type="button"
              aria-pressed={activeCategory === "All"}
              onClick={() => setActiveCategory("All")}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                className={`${filterButton} ${activeCategory === category ? filterActive : filterIdle}`}
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="mb-4 text-[11px] text-subtle" aria-live="polite">
        {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
      </p>
      {filteredProjects.length ? (
        <div className={ui.projectGrid}>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="border border-border p-6 text-[13px] text-muted">
          No projects match those filters yet. Try another search or category.
        </p>
      )}
    </>
  );
}
