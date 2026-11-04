"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./SplitText.module.css";

type SplitTextProps = {
  children: string;
  /** Seconds before the first line starts moving. */
  delay?: number;
  /** Seconds added per line. */
  lineStagger?: number;
  /** The hero heading also un-skews as the lines rise. */
  skew?: boolean;
  /** Shrink the rendered block to its longest line (page headings). */
  shrink?: boolean;
  animate?: boolean;
  className?: string;
};

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Line-by-line text reveal. The string is rendered once, visually hidden, for
 * assistive tech; the visible copy is split into the lines the text actually wraps
 * onto, each line clipped so its inner span can slide up from translateY(105%).
 *
 * The lines are measured from the rendered word positions rather than guessed, and
 * re-measured on resize, because the headings reflow with the fluid type scale.
 */
export function SplitText({
  children,
  delay = 0,
  lineStagger = 0.1,
  skew = false,
  shrink = false,
  animate = true,
  className,
}: SplitTextProps) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const words = children.split(/\s+/).filter(Boolean);

  useIsomorphicLayoutEffect(() => {
    const measure = () => {
      const node = measureRef.current;
      if (!node) return;
      /*
       * The probe is out of flow so it cannot inflate the heading's max-content width
       * (see SplitText.module.css). Putting it back in flow for the read makes the
       * heading resolve to the width the unwrapped string would occupy — capped by its
       * own max-width — which is the width to split at. Without this the
       * heading shrinks to its longest line and the next measurement re-wraps against
       * that narrower box.
       */
      node.style.position = "static";
      const grouped: string[] = [];
      let currentTop: number | null = null;
      node.querySelectorAll<HTMLElement>("[data-word]").forEach((word) => {
        const top = word.offsetTop;
        if (currentTop === null || Math.abs(top - currentTop) > 2) {
          currentTop = top;
          grouped.push(word.textContent ?? "");
        } else {
          grouped[grouped.length - 1] += ` ${word.textContent ?? ""}`;
        }
      });
      node.style.position = "";
      setLines((prev) =>
        prev && prev.length === grouped.length && prev.every((l, i) => l === grouped[i])
          ? prev
          : grouped,
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (measureRef.current?.parentElement) observer.observe(measureRef.current.parentElement);
    return () => observer.disconnect();
  }, [children]);

  /*
   * The lines rise the first time the text scrolls into view, like Reveal. The measured
   * lines are new DOM nodes: if the animate class landed in the same commit they would
   * never be painted at translateY(105%) and would skip the transition, so only the
   * first line (whose node is reused) moved. Waiting two frames lets the browser paint
   * the start position first.
   */
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!lines || playing) return;
    let first = 0;
    let second = 0;
    const start = () => {
      first = requestAnimationFrame(() => {
        second = requestAnimationFrame(() => setPlaying(true));
      });
    };
    const node = wrapperRef.current;
    let observer: IntersectionObserver | undefined;
    if (node && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            observer?.disconnect();
            start();
          }
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      observer.observe(node);
    } else {
      start();
    }
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [lines, playing]);

  return (
    <span
      ref={wrapperRef}
      className={cn(styles.wrapper, lines && styles.visible, animate && playing && styles.animate, className)}
      style={{ "--delay": `${delay}s` } as React.CSSProperties}
    >
      <span className={styles.srOnly}>{children}</span>
      {/* Hidden probe used only to find where the text wraps. */}
      <span ref={measureRef} className={styles.measure} aria-hidden="true">
        {words.map((word, i) => (
          <span data-word key={i}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
      <span aria-hidden="true" className={cn(styles.inner, skew && styles.skew, shrink && styles.shrink)}>
        {(lines ?? [children]).map((line, i) => (
          <span key={i}>
            <span style={{ "--line-delay": `${i * lineStagger}s` } as React.CSSProperties}>
              {line}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
