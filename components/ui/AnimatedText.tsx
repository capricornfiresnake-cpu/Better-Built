"use client";

import { useEffect, useState, type ElementType, type ReactNode } from "react";
import { useInView } from "./useInView";
import { cn } from "@/lib/utils";

/**
 * Sets a headline one line at a time, each line masked and rising into place.
 *
 * Lines are authored explicitly rather than wrapped by the browser: at display
 * sizes the break points are a composition decision, and a mask only works if
 * it knows where the line ends.
 */
export default function AnimatedText({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  stagger = 90,
  delay = 0,
  /** Runs on mount instead of on scroll — for content above the fold. */
  immediate = false,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  stagger?: number;
  delay?: number;
  immediate?: boolean;
}) {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!immediate) return;
    // A frame's grace so the masked state paints before the lines rise.
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, [immediate]);

  const visible = immediate ? mounted : inView;

  return (
    <Tag ref={ref} data-visible={visible ? "true" : "false"} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          className={cn("line-mask", lineClassName)}
          style={{ "--line-delay": `${delay + i * stagger}ms` } as React.CSSProperties}
        >
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
