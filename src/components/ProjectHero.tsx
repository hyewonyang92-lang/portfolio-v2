import type { Project } from "@/types/project";
import ProjectVisual from "./ProjectVisual";
import ScrollReveal from "./ScrollReveal";
import { tagClass } from "@/lib/pill";

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-10 pb-0 md:pt-[88px]">
      <div className="container-editorial flex flex-col gap-4 pt-16 md:pt-24">
        <span className="text-ui">{project.number} / 07</span>
        <span className={tagClass("w-fit")}>{project.title}</span>
        <div className="flex gap-2">
          <span className={tagClass()}>{project.category}</span>
          <span className={tagClass()}>{project.year}</span>
        </div>
      </div>

      <ScrollReveal>
        <ProjectVisual tone={project.tone} ratio="aspect-[16/9]" />
      </ScrollReveal>
    </div>
  );
}
