"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

export function HeroAbout() {
  const scope = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!headline.current || reduce) return;

      const select = gsap.utils.selector(scope);
      const split = SplitText.create(headline.current, {
        type: "lines",
        linesClass: "about-hero-line",
        mask: "lines",
        aria: "hidden",
      });

      gsap.set(split.lines, {
        y: 100,
        opacity: 0,
      });
      gsap.set(select("[data-about-hero-copy]"), {
        y: 36,
        opacity: 0,
      });

      const intro = gsap.timeline({
        defaults: { ease: "expo.out" },
      });

      intro
        .to(split.lines, {
          y: 0,
          opacity: 1,
          duration: 1.15,
          stagger: 0.1,
          ease: "elastic.out(1, 0.62)",
        })
        .to(
          select("[data-about-hero-copy]"),
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "expo.out",
          },
          0.35,
        );

      return () => {
        split.revert();
      };
    },
    { scope },
  );

  return (
    <section
      id="about-hero"
      ref={scope}
      className="relative flex min-h-[100dvh] items-end overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pb-16 lg:px-10 lg:pb-20 lg:pt-32"
    >
      <div className="relative mx-auto w-full max-w-[1600px]">
        <h1
          ref={headline}
          className="w-[80%] max-w-none text-[clamp(2.8rem,10vw,9.5rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-foreground sm:leading-[0.9] md:leading-[0.86] lg:leading-[0.82]"
        >
          Một khoảng cách cần được sửa
        </h1>

        <div className="mt-14 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-12">
          <p
            data-about-hero-copy
            className="max-w-[42rem] text-base leading-[1.65] text-foreground/68 md:col-span-5 md:col-start-8 md:justify-self-end md:text-lg lg:col-span-4 lg:col-start-9"
          >
            Có những doanh nghiệp đã tồn tại 10, 20, 30 năm. Sản phẩm tốt hơn. Đội ngũ lớn hơn. Khách hàng nhiều hơn. Nhưng website vẫn đại diện cho phiên bản của họ từ nhiều năm trước. Nét Nút Studio được tạo ra để sửa khoảng cách đó. Chúng tôi tập trung vào những doanh nghiệp đã phát triển vượt xa hình ảnh số hiện tại của mình...
          </p>
        </div>
      </div>
    </section>
  );
}
