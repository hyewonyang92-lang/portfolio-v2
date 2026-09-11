import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Information — Yang Hyewon",
};

const EXPERIENCE = [
  { year: "20XX — PRESENT", company: "[COMPANY NAME]", role: "UI/UX DESIGNER" },
  { year: "20XX — 20XX", company: "[COMPANY NAME]", role: "PRODUCT DESIGNER" },
  { year: "20XX — 20XX", company: "[COMPANY NAME]", role: "UI DESIGNER" },
];

const CAPABILITIES = [
  "UI DESIGN",
  "UX RESEARCH",
  "DESIGN SYSTEMS",
  "PROTOTYPING",
  "INTERACTION DESIGN",
  "BRAND IDENTITY",
];

const TOOLS = [
  "FIGMA",
  "PROTOPIE",
  "AFTER EFFECTS",
  "NOTION",
  "PRINCIPLE",
  "ILLUSTRATOR",
];

export default function InformationPage() {
  return (
    <div className="pt-[72px] md:pt-[88px]">
      <section className="container-editorial pt-16 pb-24 md:pt-24 md:pb-32">
        <ScrollReveal>
          <h1 className="text-display uppercase">
            Yang
            <br />
            Hyewon
          </h1>
          <p className="text-meta mt-8 text-[var(--color-text-secondary)]">
            UI/UX Designer — Based in Seoul
          </p>
        </ScrollReveal>
      </section>

      <section className="container-editorial border-t border-[var(--color-border)] py-16 md:py-24">
        <div className="grid-editorial">
          <ScrollReveal className="col-span-4 md:col-span-2 lg:col-span-3">
            <span className="text-meta text-[var(--color-text-secondary)]">
              ABOUT
            </span>
          </ScrollReveal>
          <ScrollReveal
            delay={0.05}
            className="col-span-4 flex flex-col gap-6 md:col-span-6 lg:col-span-9"
          >
            <p className="text-h2">
              I approach design as a process of reduction — clarifying
              intent, structure, and interaction until only what matters
              remains.
            </p>
            <p className="text-base text-[var(--color-text-secondary)] md:text-lg">
              My work spans product interfaces, design systems, and digital
              experiences for clients across a range of industries, with a
              focus on typography, grid, and restrained motion.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="container-editorial border-t border-[var(--color-border)] py-16 md:py-24">
        <div className="grid-editorial">
          <ScrollReveal className="col-span-4 md:col-span-2 lg:col-span-3">
            <span className="text-meta text-[var(--color-text-secondary)]">
              EXPERIENCE
            </span>
          </ScrollReveal>
          <ScrollReveal
            delay={0.05}
            className="col-span-4 md:col-span-6 lg:col-span-9"
          >
            <table className="w-full border-collapse">
              <tbody>
                {EXPERIENCE.map((row) => (
                  <tr
                    key={row.company + row.role}
                    className="border-b border-[var(--color-border)]"
                  >
                    <td className="text-meta py-5 text-[var(--color-text-secondary)]">
                      {row.year}
                    </td>
                    <td className="text-meta py-5">{row.company}</td>
                    <td className="text-meta py-5 text-right text-[var(--color-text-secondary)]">
                      {row.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollReveal>
        </div>
      </section>

      <section className="container-editorial border-t border-[var(--color-border)] py-16 md:py-24">
        <div className="grid-editorial">
          <ScrollReveal className="col-span-4 md:col-span-2 lg:col-span-3">
            <span className="text-meta text-[var(--color-text-secondary)]">
              CAPABILITIES
            </span>
          </ScrollReveal>
          <ScrollReveal
            delay={0.05}
            className="col-span-4 md:col-span-6 lg:col-span-9"
          >
            <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {CAPABILITIES.map((item) => (
                <li key={item} className="text-h2 uppercase">
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section className="container-editorial border-t border-[var(--color-border)] py-16 md:py-24">
        <div className="grid-editorial">
          <ScrollReveal className="col-span-4 md:col-span-2 lg:col-span-3">
            <span className="text-meta text-[var(--color-text-secondary)]">
              TOOLS
            </span>
          </ScrollReveal>
          <ScrollReveal
            delay={0.05}
            className="col-span-4 md:col-span-6 lg:col-span-9"
          >
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {TOOLS.map((tool) => (
                <li key={tool} className="text-meta text-[var(--color-text-secondary)]">
                  {tool}
                </li>
              ))}
            </ul>
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
    </div>
  );
}
