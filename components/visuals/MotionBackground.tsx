"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A slot for a generated motion asset.
 *
 * NOTHING ON THE SITE DEPENDS ON THE FILE EXISTING. With no `src`, or before
 * the asset loads, or if it fails outright, this renders the poster — and if
 * there is no poster either, it renders nothing and whatever sits behind it
 * shows through. Drop a file into `public/visuals/` and pass its path.
 *
 *   <MotionBackground
 *     src="/visuals/hero-motion.mp4"
 *     poster="/visuals/hero-poster.webp"
 *   />
 *
 * The video is muted, looped, inline, and only starts once it has scrolled
 * into view. Reduced motion holds the poster and never loads the video at all.
 */
export default function MotionBackground({
  src,
  poster,
  className,
  overlayClassName = "bg-void/55",
  opacity = 0.5,
}: {
  src?: string;
  poster?: string;
  className?: string;
  /** Scrim between the asset and the content above it. */
  overlayClassName?: string;
  opacity?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!src) return;
    const node = containerRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Don't spend a video download on a connection that is already struggling.
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (connection?.saveData) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setLoad(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [src]);

  const showVideo = Boolean(src) && load && !failed;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {poster ? (
        /* Deliberately not next/image: this is a decorative backdrop for an
           asset that may not exist, and it must never affect layout. */
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity }}
        />
      ) : null}

      {showVideo ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity }}
        />
      ) : null}

      {src || poster ? (
        <div className={cn("absolute inset-0", overlayClassName)} />
      ) : null}
    </div>
  );
}
