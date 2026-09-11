"use client";

import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { useSmoothScroll } from "@/lib/use-smooth-scroll";

function getSavedScroll() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("home-scroll-y");
}

export default function HomeEntrance({
  children,
}: {
  children: React.ReactNode;
}) {
  useSmoothScroll(true);
  const savedScroll = getSavedScroll();
  const isRestoring = savedScroll !== null;

  useLayoutEffect(() => {
    if (savedScroll !== null) {
      window.scrollTo(0, parseInt(savedScroll, 10));
      sessionStorage.removeItem("home-scroll-y");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={isRestoring ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
