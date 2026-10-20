"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useImperativeHandle, useRef } from "react";
import type { Group } from "three";
import { CONTAINED } from "./store";
import { useBreakpoint, useViewportSize } from "./useViewport";

type Vec3 = [number, number, number];
type Size = [number | "auto", number | "auto"];
type Origin = [number, number];

export type Elem3dHandle = {
  node: React.RefObject<Group | null>;
  positions: React.RefObject<[Vec3, Vec3, Vec3]>;
  needsUpdate: React.RefObject<boolean>;
};

export type Elem3dProps = {
  ref?: React.Ref<Elem3dHandle>;
  position?: Vec3;
  tabletPosition?: Vec3;
  deskPosition?: Vec3;
  size?: Size;
  tabletSize?: Size;
  deskSize?: Size;
  origin?: Origin;
  tabletOrigin?: Origin;
  deskOrigin?: Origin;
  aspectRatio?: number;
  scaleZ?: boolean;
  visibility?: [boolean, boolean, boolean];
  isContained?: boolean;
  children: React.ReactNode;
};

const fill = <T,>(a: T, b: T | undefined, c: T | undefined): [T, T, T] => {
  const t = b ?? a;
  return [a, t, c ?? t];
};

/**
 * Port of the source's Elem3d. Objects are placed in *viewport fractions* rather than
 * world units: x is a fraction of the (contained) viewport width, y a fraction of its
 * height, z a raw world offset. Sizes work the same way, with "auto" deriving the other
 * axis from the given aspect ratio. Values are chosen per breakpoint and recomputed every
 * frame so resizing and view changes are picked up.
 */
export function Elem3d({
  ref,
  position = [0, 0, 0],
  tabletPosition,
  deskPosition,
  size = ["auto", "auto"],
  tabletSize,
  deskSize,
  origin = [0, 0],
  tabletOrigin,
  deskOrigin,
  aspectRatio = 1,
  scaleZ = true,
  visibility = [true, true, true],
  isContained = true,
  children,
}: Elem3dProps) {
  const node = useRef<Group>(null);
  const needsUpdate = useRef(true);
  const positions = useRef(fill(position, tabletPosition, deskPosition));
  const sizes = useRef(fill(size, tabletSize, deskSize));
  const origins = useRef(fill(origin, tabletOrigin, deskOrigin));

  const bp = useBreakpoint();
  const readViewport = useViewportSize();

  useImperativeHandle(ref, () => ({ node, positions, needsUpdate }), []);

  useEffect(() => {
    needsUpdate.current = true;
    positions.current = fill(position, tabletPosition, deskPosition);
    sizes.current = fill(size, tabletSize, deskSize);
    origins.current = fill(origin, tabletOrigin, deskOrigin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, tabletPosition, deskPosition, size, tabletSize, deskSize, bp]);

  useFrame(() => {
    if (!node.current) return;
    const vp = readViewport();
    const vw = vp.width * (isContained ? Math.min(CONTAINED / window.innerWidth, 1) : 1);
    const vh = vp.height;
    const pos = positions.current[bp];
    const sz = sizes.current[bp];
    const org = origins.current[bp];

    let sx: number;
    let sy: number;
    if (sz[0] === "auto" && sz[1] === "auto") {
      sx = 1;
      sy = 1;
    } else {
      sx = sz[0] === "auto" ? (sz[1] as number) * vh * aspectRatio : (sz[0] as number) * vw;
      sy = sz[1] === "auto" ? (sz[0] as number) * vw : (sz[1] as number) * vh * aspectRatio;
    }
    node.current.scale.set(sx, sy, scaleZ ? sx : 1);

    const w = sz[0] === "auto" ? sy : sx;
    const h = sz[1] === "auto" ? sx / aspectRatio : sy;
    node.current.position.set(pos[0] * vw - org[0] * w, pos[1] * vh - org[1] * h, pos[2]);
    needsUpdate.current = false;
  });

  return (
    <group ref={node} visible={visibility[bp]}>
      {children}
    </group>
  );
}
