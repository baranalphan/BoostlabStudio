"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** How quickly the card catches up with the pointer each frame (0–1). */
const FOLLOW = 0.14;

/**
 * Tracks the pointer over its box and eases three CSS variables towards it:
 * `--px` / `--py` (pointer position, 0–1) and `--hover` (0 at rest, 1 while hovered).
 * The stylesheet turns those into tilt, glare and parallax. The box itself is never
 * transformed, so its bounds stay a stable reference while the children move.
 */
export function TiltCard({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    // With reduced motion the card still lights up, it just doesn't follow the pointer.
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: 0.5, y: 0.5, h: 0 };
    const current = { ...target };
    let frame = 0;

    const tick = () => {
      current.x += (target.x - current.x) * FOLLOW;
      current.y += (target.y - current.y) * FOLLOW;
      current.h += (target.h - current.h) * FOLLOW;
      el.style.setProperty("--px", current.x.toFixed(4));
      el.style.setProperty("--py", current.y.toFixed(4));
      el.style.setProperty("--hover", current.h.toFixed(4));

      const settled =
        Math.abs(target.x - current.x) < 0.001 &&
        Math.abs(target.y - current.y) < 0.001 &&
        Math.abs(target.h - current.h) < 0.001;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };
    const run = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      if (!still) {
        target.x = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
        target.y = Math.min(1, Math.max(0, (event.clientY - box.top) / box.height));
      }
      target.h = 1;
      run();
    };
    const onLeave = () => {
      target.x = 0.5;
      target.y = 0.5;
      target.h = 0;
      run();
    };

    el.addEventListener("pointerenter", onMove);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", onMove);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
