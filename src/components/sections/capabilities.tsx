"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollText } from "@/components/scroll-text";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const capabilities = [
  { name: "Information architecture", copy: "Sắp xếp nội dung thành những đường đi có thể hiểu được.", annotation: "STRUCTURE / FLOW" },
  { name: "Content hierarchy", copy: "Đưa điều quan trọng lên đúng vị trí và đúng nhịp.", annotation: "MESSAGE / ORDER" },
  { name: "UI system", copy: "Tạo một ngôn ngữ giao diện đủ rõ để dùng lâu dài.", annotation: "INTERFACE / RULES" },
  { name: "Responsive behavior", copy: "Giữ sự rõ ràng khi khung nhìn thay đổi.", annotation: "SPACE / ADAPT" },
  { name: "Front-end motion", copy: "Dùng chuyển động để giải thích, không để gây nhiễu.", annotation: "MOTION / FEEDBACK" },
  { name: "Performance", copy: "Làm nền tảng nhẹ để nội dung đi trước hiệu ứng.", annotation: "LOAD / CARE" },
  { name: "Conversion path", copy: "Mở một bước tiếp theo tự nhiên sau khi đã hiểu.", annotation: "ACTION / NEXT" },
  { name: "Design system", copy: "Để hình ảnh và hành động cùng nói một giọng.", annotation: "CONSISTENCY / VOICE" },
];

export function Capabilities() {
  const scope = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from("[data-capability]", {
        y: 24,
        opacity: 0,
        stagger: 0.055,
        duration: 0.7,
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
    <section id="capabilities" ref={scope} className="px-4 py-20 sm:px-6 md:py-28 lg:px-10">
      <div className="mx-auto max-w-375">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <ScrollText mode="words">
            <h2 className="display-expansion max-w-[8ch] text-[clamp(3.2rem,7vw,6.2rem)] font-semibold leading-[0.88] tracking-[-0.045em] md:col-span-5">
              Năng lực để dựng lại.
            </h2>
          </ScrollText>
          <div className="md:col-span-7 md:col-start-6">
            <p className="mb-4 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-accent">
              Hệ thống làm việc / khung minh họa
            </p>
            <div className="border-t editorial-rule">
              {capabilities.map((capability, index) => {
                const isActive = active === index;
                return (
                  <article
                    key={capability.name}
                    data-capability
                    data-active={isActive}
                    className="capability-item border-b editorial-rule"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                  >
                    <button
                      type="button"
                      aria-expanded={isActive}
                      aria-controls={`capability-copy-${index}`}
                      onClick={() => setActive(isActive ? -1 : index)}
                      className="grid min-h-16 w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 py-5 text-left md:grid-cols-[3rem_1fr_auto] md:gap-5"
                    >
                      <span className="capability-index font-mono text-[0.625rem] tracking-[0.1em] text-muted">
                        0{index + 1}
                      </span>
                      <span className="capability-name display-compression text-[clamp(1.55rem,3.2vw,3.4rem)] font-medium leading-none tracking-[-0.04em] transition-[color,font-variation-settings] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]">
                        {capability.name}
                      </span>
                      <span className="font-mono text-[0.55rem] tracking-[0.1em] text-muted">
                        {capability.annotation}
                      </span>
                    </button>
                    <div
                      id={`capability-copy-${index}`}
                      role="region"
                      aria-hidden={!isActive}
                      className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <p className="min-h-0 pb-5 pl-[3.5rem] text-sm leading-relaxed text-muted md:pl-16">
                        {capability.copy}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
