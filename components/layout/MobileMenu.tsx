"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import Wordmark from "./Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { legalNav, primaryNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Full-height navigation panel. Designed for the phone, not scaled down from desktop. */
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
        'a[href], button:not([disabled])',
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
        "on-ink fixed inset-0 z-[60] flex flex-col bg-ink-950 text-paper lg:hidden",
        "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-2 opacity-0",
      )}
    >
      <div className="container-bb flex h-[4.5rem] shrink-0 items-center justify-between">
        <Wordmark className="text-paper" markClassName="text-brass" />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-paper"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M4 4l12 12M16 4L4 16" strokeLinecap="square" />
          </svg>
        </button>
      </div>

      <nav aria-label="Mobile" className="container-bb flex-1 overflow-y-auto pt-6">
        <ul className="border-t border-paper/10">
          {primaryNav.map((item, i) => (
            <li key={item.href} className="border-b border-paper/10">
              <Link
                href={item.href}
                onClick={onClose}
                style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                className={cn(
                  "flex items-baseline py-5 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
              >
                <span className="display-lg">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-bb shrink-0 pb-10 pt-8">
        <ButtonLink
          href="/contact"
          tone="dark"
          size="lg"
          withArrow
          className="w-full"
          onClick={onClose}
        >
          Build My Website
        </ButtonLink>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 label-mono text-paper/55">
          <a href={`mailto:${site.email}`} className="link-underline">
            {site.email}
          </a>
          {legalNav.map((item) => (
            <Link key={item.href} href={item.href} onClick={onClose} className="link-underline">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
