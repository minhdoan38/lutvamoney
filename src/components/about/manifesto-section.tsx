"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const lines = [
  "Website không phải một tấm áp phích được đặt lên internet.",
  "Với nhiều khách hàng mới, đó là một trong những nơi đầu tiên họ tìm đến để hình thành đánh giá về doanh nghiệp.",
  "Vì vậy, khi doanh nghiệp đã thay đổi nhưng website vẫn đứng yên, khoảng cách giữa hai hình ảnh ấy sẽ ảnh hưởng trực tiếp đến cách thị trường nhìn nhận thương hiệu.",
  "Redesign, vì thế, không đơn giản là thay màu, đổi font hay thêm animation.",
  "Đó là dịp để nhìn lại cách doanh nghiệp đang được kể trên môi trường số, điều gì cần được giữ lại, điều gì cần được làm rõ và điều gì đã không còn phù hợp.",
];

export function ManifestoSection() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const entries = Array.from(
        scope.current?.querySelectorAll<HTMLElement>("[data-manifesto-entry]") ?? [],
      );
      const markers = Array.from(
        scope.current?.querySelectorAll<HTMLElement>("[data-manifesto-marker]") ?? [],
      );
      const pinTarget = scope.current?.querySelector<HTMLElement>("[data-manifesto-pin]");
      const readingRail = scope.current?.querySelector<HTMLElement>("[data-manifesto-reading]");

      if (entries.length === 0 || !pinTarget || !readingRail) return;

      const activate = (index: number) => {
        entries.forEach((entry, entryIndex) => {
          entry.classList.toggle("is-active", entryIndex === index);
        });
        markers.forEach((marker, markerIndex) => {
          marker.classList.toggle("is-active", markerIndex === index);
        });
      };

      activate(0);
      if (reduce) return;

      const mm = gsap.matchMedia();
      const splits = entries.map((entry) => {
        const line = entry.querySelector<HTMLElement>("[data-manifesto-line]");
        return line
          ? SplitText.create(line, {
              type: "lines",
              linesClass: "manifesto-split-line",
              mask: "lines",
              aria: "hidden",
            })
          : null;
      });

      entries.forEach((entry, index) => {
        const lineSplit = splits[index];
        if (lineSplit) {
          gsap.set(lineSplit.lines, { yPercent: 110, opacity: 0.15 });
          gsap.to(lineSplit.lines, {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.055,
            ease: "expo.out",
            scrollTrigger: {
              trigger: entry,
              start: "top 84%",
              toggleActions: "play none none none",
              once: true,
            },
          });
        }

        ScrollTrigger.create({
          trigger: entry,
          start: "top 56%",
          end: "bottom 56%",
          onEnter: () => activate(index),
          onEnterBack: () => activate(index),
          invalidateOnRefresh: true,
        });
      });

      mm.add("(min-width: 768px)", () => {
        const pin = ScrollTrigger.create({
          trigger: scope.current,
          start: "top top",
          end: () => `+=${Math.max(readingRail.offsetHeight - pinTarget.offsetHeight, 240)}`,
          pin: pinTarget,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        return () => pin.kill();
      });

      return () => {
        splits.forEach((split) => split?.revert());
        mm.revert();
      };
    },
    { scope },
  );

  return (
    <section
      id="manifesto"
      ref={scope}
      className="border-t border-[rgba(237,237,237,0.16)] px-4 py-32 sm:px-6 md:py-48 lg:px-10"
      aria-labelledby="manifesto-heading"
    >
      <div className="mx-auto grid max-w-375 grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
        <div
          data-manifesto-pin
          className="flex min-h-88 self-start flex-col justify-between md:col-span-4 md:min-h-[calc(100dvh-8rem)] md:pt-3"
        >
          <div>
            <h2
              id="manifesto-heading"
              className="max-w-[12ch] font-mono text-[0.625rem] font-normal leading-normal tracking-[0.12em] text-muted"
            >
              Website, qua góc nhìn của chúng tôi
            </h2>
            <p className="mt-12 text-[clamp(4.7rem,12vw,11rem)] font-semibold leading-[0.82] tracking-[-0.055em] text-accent">
              nhìn
            </p>
            <p className="text-[clamp(4.7rem,12vw,11rem)] font-semibold leading-[0.82] tracking-[-0.055em] text-foreground">
              lại.
            </p>
          </div>

          <div className="mt-12 flex max-w-52 gap-1.5" aria-hidden="true">
            {lines.map((line) => (
              <span
                key={line}
                data-manifesto-marker
                className="manifesto-marker h-1 flex-1 bg-[rgba(237,237,237,0.22)]"
              />
            ))}
          </div>
        </div>

        <div
          data-manifesto-reading
          className="flex flex-col md:col-span-7 md:col-start-6"
        >
          {lines.map((line) => (
            <article
              key={line}
              data-manifesto-entry
              className="manifesto-entry border-t border-[rgba(237,237,237,0.16)] py-10 md:py-14"
            >
              <p
                data-manifesto-line
                className="max-w-[15ch] text-[clamp(1.7rem,4.1vw,3.45rem)] font-medium leading-[1.14] tracking-[-0.035em] text-foreground/68 transition-colors duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] sm:max-w-[18ch] md:max-w-[17ch]"
              >
                {line}
              </p>
              <span
                data-manifesto-rule
                className="mt-8 block h-1 w-full origin-left bg-accent"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
