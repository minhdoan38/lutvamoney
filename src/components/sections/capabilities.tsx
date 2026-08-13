"use client";

import { useRef } from "react";
import gsap from "gsap";

const capabilities = [
  "Chiến lược và đánh giá",
  "Kiến trúc thông tin",
  "Thiết kế UI / UX",
  "Định hướng sáng tạo",
  "Thiết kế chuyển động",
  "Hoạt ảnh GSAP",
  "Phát triển Next.js",
  "Triển khai và lưu trữ",
];

export function Capabilities() {
  const scope = useRef<HTMLElement>(null);

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
      duration: 0.75,
      ease: "elastic.out(1,0.45)",
      overwrite: true,
    });
  };

  return (
    <section id="capabilities" ref={scope} className="px-4 py-32 sm:px-6 md:py-48 lg:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <h2 className="max-w-[8ch] text-[clamp(3.6rem,9vw,8.8rem)] font-semibold leading-[0.83] tracking-[-0.04em] md:col-span-7">
            Từ nét đến nút.
          </h2>
          <div className="flex flex-wrap content-start gap-2 md:col-span-5 md:pt-8">
            {capabilities.map((capability, index) => (
              <span
                key={capability}
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
