"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useDesktopInteraction } from "@/lib/use-desktop-interaction";

const LAYERS = [
  { strength: 1, className: "text-meta text-[var(--color-text-secondary)]" },
  { strength: 0.6, className: "text-display uppercase" },
  { strength: 0.35, className: "text-meta text-[var(--color-text-secondary)]" },
];

export default function HeroTypography() {
  const ref = useRef<HTMLDivElement>(null);
  const { isDesktop, reducedMotion } = useDesktopInteraction();

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { damping: 20, stiffness: 150 });
  const springY = useSpring(mvY, { damping: 20, stiffness: 150 });

  useEffect(() => {
    if (!isDesktop || reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      mvX.set(relX * 2);
      mvY.set(relY * 2);
    };

    const handleLeave = () => {
      mvX.set(0);
      mvY.set(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [isDesktop, reducedMotion, mvX, mvY]);

  return (
    <div
      ref={ref}
      className="container-editorial flex min-h-[calc(100dvh-72px)] flex-col justify-center gap-6 py-24 md:min-h-[calc(100dvh-88px)] md:gap-8"
    >
      <HeroLayer x={springX} y={springY} strength={LAYERS[0].strength}>
        <span className={LAYERS[0].className}>UI/UX DESIGNER — SEOUL, KOREA</span>
      </HeroLayer>

      <HeroLayer x={springX} y={springY} strength={LAYERS[1].strength}>
        <h1 className={LAYERS[1].className}>
          BUILDING BETTER
          <br />
          EXPERIENCES,
          <br />
          PROCESS BY PROCESS.
        </h1>
      </HeroLayer>

      <HeroLayer x={springX} y={springY} strength={LAYERS[2].strength}>
        <span className={LAYERS[2].className}>YANG HYEWON</span>
      </HeroLayer>
    </div>
  );
}

function HeroLayer({
  x,
  y,
  strength,
  children,
}: {
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
  strength: number;
  children: React.ReactNode;
}) {
  const dx = useTransform(x, (v) => v * 8 * strength);
  const dy = useTransform(y, (v) => v * 6 * strength);

  return <motion.div style={{ x: dx, y: dy }}>{children}</motion.div>;
}
