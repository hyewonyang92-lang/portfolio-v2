"use client";

import Link from "next/link";
import type { Project } from "@/types/project";
import { useCursor } from "@/lib/cursor-context";
import { useDesktopInteraction } from "@/lib/use-desktop-interaction";
import { pillClass, tagClass } from "@/lib/pill";

export default function NextProject({ project }: { project: Project }) {
  const { setCursor, resetCursor } = useCursor();
  const { isDesktop } = useDesktopInteraction();

  return (
    <div className="border-t border-[var(--color-gray)] py-24 md:py-32">
      <div className="container-editorial flex flex-col items-start gap-4">
        <span className={tagClass()}>Next Project</span>
        <Link
          href={`/work/${project.slug}`}
          onMouseEnter={() => setCursor("view-project")}
          onMouseLeave={resetCursor}
          className={pillClass(false, `px-6 py-3 text-[13px] tracking-[0.02em] ${isDesktop ? "cursor-none" : ""}`)}
        >
          {project.title}
        </Link>
      </div>
    </div>
  );
}
