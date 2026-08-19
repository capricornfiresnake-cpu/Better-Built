import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export { default as ScaledPreview } from "./ScaledPreview";

/**
 * Desktop browser chrome.
 *
 * `label` is the address in the URL bar — concept projects use a plainly
 * fictional domain. The frame is the site's recurring container: a real
 * website, shown as a real website, never as a floating rectangle.
 */
export function BrowserFrame({
  children,
  label,
  className,
  status,
}: {
  children: ReactNode;
  label: string;
  className?: string;
  /** Small mono note at the right of the chrome, e.g. "LIVE". */
  status?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-card ring-1 ring-line",
        "shadow-[0_2px_6px_rgb(0_0_0/0.4),0_30px_80px_-24px_rgb(0_0_0/0.8)]",
        className,
      )}
    >
      <div className="flex h-9 items-center gap-3 border-b border-line-soft px-3.5">
        <span aria-hidden="true" className="flex gap-[5px]">
          {[0, 1, 2].map((i) => (
            <span key={i} className="block h-[7px] w-[7px] rounded-full bg-white/12" />
          ))}
        </span>
        <span className="ml-0.5 flex h-[19px] min-w-0 flex-1 items-center gap-1.5 rounded-[4px] bg-void/70 px-2.5 font-mono text-[9px] tracking-[0.06em] text-dim">
          <svg
            viewBox="0 0 12 12"
            aria-hidden="true"
            className="h-2 w-2 shrink-0 text-accent-lift/70"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <rect x="2.2" y="5.2" width="7.6" height="5.2" />
            <path d="M4 5.2V3.6a2 2 0 0 1 4 0v1.6" />
          </svg>
          <span className="truncate">{label}</span>
        </span>
        {status ? (
          <span className="label-mono-sm hidden shrink-0 text-accent-lift sm:block">
            {status}
          </span>
        ) : null}
      </div>
      <div className="bg-white">{children}</div>
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
        "rounded-[2.1rem] bg-card p-[7px] ring-1 ring-line",
        "shadow-[0_28px_70px_-20px_rgb(0_0_0/0.85)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.7rem] bg-white">
        {notch ? (
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[6px] z-10 h-[4.5%] max-h-[18px] w-[32%] -translate-x-1/2 rounded-full bg-card"
          />
        ) : null}
        {children}
      </div>
    </div>
  );
}
