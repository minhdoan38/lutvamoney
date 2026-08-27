"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollText } from "@/components/scroll-text";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FinalCTAProps = {
  locale: Locale;
  copy: Dictionary["home"]["finalCta"];
};

export function FinalCTA({ locale, copy }: FinalCTAProps) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from("[data-cta-field]", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 78%",
          toggleActions: "play reverse play reverse",
        },
      });
    },
    { scope },
  );

  return (
    <section id="case-study" ref={scope} className="px-4 pb-8 pt-32 sm:px-6 md:pt-48 lg:px-10">
      <div className="mx-auto max-w-375 bg-accent px-5 py-12 text-background sm:px-8 md:px-12 md:py-16 lg:px-16 lg:py-20">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <ScrollText mode="words">
              <h2 className="max-w-[12ch] text-[clamp(3.2rem,8.6vw,8rem)] font-semibold leading-[0.96] tracking-[-0.04em]">
                {copy.title}
              </h2>
            </ScrollText>
            <ScrollText>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-background/90 md:text-lg">
                {copy.body}
              </p>
            </ScrollText>
          </div>

          <div data-cta-field className="self-end md:col-span-4">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-background/70">
              {copy.eyebrow}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-background/90">
              {copy.note}
            </p>
            <Link
              href={localePath(locale, "/redesign/nha-moc-demo")}
              className="mt-6 inline-flex min-h-14 w-full items-center justify-between gap-6 bg-background px-5 font-mono text-sm font-semibold text-foreground transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 active:scale-[0.98]"
            >
              {copy.cta}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
