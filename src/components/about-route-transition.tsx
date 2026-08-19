"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type TransitionPhase = "initializing" | "idle" | "covering" | "revealing";
type PanelDirection = "cover" | "reveal";

type PanelAnimation = {
  animation: Animation;
  panel: HTMLDivElement;
};

const COVER_MS = 760;
const REVEAL_MS = 860;
const INTRO_HOLD_MS = 140;
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_IN_OUT = "cubic-bezier(0.77, 0, 0.175, 1)";
const PANEL_FROM = ["translate3d(-100%, 0, 0)", "translate3d(100%, 0, 0)"];
const PANEL_CENTER = "translate3d(0, 0, 0)";

export function AboutRouteTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const leftPanel = useRef<HTMLDivElement>(null);
  const rightPanel = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<TransitionPhase>("initializing");
  const pendingDestination = useRef<string | null>(null);
  const activeAnimations = useRef<PanelAnimation[]>([]);
  const [phase, setPhase] = useState<TransitionPhase>("initializing");

  const updatePhase = (nextPhase: TransitionPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  };

  const playPanels = (direction: PanelDirection) => {
    const panels = [leftPanel.current, rightPanel.current];
    if (panels.some((panel) => !panel)) return Promise.resolve();

    activeAnimations.current.forEach(({ animation }) => animation.cancel());
    activeAnimations.current = [];
    const isCovering = direction === "cover";
    const duration = isCovering ? COVER_MS : REVEAL_MS;
    const easing = isCovering ? EASE_OUT : EASE_IN_OUT;
    const animations = panels.map((panel, index) => {
      const from = PANEL_FROM[index];
      if (!from || !panel) return null;

      panel.style.transform = isCovering ? from : PANEL_CENTER;
      void panel.offsetWidth;
      const animation = panel.animate(
        [{ transform: isCovering ? from : PANEL_CENTER }, { transform: isCovering ? PANEL_CENTER : from }],
        { duration, easing, fill: "forwards" },
      );
      animation.onfinish = () => {
        panel.style.transform = isCovering ? PANEL_CENTER : from;
      };
      animation.oncancel = () => {
        panel.style.transform = getComputedStyle(panel).transform;
      };
      animation.play();
      return { animation, panel };
    });

    const currentAnimations = animations.filter((entry): entry is PanelAnimation => entry !== null);
    activeAnimations.current = currentAnimations;
    return Promise.all(
      currentAnimations.map(async ({ animation }) => {
        try {
          await animation.finished;
        } catch {
          // A newer navigation cancels the previous animation.
        }
      }),
    );
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      phaseRef.current = "idle";
      return;
    }

    let cancelled = false;
    phaseRef.current = "covering";
    const introFrame = window.requestAnimationFrame(() => {
      setPhase("covering");
      if (cancelled) return;
      void playPanels("cover").then(async () => {
        if (cancelled) return;

        await new Promise<void>((resolve) => window.setTimeout(resolve, INTRO_HOLD_MS));
        if (cancelled) return;

        updatePhase("revealing");
        await playPanels("reveal");
        if (!cancelled) updatePhase("idle");
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(introFrame);
      const animations = activeAnimations.current;
      animations.forEach(({ animation }) => animation.cancel());
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/about" || phaseRef.current !== "covering") return;

    let cancelled = false;
    updatePhase("revealing");
    void playPanels("reveal").then(() => {
      if (!cancelled) updatePhase("idle");
    });

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || event.defaultPrevented) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const destination = new URL(anchor.href, window.location.href);
      const destinationPath = destination.pathname.replace(/\/$/, "") || "/";
      const currentPath = window.location.pathname.replace(/\/$/, "") || "/";

      if (
        destination.origin !== window.location.origin ||
        destinationPath !== "/about" ||
        currentPath === "/about"
      ) {
        return;
      }

      event.preventDefault();
      if (phaseRef.current !== "idle") return;

      const nextUrl = `${destination.pathname}${destination.search}${destination.hash}`;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(nextUrl);
        return;
      }

      pendingDestination.current = nextUrl;
      updatePhase("covering");
      void playPanels("cover").then(() => {
        const destinationUrl = pendingDestination.current;
        pendingDestination.current = null;
        if (destinationUrl) router.push(destinationUrl);
      });
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, [router]);

  return (
    <div aria-hidden="true" data-phase={phase} className="route-transition">
      <div ref={leftPanel} className="route-transition__panel route-transition__panel--left" />
      <div ref={rightPanel} className="route-transition__panel route-transition__panel--right" />
      <div className="route-transition__seam" />
    </div>
  );
}
