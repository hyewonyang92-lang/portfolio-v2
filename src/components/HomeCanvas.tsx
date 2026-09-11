"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import type { Project } from "@/types/project";
import ProjectVisual from "./ProjectVisual";
import { useCursor } from "@/lib/cursor-context";
import { useDesktopInteraction } from "@/lib/use-desktop-interaction";
import { usePageTransition } from "@/lib/transition-context";

const EASE = [0.16, 1, 0.3, 1] as const;
const LOCK_MS = 800;
const WHEEL_THRESHOLD = 20;

interface Preset {
  box: string;
  ratio: string;
}

// One visual composition per project — position/size/aspect vary
// intentionally so each project change reads as a new arrangement of the
// same canvas rather than a swapped-out card.
const PRESETS: Preset[] = [
  { box: "left-[calc(50%-18vw)] top-[24dvh] w-[36vw]", ratio: "4 / 3" }, // MUUM — large, centered
  { box: "right-[10vw] top-[18dvh] w-[20vw]", ratio: "3 / 4" }, // HEARTS DOSAN — vertical, right
  { box: "left-[8vw] top-[38dvh] w-[44vw]", ratio: "2 / 1" }, // FOSSPLUS — wide horizontal
  { box: "left-[9vw] bottom-[26dvh] w-[19vw]", ratio: "4 / 3" }, // CARLAND — smaller, lower-left
  { box: "right-[-10vw] top-[14dvh] w-[48vw]", ratio: "5 / 4" }, // THE VENTI VOSS — oversized, cropped
  { box: "right-[9vw] top-[12dvh] w-[23vw]", ratio: "3 / 4" }, // AMCHAM KOREA — medium, upper-right
  { box: "left-[calc(50%-17vw)] bottom-[24dvh] w-[34vw]", ratio: "8 / 5" }, // YOUR BIRTHDAY — center-low
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
  const [direction, setDirection] = useState<1 | -1>(1);
  const { setCursor, resetCursor } = useCursor();
  const { isDesktop } = useDesktopInteraction();
  const { navigate } = usePageTransition();
  const shouldReduceMotion = useReducedMotion();

  const indexRef = useRef(index);
  const lockRef = useRef(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    sessionStorage.removeItem("home-active-index");
  }, []);

  const project = projects[index];
  const preset = PRESETS[index % PRESETS.length];
  const href = `/work/${project.slug}`;

  // One gesture (wheel tick, key press, click) should trigger exactly one
  // project change — everything routes through here so the same lock and
  // clamped bounds apply regardless of input method.
  const changeProject = useCallback(
    (dir: 1 | -1) => {
      if (lockRef.current) return;
      const next = Math.min(Math.max(indexRef.current + dir, 0), total - 1);
      if (next === indexRef.current) return;
      lockRef.current = true;
      setHasInteracted(true);
      setDirection(dir);
      setIndex(next);
      window.setTimeout(() => {
        lockRef.current = false;
      }, LOCK_MS);
    },
    [total],
  );

  const goNext = useCallback(() => changeProject(1), [changeProject]);
  const goPrev = useCallback(() => changeProject(-1), [changeProject]);

  // Wheel/trackpad navigates projects while the canvas is in view. Once the
  // user reaches either end, the gesture is handed back to normal page
  // scroll (toward the contact section below, or back up to the canvas).
  useEffect(() => {
    if (!isDesktop) return;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;
      if (window.scrollY > 0) return;

      if (e.deltaY > 0) {
        if (indexRef.current < total - 1) {
          e.preventDefault();
          changeProject(1);
        }
      } else if (indexRef.current > 0) {
        e.preventDefault();
        changeProject(-1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [isDesktop, total, changeProject]);

  const handleView = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      sessionStorage.setItem("home-active-index", String(indexRef.current));
      navigate(href);
    },
    [navigate, href],
  );

  useEffect(() => {
    if (!isDesktop) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
      if (e.key === "Enter") {
        sessionStorage.setItem("home-active-index", String(indexRef.current));
        navigate(href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isDesktop, goNext, goPrev, navigate, href]);

  const cursorProps = {
    onMouseEnter: () => setCursor("view-project"),
    onMouseLeave: resetCursor,
  };

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) < 40 && Math.abs(dy) < 40) return;
    if (Math.abs(dy) > Math.abs(dx)) {
      if (dy < 0) goNext();
      else goPrev();
    } else if (dx < 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  const imageVariants: Variants = shouldReduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: 1 | -1) => ({
          opacity: 0,
          scale: 1.05,
          y: dir >= 0 ? 50 : -50,
        }),
        center: { opacity: 1, scale: 1, y: 0 },
        exit: (dir: 1 | -1) => ({
          opacity: 0,
          scale: 0.94,
          y: dir >= 0 ? -40 : 40,
        }),
      };

  const titleVariants: Variants = shouldReduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: 1 | -1) => ({ y: dir >= 0 ? "100%" : "-100%", opacity: 0 }),
        center: { y: 0, opacity: 1 },
        exit: (dir: 1 | -1) => ({ y: dir >= 0 ? "-100%" : "100%", opacity: 0 }),
      };

  const numberVariants: Variants = shouldReduceMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        enter: (dir: 1 | -1) => ({ y: dir >= 0 ? "60%" : "-60%", opacity: 0 }),
        center: { y: 0, opacity: 1 },
        exit: (dir: 1 | -1) => ({ y: dir >= 0 ? "-60%" : "60%", opacity: 0 }),
      };

  const imageDelay = hasInteracted ? 0 : 0.5;
  const titleDelay = hasInteracted ? 0.05 : 0.9;
  const metaDelay = hasInteracted ? 0.15 : 1.05;

  const projectNumber = (
    <span className="text-meta text-[var(--color-text-secondary)]">
      <span className="inline-block overflow-hidden align-bottom">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.span
            key={project.number}
            custom={direction}
            variants={numberVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: EASE }}
            className="inline-block"
          >
            {project.number}
          </motion.span>
        </AnimatePresence>
      </span>{" "}
      / {String(total).padStart(2, "0")}
    </span>
  );

  return (
    <>
      {/* Desktop — single-viewport canvas, one active project at a time */}
      <section className="relative hidden h-[100dvh] w-full overflow-hidden md:block">
        <motion.div
          key={`intro-${index}`}
          initial={hasInteracted ? { opacity: 0.85 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="absolute top-[132px] left-0 z-0 w-full px-12"
        >
          <p className="text-intro max-w-4xl uppercase">
            {INTRO_LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={
                    shouldReduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }
                  }
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + i * 0.08,
                    ease: EASE,
                  }}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </p>
        </motion.div>

        <motion.div
          layout
          transition={{ layout: { duration: 0.9, ease: EASE } }}
          style={{ aspectRatio: preset.ratio }}
          className={`absolute z-10 ${preset.box}`}
        >
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={project.slug}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.9, delay: imageDelay, ease: EASE }}
              className="h-full w-full"
            >
              <Link
                href={href}
                onClick={handleView}
                {...cursorProps}
                className={`block h-full w-full ${isDesktop ? "cursor-none" : ""}`}
              >
                <ProjectVisual
                  tone={project.tone}
                  ratio="h-full"
                  className="h-full transition-transform duration-500 ease-[var(--ease-editorial)] hover:scale-[1.02]"
                  label={project.number}
                />
              </Link>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="absolute bottom-[120px] left-12 z-20 flex flex-col gap-3">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.h2
                key={`${project.slug}-title`}
                custom={direction}
                variants={titleVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, delay: titleDelay, ease: EASE }}
                className="text-h1 uppercase"
              >
                {project.title}
              </motion.h2>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${project.slug}-meta`}
              initial={
                shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: metaDelay, ease: EASE }}
              className="flex flex-col gap-3"
            >
              <span className="text-meta text-[var(--color-text-secondary)]">
                {project.number} / {String(total).padStart(2, "0")} —{" "}
                {project.category}
              </span>
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.9, ease: EASE }}
          className="absolute bottom-12 left-12 z-20 flex items-center gap-4"
        >
          <button
            type="button"
            onClick={goPrev}
            disabled={index === 0}
            className="text-meta group/nav relative inline-flex items-center transition-opacity duration-200 disabled:opacity-30"
            aria-label="Previous project"
          >
            <span className="transition-transform duration-300 group-hover/nav:-translate-x-1">
              PREV
            </span>
          </button>
          {projectNumber}
          <button
            type="button"
            onClick={goNext}
            disabled={index === total - 1}
            className="text-meta group/nav relative inline-flex items-center transition-opacity duration-200 disabled:opacity-30"
            aria-label="Next project"
          >
            <span className="transition-transform duration-300 group-hover/nav:translate-x-1">
              NEXT
            </span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.95, ease: EASE }}
          className="absolute right-12 bottom-12 z-20 flex gap-6"
        >
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
        </motion.div>
      </section>

      {/* Mobile — simplified stacked composition, same one-active-project model */}
      <section
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex flex-col gap-8 px-5 pt-[104px] pb-12 md:hidden"
      >
        <p className="text-intro uppercase">{INTRO_LINES.join(" ")}</p>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: EASE }}
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
              <Link
                href={href}
                onClick={handleView}
                className="text-meta w-fit border-b border-[var(--color-text)] pb-1"
              >
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
            <button
              type="button"
              onClick={goPrev}
              disabled={index === 0}
              className="text-meta disabled:opacity-30"
            >
              ← PREV
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={index === total - 1}
              className="text-meta disabled:opacity-30"
            >
              NEXT →
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          <Link href="/information" className="text-meta">
            ABOUT
          </Link>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="text-meta"
          >
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
