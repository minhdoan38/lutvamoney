"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export function CultureSection() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const title = scope.current?.querySelector<HTMLElement>("[data-culture-title]");
      const body = scope.current?.querySelector<HTMLElement>("[data-culture-body]");
      if (!title || !body) return;

      const titleSplit = SplitText.create(title, {
        type: "lines",
        linesClass: "culture-title-line",
        mask: "lines",
        aria: "hidden",
      });
      const bodySplit = SplitText.create(body, {
        type: "lines",
        linesClass: "culture-body-line",
        mask: "lines",
        aria: "hidden",
      });

      gsap.set(titleSplit.lines, { yPercent: 110, opacity: 0 });
      gsap.to(titleSplit.lines, {
        yPercent: 0,
        opacity: 1,
        duration: 0.95,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      gsap.set(bodySplit.lines, { yPercent: 105, opacity: 0.25 });
      gsap.to(bodySplit.lines, {
        yPercent: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.05,
        ease: "expo.out",
        scrollTrigger: {
          trigger: body,
          start: "top 78%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      return () => {
        titleSplit.revert();
        bodySplit.revert();
      };
    },
    { scope },
  );

  return (
    <section
      id="culture"
      ref={scope}
      className="px-4 py-32 sm:px-6 md:py-48 lg:px-10"
    >
      <div className="mx-auto grid max-w-375 grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
        <h2
          data-culture-title
          className="max-w-[10ch] text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-foreground md:col-span-5 md:leading-[0.96]"
        >
          Một studio, làm việc trực tiếp
        </h2>

        <p
          data-culture-body
          className="max-w-152 text-base leading-[1.72] text-foreground/68 md:col-span-5 md:col-start-8 md:self-end md:text-lg lg:col-span-4 lg:col-start-9"
        >
          Nét Nút hiện được vận hành bởi một team local. Người tìm hiểu bài toán, người đưa ra hướng giải quyết và người trực tiếp thực hiện sản phẩm luôn làm việc gần nhau trong suốt quá trình. Ít thông tin bị thất lạc hơn, quá trình làm việc liền mạch hơn và trách nhiệm cũng rõ ràng hơn. Chúng tôi thích đưa ý tưởng thành thứ có thể nhìn thấy càng sớm càng tốt. Bởi đôi khi, một concept đúng có thể nói rõ vấn đề hơn rất nhiều lời giải thích.
        </p>
      </div>
    </section>
  );
}
