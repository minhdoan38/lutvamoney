"use client";

import type { KeyboardEvent } from "react";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollText } from "@/components/scroll-text";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { Dictionary } from "@/i18n/get-dictionary";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type WorkCopy = Dictionary["home"]["work"];

function ProjectVisual({
  newVersion = false,
  copy,
}: {
  newVersion?: boolean;
  copy: WorkCopy;
}) {
  if (newVersion) {
    return (
      <div className="absolute inset-0 bg-foreground text-background">
        <div className="absolute left-[6%] top-[8%] flex w-[88%] items-center justify-between border-b border-background/20 pb-4 font-mono text-[10px] uppercase tracking-widest">
          <span>{copy.visualNewEyebrow}</span>
          <span>Nét Nút Studio</span>
        </div>
        <div className="absolute left-[6%] top-[20%] max-w-[9ch] text-[clamp(3.4rem,9vw,9rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
          {copy.visualNewTitle}
        </div>
        <div className="absolute bottom-0 right-0 h-[42%] w-[50%] bg-accent" />
        <div className="absolute bottom-[8%] right-[7%] max-w-[14ch] text-right text-[clamp(1.4rem,3.2vw,3.2rem)] font-semibold leading-[0.92] tracking-[-0.03em]">
          {copy.visualNewSub}
        </div>
        <p className="absolute bottom-6 left-6 font-mono text-xs uppercase tracking-[0.12em]">
          {copy.visualNewBadge}
        </p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--card)_0%,color-mix(in_srgb,var(--foreground)_13%,var(--background))_55%,var(--card)_100%)] grayscale">
      <div className="absolute left-[7%] top-[12%] h-[18%] w-[62%] border border-foreground/15 bg-foreground/[0.025]" />
      <div className="absolute left-[7%] top-[36%] h-[7%] w-[31%] bg-foreground/[0.07]" />
      <div className="absolute left-[7%] top-[49%] h-[4%] w-[48%] bg-foreground/[0.045]" />
      <div className="absolute bottom-[8%] right-[6%] h-[38%] w-[40%] border border-foreground/10 bg-background" />
      <p className="absolute bottom-6 left-6 font-mono text-xs uppercase tracking-[0.12em] text-foreground/55">
        {copy.visualOldBadge}
      </p>
    </div>
  );
}

type SelectedWorkProps = {
  copy: WorkCopy;
};

export function SelectedWork({ copy }: SelectedWorkProps) {
  const scope = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const reveal = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLDivElement>(null);
  const comparisonHint = useRef<HTMLDivElement>(null);
  const [comparisonView, setComparisonView] = useState<"old" | "new">("old");

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (!frame.current) return;

      if (!reduce) {
        gsap.from(frame.current, {
          clipPath: "inset(12% 14% 12% 14%)",
          duration: 1.25,
          ease: "expo.out",
          scrollTrigger: {
            trigger: frame.current,
            start: "top 72%",
            toggleActions: "play reverse play reverse",
          },
        });
      }

      if (!finePointer || !comparisonHint.current) return;

      const hintTimeline = gsap.timeline({ paused: true });
      if (reduce) {
        hintTimeline
          .fromTo(
            comparisonHint.current,
            { opacity: 0 },
            { opacity: 0.35, duration: 0.1, ease: "power3.out" },
          )
          .to(comparisonHint.current, { opacity: 0, duration: 0.1, ease: "power2.out" });
      } else {
        hintTimeline
          .fromTo(
            comparisonHint.current,
            { x: -24, yPercent: -50, scale: 0.9, opacity: 0 },
            {
              x: 24,
              yPercent: -50,
              scale: 1,
              opacity: 0.85,
              duration: 0.315,
              ease: "expo.out",
            },
          )
          .to(comparisonHint.current, {
            x: 64,
            opacity: 0,
            duration: 0.385,
            ease: "power2.out",
          });
      }

      const hintTrigger = ScrollTrigger.create({
        trigger: frame.current,
        start: "top 72%",
        once: true,
        onEnter: () => hintTimeline.play(0),
      });

      return () => {
        hintTrigger.kill();
        hintTimeline.kill();
      };
    },
    { scope },
  );

  const updateMask = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      comparisonView === "new" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    reveal.current?.style.setProperty("--mask-x", `${x}px`);
    reveal.current?.style.setProperty("--mask-y", `${y}px`);
    reveal.current?.style.setProperty("--mask-size", "clamp(110px, 18vw, 240px)");
    gsap.to(lens.current, { x, y, opacity: 1, duration: 0.25, ease: "power3.out" });
  };

  const hideMask = () => {
    if (comparisonView === "new") return;
    reveal.current?.style.setProperty("--mask-size", "0px");
    gsap.to(lens.current, { opacity: 0, duration: 0.2, ease: "power2.out" });
  };

  const chooseComparison = (view: "old" | "new") => {
    setComparisonView(view);
    if (view === "old") {
      reveal.current?.style.setProperty("--mask-size", "0px");
      gsap.to(lens.current, { opacity: 0, duration: 0.2, ease: "power2.out" });
    }
  };

  const handleComparisonKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      chooseComparison(event.key === "ArrowRight" ? "new" : "old");
    }
  };

  return (
    <section id="work" ref={scope} className="px-4 py-32 sm:px-6 md:py-48 lg:px-10">
      <div className="mx-auto max-w-375">
        <ScrollText mode="words">
          <h2 className="mb-14 max-w-[12ch] text-[clamp(3rem,7.8vw,7.5rem)] font-semibold leading-[0.96] tracking-[-0.04em] md:mb-20">
            {copy.title}
          </h2>
        </ScrollText>

        <div
          ref={frame}
          onPointerMove={updateMask}
          onPointerLeave={hideMask}
          onKeyDown={handleComparisonKeyDown}
          tabIndex={0}
          aria-label={copy.ariaCompare}
          className="relative isolate min-h-[72vh] overflow-hidden bg-surface-work outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background md:min-h-[82vh]"
        >
          <ProjectVisual copy={copy} />

          <div
            ref={reveal}
            className={`masked-media absolute inset-0 hidden bg-accent md:block ${comparisonView === "new" ? "comparison-full" : ""}`}
            aria-hidden="true"
          >
            <ProjectVisual newVersion copy={copy} />
          </div>

          <div
            className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${comparisonView === "new" ? "opacity-100" : "pointer-events-none opacity-0"}`}
            aria-hidden={comparisonView !== "new"}
          >
            <ProjectVisual newVersion copy={copy} />
          </div>

          <div
            ref={lens}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[clamp(110px,18vw,240px)] w-[clamp(110px,18vw,240px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/80 opacity-0 md:block"
          />
          <div
            ref={comparisonHint}
            aria-hidden="true"
            className="comparison-lens-hint pointer-events-none absolute left-0 top-1/2 z-10 hidden h-[clamp(110px,18vw,240px)] w-[clamp(110px,18vw,240px)] -translate-y-1/2 rounded-full border border-accent opacity-0 md:block"
          />

          <p className="pointer-events-none absolute right-5 top-5 z-10 max-w-[15ch] text-right text-xs leading-relaxed text-foreground mix-blend-difference">
            {copy.hint}
          </p>

          <ToggleGroup
            value={[comparisonView]}
            onValueChange={(value) => {
              const nextView = value[0];
              if (nextView === "old" || nextView === "new") chooseComparison(nextView);
            }}
            spacing={0}
            aria-label={copy.ariaToggle}
            className="absolute bottom-5 right-5 z-10 border border-foreground/30 bg-background/90 p-1"
          >
            <ToggleGroupItem value="old" className="h-11 min-h-11 px-4 py-2 text-xs data-[state=on]:bg-foreground data-[state=on]:text-background">
              {copy.oldLabel}
            </ToggleGroupItem>
            <ToggleGroupItem value="new" className="h-11 min-h-11 px-4 py-2 text-xs data-[state=on]:bg-accent data-[state=on]:text-background">
              {copy.newLabel}
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t editorial-rule pt-5 sm:flex-row sm:items-baseline sm:justify-between">
          <ScrollText mode="words">
            <p className="text-sm font-medium text-foreground">{copy.captionTitle}</p>
          </ScrollText>
          <ScrollText>
            <p className="max-w-136 text-sm leading-relaxed text-muted">
              {copy.captionBody}
            </p>
          </ScrollText>
        </div>
      </div>
    </section>
  );
}
