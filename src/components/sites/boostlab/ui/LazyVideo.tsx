"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A muted, looping background video that downloads nothing until it nears the viewport.
 * An autoplaying video otherwise fetches the whole file with the page, even below the fold.
 */
export function LazyVideo({ src, label }: { src: string; label?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px 200px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={near ? src : undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  );
}
