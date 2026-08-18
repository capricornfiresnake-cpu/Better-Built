"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Wordmark from "./Wordmark";
import MobileMenu from "./MobileMenu";
import { ButtonLink } from "@/components/ui/Button";
import { primaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  // Close the panel when the route changes — including on browser back/forward.
  // Adjusting state during render is cheaper than an effect and avoids a
  // frame where the panel is still open over the new page.
  if (menuOpen && pathname !== menuPath) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "border-b border-ink-900/10 bg-paper/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-bb flex h-[4.5rem] items-center justify-between gap-8">
          <Wordmark className="text-ink-900" />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-9 items-center px-3.5 text-[0.9375rem] tracking-[-0.005em] transition-colors duration-300",
                      isActive(item.href)
                        ? "text-ink-900"
                        : "text-ink-900/60 hover:text-ink-900",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-brass-deep transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isActive(item.href) && "scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ButtonLink href="/contact" variant="primary" size="md" withArrow>
              Build My Website
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="group -mr-2 inline-flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span aria-hidden="true" className="flex w-6 flex-col gap-[6px]">
              <span className="block h-px w-full bg-ink-900 transition-transform duration-300 group-hover:translate-x-0.5" />
              <span className="block h-px w-full bg-ink-900" />
              <span className="block h-px w-2/3 bg-ink-900 transition-all duration-300 group-hover:w-full" />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
