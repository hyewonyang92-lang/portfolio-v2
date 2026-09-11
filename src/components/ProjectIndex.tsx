"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/types/project";
import ProjectVisual from "./ProjectVisual";
import { useCursor } from "@/lib/cursor-context";
import { useDesktopInteraction } from "@/lib/use-desktop-interaction";

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
        <ul className="border-t border-[var(--color-border)]">
          {projects.map((project, i) => (
            <li key={project.slug} className="border-b border-[var(--color-border)]">
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
                className={`group flex items-baseline justify-between gap-4 py-5 transition-opacity duration-300 md:py-7 ${
                  isDesktop ? "cursor-none" : ""
                } ${
                  activeIndex !== null && activeIndex !== i
                    ? "opacity-40"
                    : "opacity-100"
                }`}
              >
                <span className="flex items-baseline gap-4 md:gap-8">
                  <span className="text-meta text-[var(--color-text-secondary)]">
                    {project.number}
                  </span>
                  <span className="text-h2 uppercase transition-transform duration-300 group-hover:translate-x-2">
                    {project.title}
                  </span>
                </span>
                {showMeta && (
                  <span className="text-meta hidden shrink-0 text-[var(--color-text-secondary)] md:block">
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
