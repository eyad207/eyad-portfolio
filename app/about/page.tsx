import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProfilePhoto } from "@/components/profile-photo";
import { getPortfolioData } from "@/lib/portfolio-repository";

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
    <main className="container page-main">
      <section className="about-hero">
        <div>
          <p className="eyebrow">ABOUT</p>
          <h1>Eyad Lazkani</h1>
          <p className="about-role">Data Engineering student / Software Developer</p>
          <p className="page-intro-description">
            I’m a third-year Data Engineering student at OsloMet who builds
            software and works on product ideas alongside my studies. I’m
            especially interested in practical web products and how data and
            technology can support them.
          </p>
        </div>
        <ProfilePhoto />
      </section>

      <section className="about-block section-border" aria-labelledby="education-heading">
        <div className="about-block-label">
          <p className="eyebrow">EDUCATION</p>
          <h2 id="education-heading">What I’m studying</h2>
        </div>
        <div className="about-block-content">
          <h3>Bachelor in Data Engineering</h3>
          <p>OsloMet · 2024–2027 · Expected graduation: June 2027</p>
          <p>Currently in my third year.</p>
        </div>
      </section>

      <section className="about-block section-border" aria-labelledby="story-heading">
        <div className="about-block-label">
          <p className="eyebrow">MY APPROACH</p>
          <h2 id="story-heading">Learning by building</h2>
        </div>
        <div className="about-block-content">
          <p>
            Data Engineering gives me a foundation for thinking about data and
            systems. Alongside my degree, I’ve built web applications for real
            use cases and kept developing PickBox, a product idea focused on
            surplus food.
          </p>
          <p>
            I like moving between implementation and the problem a product is
            trying to solve—whether that means building a feature, improving a
            workflow, or learning more about the people who might use it.
          </p>
          <p>
            Programs and events such as Pangstart and technology career events
            have also given me opportunities to learn from other builders and
            people working in technology.
          </p>
        </div>
      </section>

      <section className="about-block section-border" aria-labelledby="interests-heading">
        <div className="about-block-label">
          <p className="eyebrow">INTERESTS</p>
          <h2 id="interests-heading">Areas I’m curious about</h2>
        </div>
        <ul className="interest-list about-interests">
          {interests.map((interest) => <li key={interest}>{interest}</li>)}
        </ul>
      </section>

      <section className="about-block section-border" aria-labelledby="technology-heading">
        <div className="about-block-label">
          <p className="eyebrow">TECHNICAL EXPERIENCE</p>
          <h2 id="technology-heading">Technologies in project work</h2>
        </div>
        <ul className="tag-list detail-tags">
          {projectTechnologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </section>

      <section className="about-block section-border" aria-labelledby="work-heading">
        <div className="about-block-label">
          <p className="eyebrow">WORK &amp; ACTIVITIES</p>
          <h2 id="work-heading">A snapshot</h2>
        </div>
        <div className="about-block-content about-link-list">
          <Link href="/experience">
            Professional experience <span>{experiences.length}</span>
          </Link>
          <Link href="/projects">
            Projects <span>{projects.length}</span>
          </Link>
          <Link href="/events">
            Programs and activities <span>{events.length}</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<main className="container page-main"><p className="loading-state">Loading about page…</p></main>}>
      <AboutContent />
    </Suspense>
  );
}
