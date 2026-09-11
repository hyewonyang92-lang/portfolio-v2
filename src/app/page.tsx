import Link from "next/link";
import HeroTypography from "@/components/HeroTypography";
import ProjectShowcase from "@/components/ProjectShowcase";
import ProjectIndex from "@/components/ProjectIndex";
import ScrollReveal from "@/components/ScrollReveal";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <HeroTypography />

      <section className="container-editorial py-24 md:py-40">
        <ScrollReveal>
          <div className="grid-editorial">
            <p className="text-h2 col-span-4 md:col-span-6 lg:col-span-8">
              I design digital products that feel clear, considered, and
              quietly confident — where every process, from research to
              interface, is treated with the same care.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="flex flex-col gap-24 py-8 md:gap-40 md:py-16">
        <div className="container-editorial">
          <ScrollReveal>
            <span className="text-meta text-[var(--color-text-secondary)]">
              SELECTED WORK
            </span>
          </ScrollReveal>
        </div>

        {projects.map((project, i) => (
          <div key={project.slug} className="container-editorial">
            <ProjectShowcase project={project} featured={i === 0} />
          </div>
        ))}
      </section>

      <section className="container-editorial py-24 md:py-40">
        <ScrollReveal>
          <span className="text-meta mb-10 block text-[var(--color-text-secondary)]">
            PROJECT INDEX
          </span>
        </ScrollReveal>
        <ProjectIndex projects={projects} />
      </section>

      <section className="container-editorial py-24 md:py-40">
        <div className="grid-editorial items-center">
          <ScrollReveal className="col-span-4 md:col-span-6 lg:col-span-8">
            <span className="text-meta mb-6 block text-[var(--color-text-secondary)]">
              INFORMATION
            </span>
            <p className="text-h2">
              UI/UX designer based in Seoul, working across product design,
              design systems, and digital experience.
            </p>
          </ScrollReveal>
          <ScrollReveal
            delay={0.1}
            className="col-span-4 mt-8 md:col-span-2 md:mt-0 lg:col-span-4"
          >
            <Link href="/information" className="text-meta inline-block border-b border-[var(--color-text)] pb-1">
              MORE INFORMATION →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] py-24 md:py-40">
        <div className="container-editorial">
          <ScrollReveal>
            <a href="mailto:hyewonyang92@gmail.com" className="group block">
              <span className="text-meta mb-6 block text-[var(--color-text-secondary)]">
                CONTACT
              </span>
              <h2 className="text-display uppercase transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-3">
                Let&apos;s work
                <br />
                together.
              </h2>
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
