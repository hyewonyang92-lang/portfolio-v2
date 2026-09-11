"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/types/project";
import ProjectVisual from "./ProjectVisual";
import { useCursor } from "@/lib/cursor-context";
import { useDesktopInteraction } from "@/lib/use-desktop-interaction";
import { pillClass, tagClass } from "@/lib/pill";

interface ProjectIndexProps {
  projects: Project[];
  showMeta?: boolean;
}

export default function ProjectIndex({
  projects,
  showMeta = true,
}: ProjectIndexProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { setCursor, resetCursor } = useCursor();
  const { isDesktop } = useDesktopInteraction();

  return (
    <div className="grid-editorial">
      <div className="col-span-4 md:col-span-8 lg:col-span-8">
        <ul className="border-t border-[var(--color-gray)]">
          {projects.map((project, i) => (
            <li key={project.slug} className="border-b border-[var(--color-gray)]">
              <Link
                href={`/work/${project.slug}`}
                onMouseEnter={() => {
                  setActiveIndex(i);
                  setCursor("view-project");
                }}
                onMouseLeave={() => {
                  setActiveIndex(null);
                  resetCursor();
                }}
                onFocus={() => setActiveIndex(i)}
                onBlur={() => setActiveIndex(null)}
                className={`group flex items-center justify-between gap-4 py-4 transition-opacity duration-300 md:py-5 ${
                  isDesktop ? "cursor-none" : ""
                } ${
                  activeIndex !== null && activeIndex !== i
                    ? "opacity-40"
                    : "opacity-100"
                }`}
              >
                <span className="flex items-center gap-4 md:gap-6">
                  <span className="text-ui w-6 text-[var(--color-text)]">
                    {project.number}
                  </span>
                  <span className={pillClass(false)}>{project.title}</span>
                </span>
                {showMeta && (
                  <span className={tagClass("hidden shrink-0 md:inline-flex")}>
                    {project.category} — {project.year}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="pointer-events-none col-span-4 hidden md:block">
        <div className="sticky top-[120px] aspect-[4/3] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            {activeIndex !== null && (
              <motion.div
                key={projects[activeIndex].slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <ProjectVisual
                  tone={projects[activeIndex].tone}
                  ratio="h-full"
                  className="h-full"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
