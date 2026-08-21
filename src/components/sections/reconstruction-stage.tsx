"use client";

import type { KeyboardEvent, PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollText } from "@/components/scroll-text";
import { ContextualCursor } from "@/components/reconstruction/contextual-cursor";
import {
  getPhaseByIndex,
  getPhaseIndex,
  reconstructionPhases,
  stageContextLabel,
  type ReconstructionPhase,
} from "@/components/reconstruction/reconstruction-model";
import { useHomeExperience } from "@/components/home-experience-provider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function StageBlocks({ variant }: { variant: "old" | "new" }) {
  return (
    <div className={`stage-grid ${variant === "old" ? "stage-grid--old" : "stage-grid--new"}`} aria-hidden="true">
      <span className="stage-block stage-block--noise col-span-12 row-span-1" />
      <span className="stage-block col-span-8 row-span-1" />
      <span className="stage-block stage-block--focus col-span-4 row-span-2" />
      <span className="stage-block col-span-5 row-span-2" />
      <span className="stage-block stage-block--noise col-span-3 row-span-1" />
      <span className="stage-block col-span-7 row-span-1" />
      <span className="stage-block stage-block--noise col-span-4 row-span-2" />
      <span className="stage-block col-span-8 row-span-2" />
      <span className="stage-block stage-block--focus col-span-5 row-span-1" />
      <span className="stage-block col-span-7 row-span-1" />
    </div>
  );
}

export function ReconstructionStage() {
  const scope = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState<ReconstructionPhase>("inspect");
  const [compareProgress, setCompareProgress] = useState(0);
  const { subject } = useHomeExperience();
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reduceMotion.current = media.matches;
      if (media.matches) setActivePhase("inspect");
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      if (reduceMotion.current) return;
      const sentinels = Array.from(scope.current?.querySelectorAll<HTMLElement>("[data-phase-sentinel]") ?? []);
      const triggers = sentinels.map((sentinel, index) =>
        ScrollTrigger.create({
          trigger: sentinel,
          start: "top 62%",
          end: "bottom 38%",
          onEnter: () => setActivePhase(getPhaseByIndex(index)),
          onEnterBack: () => setActivePhase(getPhaseByIndex(index)),
        }),
      );
      return () => triggers.forEach((trigger) => trigger.kill());
    },
    { scope },
  );

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    element.style.setProperty("--compare-progress", `${compareProgress}`);
  }, [compareProgress]);

  const choosePhase = (phase: ReconstructionPhase) => {
    setActivePhase(phase);
    const sentinel = scope.current?.querySelector<HTMLElement>(`[data-phase-sentinel="${phase}"]`);
    sentinel?.scrollIntoView({ behavior: reduceMotion.current ? "auto" : "smooth", block: "center" });
  };

  const stepPhase = (direction: -1 | 1) => {
    const nextIndex = Math.min(
      reconstructionPhases.length - 1,
      Math.max(0, getPhaseIndex(activePhase) + direction),
    );
    choosePhase(getPhaseByIndex(nextIndex));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepPhase(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      stepPhase(1);
    }
  };

  const handleDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (activePhase !== "rebuild" || reduceMotion.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    setCompareProgress(progress);
  };

  const setCompare = (progress: number) => {
    setActivePhase("rebuild");
    setCompareProgress(progress);
  };

  const active = reconstructionPhases[getPhaseIndex(activePhase)];

  return (
    <section id="work" ref={scope} className="stage-shell px-4 py-20 sm:px-6 md:py-28 lg:px-10" data-reconstruction-stage>
      <div className="mx-auto max-w-[1500px]">
        <ScrollText mode="words">
          <h2 className="display-expansion mb-8 max-w-[10ch] text-[clamp(3rem,7.8vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.045em] md:mb-12">
            Cách chúng tôi dựng lại.
          </h2>
        </ScrollText>

        <div className="mb-8 flex flex-col gap-3 border-t editorial-rule pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-accent">
            {stageContextLabel(subject)}
          </p>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
            Concept minh họa / không phải audit
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-12 md:items-start md:gap-10">
          <div className="md:col-span-4">
            <div className="stage-sticky flex flex-col justify-between gap-8">
              <div className="stage-phase-copy">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
                  {active.annotation}
                </p>
                <h3 className="display-release mt-5 max-w-[12ch] text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-foreground">
                  {active.title}
                </h3>
                <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                  {active.copy}
                </p>
              </div>

              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Các pha tái cấu trúc">
                {reconstructionPhases.map((phase, index) => (
                  <button
                    key={phase.id}
                    type="button"
                    role="tab"
                    aria-selected={activePhase === phase.id}
                    onClick={() => choosePhase(phase.id)}
                    className={`min-h-11 border px-3 py-2 text-left text-xs transition-[background-color,color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${activePhase === phase.id ? "border-accent bg-accent text-background" : "border-white/25 text-foreground hover:border-accent"}`}
                  >
                    <span className="font-mono text-[0.55rem]">0{index + 1}</span>
                    <span className="ml-2">{phase.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-8 md:col-start-5">
            <div
              ref={stage}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onPointerMove={handleDrag}
              aria-label="Khung minh họa quá trình nhìn và dựng lại website. Dùng phím mũi tên để chuyển pha."
              className="stage-canvas outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              <div className="stage-old-art">
                <StageBlocks variant="old" />
                <div className="absolute left-[7%] top-[7%] font-mono text-[0.6rem] uppercase tracking-[0.12em] text-foreground/55">
                  Web cũ / crowded structure
                </div>
              </div>
              <div className="stage-new-art">
                <StageBlocks variant="new" />
                <div className="absolute left-[8%] top-[8%] max-w-[8ch] text-[clamp(2.8rem,7vw,7rem)] font-semibold leading-[0.86] tracking-[-0.05em] text-foreground">
                  Rõ hơn.
                </div>
                <div className="absolute bottom-[9%] right-[8%] max-w-[10ch] bg-accent p-4 text-right text-lg font-semibold leading-none text-background">
                  Một bước tiếp theo rõ ràng.
                </div>
              </div>
              <div className="stage-bounds" aria-hidden="true" />
              <p className="absolute bottom-5 left-5 z-10 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-foreground/65">
                {compareProgress >= 0.5 ? "After / concept minh họa" : "Before / concept minh họa"}
              </p>
              <ContextualCursor label={activePhase === "rebuild" ? "GIỮ ĐỂ SOI" : "KÉO ĐỂ SO"} />
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCompare(0)}
                  className="min-h-11 border border-white/25 px-4 py-2 text-xs text-foreground transition-colors duration-200 hover:border-accent"
                >
                  Before
                </button>
                <button
                  type="button"
                  onClick={() => setCompare(1)}
                  className="min-h-11 border border-white/25 px-4 py-2 text-xs text-foreground transition-colors duration-200 hover:border-accent"
                >
                  After
                </button>
              </div>
              <p className="text-xs leading-relaxed text-muted">
                {activePhase === "rebuild" ? "Kéo trong khung để thay đổi mức độ so sánh." : "Dùng mũi tên trái/phải để đi qua năm pha."}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 hidden md:block" aria-hidden="true">
          {reconstructionPhases.map((phase) => (
            <div key={phase.id} data-phase-sentinel={phase.id} className="h-[42vh]" />
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t editorial-rule pt-5 md:hidden">
          {reconstructionPhases.map((phase) => (
            <article key={phase.id} data-phase-sentinel={phase.id} className="border-b editorial-rule pb-5">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-accent">{phase.annotation}</p>
              <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em]">{phase.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{phase.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
