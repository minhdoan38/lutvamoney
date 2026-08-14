"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollText } from "@/components/scroll-text";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  {
    title: "Thiết kế lại website",
    copy: "Website cũ không có nghĩa là doanh nghiệp cũ. Chúng tôi giữ lại giá trị thương hiệu bạn đã xây, loại bỏ giao diện lỗi thời, và dựng lại một trải nghiệm sắc bén hơn.",
  },
  {
    title: "Website doanh nghiệp",
    copy: "Rõ ràng. Đáng tin. Dễ hiểu. Chúng tôi xây dựng website doanh nghiệp chuẩn chỉnh từ kiến trúc thông tin, giao diện người dùng đến tối ưu hiệu suất.",
  },
  {
    title: "Trang đích và chiến dịch",
    copy: "Một sản phẩm. Một chiến dịch. Một mục tiêu. Landing page được thiết kế với sự tập trung tuyệt đối vào thông điệp và tỷ lệ chuyển đổi.",
  },
  {
    title: "Chuyển động và tương tác",
    copy: "Website không cần đứng yên. Chuyển động và tương tác được tính toán bằng vật lý để dẫn dắt hành vi người dùng, không phải để trang trí.",
  },
];

export function Services() {
  const scope = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(0);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from("[data-service-row]", {
        yPercent: 35,
        opacity: 0,
        stagger: 0.09,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 68%",
          toggleActions: "play reverse play reverse",
        },
      });
    },
    { scope },
  );

  return (
    <section id="services" ref={scope} className="px-4 py-32 sm:px-6 md:py-48 lg:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-16 grid gap-7 md:mb-24 md:grid-cols-12">
          <ScrollText mode="words">
            <h2 className="max-w-[10ch] text-[clamp(3rem,6.8vw,6.4rem)] font-semibold leading-[0.96] tracking-[-0.04em] md:col-span-9">
              Chúng tôi làm gì
            </h2>
          </ScrollText>
          <p className="max-w-sm self-end text-base leading-relaxed text-white/55 md:col-span-3">
            Xây lại đúng phần đang giữ doanh nghiệp của bạn ở phía sau.
          </p>
        </div>

        <div className="border-t editorial-rule">
          {services.map((service, index) => {
            const isActive = active === index;
            return (
              <article
                key={service.title}
                data-service-row
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="group relative border-b editorial-rule md:grid md:grid-cols-12 md:gap-4"
              >
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={`service-panel-${index}`}
                  onClick={() => setActive(isActive ? null : index)}
                  className="relative grid w-full gap-4 py-6 text-left md:col-span-7 md:py-9"
                >
                  <ScrollText mode="words" start="top 92%">
                    <span className="text-[clamp(1.9rem,4.2vw,4.7rem)] font-medium leading-none tracking-[-0.035em] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-accent md:col-span-7">
                      {service.title}
                    </span>
                  </ScrollText>
                  <span
                    aria-hidden="true"
                    className={`absolute right-4 mt-1 h-4 w-4 text-accent transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${isActive ? "rotate-45" : ""}`}
                  >
                    <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                    <span className="absolute left-1/2 top-0 h-full w-px bg-current" />
                  </span>
                </button>
                <div
                  id={`service-panel-${index}`}
                  role="region"
                  aria-hidden={!isActive}
                  className={`grid items-center overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:col-span-4 md:col-start-9 md:self-stretch ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <p className="min-h-0 max-w-xl pb-6 text-sm leading-relaxed text-white/60 md:pb-0 md:text-base">
                    {service.copy}
                  </p>
                </div>
                <div
                  aria-hidden="true"
                  className={`h-1 origin-left bg-accent transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:col-span-12 ${isActive ? "scale-x-100" : "scale-x-0"}`}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
