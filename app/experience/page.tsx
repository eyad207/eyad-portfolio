import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro } from "@/components/page-intro";
import { formatDateRange } from "@/lib/date-format";
import { getPortfolioData } from "@/lib/portfolio-repository";

export const metadata: Metadata = {
  title: "Experience | Eyad Lazkani",
  description: "Professional software development experience of Eyad Lazkani.",
};

async function ExperienceContent() {
  const { experiences } = await getPortfolioData();

  return (
    <div className="timeline">
        {experiences.map((experience) => (
          <article className="timeline-entry" key={experience.slug}>
            <div className="timeline-date">
              {formatDateRange(experience.startDate, experience.endDate)}
            </div>
            <div className="timeline-content">
              <p className="eyebrow">{experience.organization}</p>
              <h2>{experience.role}</h2>
              <p className="section-copy">{experience.summary}</p>
              {experience.responsibilities.length > 0 && (
                <ul className="detail-list">
                  {experience.responsibilities.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
              {experience.technologies.length > 0 && (
                <ul className="tag-list experience-tags" aria-label="Technologies">
                  {experience.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <main className="container page-main">
      <PageIntro
        eyebrow="EXPERIENCE"
        title="Professional experience."
        description="Work and responsibilities from professional roles."
      />
      <Suspense fallback={<p className="loading-state">Loading experience…</p>}>
        <ExperienceContent />
      </Suspense>
    </main>
  );
}
