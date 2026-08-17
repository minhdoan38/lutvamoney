"use client";

import Link from "next/link";
import { useState } from "react";

type NavLink = {
  label: string;
  href: string;
};

const defaultLinks: NavLink[] = [
  { label: "Dịch vụ", href: "#services" },
  { label: "Dự án", href: "#work" },
  { label: "Năng lực", href: "#capabilities" },
  { label: "Cách làm", href: "#process" },
  { label: "Góc nhìn", href: "#insights" },
  { label: "Về chúng tôi", href: "/about" },
];

type SiteNavProps = {
  links?: NavLink[];
  brandHref?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function SiteNav({
  links = defaultLinks,
  brandHref = "#top",
  ctaHref = "#contact",
  ctaLabel = "Gửi website",
}: SiteNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-20 px-4 pt-4 sm:px-6 sm:pt-6">
      <nav className="site-nav mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-white/15 bg-background/75 px-4 py-3 backdrop-blur-xl sm:px-5">
        <Link
          href={brandHref}
          data-cursor-link
          className="relative z-10 text-xs font-semibold uppercase tracking-[-0.02em] text-foreground"
        >
          Nét Nút <span className="text-accent">Studio</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-cursor-link
              className="text-xs text-white/60 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href={ctaHref}
          data-cursor-link
          className="hidden rounded-full bg-accent px-4 py-2 text-xs font-semibold text-background transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98] lg:block"
        >
          {ctaLabel}
        </Link>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href={ctaHref}
            data-cursor-link
            className="rounded-full bg-accent px-3 py-2 text-xs font-semibold text-background transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
          >
            {ctaLabel}
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            onClick={() => setOpen((value) => !value)}
            className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15"
          >
            <span className="relative block h-3.5 w-3.5">
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
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={`mx-auto mt-2 grid max-w-[1400px] overflow-hidden rounded-[1.5rem] border border-white/15 bg-surface-raised/95 backdrop-blur-xl transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-1 p-3">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex min-h-11 translate-y-3 items-center justify-between border-b border-white/10 px-3 py-4 text-lg opacity-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] last:border-0 ${open ? "translate-y-0 opacity-100" : ""}`}
                style={{ transitionDelay: open ? `${index * 55}ms` : "0ms" }}
              >
                {link.label}
                <span className="relative h-3 w-3 text-accent" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                  <span className="absolute left-1/2 top-0 h-full w-px bg-current" />
                </span>
              </Link>
            ))}
            <Link
              href={ctaHref}
              onClick={() => setOpen(false)}
              className={`mt-2 min-h-11 rounded-xl bg-accent px-4 py-3 text-center text-sm font-semibold text-background transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: open ? "220ms" : "0ms" }}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
