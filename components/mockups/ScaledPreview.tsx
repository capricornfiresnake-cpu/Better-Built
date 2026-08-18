"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scales a miniature website authored at a fixed design size down to whatever
 * width the frame is given.
 *
 * The stylesheet sets a container-query-based scale that browsers supporting
 * `calc()` length division apply on first paint; this effect then sets an exact
 * factor so the result is identical everywhere. `children` is passed in from a
 * Server Component, so the previews themselves never ship to the client.
 */
export default function ScaledPreview({
  children,
  designWidth,
  designHeight,
  label,
  className,
}: {
  children: ReactNode;
  designWidth: number;
  designHeight: number;
  /**
   * Alternative text. A preview is a picture of a website, so it is exposed as
   * a single image — assistive technology gets this description rather than the
   * mockup's decorative copy.
   */
  label: string;
  className?: string;
}) {
  const scalerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scaler = scalerRef.current;
    const canvas = scaler?.firstElementChild as HTMLElement | null;
    if (!scaler || !canvas) return;

    const apply = (width: number) => {
      if (width > 0) canvas.style.transform = `scale(${width / designWidth})`;
    };

    apply(scaler.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) apply(entry.contentRect.width);
    });
    observer.observe(scaler);

    return () => observer.disconnect();
  }, [designWidth]);

  return (
    <div
      ref={scalerRef}
      role="img"
      aria-label={label}
      className={cn("preview-scaler", className)}
      style={{ aspectRatio: `${designWidth} / ${designHeight}` }}
    >
      <div
        className="preview-canvas"
        style={
          {
            "--design-w": designWidth,
            "--design-h": designHeight,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}
