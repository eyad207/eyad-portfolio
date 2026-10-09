import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ProfilePhoto } from "@/components/profile-photo";
import { ProjectCard } from "@/components/project-card";
import { TagList } from "@/components/tag-list";
import { getPortfolioData } from "@/lib/portfolio-repository";
import { ui } from "@/lib/ui";

const interests = [
  "Full-stack development",
  "AI and LLMs",
  "Data-driven applications",
  "Cybersecurity",
  "Product development",
];

async function HomeContent() {
  const { projects, experiences, events } = await getPortfolioData();
  const featuredProjects = projects.filter((project) =>
    project.categories.includes("Featured"),
  );
  const otherProjects = projects.filter(
    (project) => !project.categories.includes("Featured"),
  );
  const experience = experiences[0];

  return (
    <main>
      <section
        className="border-b border-border bg-surface/70"
        aria-labelledby="intro-title"
      >
        <div
          className={`${ui.container} grid items-center gap-10 py-14 md:min-h-[590px] md:grid-cols-[minmax(0,1.16fr)_minmax(290px,0.68fr)] md:gap-14 md:py-16 lg:gap-24`}
        >
          <div className="max-w-[700px]">
            <p className={`${ui.eyebrow} mb-5`}>
              EYAD LAZKANI · DATA ENGINEERING &amp; SOFTWARE
            </p>
            <h1 className={ui.heroTitle} id="intro-title">
              Building useful digital products with{" "}
              <span className="text-accent">data and care.</span>
            </h1>
            <p className={`${ui.introDescription} mt-6`}>
              I&apos;m a Data Engineering student at OsloMet and software
              developer focused on turning practical problems into thoughtful,
              reliable web products.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link className={ui.buttonPrimary} href="/projects">
                Explore selected work <span aria-hidden="true">→</span>
              </Link>
              <Link className={ui.buttonSecondary} href="/contact">
                Let&apos;s work together
              </Link>
            </div>
            <dl className="mt-10 grid max-w-[510px] grid-cols-2 gap-5 border-t border-border pt-5">
              <div>
                <dt className={ui.eyebrow}>BASED IN</dt>
                <dd className="mt-1.5 text-sm font-bold tracking-[-0.02em]">
                  Oslo, Norway
                </dd>
              </div>
              <div>
                <dt className={ui.eyebrow}>CURRENT FOCUS</dt>
                <dd className="mt-1.5 text-sm font-bold tracking-[-0.02em]">
                  Product engineering
                </dd>
              </div>
            </dl>
          </div>
          <div className="w-full max-w-[340px] md:max-w-[390px] md:justify-self-end">
            <ProfilePhoto />
            <p className="mt-3 text-xs leading-6 text-muted">
              Data Engineering student at OsloMet, building products alongside
              my studies.
            </p>
          </div>
        </div>
      </section>

      <section className={ui.section} aria-labelledby="featured-title">
        <div className={ui.container}>
          <div className={ui.sectionHeading}>
            <div>
              <p className={`${ui.eyebrow} mb-4`}>SELECTED WORK</p>
              <h2 className={ui.sectionTitle} id="featured-title">
                Products built for real needs.
              </h2>
            </div>
            <Link className={ui.textLink} href="/projects">
              Browse all projects <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={ui.projectGrid}>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          {otherProjects.length > 0 && (
            <div className="mt-12">
              <div className="mb-5 flex items-center justify-between gap-5">
                <p className={ui.eyebrow}>MORE PROJECTS</p>
                <span className="text-xs text-subtle">
                  University work and independent experiments
                </span>
              </div>
              <div className={ui.projectGridSecondary}>
                {otherProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} compact />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {experience && (
        <section
          className={`${ui.section} bg-surface/55`}
          aria-labelledby="experience-title"
        >
          <div className={`${ui.container} ${ui.twoColumn}`}>
            <div>
              <p className={`${ui.eyebrow} mb-4`}>PROFESSIONAL EXPERIENCE</p>
              <h2 className={ui.sectionTitle} id="experience-title">
                Learning through real-world delivery.
              </h2>
              <p className={`${ui.sectionCopy} mt-5 mb-6`}>
                Alongside my studies, I contribute to product and software
                development at FixTech AS.
              </p>
              <Link className={ui.textLink} href="/experience">
                View experience <span aria-hidden="true">→</span>
              </Link>
            </div>
            <article className={`${ui.card} p-6 shadow-sm`}>
              <p className={ui.eyebrow}>DECEMBER 2025 — PRESENT</p>
              <h3 className="mt-4 text-2xl leading-tight font-bold tracking-[-0.045em]">
                {experience.role}
              </h3>
              <p className="mt-2 text-sm font-bold text-foreground">
                {experience.organization}
              </p>
              <p className={`${ui.sectionCopy} mt-4`}>{experience.summary}</p>
            </article>
          </div>
        </section>
      )}

      <section className={ui.section} aria-labelledby="activities-title">
        <div className={ui.container}>
          <div className={ui.sectionHeading}>
            <div>
              <p className={`${ui.eyebrow} mb-4`}>COMMUNITY &amp; LEARNING</p>
              <h2 className={ui.sectionTitle} id="activities-title">
                Learning beyond the classroom.
              </h2>
            </div>
            <Link className={ui.textLink} href="/events">
              View all activities <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid gap-4">
            {events.map((event) => (
              <article
                className={`${ui.card} flex flex-col overflow-hidden md:flex-row`}
                key={event.slug}
              >
                {event.images[0] && (
                  <figure className="relative aspect-[11/5] w-full shrink-0 bg-surface md:aspect-[8/5] md:w-[240px]">
                    <Image
                      src={event.images[0].src}
                      alt={event.images[0].alt}
                      className="object-contain p-2"
                      fill
                      sizes="(min-width: 768px) 34vw, 100vw"
                    />
                  </figure>
                )}
                <div className="flex min-w-0 flex-1 flex-col p-4 md:p-5">
                  <p className={ui.eyebrow}>{event.type}</p>
                  <h3 className="mt-2 text-lg leading-tight font-bold tracking-[-0.04em]">
                    {event.name}
                  </h3>
                  <p className="mt-1.5 text-xs font-semibold text-muted">
                    {event.organization}
                  </p>
                  {event.images[0]?.caption && (
                    <p className="mt-3 text-xs font-semibold text-muted">
                      {event.images[0].caption}
                    </p>
                  )}
                  <p className="mt-3 max-w-[720px] text-[13px] leading-6 text-muted">
                    {event.description}
                  </p>
                  {event.relatedProjectSlug && (
                    <Link
                      className={`${ui.textLink} mt-4 self-start`}
                      href={`/projects/${event.relatedProjectSlug}`}
                    >
                      Related project <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`${ui.section} bg-surface/55`}
        aria-labelledby="interests-title"
      >
        <div
          className={`${ui.container} grid gap-7 md:grid-cols-[0.8fr_1.2fr] md:items-start md:gap-16`}
        >
          <div>
            <p className={`${ui.eyebrow} mb-4`}>AREAS OF INTEREST</p>
            <h2 className={ui.sectionTitle} id="interests-title">
              A broad technical foundation.
            </h2>
          </div>
          <TagList variant="interest" items={interests} />
        </div>
      </section>

      <section
        className="border-t border-border py-14 md:py-20"
        aria-labelledby="contact-title"
      >
        <div className={`${ui.container} ${ui.twoColumn}`}>
          <div>
            <p className={`${ui.eyebrow} mb-4`}>LET&apos;S CONNECT</p>
            <h2 className={ui.sectionTitle} id="contact-title">
              Have a project or opportunity in mind?
            </h2>
          </div>
          <div>
            <p className={ui.sectionCopy}>
              I&apos;m always open to thoughtful conversations about software,
              data, and product ideas.
            </p>
            <Link className={`${ui.buttonPrimary} mt-6`} href="/contact">
              Get in touch <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className={`${ui.container} ${ui.loading}`}>
          Loading portfolio…
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
