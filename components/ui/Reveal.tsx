"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "./useInView";
import { cn } from "@/lib/utils";

type Mode = "fade" | "clip" | "settle" | "rule";

const modes: Record<Mode, string> = {
  fade: "reveal",
  clip: "reveal-clip",
  /** Arrives at 96% and settles — used on the portfolio previews. */
  settle: "reveal-settle",
  /** A hairline that draws itself left to right. */
  rule: "reveal-rule",
};

type RevealProps = {
  children: ReactNode;
  /** Milliseconds of stagger against neighbouring reveals. */
  delay?: number;
  mode?: Mode;
  as?: ElementType;
  className?: string;
  threshold?: number;
};

/**
 * Scroll-triggered reveal on IntersectionObserver — no animation library.
 * The animation itself lives in CSS, so `prefers-reduced-motion` switches it
 * off without any JavaScript branch.
 */
export default function Reveal({
  children,
  delay = 0,
  mode = "fade",
  as: Tag = "div",
  className,
  threshold,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>({ threshold });

  return (
    <Tag
      ref={ref}
      data-visible={inView ? "true" : "false"}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={cn(modes[mode], className)}
    >
      {children}
    </Tag>
  );
}
