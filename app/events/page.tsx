import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { TagList } from "@/components/tag-list";
import { getPortfolioData } from "@/lib/portfolio-repository";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Events & Activities | Eyad Lazkani",
  description: "Startup programs and professional technology and career activities.",
};

async function EventsContent() {
  const { events, projects } = await getPortfolioData();

  return (
    <main className={ui.pageMain}>
      <PageIntro
        eyebrow="EVENTS & ACTIVITIES"
        title="Learning through people and practice."
        description="Startup programs, technology events, and career activities—separate from my software projects and professional employment."
      />
      <div className={ui.timeline}>
        {events.map((event) => {
          const relatedProject = event.relatedProjectSlug
            ? projects.find((project) => project.slug === event.relatedProjectSlug)
            : undefined;

          return (
            <article className={ui.timelineEntry} key={event.slug}>
              <div className={ui.timelineDate}>{event.dateLabel ?? event.type}</div>
              <div>
                <p className={`${ui.eyebrow} mb-2`}>{event.organization}</p>
                <h2 className={ui.blockTitle}>{event.name}</h2>
                <p className={`${ui.sectionCopy} mt-[9px]`}>{event.description}</p>
                {event.images.length > 0 && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {event.images.map((image) => (
                      <figure className={`${ui.card} overflow-hidden`} key={image.src}>
                        <Image
                          className="aspect-[16/10] w-full object-cover"
                          src={image.src}
                          alt={image.alt}
                          width={1200}
                          height={800}
                        />
                        <figcaption className="border-t border-border px-3.5 py-3 text-[11px] text-muted">
                          {image.caption ?? `A moment from ${event.name}.`}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}
                {event.topics.length > 0 && (
                  <div className="mt-[21px]">
                    <h3 className="mb-[9px] text-xs font-[550] text-foreground">
                      Topics and activities
                    </h3>
                    <TagList items={event.topics} />
                  </div>
                )}
                {event.learning && event.learning.length > 0 && (
                  <div className="mt-[21px]">
                    <h3 className="mb-[9px] text-xs font-[550] text-foreground">
                      What I took from it
                    </h3>
                    <ul className={ui.detailList}>
                      {event.learning.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                )}
                {event.people && event.people.length > 0 && (
                  <div className="mt-[19px] grid gap-0.5">
                    {event.people.map((group) => (
                      <p className="text-[11px] text-muted" key={group.role}>
                        <span className="font-medium text-foreground">{group.role}:</span>{" "}
                        {group.names.join(", ")}
                      </p>
                    ))}
                  </div>
                )}
                {relatedProject && (
                  <Link
                    className={`${ui.textLink} mt-5`}
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
    <Suspense
      fallback={
        <main className={ui.pageMain}>
          <p className={ui.loading}>Loading events…</p>
        </main>
      }
    >
      <EventsContent />
    </Suspense>
  );
}
