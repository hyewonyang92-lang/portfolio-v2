"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectVisual from "./ProjectVisual";
import { useCursor } from "@/lib/cursor-context";
import { useDesktopInteraction } from "@/lib/use-desktop-interaction";

interface ProjectGalleryProps {
  tones: number[];
}

export default function ProjectGallery({ tones }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const { setCursor, resetCursor } = useCursor();
  const { isDesktop } = useDesktopInteraction();

  const total = tones.length;

  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) goNext();
    else goPrev();
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`relative aspect-[16/10] w-full overflow-hidden ${
          isDesktop ? "cursor-none" : ""
        }`}
        role="group"
        aria-label={`Project gallery, image ${index + 1} of ${total}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <ProjectVisual tone={tones[index]} ratio="h-full" className="h-full" />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          aria-label="Previous image"
          onClick={goPrev}
          onMouseEnter={() => setCursor("prev")}
          onMouseLeave={resetCursor}
          className="absolute inset-y-0 left-0 w-1/2"
        />
        <button
          type="button"
          aria-label="Next image"
          onClick={goNext}
          onMouseEnter={() => setCursor("next")}
          onMouseLeave={resetCursor}
          className="absolute inset-y-0 right-0 w-1/2"
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-meta text-[var(--color-text-secondary)]">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className="flex gap-4 md:hidden">
          <button
            type="button"
            aria-label="Previous image"
            onClick={goPrev}
            className="text-meta"
          >
            ← PREV
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={goNext}
            className="text-meta"
          >
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
}
