"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

type HeroProps = {
  locale: Locale;
  copy: Dictionary["home"]["hero"];
};

export function Hero({ locale, copy }: HeroProps) {
  const scope = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!headline.current || reduce) return;

      const select = gsap.utils.selector(scope);
      const split = SplitText.create(headline.current, {
        type: "lines,words",
        linesClass: "hero-line",
        wordsClass: "hero-word",
        mask: "lines",
      });

      gsap.set(split.words, {
        yPercent: 130,
        rotate: (index) => (index % 2 ? 2 : -3),
        transformOrigin: "left bottom",
      });
      gsap.set(select("[data-hero-copy]"), { y: 28, opacity: 0 });

      const intro = gsap.timeline({ delay: 0.62, defaults: { ease: "expo.out" } });
      intro
        .to(split.words, {
          yPercent: 0,
          rotate: 0,
          duration: 1.25,
          stagger: 0.055,
        })
        .to(select("[data-hero-copy]"), { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 }, 0.45);

      const skew = gsap.quickTo(headline.current, "skewY", {
        duration: 0.65,
        ease: "power3.out",
      });
      const stretch = gsap.quickTo(headline.current, "scaleX", {
        duration: 0.65,
        ease: "power3.out",
      });

      const settle = () => {
        skew(0);
        stretch(1);
      };

      const trigger = ScrollTrigger.create({
        trigger: scope.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = gsap.utils.clamp(-4, 4, self.getVelocity() / -700);
          skew(velocity);
          stretch(1 + Math.abs(velocity) * 0.008);
        },
        onLeave: settle,
        onLeaveBack: settle,
      });

      return () => {
        trigger.kill();
        split.revert();
      };
    },
    { scope },
  );

  return (
    <section
      id="top"
      ref={scope}
      className="relative flex min-h-dvh items-end overflow-hidden px-4 pb-10 pt-28 sm:px-6 sm:pb-14 lg:px-10 lg:pb-16 lg:pt-32"
    >
      <div
        data-hero-mark
        aria-hidden="true"
        className="hero-mark-geometry bg-accent"
      />

      <div className="relative mx-auto w-full max-w-[1600px]">
        <h1
          ref={headline}
          className="max-w-[15ch] text-[clamp(3.7rem,11.5vw,10.8rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-foreground"
        >
          {copy.title}
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <p
            data-hero-copy
            className="max-w-196 text-base leading-[1.45] text-foreground/65 md:col-span-7 md:col-start-5 md:text-xl lg:col-span-6 lg:col-start-6"
          >
            {copy.body}
          </p>

          <div data-hero-copy className="flex flex-col gap-3 sm:flex-row md:col-span-8 md:col-start-5 lg:col-span-7 lg:col-start-6">
            <Link
              href={localePath(locale, "/redesign/nha-moc-demo")}
              className="group inline-flex min-h-12 items-center justify-between gap-7 rounded-full bg-foreground py-2 pl-5 pr-2 text-sm font-semibold text-background transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 active:scale-[0.98]"
            >
              {copy.ctaPrimary}
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-accent transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5" aria-hidden="true">
                <span className="absolute h-px w-3 bg-background" />
                <span className="absolute h-3 w-px bg-background" />
              </span>
            </Link>
            <a
              href="#work"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-foreground/25 px-5 text-sm font-medium text-foreground transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-accent active:scale-[0.98]"
            >
              {copy.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
