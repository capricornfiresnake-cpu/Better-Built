import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "lg";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
};

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 rounded-[3px] " +
  "font-medium tracking-[-0.01em] whitespace-nowrap " +
  "transition-[background-color,color,border-color,transform] duration-400 " +
  "ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-px " +
  "disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-[3.5rem] px-7 text-[1rem]",
};

/* White is the loudest thing on a near-black page, so the primary action
   gets it. The accent is held back for the hover — it reads as a reward
   rather than as the default state. */
const variants: Record<Variant, string> = {
  primary: "bg-chalk text-void hover:bg-accent hover:text-white",
  secondary:
    "border border-line text-chalk hover:border-accent hover:bg-accent/8 hover:text-white",
  quiet: "px-0 text-slate hover:text-chalk",
};

/**
 * The arrow leaves to the right while its double arrives from the left —
 * the movement reads as "forward" rather than as a nudge.
 */
function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="relative block h-[0.85em] w-[0.85em] shrink-0 overflow-hidden"
    >
      {[
        "translate-x-0 group-hover/btn:translate-x-[150%]",
        "-translate-x-[150%] group-hover/btn:translate-x-0",
      ].map((motion) => (
        <svg
          key={motion}
          viewBox="0 0 16 16"
          className={cn(
            "absolute inset-0 h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            motion,
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
        </svg>
      ))}
    </span>
  );
}

function classes(variant: Variant, size: Size, className?: string) {
  return cn(
    base,
    variant === "quiet" ? "h-auto" : sizes[size],
    variants[variant],
    className,
  );
}

type ButtonLinkProps = BaseProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      <span>{children}</span>
      {withArrow ? <Arrow /> : null}
    </Link>
  );
}

type ButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  withArrow = false,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={classes(variant, size, className)} {...rest}>
      <span>{children}</span>
      {withArrow ? <Arrow /> : null}
    </button>
  );
}

/** External link styled as a quiet action, with the corner arrow. */
export function ExternalAction({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "group/ext label-mono inline-flex items-center gap-2 text-slate transition-colors duration-300 hover:text-chalk",
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="h-3 w-3 shrink-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/ext:-translate-y-0.5 group-hover/ext:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M5 11L11 5M6 5h5v5" strokeLinecap="square" />
      </svg>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
