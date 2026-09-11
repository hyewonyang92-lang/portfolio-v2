"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { Project } from "@/types/project";
import ProjectVisual from "./ProjectVisual";
import { useCursor } from "@/lib/cursor-context";
import { useDesktopInteraction } from "@/lib/use-desktop-interaction";
import { usePageTransition } from "@/lib/transition-context";

type SceneVariant = "full-bleed" | "overlap" | "asymmetric-right" | "large-centered";

const VARIANTS: SceneVariant[] = [
  "overlap",
  "full-bleed",
  "asymmetric-right",
  "large-centered",
];

interface ProjectShowcaseProps {
  project: Project;
  index: number;
  total: number;
}

export default function ProjectShowcase({
  project,
  index,
  total,
}: ProjectShowcaseProps) {
  const variant = VARIANTS[index % VARIANTS.length];
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();
  const { isDesktop } = useDesktopInteraction();
  const { navigate } = usePageTransition();
  const shouldReduceMotion = useReducedMotion();
  // Observed once against the whole (viewport-tall) section rather than each
  // small child, so a fast scroll can't skip past a short element between
  // IntersectionObserver checks and leave it permanently hidden.
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const revealed = isInView || shouldReduceMotion;

  const href = `/work/${project.slug}`;
  const handleNavigate = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href);
  };

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [24, -24],
  );

  const meta = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-3"
    >
      <span className="text-meta text-[var(--color-text-secondary)]">
        {project.number} / {String(total).padStart(2, "0")} — {project.category}
      </span>
    </motion.div>
  );

  const title = (
    <div className="overflow-hidden">
      <motion.h3
        initial={{ opacity: 0, y: "100%" }}
        animate={
          revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: "100%" }
        }
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={
          variant === "large-centered"
            ? "text-jumbo text-center uppercase"
            : "text-jumbo uppercase"
        }
      >
        {project.title}
      </motion.h3>
    </div>
  );

  const info = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-baseline gap-6"
    >
      <span className="text-meta text-[var(--color-text-secondary)]">
        {project.year}
      </span>
      <Link
        href={href}
        onClick={handleNavigate}
        onMouseEnter={() => setCursor("view-project")}
        onMouseLeave={resetCursor}
        className={`group/link text-meta relative inline-flex items-center gap-2 ${
          isDesktop ? "cursor-none" : ""
        }`}
      >
        VIEW PROJECT
        <span aria-hidden>→</span>
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[var(--color-text)] transition-transform duration-300 group-hover/link:scale-x-100" />
      </Link>
    </motion.div>
  );

  const image = (
    <div
      ref={imageRef}
      className="overflow-hidden"
      style={{
        aspectRatio:
          variant === "asymmetric-right" ? "3 / 4" : "16 / 10",
      }}
    >
      <motion.div
        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
        animate={{
          clipPath: revealed ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
        }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full"
      >
        <motion.div
          style={{ y: isDesktop ? parallaxY : 0 }}
          initial={{ scale: 1.05 }}
          animate={{ scale: revealed ? 1 : 1.05 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-[130%] w-full"
        >
          <ProjectVisual
            tone={project.tone}
            ratio="h-full"
            className="h-full transition-transform duration-[600ms] ease-[var(--ease-editorial)] group-hover:scale-[1.03]"
            label={project.number}
          />
        </motion.div>
      </motion.div>
    </div>
  );

  const viewProjectLink = (
    <Link
      href={href}
      onClick={handleNavigate}
      onMouseEnter={() => setCursor("view-project")}
      onMouseLeave={resetCursor}
      className={`block ${isDesktop ? "cursor-none" : ""}`}
    >
      {image}
    </Link>
  );

  if (variant === "full-bleed") {
    return (
      <section
        ref={sectionRef}
        className="group flex min-h-screen flex-col justify-center gap-10 py-24 md:gap-14 md:py-40"
      >
        <div className="container-full flex flex-col gap-6">
          {meta}
          {title}
        </div>
        <div className="relative left-1/2 w-screen -translate-x-1/2">
          {viewProjectLink}
        </div>
        <div className="container-full">{info}</div>
      </section>
    );
  }

  if (variant === "asymmetric-right") {
    return (
      <section
        ref={sectionRef}
        className="group container-full flex min-h-screen flex-col justify-center gap-10 py-24 md:py-40"
      >
        <div className="grid-editorial items-end">
          <div className="col-span-4 flex flex-col justify-between gap-10 md:col-span-3 lg:col-span-4">
            {meta}
            {title}
            {info}
          </div>
          <div className="col-span-4 mr-[calc(var(--pad-mobile)*-1)] md:col-span-5 md:col-start-4 md:mr-[calc(var(--pad-tablet)*-1)] lg:col-span-7 lg:col-start-6 lg:mr-[calc(var(--pad-desktop)*-1)]">
            {viewProjectLink}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "large-centered") {
    return (
      <section
        ref={sectionRef}
        className="group container-full flex min-h-screen flex-col items-center justify-center gap-10 py-24 text-center md:py-40"
      >
        {meta}
        {title}
        <div className="mx-auto w-full max-w-4xl">{viewProjectLink}</div>
        {info}
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="group container-full flex min-h-screen flex-col justify-center gap-6 py-24 md:py-40"
    >
      {meta}
      <div className="-mb-[2vw] md:-mb-[3vw]">{title}</div>
      <div className="relative z-10">{viewProjectLink}</div>
      {info}
    </section>
  );
}
