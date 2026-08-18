import type { ComponentType } from "react";

import * as SableAndOak from "./sable-and-oak";
import * as IronwoodConstruction from "./ironwood-construction";
import * as ClearwaterHomeServices from "./clearwater-home-services";

export type PreviewPair = {
  Desktop: ComponentType;
  Mobile: ComponentType;
};

/**
 * Maps a project slug to its miniature website.
 *
 * Only concept work appears here. Client projects have a real site to
 * photograph, so they set `cover` in `data/projects.ts` instead and their
 * screenshots are captured by `npm run capture:covers`.
 */
export const previews: Record<string, PreviewPair> = {
  "sable-and-oak": SableAndOak,
  "ironwood-construction": IronwoodConstruction,
  "clearwater-home-services": ClearwaterHomeServices,
};

/**
 * Fixed design canvas every preview is authored against. Previews that run
 * longer are cropped at the bottom edge, the way a real screenshot would be.
 */
export const PREVIEW_DESKTOP = { width: 1400, height: 800 } as const;
export const PREVIEW_MOBILE = { width: 390, height: 720 } as const;
