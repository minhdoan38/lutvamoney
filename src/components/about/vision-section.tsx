"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const tracks = [
  { label: "Đọc", copy: "Nhìn vào website đang có cùng bối cảnh doanh nghiệp, để hiểu điều gì đã tích lũy và điều gì không còn phục vụ hiện tại." },
  { label: "Sắp", copy: "Làm rõ cấu trúc, thông điệp và đường đi chính, để người xem tìm được điều họ cần mà không phải đoán." },
  { label: "Dựng", copy: "Xác định hướng và phạm vi phù hợp. Thiết kế, code và chuyển động chỉ xuất hiện khi chúng giúp website làm tốt hơn." },
];

export function VisionSection() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from("[data-vision-row]", {
        y: 28,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: "expo.out",
        scrollTrigger: { trigger: scope.current, start: "top 76%", toggleActions: "play none none none", once: true },
      });
    },
    { scope },
  );

  return (
    <section id="vision" ref={scope} className="border-t border-line px-4 py-24 sm:px-6 md:py-36 lg:px-10" aria-labelledby="vision-heading">
      <div className="mx-auto grid max-w-375 gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <h2 id="vision-heading" className="font-mono text-[0.625rem] font-normal tracking-[0.12em] text-muted">
            Nét Nút làm gì ở khoảng cách đó?
          </h2>
          <p className="display-expansion mt-10 max-w-[8ch] text-[clamp(4rem,10vw,9rem)] font-semibold leading-[0.82] tracking-[-0.05em] text-foreground">
            Làm
            <br />
            rõ.
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <p className="max-w-3xl text-[clamp(1.25rem,2.6vw,2rem)] font-medium leading-[1.34] tracking-[-0.03em] text-foreground">
            Nét Nút không bắt đầu bằng một công thức mới. Nét Nút bắt đầu bằng việc đọc đúng website và doanh nghiệp đang có, rồi sắp lại đường đi để phù hợp với hiện tại.
          </p>
          <div className="mt-14 border-t border-line">
            {tracks.map((track) => (
              <article key={track.label} data-vision-row className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:items-baseline md:py-10">
                <h3 className="display-compression text-[clamp(2rem,4vw,4rem)] font-medium leading-none tracking-[-0.04em] md:col-span-4">{track.label}</h3>
                <p className="text-base leading-relaxed text-muted md:col-span-5 md:col-start-8">{track.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
