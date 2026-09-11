"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useDesktopInteraction } from "@/lib/use-desktop-interaction";

const LINES = [
  { text: "BUILDING BETTER", indentClass: "", strength: 1 },
  { text: "EXPERIENCES,", indentClass: "md:ml-[4%]", strength: 0.7 },
  { text: "PROCESS BY", indentClass: "", strength: 0.85 },
  { text: "PROCESS.", indentClass: "md:ml-[8%]", strength: 0.55 },
];

export default function HeroTypography() {
  const ref = useRef<HTMLDivElement>(null);
  const { isDesktop, reducedMotion } = useDesktopInteraction();
  const shouldReduceMotion = useReducedMotion();

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { damping: 20, stiffness: 150 });
  const springY = useSpring(mvY, { damping: 20, stiffness: 150 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  useEffect(() => {
    if (!isDesktop || reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mvX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
      mvY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
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
    <div ref={ref}>
      <motion.div
        style={{
          scale: shouldReduceMotion ? 1 : heroScale,
          opacity: shouldReduceMotion ? 1 : heroOpacity,
          y: shouldReduceMotion ? 0 : heroY,
        }}
        className="container-full flex min-h-[100dvh] flex-col justify-between pt-[110px] pb-16 md:pt-[140px]"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-start justify-between gap-4"
        >
          <span className="text-meta text-[var(--color-text-secondary)]">
            UI/UX DESIGNER
            <br />
            SEOUL, KOREA
          </span>
          <span className="text-meta text-right text-[var(--color-text-secondary)]">
            PORTFOLIO
            <br />
            2026
          </span>
        </motion.div>

        <div className="my-12 md:my-0">
          {LINES.map((line, i) => (
            <HeroLine
              key={line.text}
              x={springX}
              y={springY}
              strength={line.strength}
              indentClass={line.indentClass}
              delay={i * 0.08}
            >
              {line.text}
            </HeroLine>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-meta text-[var(--color-text-secondary)]"
          >
            YANG HYEWON
          </motion.span>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xs text-right text-base text-[var(--color-text-secondary)] md:max-w-sm md:text-lg"
          >
            I design digital products that feel clear, considered, and
            quietly confident.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

function HeroLine({
  x,
  y,
  strength,
  indentClass = "",
  delay,
  children,
}: {
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
  strength: number;
  indentClass?: string;
  delay: number;
  children: React.ReactNode;
}) {
  const dx = useTransform(x, (v) => v * 10 * strength);
  const dy = useTransform(y, (v) => v * 6 * strength);

  return (
    <div className={`overflow-hidden ${indentClass}`}>
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.h1 style={{ x: dx, y: dy }} className="text-jumbo uppercase">
          {children}
        </motion.h1>
      </motion.div>
    </div>
  );
}
