"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Lenis smooth scrolling for wheel, touch and keyboard input. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true });

    // Keep `--vh` in sync for the sections that size against the visual viewport.
    const setVh = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
      lenis.destroy();
    };
  }, []);

  return null;
}
