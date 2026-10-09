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
        className="mb-9 inline-flex items-center gap-2 text-xs font-bold text-muted transition-colors hover:text-accent"
        href="/projects"
      >
        <span aria-hidden="true">←</span> All projects
      </Link>
      <header className="max-w-[850px] border-b border-border pb-10">
        <p className={`${ui.eyebrow} mb-4`}>{project.categories.join(" / ")}</p>
        <h1 className="text-[clamp(38px,5vw,60px)] leading-[1.08] font-extrabold tracking-[-0.065em]">
          {project.name}
        </h1>
        <p className="mt-5 max-w-[720px] text-[15px] leading-[1.85] text-muted">
          {project.summary}
        </p>
        {project.status && (
          <p className={`${ui.card} mt-5 inline-block px-3 py-2 text-[11px] font-semibold text-muted`}>
            {project.status}
          </p>
        )}
        {project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
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
        <section className="mt-12" aria-labelledby="screenshots-heading">
          <div className="mb-5 flex items-end justify-between gap-5">
            <div>
              <p className={`${ui.eyebrow} mb-3`}>PROJECT GALLERY</p>
              <h2 className={ui.blockTitle} id="screenshots-heading">A closer look</h2>
            </div>
            <p className="hidden text-xs text-subtle md:block">
              Product screens and implementation details
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {project.images.map((image, index) => (
              <figure className={`${ui.card} overflow-hidden`} key={image.src}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={800}
                  className="aspect-[16/10] w-full object-cover"
                />
                <figcaption className="border-t border-border px-4 py-3.5 text-xs leading-5 text-muted">
                  <span className="mr-2 font-mono text-[10px] font-semibold tracking-[0.08em] text-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {image.caption ?? `A view from the ${project.name} product experience.`}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-0 pt-10 md:grid-cols-[minmax(0,1fr)_minmax(220px,0.38fr)] md:gap-20 md:pt-12">
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
        <aside className="border-t border-border pt-6 md:border-0 md:pt-0">
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
        <section className="border-t border-border pt-10" aria-labelledby="related-heading">
          <div className={ui.sectionHeading}>
            <div>
              <p className={`${ui.eyebrow} mb-3.5`}>MORE WORK</p>
              <h2 className={ui.sectionTitle} id="related-heading">Related projects</h2>
            </div>
          </div>
          <div className={ui.projectGridSecondary}>
            {relatedProjects.map((relatedProject) => (
              <article className={`${ui.card} p-5 transition-[border-color,box-shadow] hover:border-accent/35 hover:shadow-sm`} key={relatedProject.slug}>
                <h3 className="text-[17px] font-bold tracking-[-0.035em]">
                  <Link
                    className="transition-colors hover:text-accent"
                    href={`/projects/${relatedProject.slug}`}
                  >
                    {relatedProject.name}
                  </Link>
                </h3>
                <p className="mt-2.5 text-[11px] leading-[1.8] text-muted">
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
