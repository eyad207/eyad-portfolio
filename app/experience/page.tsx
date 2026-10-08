import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro } from "@/components/page-intro";
import { TagList } from "@/components/tag-list";
import { formatDateRange } from "@/lib/date-format";
import { getPortfolioData } from "@/lib/portfolio-repository";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Experience | Eyad Lazkani",
  description: "Professional software development experience of Eyad Lazkani.",
};

async function ExperienceContent() {
  const { experiences } = await getPortfolioData();

  return (
    <div className={ui.timeline}>
      {experiences.map((experience) => (
        <article className={ui.timelineEntry} key={experience.slug}>
          <div className={ui.timelineDate}>
            {formatDateRange(experience.startDate, experience.endDate)}
          </div>
          <div>
            <p className={`${ui.eyebrow} mb-2`}>{experience.organization}</p>
            <h2 className={ui.blockTitle}>{experience.role}</h2>
            <p className={`${ui.sectionCopy} mt-[9px]`}>{experience.summary}</p>
            {experience.responsibilities.length > 0 && (
              <ul className={`${ui.detailList} mt-[15px]`}>
                {experience.responsibilities.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
            {experience.technologies.length > 0 && (
              <TagList
                className="mt-[18px]"
                items={experience.technologies}
                label="Technologies"
              />
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export default function ExperiencePage() {
  return (
    <main className={ui.pageMain}>
      <PageIntro
        eyebrow="EXPERIENCE"
        title="Professional experience."
        description="Work and responsibilities from professional roles."
      />
      <Suspense fallback={<p className={ui.loading}>Loading experience…</p>}>
        <ExperienceContent />
      </Suspense>
    </main>
  );
}
