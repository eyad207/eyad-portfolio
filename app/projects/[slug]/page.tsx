import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TagList } from "@/components/tag-list";
import { projects as localProjects } from "@/lib/portfolio-data";
import { getPortfolioData } from "@/lib/portfolio-repository";
import { ui } from "@/lib/ui";

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
    <main className={ui.pageMain}>
      <Link
        className="mb-[31px] inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-accent"
        href="/projects"
      >
        <span aria-hidden="true">←</span> All projects
      </Link>
      <header className="max-w-[780px] border-b border-border pb-[35px]">
        <p className={`${ui.eyebrow} mb-3.5`}>{project.categories.join(" / ")}</p>
        <h1 className="text-[clamp(36px,5vw,54px)] leading-[1.13] font-[560] tracking-[-0.06em]">
          {project.name}
        </h1>
        <p className="mt-[15px] max-w-[660px] text-[15px] leading-[1.8] text-muted">
          {project.summary}
        </p>
        {project.status && (
          <p className={`${ui.card} mt-4 inline-block px-[9px] py-[5px] text-[11px] text-muted`}>
            {project.status}
          </p>
        )}
        {project.links.length > 0 && (
          <div className="mt-[19px] flex flex-wrap items-center gap-[11px]">
            {project.links.map((link) => (
              <a
                className={ui.buttonSecondary}
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
        <section className={`${ui.detailSection} mt-9`} aria-labelledby="screenshots-heading">
          <h2 className={ui.detailHeading} id="screenshots-heading">Screenshots</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {project.images.map((image) => (
              <figure key={image.src}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={800}
                  className={`${ui.card} block h-auto w-full`}
                />
                {image.caption && (
                  <figcaption className="mt-1.5 text-[10px] text-subtle">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-0 pt-[27px] md:grid-cols-[minmax(0,1fr)_minmax(220px,0.38fr)] md:gap-[75px] md:pt-9">
        <div>
          <section className={ui.detailSection}>
            <h2 className={ui.detailHeading}>Overview</h2>
            <p className={ui.detailParagraph}>{project.description}</p>
          </section>
          {project.contribution && (
            <section className={ui.detailSection}>
              <h2 className={ui.detailHeading}>My contribution</h2>
              <p className={ui.detailParagraph}>{project.contribution}</p>
            </section>
          )}
          {project.features.length > 0 && (
            <section className={ui.detailSection}>
              <h2 className={ui.detailHeading}>Features</h2>
              <ul className={ui.detailList}>
                {project.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </section>
          )}
          {project.metrics && project.metrics.length > 0 && (
            <section className={ui.detailSection} aria-labelledby="metrics-heading">
              <h2 className={ui.detailHeading} id="metrics-heading">
                Historical project metrics
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.metrics.map((metric) => (
                  <div
                    className={`${ui.card} grid min-w-[140px] gap-0.5 px-3.5 py-3`}
                    key={metric.label}
                  >
                    <strong className="text-xl font-[560] tracking-[-0.04em]">
                      {metric.value}
                    </strong>
                    <span className="text-[11px] text-muted">{metric.label}</span>
                    <small className="text-[9px] text-subtle">{metric.context}</small>
                  </div>
                ))}
              </div>
            </section>
          )}
          {project.planned && project.planned.length > 0 && (
            <section className={ui.detailSection}>
              <h2 className={ui.detailHeading}>Planned / in progress</h2>
              <ul className={ui.detailList}>
                {project.planned.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}
        </div>
        <aside className="border-t border-border pt-2 md:border-0 md:pt-0">
          {project.technologies.length > 0 && (
            <section className={`${ui.detailSection} mt-[22px] md:mt-0`}>
              <h2 className={ui.detailHeading}>
                {project.technologyHeading ?? "Technologies"}
              </h2>
              <TagList items={project.technologies} />
            </section>
          )}
          {project.links.length > 0 && (
            <section className={`${ui.detailSection} mt-[22px] md:mt-0`}>
              <h2 className={ui.detailHeading}>Links</h2>
              <ul className="grid gap-[9px] text-xs">
                {project.links.map((link) => (
                  <li key={`${link.kind}-${link.url}`}>
                    <a
                      className="text-accent"
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
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
        <section className="border-t border-border pt-[35px]" aria-labelledby="related-heading">
          <div className={ui.sectionHeading}>
            <div>
              <p className={`${ui.eyebrow} mb-3.5`}>MORE WORK</p>
              <h2 className={ui.sectionTitle} id="related-heading">Related projects</h2>
            </div>
          </div>
          <div className={ui.projectGridSecondary}>
            {relatedProjects.map((relatedProject) => (
              <article className={`${ui.card} p-[17px]`} key={relatedProject.slug}>
                <h3 className="text-[15px] font-[550]">
                  <Link
                    className="transition-colors hover:text-accent"
                    href={`/projects/${relatedProject.slug}`}
                  >
                    {relatedProject.name}
                  </Link>
                </h3>
                <p className="mt-2 text-[11px] leading-[1.7] text-muted">
                  {relatedProject.summary}
                </p>
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
    <Suspense
      fallback={
        <main className={ui.pageMain}>
          <p className={ui.loading}>Loading project…</p>
        </main>
      }
    >
      <ProjectDetailContent params={params} />
    </Suspense>
  );
}
