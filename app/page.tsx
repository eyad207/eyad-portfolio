import Link from "next/link";
import { Suspense } from "react";
import { ProfilePhoto } from "@/components/profile-photo";
import { ProjectCard } from "@/components/project-card";
import { getPortfolioData } from "@/lib/portfolio-repository";

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
      <section className="hero container" aria-labelledby="intro-title">
        <div className="hero-copy">
          <p className="eyebrow">DATA ENGINEERING STUDENT / SOFTWARE DEVELOPER</p>
          <h1 id="intro-title">
            Eyad Lazkani
            <span>Building software and products with purpose.</span>
          </h1>
          <p className="hero-description">
            I study Data Engineering at OsloMet and build web products alongside
            my studies—from software for a real business to PickBox, a product
            I continue developing to help reduce food waste.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/projects">
              Explore projects <span aria-hidden="true">→</span>
            </Link>
            <Link className="button button-secondary" href="/contact">
              Contact me
            </Link>
          </div>
          <p className="hero-location">OsloMet · Data Engineering</p>
        </div>
        <div className="hero-image-wrap">
          <ProfilePhoto />
          <p className="image-caption">Data Engineering · Software · Products</p>
        </div>
      </section>

      <section className="section section-border" aria-labelledby="featured-title">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SELECTED WORK</p>
              <h2 id="featured-title">Featured projects</h2>
            </div>
            <Link className="text-link" href="/projects">
              All projects <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          {otherProjects.length > 0 && (
            <div className="additional-projects">
              <p className="eyebrow">MORE PROJECTS</p>
              <div className="project-grid project-grid-secondary">
                {otherProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} compact />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {experience && (
        <section className="section section-border" aria-labelledby="experience-title">
          <div className="container home-two-column">
            <div>
              <p className="eyebrow">PROFESSIONAL EXPERIENCE</p>
              <h2 id="experience-title">Building in a real-world setting.</h2>
              <p className="section-copy">
                Alongside my studies, I work on software and product
                functionality at FixTech AS.
              </p>
              <Link className="text-link" href="/experience">
                View experience <span aria-hidden="true">→</span>
              </Link>
            </div>
            <article className="experience-preview">
              <div className="experience-date">DECEMBER 2025 — PRESENT</div>
              <h3>{experience.role}</h3>
              <p className="experience-organization">{experience.organization}</p>
              <p>{experience.summary}</p>
            </article>
          </div>
        </section>
      )}

      <section className="section section-border" aria-labelledby="activities-title">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PROGRAMS &amp; CAREER ACTIVITIES</p>
              <h2 id="activities-title">Learning beyond the classroom</h2>
            </div>
            <Link className="text-link" href="/events">
              All activities <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="activity-list">
            {events.map((event) => (
              <article className="activity-row" key={event.slug}>
                <span className="activity-type">{event.type}</span>
                <div>
                  <h3>{event.name}</h3>
                  <p>{event.organization}</p>
                </div>
                {event.relatedProjectSlug && (
                  <Link
                    className="text-link activity-link"
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

      <section className="section section-border" aria-labelledby="interests-title">
        <div className="container focus-layout">
          <div>
            <p className="eyebrow">AREAS I’M INTERESTED IN</p>
            <h2 id="interests-title">Technical focus</h2>
          </div>
          <ul className="interest-list">
            {interests.map((interest) => <li key={interest}>{interest}</li>)}
          </ul>
        </div>
      </section>

      <section className="about-preview section-border" aria-labelledby="about-preview-title">
        <div className="container home-two-column">
          <div>
            <p className="eyebrow">ABOUT</p>
            <h2 id="about-preview-title">Student, developer, product builder.</h2>
          </div>
          <div>
            <p className="section-copy">
              I’m in my third year of a Bachelor in Data Engineering at OsloMet.
              I’m interested in how software, data, and product thinking come
              together to solve practical problems.
            </p>
            <Link className="text-link" href="/about">
              More about me <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="contact-band" aria-labelledby="contact-title">
        <div className="container contact-band-inner">
          <div>
            <p className="eyebrow">GET IN TOUCH</p>
            <h2 id="contact-title">Let’s talk about what you’re building.</h2>
          </div>
          <Link className="button button-primary" href="/contact">
            Contact me <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="container loading-state">Loading portfolio…</div>}>
      <HomeContent />
    </Suspense>
  );
}
