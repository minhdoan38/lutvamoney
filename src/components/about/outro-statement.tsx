"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export function OutroStatement() {
  const scope = useRef<HTMLElement>(null);
  const display = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!scope.current || !display.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const lead = scope.current.querySelector<HTMLElement>("[data-outro-lead]");
      const close = scope.current.querySelector<HTMLElement>("[data-outro-close]");
      if (!lead || !close) return;
      const split = SplitText.create(display.current, { type: "lines", linesClass: "outro-display-line", mask: "lines", aria: "auto" });

      gsap.fromTo(lead, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: "expo.out", scrollTrigger: { trigger: lead, start: "top 82%", toggleActions: "play none none none", once: true } });
      gsap.fromTo(split.lines, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.07, ease: "expo.out", scrollTrigger: { trigger: display.current, start: "top 78%", toggleActions: "play none none none", once: true } });
      gsap.fromTo(close, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", scrollTrigger: { trigger: close, start: "top 88%", toggleActions: "play none none none", once: true } });

      return () => split.revert();
    },
    { scope },
  );

  return (
    <section id="outro" ref={scope} className="relative overflow-hidden" aria-labelledby="outro-heading">
      <h2 id="outro-heading" className="sr-only">Có website cần dựng lại?</h2>
      <div className="relative bg-foreground px-4 py-24 text-background sm:px-6 md:py-36 lg:px-10">
        <div className="mx-auto grid max-w-375 gap-12 md:grid-cols-12 md:gap-8">
          <p data-outro-lead className="max-w-140 text-[clamp(1.125rem,1.8vw,1.65rem)] font-medium leading-[1.2] tracking-tight md:col-span-4">
            Một website tốt không cần chọn giữa đẹp và hiệu quả. Nó cần cả hai.
          </p>
          <p ref={display} className="display-expansion max-w-4xl text-[clamp(2.8rem,6.4vw,6.25rem)] font-semibold leading-[0.88] tracking-[-0.05em] md:col-span-8 md:col-start-5">
            Có website cần dựng lại?
          </p>
          <p data-outro-close className="max-w-135 border-t border-background/20 pt-5 text-base leading-normal text-background/70 md:col-span-4 md:col-start-1">
            Giữ phần đáng giá. Gỡ phần đang cản. Dựng một đường đi rõ hơn cho công ty hiện tại.
          </p>
          <div className="md:col-span-5 md:col-start-5">
            <Link href="/#contact" className="inline-flex min-h-12 items-center justify-center border border-background bg-background px-5 text-sm font-semibold text-foreground transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:bg-accent hover:text-background">
              Gửi website hiện tại ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
