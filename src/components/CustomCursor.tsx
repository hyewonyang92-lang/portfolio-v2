"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "@/lib/cursor-context";
import { useDesktopInteraction } from "@/lib/use-desktop-interaction";

export default function CustomCursor() {
  const { cursor } = useCursor();
  const { isDesktop, reducedMotion } = useDesktopInteraction();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 });
  const springY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 });

  useEffect(() => {
    if (!isDesktop) return;
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isDesktop, x, y]);

  if (!isDesktop) return null;

  const visible = cursor.variant !== "default";

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[100]"
      style={{
        x: reducedMotion ? x : springX,
        y: reducedMotion ? y : springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <AnimatePresence>
        {visible && (
          <motion.span
            key={cursor.variant}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="block whitespace-nowrap rounded-full bg-[#111111] px-4 py-2 text-[11px] font-medium tracking-[0.08em] text-white uppercase"
          >
            {cursor.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
