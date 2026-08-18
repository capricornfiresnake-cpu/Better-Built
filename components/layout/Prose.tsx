import type { ReactNode } from "react";

/** Long-form text column used by the legal pages. */
export default function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        max-w-[68ch]
        [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-[1.5rem] [&_h2]:font-semibold [&_h2]:tracking-[-0.03em]
        [&_h2:first-child]:mt-0
        [&_p]:mt-4 [&_p]:text-[1.0625rem] [&_p]:leading-relaxed [&_p]:text-ink-900/70
        [&_ul]:mt-4 [&_ul]:space-y-2.5
        [&_li]:relative [&_li]:pl-6 [&_li]:text-[1.0625rem] [&_li]:leading-relaxed [&_li]:text-ink-900/70
        [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.85em] [&_li]:before:h-px [&_li]:before:w-3 [&_li]:before:bg-brass-deep
        [&_a]:underline [&_a]:decoration-ink-900/30 [&_a]:underline-offset-4 hover:[&_a]:decoration-ink-900
      "
    >
      {children}
    </div>
  );
}
