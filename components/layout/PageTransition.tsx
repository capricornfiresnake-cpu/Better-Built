"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * A short rise-and-settle on the incoming route.
 *
 * Keyed on the pathname, so React remounts the subtree and the CSS animation
 * replays. There is no overlay and no exit animation: the old page is gone the
 * instant the new one is ready, which is the only honest way to transition
 * between pages that are already prefetched. Children arrive from a Server
 * Component, so nothing below this point is pulled into the client bundle.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-in">
      {children}
    </div>
  );
}
