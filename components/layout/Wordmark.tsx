import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * The mark is a registration square with one module set true inside it —
 * the same alignment idea as the crop marks used throughout the site.
 */
export function BuildMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      aria-hidden="true"
      className={cn("h-[18px] w-[18px] shrink-0", className)}
      fill="none"
    >
      <rect x="0.6" y="0.6" width="16.8" height="16.8" stroke="currentColor" strokeWidth="1.2" />
      <rect x="4.4" y="4.4" width="9.2" height="9.2" fill="currentColor" />
    </svg>
  );
}

export default function Wordmark({
  className,
  markClassName,
  href = "/",
}: {
  className?: string;
  markClassName?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`${site.name} — home`}
      className={cn(
        "group inline-flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-70",
        className,
      )}
    >
      <BuildMark className={cn("text-brass-deep", markClassName)} />
      <span
        className="font-display text-[0.9375rem] font-bold uppercase leading-none tracking-[0.16em]"
        style={{ fontVariationSettings: '"wdth" 105' }}
      >
        {site.wordmark}
      </span>
    </Link>
  );
}
