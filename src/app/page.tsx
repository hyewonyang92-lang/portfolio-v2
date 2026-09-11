import HomeCanvas from "@/components/HomeCanvas";
import ScrollReveal from "@/components/ScrollReveal";
import HomeEntrance from "@/components/HomeEntrance";
import { projects } from "@/data/projects";
import { pillClass, tagClass } from "@/lib/pill";

export default function Home() {
  return (
    <HomeEntrance>
      <HomeCanvas projects={projects} />

      <section className="border-t border-[var(--color-gray)] py-24 md:py-32">
        <div className="container-full">
          <ScrollReveal>
            <span className={tagClass("mb-6 inline-flex")}>Contact</span>
            <a
              href="mailto:hyewonyang92@gmail.com"
              className={pillClass(false, "px-6 py-3 text-[13px] tracking-[0.02em]")}
            >
              Let&apos;s work together →
            </a>
          </ScrollReveal>
        </div>
      </section>
    </HomeEntrance>
  );
}
