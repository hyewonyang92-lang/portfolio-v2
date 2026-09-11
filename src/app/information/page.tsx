import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import { pillClass, tagClass } from "@/lib/pill";

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

const TOOLS = ["FIGMA", "PROTOPIE", "AFTER EFFECTS", "NOTION", "PRINCIPLE", "ILLUSTRATOR"];

export default function InformationPage() {
  return (
    <div className="pb-24 md:pt-[88px] md:pb-0">
      <section className="container-editorial pt-16 pb-24 md:pt-24 md:pb-32">
        <ScrollReveal>
          <span className={tagClass("mb-4 inline-flex")}>Yang Hyewon</span>
          <p className="text-body">UI/UX Designer — Based in Seoul</p>
        </ScrollReveal>
      </section>

      <section className="container-editorial border-t border-[var(--color-gray)] py-16 md:py-24">
        <div className="grid-editorial">
          <ScrollReveal className="col-span-4 md:col-span-2 lg:col-span-3">
            <span className={tagClass()}>About</span>
          </ScrollReveal>
          <ScrollReveal
            delay={0.05}
            className="col-span-4 flex flex-col gap-4 md:col-span-6 lg:col-span-9"
          >
            <p className="text-body max-w-2xl">
              I approach design as a process of reduction — clarifying
              intent, structure, and interaction until only what matters
              remains.
            </p>
            <p className="text-body max-w-2xl">
              My work spans product interfaces, design systems, and digital
              experiences for clients across a range of industries, with a
              focus on typography, grid, and restrained motion.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="container-editorial border-t border-[var(--color-gray)] py-16 md:py-24">
        <div className="grid-editorial">
          <ScrollReveal className="col-span-4 md:col-span-2 lg:col-span-3">
            <span className={tagClass()}>Experience</span>
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
                    className="border-b border-[var(--color-gray)]"
                  >
                    <td className="text-ui py-5">{row.year}</td>
                    <td className="text-ui py-5">{row.company}</td>
                    <td className="text-ui py-5 text-right">{row.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollReveal>
        </div>
      </section>

      <section className="container-editorial border-t border-[var(--color-gray)] py-16 md:py-24">
        <div className="grid-editorial">
          <ScrollReveal className="col-span-4 md:col-span-2 lg:col-span-3">
            <span className={tagClass()}>Capabilities</span>
          </ScrollReveal>
          <ScrollReveal
            delay={0.05}
            className="col-span-4 md:col-span-6 lg:col-span-9"
          >
            <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {CAPABILITIES.map((item) => (
                <li key={item} className="text-ui">
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section className="container-editorial border-t border-[var(--color-gray)] py-16 md:py-24">
        <div className="grid-editorial">
          <ScrollReveal className="col-span-4 md:col-span-2 lg:col-span-3">
            <span className={tagClass()}>Tools</span>
          </ScrollReveal>
          <ScrollReveal
            delay={0.05}
            className="col-span-4 md:col-span-6 lg:col-span-9"
          >
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {TOOLS.map((tool) => (
                <li key={tool} className="text-ui">
                  {tool}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-[var(--color-gray)] py-24 md:py-32">
        <div className="container-editorial">
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
    </div>
  );
}
