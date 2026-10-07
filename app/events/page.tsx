import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { getPortfolioData } from "@/lib/portfolio-repository";

export const metadata: Metadata = {
  title: "Events & Activities | Eyad Lazkani",
  description: "Startup programs and professional technology and career activities.",
};

async function EventsContent() {
  const { events, projects } = await getPortfolioData();

  return (
    <main className="container page-main">
      <PageIntro
        eyebrow="EVENTS & ACTIVITIES"
        title="Learning through people and practice."
        description="Startup programs, technology events, and career activities—separate from my software projects and professional employment."
      />
      <div className="timeline activity-timeline">
        {events.map((event) => {
          const relatedProject = event.relatedProjectSlug
            ? projects.find((project) => project.slug === event.relatedProjectSlug)
            : undefined;

          return (
            <article className="timeline-entry" key={event.slug}>
              <div className="timeline-date">{event.dateLabel ?? event.type}</div>
              <div className="timeline-content">
                <p className="eyebrow">{event.organization}</p>
                <h2>{event.name}</h2>
                <p className="section-copy">{event.description}</p>
                {event.topics.length > 0 && (
                  <div className="event-detail-block">
                    <h3>Topics and activities</h3>
                    <ul className="tag-list">
                      {event.topics.map((topic) => <li key={topic}>{topic}</li>)}
                    </ul>
                  </div>
                )}
                {event.learning && event.learning.length > 0 && (
                  <div className="event-detail-block">
                    <h3>What I took from it</h3>
                    <ul className="detail-list">
                      {event.learning.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                )}
                {event.people && event.people.length > 0 && (
                  <div className="event-people">
                    {event.people.map((group) => (
                      <p key={group.role}>
                        <span>{group.role}:</span> {group.names.join(", ")}
                      </p>
                    ))}
                  </div>
                )}
                {relatedProject && (
                  <Link
                    className="text-link event-project-link"
                    href={`/projects/${relatedProject.slug}`}
                  >
                    Related project: {relatedProject.name}
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<main className="container page-main"><p className="loading-state">Loading events…</p></main>}>
      <EventsContent />
    </Suspense>
  );
}
