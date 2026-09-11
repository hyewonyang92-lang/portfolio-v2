import type { Metadata } from "next";
import ProjectIndex from "@/components/ProjectIndex";
import ScrollReveal from "@/components/ScrollReveal";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work — Yang Hyewon",
};

export default function WorkPage() {
  return (
    <div className="pt-[72px] md:pt-[88px]">
      <section className="container-editorial pt-16 pb-16 md:pt-24 md:pb-24">
        <ScrollReveal>
          <h1 className="text-display uppercase">
            Work
            <br />
            Selected Projects
            <br />
            &amp; Archive
          </h1>
        </ScrollReveal>
      </section>

      <section className="container-editorial pb-24 md:pb-40">
        <ProjectIndex projects={projects} />
      </section>
    </div>
  );
}
