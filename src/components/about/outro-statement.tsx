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
      if (!scope.current || !display.current) return;

      const panel = scope.current.querySelector<HTMLElement>("[data-outro-panel]");
      const meta = scope.current.querySelector<HTMLElement>("[data-outro-meta]");
      const lead = scope.current.querySelector<HTMLElement>("[data-outro-lead]");
      const close = scope.current.querySelector<HTMLElement>("[data-outro-close]");
      if (!panel || !meta || !lead || !close) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

      const updateLensPosition = (event: PointerEvent) => {
        const bounds = panel.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
        const y = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100));
        panel.style.setProperty("--outro-lens-x", `${x}%`);
        panel.style.setProperty("--outro-lens-y", `${y}%`);
      };
      const activateLens = (event: PointerEvent) => {
        updateLensPosition(event);
        panel.setAttribute("data-lens-active", "true");
      };
      const deactivateLens = () => panel.removeAttribute("data-lens-active");

      if (!reduce && finePointer) {
        panel.addEventListener("pointerenter", activateLens);
        panel.addEventListener("pointerleave", deactivateLens);
        panel.addEventListener("pointermove", updateLensPosition);
      }

      let displaySplit: ReturnType<typeof SplitText.create> | undefined;

      if (!reduce) {
        gsap.fromTo(
          panel,
          { clipPath: "inset(12% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 0.7,
            ease: "expo.out",
            scrollTrigger: {
              trigger: scope.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );

        displaySplit = SplitText.create(display.current, {
          type: "lines",
          linesClass: "outro-display-line",
          mask: "lines",
          aria: "hidden",
        });

        gsap.fromTo(
          meta,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "expo.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: meta,
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );

        gsap.fromTo(
          lead,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "expo.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: lead,
              start: "top 82%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );

        gsap.fromTo(
          displaySplit.lines,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.08,
            ease: "expo.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: display.current,
              start: "top 78%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );

        gsap.fromTo(
          close,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "expo.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: close,
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }

      return () => {
        panel.removeEventListener("pointerenter", activateLens);
        panel.removeEventListener("pointerleave", deactivateLens);
        panel.removeEventListener("pointermove", updateLensPosition);
        displaySplit?.revert();
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
      <h2 id="outro-heading" className="sr-only">
        Chúng tôi không làm những thứ vô nghĩa
      </h2>

      <div
        data-outro-panel
        className="outro-lens relative overflow-hidden bg-background text-foreground"
      >
        <div className="outro-lens__reveal" aria-hidden="true" />

        <div
          data-outro-meta
          className="outro-lens__meta absolute left-6 right-6 top-6 z-1 flex items-start justify-between gap-6 font-mono text-[0.625rem] leading-normal tracking-[0.12em] text-foreground/55 uppercase lg:left-10 lg:right-10 lg:top-8"
        >
          <span>Di chuột để soi lớp cấu trúc bên dưới</span>
          <span className="text-accent" aria-hidden="true">
            01
          </span>
        </div>

        <div className="outro-lens__copy relative z-1 mx-auto grid min-h-dvh w-[min(100%-3rem,90rem)] grid-cols-1 content-center px-0 py-24 md:grid-cols-12 md:grid-rows-[auto_1fr_auto] md:gap-x-10 md:gap-y-4 md:py-20 lg:gap-x-16 lg:py-24">
          <p
            data-outro-lead
            className="max-w-140 text-[clamp(1.125rem,1.8vw,1.65rem)] font-medium leading-[1.2] tracking-tight text-foreground/80 md:col-span-5 md:col-start-1 md:row-start-1"
          >
            Nét Nút không cố trở thành một agency có tất cả dịch vụ. Chúng tôi muốn tập trung giải quyết thật tốt một bài toán cụ thể:
          </p>

          <p
            ref={display}
            className="mt-10 max-w-4xl origin-left text-[clamp(2.8rem,6.4vw,6.25rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-foreground will-change-transform md:col-span-9 md:col-start-4 md:row-span-2 md:row-start-1 md:mt-0"
          >
            Giúp những doanh nghiệp tốt không còn bị đại diện bởi những website chưa đủ tốt.
          </p>

          <p
            data-outro-close
            className="mt-12 max-w-135 border-t border-foreground/20 pt-5 text-base leading-normal text-foreground/75 md:col-span-4 md:col-start-1 md:row-start-3 md:mt-0 md:text-base"
          >
            Bởi thời gian có thể tạo nên chiều sâu cho một thương hiệu. Nhưng nó không nên trở thành thứ hằn mãi lên diện mạo của một câu chuyện vốn vẫn còn đầy sức sống.
          </p>

          <div className="mt-8 md:col-span-5 md:col-start-4 md:row-start-3 md:mt-0">
            <Link
              href="/#contact"
              data-cursor-link
              className="group inline-flex min-h-12 items-center justify-between gap-7 rounded-full bg-foreground py-2 pl-5 pr-2 text-sm font-semibold text-background transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 active:scale-[0.98]"
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

        <div className="outro-lens__hint absolute bottom-6 right-6 z-1 flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.12em] text-foreground/50 lg:bottom-8 lg:right-10">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          <span>Reconstruct</span>
        </div>
      </div>
    </section>
  );
}
