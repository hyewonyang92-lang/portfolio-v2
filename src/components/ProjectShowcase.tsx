"use client";

import Link from "next/link";
import type { Project } from "@/types/project";
import ProjectVisual from "./ProjectVisual";
import ScrollReveal from "./ScrollReveal";
import { useCursor } from "@/lib/cursor-context";
import { useDesktopInteraction } from "@/lib/use-desktop-interaction";

interface ProjectShowcaseProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectShowcase({
  project,
  featured = false,
}: ProjectShowcaseProps) {
  const { setCursor, resetCursor } = useCursor();
  const { isDesktop } = useDesktopInteraction();

  const meta = (
    <div className="flex flex-col gap-6">
      <span className="text-meta text-[var(--color-text-secondary)]">
        {project.number} / {String(7).padStart(2, "0")}
      </span>
      <h3 className={featured ? "text-display uppercase" : "text-h1 uppercase"}>
        {project.title}
      </h3>
      <p className="text-meta text-[var(--color-text-secondary)]">
        {project.category} — {project.year}
      </p>
    </div>
  );

  const visualRatio = featured ? "aspect-[4/5] md:aspect-[16/11]" : "aspect-[4/3]";

  const image = (
    <ProjectVisual tone={project.tone} ratio={visualRatio} label={project.number} />
  );

  const linkProps = {
    href: `/work/${project.slug}`,
    className: `block ${isDesktop ? "cursor-none" : ""}`,
    onMouseEnter: () => setCursor("view-project"),
    onMouseLeave: () => resetCursor(),
  };

  let layout: React.ReactNode;

  switch (project.layoutVariant) {
    case "full-width-bottom-text":
      layout = (
        <div className="flex flex-col gap-8">
          <Link {...linkProps}>{image}</Link>
          {meta}
        </div>
      );
      break;
    case "image-left-text-right":
      layout = (
        <div className="grid-editorial items-center">
          <Link {...linkProps} className={`col-span-4 md:col-span-5 lg:col-span-7 ${linkProps.className}`}>
            {image}
          </Link>
          <div className="col-span-4 md:col-span-3 lg:col-span-5">{meta}</div>
        </div>
      );
      break;
    case "large-centered":
      layout = (
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-6">
            <span className="text-meta text-[var(--color-text-secondary)]">
              {project.number} / 07
            </span>
            <h3 className="text-display uppercase">{project.title}</h3>
            <p className="text-meta text-[var(--color-text-secondary)]">
              {project.category} — {project.year}
            </p>
          </div>
          <Link {...linkProps} className={`w-full ${linkProps.className}`}>
            {image}
          </Link>
        </div>
      );
      break;
    case "text-left-image-right":
    default:
      layout = (
        <div className="grid-editorial items-center">
          <div className="order-2 col-span-4 md:order-1 md:col-span-3 lg:col-span-5">
            {meta}
          </div>
          <Link
            {...linkProps}
            className={`order-1 col-span-4 md:order-2 md:col-span-5 lg:col-span-7 ${linkProps.className}`}
          >
            {image}
          </Link>
        </div>
      );
      break;
  }

  return <ScrollReveal>{layout}</ScrollReveal>;
}
