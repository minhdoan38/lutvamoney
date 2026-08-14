"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    const moveCursor = gsap.quickTo(cursor, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    const moveCursorY = gsap.quickTo(cursor, "y", {
      duration: 0.45,
      ease: "power3.out",
    });
    const moveDot = gsap.quickTo(dot, "x", {
      duration: 0.12,
      ease: "power2.out",
    });
    const moveDotY = gsap.quickTo(dot, "y", {
      duration: 0.12,
      ease: "power2.out",
    });

    const move = (event: PointerEvent) => {
      moveCursor(event.clientX);
      moveCursorY(event.clientY);
      moveDot(event.clientX);
      moveDotY(event.clientY);
    };

    const activate = () => cursor.classList.add("scale-[2.8]");
    const deactivate = () => cursor.classList.remove("scale-[2.8]");

    window.addEventListener("pointermove", move);
    document.querySelectorAll<HTMLElement>("[data-cursor-link]").forEach((element) => {
      element.addEventListener("mouseenter", activate);
      element.addEventListener("mouseleave", deactivate);
    });

    return () => {
      gsap.killTweensOf(cursor);
      gsap.killTweensOf(dot);
      window.removeEventListener("pointermove", move);
      document.querySelectorAll<HTMLElement>("[data-cursor-link]").forEach((element) => {
        element.removeEventListener("mouseenter", activate);
        element.removeEventListener("mouseleave", deactivate);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="cursor-invert pointer-events-none fixed left-0 top-0 z-40 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:block"
      />
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent md:block"
      />
    </>
  );
}
