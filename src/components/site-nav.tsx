"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type AnchorId = "services" | "work" | "capabilities" | "process" | "insights" | "contact";

type NavLink = {
  label: string;
  href: string;
  context: string;
};

const links: NavLink[] = [
  { label: "Dịch vụ", href: "#services", context: "/ CHẨN ĐOÁN" },
  { label: "Dự án", href: "#work", context: "/ TÁI CẤU TRÚC" },
  { label: "Năng lực", href: "#capabilities", context: "/ NĂNG LỰC" },
  { label: "Cách làm", href: "#process", context: "/ STUDIO" },
  { label: "Góc nhìn", href: "#insights", context: "/ GÓC NHÌN" },
  { label: "Liên hệ", href: "#contact", context: "/ LIÊN HỆ" },
  { label: "Về chúng tôi", href: "/about", context: "/ STUDIO" },
];

type SiteNavProps = {
  brandHref?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function SiteNav({
  brandHref = "/",
  ctaHref = "#contact",
  ctaLabel = "Gửi website",
}: SiteNavProps) {
  const pathname = usePathname();
  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [open, setOpen] = useState(false);
  const [activeContext, setActiveContext] = useState(pathname === "/" ? links[0].context : pathname === "/about" ? "/ STUDIO" : "/ CASE STUDY");
  const visibilityRef = useRef(new Map<AnchorId, IntersectionObserverEntry>());
  const resolvedLinks = useMemo(
    () =>
      links.map((link) => ({
        ...link,
        href: pathname !== "/" && link.href.startsWith("#") ? `/${link.href}` : link.href,
      })),
    [pathname],
  );

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = links
      .filter((link) => link.href.startsWith("#"))
      .map((link) => {
        const element = document.getElementById(link.href.slice(1));
        return element ? { element, link } : null;
      })
      .filter((entry): entry is { element: HTMLElement; link: NavLink } => Boolean(entry));

    if (!sections.length) return;

    visibilityRef.current = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id as AnchorId;
          if (entry.isIntersecting) visibilityRef.current.set(id, entry);
          else visibilityRef.current.delete(id);
        });

        const viewportCenter = window.innerHeight / 2;
        const strongest = sections
          .filter(({ element }) => visibilityRef.current.has(element.id as AnchorId))
          .map(({ element, link }) => {
            const entry = visibilityRef.current.get(element.id as AnchorId);
            const rect = entry?.boundingClientRect ?? element.getBoundingClientRect();
            return { link, distance: Math.abs(rect.top + rect.height / 2 - viewportCenter) };
          })
          .sort((left, right) => left.distance - right.distance)[0];

        if (strongest) setActiveContext((current) => (current === strongest.link.context ? current : strongest.link.context));
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="fixed left-0 right-0 top-0 z-20 px-4 pt-4 sm:px-6 sm:pt-6">
      <nav className="site-nav mx-auto flex max-w-[1400px] items-center justify-between border border-white/15 bg-[#090909]/90 px-4 py-3 backdrop-blur-xl sm:px-5">
        <a
          href={brandHref}
          onClick={handleBrandClick}
          className="relative z-10 text-[11px] font-semibold uppercase tracking-[-0.02em] text-foreground sm:text-xs"
        >
          Nét Nút <span className="text-accent">Studio</span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-accent" aria-live="polite">
            {activeContext}
          </span>
          {resolvedLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-white/60 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={ctaHref}
          className="hidden border border-accent bg-accent px-4 py-2 text-xs font-semibold text-[#090909] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98] lg:block"
        >
          {ctaLabel}
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Đóng menu" : "Mở menu"}
          onClick={() => setOpen((value) => !value)}
          className="relative z-10 flex h-11 w-11 items-center justify-center border border-white/15 lg:hidden"
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
      </nav>

      <div
        aria-hidden={!open}
        inert={!open}
        className={`mx-auto mt-2 grid max-w-[1400px] overflow-hidden border border-white/15 bg-[#111111]/95 backdrop-blur-xl transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden ${open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-1 p-3">
            {resolvedLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex translate-y-3 items-center justify-between border-b border-white/10 px-3 py-4 text-lg opacity-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] last:border-0 ${open ? "translate-y-0 opacity-100" : ""}`}
                style={{ transitionDelay: open ? `${index * 55}ms` : "0ms" }}
              >
                {link.label}
                <span className="relative h-3 w-3 text-accent" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                  <span className="absolute left-1/2 top-0 h-full w-px bg-current" />
                </span>
              </a>
            ))}
            <a
              href={ctaHref}
              onClick={() => setOpen(false)}
              className={`mt-2 border border-accent bg-accent px-4 py-3 text-center text-sm font-semibold text-[#090909] transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: open ? "220ms" : "0ms" }}
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
