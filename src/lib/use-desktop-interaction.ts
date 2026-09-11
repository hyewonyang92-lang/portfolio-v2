"use client";

import { useEffect, useState } from "react";

export function useDesktopInteraction() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const pointerQuery = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)",
    );
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePointer = () => setIsDesktop(pointerQuery.matches);
    const updateMotion = () => setReducedMotion(motionQuery.matches);

    updatePointer();
    updateMotion();

    pointerQuery.addEventListener("change", updatePointer);
    motionQuery.addEventListener("change", updateMotion);

    return () => {
      pointerQuery.removeEventListener("change", updatePointer);
      motionQuery.removeEventListener("change", updateMotion);
    };
  }, []);

  return { isDesktop, reducedMotion };
}
