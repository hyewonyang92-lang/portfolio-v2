import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectHero from "@/components/ProjectHero";
import ContentModules from "@/components/ContentModules";
import ProjectGallery from "@/components/ProjectGallery";
import NextProject from "@/components/NextProject";
import ScrollReveal from "@/components/ScrollReveal";
import { getAdjacentProject, getProjectBySlug, projects } from "@/data/projects";
import { tagClass } from "@/lib/pill";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: `${project.title} — Yang Hyewon` };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const next = getAdjacentProject(slug);

  return (
    <div>
      <ProjectHero project={project} />
      <ContentModules modules={project.content} />

      <section className="container-editorial pb-24 md:pb-32">
        <ScrollReveal>
          <span className={tagClass("mb-8 inline-flex")}>Gallery</span>
          <ProjectGallery tones={project.gallery} />
        </ScrollReveal>
      </section>

      <NextProject project={next} />
    </div>
  );
}
