"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePageTransition } from "@/lib/transition-context";

export default function TransitionShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { active } = usePageTransition();
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <motion.main
        animate={{
          scale: shouldReduceMotion ? 1 : active ? 0.98 : 1,
          opacity: active ? 0.6 : 1,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none fixed inset-0 z-[90] bg-[var(--color-bg)]"
          />
        )}
      </AnimatePresence>
    </>
  );
}
