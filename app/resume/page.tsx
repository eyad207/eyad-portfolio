import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageIntro } from "@/components/page-intro";
import { TagList } from "@/components/tag-list";
import { formatDateRange } from "@/lib/date-format";
import { siteConfig } from "@/lib/site-config";
import { getPortfolioData } from "@/lib/portfolio-repository";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Resume | Eyad Lazkani",
  description: "Web resume for Eyad Lazkani, Data Engineering student and software developer.",
};

const interests = [
  "Full-stack development",
  "AI and LLMs",
  "Data-driven applications",
  "Cybersecurity",
  "Product development",
];

const section =
  "grid gap-3.5 border-t border-border py-6 pb-[26px] md:grid-cols-[minmax(190px,0.55fr)_minmax(0,1fr)] md:gap-[45px] md:pt-[29px] md:pb-[31px]";
const sectionTitle = "text-base font-[560] tracking-[-0.025em]";
const entryTitle = "text-sm font-[550]";
const entryText = "mt-1.5 text-[11px] leading-[1.7] text-muted";

async function ResumeContent() {
  const { projects, experiences, events } = await getPortfolioData();
  const projectTechnologies = [
    ...new Set(
      projects
        .filter((project) => !project.technologyHeading)
        .flatMap((project) => project.technologies),
    ),
  ];

  return (
    <main className={ui.pageMain}>
      <div className="flex flex-col items-start md:flex-row md:items-end md:justify-between md:gap-[25px]">
        <PageIntro
          className="mb-[13px] md:mb-[34px]"
          eyebrow="RESUME"
          title="Eyad Lazkani"
          description="Data Engineering student / Software Developer"
        />
        {siteConfig.cv && (
          <a className={ui.buttonPrimary} href={siteConfig.cv}>
            Download CV <span aria-hidden="true">↓</span>
          </a>
        )}
      </div>

      <section className={section} aria-labelledby="resume-education">
        <h2 className={sectionTitle} id="resume-education">Education</h2>
        <div>
          <h3 className={entryTitle}>Bachelor in Data Engineering</h3>
          <p className={entryText}>OsloMet · 2024–2027 · Expected graduation: June 2027</p>
          <p className={entryText}>Currently in my third year.</p>
        </div>
      </section>

      <section className={section} aria-labelledby="resume-experience">
        <h2 className={sectionTitle} id="resume-experience">Experience</h2>
        {experiences.map((experience) => (
          <div key={experience.slug}>
            <h3 className={entryTitle}>{experience.role}</h3>
            <p className={entryText}>
              {experience.organization} ·{" "}
              {formatDateRange(experience.startDate, experience.endDate)}
            </p>
            <p className={entryText}>{experience.summary}</p>
            <ul className={`${ui.detailList} mt-[11px]`}>
              {experience.responsibilities.map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className={section} aria-labelledby="resume-projects">
        <h2 className={sectionTitle} id="resume-projects">Projects</h2>
        <div className="grid gap-5">
          {projects.map((project) => (
            <article key={project.slug}>
              <h3 className={entryTitle}>
                <Link
                  className="transition-colors hover:text-accent"
                  href={`/projects/${project.slug}`}
                >
                  {project.name}
                </Link>
              </h3>
              <p className={entryText}>{project.summary}</p>
              <TagList className="mt-[11px]" items={project.technologies} />
            </article>
          ))}
        </div>
      </section>

      <section className={section} aria-labelledby="resume-skills">
        <h2 className={sectionTitle} id="resume-skills">Skills &amp; technical focus</h2>
        <div className="grid gap-[19px]">
          <div>
            <h3 className="mb-[9px] text-[11px] font-medium text-muted">
              Technologies in project work
            </h3>
            <TagList items={projectTechnologies} />
          </div>
          <div>
            <h3 className="mb-[9px] text-[11px] font-medium text-muted">
              Areas of interest
            </h3>
            <TagList variant="interest" items={interests} />
          </div>
        </div>
      </section>

      <section className={section} aria-labelledby="resume-activities">
        <h2 className={sectionTitle} id="resume-activities">Programs &amp; activities</h2>
        <ul className="grid list-disc gap-2 pl-[17px] text-[11px] leading-[1.7] text-muted">
          {events.map((event) => (
            <li key={event.slug}>
              <span className="font-medium text-foreground">{event.name}</span> —{" "}
              {event.organization} · {event.type}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default function ResumePage() {
  return (
    <Suspense
      fallback={
        <main className={ui.pageMain}>
          <p className={ui.loading}>Loading resume…</p>
        </main>
      }
    >
      <ResumeContent />
    </Suspense>
  );
}
