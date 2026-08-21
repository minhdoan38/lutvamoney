"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollText } from "@/components/scroll-text";
import { useHomeExperience } from "@/components/home-experience-provider";

const errorCopy = {
  empty: "Nhập một địa chỉ website để bắt đầu soi.",
  invalid: "Địa chỉ này chưa đúng. Thử abc.vn hoặc https://abc.vn.",
  "unsupported-protocol": "Chỉ hỗ trợ địa chỉ http hoặc https.",
} as const;

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function FinalCTA() {
  const scope = useRef<HTMLElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const { subject, submitWebsite, clearWebsite } = useHomeExperience();
  const [value, setValue] = useState(() => subject?.normalizedUrl ?? "");
  const [error, setError] = useState<keyof typeof errorCopy | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const displayValue = subject?.normalizedUrl ?? value;
  const isConfirmed = Boolean(subject) || confirmed;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from("[data-cta-field]", {
        y: 28,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 78%",
          toggleActions: "play reverse play reverse",
        },
      });
    },
    { scope },
  );

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = submitWebsite(displayValue);
    if (result) {
      setError(result);
      setConfirmed(false);
      input.current?.focus();
      return;
    }

    setError(null);
    setConfirmed(true);
  };

  const reset = () => {
    clearWebsite();
    setValue("");
    setError(null);
    setConfirmed(false);
    input.current?.focus();
  };

  return (
    <section id="contact" ref={scope} className="px-4 pb-8 pt-20 sm:px-6 md:pt-28 lg:px-10">
      <div className="mx-auto max-w-[1500px] bg-accent px-5 py-12 text-background sm:px-8 md:px-12 md:py-16 lg:px-16 lg:py-20">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <ScrollText mode="words">
              <h2 className="display-release max-w-[12ch] text-[clamp(3.2rem,8.6vw,8rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
                Gửi website hiện tại.
              </h2>
            </ScrollText>
            <ScrollText>
              <p className="mt-8 max-w-[42rem] text-base leading-relaxed text-black/90 md:text-lg">
                Đây là bước chuẩn bị brief phía client. Địa chỉ chỉ được đọc trong trình duyệt để giữ cùng một subject giữa hero và CTA.
              </p>
            </ScrollText>
          </div>

          <div data-cta-field className="self-end md:col-span-4">
            <form onSubmit={submit} noValidate>
              <label htmlFor="website" className="mb-3 block text-sm font-semibold">
                Link website hiện tại
              </label>
              <input
                ref={input}
                id="website"
                name="website"
                type="text"
                inputMode="url"
                autoComplete="url"
                value={displayValue}
                onChange={(event) => {
                  setValue(event.target.value);
                  setError(null);
                  setConfirmed(false);
                }}
                placeholder="https://websitecuaban.vn"
                aria-invalid={Boolean(error)}
                aria-describedby="website-note website-error"
                className="min-h-14 w-full border border-black/70 bg-transparent px-4 text-base text-background outline-none placeholder:text-black/80 focus:border-black"
              />
              <p id="website-note" className="mt-2 text-xs leading-relaxed text-black/85">
                Chỉ xử lý trên trình duyệt. Không gửi, không lưu.
              </p>
              <p id="website-error" aria-live="polite" className="mt-2 min-h-5 text-xs text-black/90">
                {error ? errorCopy[error] : ""}
              </p>
              <button
                type="submit"
                className="mt-3 min-h-14 w-full bg-background px-5 font-mono text-sm text-foreground transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 active:translate-y-0"
              >
                {isConfirmed ? "Brief đã sẵn sàng" : "Chuẩn bị brief ↗"}
              </button>
            </form>

            {isConfirmed && subject ? (
              <div role="status" aria-live="polite" className="mt-5 border-t border-black/40 pt-5">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-black/70">
                  Ta đang nói về {subject.domain}.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-black/90">
                  Đây chỉ là subject cục bộ để tiếp tục cuộc trò chuyện, chưa có phân tích hoặc kết quả nào được tạo ra.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-5 border-b border-black/70 pb-1 text-sm font-semibold transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5"
                >
                  Xóa website
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <footer className="mx-auto flex max-w-[1500px] flex-col gap-4 border-t editorial-rule py-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>Nét Nút Studio</p>
        <p>Redesign website doanh nghiệp tại Việt Nam</p>
      </footer>
    </section>
  );
}
