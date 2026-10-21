"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { OctoMark } from "../icons/OctoMark";
import styles from "./PageLoader.module.css";

/**
 * The source covers the page with a solid #0A0E11 sheet carrying the octo mark, then
 * wipes it away by animating the position of a `linear-gradient(black 50%, transparent 50%)`
 * mask over a 200%-tall mask box. Once it clears, the header fades in.
 */
export function PageLoader() {
  const [done, setDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const start = window.setTimeout(() => setDone(true), 600);
    const end = window.setTimeout(() => setRemoved(true), 1800);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(end);
    };
  }, []);

  useEffect(() => {
    if (done) document.documentElement.setAttribute("data-loaded", "true");
  }, [done]);

  if (removed) return null;

  return (
    <div className={cn(styles.wrapper, done && styles.done)} aria-hidden="true">
      <OctoMark className={styles.logo} />
    </div>
  );
}
