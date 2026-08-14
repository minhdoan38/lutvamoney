"use client";

import type { ReactElement } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

type ScrollTextProps = {
  children: ReactElement<{ className?: string; children?: ReactElement | string }>;
  className?: string;
  mode?: "lines" | "words";
  start?: string;
  as?: "div" | "span";
};

export function ScrollText({
  children,
  className,
  mode = "lines",
  start = "top 84%",
  as = "div",
}: ScrollTextProps) {
  const scope = useRef<HTMLElement>(null);
  const setScope = (node: HTMLElement | null) => {
    scope.current = node;
  };

  useGSAP(
    () => {
      const trigger = scope.current;
      const splitTarget = trigger?.firstElementChild as HTMLElement | null;
      if (!splitTarget || !trigger || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = SplitText.create(splitTarget, {
        type: "lines,words",
        linesClass: "scroll-text-line",
        wordsClass: "scroll-text-word",
        mask: "lines",
        aria: "hidden",
      });
      const parts = mode === "words" ? split.words : split.lines;

      gsap.set(parts, { yPercent: 115, opacity: 0 });
      gsap.to(parts, {
        yPercent: 0,
        opacity: 1,
        duration: mode === "words" ? 0.85 : 0.7,
        stagger: mode === "words" ? 0.045 : 0.08,
        ease: "expo.out",
        scrollTrigger: {
          trigger,
          start,
          toggleActions: "play reverse play reverse",
          invalidateOnRefresh: true,
        },
      });

      return () => split.revert();
    },
    { scope, dependencies: [mode, start] },
  );

  const childClassName = children.props.className;
  const wrapperClassName = [childClassName, className].filter(Boolean).join(" ");
  const Wrapper = as;

  return (
    <Wrapper ref={setScope} className={wrapperClassName}>
      {children}
    </Wrapper>
  );
}
