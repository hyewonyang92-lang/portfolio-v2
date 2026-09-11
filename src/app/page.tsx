import Link from "next/link";
import HeroTypography from "@/components/HeroTypography";
import ProjectShowcase from "@/components/ProjectShowcase";
import ScrollReveal from "@/components/ScrollReveal";
import HomeEntrance from "@/components/HomeEntrance";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <HomeEntrance>
      <HeroTypography />

      <div className="flex flex-col">
        {projects.map((project, i) => (
          <ProjectShowcase
            key={project.slug}
            project={project}
            index={i}
            total={projects.length}
          />
        ))}
      </div>

      <section className="container-full py-16 md:py-24">
        <ScrollReveal>
          <Link
            href="/information"
            className="text-meta inline-block border-b border-[var(--color-text)] pb-1"
          >
            MORE ABOUT ME →
          </Link>
        </ScrollReveal>
      </section>

      <section className="border-t border-[var(--color-border)] py-24 md:py-40">
        <div className="container-full">
          <ScrollReveal>
            <a href="mailto:hyewonyang92@gmail.com" className="group block">
              <span className="text-meta mb-6 block text-[var(--color-text-secondary)]">
                CONTACT
              </span>
              <h2 className="text-jumbo uppercase transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-3">
                Let&apos;s work
                <br />
                together.
              </h2>
            </a>
          </ScrollReveal>
        </div>
      </section>
    </HomeEntrance>
  );
}
