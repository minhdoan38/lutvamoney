"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, useEffect, useRef, useState } from "react";

import { HoverRollText } from "@/components/ui/hover-roll-text";
import { TextRotate, type TextRotateRef } from "@/components/ui/text-rotate";

type NavLink = {
  label: string;
  href: string;
  context: string;
};

const defaultLinks: NavLink[] = [
  { label: "Dịch vụ", href: "#services", context: "/ CHẨN ĐOÁN" },
  { label: "Dự án", href: "#work", context: "/ TÁI CẤU TRÚC" },
  { label: "Năng lực", href: "#capabilities", context: "/ NĂNG LỰC" },
  { label: "Cách làm", href: "#process", context: "/ STUDIO" },
  { label: "Góc nhìn", href: "#insights", context: "/ GÓC NHÌN" },
  { label: "Về chúng tôi", href: "/about", context: "/ STUDIO" },
];

function RotatingLabel({ label }: { label: string }) {
  const textRotateRef = useRef<TextRotateRef>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) textRotateRef.current?.next();
    else textRotateRef.current?.reset();
  }, [isActive]);

  return (
    <span
      className="nav-rotation"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
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
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        splitBy="characters"
        splitLevelClassName="nav-rotation__track"
        elementLevelClassName="nav-rotation__face"
      />
    </span>
  );
}

type SiteNavProps = {
  links?: NavLink[];
  brandHref?: string;
  ctaHref?: string;
  ctaLabel?: string;
  staticContext?: string;
};

export function SiteNav({
  links = defaultLinks,
  brandHref = "/",
  ctaHref = "#contact",
  ctaLabel = "Gửi website",
  staticContext,
}: SiteNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeContext, setActiveContext] = useState(staticContext ?? "/ CHẨN ĐOÁN");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (staticContext || pathname !== "/") return;

    const sections = links
      .filter((link) => link.href.startsWith("#"))
      .map((link) => {
        const element = document.getElementById(link.href.slice(1));
        return element ? { element, context: link.context } : null;
      })
      .filter((entry): entry is { element: HTMLElement; context: string } => Boolean(entry));

    if (!sections.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const section = sections.find(({ element }) => element === visible.target);
          if (section) setActiveContext(section.context);
        }
      },
      { rootMargin: "-18% 0px -62%", threshold: [0.1, 0.35, 0.6] },
    );

    sections.forEach(({ element }) => observerRef.current?.observe(element));
    return () => observerRef.current?.disconnect();
  }, [links, pathname, staticContext]);

  const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resolvedLinks = links.map((link) => ({
    ...link,
    href: pathname !== "/" && link.href.startsWith("#") ? `/${link.href}` : link.href,
  }));

  return (
    <header className="fixed left-0 right-0 top-0 z-20 px-4 pt-4 sm:px-6 sm:pt-6">
      <nav className="site-nav mx-auto flex max-w-350 items-center justify-between gap-4 border border-white/20 bg-background px-4 py-3 sm:px-5">
        <Link
          href={brandHref}
          onClick={handleBrandClick}
          className="relative z-10 shrink-0 text-xs font-semibold uppercase tracking-[-0.02em] text-foreground"
        >
          Nét Nút <span className="text-accent">Studio</span>
        </Link>

        <p className="hidden min-w-0 flex-1 truncate px-4 text-center font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted lg:block">
          {pathname === "/about" ? "/ STUDIO" : activeContext}
        </p>

        <div className="hidden items-center gap-6 lg:flex">
          {resolvedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.label}
              className="group nav-link text-xs text-white/60 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-foreground"
            >
              <HoverRollText className="leading-[1.25]">{link.label}</HoverRollText>
            </Link>
          ))}
        </div>

        <Link
          href={ctaHref}
          className="group hidden border border-accent bg-accent px-4 py-2 text-xs font-semibold text-background transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:bg-background hover:text-accent active:translate-y-0 lg:block"
        >
          <RotatingLabel label={ctaLabel} />
        </Link>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href={ctaHref}
            className="group border border-accent bg-accent px-3 py-2 text-xs font-semibold text-background transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:translate-y-0"
          >
            <RotatingLabel label={ctaLabel} />
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            onClick={() => setOpen((value) => !value)}
            className="relative z-10 flex h-11 w-11 items-center justify-center border border-white/20"
          >
            <span className="relative block h-3.5 w-3.5">
              <span className={`absolute left-0 top-1/2 h-px w-full bg-foreground transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute left-0 top-1/2 h-px w-full bg-foreground transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${open ? "-rotate-45" : "translate-y-1"}`} />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={`mx-auto mt-2 grid max-w-350 overflow-hidden border border-white/20 bg-surface-raised transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] lg:hidden ${open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-1 p-3">
            <p className="px-3 py-3 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
              {pathname === "/about" ? "/ STUDIO" : activeContext}
            </p>
            {resolvedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex min-h-11 items-center justify-between border-t border-white/10 px-3 py-4 text-lg"
              >
                <HoverRollText className="leading-[1.25]">{link.label}</HoverRollText>
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
