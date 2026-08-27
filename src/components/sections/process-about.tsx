"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollText } from "@/components/scroll-text";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const blocks = [
  {
    title: "Bắt đầu từ website đang có.",
    copy: "Nét Nút rà soát website hiện tại, xác định phần cần giữ, phần cần thay và thống nhất một hướng thiết kế cốt lõi trước khi triển khai toàn bộ.",
  },
  {
    title: "Tinh gọn để đi thẳng vào việc.",
    copy: "Nét tạo cảm giác. Nút tạo hành động. Nét Nút là studio tại Việt Nam, tập trung vào redesign website doanh nghiệp. Làm việc trực tiếp, phạm vi rõ ràng và quyết định nhanh.",
  },
];

export function ProcessAbout() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const splits = Array.from(
        scope.current?.querySelectorAll<HTMLElement>("[data-split-copy]") ?? [],
      ).map((element) =>
        SplitText.create(element, { type: "lines", linesClass: "process-line", mask: "lines" }),
      );

      splits.forEach((split, index) => {
        gsap.fromTo(
          split.lines,
          { yPercent: 115, opacity: 0.15 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.08,
            ease: "expo.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: split.lines[0],
              start: "top 78%",
              toggleActions: "play none none none",
              once: true,
            },
            delay: index * 0.06,
          },
        );
      });

      const rule = scope.current?.querySelector<HTMLElement>("[data-process-rule]");
      if (rule) {
        gsap.set(rule, { scaleX: 0, opacity: 0, transformOrigin: "left center" });
        gsap.to(rule, {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: rule,
            start: "top 82%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      return () => splits.forEach((split) => split.revert());
    },
    { scope },
  );

  return (
    <section id="process" ref={scope} className="px-4 py-32 sm:px-6 md:py-48 lg:px-10">
      <div className="mx-auto max-w-375">
        <div className="grid gap-y-8 md:grid-cols-12 md:gap-y-12">
          <article
            data-manifesto-slab
            className="relative z-10 bg-foreground text-background md:col-span-10 md:col-start-1"
          >
            <div
              className="absolute inset-x-0 top-0 h-2 origin-left bg-accent"
              data-process-rule
              aria-hidden="true"
            />
            <div className="grid gap-12 px-6 py-12 md:grid-cols-8 md:gap-8 md:px-12 md:py-16">
              <ScrollText mode="words" replay={false} className="md:col-span-6">
                <h2 className="max-w-none text-[clamp(3.5rem,7.2vw,6rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                  {blocks[0].title}
                </h2>
              </ScrollText>
              <p data-split-copy className="max-w-136 self-end text-base leading-[1.6] text-background/65 md:col-span-2 md:col-start-7 md:text-lg">
                {blocks[0].copy}
              </p>
            </div>
          </article>

          <article
            data-manifesto-slab
            className="relative bg-accent text-background md:col-span-9 md:col-start-4"
          >
            <div className="grid gap-12 px-6 py-12 md:grid-cols-8 md:gap-8 md:px-12 md:py-16">
              <p data-split-copy className="max-w-136 text-base leading-[1.6] text-background/75 md:col-span-2 md:col-start-1 md:pt-4 md:text-lg">
                {blocks[1].copy}
              </p>
              <ScrollText mode="words" replay={false} className="md:col-span-6 md:col-start-3">
                <h2 className="max-w-none text-[clamp(3.2rem,6.4vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                  {blocks[1].title}
                </h2>
              </ScrollText>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
