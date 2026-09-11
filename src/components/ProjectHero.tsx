import type { Project } from "@/types/project";
import ProjectVisual from "./ProjectVisual";
import ScrollReveal from "./ScrollReveal";

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-10 pt-[72px] md:pt-[88px]">
      <div className="container-editorial flex flex-col gap-6 pt-16 md:pt-24">
        <span className="text-meta text-[var(--color-text-secondary)]">
          {project.number} / 07
        </span>
        <h1 className="text-display uppercase">{project.title}</h1>
        <div className="flex gap-8">
          <span className="text-meta text-[var(--color-text-secondary)]">
            {project.category}
          </span>
          <span className="text-meta text-[var(--color-text-secondary)]">
            {project.year}
          </span>
        </div>
      </div>

      <ScrollReveal>
        <ProjectVisual tone={project.tone} ratio="aspect-[16/9]" />
      </ScrollReveal>
    </div>
  );
}
