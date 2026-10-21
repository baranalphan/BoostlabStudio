"use client";

import { useFrame } from "@react-three/fiber";
import { useId, useMemo, useRef } from "react";
import type { Group } from "three";

/**
 * The source's idle wobble: every floating object drifts on a slow sine and counter-rotates
 * on a cosine, seeded by its own offset so the set never moves in lockstep.
 */
export function Float({
  children,
  rotFactor = 0.05,
  posFactor = 0.03,
  speed = 1.4,
  seed,
}: {
  children: React.ReactNode;
  rotFactor?: number;
  posFactor?: number;
  speed?: number;
  seed?: number;
}) {
  const ref = useRef<Group>(null);
  const id = useId();
  // A stable per-instance phase offset so a group of objects never drifts in lockstep.
  const offset = useMemo(() => {
    if (seed !== undefined) return seed;
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) % 1000;
    return (hash / 1000) * Math.PI * 2;
  }, [seed, id]);

  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g) return;
    const t = clock.elapsedTime;
    g.position.x = posFactor * Math.cos(speed * t * 0.1 + offset) * 0.1;
    g.position.y = posFactor * Math.sin(speed * t + offset);
    g.rotation.x = rotFactor * Math.sin(t + offset);
    g.rotation.y = rotFactor * Math.cos(t - offset);
  });

  return <group ref={ref}>{children}</group>;
}
