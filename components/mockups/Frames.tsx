import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export { default as ScaledPreview } from "./ScaledPreview";

/**
 * Desktop browser chrome. `label` is the address shown in the URL bar —
 * concept projects use a plainly fictional domain.
 */
export function BrowserFrame({
  children,
  label,
  className,
  tone = "dark",
}: {
  children: ReactNode;
  label: string;
  className?: string;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[10px] shadow-[0_2px_4px_rgba(6,7,9,0.04),0_18px_50px_-12px_rgba(6,7,9,0.35)]",
        dark ? "bg-ink-800" : "bg-fog-100",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-8 items-center gap-2.5 px-3.5",
          dark ? "bg-ink-800" : "bg-fog-100",
        )}
      >
        <span aria-hidden="true" className="flex gap-[5px]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                "block h-[7px] w-[7px] rounded-full",
                dark ? "bg-ink-600" : "bg-fog-300",
              )}
            />
          ))}
        </span>
        <span
          className={cn(
            "ml-1 flex h-[18px] min-w-0 flex-1 items-center rounded-[3px] px-2.5 font-mono text-[9px] tracking-[0.06em]",
            dark ? "bg-ink-700 text-fog-400" : "bg-paper-pure text-fog-500",
          )}
        >
          <span className="truncate">{label}</span>
        </span>
      </div>
      <div className="bg-paper-pure">{children}</div>
    </div>
  );
}

/**
 * Phone chrome for mobile previews.
 *
 * `notch` is off for real screenshots: those are captures of a mobile browser
 * viewport, so the site's own header sits at the very top and a drawn notch
 * would cover it. Rendered previews leave room for it on purpose.
 */
export function PhoneFrame({
  children,
  notch = true,
  className,
}: {
  children: ReactNode;
  notch?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[2.1rem] bg-ink-850 p-[7px] shadow-[0_24px_60px_-18px_rgba(6,7,9,0.55)] ring-1 ring-ink-600/60",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.7rem] bg-paper-pure">
        {notch ? (
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[6px] z-10 h-[4.5%] max-h-[18px] w-[32%] -translate-x-1/2 rounded-full bg-ink-850"
          />
        ) : null}
        {children}
      </div>
    </div>
  );
}
