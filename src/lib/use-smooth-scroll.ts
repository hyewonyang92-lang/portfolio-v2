"use client";

import { useEffect, useRef } from "react";
import { useDesktopInteraction } from "./use-desktop-interaction";

const EASE = 0.15;

export function useSmoothScroll(enabled: boolean) {
  const { isDesktop, reducedMotion } = useDesktopInteraction();
  const stateRef = useRef({
    current: 0,
    target: 0,
    rafId: null as number | null,
    ignoreNextScroll: false,
  });

  useEffect(() => {
    if (!enabled || !isDesktop || reducedMotion) return;

    const state = stateRef.current;
    state.current = window.scrollY;
    state.target = window.scrollY;

    const clampTarget = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      state.target = Math.min(Math.max(state.target, 0), Math.max(max, 0));
    };

    const applyScroll = () => {
      state.ignoreNextScroll = true;
      window.scrollTo(0, state.current);
    };

    const tick = () => {
      state.current += (state.target - state.current) * EASE;
      if (Math.abs(state.target - state.current) < 0.5) {
        state.current = state.target;
        applyScroll();
        state.rafId = null;
        return;
      }
      applyScroll();
      state.rafId = requestAnimationFrame(tick);
    };

    const ensureRunning = () => {
      if (state.rafId === null) state.rafId = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      e.preventDefault();
      state.target += e.deltaY;
      clampTarget();
      ensureRunning();
    };

    const onScroll = () => {
      if (state.ignoreNextScroll) {
        state.ignoreNextScroll = false;
        return;
      }
      // External scroll source (keyboard, scrollbar drag, touch) — resync.
      state.current = window.scrollY;
      state.target = window.scrollY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      if (state.rafId !== null) cancelAnimationFrame(state.rafId);
      state.rafId = null;
    };
  }, [enabled, isDesktop, reducedMotion]);
}
