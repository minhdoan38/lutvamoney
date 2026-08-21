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
      const titleSplit = SplitText.create(title, { type: "lines", linesClass: "culture-title-line", mask: "lines", aria: "hidden" });
      const bodySplit = SplitText.create(body, { type: "lines", linesClass: "culture-body-line", mask: "lines", aria: "hidden" });

      gsap.fromTo(titleSplit.lines, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.07, ease: "expo.out", scrollTrigger: { trigger: title, start: "top 80%", toggleActions: "play none none none", once: true } });
      gsap.fromTo(bodySplit.lines, { yPercent: 105, opacity: 0.25 }, { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.05, ease: "expo.out", scrollTrigger: { trigger: body, start: "top 78%", toggleActions: "play none none none", once: true } });

      return () => {
        titleSplit.revert();
        bodySplit.revert();
      };
    },
    { scope },
  );

  return (
    <section id="culture" ref={scope} className="px-4 py-24 sm:px-6 md:py-36 lg:px-10">
      <div className="mx-auto grid max-w-375 gap-12 md:grid-cols-12 md:gap-8">
        <h2 data-culture-title className="display-release max-w-[9ch] text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] md:col-span-5">
          Một studio nhỏ. Làm việc trực tiếp.
        </h2>
        <p data-culture-body className="max-w-152 text-base leading-[1.72] text-foreground/68 md:col-span-5 md:col-start-8 md:self-end md:text-lg lg:col-span-4 lg:col-start-9">
          Nét Nút hiện được vận hành bởi một team local. Người tìm hiểu bài toán, người đưa ra hướng giải quyết và người trực tiếp thực hiện sản phẩm làm việc gần nhau trong suốt quá trình. Ít thông tin bị thất lạc hơn, quyết định nhanh hơn và trách nhiệm cũng rõ ràng hơn.
        </p>
      </div>
    </section>
  );
}
