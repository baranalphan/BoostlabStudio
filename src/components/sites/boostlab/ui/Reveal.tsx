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
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  mode?: "fade" | "slide" | "rise";
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
      <span className={mode === "fade" ? styles.fade : styles[mode]}>{children}</span>
    </span>
  );
}
