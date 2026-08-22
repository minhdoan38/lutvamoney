"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollText } from "@/components/scroll-text";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const steps = [
  { verb: "Nhìn", copy: "Bắt đầu từ website đang có và điều doanh nghiệp đã tích lũy." },
  { verb: "Giữ", copy: "Nhận ra phần tạo nên equity trước khi chạm vào phần trình bày." },
  { verb: "Gỡ", copy: "Loại bỏ lớp thừa, đường vòng và những thứ đang giữ thông điệp lại." },
  { verb: "Dựng", copy: "Tạo lại hệ thống nội dung, giao diện và chuyển động có lý do." },
  { verb: "Chạy", copy: "Đưa một website nhẹ, rõ, và sẵn sàng đi cùng giai đoạn tiếp theo." },
];

export function StudioProcess() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const copies = Array.from(scope.current?.querySelectorAll<HTMLElement>("[data-process-copy]") ?? []);
      const splits = copies.map((copy) => SplitText.create(copy, { type: "lines", linesClass: "process-line", mask: "lines" }));
      splits.forEach((split, index) => {
        gsap.fromTo(
          split.lines,
          { yPercent: 115, opacity: 0.15 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.06,
            delay: index * 0.04,
            ease: "expo.out",
            scrollTrigger: {
              trigger: split.lines[0],
              start: "top 82%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });
      return () => splits.forEach((split) => split.revert());
    },
    { scope },
  );

  return (
    <section id="process" ref={scope} className="px-4 py-20 sm:px-6 md:py-28 lg:px-10">
      <div className="mx-auto max-w-375">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <ScrollText mode="words">
            <h2 className="display-release max-w-[10ch] text-[clamp(3.5rem,7.2vw,6rem)] font-semibold leading-[0.88] tracking-[-0.045em] md:col-span-7">
              Một studio nhỏ. Làm trực tiếp. Ít tầng trung gian.
            </h2>
          </ScrollText>
          <p className="max-w-md self-end text-base leading-relaxed text-muted md:col-span-4 md:col-start-9">
            Người nhìn bài toán, người đưa ra hướng giải quyết và người trực tiếp thực hiện cùng ở gần nhau.
          </p>
        </div>

        <div className="mt-16 border-t editorial-rule">
          {steps.map((step, index) => (
            <article key={step.verb} className="grid gap-6 border-b editorial-rule py-7 md:grid-cols-12 md:items-baseline md:py-9">
              <p className="font-mono text-[0.625rem] tracking-[0.12em] text-accent md:col-span-1">0{index + 1}</p>
              <h3 className="display-compression text-[clamp(2rem,4vw,4rem)] font-medium leading-none tracking-[-0.04em] md:col-span-4">{step.verb}</h3>
              <p data-process-copy className="max-w-xl text-base leading-relaxed text-muted md:col-span-5 md:col-start-8">{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
