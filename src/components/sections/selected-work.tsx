"use client";

import type { KeyboardEvent } from "react";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollText } from "@/components/scroll-text";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ProjectVisual({ newVersion = false }: { newVersion?: boolean }) {
  if (newVersion) {
    return (
      <div className="absolute inset-0 bg-[#ededed] text-[#090909]">
        <div className="absolute left-[6%] top-[8%] flex w-[88%] items-center justify-between border-b border-black/20 pb-4 font-mono text-[10px] uppercase tracking-[0.1em]">
          <span>Tái cấu trúc thương hiệu</span>
          <span>Nét Nút Studio</span>
        </div>
        <div className="absolute left-[6%] top-[20%] max-w-[9ch] text-[clamp(3.4rem,9vw,9rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
          Rõ hơn. Nhanh hơn.
        </div>
        <div className="absolute bottom-0 right-0 h-[42%] w-[50%] bg-accent" />
        <div className="absolute bottom-[8%] right-[7%] max-w-[14ch] text-right text-[clamp(1.4rem,3.2vw,3.2rem)] font-semibold leading-[0.92] tracking-[-0.03em]">
          Một website theo kịp doanh nghiệp.
        </div>
        <p className="absolute bottom-6 left-6 font-mono text-xs uppercase tracking-[0.12em]">
          Web mới
        </p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-[linear-gradient(100deg,#111_0%,#222_55%,#111_100%)] grayscale">
      <div className="absolute left-[7%] top-[12%] h-[18%] w-[62%] border border-white/15 bg-white/[0.025]" />
      <div className="absolute left-[7%] top-[36%] h-[7%] w-[31%] bg-white/[0.07]" />
      <div className="absolute left-[7%] top-[49%] h-[4%] w-[48%] bg-white/[0.045]" />
      <div className="absolute bottom-[8%] right-[6%] h-[38%] w-[40%] border border-white/10 bg-[#0e0e0e]" />
      <p className="absolute bottom-6 left-6 font-mono text-xs uppercase tracking-[0.12em] text-white/55">
        Web cũ
      </p>
    </div>
  );
}

export function SelectedWork() {
  const scope = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const reveal = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLDivElement>(null);
  const [comparisonView, setComparisonView] = useState<"old" | "new">("old");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(frame.current, {
        clipPath: "inset(12% 14% 12% 14%)",
        scale: 0.92,
        duration: 1.25,
        ease: "expo.out",
        scrollTrigger: {
          trigger: frame.current,
          start: "top 72%",
          toggleActions: "play reverse play reverse",
        },
      });
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
      <div className="mx-auto max-w-[1500px]">
        <ScrollText mode="words">
          <h2 className="mb-14 max-w-[12ch] text-[clamp(3rem,7.8vw,7.5rem)] font-semibold leading-[0.96] tracking-[-0.04em] md:mb-20">
            Cách chúng tôi soi
          </h2>
        </ScrollText>

        <div
          ref={frame}
          onPointerMove={updateMask}
          onPointerLeave={hideMask}
          onKeyDown={handleComparisonKeyDown}
          tabIndex={0}
          aria-label="So sánh concept website cũ và website mới bằng phím mũi tên"
          className="relative isolate min-h-[72vh] overflow-hidden bg-surface-work outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background md:min-h-[82vh]"
        >
          <ProjectVisual />

          <div
            ref={reveal}
            className={`masked-media absolute inset-0 hidden bg-accent md:block ${comparisonView === "new" ? "comparison-full" : ""}`}
            aria-hidden="true"
          >
            <ProjectVisual newVersion />
          </div>

          <div
            className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${comparisonView === "new" ? "opacity-100" : "pointer-events-none opacity-0"}`}
            aria-hidden={comparisonView !== "new"}
          >
            <ProjectVisual newVersion />
          </div>

          <div
            ref={lens}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[clamp(110px,18vw,240px)] w-[clamp(110px,18vw,240px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 opacity-0 md:block"
          />

          <p className="pointer-events-none absolute right-5 top-5 z-10 max-w-[15ch] text-right text-xs leading-relaxed text-white mix-blend-difference">
            Khung minh họa để xem cách soi trước và sau.
          </p>

          <div className="absolute bottom-5 right-5 z-10 flex rounded-full border border-white/30 bg-background/90 p-1">
            <button
              type="button"
              aria-pressed={comparisonView === "old"}
              onClick={() => chooseComparison("old")}
              className={`min-h-11 rounded-full px-4 py-2 text-xs ${comparisonView === "old" ? "bg-foreground text-background" : "text-foreground"}`}
            >
              Web cũ
            </button>
            <button
              type="button"
              aria-pressed={comparisonView === "new"}
              onClick={() => chooseComparison("new")}
              className={`min-h-11 rounded-full px-4 py-2 text-xs ${comparisonView === "new" ? "bg-accent text-background" : "text-foreground"}`}
            >
              Web mới
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t editorial-rule pt-5 sm:flex-row sm:items-baseline sm:justify-between">
          <ScrollText mode="words">
            <p className="text-sm font-medium text-foreground">Phương pháp minh họa</p>
          </ScrollText>
          <ScrollText>
            <p className="max-w-[34rem] text-sm leading-relaxed text-muted">
              Soi cấu trúc cũ, giữ lại giá trị, rồi dựng lại đường đi rõ hơn.
            </p>
          </ScrollText>
        </div>
      </div>
    </section>
  );
}
