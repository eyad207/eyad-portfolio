import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageIntro } from "@/components/page-intro";
import { formatDateRange } from "@/lib/date-format";
import { siteConfig } from "@/lib/site-config";
import { getPortfolioData } from "@/lib/portfolio-repository";

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
    <main className="container page-main resume-page">
      <div className="resume-topline">
        <PageIntro
          eyebrow="RESUME"
          title="Eyad Lazkani"
          description="Data Engineering student / Software Developer"
        />
        {siteConfig.cv && (
          <a className="button button-primary" href={siteConfig.cv}>
            Download CV <span aria-hidden="true">↓</span>
          </a>
        )}
      </div>

      <section className="resume-section section-border" aria-labelledby="resume-education">
        <h2 id="resume-education">Education</h2>
        <div className="resume-entry">
          <h3>Bachelor in Data Engineering</h3>
          <p>OsloMet · 2024–2027 · Expected graduation: June 2027</p>
          <p>Currently in my third year.</p>
        </div>
      </section>

      <section className="resume-section section-border" aria-labelledby="resume-experience">
        <h2 id="resume-experience">Experience</h2>
        {experiences.map((experience) => (
          <div className="resume-entry" key={experience.slug}>
            <h3>{experience.role}</h3>
            <p>
              {experience.organization} ·{" "}
              {formatDateRange(experience.startDate, experience.endDate)}
            </p>
            <p>{experience.summary}</p>
            <ul className="detail-list">
              {experience.responsibilities.map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="resume-section section-border" aria-labelledby="resume-projects">
        <h2 id="resume-projects">Projects</h2>
        <div className="resume-project-list">
          {projects.map((project) => (
            <article className="resume-entry" key={project.slug}>
              <h3><Link href={`/projects/${project.slug}`}>{project.name}</Link></h3>
              <p>{project.summary}</p>
              <ul className="tag-list">
                {project.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section section-border" aria-labelledby="resume-skills">
        <h2 id="resume-skills">Skills &amp; technical focus</h2>
        <div className="resume-skill-groups">
          <div>
            <h3>Technologies in project work</h3>
            <ul className="tag-list">
              {projectTechnologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Areas of interest</h3>
            <ul className="interest-list">
              {interests.map((interest) => <li key={interest}>{interest}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="resume-section section-border" aria-labelledby="resume-activities">
        <h2 id="resume-activities">Programs &amp; activities</h2>
        <ul className="resume-activity-list">
          {events.map((event) => (
            <li key={event.slug}>
              <span>{event.name}</span> — {event.organization} · {event.type}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default function ResumePage() {
  return (
    <Suspense fallback={<main className="container page-main"><p className="loading-state">Loading resume…</p></main>}>
      <ResumeContent />
    </Suspense>
  );
}
