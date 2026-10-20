"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./SplitText.module.css";

type SplitTextProps = {
  children: string;
  /** Seconds before the first line starts moving. */
  delay?: number;
  /** Seconds added per line. The source staggers lines by 0.1s. */
  lineStagger?: number;
  /** The hero heading also un-skews as the lines rise. */
  skew?: boolean;
  animate?: boolean;
  className?: string;
};

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Mirrors the source's SplitText. The string is rendered once, visually hidden, for
 * assistive tech; the visible copy is split into the lines the text actually wraps
 * onto, each line clipped so its inner span can slide up from translateY(105%).
 *
 * The lines are measured from the rendered word positions rather than guessed, and
 * re-measured on resize, because the source's headings reflow with the fluid type scale.
 */
export function SplitText({
  children,
  delay = 0,
  lineStagger = 0.1,
  skew = false,
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

  return (
    <span
      className={cn(styles.wrapper, lines && styles.visible, animate && lines && styles.animate, className)}
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
      <span aria-hidden="true" className={cn(styles.inner, skew && styles.skew)}>
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
