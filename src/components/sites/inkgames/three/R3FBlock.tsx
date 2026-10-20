"use client";

import { View } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { cn } from "@/lib/utils";
import styles from "./R3FCanvas.module.css";

let nextIndex = 1;

/**
 * Places a scene over a region of the page. The source wraps each 3d section in an
 * `R3FBlockMain` div that the shared canvas tracks; drei's <View> does the same job —
 * outside the canvas it renders its own element and projects the children into the
 * canvas using that element's bounding box as the viewport.
 */
export function R3FBlock({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const index = useRef(nextIndex++);

  return (
    <View
      className={cn(styles.block, className)}
      style={style}
      index={index.current}
      aria-hidden="true"
    >
      <Suspense fallback={null}>{children}</Suspense>
    </View>
  );
}
