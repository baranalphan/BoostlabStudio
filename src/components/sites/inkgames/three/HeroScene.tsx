"use client";

import { Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { Elem3d } from "./Elem3d";
import { Float } from "./Float";
import { Img3d } from "./Img3d";
import { Model, type ModelName } from "./Model";

const IMG = "/sites/inkgames/3d/images";
const PI = Math.PI;

type Vec3 = [number, number, number];
type Size = [number | "auto", number | "auto"];

type HeroElem = {
  position: Vec3;
  tabletPosition?: Vec3;
  deskPosition?: Vec3;
  size: Size;
  tabletSize?: Size;
  deskSize?: Size;
  origin?: [number, number];
  rotation: Vec3;
  model?: ModelName;
  path?: string;
  isCenter?: boolean;
};

/**
 * The hero's object table, taken verbatim from the source bundle: positions and sizes are
 * viewport fractions per breakpoint (mobile / tablet / desktop), rotations are radians.
 */
const ELEMENTS: HeroElem[] = [
  {
    position: [-0.4, 0.35, 0],
    tabletPosition: [-0.5, -0.1, 0],
    deskPosition: [-0.42, -0.06, 0],
    size: [0.28, "auto"],
    tabletSize: [0.1, "auto"],
    deskSize: [0.08, "auto"],
    rotation: [-PI / 8, PI, -PI / 3],
    model: "coin",
  },
  {
    position: [-0.48, 0.1, -0.3],
    tabletPosition: [-0.45, -0.15, -0.3],
    deskPosition: [-0.38, -0.1, -0.3],
    size: [0.05, "auto"],
    tabletSize: [0.03, "auto"],
    rotation: [-PI / 8, 0, PI / 4],
    model: "gem",
  },
  {
    position: [-0.42, 0.25, -0.2],
    tabletPosition: [-0.47, -0.2, -0.2],
    deskPosition: [-0.4, -0.18, -0.2],
    size: [0.095, "auto"],
    tabletSize: [0.05, "auto"],
    deskSize: [0.04, "auto"],
    rotation: [PI / 10, 0, PI / 6],
    model: "fueltank",
  },
  {
    position: [-0.48, 0.17, 0],
    tabletPosition: [-0.37, -0.17, 0],
    deskPosition: [-0.3, -0.15, 0],
    size: [0.07, "auto"],
    tabletSize: [0.05, "auto"],
    rotation: [PI / 12, (9 * PI) / 8, PI / 3],
    model: "coin",
  },
  {
    position: [-0.5, -0.13, 0],
    tabletPosition: [-0.32, -0.25, 0],
    deskPosition: [-0.25, -0.25, 0],
    size: [0.16, "auto"],
    tabletSize: [0.12, "auto"],
    deskSize: [0.08, "auto"],
    rotation: [PI / 8, 0, PI / 4],
    model: "zepplin",
  },
  {
    position: [-0.24, -0.14, -0.2],
    tabletPosition: [-0.23, -0.33, -0.2],
    deskPosition: [-0.2, -0.33, -0.2],
    size: [0.05, "auto"],
    tabletSize: [0.04, "auto"],
    deskSize: [0.03, "auto"],
    rotation: [0, PI / 10, PI / 6],
    model: "coin",
  },
  {
    position: [-0.3, -0.2, -0.1],
    tabletPosition: [-0.16, -0.35, -0.1],
    deskPosition: [-0.13, -0.35, -0.1],
    size: [0.08, "auto"],
    tabletSize: [0.04, "auto"],
    deskSize: [0.03, "auto"],
    rotation: [-PI / 4, PI / 6, PI / 4],
    model: "bunny",
  },
  {
    position: [0, -0.48, 0],
    size: [0.65, "auto"],
    tabletSize: [0.38, "auto"],
    deskSize: ["auto", 0.28],
    origin: [0, -0.5],
    rotation: [0, 0, PI / 20],
    path: `${IMG}/octo/octo-glow.webp`,
    isCenter: true,
  },
  {
    position: [0.25, -0.16, -0.1],
    tabletPosition: [0.2, -0.34, -0.1],
    deskPosition: [0.13, -0.31, -0.1],
    size: [0.14, "auto"],
    tabletSize: [0.1, "auto"],
    deskSize: [0.06, "auto"],
    rotation: [0, 0, PI / 6],
    model: "card-light",
  },
  {
    position: [0.48, -0.12, -0.3],
    tabletPosition: [0.52, -0.17, -0.3],
    deskPosition: [0.2, -0.32, -0.3],
    size: [0.04, "auto"],
    deskSize: [0.022, "auto"],
    rotation: [-PI / 12, PI / 12, PI / 6],
    model: "gem",
  },
  {
    position: [0.4, 0.2, 0],
    tabletPosition: [0.3, -0.33, 0],
    deskPosition: [0.24, -0.28, 0],
    size: [0.07, "auto"],
    tabletSize: [0.025, "auto"],
    deskSize: [0.018, "auto"],
    rotation: [-PI / 6, 0, -PI / 5],
    model: "ticket",
  },
  {
    position: [0.45, -0.22, -0.5],
    tabletPosition: [0.38, -0.25, -0.5],
    deskPosition: [0.33, -0.18, -0.5],
    size: [0.25, "auto"],
    tabletSize: [0.2, "auto"],
    deskSize: [0.17, "auto"],
    rotation: [0, 0, -PI / 10],
    path: `${IMG}/octo/octo-cupid.webp`,
  },
  {
    position: [0.45, 0.15, 0.2],
    tabletPosition: [0.47, -0.2, 0.2],
    deskPosition: [0.37, -0.2, 0.2],
    size: [0.1, "auto"],
    tabletSize: [0.06, "auto"],
    deskSize: [0.04, "auto"],
    rotation: [PI / 10, PI, -PI / 6],
    model: "coin",
  },
  {
    position: [0.4, 0.1, -0.1],
    tabletPosition: [0.42, -0.13, -0.1],
    deskPosition: [0.42, -0.14, -0.1],
    size: [0.05, "auto"],
    tabletSize: [0.025, "auto"],
    rotation: [0, -PI / 20, -PI / 4],
    model: "gem",
  },
  {
    position: [0.5, 0.3, 0],
    tabletPosition: [0.5, -0.08, 0],
    deskPosition: [0.4, -0.02, 0],
    size: [0.25, "auto"],
    tabletSize: [0.11, "auto"],
    deskSize: [0.08, "auto"],
    rotation: [0, -PI / 6, -PI / 3],
    model: "coin",
  },
];

/**
 * Entry animation: each object rises from y = -1 and scales up from 0 on a staggered
 * back-ease, matching the source's GSAP timeline (`stagger: .1, ease: "back.out"`).
 */
function Entry({ index, children }: { index: number; children: React.ReactNode }) {
  const ref = useRef<Group>(null);
  const start = useRef<number | null>(null);
  const delay = index * 0.1;

  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g) return;
    if (start.current === null) start.current = clock.elapsedTime;
    const t = Math.min(Math.max((clock.elapsedTime - start.current - delay) / 1, 0), 1);
    // back.out(1.7)
    const c = 1.70158;
    const e = 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
    g.position.y = -1 + e;
    const s = Math.min(Math.max((clock.elapsedTime - start.current - delay) / 0.8, 0), 1);
    const es = 1 + (c + 1) * Math.pow(s - 1, 3) + c * Math.pow(s - 1, 2);
    g.scale.setScalar(Math.max(es, 0.0001));
  });

  return <group ref={ref}>{children}</group>;
}

export function HeroScene() {
  return (
    <>
      <Environment files={`${IMG}/hdr/dawn.jpg`} />
      {ELEMENTS.map((el, i) => (
        <Elem3d
          key={i}
          position={el.position}
          tabletPosition={el.tabletPosition}
          deskPosition={el.deskPosition}
          size={el.size}
          tabletSize={el.tabletSize}
          deskSize={el.deskSize}
          origin={el.origin}
          scaleZ={!!el.model}
        >
          <Float rotFactor={el.model || el.isCenter ? 0.2 : 0.04} seed={3 * el.position[0]}>
            <Entry index={i}>
              <group rotation={el.rotation}>
                {el.model ? (
                  <Model name={el.model} />
                ) : (
                  <Img3d path={el.path!} transparent />
                )}
              </group>
              {el.isCenter ? (
                <group position={[0, 0.05, -0.1]} scale={0.7}>
                  <Img3d
                    path={`${IMG}/game-bg/wonderland.webp`}
                    aspectRatio={0.72}
                    radius={0.06}
                  />
                </group>
              ) : null}
            </Entry>
          </Float>
        </Elem3d>
      ))}
    </>
  );
}
