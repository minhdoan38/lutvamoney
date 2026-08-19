"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type MagneticPrincipleProps = {
  children: string;
};

export function MagneticPrinciple({ children }: MagneticPrincipleProps) {
  const scope = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.matchMedia("(pointer: coarse)").matches
      ) {
        return;
      }

      const xTo = gsap.quickTo(el, "x", {
        duration: 0.55,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(el, "y", {
        duration: 0.55,
        ease: "power3.out",
      });

      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = event.clientX - (rect.left + rect.width / 2);
        const relY = event.clientY - (rect.top + rect.height / 2);
        xTo(gsap.utils.clamp(-14, 14, relX * 0.28));
        yTo(gsap.utils.clamp(-10, 10, relY * 0.28));
      };

      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.25,
          ease: "expo.out",
        });
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);

      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        gsap.killTweensOf(el);
      };
    },
    { scope },
  );

  return (
    <span
      ref={scope}
      className="inline-block max-w-full rounded-full border border-[rgba(237,237,237,0.16)] px-5 py-3 text-left text-sm leading-[1.45] text-foreground/72 md:text-base"
    >
      {children}
    </span>
  );
}
