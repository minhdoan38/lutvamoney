"use client";

import Link from "next/link";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollText } from "@/components/scroll-text";
import {
  getPhaseByIndex,
  getPhaseIndex,
  reconstructionPhases,
  stageContextLabel,
  type ReconstructionPhase,
} from "@/components/reconstruction/reconstruction-model";
import { useHomeExperience } from "@/components/home-experience-provider";
import { clamp } from "@/lib/motion";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

function NewStageArt() {
  return (
    <>
      <StageBlocks variant="new" />
      <div className="stage-new-hierarchy absolute left-[8%] top-[8%] max-w-[8ch] text-[clamp(2.8rem,7vw,7rem)] font-semibold leading-[0.86] tracking-tighter text-foreground">
        Rõ hơn.
      </div>
      <div className="stage-new-cta absolute bottom-[9%] right-[8%] max-w-[10ch] bg-accent p-4 text-right text-lg font-semibold leading-none text-background">
        Một bước tiếp theo rõ ràng.
      </div>
    </>
  );
}

export function ReconstructionStage() {
  const scope = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const pointerReveal = useRef<HTMLDivElement>(null);
  const draggingPointerId = useRef<number | null>(null);
  const compareProgressRef = useRef(0);
  const [activePhase, setActivePhase] = useState<ReconstructionPhase>("inspect");
  const [compareProgress, setCompareProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const { subject } = useHomeExperience();
  const active = reconstructionPhases[getPhaseIndex(activePhase)];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const sentinels = Array.from(scope.current?.querySelectorAll<HTMLElement>("[data-phase-sentinel-desktop]") ?? []);
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
      });

      return () => media.revert();
    },
    { scope, dependencies: [reduceMotion], revertOnUpdate: true },
  );

  useEffect(() => {
    compareProgressRef.current = compareProgress;
    stage.current?.style.setProperty("--compare-progress", `${compareProgress}`);
  }, [compareProgress]);

  const choosePhase = (phase: ReconstructionPhase) => {
    setActivePhase(phase);
    const sentinel = scope.current?.querySelector<HTMLElement>(
      `[data-phase-sentinel-desktop="${phase}"], [data-phase-sentinel-mobile="${phase}"]`,
    );
    sentinel?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
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

  const writeCompareProgress = (progress: number) => {
    const nextProgress = clamp(progress, 0, 1);
    compareProgressRef.current = nextProgress;
    stage.current?.style.setProperty("--compare-progress", `${nextProgress}`);
  };

  const showPointerReveal = (event: PointerEvent<HTMLDivElement>) => {
    if (
      reduceMotion ||
      draggingPointerId.current !== null ||
      event.pointerType === "touch" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerReveal.current?.style.setProperty("--pointer-reveal-x", `${event.clientX - bounds.left}px`);
    pointerReveal.current?.style.setProperty("--pointer-reveal-y", `${event.clientY - bounds.top}px`);
    pointerReveal.current?.style.setProperty("--pointer-reveal-size", "clamp(110px, 18vw, 240px)");
  };

  const hidePointerReveal = () => {
    pointerReveal.current?.style.setProperty("--pointer-reveal-size", "0px");
  };

  const progressFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
  };

  const endDrag = (event?: PointerEvent<HTMLDivElement>) => {
    const pointerId = draggingPointerId.current;
    if (pointerId !== null && event?.currentTarget.hasPointerCapture(pointerId)) {
      event.currentTarget.releasePointerCapture(pointerId);
    }
    draggingPointerId.current = null;
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (activePhase !== "rebuild" || reduceMotion || (event.pointerType === "mouse" && event.button !== 0)) return;
    hidePointerReveal();
    draggingPointerId.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    const progress = progressFromPointer(event);
    writeCompareProgress(progress);
    setCompareProgress(progress);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (draggingPointerId.current === event.pointerId) {
      writeCompareProgress(progressFromPointer(event));
      return;
    }
    showPointerReveal(event);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (draggingPointerId.current !== event.pointerId) return;
    const progress = progressFromPointer(event);
    writeCompareProgress(progress);
    setCompareProgress(progress);
    endDrag(event);
  };

  const handlePointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    if (draggingPointerId.current !== event.pointerId) return;
    writeCompareProgress(compareProgressRef.current);
    endDrag(event);
  };

  const setCompare = (progress: number) => {
    choosePhase("rebuild");
    const nextProgress = clamp(progress, 0, 1);
    setCompareProgress(nextProgress);
    writeCompareProgress(nextProgress);
  };

  const stageStyle = {
    "--compare-progress": compareProgress,
    "--stage-density": active.density,
    "--stage-hierarchy": active.hierarchy,
    "--stage-cta-scale": active.ctaScale,
    "--stage-column-flow": active.columnFlow,
  } as CSSProperties;

  return (
    <section id="work" ref={scope} className="stage-shell px-4 py-20 sm:px-6 md:py-28 lg:px-10" data-reconstruction-stage>
      <div className="mx-auto max-w-375">
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
            <div className={`stage-sticky ${reduceMotion ? "" : "stage-sticky--enabled"} flex flex-col justify-between gap-8`}>
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

              <Tabs
                value={activePhase}
                onValueChange={(value) => {
                  if (typeof value === "string") choosePhase(value as ReconstructionPhase);
                }}
                className="w-full"
              >
                <TabsList aria-label="Các pha tái cấu trúc" className="flex w-full flex-wrap justify-start gap-2 border-0 p-0">
                  {reconstructionPhases.map((phase, index) => (
                    <TabsTrigger
                      key={phase.id}
                      value={phase.id}
                      className="min-h-11 flex-none border border-foreground/25 px-3 py-2 text-left text-xs data-active:border-accent data-active:bg-accent data-active:text-background"
                    >
                      <span className="font-mono text-xs">0{index + 1}</span>
                      <span className="ml-2">{phase.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                {reconstructionPhases.map((phase) => (
                  <TabsContent key={phase.id} value={phase.id} className="hidden" />
                ))}
              </Tabs>
            </div>
          </div>

          <div className="md:col-span-8 md:col-start-5">
            <div
              ref={stage}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              onLostPointerCapture={handlePointerCancel}
              onPointerLeave={hidePointerReveal}
              aria-label="Khung minh họa quá trình nhìn và dựng lại website. Di chuyển trỏ chuột để soi web mới; dùng phím mũi tên để chuyển pha."
              className="stage-canvas outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              style={stageStyle}
              aria-describedby="reconstruction-stage-help"
            >
              <div className="stage-old-art">
                <StageBlocks variant="old" />
                <div className="absolute left-[7%] top-[7%] font-mono text-[0.6rem] uppercase tracking-[0.12em] text-foreground/55">
                  Web cũ / crowded structure
                </div>
              </div>
              <div className="stage-new-art">
                <NewStageArt />
              </div>
              <div ref={pointerReveal} className="stage-pointer-reveal" aria-hidden="true">
                <NewStageArt />
              </div>
              <div className="stage-bounds" aria-hidden="true" />
              <p className="absolute bottom-5 left-5 z-10 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-foreground/65">
                {compareProgress >= 0.5 ? "After / concept minh họa" : "Before / concept minh họa"}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/redesign/nha-moc-demo"
                className="inline-flex min-h-11 items-center border-b border-accent pb-2 text-sm text-foreground transition-colors duration-200 hover:text-accent"
              >
Xem case study minh họa →
              </Link>
              <div className="flex flex-wrap items-center gap-2">
                <ToggleGroup
                  value={compareProgress === 0 ? ["before"] : compareProgress === 1 ? ["after"] : []}
                  onValueChange={(value) => {
                    if (value[0] === "before") setCompare(0);
                    if (value[0] === "after") setCompare(1);
                  }}
                  spacing={0}
                  aria-label="Chọn mức so sánh"
                >
                  <ToggleGroupItem value="before" className="min-h-11 border border-foreground/25 px-4 py-2 text-xs data-[state=on]:border-accent data-[state=on]:bg-accent data-[state=on]:text-background">
                    Before
                  </ToggleGroupItem>
                  <ToggleGroupItem value="after" className="min-h-11 border border-foreground/25 px-4 py-2 text-xs data-[state=on]:border-accent data-[state=on]:bg-accent data-[state=on]:text-background">
                    After
                  </ToggleGroupItem>
                </ToggleGroup>
                <label htmlFor="compare-range" className="sr-only">
                  Mức độ tái cấu trúc
                </label>
                <Slider
                  id="compare-range"
                  min={0}
                  max={100}
                  step={1}
                  value={[Math.round(compareProgress * 100)]}
                  onValueChange={(value) => {
                    const nextValue = Array.isArray(value) ? value[0] : value;
                    setCompare(nextValue / 100);
                  }}
                  aria-label="Mức độ tái cấu trúc từ Before đến After"
                  className="w-40"
                />
              </div>
              <p id="reconstruction-stage-help" className="text-xs leading-relaxed text-muted">
                {activePhase === "rebuild" && !reduceMotion
                  ? "Kéo trong khung hoặc dùng thanh điều khiển để thay đổi mức độ so sánh."
                  : "Di chuyển trỏ chuột trong khung để soi website mới; dùng mũi tên trái/phải để đi qua năm pha."}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 hidden md:block" aria-hidden="true">
          {reconstructionPhases.map((phase) => (
            <div key={phase.id} data-phase-sentinel-desktop={phase.id} className="h-[42vh]" />
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t editorial-rule pt-5 md:hidden">
          {reconstructionPhases.map((phase) => (
            <article key={phase.id} id={`phase-panel-${phase.id}`} data-phase-sentinel-mobile={phase.id} className="border-b editorial-rule pb-5">
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
