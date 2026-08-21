"use client";

import { useEffect, useRef } from "react";

export function ContextualCursor({ label = "KÉO ĐỂ SO" }: { label?: string }) {
  const cursor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = cursor.current;
    const stage = element?.closest<HTMLElement>("[data-reconstruction-stage]");
    if (!element || !stage || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const handleMove = (event: PointerEvent) => {
      const bounds = stage.getBoundingClientRect();
      element.style.left = `${event.clientX - bounds.left}px`;
      element.style.top = `${event.clientY - bounds.top}px`;
      element.style.opacity = "1";
    };
    const hide = () => {
      element.style.opacity = "0";
    };

    stage.addEventListener("pointermove", handleMove);
    stage.addEventListener("pointerleave", hide);
    stage.addEventListener("pointerenter", handleMove);

    return () => {
      stage.removeEventListener("pointermove", handleMove);
      stage.removeEventListener("pointerleave", hide);
      stage.removeEventListener("pointerenter", handleMove);
    };
  }, []);

  return (
    <span ref={cursor} className="stage-context-cursor" aria-hidden="true">
      {label}
    </span>
  );
}
