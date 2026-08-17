"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticPrinciple } from "@/components/about/magnetic-principle";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const principles = [
  "Không chạy theo trend chỉ để trông mới.",
  "Không biến mọi doanh nghiệp thành cùng một template.",
  "Không thêm thứ gì nếu nó không có lý do tồn tại.",
];

export function VisionSection() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from("[data-vision-copy]", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: "[data-vision-copy]",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from("[data-vision-row]", {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: "[data-vision-list]",
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });
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
      <div className="mx-auto max-w-[1500px]">
        <h2 id="vision-heading" className="sr-only">
          Cách nhìn một website cũ
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <p
            data-vision-copy
            className="max-w-[48rem] text-[clamp(1.25rem,2.6vw,2rem)] font-medium leading-[1.25] tracking-[-0.03em] text-foreground md:col-span-8 md:col-start-1"
          >
            Chúng tôi không mặc định rằng mọi thứ cũ đều phải bỏ. Một doanh nghiệp lâu năm luôn có những thứ đáng giữ lại: lịch sử, uy tín, sản phẩm, kiến thức ngành, cách khách hàng nhận diện thương hiệu. Việc của chúng tôi là tìm ra đâu là giá trị cần giữ, đâu là phần đang cản trở chúng, rồi xây lại một hệ thống rõ ràng hơn xung quanh những giá trị đó.
          </p>
        </div>

        <ul
          data-vision-list
          className="mt-16 flex flex-col border-t border-[rgba(237,237,237,0.16)] md:mt-24"
        >
          {principles.map((principle, index) => (
            <li
              key={principle}
              data-vision-row
              className={`border-b border-[rgba(237,237,237,0.16)] py-8 md:py-10 ${
                index === 0
                  ? "md:pl-0"
                  : index === 1
                    ? "md:pl-[16%]"
                    : "md:pl-[32%]"
              }`}
            >
              <MagneticPrinciple>{principle}</MagneticPrinciple>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
