"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ProjectVisual({ newVersion = false }: { newVersion?: boolean }) {
  if (newVersion) {
    return (
      <div className="absolute inset-0 bg-[#ededed] text-[#090909]">
        <div className="absolute left-[6%] top-[8%] flex w-[88%] items-center justify-between border-b border-black/20 pb-4 font-mono text-[10px] uppercase tracking-[0.1em]">
          <span>Tái cấu trúc thương hiệu</span>
          <span>Nét Nút Studio</span>
        </div>
        <div className="absolute left-[6%] top-[20%] max-w-[9ch] text-[clamp(3.4rem,9vw,9rem)] font-semibold leading-[0.79] tracking-[-0.04em]">
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
  const [mobileView, setMobileView] = useState<"old" | "new">("old");

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
          once: true,
        },
      });
    },
    { scope },
  );

  const updateMask = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    reveal.current?.style.setProperty("--mask-x", `${x}px`);
    reveal.current?.style.setProperty("--mask-y", `${y}px`);
    reveal.current?.style.setProperty("--mask-size", "clamp(110px, 18vw, 240px)");
    gsap.to(lens.current, { x, y, opacity: 1, duration: 0.25, ease: "power3.out" });
  };

  const hideMask = () => {
    reveal.current?.style.setProperty("--mask-size", "0px");
    gsap.to(lens.current, { opacity: 0, duration: 0.2, ease: "power2.out" });
  };

  return (
    <section id="work" ref={scope} className="px-4 py-32 sm:px-6 md:py-48 lg:px-10">
      <div className="mx-auto max-w-[1500px]">
        <h2 className="mb-14 max-w-[12ch] text-[clamp(3rem,7.8vw,7.5rem)] font-semibold leading-[0.86] tracking-[-0.04em] md:mb-20">
          Dấu ấn của Nét Nút
        </h2>

        <div
          ref={frame}
          onPointerMove={updateMask}
          onPointerLeave={hideMask}
          className="relative isolate min-h-[72vh] overflow-hidden bg-[#151515] md:min-h-[82vh]"
        >
          <ProjectVisual />

          <div ref={reveal} className="masked-media absolute inset-0 hidden bg-accent md:block" aria-hidden="true">
            <ProjectVisual newVersion />
          </div>

          <div
            className={`absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${mobileView === "new" ? "opacity-100" : "pointer-events-none opacity-0"}`}
            aria-hidden={mobileView !== "new"}
          >
            <ProjectVisual newVersion />
          </div>

          <div
            ref={lens}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[clamp(110px,18vw,240px)] w-[clamp(110px,18vw,240px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 opacity-0 md:block"
          />

          <p className="pointer-events-none absolute right-5 top-5 z-10 font-mono text-[10px] uppercase tracking-[0.12em] text-white mix-blend-difference">
            Concept minh họa
          </p>

          <div className="absolute bottom-5 right-5 z-10 flex rounded-full border border-white/30 bg-[#090909]/90 p-1 md:hidden">
            <button
              type="button"
              aria-pressed={mobileView === "old"}
              onClick={() => setMobileView("old")}
              className={`rounded-full px-4 py-2 text-xs ${mobileView === "old" ? "bg-foreground text-[#090909]" : "text-foreground"}`}
            >
              Web cũ
            </button>
            <button
              type="button"
              aria-pressed={mobileView === "new"}
              onClick={() => setMobileView("new")}
              className={`rounded-full px-4 py-2 text-xs ${mobileView === "new" ? "bg-accent text-[#090909]" : "text-foreground"}`}
            >
              Web mới
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <span className="border-b border-accent pb-1 text-sm font-medium text-white/55">
            Dự án đầy đủ sắp ra mắt
          </span>
        </div>
      </div>
    </section>
  );
}
