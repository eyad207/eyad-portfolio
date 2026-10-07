import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro } from "@/components/page-intro";
import { ProjectBrowser } from "@/components/project-browser";
import { getPortfolioData } from "@/lib/portfolio-repository";

export const metadata: Metadata = {
  title: "Projects | Eyad Lazkani",
  description: "Selected software and product projects by Eyad Lazkani.",
};

async function ProjectsContent() {
  const { projects } = await getPortfolioData();

  return <ProjectBrowser projects={projects} />;
}

export default function ProjectsPage() {
  return (
    <main className="container page-main">
      <PageIntro
        eyebrow="PROJECTS"
        title="Work I’ve built and worked on."
        description="A selection of software and product projects, from startup work to university applications. Search or filter to explore."
      />
      <Suspense fallback={<p className="loading-state">Loading projects…</p>}>
        <ProjectsContent />
      </Suspense>
    </main>
  );
}
