"use client";

import { useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Dictionary } from "@/i18n/get-dictionary";

type ContactIntroProps = {
  copy: Dictionary["contact"]["intro"];
};

export function ContactIntro({ copy }: ContactIntroProps) {
  const [active, setActive] = useState("0");

  return (
    <div id="contact-intro" className="min-h-[100dvh] px-4 pb-10 pt-24 sm:px-6 sm:pt-28 md:pb-12 md:pt-32 lg:px-10">
      <div className="mx-auto min-h-[calc(100dvh-7rem)] max-w-375">
        <div>
          <h1 className="display-compression max-w-[8ch] text-[clamp(4rem,11vw,10rem)] font-semibold leading-[0.86] tracking-[-0.055em]">
            {copy.titleLine1}
            <br />
            {copy.titleLine2}
          </h1>
        </div>

        <div className="mt-8 border-t editorial-rule pt-6 md:mt-10 md:pt-7">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <p className="max-w-[18ch] text-xs leading-relaxed text-muted md:text-sm">
                {copy.lede}
              </p>
            </div>

            <div className="md:col-span-8 md:col-start-5">
              <Accordion
                multiple={false}
                value={active ? [active] : []}
                onValueChange={(value) => setActive(String(value[0] ?? ""))}
                className="border-t editorial-rule"
              >
                {copy.points.map((point, index) => (
                  <AccordionItem key={point.title} value={String(index)} className="border-b editorial-rule">
                    <AccordionTrigger className="min-h-14 py-3 text-[clamp(1.35rem,2.8vw,2.7rem)] font-medium leading-none tracking-[-0.035em] hover:text-accent md:min-h-16 md:py-4">
                      {point.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="max-w-2xl pr-8 text-sm leading-relaxed text-muted md:text-base">{point.copy}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
