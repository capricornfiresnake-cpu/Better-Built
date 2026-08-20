"use client";

import { useEffect, useRef, useState } from "react";

import ServiceVisual from "./ServiceVisual";
import { useInView } from "@/components/ui/useInView";
import { getServiceMedia } from "@/data/serviceMedia";
import { cn } from "@/lib/utils";

/**
 * A service, shown as the transformation it is: before → build → after.
 *
 * The video is the argument; everything around it is HTML. The stage label,
 * the caption and the service name are real text in the site's own typography,
 * never burned into the footage — generated lettering cannot be trusted to be
 * spelled correctly, and text that lives in the DOM stays selectable,
 * translatable and legible at every size.
 *
 * Nothing here is required for the page to work. With no entry in
 * `serviceMedia`, this renders the hand-drawn CSS diagram instead, which is a
 * finished piece of work rather than a placeholder.
 */

const STAGES = ["Before", "Build", "After"] as const;

export default function ServiceTransformation({
  id,
  name,
  className,
}: {
  id: string;
  name: string;
  className?: string;
}) {
  const media = getServiceMedia(id);
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0,
    rootMargin: "250px 0px",
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  /**
   * Nothing is fetched until the section is nearly on screen, and on a
   * connection or a preference that says otherwise, nothing is fetched at all —
   * the poster carries it. Six autoplaying videos on one page is a slow page,
   * which would be a strange thing for this particular business to ship.
   */
  useEffect(() => {
    if (!media || !inView || failed) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (connection?.saveData) return;

    const small = window.matchMedia("(max-width: 767px)").matches;
    const chosen = small && media.srcMobile ? media.srcMobile : media.src;
    const id = requestAnimationFrame(() => setSrc(chosen));
    return () => cancelAnimationFrame(id);
  }, [media, inView, failed]);

  // Autoplay can be refused; a paused first frame is indistinguishable from the
  // poster, so there is nothing to recover from — but try once.
  useEffect(() => {
    const node = videoRef.current;
    if (!node || !src) return;
    node.play().catch(() => {});
  }, [src]);

  if (!media) {
    return <ServiceVisual id={id} />;
  }

  const showVideo = Boolean(src) && !failed;

  return (
    <figure ref={ref} className={cn("group/media w-full", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-line bg-card",
          "aspect-16/11",
          "transition-[transform,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "motion-safe:group-hover/media:scale-[1.012] group-hover/media:border-line-hard",
        )}
      >
        {/* The poster is always painted. It is the fallback for reduced
            motion, Save-Data, a decoded-but-not-playing video, and failure. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.poster}
          alt={media.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {showVideo ? (
          <video
            ref={videoRef}
            src={src as string}
            poster={media.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            onCanPlay={() => setReady(true)}
            onError={() => setFailed(true)}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
              ready ? "opacity-100" : "opacity-0",
            )}
          />
        ) : null}

        {/* A hair of extra light on hover, so the frame answers the pointer. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-white/0 transition-colors duration-500 motion-safe:group-hover/media:bg-white/[0.04]"
        />

        {/* The stage label. Real HTML, in the site's own type — never burned
            into the footage. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2.5 bg-gradient-to-t from-black/70 to-transparent px-3.5 pb-3 pt-8">
          {STAGES.map((stage, i) => (
            <span key={stage} className="flex items-center gap-2.5">
              {i > 0 ? (
                <span aria-hidden="true" className="h-px w-3 bg-white/30" />
              ) : null}
              <span
                className="label-mono-sm"
                style={{ color: i === 1 ? media.accent : "rgb(255 255 255 / 0.7)" }}
              >
                {stage}
              </span>
            </span>
          ))}

          <span className="label-mono-sm ml-auto translate-y-1 text-white/0 transition-[color,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/media:translate-y-0 group-hover/media:text-white/70">
            {name}
          </span>
        </div>

        {/* The accent belongs to the footage, so it is the only place the
            frame's own colour appears. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/media:scale-x-100"
          style={{ backgroundColor: media.accent }}
        />
      </div>

      <figcaption className="label-mono-sm mt-3 text-dim">{media.caption}</figcaption>
    </figure>
  );
}
