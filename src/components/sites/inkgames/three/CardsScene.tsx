"use client";

import { Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Euler, type Group } from "three";
import { Float } from "./Float";
import { Img3d } from "./Img3d";
import { Model } from "./Model";
import { useViewportSize } from "./useViewport";
import type { CardVariant } from "@/types/inkgames";

const IMG = "/sites/inkgames/3d/images";
const PI = Math.PI;

const BACKDROP: Record<CardVariant, string> = {
  play: `${IMG}/game-bg/magic-blur.webp`,
  win: `${IMG}/game-bg/egypt-blur.webp`,
  earn: `${IMG}/game-bg/wonderland-blur.webp`,
};

/* Object tables lifted from the source bundle, one per card variant. */

function PlayObjects() {
  return (
    <group position={[-0.05, 0, -0.4]} rotation={[0.2, 0.2, 0]}>
      <Model name="build" />
    </group>
  );
}

function WinObjects() {
  return (
    <>
      <group position={[0.14, 0.43, 0.02]} rotation={[0.3, -0.25, 0.4]} scale={0.5}>
        <Model name="zepplin" />
      </group>
      <group position={[-0.2, -0.3, -0.45]} rotation={new Euler(0.5, -1.5, 0, "YXZ")} scale={0.3}>
        <Model name="zepplin" />
      </group>
      <group position={[0.35, -0.3, -0.45]} scale={0.5}>
        <Img3d path={`${IMG}/cards/explosion.webp`} transparent />
      </group>
    </>
  );
}

function EarnObjects() {
  return (
    <>
      <group position={[0.42, -0.32, -0.35]} rotation={[-0.5, -0.2 + PI, 0.5]} scale={0.18}>
        <Model name="coin" />
      </group>
      <group position={[0.15, -0.1, -0.25]} rotation={[-0.5, 0.2, 0.3]} scale={0.22}>
        <Model name="coin" />
      </group>
      <group position={[0.32, 0.35, -0.2]} rotation={[0.2, 0.2, -0.3]} scale={0.3}>
        <Model name="coin" />
      </group>
      <group position={[-0.22, 0.1, -0.1]} rotation={[-0.2, -0.5 + PI, 1]} scale={0.325}>
        <Model name="coin" />
      </group>
      <group position={[-0.15, 0.55, 0.08]} rotation={[-0.3, 0.3, 0]} scale={0.4}>
        <Model name="coin" />
      </group>
      <group position={[0.44, -0.65, -0.45]} rotation={new Euler(0, -0.5, 0.2, "ZYX")} scale={0.5}>
        <Model name="trophy" />
      </group>
    </>
  );
}

const OBJECTS: Record<CardVariant, () => React.ReactElement> = {
  play: PlayObjects,
  win: WinObjects,
  earn: EarnObjects,
};

/**
 * One card's scene. Each card gets its own tracked view, so the backdrop and objects are
 * clipped to the card rectangle exactly the way the source's stencil mask clips them.
 *
 * The group tilts toward the pointer — up to a quarter-turn of π on each axis, as in the
 * source — and eases back to flat when the pointer leaves.
 */
export function CardsScene({ variant }: { variant: CardVariant }) {
  const tilt = useRef<Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const readViewport = useViewportSize();
  const Objects = OBJECTS[variant];

  useFrame(({ pointer }) => {
    const node = tilt.current;
    if (!node) return;
    // `pointer` is -1..1 across this view, so halve it to get the source's ±0.5 range.
    target.current.x = (pointer.y * -0.5) * PI * 0.25;
    target.current.y = (pointer.x * 0.5) * PI * 0.25;
    node.rotation.x += (target.current.x - node.rotation.x) * 0.08;
    node.rotation.y += (target.current.y - node.rotation.y) * 0.08;
  });

  // The backdrop covers the card and then some, so the tilt never exposes an edge.
  const vp = readViewport();
  const cover = Math.max(vp.width, vp.height) * 3.2;

  return (
    <>
      <Environment files={`${IMG}/hdr/dawn.jpg`} />
      <group ref={tilt}>
        <group position={[0, 0, -vp.width]}>
          <Img3d path={BACKDROP[variant]} scale={[cover, cover]} aspectRatio={1} />
        </group>
        {/* The source lays these objects out in a space where the card is ~2.2 units
            wide; scaling by the card's world width over 2.2 reproduces both their size
            and their positions. */}
        <group scale={vp.width / 2.2}>
          <Float rotFactor={0.03} posFactor={0.02} seed={variant.length}>
            <Objects />
          </Float>
        </group>
      </group>
    </>
  );
}
