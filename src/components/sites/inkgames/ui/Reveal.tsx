"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./Reveal.module.css";

/**
 * The source's Animate wrapper: content fades (or slides up out of a clipped box) the
 * first time it enters the viewport, on the same easings as its other reveals.
 */
export function Reveal({
  children,
  delay = 0,
  mode = "fade",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  mode?: "fade" | "slide";
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
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={cn(styles.wrapper, mode === "slide" && styles.clip, className)}
      data-shown={shown ? "true" : "false"}
      style={{ "--delay": `${delay}s` } as React.CSSProperties}
    >
      <span className={mode === "slide" ? styles.slide : styles.fade}>{children}</span>
    </span>
  );
}
