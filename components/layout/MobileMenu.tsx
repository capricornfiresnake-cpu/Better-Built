"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import Wordmark from "./Wordmark";
import DigitalGrid from "@/components/visuals/DigitalGrid";
import { ButtonLink } from "@/components/ui/Button";
import { legalNav, primaryNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The menu is the site's table of contents, so it is set like one: every route
 * ruled off and given the full width of the screen. Designed for the phone
 * rather than folded down from the desktop nav.
 */
export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      // Keep focus inside the panel while it is open.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open ? true : undefined}
      className={cn(
        "fixed inset-0 z-[60] flex flex-col bg-void lg:hidden",
        "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-3 opacity-0",
      )}
    >
      <DigitalGrid size={56} origin={{ x: "50%", y: "18%" }} className="opacity-70" />

      <div className="container-bb relative flex h-[4.75rem] shrink-0 items-center justify-between">
        <Wordmark />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-chalk"
        >
          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          >
            <path d="M4 4l12 12M16 4L4 16" strokeLinecap="square" />
          </svg>
        </button>
      </div>

      <nav
        aria-label="Mobile"
        className="container-bb relative flex-1 overflow-y-auto overscroll-contain pt-4"
      >
        <ul>
          {primaryNav.map((item, i) => (
            <li key={item.href} className="border-b border-line-soft">
              <Link
                href={item.href}
                onClick={onClose}
                style={{ transitionDelay: open ? `${140 + i * 55}ms` : "0ms" }}
                className={cn(
                  "group flex items-baseline gap-4 py-[3vh] transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
              >
                <span className="display-lg text-chalk">{item.label}</span>
                <span
                  aria-hidden="true"
                  className="ml-auto self-center text-dim transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-bb relative shrink-0 space-y-6 border-t border-line pb-9 pt-7">
        <ButtonLink
          href="/contact"
          size="lg"
          withArrow
          onClick={onClose}
          className="label-mono w-full"
        >
          Start a project
        </ButtonLink>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href={`mailto:${site.email}`} className="link-underline label-mono text-slate">
            {site.email}
          </a>
          {legalNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="link-underline label-mono text-dim"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
