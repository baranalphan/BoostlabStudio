"use client";

import { Environment } from "@react-three/drei";
import { Elem3d } from "./Elem3d";
import { Float } from "./Float";
import { Img3d } from "./Img3d";
import { Model, type ModelName } from "./Model";
import { ScrollTransform } from "./ScrollTransform";
import type { TabVariant } from "@/types/boostlab";

const IMG = "/sites/boostlab/3d/images";
const PI = Math.PI;

type Vec3 = [number, number, number];
type Size = [number | "auto", number | "auto"];

type FloatElem = {
  position: Vec3;
  tabletPosition?: Vec3;
  deskPosition?: Vec3;
  size: Size;
  tabletSize?: Size;
  deskSize?: Size;
  origin?: [number, number];
  aspectRatio?: number;
  visibility?: [boolean, boolean, boolean];
  startPosition?: Vec3;
  endPosition?: Vec3;
  startRotation: Vec3;
  endRotation: Vec3;
  model?: ModelName;
  variant?: "red" | "yellow";
  path?: string;
};

/**
 * The four `gamesTabs` object sets, taken verbatim from the source bundle. Each object
 * travels between its start and end transform across the section's scroll range.
 */
const TABS: Record<TabVariant, FloatElem[]> = {
  board: [
    {
      position: [-0.4, 0.38, -0.5],
      tabletPosition: [-0.4, 0.4, -0.5],
      size: [0.3, "auto"],
      tabletSize: [0.25, "auto"],
      deskSize: [0.2, "auto"],
      path: `${IMG}/game-assets/pyramid.webp`,
      startRotation: [0, 0, PI / 4],
      endRotation: [0, 0, -PI / 2],
    },
    {
      position: [0.25, 0.35, -1],
      tabletPosition: [0.05, 0.35, -1],
      deskPosition: [0.1, 0.45, -1],
      size: [0.11, "auto"],
      tabletSize: [0.09, "auto"],
      deskSize: [0.07, "auto"],
      startRotation: [0, 0, 0],
      endRotation: [0, PI / 2, PI / 2],
      model: "city",
    },
    {
      position: [0.35, 0.48, 0],
      tabletPosition: [0.35, 0.45, 0],
      size: [0.35, "auto"],
      tabletSize: [0.25, "auto"],
      deskSize: [0.15, "auto"],
      startRotation: [0, 0, 0],
      endRotation: [PI / 2, 0, PI / 2],
      model: "zepplin",
      variant: "red",
    },
    {
      position: [-0.4, -0.35, 0],
      tabletPosition: [-0.4, -0.3, 0],
      deskPosition: [-0.4, -0.35, 0],
      size: [0.4, "auto"],
      deskSize: [0.25, "auto"],
      startRotation: [0, 0, 0],
      endRotation: [PI / 4, (2 * PI) / 3, 0],
      model: "speeder",
    },
    {
      position: [-0.05, -0.45, -1],
      deskPosition: [-0.12, -0.45, -1],
      size: [0.18, "auto"],
      deskSize: [0.1, "auto"],
      visibility: [false, true, true],
      startRotation: [0, PI / 8, PI / 8],
      endRotation: [PI / 8, -PI / 3, -PI / 3],
      model: "build",
    },
    {
      position: [0.25, -0.6, -0.5],
      tabletPosition: [0.35, -0.55, -0.5],
      deskPosition: [0.4, -0.55, -0.5],
      size: [0.7, "auto"],
      tabletSize: [0.5, "auto"],
      deskSize: [0.3, "auto"],
      origin: [0, -0.5],
      aspectRatio: 900 / 1064,
      startPosition: [0, 0.2, 0],
      endPosition: [0, -0.5, 0],
      startRotation: [0, 0, -PI / 12],
      endRotation: [0, 0, PI / 8],
      path: `${IMG}/game-assets/empire.webp`,
    },
  ],
  prize: [
    {
      position: [-0.38, 0.3, -0.5],
      deskPosition: [-0.4, 0.4, -0.5],
      size: [0.27, "auto"],
      tabletSize: [0.23, "auto"],
      deskSize: [0.13, "auto"],
      startRotation: [-PI / 4, -PI / 4, PI / 4],
      endRotation: [PI / 2, PI / 4, -PI / 4],
      model: "minecart",
    },
    {
      position: [0, 0.5, -1],
      deskPosition: [-0.1, 0.4, -1],
      size: [0.18, "auto"],
      tabletSize: [0.15, "auto"],
      deskSize: [0.1, "auto"],
      startRotation: [PI / 4, -PI / 2, PI / 6],
      endRotation: [-PI / 4, PI / 2, -PI / 6],
      model: "coin",
    },
    {
      position: [0.35, 0.28, 0],
      tabletPosition: [0.35, 0.32, 0],
      deskPosition: [0.35, 0.4, 0],
      size: [0.35, "auto"],
      tabletSize: [0.3, "auto"],
      deskSize: [0.2, "auto"],
      startRotation: [-PI / 4, 0, -PI / 4],
      endRotation: [PI / 2, 0, PI / 2],
      model: "chest1",
    },
    {
      position: [0.45, 0, -1],
      size: [0.05, "auto"],
      visibility: [false, false, true],
      startRotation: [-PI / 3, (3 * PI) / 2, -PI / 6],
      endRotation: [PI / 3, PI / 2, PI / 6],
      model: "coin",
    },
    {
      position: [-0.4, -0.3, 0],
      tabletPosition: [-0.4, -0.25, 0],
      deskPosition: [-0.4, -0.3, 0],
      size: [0.4, "auto"],
      tabletSize: [0.3, "auto"],
      deskSize: [0.25, "auto"],
      startRotation: [-PI / 6, 0, -PI / 10],
      endRotation: [PI / 6, (3 * PI) / 4, PI / 10],
      model: "chest2",
    },
    {
      position: [-0.08, -0.47, -1],
      deskPosition: [0.08, -0.33, -1],
      size: [0.12, "auto"],
      deskSize: [0.08, "auto"],
      visibility: [false, true, true],
      startRotation: [-PI / 6, PI / 2, PI / 6],
      endRotation: [PI / 6, (3 * PI) / 2, -PI / 6],
      model: "coin",
    },
    {
      position: [0.35, -0.4, -0.5],
      tabletPosition: [0.4, -0.35, -0.5],
      size: [0.7, "auto"],
      tabletSize: [0.45, "auto"],
      deskSize: [0.25, "auto"],
      startRotation: [-PI / 6, PI / 8, -PI / 6],
      endRotation: [PI / 3, -PI / 6, PI / 6],
      model: "card-dark",
    },
  ],
  reward: [
    {
      position: [-0.4, 0.3, -0.5],
      deskPosition: [-0.4, 0.35, -0.5],
      size: [0.2, "auto"],
      tabletSize: [0.17, "auto"],
      deskSize: [0.1, "auto"],
      startRotation: [-PI / 2, -PI / 4, PI / 4],
      endRotation: [PI / 2, PI / 4, -PI / 4],
      model: "fueltank",
    },
    {
      position: [-0.1, 0.48, -1],
      tabletPosition: [0, 0.45, -1],
      deskPosition: [0.1, 0.4, -1],
      size: [0.12, "auto"],
      tabletSize: [0.08, "auto"],
      deskSize: [0.05, "auto"],
      startRotation: [PI / 6, PI / 2, -PI / 6],
      endRotation: [-PI / 6, -PI / 4, PI / 6],
      model: "gem",
    },
    {
      position: [0.4, 0.32, 0],
      tabletPosition: [0.4, 0.35, 0],
      deskPosition: [0.35, 0.4, 0],
      size: [0.17, "auto"],
      deskSize: [0.09, "auto"],
      startRotation: [-PI / 4, 0, -PI / 4],
      endRotation: [PI / 6, 0, PI / 2],
      model: "card-deck",
      variant: "yellow",
    },
    {
      position: [-0.4, -0.3, 0],
      size: [0.15, "auto"],
      deskSize: [0.08, "auto"],
      visibility: [false, true, true],
      startRotation: [-PI / 6, PI / 2, -PI / 6],
      endRotation: [PI / 4, -PI / 2, PI / 6],
      model: "card-deck",
    },
    {
      position: [-0.35, -0.33, -1],
      tabletPosition: [-0.15, -0.48, -1],
      deskPosition: [-0.08, -0.5, -1],
      size: [0.23, "auto"],
      tabletSize: [0.15, "auto"],
      deskSize: [0.1, "auto"],
      startRotation: [PI / 4, -PI / 2, PI / 6],
      endRotation: [-PI / 4, PI / 2, -PI / 6],
      model: "coin",
    },
    {
      position: [0.3, -0.45, -0.5],
      tabletPosition: [0.4, -0.42, -0.5],
      deskPosition: [0.4, -0.4, -0.5],
      size: [0.65, "auto"],
      tabletSize: [0.5, "auto"],
      deskSize: [0.3, "auto"],
      startRotation: [-PI / 6, PI / 8, 0],
      endRotation: [PI / 5, -(2 * PI) / 3, 0],
      model: "trophy",
    },
  ],
  team: [
    {
      position: [-0.4, 0.35, -0.5],
      tabletPosition: [-0.4, 0.3, -0.5],
      deskPosition: [-0.4, 0.4, -0.5],
      size: [0.28, "auto"],
      tabletSize: [0.22, "auto"],
      deskSize: [0.13, "auto"],
      startRotation: [PI / 4, PI / 4, PI / 4],
      endRotation: [-PI / 4, -PI / 4, -PI / 4],
      model: "halfstack",
    },
    {
      position: [0.1, 0.28, -1],
      tabletPosition: [-0.05, 0.35, -1],
      deskPosition: [0.05, 0.4, -1],
      size: [0.15, "auto"],
      tabletSize: [0.13, "auto"],
      deskSize: [0.1, "auto"],
      startRotation: [-PI / 4, PI / 6, PI / 6],
      endRotation: [PI / 4, -PI / 6, -PI / 6],
      model: "peep",
    },
    {
      position: [0.35, 0.45, 0],
      size: [0.45, "auto"],
      tabletSize: [0.35, "auto"],
      deskSize: [0.2, "auto"],
      startRotation: [-PI / 4, 0, -PI / 4],
      endRotation: [PI / 2, 0, PI / 2],
      model: "dino",
    },
    {
      position: [-0.4, -0.25, 0],
      deskPosition: [-0.4, -0.1, 0],
      size: [0.55, "auto"],
      tabletSize: [0.48, "auto"],
      deskSize: [0.3, "auto"],
      startRotation: [PI / 6, PI / 7, -PI / 10],
      endRotation: [-PI / 6, (6 * PI) / 7, PI / 10],
      model: "book",
    },
    {
      position: [-0.05, -0.5, -1],
      deskPosition: [-0.12, -0.45, -1],
      size: [0.16, "auto"],
      deskSize: [0.13, "auto"],
      visibility: [false, true, true],
      startRotation: [-PI / 8, PI / 4, -PI / 4],
      endRotation: [PI / 8, -PI / 4, PI / 4],
      model: "cactrish",
    },
    {
      position: [0.4, -0.45, -0.5],
      size: [0.65, "auto"],
      tabletSize: [0.55, "auto"],
      deskSize: [0.3, "auto"],
      startRotation: [PI / 4, 0, -PI / 4],
      endRotation: [-PI / 4, 0, PI / 4],
      model: "rose",
    },
  ],
};

/**
 * The homepage's `gamesExplore` set: game boards drifting past with dice and coins
 * between them.
 */
const EXPLORE: FloatElem[] = [
  {
    position: [0.05, 0.4, 0],
    tabletPosition: [0.15, 0.4, 0],
    deskPosition: [0.15, 0.4, 0],
    size: [0.55, "auto"],
    tabletSize: [0.4, "auto"],
    deskSize: [0.2, "auto"],
    aspectRatio: 5 / 3,
    startPosition: [0, 0, 0],
    endPosition: [0.1, -0.7, 0],
    startRotation: [PI / 12, PI / 8, -PI / 20],
    endRotation: [-PI / 12, -(9 * PI) / 8, PI / 4],
    path: `${IMG}/game-bg/beach.webp`,
  },
  {
    position: [-0.42, 0.3, -0.5],
    tabletPosition: [-0.4, 0.32, -0.5],
    deskPosition: [-0.38, 0.3, -0.5],
    size: [0.5, "auto"],
    tabletSize: [0.38, "auto"],
    deskSize: [0.19, "auto"],
    aspectRatio: 5 / 3,
    startPosition: [0, 0.35, 0],
    endPosition: [0, -0.45, 0],
    startRotation: [0, 0, PI / 14],
    endRotation: [0, 0, -PI / 10],
    path: `${IMG}/game-bg/wonderland.webp`,
  },
  {
    position: [-0.38, -0.3, 0],
    tabletPosition: [-0.36, -0.3, 0],
    deskPosition: [-0.36, -0.3, 0],
    size: [0.52, "auto"],
    tabletSize: [0.4, "auto"],
    deskSize: [0.22, "auto"],
    aspectRatio: 5 / 3,
    startPosition: [0, 0.5, 0],
    endPosition: [0, -0.4, 0],
    startRotation: [0, 0, -PI / 16],
    endRotation: [0, 0, PI / 9],
    path: `${IMG}/game-bg/desert.webp`,
  },
  {
    position: [0.4, -0.35, -0.3],
    tabletPosition: [0.38, -0.33, -0.3],
    deskPosition: [0.38, -0.33, -0.3],
    size: [0.5, "auto"],
    tabletSize: [0.38, "auto"],
    deskSize: [0.2, "auto"],
    aspectRatio: 5 / 3,
    startPosition: [0, 0.45, 0],
    endPosition: [0, -0.5, 0],
    startRotation: [0, 0, PI / 12],
    endRotation: [0, 0, -PI / 8],
    path: `${IMG}/game-bg/egypt.webp`,
  },
  {
    position: [0.2, 0.35, 1],
    tabletPosition: [0.3, 0.35, 1],
    size: [0.3, "auto"],
    tabletSize: [0.2, "auto"],
    deskSize: [0.12, "auto"],
    startPosition: [0, 1.5, 0],
    endPosition: [0, -1.5, 0],
    startRotation: [-PI / 6, -PI / 2, -(3 * PI) / 4],
    endRotation: [PI / 6, PI / 4, 0],
    model: "dice",
  },
  {
    position: [-0.3, 0.3, -1],
    tabletPosition: [0.1, 0.3, -1],
    size: [0.3, "auto"],
    tabletSize: [0.2, "auto"],
    deskSize: [0.12, "auto"],
    startPosition: [0, 0.8, 0],
    endPosition: [0, -0.8, 0],
    startRotation: [-(4 * PI) / 3, -PI / 4, -PI / 3],
    endRotation: [-PI / 3, PI / 4, PI / 3],
    model: "coin",
  },
  {
    position: [0.25, 0, -1],
    size: [0.192, "auto"],
    tabletSize: [0.128, "auto"],
    deskSize: [0.08, "auto"],
    startPosition: [0, 1, 0],
    endPosition: [0, -1, 0],
    startRotation: [-PI / 5, -PI / 3, -PI / 2],
    endRotation: [PI / 5, PI / 3, -PI / 4],
    model: "dice",
  },
  {
    position: [0.3, -0.1, 0.5],
    size: [0.192, "auto"],
    tabletSize: [0.128, "auto"],
    deskSize: [0.08, "auto"],
    startPosition: [0, 1.8, 0],
    endPosition: [0, -1.8, 0],
    startRotation: [PI / 3, PI / 4 + PI, -(4 * PI) / 3],
    endRotation: [-PI / 3, -PI / 4 + PI, -(2 * PI) / 3],
    model: "coin",
  },
  {
    position: [-0.15, -0.2, 0.5],
    tabletPosition: [0.1, -0.2, 0.5],
    size: [0.096, "auto"],
    tabletSize: [0.064, "auto"],
    deskSize: [0.04, "auto"],
    startPosition: [0, 1.4, 0],
    endPosition: [0, -1.4, 0],
    startRotation: [0, PI / 8, PI / 3],
    endRotation: [-PI / 2, -PI / 8, PI / 8],
    model: "coin",
  },
];

function Elements({
  elements,
  progress,
}: {
  elements: FloatElem[];
  progress: React.RefObject<number>;
}) {
  return (
    <>
      {elements.map((el, i) => (
        <Elem3d
          key={i}
          position={el.position}
          tabletPosition={el.tabletPosition}
          deskPosition={el.deskPosition}
          size={el.size}
          tabletSize={el.tabletSize}
          deskSize={el.deskSize}
          origin={el.origin}
          aspectRatio={el.aspectRatio ?? 1}
          visibility={el.visibility}
          scaleZ={!!el.model}
        >
          <Float rotFactor={0.05} posFactor={0.02} seed={i * 1.7}>
            <ScrollTransform
              startPosition={el.startPosition}
              endPosition={el.endPosition}
              startRotation={el.startRotation}
              endRotation={el.endRotation}
              progress={progress}
            >
              {el.model ? (
                <Model name={el.model} variant={el.variant} />
              ) : (
                <Img3d
                  path={el.path!}
                  transparent={el.path!.includes("game-assets")}
                  radius={el.path!.includes("game-bg") ? 0.04 : 0}
                  aspectRatio={el.aspectRatio ?? 1}
                />
              )}
            </ScrollTransform>
          </Float>
        </Elem3d>
      ))}
    </>
  );
}

export function ScrollFloatScene({
  variant,
  tab,
  progress,
}: {
  variant: "gamesExplore" | "gamesTabs";
  tab?: TabVariant;
  progress: React.RefObject<number>;
}) {
  return (
    <>
      <Environment files={`${IMG}/hdr/dawn.jpg`} />
      <Elements
        elements={variant === "gamesTabs" ? TABS[tab ?? "board"] : EXPLORE}
        progress={progress}
      />
    </>
  );
}
