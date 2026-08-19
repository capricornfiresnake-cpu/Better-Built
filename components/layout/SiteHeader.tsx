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
  // Adjusting state during render avoids a frame where the panel is still open
  // over the new page.
  if (menuOpen && pathname !== menuPath) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "border-line bg-void/72 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-bb flex items-center justify-between gap-8 transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled ? "h-[3.75rem]" : "h-[4.75rem] lg:h-[5.5rem]",
          )}
        >
          <Wordmark />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center">
              {primaryNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative inline-flex h-9 items-center px-3.5 text-[0.9rem] tracking-[-0.005em] transition-colors duration-300",
                        active ? "text-chalk" : "text-slate hover:text-chalk",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-3.5 bottom-0.5 h-px origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <ButtonLink href="/contact" size="md" withArrow className="label-mono h-10">
              Start a project
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
            <span aria-hidden="true" className="flex w-6 flex-col items-end gap-[6px]">
              <span className="block h-px w-full bg-chalk transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-2/3" />
              <span className="block h-px w-2/3 bg-chalk transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
