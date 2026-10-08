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
        className={`${ui.container} grid items-center gap-[34px] pt-[58px] pb-[52px] md:min-h-[500px] md:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.72fr)] md:gap-[45px] lg:min-h-[570px] lg:gap-[86px] lg:pt-[60px] lg:pb-[70px]`}
        aria-labelledby="intro-title"
      >
        <div className="py-4">
          <p className={`${ui.eyebrow} mb-3.5`}>
            DATA ENGINEERING STUDENT / SOFTWARE DEVELOPER
          </p>
          <h1 className={ui.heroTitle} id="intro-title">
            Hello, I'm
          </h1>
          <h1 className={`${ui.heroTitle} text-blue-700`}>Eyad Lazkani</h1>
          <p className={`${ui.introDescription} mt-[22px] md:text-[15px]`}>
            I study Data Engineering at OsloMet and build web products alongside
            my studies—from software for a real business to PickBox, a product I
            continue developing to help reduce food waste.
          </p>
          <div className="mt-[27px] flex flex-wrap items-center gap-[11px]">
            <Link className={ui.buttonPrimary} href="/projects">
              Explore projects <span aria-hidden="true">→</span>
            </Link>
            <Link className={ui.buttonSecondary} href="/contact">
              Contact me
            </Link>
          </div>
          <p className="mt-6 text-[11px] text-subtle">
            OsloMet · Data Engineering
          </p>
        </div>
        <div className="w-full max-w-[300px] md:max-w-[356px] md:justify-self-end">
          <ProfilePhoto />
          <p className="mt-[9px] font-mono text-[9px] text-subtle">
            Data Engineering · Software · Products
          </p>
        </div>
      </section>

      <section className={ui.section} aria-labelledby="featured-title">
        <div className={ui.container}>
          <div className={ui.sectionHeading}>
            <div>
              <p className={`${ui.eyebrow} mb-3.5`}>SELECTED WORK</p>
              <h2 className={ui.sectionTitle} id="featured-title">
                Featured projects
              </h2>
            </div>
            <Link className={ui.textLink} href="/projects">
              All projects <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={ui.projectGrid}>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          {otherProjects.length > 0 && (
            <div className="mt-[34px]">
              <p className={`${ui.eyebrow} mb-3`}>MORE PROJECTS</p>
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
        <section className={ui.section} aria-labelledby="experience-title">
          <div className={`${ui.container} ${ui.twoColumn}`}>
            <div>
              <p className={`${ui.eyebrow} mb-3.5`}>PROFESSIONAL EXPERIENCE</p>
              <h2 className={ui.sectionTitle} id="experience-title">
                Building in a real-world setting.
              </h2>
              <p className={`${ui.sectionCopy} mt-[15px] mb-[19px]`}>
                Alongside my studies, I work on software and product
                functionality at FixTech AS.
              </p>
              <Link className={ui.textLink} href="/experience">
                View experience <span aria-hidden="true">→</span>
              </Link>
            </div>
            <article className="border-l-2 border-[#d8e3fb] pl-5">
              <div className="font-mono text-[9px] tracking-[0.03em] text-subtle">
                DECEMBER 2025 — PRESENT
              </div>
              <h3 className="mt-2.5 text-lg font-[550] tracking-[-0.035em]">
                {experience.role}
              </h3>
              <p className="mt-0.5 text-xs leading-[1.75] text-foreground">
                {experience.organization}
              </p>
              <p className="mt-[9px] text-xs leading-[1.75] text-muted">
                {experience.summary}
              </p>
            </article>
          </div>
        </section>
      )}

      <section className={ui.section} aria-labelledby="activities-title">
        <div className={ui.container}>
          <div className={ui.sectionHeading}>
            <div>
              <p className={`${ui.eyebrow} mb-3.5`}>
                PROGRAMS &amp; CAREER ACTIVITIES
              </p>
              <h2 className={ui.sectionTitle} id="activities-title">
                Learning beyond the classroom
              </h2>
            </div>
            <Link className={ui.textLink} href="/events">
              All activities <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="border-t border-border">
            {events.map((event) => (
              <article
                className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 border-b border-border py-3.5 md:grid-cols-[minmax(145px,0.5fr)_minmax(0,1.2fr)_minmax(140px,0.5fr)] md:gap-5 md:py-[17px]"
                key={event.slug}
              >
                <span className="col-span-full text-[11px] text-subtle md:col-auto">
                  {event.type}
                </span>
                <div>
                  <h3 className="text-[15px] font-[550] tracking-[-0.025em]">
                    {event.name}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-muted">
                    {event.organization}
                  </p>
                </div>
                {event.relatedProjectSlug && (
                  <Link
                    className={`${ui.textLink} col-span-full mt-1.5 justify-self-start md:col-auto md:mt-0 md:justify-self-end`}
                    href={`/projects/${event.relatedProjectSlug}`}
                  >
                    Related project <span aria-hidden="true">→</span>
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={ui.section} aria-labelledby="interests-title">
        <div
          className={`${ui.container} grid gap-[23px] md:grid-cols-[0.8fr_1.2fr] md:gap-[42px] lg:gap-[70px]`}
        >
          <div>
            <p className={`${ui.eyebrow} mb-3.5`}>AREAS I’M INTERESTED IN</p>
            <h2 className={ui.sectionTitle} id="interests-title">
              Technical focus
            </h2>
          </div>
          <TagList variant="interest" items={interests} />
        </div>
      </section>

      <section
        className="border-t border-border py-[50px] md:pt-[61px] md:pb-[66px]"
        aria-labelledby="about-preview-title"
      >
        <div className={`${ui.container} ${ui.twoColumn}`}>
          <div>
            <p className={`${ui.eyebrow} mb-3.5`}>ABOUT</p>
            <h2 className={ui.sectionTitle} id="about-preview-title">
              Student, developer, product builder.
            </h2>
          </div>
          <div>
            <p className={`${ui.sectionCopy} mb-[19px]`}>
              I’m in my third year of a Bachelor in Data Engineering at OsloMet.
              I’m interested in how software, data, and product thinking come
              together to solve practical problems.
            </p>
            <Link className={ui.textLink} href="/about">
              More about me <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="border-t border-border bg-[#f8f9fb] py-[31px] md:py-[38px]"
        aria-labelledby="contact-title"
      >
        <div
          className={`${ui.container} flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between md:gap-[30px]`}
        >
          <div>
            <p className={`${ui.eyebrow} mb-[9px]`}>GET IN TOUCH</p>
            <h2
              className={`${ui.sectionTitle} max-w-[580px]`}
              id="contact-title"
            >
              Let’s talk!
            </h2>
          </div>
          <Link className={ui.buttonPrimary} href="/contact">
            Contact me <span aria-hidden="true">→</span>
          </Link>
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
