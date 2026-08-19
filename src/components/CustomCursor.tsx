"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const cursorTargetSelector = "[data-cursor], [data-cursor-text], a, button";
const defaultMagneticStrength = 0.16;
const maxMagneticTranslation = 8;
const cursorFollowDuration = 0.13;
const accentSurfaceColor = { red: 255, green: 51, blue: 0 };
const defaultDotColor = "#FF3300";
const contrastDotColor = "#EDEDED";

type CursorMode = "default" | "magnetic" | "inspect";

type CursorTargetState = {
  element: HTMLElement | null;
  mode: CursorMode;
  label: string;
  strength: number;
  translateTarget: boolean;
};

function getCursorTarget(eventTarget: EventTarget | null) {
  if (!(eventTarget instanceof Element)) return null;

  const target = eventTarget.closest<HTMLElement>(cursorTargetSelector);
  if (target?.getAttribute("data-cursor") === "none") return null;
  return target;
}

function readMagneticStrength(target: HTMLElement) {
  const value = Number.parseFloat(target.getAttribute("data-magnetic-strength") ?? "");
  if (!Number.isFinite(value)) return defaultMagneticStrength;
  return gsap.utils.clamp(0, 0.4, value);
}

type ParsedColor = {
  red: number;
  green: number;
  blue: number;
  alpha: number;
};

function parseRgbColor(backgroundColor: string): ParsedColor | null {
  const channels = backgroundColor.match(/rgba?\(([^)]+)\)/i)?.[1]?.split(/[\s,\/]+/).filter(Boolean);
  if (!channels || channels.length < 3) return null;

  const [red, green, blue] = channels.slice(0, 3).map(Number);
  const alphaValue = channels[3];
  const alpha = alphaValue?.endsWith("%")
    ? Number.parseFloat(alphaValue) / 100
    : alphaValue === undefined
      ? 1
      : Number.parseFloat(alphaValue);
  if (![red, green, blue, alpha].every(Number.isFinite)) return null;

  return { red, green, blue, alpha };
}

function isAccentSurface(backgroundColor: string) {
  const color = parseRgbColor(backgroundColor);
  if (!color || color.alpha < 0.85) return false;

  return (
    Math.abs(color.red - accentSurfaceColor.red) <= 8 &&
    Math.abs(color.green - accentSurfaceColor.green) <= 8 &&
    color.blue <= 8
  );
}

type SurfaceRecord = {
  isPainted: boolean;
  isAccent: boolean;
};

function readSurfaceRecord(element: Element, cache: Map<Element, SurfaceRecord>) {
  const cached = cache.get(element);
  if (cached) return cached;

  const backgroundColor = window.getComputedStyle(element).backgroundColor;
  const color = parseRgbColor(backgroundColor);
  const record = {
    isPainted: Boolean(color && color.alpha > 0.02),
    isAccent: isAccentSurface(backgroundColor),
  };

  cache.set(element, record);
  return record;
}

function getPaintedSurfaceAtPointer(x: number, y: number, cache: Map<Element, SurfaceRecord>) {
  for (const hit of document.elementsFromPoint(x, y)) {
    if (hit.closest(".custom-cursor-layer")) continue;

    let current: Element | null = hit;
    while (current) {
      const surface = readSurfaceRecord(current, cache);
      if (surface.isPainted) return surface.isAccent;
      current = current.parentElement;
    }
  }

  return false;
}

export function CustomCursor() {
  const scope = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const reticle = useRef<HTMLDivElement>(null);
  const badge = useRef<HTMLDivElement>(null);
  const badgeLabel = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const dotElement = dot.current;
      const reticleElement = reticle.current;
      const badgeElement = badge.current;
      const badgeLabelElement = badgeLabel.current;

      if (!dotElement || !reticleElement || !badgeElement || !badgeLabelElement) return;

      const availability = window.matchMedia(
        "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      );
      const supportsPointerEvents = "PointerEvent" in window;
      const pointer = { x: 0, y: 0 };
      const state: CursorTargetState = {
        element: null,
        mode: "default",
        label: "",
        strength: defaultMagneticStrength,
        translateTarget: false,
      };
      let enabled = availability.matches;
      let isInsideWindow = false;
      let isOnAccentSurface = false;
      let targetXTo: ((value: number) => void) | null = null;
      let targetYTo: ((value: number) => void) | null = null;
      const surfaceCache = new Map<Element, SurfaceRecord>();

      const moveDotX = gsap.quickTo(dotElement, "x", {
        duration: cursorFollowDuration,
        ease: "none",
      });
      const moveDotY = gsap.quickTo(dotElement, "y", {
        duration: cursorFollowDuration,
        ease: "none",
      });
      const moveReticleX = gsap.quickTo(reticleElement, "x", {
        duration: cursorFollowDuration,
        ease: "none",
      });
      const moveReticleY = gsap.quickTo(reticleElement, "y", {
        duration: cursorFollowDuration,
        ease: "none",
      });
      const moveBadgeX = gsap.quickTo(badgeElement, "x", {
        duration: cursorFollowDuration,
        ease: "none",
      });
      const moveBadgeY = gsap.quickTo(badgeElement, "y", {
        duration: cursorFollowDuration,
        ease: "none",
      });

      const setAccentState = (nextIsOnAccent: boolean) => {
        if (nextIsOnAccent === isOnAccentSurface) return;
        isOnAccentSurface = nextIsOnAccent;
        dotElement.style.backgroundColor = isOnAccentSurface ? contrastDotColor : defaultDotColor;
      };

      gsap.set(dotElement, { backgroundColor: defaultDotColor });
      gsap.set([dotElement, reticleElement, badgeElement], {
        xPercent: -50,
        yPercent: -50,
      });
      gsap.set([dotElement, reticleElement, badgeElement], { autoAlpha: 0 });
      gsap.set(reticleElement, { scale: 1, rotation: 0 });
      gsap.set(badgeElement, {
        clipPath: "inset(0 100% 0 0)",
        scale: 0.86,
      });

      const resetTarget = (target: HTMLElement | null, shouldReset = state.translateTarget) => {
        if (!target || !shouldReset) return;
        gsap.killTweensOf(target);
        gsap.to(target, {
          x: 0,
          y: 0,
          duration: cursorFollowDuration,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      const hideBadge = () => {
        gsap.to(badgeElement, {
          autoAlpha: 0,
          clipPath: "inset(0 100% 0 0)",
          scale: 0.86,
          duration: 0.16,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const showBadge = (label: string) => {
        badgeLabelElement.textContent = label;
        gsap.killTweensOf([badgeElement, badgeLabelElement]);
        gsap.set(badgeElement, {
          autoAlpha: 1,
          clipPath: "inset(0 100% 0 0)",
          scale: 0.86,
        });
        gsap.to(badgeElement, {
          clipPath: "inset(0 0% 0 0)",
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.fromTo(
          badgeLabelElement,
          { y: 5, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.2,
            delay: 0.04,
            ease: "power2.out",
            overwrite: "auto",
          },
        );
      };

      const animateMode = (mode: CursorMode, label: string) => {
        const isMagnetic = mode === "magnetic";
        const isInspect = mode === "inspect";

        gsap.to(reticleElement, {
          scale: isInspect ? 2.25 : isMagnetic ? 1.4 : 1,
          rotation: isMagnetic ? 90 : 0,
          opacity: isInspect ? 1 : isMagnetic ? 0.9 : 0.6,
          duration: 0.4,
          ease: "back.out(1.7)",
          overwrite: "auto",
        });
        gsap.to(dotElement, {
          autoAlpha: isInspect ? 0.28 : 1,
          duration: 0.18,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (isInspect && label) showBadge(label);
        else hideBadge();
      };

      const setTarget = (target: HTMLElement | null) => {
        if (target === state.element) return;

        resetTarget(state.element, state.translateTarget);
        state.element = target;
        state.label = target?.getAttribute("data-cursor-text")?.trim() ?? "";
        state.mode = state.label
          ? "inspect"
          : target?.getAttribute("data-cursor") === "magnetic"
            ? "magnetic"
            : "default";
        state.strength = target ? readMagneticStrength(target) : defaultMagneticStrength;
        state.translateTarget = Boolean(
          target &&
            (target.getAttribute("data-cursor") === "magnetic" ||
              target.hasAttribute("data-magnetic-strength")),
        );

        if (state.translateTarget && target) {
          targetXTo = gsap.quickTo(target, "x", {
            duration: cursorFollowDuration,
            ease: "power3.out",
          });
          targetYTo = gsap.quickTo(target, "y", {
            duration: cursorFollowDuration,
            ease: "power3.out",
          });
        } else {
          targetXTo = null;
          targetYTo = null;
        }

        animateMode(state.mode, state.label);
      };

      const moveToPointer = (clientX: number, clientY: number, pointerType?: string) => {
        if (!enabled || pointerType === "touch") return;

        pointer.x = clientX;
        pointer.y = clientY;
        moveDotX(pointer.x);
        moveDotY(pointer.y);
        setAccentState(getPaintedSurfaceAtPointer(pointer.x, pointer.y, surfaceCache));

        let reticleX = pointer.x;
        let reticleY = pointer.y;

        if (state.element && state.mode === "magnetic" && state.translateTarget) {
          const rect = state.element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = pointer.x - centerX;
          const deltaY = pointer.y - centerY;

          reticleX = pointer.x - deltaX * state.strength;
          reticleY = pointer.y - deltaY * state.strength;

          if (targetXTo && targetYTo) {
            targetXTo(gsap.utils.clamp(-maxMagneticTranslation, maxMagneticTranslation, deltaX * state.strength));
            targetYTo(gsap.utils.clamp(-maxMagneticTranslation, maxMagneticTranslation, deltaY * state.strength));
          }
        }

        moveReticleX(reticleX);
        moveReticleY(reticleY);
        moveBadgeX(reticleX);
        moveBadgeY(reticleY);
      };

      const showCursor = () => {
        isInsideWindow = true;
        if (!enabled) return;
        gsap.to([dotElement, reticleElement], {
          autoAlpha: 1,
          duration: 0.18,
          ease: "power2.out",
          overwrite: "auto",
        });
        if (state.mode === "inspect" && state.label) {
          gsap.to(badgeElement, {
            autoAlpha: 1,
            duration: 0.18,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      const hideCursor = () => {
        isInsideWindow = false;
        resetTarget(state.element, state.translateTarget);
        setTarget(null);
        setAccentState(false);
        gsap.to([dotElement, reticleElement, badgeElement], {
          autoAlpha: 0,
          duration: 0.18,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const press = () => {
        if (!enabled) return;
        gsap.to([dotElement, reticleElement, badgeElement], {
          scale: 0.75,
          duration: 0.1,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const release = () => {
        if (!enabled) return;
        gsap.to(dotElement, {
          scale: 1,
          duration: 0.3,
          ease: "back.out(2)",
          overwrite: "auto",
        });
        gsap.to(badgeElement, {
          scale: 1,
          duration: 0.3,
          ease: "back.out(2)",
          overwrite: "auto",
        });
        animateMode(state.mode, state.label);
      };

      const updateAvailability = () => {
        enabled = availability.matches;
        surfaceCache.clear();
        document.documentElement.classList.toggle("has-custom-cursor", enabled);
        if (!enabled) hideCursor();
      };

      const onMouseOver = (event: MouseEvent) => {
        if (!enabled) return;
        setTarget(getCursorTarget(event.target));
      };

      const onMouseOut = (event: MouseEvent) => {
        if (!enabled) return;
        const nextTarget = getCursorTarget(event.relatedTarget);
        if (nextTarget !== state.element) setTarget(nextTarget);
      };

      const onPointerMove = (event: PointerEvent) => {
        if (!isInsideWindow) showCursor();
        moveToPointer(event.clientX, event.clientY, event.pointerType);
      };

      const onMouseMove = (event: MouseEvent) => {
        if (!isInsideWindow) showCursor();
        moveToPointer(event.clientX, event.clientY, "mouse");
      };

      const onPointerOver = (event: PointerEvent) => {
        if (!enabled || event.pointerType === "touch") return;
        if (!isInsideWindow) showCursor();
        setTarget(getCursorTarget(event.target));
      };

      const onPointerOut = (event: PointerEvent) => {
        if (!enabled || event.pointerType === "touch") return;
        const nextTarget = getCursorTarget(event.relatedTarget);
        if (nextTarget !== state.element) setTarget(nextTarget);
      };

      updateAvailability();
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      if (!supportsPointerEvents) window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("pointerover", onPointerOver, { passive: true });
      window.addEventListener("pointerout", onPointerOut, { passive: true });
      window.addEventListener("mouseover", onMouseOver, { passive: true });
      window.addEventListener("mouseout", onMouseOut, { passive: true });
      window.addEventListener("mousedown", press, { passive: true });
      window.addEventListener("mouseup", release, { passive: true });
      window.addEventListener("mouseenter", showCursor, { passive: true });
      window.addEventListener("mouseleave", hideCursor, { passive: true });
      window.addEventListener("blur", hideCursor, { passive: true });
      availability.addEventListener("change", updateAvailability);

      return () => {
        document.documentElement.classList.remove("has-custom-cursor");
        availability.removeEventListener("change", updateAvailability);
        window.removeEventListener("pointermove", onPointerMove);
        if (!supportsPointerEvents) window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("pointerover", onPointerOver);
        window.removeEventListener("pointerout", onPointerOut);
        window.removeEventListener("mouseover", onMouseOver);
        window.removeEventListener("mouseout", onMouseOut);
        window.removeEventListener("mousedown", press);
        window.removeEventListener("mouseup", release);
        window.removeEventListener("mouseenter", showCursor);
        window.removeEventListener("mouseleave", hideCursor);
        window.removeEventListener("blur", hideCursor);
        gsap.killTweensOf([dotElement, reticleElement, badgeElement, badgeLabelElement]);
        if (state.element) gsap.killTweensOf(state.element);
      };
    },
    { scope },
  );

  return (
    <div ref={scope} aria-hidden="true" className="custom-cursor-layer">
      <div ref={dot} className="custom-cursor__dot" />
      <div ref={reticle} className="custom-cursor__reticle">
        <span className="custom-cursor__tick custom-cursor__tick--top-left" />
        <span className="custom-cursor__tick custom-cursor__tick--top-right" />
        <span className="custom-cursor__tick custom-cursor__tick--bottom-right" />
        <span className="custom-cursor__tick custom-cursor__tick--bottom-left" />
      </div>
      <div ref={badge} className="custom-cursor__badge">
        <span aria-hidden="true">[</span>
        <span ref={badgeLabel} />
        <span aria-hidden="true">]</span>
      </div>
    </div>
  );
}
