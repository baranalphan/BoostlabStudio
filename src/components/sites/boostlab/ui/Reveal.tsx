"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./Reveal.module.css";

/**
 * Content fades (or slides up out of a clipped box) the first time it enters the
 * viewport, on the same easings as the site's other reveals. "rise" is
 * the slide without the clip, for things that grow or glow past their box (logos).
 */
export function Reveal({
  children,
  delay = 0,
  mode = "fade",
  margin = "0px 0px -10% 0px",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  mode?: "fade" | "slide" | "rise";
  /**
   * How far into the viewport the content must come before it shows. The default waits
   * until it clears the bottom tenth of the screen; content at the very end of the page
   * (the footer) can never get that high, so it passes "0px" to show once it's in view.
   */
  margin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [margin]);

  return (
    <span
      ref={ref}
      className={cn(styles.wrapper, mode === "slide" && styles.clip, className)}
      data-shown={shown ? "true" : "false"}
      style={{ "--delay": `${delay}s` } as React.CSSProperties}
    >
      <span className={mode === "fade" ? styles.fade : styles[mode]}>{children}</span>
    </span>
  );
}
