"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { HoverRollText } from "@/components/ui/hover-roll-text";
import { stripLocale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

type NavLink = {
  label: string;
  href: string;
};

function isCurrentLink(pathname: string, href: string) {
  if (href.includes("#")) return false;
  const barePath = stripLocale(pathname);
  const bareHref = stripLocale(href);
  if (bareHref === "/") return barePath === "/";
  return barePath === bareHref || barePath.startsWith(`${bareHref}/`);
}

function PageLinkLabel({
  label,
  activeColor,
}: {
  label: string;
  activeColor?: string;
}) {
  return <HoverRollText activeColor={activeColor}>{label}</HoverRollText>;
}

type SiteNavProps = {
  links: NavLink[];
  brandHref: string;
  ctaHref: string;
  ctaLabel: string;
  a11y: Dictionary["a11y"];
};

export function SiteNav({
  links,
  brandHref,
  ctaHref,
  ctaLabel,
  a11y,
}: SiteNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      closeMenu();
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [closeMenu, open]);

  return (
    <header className="fixed left-0 right-0 top-0 z-20 px-3 pt-3 sm:px-6 sm:pt-6">
      <nav
        className="site-nav mx-auto flex max-w-350 items-center justify-between gap-3 border border-line bg-background/75 px-3 py-3 backdrop-blur-xl sm:px-5"
        aria-label={a11y.mainNav}
      >
        <Link
          href={brandHref}
          className="relative z-10 inline-flex min-h-11 shrink-0 items-center text-xs font-semibold uppercase tracking-[-0.02em] text-foreground sm:px-0"
        >
          Nét Nút <span className="text-accent">Studio</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const current = isCurrentLink(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`group nav-link inline-flex min-h-11 items-center px-1 text-xs transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${current ? "text-foreground" : "text-muted hover:text-foreground"}`}
              >
                <PageLinkLabel label={link.label} />
              </Link>
            );
          })}
        </div>

        <Link
          href={ctaHref}
          className="group hidden min-h-11 items-center justify-center border border-accent bg-accent px-4 py-2 text-xs font-semibold text-background transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98] lg:inline-flex"
        >
          <PageLinkLabel label={ctaLabel} activeColor="text-background" />
        </Link>

        <div className="ml-auto flex min-w-0 items-center gap-2 lg:hidden">
          <Link
            href={ctaHref}
            className="group inline-flex min-h-11 min-w-0 flex-1 items-center justify-center border border-accent bg-accent px-2 py-2 text-xs font-semibold text-background transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] sm:flex-none sm:px-4"
          >
            {ctaLabel}
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? a11y.closeMenu : a11y.openMenu}
            onClick={() => (open ? closeMenu() : setOpen(true))}
            className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center border border-line transition-colors duration-300 hover:border-foreground focus-visible:border-accent"
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 top-1/2 h-px w-full bg-foreground transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "rotate-45" : "-translate-y-1"}`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-full bg-foreground transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "-rotate-45" : "translate-y-1"}`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        ref={menuRef}
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={`mx-auto mt-2 grid max-w-350 overflow-hidden border border-line bg-surface-raised/95 backdrop-blur-xl transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-0 p-2 sm:p-3">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => closeMenu()}
                aria-current={isCurrentLink(pathname, link.href) ? "page" : undefined}
                className={`group flex min-h-14 translate-y-3 items-center justify-between border-b border-line px-3 py-3 text-lg opacity-0 transition-[transform,opacity,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] last:border-0 hover:bg-foreground/[0.04] focus-visible:bg-foreground/[0.04] ${open ? "translate-y-0 opacity-100" : ""}`}
                style={{ transitionDelay: open ? `${index * 55}ms` : "0ms" }}
              >
                <PageLinkLabel label={link.label} />
                <span className="relative h-3 w-3 text-accent" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                  <span className="absolute left-1/2 top-0 h-full w-px bg-current" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
