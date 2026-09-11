import type { Metadata } from "next";
import ProjectIndex from "@/components/ProjectIndex";
import ScrollReveal from "@/components/ScrollReveal";
import { projects } from "@/data/projects";
import { tagClass } from "@/lib/pill";

export const metadata: Metadata = {
  title: "Work — Yang Hyewon",
};

export default function WorkPage() {
  return (
    <div className="pb-24 md:pt-[88px] md:pb-0">
      <section className="container-editorial pt-16 pb-16 md:pt-24 md:pb-24">
        <ScrollReveal>
          <span className={tagClass("mb-4 inline-flex")}>Work</span>
          <p className="text-body max-w-xl">
            Selected projects &amp; archive.
          </p>
        </ScrollReveal>
      </section>

      <section className="container-editorial pb-24 md:pb-40">
        <ProjectIndex projects={projects} />
      </section>
    </div>
  );
}
