"use client";

import { useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollText } from "@/components/scroll-text";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
      if (prefersReducedMotion()) return;

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
          <p className="max-w-sm self-end text-base leading-relaxed text-foreground/55 md:col-span-3 md:col-start-10">
            Một khung câu hỏi chung để bắt đầu nhìn lại, không phải kết quả phân tích của một URL cụ thể.
          </p>
        </div>

        <p className="mb-4 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-accent">
          Khung chẩn đoán minh họa
        </p>

        <Accordion
          multiple={false}
          value={active < 0 ? [] : [String(active)]}
          onValueChange={(value) => setActive(value.length === 0 ? -1 : Number(value[0]))}
          className="border-t editorial-rule"
        >
          {dimensions.map((dimension, index) => (
            <AccordionItem
              key={dimension.label}
              value={String(index)}
              data-diagnosis-row
              className="border-b editorial-rule"
              onFocus={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  event.preventDefault();
                  setActive(-1);
                }
              }}
            >
              <AccordionTrigger className="grid min-h-20 w-full gap-4 py-6 text-left md:grid-cols-12 md:items-center md:py-8">
                <span className="font-mono text-[0.625rem] tracking-[0.12em] text-muted md:col-span-1">
                  0{index + 1}
                </span>
                <span className="display-compression text-[clamp(2rem,4.5vw,4.8rem)] font-medium leading-none tracking-[-0.045em] text-foreground transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-data-open/accordion-item:text-accent md:col-span-5">
                  {dimension.label}
                </span>
                <span className="hidden text-sm leading-relaxed text-muted md:col-span-5 md:col-start-8 md:block">
                  {dimension.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="md:pt-0">
                <div className="pb-6 pl-[calc(1.25rem+1ch)] pr-8 text-sm leading-relaxed text-muted md:pb-8 md:pl-[calc(50%+1rem)]">
                  <p className="text-foreground/80 md:hidden">{dimension.question}</p>
                  <p className="mt-2 md:mt-0">{dimension.copy}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
