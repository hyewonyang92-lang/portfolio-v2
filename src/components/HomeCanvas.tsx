"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/types/project";
import ProjectVisual from "./ProjectVisual";
import { useCursor } from "@/lib/cursor-context";
import { useDesktopInteraction } from "@/lib/use-desktop-interaction";
import { usePageTransition } from "@/lib/transition-context";

interface Preset {
  box: string;
  ratio: string;
}

// One visual composition per project — position/size vary intentionally so
// each project change reads as a new arrangement of the same canvas.
const PRESETS: Preset[] = [
  { box: "left-1/2 top-[24dvh] w-[70vw] -translate-x-1/2 md:w-[36vw]", ratio: "aspect-[4/3]" }, // MUUM — large, centered
  { box: "right-[6vw] top-[18dvh] w-[60vw] md:w-[20vw]", ratio: "aspect-[3/4]" }, // HEARTS DOSAN — vertical, right
  { box: "left-[6vw] top-[38dvh] w-[88vw] md:w-[44vw]", ratio: "aspect-[16/8]" }, // FOSSPLUS — wide horizontal
  { box: "left-[6vw] bottom-[30dvh] w-[52vw] md:w-[19vw]", ratio: "aspect-[4/3]" }, // CARLAND — smaller, lower-left
  { box: "right-[-4vw] top-[14dvh] w-[80vw] md:right-[-10vw] md:w-[48vw]", ratio: "aspect-[5/4]" }, // THE VENTI VOSS — oversized, cropped
  { box: "right-[6vw] top-[14dvh] w-[58vw] md:w-[23vw]", ratio: "aspect-[3/4]" }, // AMCHAM KOREA — medium, upper-right
  { box: "left-1/2 bottom-[28dvh] w-[74vw] -translate-x-1/2 md:w-[34vw]", ratio: "aspect-[16/10]" }, // YOUR BIRTHDAY — center-low
];

const INTRO_LINES = [
  "YANG HYEWON IS A UI/UX DESIGNER",
  "FOCUSED ON DIGITAL PRODUCTS,",
  "RESPONSIVE EXPERIENCES AND",
  "USER-CENTERED INTERFACES.",
];

function getSavedIndex(total: number) {
  if (typeof window === "undefined") return 0;
  const raw = sessionStorage.getItem("home-active-index");
  if (raw === null) return 0;
  const parsed = parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed >= 0 && parsed < total ? parsed : 0;
}

export default function HomeCanvas({ projects }: { projects: Project[] }) {
  const total = projects.length;
  const [index, setIndex] = useState(() => getSavedIndex(total));
  const { setCursor, resetCursor } = useCursor();
  const { isDesktop } = useDesktopInteraction();
  const { navigate } = usePageTransition();

  useEffect(() => {
    sessionStorage.removeItem("home-active-index");
  }, []);

  const project = projects[index];
  const preset = PRESETS[index % PRESETS.length];
  const href = `/work/${project.slug}`;

  const goNext = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const goPrev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const handleView = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem("home-active-index", String(index));
    navigate(href);
  };

  const cursorProps = {
    onMouseEnter: () => setCursor("view-project"),
    onMouseLeave: resetCursor,
  };

  return (
    <>
      {/* Desktop — single-viewport canvas, one active project at a time */}
      <section className="relative hidden h-[100dvh] w-full overflow-hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-[132px] left-0 z-0 w-full px-12"
        >
          <p className="text-intro max-w-4xl uppercase">
            {INTRO_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute z-10 ${preset.box}`}
          >
            <Link
              href={href}
              onClick={handleView}
              {...cursorProps}
              className={`block ${isDesktop ? "cursor-none" : ""}`}
            >
              <ProjectVisual
                tone={project.tone}
                ratio={preset.ratio}
                label={project.number}
              />
            </Link>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-[120px] left-12 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${project.slug}-info`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
            >
              <span className="text-meta text-[var(--color-text-secondary)]">
                {project.number} / {String(total).padStart(2, "0")} —{" "}
                {project.category}
              </span>
              <h2 className="text-h1 uppercase">{project.title}</h2>
              <Link
                href={href}
                onClick={handleView}
                {...cursorProps}
                className={`group/link text-meta relative inline-flex w-fit items-center gap-2 ${
                  isDesktop ? "cursor-none" : ""
                }`}
              >
                VIEW CASE
                <span aria-hidden>→</span>
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[var(--color-text)] transition-transform duration-300 group-hover/link:scale-x-100" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-12 left-12 z-20 flex items-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="text-meta transition-opacity duration-200 hover:opacity-60"
            aria-label="Previous project"
          >
            PREV
          </button>
          <span className="text-meta text-[var(--color-text-secondary)]">
            {project.number} / {String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={goNext}
            className="text-meta transition-opacity duration-200 hover:opacity-60"
            aria-label="Next project"
          >
            NEXT
          </button>
        </div>

        <div className="absolute right-12 bottom-12 z-20 flex gap-6">
          <Link
            href="/information"
            className="text-meta transition-opacity duration-200 hover:opacity-60"
          >
            ABOUT
          </Link>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-meta transition-opacity duration-200 hover:opacity-60"
          >
            LINKEDIN
          </a>
          <a
            href="mailto:hyewonyang92@gmail.com"
            className="text-meta transition-opacity duration-200 hover:opacity-60"
          >
            EMAIL
          </a>
        </div>
      </section>

      {/* Mobile — simplified stacked composition, same one-active-project model */}
      <section className="flex flex-col gap-8 px-5 pt-[104px] pb-12 md:hidden">
        <p className="text-intro uppercase">{INTRO_LINES.join(" ")}</p>

        <AnimatePresence mode="wait">
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <Link href={href} onClick={handleView} className="block">
              <ProjectVisual
                tone={project.tone}
                ratio="aspect-[4/3]"
                label={project.number}
              />
            </Link>
            <div className="flex flex-col gap-2">
              <span className="text-meta text-[var(--color-text-secondary)]">
                {project.number} / {String(total).padStart(2, "0")} —{" "}
                {project.category}
              </span>
              <h2 className="text-h1 uppercase">{project.title}</h2>
              <Link href={href} onClick={handleView} className="text-meta w-fit border-b border-[var(--color-text)] pb-1">
                VIEW CASE →
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-6">
          <span className="text-meta text-[var(--color-text-secondary)]">
            {project.number} / {String(total).padStart(2, "0")}
          </span>
          <div className="flex gap-6">
            <button type="button" onClick={goPrev} className="text-meta">
              PREV
            </button>
            <button type="button" onClick={goNext} className="text-meta">
              NEXT
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          <Link href="/information" className="text-meta">
            ABOUT
          </Link>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="text-meta">
            LINKEDIN
          </a>
          <a href="mailto:hyewonyang92@gmail.com" className="text-meta">
            EMAIL
          </a>
        </div>
      </section>
    </>
  );
}
