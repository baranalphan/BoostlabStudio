"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * The source runs Lenis (its <html> carries the `lenis` class) and exposes the instance
 * globally, which the pinned sections read for scroll progress. Reproduced here so wheel,
 * touch and keyboard input all behave the way they do on the source.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true });
    (window as unknown as { inkLenis?: Lenis }).inkLenis = lenis;

    // Keep `--vh` in sync for the sections that size against the visual viewport.
    const setVh = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
      lenis.destroy();
      delete (window as unknown as { inkLenis?: Lenis }).inkLenis;
    };
  }, []);

  return null;
}
