"use client";

import { useEffect, useRef } from "react";

/**
 * 0 → 1 across an element's own scroll range, updated on scroll and resize.
 *
 * The source drives every pinned section this way: the outer section is taller than the
 * viewport, an inner wrapper sticks, and progress through the extra height is what the
 * scene reads. Progress is returned as a ref so the r3f frame loop can sample it without
 * forcing a React re-render on every scroll event.
 */
export function useScrollProgress<T extends HTMLElement>(options?: {
  onChange?: (progress: number) => void;
}) {
  const ref = useRef<T>(null);
  const progress = useRef(0);
  const onChange = useRef(options?.onChange);

  useEffect(() => {
    onChange.current = options?.onChange;
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const value = distance <= 0 ? 0 : Math.min(Math.max(-rect.top / distance, 0), 1);
      if (value !== progress.current) {
        progress.current = value;
        onChange.current?.(value);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { ref, progress };
}
