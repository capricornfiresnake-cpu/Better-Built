import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * The mark is a four-module frame with the last module set — a block being
 * placed into a structure. It is the same geometry as the registration ticks
 * used to trim every module on the site.
 */
export function BuildMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      aria-hidden="true"
      className={cn("h-[17px] w-[17px] shrink-0", className)}
      fill="none"
    >
      <rect x="0.7" y="0.7" width="16.6" height="16.6" stroke="currentColor" strokeWidth="1.1" opacity="0.55" />
      <path d="M9 1v16M1 9h16" stroke="currentColor" strokeWidth="1.1" opacity="0.3" />
      <rect x="9.9" y="9.9" width="6.5" height="6.5" fill="currentColor" />
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
        "group inline-flex items-center gap-2.5 text-chalk transition-opacity duration-300 hover:opacity-75",
        className,
      )}
    >
      <BuildMark
        className={cn(
          "text-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90",
          markClassName,
        )}
      />
      <span className="font-display text-[0.875rem] uppercase leading-none tracking-[0.18em] [font-variation-settings:'wdth'_100,'wght'_700]">
        {site.wordmark}
      </span>
    </Link>
  );
}
