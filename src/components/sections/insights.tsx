"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollText } from "@/components/scroll-text";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const insights = [
  {
    title: "Redesign website các trường đại học Việt Nam",
    status: "Chủ đề sắp xuất bản",
  },
  {
    title: "Website doanh nghiệp 15 năm tuổi đang sai ở đâu",
    status: "Chủ đề sắp xuất bản",
  },
  {
    title: "Một homepage tốt thực sự cần gì",
    status: "Chủ đề sắp xuất bản",
  },
];

export function Insights() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from("[data-insight-row]", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: "expo.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 76%",
          toggleActions: "play reverse play reverse",
        },
      });
    },
    { scope },
  );

  return (
    <section id="insights" ref={scope} className="px-4 py-32 sm:px-6 md:py-48 lg:px-10">
      <div className="mx-auto max-w-375">
        <ScrollText mode="words">
          <h2 className="mb-14 max-w-none text-[clamp(3rem,6.4vw,5.8rem)] font-semibold leading-[0.96] tracking-[-0.04em] md:mb-20">
            Đập web ra xem
          </h2>
        </ScrollText>

        <div className="border-t editorial-rule">
          {insights.map((insight) => (
            <article data-insight-row key={insight.title} className="group grid gap-6 border-b editorial-rule py-7 md:grid-cols-12 md:items-center md:px-3 md:py-10">
              <ScrollText mode="words" start="top 92%">
                <h3 className="max-w-[22ch] text-[clamp(1.7rem,3.9vw,4rem)] font-medium leading-[0.95] tracking-[-0.035em] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-2 md:col-span-9">
                  {insight.title}
                </h3>
              </ScrollText>
              <span className="text-sm text-muted md:col-span-3 md:text-right">
                {insight.status}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
