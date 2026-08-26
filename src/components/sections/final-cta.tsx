"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollText } from "@/components/scroll-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function FinalCTA() {
  const scope = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "done">("idle");
  const [submittedUrl, setSubmittedUrl] = useState("");

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
    const website = new FormData(event.currentTarget).get("website");
    if (typeof website !== "string") return;

    // TODO: Implement Supabase/n8n backend logic later
    setSubmittedUrl(website);
    setStatus("done");
  };

  const reset = () => {
    setSubmittedUrl("");
    setStatus("idle");
  };

  return (
    <section id="contact" ref={scope} className="px-4 pb-8 pt-32 sm:px-6 md:pt-48 lg:px-10">
      <div className="mx-auto max-w-375 bg-accent px-5 py-12 text-background sm:px-8 md:px-12 md:py-16 lg:px-16 lg:py-20">
        <div className="grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <ScrollText mode="words">
              <h2 className="max-w-[12ch] text-[clamp(3.2rem,8.6vw,8rem)] font-semibold leading-[0.96] tracking-[-0.04em]">
                Website của bạn đã cũ chưa?
              </h2>
            </ScrollText>
            <ScrollText>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-black/90 md:text-lg">
                Để lại link website của bạn. Chúng tôi sẽ cho bạn xem một mẫu phân tích ngay trên trình duyệt.
              </p>
            </ScrollText>
          </div>

          <div data-cta-field className="self-end md:col-span-4">
            <form onSubmit={submit}>
              <Label htmlFor="website" className="mb-3 text-sm font-semibold text-background">
                Link website hiện tại
              </Label>
              <Input
                id="website"
                name="website"
                type="url"
                autoComplete="url"
                required
                placeholder="https://websitecuaban.vn"
                aria-describedby="website-note"
                className="border-black/70 text-background placeholder:text-black/80 focus-visible:border-black focus-visible:ring-black/30 focus-visible:ring-offset-accent"
              />
              <p id="website-note" className="mt-2 text-xs leading-relaxed text-black/85">
                Đây là mẫu minh họa. Link chưa được gửi hoặc lưu ở đâu.
              </p>
              <Button
                type="submit"
                disabled={status === "done"}
                variant="secondary"
                size="lg"
                className="mt-5 min-h-14 w-full bg-background px-5 font-mono text-sm text-foreground hover:bg-background/90 hover:text-foreground"
              >
                {status === "idle" ? "Xem phân tích mẫu" : "Mẫu phân tích đã sẵn sàng"}
              </Button>
            </form>

            {status === "done" ? (
              <div
                role="status"
                aria-live="polite"
                className="analysis-result mt-5 border-t border-black/40 pt-5"
              >
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-black/70">
                  Mẫu phân tích cho {submittedUrl}
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-black/90">
                  <li>Thông điệp chính cần xuất hiện sớm hơn.</li>
                  <li>Đường vào dịch vụ cần ít bước hơn.</li>
                  <li>Giao diện cần phản ánh quy mô hiện tại.</li>
                </ul>
                <p className="mt-4 text-xs leading-relaxed text-black/75">
                  Kết quả trên chỉ là minh họa cho cách Nét Nút soi một website.
                </p>
                <Button
                  type="button"
                  onClick={reset}
                  variant="link"
                  size="sm"
                  className="mt-5 h-auto min-h-0 border-b border-black/70 px-0 pb-1 text-sm font-semibold text-background hover:bg-transparent hover:text-background"
                >
                  Thử link khác
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <footer className="mx-auto flex max-w-375 flex-col gap-4 border-t editorial-rule py-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>Nét Nút Studio</p>
        <p>Redesign website doanh nghiệp tại Việt Nam</p>
      </footer>
    </section>
  );
}
