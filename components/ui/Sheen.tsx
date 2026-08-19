"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A soft pool of accent light that follows the pointer across a card.
 *
 * This is the site's only cursor effect: no custom cursor, no magnetism, no
 * trailing dot. It exists because a large preview needs some sign that it is
 * a live object, and it costs one rAF-throttled handler that only ever writes
 * two CSS custom properties. Touch never fires it, and the card is complete
 * without it.
 */
export default function Sheen({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  function handleMove(event: React.MouseEvent<HTMLElement>) {
    const node = ref.current;
    if (!node || frame.current) return;
    const { clientX, clientY } = event;

    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const rect = node.getBoundingClientRect();
      node.style.setProperty("--px", `${clientX - rect.left}px`);
      node.style.setProperty("--py", `${clientY - rect.top}px`);
    });
  }

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLElement>}
      onMouseMove={handleMove}
      className={cn("sheen", className)}
    >
      {children}
    </Tag>
  );
}
