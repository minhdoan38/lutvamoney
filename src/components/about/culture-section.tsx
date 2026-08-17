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

      gsap.from(titleSplit.lines, {
        yPercent: 110,
        duration: 0.95,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(bodySplit.lines, {
        yPercent: 105,
        opacity: 0.25,
        duration: 0.85,
        stagger: 0.05,
        ease: "expo.out",
        scrollTrigger: {
          trigger: body,
          start: "top 78%",
          toggleActions: "play none none none",
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
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
        <h2
          data-culture-title
          className="max-w-[10ch] text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-foreground md:col-span-5 md:leading-[0.86]"
        >
          Một studio nhỏ, làm trực tiếp
        </h2>

        <p
          data-culture-body
          className="max-w-[38rem] text-base leading-[1.65] text-foreground/68 md:col-span-5 md:col-start-8 md:self-end md:text-lg lg:col-span-4 lg:col-start-9"
        >
          Nét Nút hiện được vận hành bởi một team nhỏ. Điều đó có nghĩa người nghiên cứu bài toán, người đưa ra direction và người thực hiện sản phẩm luôn làm việc gần nhau. Ít tầng trung gian. Ít thông tin bị mất. Quyết định nhanh hơn. Trách nhiệm rõ hơn. Chúng tôi thích đưa ý tưởng thành thứ có thể nhìn thấy càng sớm càng tốt. Một concept tốt thường nói được nhiều hơn một bản proposal dài.
        </p>
      </div>
    </section>
  );
}
