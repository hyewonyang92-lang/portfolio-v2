"use client";

import Link from "next/link";
import type { Project } from "@/types/project";
import { useCursor } from "@/lib/cursor-context";
import { useDesktopInteraction } from "@/lib/use-desktop-interaction";

export default function NextProject({ project }: { project: Project }) {
  const { setCursor, resetCursor } = useCursor();
  const { isDesktop } = useDesktopInteraction();

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={() => setCursor("view-project")}
      onMouseLeave={resetCursor}
      className={`group block border-t border-[var(--color-border)] py-24 md:py-32 ${
        isDesktop ? "cursor-none" : ""
      }`}
    >
      <div className="container-editorial flex flex-col items-start gap-6">
        <span className="text-meta text-[var(--color-text-secondary)]">
          NEXT PROJECT
        </span>
        <h2 className="text-display uppercase transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:translate-x-3">
          {project.title}
        </h2>
      </div>
    </Link>
  );
}
