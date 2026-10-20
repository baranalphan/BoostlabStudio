"use client";

import { Canvas } from "@react-three/fiber";
import { Preload, View } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import styles from "./R3FCanvas.module.css";

/**
 * One fixed, pointer-events-none canvas for the whole page, matching the source's
 * `.R3FCanvasMain` (fixed, 100%×100%, z-index 1). Individual sections project into it
 * with drei's <View>, so the DOM stays plain HTML above it at z-index 2.
 *
 * Mounted only on the client and only when the device reports WebGL, so the page still
 * renders completely without it.
 */
export function R3FCanvas() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const probe = document.createElement("canvas");
        setReady(!!(probe.getContext("webgl2") || probe.getContext("webgl")));
      } catch {
        setReady(false);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!ready) return null;

  return (
    <Canvas
      className={styles.canvas}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      camera={{ fov: 50, position: [0, 0, 5] }}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }}
    >
      <Suspense fallback={null}>
        <View.Port />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
