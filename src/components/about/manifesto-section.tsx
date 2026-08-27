"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const lines = [
  "Giữ cái đáng giữ.",
  "Gỡ cái đang cản.",
  "Dựng cái cần chạy.",
];

export function ManifestoSection() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const entries = Array.from(scope.current?.querySelectorAll<HTMLElement>("[data-manifesto-entry]") ?? []);
      const splits = entries.map((entry) => {
        const line = entry.querySelector<HTMLElement>("[data-manifesto-line]");
        return line ? SplitText.create(line, { type: "lines", linesClass: "manifesto-split-line", mask: "lines", aria: "auto" }) : null;
      });

      entries.forEach((entry, index) => {
        const split = splits[index];
        if (!split) return;
        gsap.fromTo(
          split.lines,
          { yPercent: 110, opacity: 0.2 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.06,
            delay: index * 0.05,
            ease: "expo.out",
            scrollTrigger: { trigger: entry, start: "top 82%", toggleActions: "play none none none", once: true },
          },
        );
      });

      return () => splits.forEach((split) => split?.revert());
    },
    { scope },
  );

  return (
    <section id="manifesto" ref={scope} className="border-t border-line px-4 py-24 sm:px-6 md:py-36 lg:px-10" aria-labelledby="manifesto-heading">
      <div className="mx-auto grid max-w-375 gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <h2 id="manifesto-heading" className="font-mono text-[0.625rem] font-normal tracking-[0.12em] text-muted">
            Website hiện tại là điểm bắt đầu
          </h2>
          <p className="mt-6 max-w-sm text-base leading-[1.65] text-foreground/68 md:text-lg">
            Anh/chị chia sẻ website và bối cảnh hiện tại. Nét Nút cùng anh/chị xác định phần đáng giữ, phần đang cản và hướng cần làm rõ trước khi đi tiếp.
          </p>
          <p className="display-release mt-10 max-w-[7ch] text-[clamp(4.5rem,11vw,10rem)] font-semibold leading-[0.8] tracking-[-0.055em] text-accent">
            làm
            <br />
            lại.
          </p>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          {lines.map((line) => (
            <article key={line} data-manifesto-entry className="border-t border-line py-8 md:py-12">
              <p data-manifesto-line className="display-compression mt-5 max-w-[13ch] text-[clamp(2rem,4.7vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.045em] text-foreground">
                {line}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
