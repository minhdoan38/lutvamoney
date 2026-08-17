"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const lines = [
  "Website không phải một tấm brochure nằm trên internet.",
  "Nó thường là nơi đầu tiên một khách hàng mới dùng để đánh giá doanh nghiệp.",
  "Nếu doanh nghiệp đã thay đổi nhưng website chưa thay đổi, khoảng cách đó trực tiếp ảnh hưởng tới cách thị trường nhìn nhận thương hiệu.",
  "Vì vậy, redesign đối với chúng tôi không đơn giản là thay màu, đổi font hay thêm animation.",
  "Đó là việc xem lại toàn bộ cách doanh nghiệp đang được kể trên môi trường số.",
];

export function ManifestoSection() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const targets = gsap.utils.toArray<HTMLElement>("[data-manifesto-line]");
      const splits = targets.map((element) =>
        SplitText.create(element, {
          type: "lines",
          linesClass: "manifesto-split-line",
          aria: "hidden",
        }),
      );

      splits.forEach((split, index) => {
        gsap.from(split.lines, {
          yPercent: 110,
          opacity: 0.2,
          duration: 0.95,
          stagger: 0.06,
          ease: "expo.out",
          scrollTrigger: {
            trigger: targets[index],
            start: "top 82%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true,
          },
        });
      });

      return () => {
        splits.forEach((split) => split.revert());
      };
    },
    { scope },
  );

  return (
    <section
      id="manifesto"
      ref={scope}
      className="px-4 py-32 sm:px-6 md:py-48 lg:px-10"
      aria-labelledby="manifesto-heading"
    >
      <div className="mx-auto max-w-[1500px]">
        <h2 id="manifesto-heading" className="sr-only">
          Điều chúng tôi tin
        </h2>

        <div className="mx-auto flex max-w-[58rem] flex-col gap-8 md:gap-12 lg:ml-[8%] lg:max-w-[62rem]">
          {lines.map((line) => (
            <p
              key={line}
              data-manifesto-line
              className="text-[clamp(1.65rem,4.2vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.035em] text-foreground"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
