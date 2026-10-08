import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProfilePhoto } from "@/components/profile-photo";
import { TagList } from "@/components/tag-list";
import { getPortfolioData } from "@/lib/portfolio-repository";
import { ui } from "@/lib/ui";

export const metadata: Metadata = {
  title: "About | Eyad Lazkani",
  description: "About Eyad Lazkani, a Data Engineering student and software developer.",
};

const interests = [
  "Software development",
  "Full-stack development",
  "AI and LLMs",
  "Data-driven applications",
  "Cybersecurity",
  "Building real-world products",
  "Entrepreneurship",
];

async function AboutContent() {
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
      <section className="grid items-center gap-[26px] pb-10 md:grid-cols-[minmax(0,1fr)_minmax(220px,300px)] md:gap-[75px] md:pb-[58px]">
        <div>
          <p className={`${ui.eyebrow} mb-3.5`}>ABOUT</p>
          <h1 className={ui.pageTitle}>Eyad Lazkani</h1>
          <p className="mt-2.5 text-base text-muted">
            Data Engineering student / Software Developer
          </p>
          <p className={`${ui.introDescription} mt-[18px]`}>
            I’m a third-year Data Engineering student at OsloMet who builds
            software and works on product ideas alongside my studies. I’m
            especially interested in practical web products and how data and
            technology can support them.
          </p>
        </div>
        <ProfilePhoto className="max-w-[300px] md:max-w-none" />
      </section>

      <section className={ui.splitBlock} aria-labelledby="education-heading">
        <div>
          <p className={`${ui.eyebrow} mb-3.5`}>EDUCATION</p>
          <h2 className={ui.blockTitle} id="education-heading">
            What I’m studying
          </h2>
        </div>
        <div>
          <h3 className="text-[15px] font-[550]">Bachelor in Data Engineering</h3>
          <p className={ui.blockParagraph}>
            OsloMet · 2024–2027 · Expected graduation: June 2027
          </p>
          <p className={ui.blockParagraph}>Currently in my third year.</p>
        </div>
      </section>

      <section className={ui.splitBlock} aria-labelledby="story-heading">
        <div>
          <p className={`${ui.eyebrow} mb-3.5`}>MY APPROACH</p>
          <h2 className={ui.blockTitle} id="story-heading">
            Learning by building
          </h2>
        </div>
        <div>
          <p className={ui.blockParagraph}>
            Data Engineering gives me a foundation for thinking about data and
            systems. Alongside my degree, I’ve built web applications for real
            use cases and kept developing PickBox, a product idea focused on
            surplus food.
          </p>
          <p className={ui.blockParagraph}>
            I like moving between implementation and the problem a product is
            trying to solve—whether that means building a feature, improving a
            workflow, or learning more about the people who might use it.
          </p>
          <p className={ui.blockParagraph}>
            Programs and events such as Pangstart and technology career events
            have also given me opportunities to learn from other builders and
            people working in technology.
          </p>
        </div>
      </section>

      <section className={ui.splitBlock} aria-labelledby="interests-heading">
        <div>
          <p className={`${ui.eyebrow} mb-3.5`}>INTERESTS</p>
          <h2 className={ui.blockTitle} id="interests-heading">
            Areas I’m curious about
          </h2>
        </div>
        <TagList className="content-start" variant="interest" items={interests} />
      </section>

      <section className={ui.splitBlock} aria-labelledby="technology-heading">
        <div>
          <p className={`${ui.eyebrow} mb-3.5`}>TECHNICAL EXPERIENCE</p>
          <h2 className={ui.blockTitle} id="technology-heading">
            Technologies in project work
          </h2>
        </div>
        <TagList items={projectTechnologies} />
      </section>

      <section className={ui.splitBlock} aria-labelledby="work-heading">
        <div>
          <p className={`${ui.eyebrow} mb-3.5`}>WORK &amp; ACTIVITIES</p>
          <h2 className={ui.blockTitle} id="work-heading">
            A snapshot
          </h2>
        </div>
        <div className="grid">
          {[
            { href: "/experience", label: "Professional experience", count: experiences.length },
            { href: "/projects", label: "Projects", count: projects.length },
            { href: "/events", label: "Programs and activities", count: events.length },
          ].map(({ href, label, count }) => (
            <Link
              className="flex justify-between gap-4 border-b border-border py-[9px] text-xs transition-colors first:pt-0 hover:text-accent"
              href={href}
              key={href}
            >
              {label} <span className="text-subtle">{count}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function AboutPage() {
  return (
    <Suspense
      fallback={
        <main className={ui.pageMain}>
          <p className={ui.loading}>Loading about page…</p>
        </main>
      }
    >
      <AboutContent />
    </Suspense>
  );
}
