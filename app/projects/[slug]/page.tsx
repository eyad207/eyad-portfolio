import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { projects as localProjects } from "@/lib/portfolio-data";
import { getPortfolioData } from "@/lib/portfolio-repository";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = localProjects.find((item) => item.slug === slug);

  return project
    ? {
        title: `${project.name} | Projects | Eyad Lazkani`,
        description: project.summary,
      }
    : {
        title: `${slug.split("-").map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" ")} | Projects | Eyad Lazkani`,
        description: "Project details by Eyad Lazkani.",
      };
}

async function ProjectDetailContent({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { projects } = await getPortfolioData();
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  const relatedProjects = project.relatedProjectSlugs
    .map((relatedSlug) => projects.find((item) => item.slug === relatedSlug))
    .filter((item) => item !== undefined);

  return (
    <main className="container page-main project-detail">
      <Link className="back-link" href="/projects">
        <span aria-hidden="true">←</span> All projects
      </Link>
      <header className="detail-header">
        <p className="eyebrow">{project.categories.join(" / ")}</p>
        <h1>{project.name}</h1>
        <p className="detail-summary">{project.summary}</p>
        {project.status && <p className="detail-status">{project.status}</p>}
        {project.links.length > 0 && (
          <div className="detail-actions">
            {project.links.map((link) => (
              <a
                className="button button-secondary"
                href={link.url}
                key={`${link.kind}-${link.url}`}
                target="_blank"
                rel="noreferrer"
              >
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        )}
      </header>

      {project.images.length > 0 && (
        <section className="detail-section" aria-labelledby="screenshots-heading">
          <h2 id="screenshots-heading">Screenshots</h2>
          <div className="detail-image-grid">
            {project.images.map((image) => (
              <figure key={image.src}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={800}
                  className="detail-image"
                />
                {image.caption && <figcaption>{image.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )}

      <div className="detail-layout">
        <div className="detail-main-column">
          <section className="detail-section">
            <h2>Overview</h2>
            <p>{project.description}</p>
          </section>
          {project.contribution && (
            <section className="detail-section">
              <h2>My contribution</h2>
              <p>{project.contribution}</p>
            </section>
          )}
          {project.features.length > 0 && (
            <section className="detail-section">
              <h2>Features</h2>
              <ul className="detail-list">
                {project.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </section>
          )}
          {project.metrics && project.metrics.length > 0 && (
            <section className="detail-section" aria-labelledby="metrics-heading">
              <h2 id="metrics-heading">Historical project metrics</h2>
              <div className="metric-list">
                {project.metrics.map((metric) => (
                  <div className="metric-item" key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                    <small>{metric.context}</small>
                  </div>
                ))}
              </div>
            </section>
          )}
          {project.planned && project.planned.length > 0 && (
            <section className="detail-section">
              <h2>Planned / in progress</h2>
              <ul className="detail-list">
                {project.planned.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}
        </div>
        <aside className="detail-sidebar">
          {project.technologies.length > 0 && (
            <section className="detail-section">
              <h2>{project.technologyHeading ?? "Technologies"}</h2>
              <ul className="tag-list detail-tags">
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </section>
          )}
          {project.links.length > 0 && (
            <section className="detail-section">
              <h2>Links</h2>
              <ul className="plain-link-list">
                {project.links.map((link) => (
                  <li key={`${link.kind}-${link.url}`}>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.label} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>

      {relatedProjects.length > 0 && (
        <section className="related-section" aria-labelledby="related-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">MORE WORK</p>
              <h2 id="related-heading">Related projects</h2>
            </div>
          </div>
          <div className="project-grid project-grid-secondary">
            {relatedProjects.map((relatedProject) => (
              <article className="related-project" key={relatedProject.slug}>
                <h3>
                  <Link href={`/projects/${relatedProject.slug}`}>{relatedProject.name}</Link>
                </h3>
                <p>{relatedProject.summary}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={<main className="container page-main"><p className="loading-state">Loading project…</p></main>}>
      <ProjectDetailContent params={params} />
    </Suspense>
  );
}
