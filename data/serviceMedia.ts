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
  /**
   * A finished still instead of a transformation video. When set, the service
   * renders this image and nothing else — no video, no before/after labels.
   * Portrait or landscape; the frame follows `stillAspect`.
   */
  still?: string;
  /** Aspect ratio for a `still`, as a CSS `aspect-ratio` value. Defaults to 3 / 4. */
  stillAspect?: string;
  /** Path under /public. Omit the entry entirely rather than passing an empty string. */
  src?: string;
  /** First frame, shown before the video loads and wherever it never loads. */
  poster?: string;
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
  /**
   * Ironwood Construction's 2004 page rebuilt into its 2026 one.
   *
   * Rendered from two screenshots by `npm run transformation:render`; no
   * generation model was involved and every word on screen is a word that was
   * already in the source images.
   */
  design: {
    src: "/videos/services/custom-website-design.mp4",
    srcMobile: "/videos/services/custom-website-design.mobile.mp4",
    poster: "/videos/services/custom-website-design.webp",
    accent: "#c8a368",
    caption: "A 2004 layout, rebuilt for 2026",
    alt: "A dated 2004 construction-company homepage rebuilding section by section into a modern one: a dark header, a full-width photograph of a lit timber house, and a clear quote button.",
  },

  /**
   * Mobile-first development, shown as one build across a monitor, a tablet and
   * a phone rather than as a diagram. A still, not a video — there is no
   * before/after to play.
   */
  mobile: {
    still: "/images/services/bakery.png",
    stillAspect: "896 / 1200",
    accent: "#c9a27a",
    caption: "One build, every screen",
    alt: "A bakery website shown together on a desktop monitor, a tablet and a phone — each laid out for its own screen, with bread and pastry photography, a product gallery, and a baker at work.",
  },

  /**
   * Conversion-focused design, shown as a landscaping site whose whole layout
   * drives toward a quote. A still, not a video.
   */
  conversion: {
    still: "/images/services/lands.png",
    stillAspect: "896 / 1200",
    accent: "#8aa66a",
    caption: "A layout built to turn visits into quotes",
    alt: "A landscaping company's website on a desktop monitor — a hero photograph of a finished backyard with a firepit and lawn, a before-and-after gallery of projects, reviews with trust badges, and a request-a-quote form.",
  },

  /**
   * SEO foundations, shown as a home-remodeling site structured to be found —
   * clear headings, a gallery, and named services. A still, not a video.
   */
  seo: {
    still: "/images/services/house.png",
    stillAspect: "896 / 1200",
    accent: "#6f8fd0",
    caption: "Structured so search engines can read it",
    alt: "A home-remodeling company's website on a desktop monitor — a hero kitchen photograph, a project gallery, and a grid of named services such as kitchen remodeling, bathroom renovations and flooring installation.",
  },
};

export function getServiceMedia(id: string): ServiceMedia | undefined {
  return serviceMedia[id];
}
