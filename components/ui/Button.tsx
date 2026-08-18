import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "quiet";
type Tone = "light" | "dark";
type Size = "md" | "lg";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  /** The surface the button sits on, not the button's own color. */
  tone?: Tone;
  size?: Size;
  className?: string;
  withArrow?: boolean;
};

const base =
  "group relative inline-flex items-center justify-center gap-2.5 font-medium " +
  "transition-[background-color,color,border-color,transform] duration-300 " +
  "ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-px " +
  "disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9375rem] tracking-[-0.01em]",
  lg: "h-[3.25rem] px-7 text-[1rem] tracking-[-0.01em]",
};

const variants: Record<Tone, Record<Variant, string>> = {
  light: {
    primary: "bg-ink-900 text-paper hover:bg-ink-700",
    secondary:
      "border border-ink-900/20 text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-paper",
    quiet: "px-0 text-ink-900 hover:text-brass-deep",
  },
  dark: {
    primary: "bg-paper text-ink-900 hover:bg-brass hover:text-ink-950",
    secondary:
      "border border-paper/25 text-paper hover:border-brass hover:text-brass",
    quiet: "px-0 text-paper hover:text-brass",
  },
};

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-[0.85em] w-[0.85em] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
    </svg>
  );
}

function classes(variant: Variant, tone: Tone, size: Size, className?: string) {
  return cn(
    base,
    variant === "quiet" ? "h-auto" : sizes[size],
    variants[tone][variant],
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
  tone = "light",
  size = "md",
  className,
  withArrow = false,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link href={href} className={classes(variant, tone, size, className)} {...rest}>
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
  tone = "light",
  size = "md",
  className,
  withArrow = false,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={classes(variant, tone, size, className)} {...rest}>
      <span>{children}</span>
      {withArrow ? <Arrow /> : null}
    </button>
  );
}
