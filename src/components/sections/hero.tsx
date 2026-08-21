"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useHomeExperience } from "@/components/home-experience-provider";

const errorCopy = {
  empty: "Nhập một địa chỉ website để bắt đầu soi.",
  invalid: "Địa chỉ này chưa đúng. Thử abc.vn hoặc https://abc.vn.",
  "unsupported-protocol": "Chỉ hỗ trợ địa chỉ http hoặc https.",
} as const;

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export function Hero() {
  const scope = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState<keyof typeof errorCopy | null>(null);
  const { submitWebsite } = useHomeExperience();

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!headline.current || reduce) return;

      const select = gsap.utils.selector(scope);
      const split = SplitText.create(headline.current, {
        type: "lines,words",
        linesClass: "hero-line",
        wordsClass: "hero-word",
        mask: "lines",
      });

      gsap.set(split.words, {
        yPercent: 130,
        rotate: (index) => (index % 2 ? 2 : -3),
        transformOrigin: "left bottom",
      });
      gsap.set(select("[data-hero-copy]"), { y: 28, opacity: 0 });

      const intro = gsap.timeline({ delay: 0.28, defaults: { ease: "expo.out" } });
      intro
        .to(split.words, {
          yPercent: 0,
          rotate: 0,
          duration: 1.1,
          stagger: 0.045,
        })
        .to(select("[data-hero-copy]"), { y: 0, opacity: 1, duration: 0.75, stagger: 0.07 }, 0.35);

      return () => split.revert();
    },
    { scope },
  );

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = submitWebsite(value);
    if (result) {
      setError(result);
      input.current?.focus();
      return;
    }

    setError(null);
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="top"
      ref={scope}
      className="relative flex min-h-dvh items-end overflow-hidden px-4 pb-10 pt-28 sm:px-6 sm:pb-14 lg:px-10 lg:pb-16 lg:pt-32"
    >
      <div data-hero-mark aria-hidden="true" className="hero-mark-geometry bg-accent" />

      <div className="relative mx-auto w-full max-w-[1600px]">
        <h1
          ref={headline}
          className="display-expansion max-w-[12ch] text-[clamp(3.5rem,11.5vw,10.8rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-foreground"
        >
          Website cũ. Không có nghĩa là phải bỏ.
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <p
            data-hero-copy
            className="max-w-196 text-base leading-[1.55] text-white/65 md:col-span-6 md:col-start-6 md:text-xl"
          >
            Ta giữ phần còn giá trị. Gỡ những gì đang làm doanh nghiệp chậm lại. Dựng lại một website rõ hơn, nhanh hơn, đúng với công ty hiện tại.
          </p>

          <form
            data-hero-copy
            onSubmit={submit}
            className="border-t border-foreground/30 pt-5 md:col-span-7 md:col-start-6"
            noValidate
          >
            <label htmlFor="hero-website" className="font-mono text-xs uppercase tracking-[0.1em] text-foreground/75">
              Website đang có vấn đề ở đâu?
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                ref={input}
                id="hero-website"
                name="website"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                  if (error) setError(null);
                }}
                autoComplete="url"
                placeholder="abc.vn"
                aria-invalid={Boolean(error)}
                aria-describedby="hero-website-note hero-website-error"
                className="min-h-12 min-w-0 flex-1 border-b border-foreground/40 bg-transparent px-0 text-base text-foreground outline-none placeholder:text-foreground/45 focus:border-accent"
              />
              <button
                type="submit"
                className="inline-flex min-h-12 shrink-0 items-center justify-center border border-foreground bg-foreground px-5 text-sm font-semibold text-background transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:bg-accent hover:text-background active:translate-y-0"
              >
                Bắt đầu soi ↗
              </button>
            </div>
            <p id="hero-website-note" className="mt-3 text-xs leading-relaxed text-foreground/55">
              Chỉ xử lý trên trình duyệt. Không gửi, không lưu.
            </p>
            <p id="hero-website-error" aria-live="polite" className="mt-2 min-h-5 text-xs text-accent">
              {error ? errorCopy[error] : ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
