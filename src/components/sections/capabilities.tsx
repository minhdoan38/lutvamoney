"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollText } from "@/components/scroll-text";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const capabilities = [
  "Chẩn đoán đúng vấn đề",
  "Sắp xếp thông tin dễ hiểu",
  "Thiết kế giao diện có lý do",
  "Giữ giá trị thương hiệu",
  "Dẫn mắt bằng chuyển động",
  "Tạo tương tác có mục đích",
  "Tối ưu tốc độ và độ bền",
  "Bàn giao sẵn sàng vận hành",
];

export function Capabilities() {
  const scope = useRef<HTMLElement>(null);

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

  const magnetize = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    gsap.to(event.currentTarget, {
      x: x * 0.2,
      y: y * 0.28,
      rotation: x * 0.012,
      duration: 0.55,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const release = (event: React.PointerEvent<HTMLSpanElement>) => {
    gsap.to(event.currentTarget, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.4,
      ease: "expo.out",
      overwrite: true,
    });
  };

  return (
    <section id="capabilities" ref={scope} className="px-4 py-32 sm:px-6 md:py-48 lg:px-10">
      <div className="mx-auto max-w-375">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <ScrollText mode="words">
            <h2 className="max-w-none text-[clamp(3.2rem,7vw,6.2rem)] font-semibold leading-[0.96] tracking-[-0.04em] md:col-span-7">
              Từ nét đến nút.
            </h2>
          </ScrollText>
          <div className="flex flex-wrap content-start gap-2 md:col-span-5 md:pt-8">
            {capabilities.map((capability, index) => (
              <span
                key={capability}
                data-capability
                onPointerMove={magnetize}
                onPointerLeave={release}
                className={`rounded-full border px-4 py-2.5 text-sm transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] sm:px-5 sm:py-3 ${
                  index === 3 || index === 6
                    ? "border-accent bg-accent text-[#090909]"
                    : "border-white/22 text-white/72"
                }`}
              >
                {capability}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
