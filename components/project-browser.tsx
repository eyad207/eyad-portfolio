"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { PortfolioProject, ProjectCategory } from "@/lib/portfolio-types";

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
      <div className="project-tools">
        <label className="search-label" htmlFor="project-search">Search projects</label>
        <input
          className="search-input"
          id="project-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, technology, or topic"
        />
        <div className="filter-wrap">
          <span className="filter-label">Filter by category</span>
          <div className="filter-list" aria-label="Project categories">
            <button
              className={`filter-button${activeCategory === "All" ? " is-active" : ""}`}
              type="button"
              aria-pressed={activeCategory === "All"}
              onClick={() => setActiveCategory("All")}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                className={`filter-button${activeCategory === category ? " is-active" : ""}`}
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
      <p className="result-count" aria-live="polite">
        {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
      </p>
      {filteredProjects.length ? (
        <div className="project-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <p className="empty-state">
          No projects match those filters yet. Try another search or category.
        </p>
      )}
    </>
  );
}
