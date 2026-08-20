/**
 * SERVICE TRANSFORMATION MEDIA
 * ============================
 *
 * Maps a service id to its generated before → build → after video.
 *
 * A service with no entry here falls back to its hand-drawn CSS diagram in
 * `components/services/ServiceVisual.tsx`, which is a finished piece of work in
 * its own right — not a placeholder. That is deliberate: a service is never
 * blocked on an asset existing, and a video that turns out badly can be removed
 * by deleting one entry rather than by rebuilding the page.
 *
 * `accent` is the dominant colour of that video, used only for the thin rule
 * under the frame so the caption belongs to the footage. Each service gets a
 * different one on purpose: the range of palettes is the argument that Better
 * Built designs for many kinds of business, rather than applying one house
 * style to all of them.
 */

export type ServiceMedia = {
  /** Path under /public. Omit the entry entirely rather than passing an empty string. */
  src: string;
  /** First frame, shown before the video loads and wherever it never loads. */
  poster: string;
  /** Optional lighter file for phones. Falls back to `src`. */
  srcMobile?: string;
  /** Dominant colour of the footage. */
  accent: string;
  /** Describes the transformation for anyone who cannot see it. */
  alt: string;
  /** Short mono line under the frame. */
  caption: string;
};

export const serviceMedia: Record<string, ServiceMedia> = {
  design: {
    src: "/videos/services/custom-website-design.mp4",
    srcMobile: "/videos/services/custom-website-design.mobile.mp4",
    poster: "/videos/services/custom-website-design.webp",
    accent: "#d08a2c",
    caption: "Dated homepage → premium editorial site",
    alt: "A cramped, dated grey restaurant homepage rebuilding itself into a modern one: a large warm photograph of a candlelit dining room, generous whitespace, and a clear amber booking button.",
  },
};

export function getServiceMedia(id: string): ServiceMedia | undefined {
  return serviceMedia[id];
}
