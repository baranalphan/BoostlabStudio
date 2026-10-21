"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

type Vec3 = [number, number, number];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Interpolates an object between a start and end transform from a scroll-progress ref.
 * The source drives its pinned scenes exactly this way — the pin supplies 0→1 and each
 * object reads it to travel from `startPosition/startRotation` to `end…`.
 */
export function ScrollTransform({
  children,
  startPosition = [0, 0, 0],
  endPosition = [0, 0, 0],
  startRotation = [0, 0, 0],
  endRotation = [0, 0, 0],
  progress,
}: {
  children: React.ReactNode;
  startPosition?: Vec3;
  endPosition?: Vec3;
  startRotation?: Vec3;
  endRotation?: Vec3;
  progress: React.RefObject<number>;
}) {
  const ref = useRef<Group>(null);

  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const p = progress.current ?? 0;
    g.position.set(
      lerp(startPosition[0], endPosition[0], p),
      lerp(startPosition[1], endPosition[1], p),
      lerp(startPosition[2], endPosition[2], p),
    );
    g.rotation.set(
      lerp(startRotation[0], endRotation[0], p),
      lerp(startRotation[1], endRotation[1], p),
      lerp(startRotation[2], endRotation[2], p),
    );
  });

  return <group ref={ref}>{children}</group>;
}
