"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectVisual from "./ProjectVisual";
import { useCursor } from "@/lib/cursor-context";
import { useDesktopInteraction } from "@/lib/use-desktop-interaction";
import { pillClass } from "@/lib/pill";

interface ProjectGalleryProps {
  tones: number[];
}

export default function ProjectGallery({ tones }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hoverSide, setHoverSide] = useState<"prev" | "next" | null>(null);
  const { setCursor, resetCursor } = useCursor();
  const { isDesktop } = useDesktopInteraction();

  const total = tones.length;

  // Keep the cursor's counter in sync with the current image even while the
  // pointer stays still over the same half (e.g. after a keyboard nav).
  useEffect(() => {
    if (!hoverSide) return;
    const counter = `${String(index + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}`;
    setCursor(hoverSide, `${hoverSide === "prev" ? "PREV" : "NEXT"} (${counter})`);
  }, [hoverSide, index, total, setCursor]);

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
          onMouseEnter={() => setHoverSide("prev")}
          onMouseLeave={() => {
            setHoverSide(null);
            resetCursor();
          }}
          className="absolute inset-y-0 left-0 w-1/2"
        />
        <button
          type="button"
          aria-label="Next image"
          onClick={goNext}
          onMouseEnter={() => setHoverSide("next")}
          onMouseLeave={() => {
            setHoverSide(null);
            resetCursor();
          }}
          className="absolute inset-y-0 right-0 w-1/2"
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-ui">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className="flex gap-2 md:hidden">
          <button
            type="button"
            aria-label="Previous image"
            onClick={goPrev}
            className={pillClass(false)}
          >
            ← PREV
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={goNext}
            className={pillClass(false)}
          >
            NEXT →
          </button>
        </div>
      </div>
    </div>
  );
}
