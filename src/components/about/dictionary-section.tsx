"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function DictionarySection() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const pinTarget = scope.current?.querySelector<HTMLElement>("[data-dictionary-pin]");
      const defs = scope.current?.querySelector<HTMLElement>("[data-dictionary-defs]");
      if (!pinTarget || !defs || reduce) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const trigger = ScrollTrigger.create({
          trigger: scope.current,
          start: "top top",
          end: () => `+=${Math.max(defs.offsetHeight - pinTarget.offsetHeight, 240)}`,
          pin: pinTarget,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        gsap.set(defs.children, { y: 48, opacity: 0 });
        gsap.to(defs.children, {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: defs,
            start: "top 72%",
            toggleActions: "play none none none",
            once: true,
          },
        });

        return () => {
          trigger.kill();
        };
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(defs.children, { y: 28, opacity: 0 });
        gsap.to(defs.children, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: defs,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      });

      return () => {
        mm.revert();
      };
    },
    { scope },
  );

  return (
    <section
      id="dictionary"
      ref={scope}
      className="border-t border-line px-4 py-32 sm:px-6 md:py-48 lg:px-10"
    >
      <div className="mx-auto grid max-w-375 gap-12 md:grid-cols-12 md:gap-8 md:items-start">
        <div
          data-dictionary-pin
          className="md:col-span-5 md:pt-4"
          aria-hidden="true"
        >
          <p className="text-[clamp(4.5rem,14vw,12rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-accent">
            NÉT
          </p>
          <p className="mt-2 text-[clamp(4.5rem,14vw,12rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-accent md:mt-4">
            NÚT
          </p>
        </div>

        <div
          data-dictionary-defs
          className="flex flex-col gap-12 md:col-span-6 md:col-start-7 md:gap-16"
        >
          <div>
            <h2 className="sr-only">Vì sao là Nét Nút</h2>
            <p className="text-[clamp(1.5rem,3.2vw,2.75rem)] font-medium leading-[1.16] tracking-[-0.03em] text-foreground">
              <span className="text-accent">Nét</span> là cách một thương hiệu được nhìn thấy và cảm nhận. Đó là bố cục, ngôn từ, hình ảnh, màu sắc, nhịp điệu và cá tính riêng tạo nên cách thương hiệu xuất hiện trước khách hàng.
            </p>
          </div>

          <div className="border-t border-line pt-12 md:pt-16">
            <p className="text-[clamp(1.5rem,3.2vw,2.75rem)] font-medium leading-[1.16] tracking-[-0.03em] text-foreground">
              <span className="text-accent">Nút</span> là phần đưa người dùng từ việc nhìn thấy đến hành động. Là cách họ tìm được thông tin, hiểu sản phẩm, hình thành niềm tin và đi đến quyết định.
            </p>
          </div>

          <p className="max-w-xl border-t border-line pt-10 text-base leading-[1.72] text-foreground/68 md:pt-12 md:text-lg">
            Với chúng tôi, một website tốt không cần chọn giữa đẹp và hiệu quả. Nó cần cả hai.
          </p>
        </div>
      </div>
    </section>
  );
}
