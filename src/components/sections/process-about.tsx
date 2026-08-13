"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const blocks = [
  {
    title: "Bắt đầu từ website đang có.",
    copy: "Gửi Nét Nút website hiện tại. Chúng tôi sẽ soi xét, tìm cơ hội và đề xuất định hướng. Với bài toán phù hợp, Nét Nút sẽ demo một concept cốt lõi trước khi bắt tay vào toàn bộ dự án.",
  },
  {
    title: "Tinh gọn để đi thẳng vào việc.",
    copy: "Nét tạo cảm giác. Nút tạo hành động. Nét Nút là một studio tinh gọn tại Việt Nam, tập trung chuyên sâu vào redesign website doanh nghiệp. Không cồng kềnh. Làm trực tiếp. Ra quyết định nhanh.",
  },
];

export function ProcessAbout() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const splits = gsap.utils.toArray<HTMLElement>("[data-split-copy]").map((element) =>
        SplitText.create(element, { type: "lines", linesClass: "process-line", mask: "lines" }),
      );

      splits.forEach((split, index) => {
        gsap.from(split.lines, {
          yPercent: 115,
          opacity: 0.15,
          duration: 1,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: split.lines[0],
            start: "top 78%",
            once: true,
          },
          delay: index * 0.06,
        });
      });

      return () => splits.forEach((split) => split.revert());
    },
    { scope },
  );

  return (
    <section ref={scope} className="px-4 py-32 sm:px-6 md:py-48 lg:px-10">
      <div className="mx-auto grid max-w-[1500px] gap-16 border-y editorial-rule py-16 md:grid-cols-12 md:gap-8 md:py-24">
        {blocks.map((block, index) => (
          <article
            key={block.title}
            className={index === 0 ? "md:col-span-5" : "md:col-span-5 md:col-start-8 md:pt-40"}
          >
            <h2 className="mb-8 max-w-[13ch] text-[clamp(2.4rem,4.8vw,5rem)] font-semibold leading-[0.9] tracking-[-0.04em]">
              {block.title}
            </h2>
            <p data-split-copy className="max-w-[34rem] text-base leading-[1.65] text-white/60 md:text-lg">
              {block.copy}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
