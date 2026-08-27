# 001 - Explain the SelectedWork comparison gesture

- **Status**: DONE
- **Commit**: 5c0779b
- **Severity**: LOW
- **Category**: Missed opportunity / explanation
- **Estimated scope**: 1 source file, approximately 50 lines

## Problem

The homepage's central reconstruction artifact is interactive, but its primary desktop gesture is discoverable only by trial and error. The `SelectedWork` frame already owns the reveal mask and lens, yet the `data-cursor-text` attribute is not consumed anywhere in `src`. A visitor can reach the frame, see the old composition, and miss that pointer movement reveals the new composition.

The interaction is at `src/components/sections/selected-work.tsx:117-148`:

```tsx
<div
  ref={frame}
  onPointerMove={updateMask}
  onPointerLeave={hideMask}
  onKeyDown={handleComparisonKeyDown}
  tabIndex={0}
  data-cursor-text="INSPECT"
  aria-label="So sánh bản website cũ và bản redesign bằng phím mũi tên"
  className="relative isolate min-h-[72vh] overflow-hidden bg-surface-work outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background md:min-h-[82vh]"
>
  <ProjectVisual />

  <div
    ref={reveal}
    className={`masked-media absolute inset-0 hidden bg-accent md:block ${comparisonView === "new" ? "comparison-full" : ""}`}
    aria-hidden="true"
  >
    <ProjectVisual newVersion />
  </div>

  <div
    ref={lens}
    aria-hidden="true"
    className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[clamp(110px,18vw,240px)] w-[clamp(110px,18vw,240px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 opacity-0 md:block"
  />
```

The component already suppresses its general motion when `prefers-reduced-motion: reduce` matches at `src/components/sections/selected-work.tsx:55-67`, and its pointer handler also returns early at `src/components/sections/selected-work.tsx:72-77`. The new hint must preserve those accessibility decisions rather than introduce a second motion path.

## Target

Add one fine-pointer-only, one-shot hint that explains the desktop reveal gesture when the comparison frame first enters the viewport. It must be a visual cue only, with no new visible copy, no pointer capture, no loop, and no effect on the mobile toggle or keyboard path.

Use a separate cue element so the authored sequence never fights the live pointer tween. The implemented target is:

```tsx
const hintTimeline = gsap.timeline({ paused: true });

hintTimeline
  .fromTo(
    comparisonHint.current,
    { x: -24, yPercent: -50, scale: 0.9, opacity: 0 },
    {
      x: 24,
      yPercent: -50,
      scale: 1,
      opacity: 0.85,
      duration: 0.315,
      ease: "expo.out",
    },
  )
  .to(comparisonHint.current, {
    x: 64,
    opacity: 0,
    duration: 0.385,
    ease: "power2.out",
  });
```

The two fine-pointer phases total exactly `700ms`. The reduced-motion branch uses an opacity-only `0.1s` arrival plus `0.1s` exit. The cue is triggered by a separate `ScrollTrigger` at `start: "top 72%"` with `once: true`, then cleaned up with the `useGSAP` context. Do not animate `left`, `top`, `width`, or `height`; use GSAP transform values and opacity only. Keep the cue `pointer-events: none` and `aria-hidden="true"`.

The cue must run only once per mount/first viewport entry on desktop fine pointers. It must not restart on every pointer move, on `onPointerLeave`, on arrow-key changes, or on selecting `Web cũ` / `Web mới`. If the frame is never viewed, it should not run offscreen. If the frame is revisited after scrolling away, do not replay within the same mount.

## Repo conventions to follow

- This is a client leaf using `useGSAP` and the existing GSAP/ScrollTrigger stack. Keep motion in `src/components/sections/selected-work.tsx`; do not add a dependency.
- Existing motion tokens are in `src/app/globals.css:16-21`:

```css
--motion-fast: 200ms;
--motion-editorial: 700ms;
--motion-reconstruction: 1200ms;
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--ease-editorial: cubic-bezier(0.32, 0.72, 0, 1);
```

- The existing frame entrance uses `ScrollTrigger` with `start: "top 72%"` and `ease: "expo.out"` at `src/components/sections/selected-work.tsx:62-72`. The one-shot cue uses a separate trigger at the same start point, with `once: true`, not a raw `window.addEventListener("scroll", ...)`.
- The existing reveal mask uses `clip-path` for the comparison relationship and the live lens tween uses `duration: 0.25` and `ease: "power3.out"` at `src/components/sections/selected-work.tsx:123-135`. Do not change that live interaction.
- Reduced motion is checked in the `useGSAP` setup and pointer handler. The cue uses a separate opacity-only branch with `0.1s` in and `0.1s` out.
- The active design world is flat, dark, and editorial. Use existing neutral/vermillion tokens only. Do not add glow, blur, gradient, cursor replacement, or visible instructional labels.

## Steps

1. In `src/components/sections/selected-work.tsx`, add a ref for the cue element or cue wrapper and a one-shot guard. Keep the cue inside the existing comparison frame and mark it `aria-hidden="true"` and `pointer-events-none`.
2. Gate the cue to `@media (hover: hover) and (pointer: fine)` in CSS or with a matching `matchMedia` check. Do not show it on touch/mobile; the existing `md:hidden` toggle is the mobile explanation path.
3. Trigger the cue when the comparison frame enters the viewport, using the existing `useGSAP` context and `ScrollTrigger` with `start: "top 72%"` or a narrowly coordinated one-shot trigger. Set `once: true`; do not replay when the frame re-enters.
4. Implement the fine-pointer sequence with GSAP `transform` values and `opacity` only. Use a `700ms` total authored cue split into `0.315s` arrival and `0.385s` exit. The cue should suggest a left-to-right inspection pass, then disappear.
5. Implement the reduced-motion branch as opacity only: `0.1s` to `0.35`, then `0.1s` back to `0`. Ensure live pointer movement cannot inherit or restart the hint animation; keep the existing `lens` ref and `gsap.to(lens.current, ...)` code unchanged.
6. Do not add CSS or new keyframes. Keep the cue's existing utility classes in `src/components/sections/selected-work.tsx`; all motion values are owned by the GSAP timeline.
7. Preserve all existing markup semantics, keyboard arrow handling, mobile opacity transition, touch-target sizes, and content. Do not add instructional copy or alter `aria-label`.

## Boundaries

- Do NOT touch the page IA, copy, routes, CTA labels, or the mobile comparison controls.
- Do NOT change the existing live lens pointer tween, reveal mask, frame entrance, `comparisonView` state, or arrow-key behavior. The current working tree already contains unrelated copy and touch-target edits; those are outside this plan's scope and must remain untouched.
- Do NOT add a custom cursor, infinite loop, parallax, spring, sound, gradient, blur, or glow.
- Do NOT animate layout properties such as `left`, `top`, `width`, `height`, `margin`, or `padding`.
- Do NOT use a raw scroll listener, React state updated per frame, or a new dependency.
- Do NOT hide essential comparison content if JavaScript fails; the cue is optional enhancement only.
- If the current code no longer matches the excerpts above, STOP and report the drift instead of improvising.

## Verification

- **Mechanical**:
  - Run `npm run lint`; expected outcome: no new ESLint errors.
  - Run `npm run build`; expected outcome: production build succeeds.
  - Run the project design detector if the active hook reports findings; expected outcome: no unhandled findings for the new classes or values.
- **Feel check**:
  - Open `/` at a desktop fine-pointer viewport, scroll until the comparison frame reaches the `top 72%` trigger, and confirm one subtle left-to-right lens cue appears and exits within 700ms.
  - Wait in the section, move the pointer repeatedly, and confirm the live lens follows the pointer with the existing `250ms power3.out` tween; the hint must not restart or fight it.
  - Scroll away and back within the same page mount; confirm the hint does not replay.
  - Switch `Web cũ` / `Web mới` and use ArrowLeft/ArrowRight; confirm no hint replay and the current comparison behavior remains unchanged.
  - At a mobile viewport, confirm no hint appears and the native `Web cũ` / `Web mới` toggle remains the only comparison control.
  - In DevTools, set animation playback to 10% and confirm the cue uses only transform and opacity, has no layout shift, and does not move the content frame.
  - Enable `prefers-reduced-motion: reduce` in the Rendering panel, revisit the page, and confirm there is no spatial sweep. The cue retains only a brief opacity pulse, while the comparison remains fully usable.
- **Done when**: the frame's desktop gesture is explained once without adding copy, the cue is absent on touch/reduced-motion spatial paths, repeated interaction is stable, and all mechanical checks pass.
