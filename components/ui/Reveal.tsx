"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Milliseconds of stagger against neighbouring reveals. */
  delay?: number;
  /** `clip` wipes content upward; `fade` lifts and fades. */
  mode?: "fade" | "clip";
  as?: ElementType;
  className?: string;
};

/**
 * Scroll-triggered reveal built on IntersectionObserver — no animation library.
 * Animation itself lives in CSS so `prefers-reduced-motion` disables it cleanly.
 */
export default function Reveal({
  children,
  delay = 0,
  mode = "fade",
  as: Tag = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Anything already in view on load reveals immediately.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-visible={visible ? "true" : "false"}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={cn("reveal", mode === "clip" && "reveal-clip", className)}
    >
      {children}
    </Tag>
  );
}
