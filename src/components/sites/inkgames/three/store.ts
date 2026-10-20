"use client";

import { createContext, useContext } from "react";

/**
 * Every R3F block on the page renders into one fixed canvas (the source does the same —
 * `.R3FCanvasMain` is a single fixed, pointer-events-none layer at z-index 1 with every
 * section sitting above it at z-index 2). Blocks register a view id so the canvas can
 * keep its draw order stable.
 */
export const BlockContext = createContext<{ id: string }>({ id: "root" });

export function useBlockId() {
  return useContext(BlockContext).id;
}

/** The source's three breakpoint buckets for 3d layout: mobile, tablet, desktop. */
export type Bp = 0 | 1 | 2;

export const BP_TABLET = 768;
export const BP_DESK = 1240;
/** `$contained` — above this width the 3d layout stops growing with the viewport. */
export const CONTAINED = 1920;
