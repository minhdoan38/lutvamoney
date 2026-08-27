"use client";

import { useEffect, useRef } from "react";

import { LocaleToggle } from "@/components/locale-toggle";
import { HoverRollText } from "@/components/ui/hover-roll-text";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

const HANOI_TZ = "Asia/Ho_Chi_Minh";

const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
] as const;

function formatHaNoiClock(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: HANOI_TZ,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "00";

  return `${read("hour")} : ${read("minute")} : ${read("second")}`;
}

type SiteFooterProps = {
  locale: Locale;
  copy: Dictionary["footer"];
  a11y: Dictionary["a11y"];
};

export function SiteFooter({ locale, copy, a11y }: SiteFooterProps) {
  const timeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = timeRef.current;
    if (!node) return;

    const tick = () => {
      node.textContent = formatHaNoiClock(new Date());
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer
      className="border-t editorial-rule bg-background px-4 py-8 sm:px-6 lg:px-10"
      aria-label={copy.label}
    >
      <div className="mx-auto grid max-w-375 grid-cols-1 gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:justify-start">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-foreground">
            {copy.brand}
          </p>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-foreground">
            {copy.location}
          </p>
        </div>

        <div className="justify-self-start lg:justify-self-center">
          <p
            className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-foreground"
            aria-hidden="true"
          >
            <span className="inline-flex items-center gap-2">
              <span>[</span>
              <span className="inline-block size-1.5 shrink-0 rounded-full bg-accent" />
              <span ref={timeRef} className="tabular-nums">
                00 : 00 : 00
              </span>
              <span>]</span>
            </span>
          </p>
          <span className="sr-only">{a11y.hanoiClock}</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-8 lg:justify-end">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
              {copy.follow}
            </span>
            {SOCIAL.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.label} (profile URL pending)`}
                className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-foreground transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                <HoverRollText activeColor="text-accent">
                  {item.label} +
                </HoverRollText>
              </a>
            ))}
          </div>

          <LocaleToggle locale={locale} languageLabel={a11y.language} />
        </div>
      </div>
    </footer>
  );
}
