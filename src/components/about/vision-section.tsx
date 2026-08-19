"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const principles = [
  "Không chạy theo trend chỉ để trông mới.",
  "Không ép mọi doanh nghiệp vào cùng một template.",
  "Không thêm một thứ chỉ vì người khác cũng đang có nó.",
];

export function VisionSection() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const rows = Array.from(
        scope.current?.querySelectorAll<HTMLElement>("[data-vision-row]") ?? [],
      );
      const markers = Array.from(
        scope.current?.querySelectorAll<HTMLElement>("[data-vision-marker]") ?? [],
      );
      const pinTarget = scope.current?.querySelector<HTMLElement>("[data-vision-pin]");
      const readingRail = scope.current?.querySelector<HTMLElement>("[data-vision-rail]");
      const copy = scope.current?.querySelector<HTMLElement>("[data-vision-copy]");

      if (!copy || !pinTarget || !readingRail || rows.length === 0) return;

      const activate = (index: number) => {
        rows.forEach((row, rowIndex) => {
          row.classList.toggle("is-active", rowIndex === index);
        });
        markers.forEach((marker, markerIndex) => {
          marker.classList.toggle("is-active", markerIndex === index);
        });
      };

      activate(0);
      if (reduce) return;

      const media = gsap.matchMedia();

      gsap.fromTo(
        copy,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: copy,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );

      rows.forEach((row, index) => {
        gsap.fromTo(
          row,
          { y: 28, opacity: 0.3 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            delay: index * 0.06,
            ease: "expo.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: row,
              start: "top 84%",
              toggleActions: "play none none none",
              once: true,
              invalidateOnRefresh: true,
            },
          },
        );

        ScrollTrigger.create({
          trigger: row,
          start: "top 52%",
          end: "bottom 52%",
          onEnter: () => activate(index),
          onEnterBack: () => activate(index),
          invalidateOnRefresh: true,
        });
      });

      media.add("(min-width: 768px)", () => {
        const pin = ScrollTrigger.create({
          trigger: scope.current,
          start: "top top",
          end: () =>
            `+=${Math.max(readingRail.offsetHeight - pinTarget.offsetHeight, 280)}`,
          pin: pinTarget,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        return () => pin.kill();
      });

      return () => media.revert();
    },
    { scope },
  );

  return (
    <section
      id="vision"
      ref={scope}
      className="border-t border-[rgba(237,237,237,0.16)] px-4 py-32 sm:px-6 md:py-48 lg:px-10"
      aria-labelledby="vision-heading"
    >
      <div className="mx-auto grid max-w-375 grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
        <div
          data-vision-pin
          className="flex min-h-88 self-start flex-col justify-between md:col-span-4 md:min-h-[calc(100dvh-8rem)] md:pt-3"
        >
          <div>
            <h2
              id="vision-heading"
              className="max-w-[12ch] font-mono text-[0.625rem] font-normal leading-normal tracking-[0.12em] text-muted"
            >
              Chúng tôi nhìn một website cũ như thế nào?
            </h2>
            <p className="mt-12 text-[clamp(4.7rem,12vw,11rem)] font-semibold leading-[0.82] tracking-[-0.04em] text-accent">
              giữ
            </p>
            <p className="text-[clamp(4.7rem,12vw,11rem)] font-semibold leading-[0.82] tracking-[-0.04em] text-foreground">
              lại.
            </p>
          </div>

          <div className="mt-12 flex max-w-52 gap-1.5" aria-hidden="true">
            {principles.map((principle) => (
              <span
                key={principle}
                data-vision-marker
                className="vision-marker h-1 flex-1 bg-[rgba(237,237,237,0.22)]"
              />
            ))}
          </div>
        </div>

        <div
          data-vision-reading
          className="flex flex-col md:col-span-7 md:col-start-6"
        >
          <p
            data-vision-copy
            className="max-w-3xl text-[clamp(1.25rem,2.6vw,2rem)] font-medium leading-[1.34] tracking-[-0.03em] text-foreground"
          >
            Chúng tôi không cho rằng cũ đồng nghĩa với phải bỏ. Một doanh nghiệp lâu năm luôn có những giá trị đáng được giữ lại: lịch sử, uy tín, sản phẩm, kiến thức ngành và cách khách hàng đã quen nhận diện thương hiệu. Việc của Nét Nút là tìm ra đâu là phần tạo nên giá trị ấy, đâu là thứ đang che khuất hoặc cản trở nó, rồi xây lại một hệ thống rõ ràng hơn xung quanh những gì thực sự đáng giữ.
          </p>

          <div
            data-vision-rail
            className="mt-16 flex flex-col md:mt-24"
          >
            {principles.map((principle, index) => (
              <article
                key={principle}
                data-vision-row
                className={`vision-row border-t border-[rgba(237,237,237,0.16)] py-10 md:py-14 ${
                  index === 0
                    ? "md:pl-0"
                    : index === 1
                      ? "md:pl-[12%]"
                      : "md:pl-[24%]"
                }`}
              >
                <p
                  data-vision-line
                  className="max-w-[18ch] text-[clamp(1.8rem,4vw,3.6rem)] font-medium leading-[1.1] tracking-[-0.035em] text-foreground/62"
                >
                  {principle}
                </p>
                <span
                  data-vision-rule
                  className="mt-8 block h-1 w-full origin-left bg-accent"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
