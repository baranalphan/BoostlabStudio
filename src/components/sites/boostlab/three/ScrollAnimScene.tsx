"use client";

import { Environment } from "@react-three/drei";
import { Elem3d } from "./Elem3d";
import { Float } from "./Float";
import { Img3d } from "./Img3d";
import { Model } from "./Model";
import { ScrollTransform } from "./ScrollTransform";

const IMG = "/sites/boostlab/3d/images";
const PI = Math.PI;

type Vec3 = [number, number, number];

/**
 * The BoostlabPay section's scene: the coin-eyed octo anchored bottom-right with coins raining
 * past it, each travelling between its start and end transform across the pinned scroll.
 */
const COINS: {
  position: Vec3;
  tabletPosition?: Vec3;
  deskPosition?: Vec3;
  size: [number, "auto"];
  tabletSize?: [number, "auto"];
  deskSize?: [number, "auto"];
  startPosition: Vec3;
  endPosition: Vec3;
  startRotation: Vec3;
  endRotation: Vec3;
}[] = [
  {
    position: [0.4, -0.1, -0.5],
    tabletPosition: [0.32, 0.4, -0.5],
    deskPosition: [0.1, -0.1, -0.5],
    size: [0.15, "auto"],
    tabletSize: [0.12, "auto"],
    deskSize: [0.1, "auto"],
    startPosition: [0, 1.3, 0],
    endPosition: [0, -1.3, 0],
    startRotation: [-PI / 5, -PI / 3, -PI / 2],
    endRotation: [PI / 5, PI / 3, -PI / 4],
  },
  {
    position: [-0.45, -0.15, 0],
    deskPosition: [0.18, -0.35, 0],
    size: [0.2, "auto"],
    deskSize: [0.08, "auto"],
    startPosition: [0, 1, 0],
    endPosition: [0, -1, 0],
    startRotation: [-PI / 4, PI / 3, PI / 6],
    endRotation: [PI / 4, -PI / 3, -PI / 6],
  },
  {
    position: [-0.4, -0.22, 0],
    tabletPosition: [0.4, -0.25, 0],
    deskPosition: [0.4, -0.45, 0],
    size: [0.1, "auto"],
    tabletSize: [0.12, "auto"],
    deskSize: [0.06, "auto"],
    startPosition: [0, 1.2, 0],
    endPosition: [0, -1.2, 0],
    startRotation: [-PI / 2, -PI / 8, -PI / 2],
    endRotation: [0, PI / 8, -PI / 8],
  },
  {
    position: [0.25, 0.3, 0.5],
    tabletPosition: [0.1, 0.2, 0.5],
    deskPosition: [0.32, 0.35, 0.5],
    size: [0.2, "auto"],
    tabletSize: [0.15, "auto"],
    deskSize: [0.05, "auto"],
    startPosition: [0, 1.2, 0],
    endPosition: [0, -1.2, 0],
    startRotation: [PI / 4, PI / 4 + PI, PI / 4],
    endRotation: [-PI / 4, -PI / 4 + PI, 0],
  },
  {
    position: [-0.15, 0.45, 0],
    tabletPosition: [0, 0.44, 0],
    deskPosition: [0.2, 0.42, 0],
    size: [0.3, "auto"],
    tabletSize: [0.2, "auto"],
    deskSize: [0.08, "auto"],
    startPosition: [0, 1.2, 0],
    endPosition: [0, -1.2, 0],
    startRotation: [-PI / 4, -PI / 3, PI / 6],
    endRotation: [PI / 4, PI / 3, -PI / 6],
  },
  {
    position: [-0.25, 0.32, 0],
    tabletPosition: [-0.3, 0.32, 0],
    deskPosition: [0.12, 0.22, 0],
    size: [0.15, "auto"],
    deskSize: [0.07, "auto"],
    startPosition: [0, 1.2, 0],
    endPosition: [0, -1.2, 0],
    startRotation: [0, PI / 8, PI / 3],
    endRotation: [-PI / 2, -PI / 8, PI / 8],
  },
];

export function ScrollAnimScene({ progress }: { progress: React.RefObject<number> }) {
  return (
    <>
      <Environment files={`${IMG}/hdr/dawn.jpg`} />

      <Elem3d
        position={[0.3, -0.5, 0]}
        tabletPosition={[0.3, -0.5, 0]}
        deskPosition={[0.3, -0.5, 0]}
        size={[0.75, "auto"]}
        tabletSize={[0.55, "auto"]}
        deskSize={[0.4, "auto"]}
        origin={[0, -0.5]}
        scaleZ={false}
      >
        <Float rotFactor={0.03} posFactor={0.02} seed={0}>
          <Img3d path={`${IMG}/octo/octo-coin.webp`} transparent />
        </Float>
      </Elem3d>

      {COINS.map((coin, i) => (
        <Elem3d
          key={i}
          position={coin.position}
          tabletPosition={coin.tabletPosition}
          deskPosition={coin.deskPosition}
          size={coin.size}
          tabletSize={coin.tabletSize}
          deskSize={coin.deskSize}
        >
          <Float rotFactor={0.05} posFactor={0.02} seed={i * 2.3}>
            <ScrollTransform
              startPosition={coin.startPosition}
              endPosition={coin.endPosition}
              startRotation={coin.startRotation}
              endRotation={coin.endRotation}
              progress={progress}
            >
              <Model name="coin" />
            </ScrollTransform>
          </Float>
        </Elem3d>
      ))}
    </>
  );
}
