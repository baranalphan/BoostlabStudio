"use client";

import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useMemo } from "react";
import type { Material, Mesh, Object3D } from "three";

export const MODELS = [
  "book",
  "build",
  "bunny",
  "cactrish",
  "card-dark",
  "card-deck",
  "card-light",
  "chest1",
  "chest2",
  "city",
  "coin",
  "dice",
  "dino",
  "fueltank",
  "gem",
  "halfstack",
  "minecart",
  "peep",
  "plane",
  "rose",
  "speeder",
  "ticket",
  "trophy",
  "zepplin",
] as const;

export type ModelName = (typeof MODELS)[number];

const url = (name: ModelName) => `/sites/boostlab/3d/models/${name}.glb`;

/**
 * Every model component in the source renders the glTF's meshes inside a `scale={0.5}`
 * group, so a single generic loader reproduces them all. `materialFilter` covers the two
 * models that ship colour variants (zepplin blue/red, card-deck purple/yellow) — the
 * source picks the material by name, so we hide the meshes using the other one.
 */
export function Model({
  name,
  variant,
  ...props
}: {
  name: ModelName;
  variant?: "red" | "yellow";
} & React.ComponentProps<"group">) {
  const { scene } = useGLTF(url(name));

  const cloned = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    if (!variant) return;
    const wanted = variant === "red" ? "red" : "yellow";
    const unwanted = variant === "red" ? "blue" : "purple";
    cloned.traverse((child: Object3D) => {
      const mesh = child as Mesh;
      if (!mesh.isMesh) return;
      const mats = (Array.isArray(mesh.material) ? mesh.material : [mesh.material]) as Material[];
      const names = mats.map((m) => m.name.toLowerCase()).join(" ");
      if (names.includes(unwanted) && !names.includes(wanted)) mesh.visible = false;
    });
  }, [cloned, variant]);

  return (
    <group {...props} dispose={null}>
      <primitive object={cloned} scale={0.5} />
    </group>
  );
}

