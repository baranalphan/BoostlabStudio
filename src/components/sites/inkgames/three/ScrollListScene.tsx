"use client";

import { Environment } from "@react-three/drei";
import { Float } from "./Float";
import { Model } from "./Model";
import { ScrollTransform } from "./ScrollTransform";

const IMG = "/sites/inkgames/3d/images";
const PI = Math.PI;

/**
 * The three objects the source cycles through inside the framed scene, one per section:
 * a pair of dice, then a chest, then coins. Each rotates across its own section's progress.
 */
function Dice({ progress }: { progress: React.RefObject<number> }) {
  return (
    <group>
      <group position={[0.1, -0.1, 0]} scale={0.3}>
        <Float rotFactor={0.06} posFactor={0.02} seed={1}>
          <ScrollTransform
            startRotation={[0, 0, 0]}
            endRotation={[0, -PI / 2, -PI / 2]}
            progress={progress}
          >
            <Model name="dice" />
          </ScrollTransform>
        </Float>
      </group>
      <group position={[-0.2, 0.3, -0.5]} scale={0.25}>
        <Float rotFactor={0.06} posFactor={0.02} seed={2}>
          <ScrollTransform
            startRotation={[0, 0, 0]}
            endRotation={[0, PI / 2, PI / 2]}
            progress={progress}
          >
            <Model name="dice" />
          </ScrollTransform>
        </Float>
      </group>
    </group>
  );
}

function Chest({ progress }: { progress: React.RefObject<number> }) {
  return (
    <group scale={0.5}>
      <Float posFactor={0.02} seed={3}>
        <ScrollTransform
          startRotation={[0, 0, 0]}
          endRotation={[PI / 4, PI / 6, PI / 8]}
          progress={progress}
        >
          <Model name="chest2" />
        </ScrollTransform>
      </Float>
    </group>
  );
}

function Coins({ progress }: { progress: React.RefObject<number> }) {
  return (
    <group>
      <group position={[0.1, -0.15, 0]} scale={0.4}>
        <Float posFactor={0.02} seed={4}>
          <ScrollTransform
            startRotation={[PI / 4, -PI / 3, -PI / 6]}
            endRotation={[-PI / 4, PI / 3, PI / 6]}
            progress={progress}
          >
            <Model name="coin" />
          </ScrollTransform>
        </Float>
      </group>
      <group position={[-0.2, 0.15, -0.1]} scale={0.3}>
        <Float posFactor={0.02} seed={5}>
          <ScrollTransform
            startRotation={[0, PI, 0]}
            endRotation={[0, PI / 2 + PI, -PI / 2]}
            progress={progress}
          >
            <Model name="coin" />
          </ScrollTransform>
        </Float>
      </group>
    </group>
  );
}

const SCENES = [Dice, Chest, Coins];

export function ScrollListScene({
  section,
  progress,
}: {
  section: number;
  progress: React.RefObject<number>;
}) {
  const Scene = SCENES[Math.min(Math.max(section, 0), SCENES.length - 1)];
  return (
    <>
      <Environment files={`${IMG}/hdr/dawn.jpg`} />
      <group scale={6}>
        <Scene progress={progress} />
      </group>
    </>
  );
}
