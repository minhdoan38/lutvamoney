"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollText } from "@/components/scroll-text";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const dimensions = [
  {
    label: "Cấu trúc",
    question: "Người dùng có biết nên đi đâu trước không?",
    copy: "Nhìn vào đường đi giữa các trang, nhóm nội dung và những điểm rẽ quan trọng.",
  },
  {
    label: "Thứ bậc",
    question: "Điều đáng nhớ nhất có được nhìn thấy sớm không?",
    copy: "Đặt lại nhịp của thông điệp để giá trị hiện tại không bị chôn dưới lớp cũ.",
  },
  {
    label: "Nội dung",
    question: "Website đang nói đúng điều doanh nghiệp đã trở thành chưa?",
    copy: "Giữ lại ngôn ngữ có sức nặng, gỡ phần chung chung và làm rõ tiếng nói riêng.",
  },
  {
    label: "Chuyển đổi",
    question: "Sau khi hiểu, người dùng có biết bước tiếp theo là gì không?",
    copy: "Kiểm tra các điểm hành động mà không biến trải nghiệm thành một bảng điểm.",
  },
];

export function Diagnosis() {
  const scope = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from("[data-diagnosis-row]", {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 74%",
          toggleActions: "play reverse play reverse",
        },
      });
    },
    { scope },
  );

  return (
    <section id="services" ref={scope} className="px-4 py-20 sm:px-6 md:py-28 lg:px-10">
      <div className="mx-auto max-w-375">
        <div className="mb-12 grid gap-7 md:mb-16 md:grid-cols-12">
          <ScrollText mode="words">
            <h2 className="display-compression max-w-[11ch] text-[clamp(3rem,6.8vw,6.4rem)] font-semibold leading-[0.88] tracking-[-0.045em] md:col-span-8">
              Cũ ở đâu, phải nhìn cho đúng.
            </h2>
          </ScrollText>
          <p className="max-w-sm self-end text-base leading-relaxed text-white/55 md:col-span-3 md:col-start-10">
            Một khung câu hỏi chung để bắt đầu nhìn lại, không phải kết quả phân tích của một URL cụ thể.
          </p>
        </div>

        <p className="mb-4 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-accent">
          Khung chẩn đoán minh họa
        </p>

        <div className="border-t editorial-rule">
          {dimensions.map((dimension, index) => {
            const isActive = active === index;
            return (
              <article
                key={dimension.label}
                data-diagnosis-row
                className="border-b editorial-rule"
                onFocus={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
              >
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={`diagnosis-panel-${index}`}
                  onClick={() => setActive(isActive ? -1 : index)}
                  className="grid min-h-20 w-full gap-4 py-6 text-left md:grid-cols-12 md:items-center md:py-8"
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.12em] text-muted md:col-span-1">
                    0{index + 1}
                  </span>
                  <span className={`display-compression text-[clamp(2rem,4.5vw,4.8rem)] font-medium leading-none tracking-[-0.045em] transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] md:col-span-5 ${isActive ? "text-accent" : "text-foreground"}`}>
                    {dimension.label}
                  </span>
                  <span className="hidden text-sm leading-relaxed text-muted md:col-span-5 md:col-start-8 md:block">
                    {dimension.question}
                  </span>
                  <span aria-hidden="true" className={`relative ml-auto h-4 w-4 text-accent transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] md:col-span-1 ${isActive ? "rotate-45" : ""}`}>
                    <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                    <span className="absolute left-1/2 top-0 h-full w-px bg-current" />
                  </span>
                </button>
                <div
                  id={`diagnosis-panel-${index}`}
                  role="region"
                  aria-hidden={!isActive}
                  className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="min-h-0 pb-6 pl-[calc(1.25rem+1ch)] pr-8 text-sm leading-relaxed text-muted">
                    <p className="text-foreground/80">{dimension.question}</p>
                    <p className="mt-2">{dimension.copy}</p>
                  </div>
                </div>
                <div
                  id={`diagnosis-desktop-copy-${index}`}
                  className={`hidden pb-8 pl-[calc(50%+1rem)] text-sm leading-relaxed text-muted md:block ${isActive ? "opacity-100" : "opacity-45"}`}
                >
                  {dimension.copy}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
