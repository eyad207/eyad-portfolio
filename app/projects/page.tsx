import type { Metadata } from "next";
import { Suspense } from "react";
import { PageIntro } from "@/components/page-intro";
import { ProjectBrowser } from "@/components/project-browser";
import { getPortfolioData } from "@/lib/portfolio-repository";
import { ui } from "@/lib/ui";

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
    <main className={ui.pageMain}>
      <PageIntro
        eyebrow="PROJECTS"
        title="Selected work, built with purpose."
        description="A selection of product, startup, and university projects. Each case study covers the problem, the work, and the technology behind it."
      />
      <Suspense fallback={<p className={ui.loading}>Loading projects…</p>}>
        <ProjectsContent />
      </Suspense>
    </main>
  );
}
