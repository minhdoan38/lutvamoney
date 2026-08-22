"use client";

import { useEffect, useRef } from "react";

export function ContextualCursor({ label = "KÉO ĐỂ SO", disabled = false }: { label?: string; disabled?: boolean }) {
  const cursor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = cursor.current;
    const stage = element?.closest<HTMLElement>("[data-reconstruction-stage]");
    if (disabled || !element || !stage || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

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
  }, [disabled]);

  if (disabled) return null;

  return (
    <span ref={cursor} className="stage-context-cursor" aria-hidden="true">
      {label}
    </span>
  );
}
