import HomeCanvas from "@/components/HomeCanvas";
import ScrollReveal from "@/components/ScrollReveal";
import HomeEntrance from "@/components/HomeEntrance";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <HomeEntrance>
      <HomeCanvas projects={projects} />

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
