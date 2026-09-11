import type { ContentModule } from "@/types/project";
import ProjectVisual from "./ProjectVisual";
import ScrollReveal from "./ScrollReveal";

export default function ContentModules({
  modules,
}: {
  modules: ContentModule[];
}) {
  return (
    <div className="flex flex-col gap-24 py-24 md:gap-32 md:py-32">
      {modules.map((mod, i) => {
        if (mod.type === "full-width-image") {
          return (
            <ScrollReveal key={i} className="container-editorial">
              <ProjectVisual tone={mod.tone} ratio="aspect-[16/9]" />
            </ScrollReveal>
          );
        }

        if (mod.type === "two-column-image") {
          return (
            <ScrollReveal key={i} className="container-editorial">
              <div className="grid-editorial">
                <div className="col-span-4 md:col-span-4 lg:col-span-6">
                  <ProjectVisual tone={mod.tones[0]} ratio="aspect-[4/5]" />
                </div>
                <div className="col-span-4 md:col-span-4 lg:col-span-6">
                  <ProjectVisual tone={mod.tones[1]} ratio="aspect-[4/5]" />
                </div>
              </div>
            </ScrollReveal>
          );
        }

        return (
          <ScrollReveal key={i} className="container-editorial">
            <div className="grid-editorial">
              <div className="col-span-4 md:col-span-2 lg:col-span-3">
                <span className="text-meta text-[var(--color-text-secondary)]">
                  {mod.heading}
                </span>
              </div>
              <p className="text-h2 col-span-4 max-w-2xl md:col-span-6 lg:col-span-9">
                {mod.body}
              </p>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
