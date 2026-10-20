"use client";

import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { PerspectiveCamera } from "three";
import type { Bp } from "./store";

/**
 * World-space size of the visible plane at z = 0.
 *
 * drei's <View> freezes the portal's `size` at mount, so r3f's own `viewport` is stale
 * inside a view. The camera, by contrast, has its aspect refreshed every frame from the
 * view's live rect, so deriving the viewport from the camera is both correct and live.
 */
export function useViewportSize() {
  const camera = useThree((s) => s.camera);
  const ref = useRef({ width: 1, height: 1 });

  const read = () => {
    if (camera instanceof PerspectiveCamera) {
      const height = 2 * Math.tan((camera.fov * Math.PI) / 360) * Math.abs(camera.position.z);
      ref.current.height = height;
      ref.current.width = height * camera.aspect;
    }
    return ref.current;
  };

  return read;
}

/**
 * The source buckets its 3d layout into mobile / tablet / desktop off the *window* width,
 * not the canvas, so a view that happens to be narrower than the page keeps the desktop
 * arrangement.
 */
export function useBreakpoint(): Bp {
  const [bp, setBp] = useState<Bp>(2);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setBp(w >= 1240 ? 2 : w >= 768 ? 1 : 0);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
}
