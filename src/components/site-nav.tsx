"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { HoverRollText } from "@/components/ui/hover-roll-text";
import { TextRotate, type TextRotateRef } from "@/components/ui/text-rotate";

type NavLink = {
  label: string;
  href: string;
};

const defaultLinks: NavLink[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Dự án", href: "/redesign/nha-moc-demo" },
  { label: "Về chúng tôi", href: "/about" },
];

function isCurrentLink(pathname: string, href: string) {
  if (href.includes("#")) return false;
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function RotatingLabel({ label }: { label: string }) {
  const textRotateRef = useRef<TextRotateRef>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isHovered || isFocused;

  const updateRotation = useCallback((active: boolean) => {
    if (active) {
      textRotateRef.current?.next();
    } else {
      textRotateRef.current?.reset();
    }
  }, []);

  useEffect(() => {
    updateRotation(isActive);
  }, [isActive, updateRotation]);

  return (
    <span
      className="nav-rotation"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <TextRotate
        ref={textRotateRef}
        texts={[label, label]}
        auto={false}
        loop={false}
        mainClassName="nav-rotation__viewport"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-120%", opacity: 0 }}
        staggerDuration={0}
        transition={{ duration: 0.42, ease: [0.77, 0, 0.175, 1] }}
        splitBy="characters"
        splitLevelClassName="nav-rotation__track"
        elementLevelClassName="nav-rotation__face"
      />
    </span>
  );
}

function PageLinkLabel({ label }: { label: string }) {
  return <HoverRollText>{label}</HoverRollText>;
}

type SiteNavProps = {
  links?: NavLink[];
  brandHref?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function SiteNav({
  links = defaultLinks,
  brandHref = "/",
  ctaHref = "#contact",
  ctaLabel = "Gửi website",
}: SiteNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const resolvedLinks = links;

  return (
    <header className="fixed left-0 right-0 top-0 z-20 px-4 pt-4 sm:px-6 sm:pt-6">
      <nav className="site-nav mx-auto flex max-w-350 items-center justify-between rounded-full border border-white/15 bg-background/75 px-4 py-3 backdrop-blur-xl sm:px-5">
        <Link
          href={brandHref}
          data-cursor-link
          className="relative z-10 text-xs font-semibold uppercase tracking-[-0.02em] text-foreground"
        >
          Nét Nút <span className="text-accent">Studio</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {resolvedLinks.map((link) => {
            const current = isCurrentLink(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                data-cursor-link
                aria-current={current ? "page" : undefined}
                className={`group nav-link text-xs transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${current ? "text-foreground" : "text-white/60 hover:text-foreground"}`}
              >
                <PageLinkLabel label={link.label} />
              </Link>
            );
          })}
        </div>

        <Link
          href={ctaHref}
          data-cursor-link
          className="group hidden rounded-full bg-accent px-4 py-2 text-xs font-semibold text-background transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98] lg:block"
        >
          <RotatingLabel label={ctaLabel} />
        </Link>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href={ctaHref}
            data-cursor-link
            className="group rounded-full bg-accent px-3 py-2 text-xs font-semibold text-background transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
          >
            <RotatingLabel label={ctaLabel} />
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
        className={`mx-auto mt-2 grid max-w-350 overflow-hidden rounded-3xl border border-white/15 bg-surface-raised/95 backdrop-blur-xl transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-1 p-3">
            {resolvedLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`group flex min-h-11 translate-y-3 items-center justify-between border-b border-white/10 px-3 py-4 text-lg opacity-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] last:border-0 ${open ? "translate-y-0 opacity-100" : ""}`}
                style={{ transitionDelay: open ? `${index * 55}ms` : "0ms" }}
              >
                <PageLinkLabel label={link.label} />
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
