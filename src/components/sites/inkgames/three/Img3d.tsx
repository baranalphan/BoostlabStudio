"use client";

import { Image } from "@react-three/drei";

/**
 * A textured unit plane. The source uses these for the octo sprites, the explosion card
 * and the game-board "portals"; `radius` gives the boards their rounded corners.
 */
export function Img3d({
  path,
  transparent = false,
  radius = 0,
  aspectRatio = 1,
  scale,
  ...props
}: {
  path: string;
  transparent?: boolean;
  radius?: number;
  aspectRatio?: number;
  scale?: [number, number];
} & Omit<React.ComponentProps<typeof Image>, "url" | "texture" | "scale">) {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text -- drei's <Image> is a three.js mesh, not an <img>
    <Image
      url={path}
      transparent={transparent}
      radius={radius}
      scale={scale ?? [1, 1 / aspectRatio]}
      toneMapped={false}
      {...props}
    />
  );
}
