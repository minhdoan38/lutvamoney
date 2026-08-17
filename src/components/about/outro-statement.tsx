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
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!scope.current || reduce) return;

      const panel = scope.current.querySelector<HTMLElement>("[data-outro-panel]");
      const lead = scope.current.querySelector<HTMLElement>("[data-outro-lead]");
      const close = scope.current.querySelector<HTMLElement>("[data-outro-close]");
      if (!panel || !display.current || !lead || !close) return;

      gsap.set(panel, {
        clipPath: "inset(12% 0 0 0)",
      });

      gsap.to(panel, {
        clipPath: "inset(0% 0 0 0)",
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 85%",
          end: "top 20%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      const displaySplit = SplitText.create(display.current, {
        type: "lines",
        linesClass: "outro-display-line",
        mask: "lines",
        aria: "hidden",
      });

      gsap.from(lead, {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: lead,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(displaySplit.lines, {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: {
          trigger: display.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(close, {
        y: 24,
        opacity: 0,
        duration: 0.75,
        ease: "expo.out",
        scrollTrigger: {
          trigger: close,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      const scaleXTo = gsap.quickTo(display.current, "scaleX", {
        duration: 0.45,
        ease: "power3.out",
      });
      const scaleYTo = gsap.quickTo(display.current, "scaleY", {
        duration: 0.45,
        ease: "power3.out",
      });

      const settle = () => {
        scaleXTo(1);
        scaleYTo(1);
      };

      const velocityTrigger = ScrollTrigger.create({
        trigger: scope.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = gsap.utils.clamp(-3.5, 3.5, self.getVelocity() / 900);
          const next = 1 + Math.abs(velocity) * 0.012;
          scaleXTo(next);
          scaleYTo(next);
        },
        onLeave: settle,
        onLeaveBack: settle,
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        velocityTrigger.kill();
        displaySplit.revert();
      };
    },
    { scope },
  );

  return (
    <section
      id="outro"
      ref={scope}
      className="relative overflow-hidden"
      aria-labelledby="outro-heading"
    >
      <div
        data-outro-panel
        className="bg-accent px-4 py-32 text-background sm:px-6 md:py-48 lg:px-10"
      >
        <div className="mx-auto max-w-[1500px]">
          <h2 id="outro-heading" className="sr-only">
            Chúng tôi không muốn làm mọi thứ
          </h2>

          <p
            data-outro-lead
            className="max-w-[48rem] text-[clamp(1.35rem,2.8vw,2.15rem)] font-medium leading-[1.2] tracking-[-0.03em] text-background"
          >
            Chúng tôi không muốn làm mọi thứ. Nét Nút không cố trở thành một agency có mọi dịch vụ. Chúng tôi muốn làm thật tốt một bài toán cụ thể:
          </p>

          <p
            ref={display}
            className="mt-14 max-w-[18ch] origin-left text-[clamp(2.6rem,8.5vw,7.8rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-background will-change-transform md:mt-20 md:leading-[0.84]"
          >
            Giúp những doanh nghiệp tốt không còn bị đại diện bởi những website không đủ tốt.
          </p>

          <p
            data-outro-close
            className="mt-16 max-w-[36rem] border-t border-background/20 pt-8 text-base leading-[1.65] text-background/85 md:mt-24 md:text-lg"
          >
            Doanh nghiệp đã đi xa. Đừng để website tiếp tục kể câu chuyện cũ.
          </p>

          <div className="mt-14 md:mt-20">
            <Link
              href="/#contact"
              data-cursor-link
              className="group inline-flex min-h-12 items-center justify-between gap-7 rounded-full bg-background py-2 pl-5 pr-2 text-sm font-semibold text-foreground transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 active:scale-[0.98]"
            >
              Gửi website của bạn
              <span
                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-accent transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <span className="absolute h-px w-3 bg-background" />
                <span className="absolute h-3 w-px bg-background" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
